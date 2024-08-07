import { AIChat as AIChatLit } from "@esh2n.com/ui";
import { createComponent } from "@lit/react";
import React from "react";

export interface Message {
	id: number;
	text: string;
	sender: "user" | "ai";
	isContinuous?: boolean;
}

interface AIChatReactProps {
	messages: Message[];
	onMessageSent: (e: CustomEvent) => void;
	updateLastAIMessage: (text: string) => void;
	headerTxt: string;
	inputPlaceholder: string;
}

class AIChatReactWrapper extends AIChatLit {
	props!: AIChatReactProps;

	constructor(props: AIChatReactProps) {
		super();
		this.props = props;
	}

	connectedCallback() {
		super.connectedCallback();
		this.headerTxt = this.props.headerTxt;
		this.inputPlaceholder = this.props.inputPlaceholder;
		this.messages = this.props.messages;
	}

	sendMessage() {
		if (this.inputMessage.trim() !== "") {
			this.props.onMessageSent(
				new CustomEvent("message-sent", { detail: this.inputMessage }),
			);
			this.inputMessage = "";
			this.requestUpdate();
		}
	}

	updateLastAIMessage(text: string) {
		this.props.updateLastAIMessage(text);
	}
}

// @ts-ignore
export const AIChatReact = createComponent<AIChatReactProps>({
	tagName: "ai-chat",
	elementClass: AIChatReactWrapper,
	react: React,
	events: {
		onMessageSent: "message-sent",
	},
});
