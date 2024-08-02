import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

interface Message {
	id: number;
	text: string;
	sender: "user" | "ai";
	isContinuous?: boolean;
}

@customElement("ai-chat")
export class AIChat extends LitElement {
	static styles = css`

    /* Default Theme */
    :host {
        /* Foundation */
        --ai-chat-font-family: 'Roboto', sans-serif;
        --ai-chat-background-color: #2E3440;
        --ai-chat-text-color: #ECEFF4;
        --ai-chat-border-color: #3b4252;
        --ai-chat-border-radius: 12px;

        /* Header */
        --ai-chat-header-bg-color: #2E3440;
        --ai-chat-header-font-size: 10px;
        --ai-chat-header-text-color: #ECEFF4;
        --ai-chat-header-icon: '\\f075';  /* FontAwesome comment icon */

        /* Message */
        --ai-chat-message-font-size: 12px;
        --ai-chat-message-border-radius: 20px;
        --ai-chat-user-message-bg-color: #3B4252;
        --ai-chat-user-message-text-color: #ECEFF4;
        --ai-chat-ai-message-bg-color: #2E3440;
        --ai-chat-ai-message-text-color: #ECEFF4;
        --ai-chat-ai-icon: '\\f544';  /* FontAwesome robot icon */
        --ai-chat-ai-icon-bg-color: #88C0D0;
        --ai-chat-ai-icon-text-color: #2E3440;

        /* Input */
        --ai-chat-input-field-bg-color: #3B4252;
        --ai-chat-input-placeholder-color: #ECEFF4;
        --ai-chat-input-border-color: #3B4252;
        --ai-chat-input-border-radius: 20px;
        --ai-chat-input-field-font-size: 14px;

        /* Button */
        --ai-chat-button-bg-color: #88C0D0;
        --ai-chat-button-icon: '\\f1d8';  /* Default to FontAwesome paper plane icon */
        --ai-chat-icon-font-family: 'Font Awesome 6 Free';
        --ai-chat-button-text-color: #2E3440;
    }

    /* Foundation (reset and base styles) */
    :host {
      display: block;
      font-family: var(--ai-chat-font-family);
      color: var(--ai-chat-text-color);
      background-color: var(--ai-chat-background-color);
      height: 100%;
      width: 100%;
    }

    /* Layout */
    .l-chat {
      box-sizing: border-box;
      max-width: 600px;
      height: inherit;
      margin: 0 auto;
      border: 1px solid var(--ai-chat-border-color);
      border-radius: var(--ai-chat-border-radius);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .l-chat__messages {
      flex: 1;
      height: 300px;
      overflow-y: auto;
      padding: 10px;
    }

    .l-chat__input {
      padding: 10px;
      background-color: var(--ai-chat-input-bg-color);
    }

    /* Object - Component */
    .c-header {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      background-color: var(--ai-chat-header-bg-color);
      font-size: var(--ai-chat-header-font-size);
      color: var(--ai-chat-header-text-color);
    }

    .c-header__icon {
      margin-right: 10px;
      font-size: 14px;
    }

    .c-header__icon::before {
      content: var(--ai-chat-header-icon);
      font-family: var(--ai-chat-icon-font-family);
      font-weight: 900;
    }

    .c-message {
      display: flex;
      align-items: start;
      margin-top: 10px;
      border-radius: var(--ai-chat-message-border-radius);
      max-width: 70%;
      font-size: var(--ai-chat-message-font-size);
    }

    .c-message.u-continuous {
      margin-top: 5px;
    }

    .c-message__content {
      padding: 8px 12px;
      border-radius: var(--ai-chat-message-border-radius);
      font-size: var(--ai-chat-message-font-size);
    }

    .c-message__content.u-ai {
      padding-left: 8px;
      padding-top: 0px;
      max-width: 100%;
    }

    .c-message__icon {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--ai-chat-ai-icon-bg-color);
      border-radius: 50%;
    }

    .c-message__icon::before {
      content: var(--ai-chat-ai-icon);
      font-family: var(--ai-chat-icon-font-family);
      font-weight: 900;
      font-size: 14px;
      color: var(--ai-chat-ai-icon-text-color);
    }

    .c-message__icon.u-continuous {
      background-color: var(--ai-chat-ai-message-bg-color);
    }

    .c-message__icon.u-continuous::before {
      content: '';
    }


    .c-input {
      display: flex;
      align-items: center;
      padding: 4px 8px;
      border: 1px solid var(--ai-chat-input-border-color);
      border-radius: var(--ai-chat-input-border-radius);
      background-color: var(--ai-chat-input-field-bg-color);

    }

    .c-input__field {
      flex-grow: 1;
      border: none;
      outline: none;
      padding: 8px;
      font-family: inherit;
      background-color: var(--ai-chat-input-field-bg-color);
      color: var(--ai-chat-input-field-text-color);
      font-size: var(--ai-chat-input-field-font-size);
    }

    .c-input__field::placeholder {
      color: var(--ai-chat-input-placeholder-color);
      font-size: var(--ai-chat-input-field-font-size);
    }

    .c-button {
      width: 30px;
      height: 30px;
      background-color: var(--ai-chat-button-bg-color);
      color: var(--ai-chat-button-text-color);
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      margin-left: 8px;
    }

    .c-button__icon::before {
      content: var(--ai-chat-button-icon);
      font-family: var(--ai-chat-icon-font-family);
      font-size: var(--ai-chat-input-field-font-size);
      font-weight: 900;
    }

    /* Object - Project */
    .p-chat__message--user {
      background-color: var(--ai-chat-user-message-bg-color);
      color: var(--ai-chat-user-message-text-color);
      align-self: flex-end;
      margin-left: auto;
    }

    .p-chat__message--ai {
      background-color: var(--ai-chat-ai-message-bg-color);
      color: var(--ai-chat-ai-message-text-color);
      align-self: flex-start;
    }

    /* Object - Utility */
    .u-hidden {
      display: none;
    }
  `;

