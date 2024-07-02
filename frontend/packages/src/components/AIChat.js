var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
let AIChat = class AIChat extends LitElement {
    constructor() {
        super(...arguments);
        this.data = {};
    }
    static { this.styles = css `
    :host {
      display: block;
    }
  `; }
    render() {
        return html `<div>Hello!, ${this.name}!</div>`;
    }
};
__decorate([
    property({ type: String })
], AIChat.prototype, "name", void 0);
__decorate([
    property({ attribute: false })
], AIChat.prototype, "data", void 0);
AIChat = __decorate([
    customElement("ai-chat")
], AIChat);
export { AIChat };
