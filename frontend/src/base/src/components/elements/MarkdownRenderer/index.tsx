"use client";

import { themeState } from "@/atoms/themeState";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import "./style.scss";
import { getShikiTheme } from "@/lib/utils";

interface OGPData {
	"og:title"?: string;
	"og:description"?: string;
	"og:site_name"?: string;
	"og:image"?: string;
}

const MarkdownRenderer = ({ content }: { content: string }) => {
	const [html, setHtml] = useState<string>("");
	const { theme, isDarkMode } = useRecoilValue(themeState);

	const shikiTheme = useMemo(
		() => getShikiTheme(theme, isDarkMode),
		[theme, isDarkMode],
	);

	const copyCode = useCallback(async (codeContent: string) => {
		try {
			await navigator.clipboard.writeText(codeContent);
			return true;
		} catch (err) {
			return false;
		}
	}, []);

	const fetchOGP = useCallback(async (url: string): Promise<OGPData> => {
		const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
		try {
			const response = await fetch(proxyUrl);
			const html = await response.text();
			const domParser = new DOMParser();
			const dom = domParser.parseFromString(html, "text/html");
			const ogp = Object.fromEntries(
				Array.from(dom.head.children)
					.filter(
						(element) =>
							element.tagName === "META" &&
							element.getAttribute("property")?.startsWith("og:"),
					)
					.map((element) => [
						element.getAttribute("property"),
						element.getAttribute("content"),
					]),
			);
			return ogp as OGPData;
		} catch (error) {
			return {};
		}
	}, []);

	const processLinkCards = useCallback(
		async (doc: Document) => {
			const linkCards = Array.from(doc.querySelectorAll(".link-card"));
			const processCard = async (card: Element) => {
				const url = card.getAttribute("data-url");
				if (url) {
					try {
						const ogpData = await fetchOGP(url);
						card.innerHTML = `
              <a href="${url}" target="_blank" rel="noopener noreferrer" class="link-card-content">
                <div class="link-card-text">
                  <p>${ogpData["og:title"] || url}</p>
                  <p>${ogpData["og:description"] || ""}</p>
                  <span>${ogpData["og:site_name"] || new URL(url).hostname}</span>
                </div>
                ${ogpData["og:image"] ? `<div class="link-card-image" style="background-image: url('${ogpData["og:image"]}')"></div>` : ""}
              </a>
            `;
					} catch (error) {
						console.error("Error processing link card:", error);
						card.innerHTML = `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
					}
				}
			};
			await Promise.all(linkCards.map(processCard));
		},
		[fetchOGP],
	);

	useEffect(() => {
		let isMounted = true;
		const renderMarkdownAndHighlight = async () => {
			if (!content) {
				setHtml("<p>No content available</p>");
				return;
			}

			try {
				const [{ codeToHtml }, { render_markdown }] = await Promise.all([
					import("shiki"),
					import("@esh2n.com/md2html"),
				]);

				let renderedHtml = render_markdown(content);
				const parser = new DOMParser();
				const doc = parser.parseFromString(renderedHtml, "text/html");

				const codeBlocks = Array.from(doc.querySelectorAll("pre code"));
				const highlightPromises = codeBlocks.map(async (codeBlock) => {
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

						return { codeBlock, highlightedCode, lang };
					}
				});

				const highlightResults = (await Promise.all(highlightPromises)).filter(
					(result): result is NonNullable<typeof result> =>
						result !== undefined,
				);

				for (const { codeBlock, highlightedCode, lang } of highlightResults) {
					if (highlightedCode) {
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

				await processLinkCards(doc);

				renderedHtml = new XMLSerializer().serializeToString(doc.body);

				if (isMounted) {
					setHtml(renderedHtml);
				}
			} catch (error) {
				console.error("Error rendering or highlighting markdown:", error);
				if (isMounted) {
					setHtml("<p>Error rendering content</p>");
				}
			}
		};

		renderMarkdownAndHighlight();

		return () => {
			isMounted = false;
		};
	}, [content, shikiTheme, processLinkCards]);

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
