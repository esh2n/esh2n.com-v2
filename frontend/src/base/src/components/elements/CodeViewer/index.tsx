"use client";

import { themeState } from "@/atoms/themeState";
import { getShikiTheme } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import type { Highlighter } from "shiki";

import "./style.scss";

interface CodeViewerProps {
	content: string;
	language: string;
}

const CodeViewer: React.FC<CodeViewerProps> = ({ content, language }) => {
	const [highlightedCode, setHighlightedCode] = useState<string>("");
	const { theme, isDarkMode } = useRecoilValue(themeState);

	useEffect(() => {
		let highlighter: Highlighter;
		const highlight = async () => {
			const { createHighlighter } = await import("shiki");
			const shikiTheme = getShikiTheme(theme, isDarkMode);

			if (!highlighter) {
				highlighter = await createHighlighter({
					themes: [shikiTheme],
					langs: [language],
				});
			}

			const highlighted = highlighter.codeToHtml(content, {
				lang: language,
				theme: shikiTheme,
			});
			setHighlightedCode(highlighted);
		};

		highlight();
	}, [content, language, theme, isDarkMode]);

	return (
		<div className="code-viewer">
			{/* biome-ignore lint/security/noDangerouslySetInnerHtml: can't avoid */}
			<div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
		</div>
	);
};

export default CodeViewer;
