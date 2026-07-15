var active_question_file_id = null;

function initVraag() {
  console.log('Vraag-component geladen!');
  
  // Verberg het 'Opgeslagen' (saved-container) paneel in de zijbalk voor deze module
  const savedContainer = document.getElementById('saved-container');
  if (savedContainer) {
    savedContainer.style.display = 'none';
  }
  
  // Voeg css-stijlen toe aan de head als ze er nog niet zijn
  if (!document.getElementById('vraag-styles')) {
    const style = document.createElement('style');
    style.id = 'vraag-styles';
    style.innerHTML = `
      .question-item {
        padding: 10px;
        margin: 8px 0;
        border-radius: 4px;
        background-color: #fff;
        border: 1px solid #ddd;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: background-color 0.2s, box-shadow 0.2s;
        box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      }
      .question-item:hover {
        background-color: #f0f7ff;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      }
      .status-badge {
        font-size: 0.8em;
        padding: 4px 8px;
        border-radius: 12px;
        font-weight: bold;
        text-transform: uppercase;
      }
      .status-open {
        background-color: #fff3cd;
        color: #856404;
        border: 1px solid #ffeeba;
      }
      .status-beantwoord {
        background-color: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
      }
    `;
    document.head.appendChild(style);
  }

  const outputOpgave = document.getElementById('outputOpgave');
  if (outputOpgave) {
    outputOpgave.innerHTML = `
      <div id="vraag-output-panel" style="padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; display: flex; flex-direction: column; height: 100%; box-sizing: border-box; overflow-y: auto; background-color: #f8f9fa;">
        <h2 style="margin-top: 0; color: #333; border-bottom: 2px solid #007acc; padding-bottom: 8px;">Vragenhistorie</h2>
        <div id="vraag-status-message" style="margin-bottom: 15px; color: #666; font-style: italic; font-size: 0.95em;">
          Klik op 'Vragen verversen' om uw gestelde vragen op te halen.
        </div>
        <button id="refresh-questions-btn" onclick="loadQuestionsList()" class="inlever-btn" style="background-color: #007acc; width: auto; align-self: flex-start; padding: 8px 16px; margin-bottom: 20px; border-radius: 4px; font-weight: bold;">Vragen verversen</button>
        
        <div id="student-questions-list" style="border: 1px solid #ccc; border-radius: 6px; padding: 12px; background-color: #fff; flex: 1; min-height: 200px; overflow-y: auto; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);">
          Er zijn nog geen vragen geladen.
        </div>
        
        <!-- Antwoord Paneel (alleen getoond voor docent bij bewerken) -->
        <div id="vraag-answer-panel" style="margin-top: 20px; padding-top: 20px; border-top: 2px dashed #ccc; display: none;">
          <h3 style="margin-top: 0; color: #28a745;">Antwoord formuleren</h3>
          <p style="font-size: 0.9em; color: #555; margin-bottom: 12px;">Voeg uw antwoord onderaan toe in de editor en klik op de groene knop om het antwoord op te slaan.</p>
          <div style="display: flex; gap: 10px;">
            <button id="save-answer-btn" onclick="submitAnswer()" class="inlever-btn" style="background-color: #28a745; font-weight: bold; padding: 8px 16px;">Antwoord opslaan</button>
            <button id="cancel-answer-btn" onclick="cancelAnswer()" class="inlever-btn" style="background-color: #6c757d; font-weight: bold; padding: 8px 16px;">Annuleren</button>
          </div>
        </div>
      </div>
    `;
    loadQuestionsList();
  }
}

