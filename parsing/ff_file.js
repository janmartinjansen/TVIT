class MijnComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }); // Gebruik shadow DOM voor inkapseling
  }

  connectedCallback() {
    this.laadExterneInhoud('grammarnew.html');
  }

  async laadExterneInhoud(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Fout bij het laden van ${url}: ${response.status}`);
      }
      const html = await response.text();
      this.shadowRoot.innerHTML = html; // Plaats de inhoud in de shadow DOM
    } catch (error) {
      console.error('Kon externe inhoud niet laden:', error);
      this.shadowRoot.innerHTML = '<p>Fout bij het laden van de inhoud.</p>';
    }
  }
}

customElements.define('mijn-component', MijnComponent);