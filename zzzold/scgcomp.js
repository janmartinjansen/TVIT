// Maak een custom element genaamd <svg-editor>
class SvgEditor extends HTMLElement {
    constructor() {
        super();

        // Maak een shadow DOM
        this.attachShadow({ mode: 'open' });

        // Voeg de HTML structuur toe
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    font-family: Arial, sans-serif;
                }
                #editor {
                    height: 300px;
                    border: 1px solid #ccc;
                    margin-bottom: 10px;
                }
                #output {
                    border: 1px solid #ccc;
                    padding: 10px;
                }
                button {
                    margin-bottom: 10px;
                }
            </style>
            <div id="editor"></div>
            <button id="run">Run</button>
            <div id="output"></div>
        `;

        // Bind elementen
        this.editorContainer = this.shadowRoot.querySelector('#editor');
        this.runButton = this.shadowRoot.querySelector('#run');
        this.outputDiv = this.shadowRoot.querySelector('#output');
    }

    connectedCallback() {
        // Initialiseer de Ace editor
        this.editor = ace.edit(this.editorContainer);
        this.editor.setTheme("ace/theme/monokai");
        this.editor.session.setMode("ace/mode/javascript");

        // Voeg een klikhandler toe aan de knop
        this.runButton.addEventListener('click', () => this.runCode());
    }

    runCode() {
        // Haal de inhoud van de editor op
        const code = this.editor.getValue();

        try {
            // Genereer SVG door de code als functie uit te voeren
            const generateSvg = new Function('return ' + code)();
            if (typeof generateSvg === 'function') {
                const svgContent = generateSvg();
                this.outputDiv.innerHTML = svgContent;
            } else {
                this.outputDiv.textContent = 'De code moet een functie retourneren.';
            }
        } catch (error) {
            this.outputDiv.textContent = 'Fout in de code: ' + error.message;
        }
    }
}

// Registreer het custom element
customElements.define('svg-editor', SvgEditor);

// Gebruik de component
// Voeg de volgende tag toe aan je HTML:
// <svg-editor></svg-editor>
