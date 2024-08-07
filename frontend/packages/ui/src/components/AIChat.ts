import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
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
      font-size: 16px; /* ベースフォントサイズを設定 */
    }

    /* Layout */
    .l-chat {
      box-sizing: border-box;
      max-width: 100%; /* 最大幅を100%に変更 */
      height: 100%;
      margin: 0 auto;
      border: 1px solid var(--ai-chat-border-color);
      border-radius: var(--ai-chat-border-radius);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .l-chat__messages {
      flex: 1;
      min-height: 200px; /* 最小の高さを設定 */
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
      font-size: 0.875em; /* remからemに変更 */
      color: var(--ai-chat-header-text-color);
    }

    .c-header__icon {
      margin-right: 10px;
      font-size: 1em; /* 相対単位に変更 */
    }

    .c-message {
      display: flex;
      align-items: flex-start;
      margin-top: 10px;
      border-radius: var(--ai-chat-message-border-radius);
      max-width: 80%; /* 最大幅を増やす */
      font-size: 0.875em; /* remからemに変更 */
      word-wrap: break-word; /* 長い単語を折り返す */
    }

    .c-message.u-continuous {
      margin-top: 5px;
    }

    .c-message__content {
      padding: 8px 12px;
      border-radius: var(--ai-chat-message-border-radius);
      font-size: 1em; /* 相対単位に変更 */
    }

    .c-message__content.u-ai {
      padding-left: 8px;
      padding-top: 0px;
      max-width: 100%;
    }

    .c-message__icon {
      min-width: 24px; /* 最小幅を設定 */
      min-height: 24px; /* 最小高さを設定 */
      width: 1.5em; /* 相対単位に変更 */
      height: 1.5em; /* 相対単位に変更 */
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--ai-chat-ai-icon-bg-color);
      border-radius: 50%;
      margin-right: 8px; /* アイコンとメッセージの間隔を追加 */
    }

    .c-message__icon::before {
      content: var(--ai-chat-ai-icon);
      font-family: var(--ai-chat-icon-font-family);
      font-weight: 900;
      font-size: 0.875em; /* 相対単位に変更 */
      color: var(--ai-chat-ai-icon-text-color);
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
      font-size: 0.875em;
      min-width: 0;
    }

    .c-input__field::placeholder {
      color: var(--ai-chat-input-placeholder-color);
      font-size: 1em;
    }

    .c-button {
      min-width: 30px;
      min-height: 30px;
      width: 2em;
      height: 2em;
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
      flex-shrink: 0;
    }

    .c-button__icon::before {
      content: var(--ai-chat-button-icon);
      font-family: var(--ai-chat-icon-font-family);
      font-size: 1em;
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

    /* Media Queries */
    @media (max-width: 480px) {
      :host {
        font-size: 14px;
      }

      .l-chat__messages {
        padding: 5px;
      }

      .c-message {
        max-width: 90%;
      }

      .c-input__field {
        font-size: 1em;
      }
    }
  `;
	constructor() {
		super();
		const fontEl = document.createElement("link");
		fontEl.rel = "stylesheet";
		fontEl.href = "https://use.fontawesome.com/releases/v6.2.0/css/all.css";
		document.head.appendChild(fontEl);
	}

	@state()
	private isComposing = false;

	private handleCompositionStart() {
		this.isComposing = true;
	}

	private handleCompositionEnd() {
		this.isComposing = false;
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

	@property({ type: Function })
	onMessageSent?: (event: CustomEvent<{ message: string }>) => void;

	connectedCallback() {
		super.connectedCallback();
		if (this.onMessageSent) {
			this.addEventListener(
				"message-sent",
				this.onMessageSent as EventListener,
			);
		}
	}

	disconnectedCallback() {
		if (this.onMessageSent) {
			this.removeEventListener(
				"message-sent",
				this.onMessageSent as EventListener,
			);
		}
		super.disconnectedCallback();
	}

	addMessage(text: string, sender: "user" | "ai") {
		this.messages = [
			...this.messages,
			{
				id: Date.now(),
				text,
				sender,
				isContinuous: this.isContinuousMessage(sender),
			},
		];
		this.requestUpdate();
	}

	updateLastAIMessage(text: string) {
		if (
			this.messages.length > 0 &&
			this.messages[this.messages.length - 1].sender === "ai"
		) {
			this.messages[this.messages.length - 1].text = text;
		} else {
			this.addMessage(text, "ai");
		}
		this.requestUpdate();
	}

	private isContinuousMessage(sender: "user" | "ai"): boolean {
		return (
			this.messages.length > 0 &&
			this.messages[this.messages.length - 1].sender === sender
		);
	}

	sendMessage() {
		if (this.inputMessage.trim() !== "") {
			this.addMessage(this.inputMessage, "user");
			const event = new CustomEvent("message-sent", {
				detail: { message: this.inputMessage },
				bubbles: true,
				composed: true,
			});
			this.dispatchEvent(event);

			if (this.onMessageSent) {
				this.onMessageSent(event);
			}

			this.inputMessage = "";
			this.requestUpdate();
		}
	}

	private handleInput(e: InputEvent) {
		const target = e.target as HTMLInputElement;
		this.inputMessage = target.value;
	}

	private handleKeyDown(e: KeyboardEvent) {
		if (e.key === "Enter" && !e.shiftKey) {
			if (!this.isComposing) {
				e.preventDefault();
				this.sendMessage();
			}
		}
	}

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
              @keydown=${this.handleKeyDown}
              @compositionstart=${this.handleCompositionStart}
              @compositionend=${this.handleCompositionEnd}
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
}
