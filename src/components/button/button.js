import { html, css, LitElement } from 'lit';

/**
 * @attr {boolean} disabled - disables the element
 *
 * @csspart button - Styles the color of the button
 *
 * @slot icon - You can put an icon in here
 *
 * @cssprop --text-color - Controls the color of the button
 *
 * @prop {boolean} disabled - disables the elememnt
 *
 * @event {Event} click - click event
 *
 * @summary This is the button element for the custom library
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
    }
  `;

  static properties = {
    disabled: { type: Boolean, reflect: true },
    label: { type: String }
  };

  render() {
    return html`
      <button part="button" ?disabled=${this.disabled}>
        <slot name="icon"></slot>
        ${this.label}
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
