export namespace Elm {
	namespace Terminal {
		export interface App {
			ports: {
				scrollToBottom: {
					subscribe: (callback: () => void) => void;
					unsubscribe: (callback: () => void) => void;
				};
				focusInput: {
					send: (data: string) => void;
				};
			};
		}
		export function init(options: {
			node: HTMLElement | null;
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			flags?: any;
		}): App;
	}
}