async function loadQuestionsList() {
  const statusMsg = document.getElementById('vraag-status-message');
  const listContainer = document.getElementById('student-questions-list');
  if (!listContainer) return;
  
  if (statusMsg) statusMsg.textContent = "Vragen ophalen van de server...";
  listContainer.innerHTML = '<div style="color: #666; font-style: italic;">Laden...</div>';
  
  const studentName = localStorage.getItem('student_name') || '';
  let submissionCode = localStorage.getItem('submission_code') || '';
  
  if (!studentName) {
    if (statusMsg) statusMsg.textContent = "Stel eerst uw studentnaam in via de zijbalk.";
    listContainer.innerHTML = '<div style="color: #c00; font-weight: bold;">Studentnaam ontbreekt. Stel deze in via de zijbalk links.</div>';
    return;
  }
  
  if (!submissionCode) {
    submissionCode = prompt("Voer de inlevercode in om uw vragen te laden:");
    if (!submissionCode || submissionCode.trim() === '') {
      if (statusMsg) statusMsg.textContent = "Inlevercode is verplicht om vragen op te halen.";
      listContainer.innerHTML = '<div style="color: #c00; font-weight: bold;">Inlevercode ontbreekt.</div>';
      return;
    }
    localStorage.setItem('submission_code', submissionCode.trim());
  }
  
  const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxWV1UzmfhJ0fbTaXPu-0WL7auw4dAwtYXdC4Sfoyc0gsuZ35sn5IDS_RxaVf9_RApA/exec';
  try {
    const response = await fetch(WEB_APP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({
        action: "list",
        studentName: studentName,
        submissionCode: submissionCode
      })
    });
    const result = await response.json();
    if (result.status === "success") {
      // Filter bestanden voor component 'vraag'
      const list = result.files.filter(f => f.component === "vraag");
      
      if (list.length === 0) {
        listContainer.innerHTML = '<div style="color: #666; font-style: italic;">Geen vragen gevonden.</div>';
        if (statusMsg) statusMsg.textContent = "Lijst is bijgewerkt.";
        return;
      }
      
      listContainer.innerHTML = '';
      const urlParams = new URLSearchParams(window.location.search);
      const isTeacher = (studentName === 'docentJMJ' || urlParams.get('rol') === 'docent');
      
      // Sorteer van nieuw naar oud
      list.sort((a, b) => b.created - a.created);
      
      list.forEach(f => {
        let isAnswered = f.name.includes("Vraag_BEANTWOORD");
        let displayTitle = f.name.replace(".txt", "");
        
        // Haal studentnaam en timestamp uit de bestandsnaam
        // Format: [studentName]_Vraag_[STATUS]_[yyyy-MM-dd]_[HH-mm-ss]
        const parts = displayTitle.split("_");
        let displayLabel = "";
        if (parts.length >= 4) {
          const sName = parts[0];
          const dateStr = parts[3];
          const timeStr = parts.slice(4).join(":") || "";
          const formattedTime = timeStr.replace(/-/g, ":");
          displayLabel = isTeacher ? `${sName} (${dateStr} ${formattedTime})` : `Vraag (${dateStr} ${formattedTime})`;
        } else {
          displayLabel = displayTitle;
        }
        
        const item = document.createElement('div');
        item.className = 'question-item';
        item.onclick = () => openQuestion(f.id, isAnswered, displayLabel);
        item.innerHTML = `
          <span style="font-weight: 550; color: #333;">${displayLabel}</span>
          <span class="status-badge ${isAnswered ? 'status-beantwoord' : 'status-open'}">${isAnswered ? 'BEANTWOORD' : 'OPEN'}</span>
        `;
        listContainer.appendChild(item);
      });
      
      if (statusMsg) statusMsg.textContent = `Er zijn ${list.length} vragen geladen.`;
    } else {
      listContainer.innerHTML = `<div style="color: #c00;">Fout: ${result.message}</div>`;
      if (statusMsg) statusMsg.textContent = "Fout bij ophalen.";
    }
  } catch (e) {
    console.error(e);
    listContainer.innerHTML = '<div style="color: #c00;">Netwerkfout bij ophalen van vragen.</div>';
    if (statusMsg) statusMsg.textContent = "Netwerkfout.";
  }
}

async function openQuestion(fileId, isAnswered, label) {
  const statusMsg = document.getElementById('vraag-status-message');
  if (statusMsg) statusMsg.textContent = `Vraag "${label}" openen...`;
  
  const studentName = localStorage.getItem('student_name') || '';
  const submissionCode = localStorage.getItem('submission_code') || '';
  
  const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxWV1UzmfhJ0fbTaXPu-0WL7auw4dAwtYXdC4Sfoyc0gsuZ35sn5IDS_RxaVf9_RApA/exec';
  try {
    const response = await fetch(WEB_APP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({
        action: "read",
        fileId: fileId,
        studentName: studentName,
        submissionCode: submissionCode
      })
    });
    const result = await response.json();
    if (result.status === "success") {
      editor.setValue(result.text, -1);
      active_question_file_id = fileId;
      
      const urlParams = new URLSearchParams(window.location.search);
      const isTeacherMode = (urlParams.get('rol') === 'docent') || (studentName === 'docentJMJ' && localStorage.getItem('teacher_mode_enabled') === 'true');
      const answerPanel = document.getElementById('vraag-answer-panel');
      
      if (isTeacherMode) {
        if (answerPanel) answerPanel.style.display = 'block';
        editor.setReadOnly(false);
      } else {
        if (answerPanel) answerPanel.style.display = 'none';
        editor.setReadOnly(isAnswered); // student mag niet bewerken na beantwoording
      }
      
      if (typeof updateInleverBtnVisibility === 'function') {
        updateInleverBtnVisibility();
      }
      
      if (statusMsg) statusMsg.textContent = `Vraag "${label}" geladen in de editor.`;
    } else {
      alert("Fout bij openen: " + result.message);
    }
  } catch (e) {
    console.error(e);
    alert("Netwerkfout bij laden van vraag.");
  }
}

function submitAnswer() {
  if (typeof inleveren === 'function') {
    inleveren();
  }
}

function cancelAnswer() {
  active_question_file_id = null;
  const answerPanel = document.getElementById('vraag-answer-panel');
  if (answerPanel) answerPanel.style.display = 'none';
  editor.setValue("// Typ hier uw vraag aan de docent...\n", -1);
  if (typeof updateInleverBtnVisibility === 'function') {
    updateInleverBtnVisibility();
  }
}

function setData(d) {
  // Geen simulatie-acties nodig voor de vraag-component
}
