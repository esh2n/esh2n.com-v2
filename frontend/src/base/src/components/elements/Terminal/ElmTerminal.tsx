import { useCallback, useEffect, useRef, useState } from "react";
import "./style.scss";

import type { Elm } from "@/elm/Terminal.elm";

export default function ElmTerminal() {
	const elmNodeRef = useRef<HTMLDivElement>(null);
	const [elmApp, setElmApp] = useState<Elm.Terminal.App | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isFocused, setIsFocused] = useState(false); // フォーカス状態を追加

	// biome-ignore lint/correctness/useExhaustiveDependencies: elmApp is not exhaustive
	useEffect(() => {
		let mounted = true;

		const initializeElm = async () => {
			if (typeof window !== "undefined" && elmNodeRef.current) {
				try {
					const { Elm } = await import("@/elm/Terminal.elm");

					if (typeof Elm.Terminal.init === "function") {
						const app = Elm.Terminal.init({
							node: elmNodeRef.current,
						});

						if (mounted) {
							setElmApp(app);
							setIsLoading(false);

							app.ports.scrollToBottom.subscribe(() => {
								setTimeout(() => {
									const terminalContent =
										document.querySelector(".terminal-content");
									if (terminalContent) {
										terminalContent.scrollTop = terminalContent.scrollHeight;
									}
								}, 0);
							});
						}
					} else {
						throw new Error("elmApp is not a function");
					}
				} catch (error) {
					if (mounted) {
						setError(
							`エラー: ${error instanceof Error ? error.message : String(error)}`,
						);
						setIsLoading(false);
					}
				}
			}
		};

		const timer = setTimeout(initializeElm, 0);

		return () => {
			mounted = false;
			clearTimeout(timer);
			elmApp?.ports?.scrollToBottom?.unsubscribe?.(() => {});
		};
	}, []);

	const handleTerminalClick = useCallback(() => {
		if (elmApp?.ports?.focusInput) {
			elmApp.ports.focusInput.send("focus");
		}
		setIsFocused(true); // フォーカス時の状態を設定
	}, [elmApp]);

	const handleBlur = useCallback(() => {
		setIsFocused(false); // フォーカスが外れた時の状態を設定
	}, []);

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent) => {
			if (event.key === "Enter" || event.key === " ") {
				handleTerminalClick();
			}
		},
		[handleTerminalClick],
	);

	return (
		<div className="vscode-terminal-container">
			<div
				className="vscode-terminal"
				onClick={handleTerminalClick}
				onKeyDown={handleKeyDown}
				role="application"
				aria-label="Terminal"
			>
				{isLoading && (
					<div className="vscode-terminal-loading" aria-live="polite" />
				)}
				{error && (
					<div className="vscode-terminal-error" aria-live="assertive">
						{error}
					</div>
				)}
				<div ref={elmNodeRef} className="elm-terminal-content" />
			</div>
		</div>
	);
}
