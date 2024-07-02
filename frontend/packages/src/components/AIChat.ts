import {LitElement, css, html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';

@customElement("ai-chat")
export class AIChat extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  @property({type: String})
  name?: string;

  @property({attribute: false})
  data = {};

  render() {
    return html`<div>${this.name}!</div>`;
  }
}

