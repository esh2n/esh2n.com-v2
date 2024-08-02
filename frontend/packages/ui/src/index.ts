import type { AIChat } from "./components/AIChat";

export * from "./components/AIChat";

declare global {
	interface HTMLElementTagNameMap {
		"ai-chat": AIChat;
	}
}
