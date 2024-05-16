class MyElement extends HTMLElement {
  static get observedAttributes() {
    return ['disabled'];
  }

  set disabled(val) {
    this.__disabled = val;
  }
  get disabled() {
    return this.__disabled;
  }

  connectedCallback() {
    const button = document.createElement('button')
    button.innerText = 'Click me';

    this.buttonEl = button

    if (this.hasAttribute('disabled')) {
      button.setAttribute('disabled', '')
    }

    this.appendChild(button);    
  }

  fire() {
    this.dispatchEvent(new Event('disabled-changed'));
  }
}

customElements.define('my-element', MyElement);
