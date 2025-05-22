function loadFile() {
  var myfile = document.getElementById("uploadInput").files[0]
  var reader = new FileReader()
  reader.readAsText(myfile);
  reader.onload = function (event) {
     editor.setValue(event.target.result);
  }
}

function saveTM() {
  if ('Blob' in window) {
    var fileName = prompt('Please enter file name to save', 'tm.txt');
    if (fileName) {
      var textToWrite = editor.getValue();
      var textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });

      if ('msSaveOrOpenBlob' in navigator) {
        navigator.msSaveOrOpenBlob(textFileAsBlob, fileName);
      } else {
        var downloadLink = document.createElement('a');
        downloadLink.download = fileName;
        downloadLink.innerHTML = 'Download File';
        if ('webkitURL' in window) {
          // Chrome allows the link to be clicked without actually adding it to the DOM.
          downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
        } else {
          // Firefox requires the link to be added to the DOM before it can be clicked.
          downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
          downloadLink.onclick = destroyClickedElement;
          downloadLink.style.display = 'none';
          document.body.appendChild(downloadLink);
        }

        downloadLink.click();
      }
    }
  } else {
    alert('Your browser does not support files.');
  }
}
