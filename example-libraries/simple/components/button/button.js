import { html, css, LitElement } from 'lit';

/**
 * @attr {boolean} disabled - disables the component
 *
 * @csspart button - Styles the color of the button
 *
 * @slot icon - You can put an icon in here
 *
 * @cssprop --text-color - Controls the color of the button
 *
 * @prop {boolean} disabled - disables the button
 *
 * @event {Event} click - click event
 *
 * @summary This is the button element for the custom library
 * @description This is the button element for the custom library
 *
 * @tag test-button
 */

class TestButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }
    
    button {
      color: var(--text-color);
      font-size: 22px;
      padding: 8px;
    }

    button[disabled] {
      cursor: not-allowed;
    }
  `;

  static properties = {
    disabled: { type: Boolean, reflect: true },
    title: { type: String }
  };

  render() {
    return html`
      <button part="button" ?disabled=${this.disabled}>
        <slot name="icon"></slot>
        ${this.title}
      </button>
    `;
  }

  handleClick() {
    this.dispatchEvent(new Event('click', {
      composed: true
    }));
  }
}

customElements.define('test-button', TestButton);
