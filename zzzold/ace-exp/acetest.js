class MyCodeEditor extends HTMLElement {
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        #editor {
          height: 200px;
          width: 100%;
        }
      </style>
      <div id="editor"></div>
    `;
    this.editorDiv = this.shadowRoot.querySelector('#editor');
    this.aceEditor = null;
  }

  connectedCallback() {
    // Initialiseer Ace Editor nadat het element aan de DOM is toegevoegd
    this.initializeAceEditor();
  }

  initializeAceEditor() {
    if (this.editorDiv) {
      this.aceEditor = ace.edit(this.editorDiv);
      this.aceEditor.setTheme("ace/theme/monokai");
      this.aceEditor.session.setMode("ace/mode/javascript");
      // Andere Ace Editor configuraties kun je hier toevoegen
    }
  }

  getValue() {
    if (this.aceEditor) {
      return this.aceEditor.getValue();
    }
    return '';
  }

  setValue(value) {
    if (this.aceEditor) {
      this.aceEditor.setValue(value);
    }
  }
}

customElements.define('my-code-editor', MyCodeEditor);