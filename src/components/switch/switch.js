import { html, css, LitElement } from 'lit';

/**
 * @attr {boolean} disabled - disables the element
 * @attr {boolean} isToggled - sets the toggled state of the component
 *
 * @csspart container - Styles the color of the container
 *
 * @slot thumb - You can override the thumb
 *
 * @cssprop --track-color - Controls the color of the track
 *
 * @prop {boolean} disabled - disables the elememnt
 * @prop {boolean} isToggled - sets the toggled state of the component
 *
 * @event {Event} change - change event
 *
 * @summary This is the switch element for the custom library
 *
 * @tag test-switch
 */

class Switch extends LitElement {
  static styles = css`
    * {
      box-sizing: border-box;
    }

    :host {
      display: inline-block;
      width: fit-content;

    }

    [role="switch"] {
      padding: 8px;
      outline: 0 solid #005a9c;
    }

    [role="switch"]:focus,
    [role="switch"]:hover {
      outline-width: 2px;
      background-color: #def;
      cursor: pointer;
    }

    .switch {
      position: relative;
      display: block;
      border: 2px solid black;
      border-radius: 12px;
      height: 20px;
      width: 40px;
    }

    .thumb {
      position: absolute;
      top: 2px;
      left: 2px;
      display: inline-block;
      border: 2px solid black;
      border-radius: 8px;
      height: 12px;
      width: 12px;
      background: black;
    }

    [aria-checked="true"] .thumb {
      left: 21px;
      background: green;
      border-color: green;
    }


    /* Add your custom CSS properties here */
    :host {
      --track-color: #000;
    }
  `;

  static properties = {
    disabled: { type: Boolean },
    isToggled: { type: Boolean },
  };

  constructor() {
    super();
    this.disabled = false;
    this.isToggled = false;
  }

  handleClick = () => {
    this.isToggled = !this.isToggled;
  }

  render() {
    return html`
      <div @click=${this.handleClick} part="container" role="switch"
      aria-checked=${this.isToggled}
      tabindex="0">
      <span class="switch">
      <slot name="thumb">
          <span class="thumb"></span>
        </slot>
      </span>
  </div>
    `;
  }
}

customElements.define('test-switch', Switch);
