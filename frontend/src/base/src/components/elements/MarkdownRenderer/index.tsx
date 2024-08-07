"use client";

import { themeState } from "@/atoms/themeState";
import type { Theme } from "@/types/atoms";
import { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import "./style.scss";
import { getShikiTheme } from "@/lib/utils";

const MarkdownRenderer = ({ content }: { content: string }) => {
	const [html, setHtml] = useState<string>("");
	const { theme, isDarkMode } = useRecoilValue(themeState);

	const copyCode = useCallback(async (codeContent: string) => {
		try {
			await navigator.clipboard.writeText(codeContent);
			return true;
		} catch (err) {
			console.error("Failed to copy code:", err);
			return false;
		}
	}, []);

	useEffect(() => {
		const renderMarkdownAndHighlight = async () => {
			if (content) {
				try {
					const { codeToHtml } = await import("shiki");
					const md2html = await import("@esh2n.com/md2html");
					let renderedHtml = md2html.render_markdown(content);

					const parser = new DOMParser();
					const doc = parser.parseFromString(renderedHtml, "text/html");
					const codeBlocks = Array.from(doc.querySelectorAll("pre code"));

					const shikiTheme = getShikiTheme(theme, isDarkMode);

					for (const codeBlock of codeBlocks) {
						const code = codeBlock.textContent;
						if (code) {
							const langClass = Array.from(codeBlock.classList).find((cls) =>
								cls.startsWith("language-"),
							);
							const lang = langClass
								? langClass.replace("language-", "")
								: "plaintext";

							const highlightedCode = await codeToHtml(code, {
								lang: lang,
								theme: shikiTheme,
							});

							const wrapper = document.createElement("div");
							wrapper.className = "code-block-wrapper";
							wrapper.innerHTML = `
                                <div class="code-block-header">
                                    <span class="code-block-lang">${lang}</span>
                                    <button class="copy-button" aria-label="Copy code">
                                        Copy
                                    </button>
                                </div>
                                <div class="code-block-content">${highlightedCode}</div>
                            `;
							codeBlock.parentNode?.replaceChild(wrapper, codeBlock);
						}
					}

					renderedHtml = new XMLSerializer().serializeToString(doc.body);
					setHtml(renderedHtml);
				} catch (error) {
					console.error("Error rendering or highlighting markdown:", error);
					setHtml("<p>Error rendering content</p>");
				}
			} else {
				setHtml("<p>No content available</p>");
			}
		};

		renderMarkdownAndHighlight();
	}, [content, theme, isDarkMode]);

	useEffect(() => {
		const handleCopy = async (event: Event) => {
			const target = event.target as HTMLElement;
			if (!target.classList.contains("copy-button")) return;

			const button = target as HTMLButtonElement;
			const codeBlock = button
				.closest(".code-block-wrapper")
				?.querySelector("code");
			if (codeBlock) {
				const success = await copyCode(codeBlock.innerText);
				if (success) {
					const originalText = button.textContent;
					button.textContent = "Copied!";
					button.classList.add("copied");
					setTimeout(() => {
						button.textContent = originalText;
						button.classList.remove("copied");
					}, 2000);
				}
			}
		};

		const blogPost = document.querySelector(".blog-post");
		blogPost?.addEventListener("click", handleCopy as EventListener);

		return () => {
			blogPost?.removeEventListener("click", handleCopy as EventListener);
		};
	}, [copyCode]);

	return (
		<div className="blog-post">
			{/* biome-ignore lint/security/noDangerouslySetInnerHtml: cannot avoid using dangerouslySetInnerHtml */}
			<div dangerouslySetInnerHTML={{ __html: html }} />
		</div>
	);
};

export default MarkdownRenderer;
