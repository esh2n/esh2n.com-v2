/// <reference types="react-scripts" />

declare namespace JSX {
	interface IntrinsicElements {
		"ai-chat": {
			headerTxt?: string;
			inputPlaceholder?: string;
			inputMessage?: string;
			messages?: Message[];
		};
	}
}