	constructor() {
		super();
		const fontEl = document.createElement("link");
		fontEl.rel = "stylesheet";
		fontEl.href = "https://use.fontawesome.com/releases/v6.2.0/css/all.css";
		document.head.appendChild(fontEl);
	}

	@property({ type: String })
	headerTxt = "AI Chat";

	@property({ type: String })
	inputPlaceholder = "メッセージを入力...";

	@property({ type: String })
	inputMessage = "";

	@property({ type: Array })
	messages: Message[] = [];

	@property({ type: String })
	buttonIcon = "\\f1d8"; // Default FontAwesome paper plane icon

	render() {
		return html`
      <div class="l-chat">
        <header class="c-header">
          <span class="c-header__icon"></span>
          ${this.headerTxt}
        </header>
        <div class="l-chat__messages">
          ${repeat(
						this.messages,
						(message) => message.id,
						(message) => html`
            <div class="c-message ${message.sender === "user" ? "p-chat__message--user" : "p-chat__message--ai"} ${message.isContinuous ? "u-continuous" : ""}">
                ${message.sender === "ai" ? html`<span class="c-message__icon ${message.isContinuous ? "u-continuous" : ""}"></span>` : ""}
              <div class="c-message__content ${message.sender === "ai" ? "u-ai" : ""}">
                ${message.text}
              </div>
            </div>
          `,
					)}
        </div>
        <div class="l-chat__input">
          <div class="c-input">
            <input
              class="c-input__field"
              type="text"
              .value=${this.inputMessage}
              @input=${this.handleInput}
              @keyup=${this.handleKeyUp}
              placeholder="${this.inputPlaceholder}"
            >
            <button class="c-button" @click=${this.sendMessage}>
              <span class="c-button__icon"></span>
            </button>
          </div>
        </div>
      </div>
    `;
	}

	updated(changedProperties: Map<string, unknown>) {
		if (changedProperties.has("buttonIcon")) {
			this.style.setProperty("--ai-chat-button-icon", `'${this.buttonIcon}'`);
		}
	}

	private handleInput(e: InputEvent) {
		const target = e.target as HTMLInputElement;
		this.inputMessage = target.value;
	}

	private handleKeyUp(e: KeyboardEvent) {
		if (e.key === "Enter") {
			this.sendMessage();
		}
	}

	private sendMessage() {
		if (this.inputMessage.trim() !== "") {
			this.messages = [
				...this.messages,
				{ id: Date.now(), text: this.inputMessage, sender: "user" },
			];
			this.inputMessage = "";
			if (
				this.messages.length > 1 &&
				this.messages[this.messages.length - 1].sender ===
					this.messages[this.messages.length - 2].sender
			) {
				this.messages[this.messages.length - 1].isContinuous = true;
			}
			this.requestUpdate();

			// AIの応答をシミュレート
			setTimeout(() => {
				this.messages = [
					...this.messages,
					{ id: Date.now(), text: "AIからの応答例です。", sender: "ai" },
				];
				if (
					this.messages.length > 1 &&
					this.messages[this.messages.length - 1].sender ===
						this.messages[this.messages.length - 2].sender
				) {
					this.messages[this.messages.length - 1].isContinuous = true;
				}
				this.requestUpdate();
			}, 1000);
		}
	}
}
