function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("Geen POST data ontvangen");
    }

    // Haal instellingen veilig op uit de Google Projectinstellingen
    const scriptProperties = PropertiesService.getScriptProperties();
    const FOLDER_ID = scriptProperties.getProperty('FOLDER_ID');
    const INLEVER_CODE = scriptProperties.getProperty('INLEVER_CODE'); // Enkele code (bijv. tvit2026)

    if (!FOLDER_ID || !INLEVER_CODE) {
      throw new Error("Server configuratiefout: FOLDER_ID of INLEVER_CODE ontbreekt in de Script Properties.");
    }

    const data = JSON.parse(e.postData.contents);
    const userCode = data.submissionCode;
    const action = data.action || "submit";
    const studentName = (data.studentName || "Anoniem").trim();
    
    // Controleer de inlevercode
    if (userCode !== INLEVER_CODE) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Ongeldige inlevercode."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Beveiliging: Alleen studentName 'docentJMJ' mag 'setRelease' acties uitvoeren.
    // Studenten mogen 'submit', 'checkRelease', 'list' en 'read' acties uitvoeren (met ingebouwde naamfilters).
    const isTeacher = (studentName === "docentJMJ");
    const allowedForStudent = (action === "submit" || action === "checkRelease" || action === "list" || action === "read");
    
    if (!isTeacher && !allowedForStudent) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Niet geautoriseerd voor deze actie."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    if (action === "checkRelease") {
      const assignmentId = data.assignmentId;
      if (!assignmentId) {
        throw new Error("assignmentId is verplicht bij checkRelease");
      }
      const isReleased = (scriptProperties.getProperty("RELEASE_" + assignmentId) === "true");
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        released: isReleased
      })).setMimeType(ContentService.MimeType.JSON);
    }

    if (action === "setRelease") {
      const assignmentId = data.assignmentId;
      const isVisible = data.visible;
      if (!assignmentId) {
        throw new Error("assignmentId is verplicht bij setRelease");
      }
      scriptProperties.setProperty("RELEASE_" + assignmentId, String(isVisible));
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        released: isVisible === true || isVisible === "true"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    if (action === "list") {
      const mainFolder = DriveApp.getFolderById(FOLDER_ID);
      const filesList = [];

      // 1. Bestanden in de hoofdmap ophalen
      const rootFiles = mainFolder.getFiles();
      while (rootFiles.hasNext()) {
        const file = rootFiles.next();
        filesList.push({
          id: file.getId(),
          name: file.getName(),
          component: "",
          created: file.getDateCreated().getTime(),
          size: file.getSize()
        });
      }

      // 2. Bestanden in de submappen ophalen (de component-mappen)
      const subfolders = mainFolder.getFolders();
      while (subfolders.hasNext()) {
        const subfolder = subfolders.next();
        const componentName = subfolder.getName();
        const subFiles = subfolder.getFiles();
        while (subFiles.hasNext()) {
          const file = subFiles.next();
          filesList.push({
            id: file.getId(),
            name: file.getName(),
            component: componentName,
            created: file.getDateCreated().getTime(),
            size: file.getSize()
          });
        }
      }

      // Sorteer op datum (nieuwste eerst)
      filesList.sort((a, b) => b.created - a.created);

      // Beveiliging/Filter: Als de aanvrager geen docent is, mag hij ALLEEN zijn eigen bestanden zien
      const cleanStudentName = studentName.replace(/[^a-zA-Z0-9-_ ]/g, "").toLowerCase();
      const filteredFiles = filesList.filter(function(file) {
        if (isTeacher) return true;
        return file.name.toLowerCase().indexOf(cleanStudentName + "_") === 0;
      });

      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        files: filteredFiles
      })).setMimeType(ContentService.MimeType.JSON);

    } else if (action === "read") {
      const fileId = data.fileId;
      if (!fileId) {
        throw new Error("Geen fileId opgegeven voor lezen");
      }

      const file = DriveApp.getFileById(fileId);

      // Security check: Zorg dat het bestand in FOLDER_ID of een directe submap staat
      const parents = file.getParents();
      let authorized = false;
      while (parents.hasNext()) {
        const parent = parents.next();
        if (parent.getId() === FOLDER_ID) {
          authorized = true;
          break;
        }
        const grandParents = parent.getParents();
        while (grandParents.hasNext()) {
          if (grandParents.next().getId() === FOLDER_ID) {
            authorized = true;
            break;
          }
        }
      }

      if (!authorized) {
        return ContentService.createTextOutput(JSON.stringify({
          status: "error",
          message: "Niet geautoriseerd om dit bestand te lezen."
        })).setMimeType(ContentService.MimeType.JSON);
      }

      // Security check 2: Als het geen docent is, mag het alleen hun eigen bestand zijn
      if (!isTeacher) {
        const cleanStudentName = studentName.replace(/[^a-zA-Z0-9-_ ]/g, "").toLowerCase();
        if (file.getName().toLowerCase().indexOf(cleanStudentName + "_") !== 0) {
          return ContentService.createTextOutput(JSON.stringify({
            status: "error",
            message: "Niet geautoriseerd om dit bestand te lezen."
          })).setMimeType(ContentService.MimeType.JSON);
        }
      }

      const text = file.getBlob().getDataAsString();
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        text: text
      })).setMimeType(ContentService.MimeType.JSON);

    } else {
      // Standaard actie: opslaan/submit
      const content = data.text || "";
      const studentName = (data.studentName || "Anoniem").trim().replace(/[^a-zA-Z0-9-_ ]/g, "");
      const assignmentName = (data.assignmentName || "Opgave").trim().replace(/[^a-zA-Z0-9-_ ]/g, "");
      const component = (data.component || "").trim().replace(/[^a-zA-Z0-9-_ ]/g, "");

      const timestamp = Utilities.formatDate(new Date(), "Europe/Amsterdam", "yyyy-MM-dd_HH-mm-ss");
      const fileName = `${studentName}_${assignmentName}_${timestamp}.txt`;

      const mainFolder = DriveApp.getFolderById(FOLDER_ID);
      let targetFolder = mainFolder;

      if (component) {
        const subfolders = mainFolder.getFoldersByName(component);
        if (subfolders.hasNext()) {
          targetFolder = subfolders.next();
        } else {
          targetFolder = mainFolder.createFolder(component);
        }
      }

      let file;
      if (data.fileId) {
        file = DriveApp.getFileById(data.fileId);
        
        // Security check
        const parents = file.getParents();
        let authorized = false;
        while (parents.hasNext()) {
          const parent = parents.next();
          if (parent.getId() === FOLDER_ID) {
            authorized = true;
            break;
          }
          const grandParents = parent.getParents();
          while (grandParents.hasNext()) {
            if (grandParents.next().getId() === FOLDER_ID) {
              authorized = true;
              break;
            }
          }
        }
        
        if (!authorized) {
          return ContentService.createTextOutput(JSON.stringify({
            status: "error",
            message: "Niet geautoriseerd om dit bestand te wijzigen."
          })).setMimeType(ContentService.MimeType.JSON);
        }
        
        // Security check 2: Als het geen docent is, mag het alleen hun eigen bestand zijn
        if (!isTeacher) {
          const cleanStudentName = studentName.replace(/[^a-zA-Z0-9-_ ]/g, "").toLowerCase();
          if (file.getName().toLowerCase().indexOf(cleanStudentName + "_") !== 0) {
            return ContentService.createTextOutput(JSON.stringify({
              status: "error",
              message: "Niet geautoriseerd om dit bestand te wijzigen."
            })).setMimeType(ContentService.MimeType.JSON);
          }
        }

        file.setContent(content);
        
        // Hernoem file als het Vraag_OPEN -> Vraag_BEANTWOORD is
        let oldName = file.getName();
        if (assignmentName === "Vraag_BEANTWOORD" && oldName.indexOf("Vraag_OPEN") !== -1) {
          file.setName(oldName.replace("Vraag_OPEN", "Vraag_BEANTWOORD"));
        } else if (assignmentName === "Vraag_OPEN" && oldName.indexOf("Vraag_BEANTWOORD") !== -1) {
          file.setName(oldName.replace("Vraag_BEANTWOORD", "Vraag_OPEN"));
        }
      } else {
        file = targetFolder.createFile(fileName, content, MimeType.PLAIN_TEXT);
      }

      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        fileId: file.getId(),
        fileName: file.getName(),
        folderName: targetFolder.getName()
      })).setMimeType(ContentService.MimeType.JSON);
    }

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}