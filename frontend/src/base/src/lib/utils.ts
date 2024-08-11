import type { Theme } from "@/types/atoms";
import { type ClassValue, clsx } from "clsx";
import { BookOpenText, Settings } from "lucide-react";
import {
	BsFileEarmark,
	BsFileEarmarkCode,
	BsFileEarmarkImage,
	BsFileEarmarkMusic,
	BsFileEarmarkZip,
	BsFiletypeCss,
	BsFiletypeDocx,
	BsFiletypeHtml,
	BsFiletypeJs,
	BsFiletypeJson,
	BsFiletypePdf,
	BsFiletypeTsx,
	BsFiletypeTxt,
	BsMarkdown,
} from "react-icons/bs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const knownPaths: Record<string, string> = {
	home: "tsx",
	blogs: "json",
	resume: "md",
	readme: "md",
	contact: "json",
	about: "md",
	settings: "json",
};

const pathToFileNameMap: Record<string, string> = {
	"/": "Home",
	"/about": "ABOUTME",
	"/resume": "RESUME",
	"/readme": "README",
	"/contact": "contact",
	"/blogs": "blogs",
	"/settings": "settings",
};

const extensionMap: Record<string, IconInfo> = {
	tsx: { icon: BsFiletypeTsx, color: "#3178c6" },
	ts: { icon: BsFileEarmarkCode, color: "#3178c6" },
	jsx: { icon: BsFileEarmarkCode, color: "#61dafb" },
	js: { icon: BsFiletypeJs, color: "#f7df1e" },
	md: { icon: BsMarkdown, color: "#42A5F5", isFilled: false },
	json: { icon: BsFiletypeJson, color: "#FBC02D" },
	txt: { icon: BsFiletypeTxt, color: "#FF5722" },
	html: { icon: BsFiletypeHtml, color: "#e34c26" },
	css: { icon: BsFiletypeCss, color: "#264de4" },
	scss: { icon: BsFiletypeCss, color: "#c6538c" },
	pdf: { icon: BsFiletypePdf, color: "#f40f02" },
	docx: { icon: BsFiletypeDocx, color: "#2b579a" },
	doc: { icon: BsFiletypeDocx, color: "#2b579a" },
	jpg: { icon: BsFileEarmarkImage, color: "#3085c3" },
	jpeg: { icon: BsFileEarmarkImage, color: "#3085c3" },
	png: { icon: BsFileEarmarkImage, color: "#3085c3" },
	gif: { icon: BsFileEarmarkImage, color: "#3085c3" },
	mp3: { icon: BsFileEarmarkMusic, color: "#1ed760" },
	wav: { icon: BsFileEarmarkMusic, color: "#1ed760" },
	zip: { icon: BsFileEarmarkZip, color: "#fecc00" },
	rar: { icon: BsFileEarmarkZip, color: "#fecc00" },
	blogs: { icon: BookOpenText, color: "#4CAF50", isStrokeIcon: true },
	settings: { icon: Settings, color: "#9E9E9E", isStrokeIcon: true },
};

type IconInfo = {
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	color: string;
	isStrokeIcon?: boolean;
	isFilled?: boolean;
};

const getLastSegment = (path: string): string => {
	const segments = path.split("/").filter(Boolean);
	return segments.length ? segments[segments.length - 1] : "home";
};

const getSecondLastSegment = (path: string): string => {
	const segments = path.split("/").filter(Boolean);
	return segments.length > 1 ? segments[segments.length - 2] : "";
};

export const getExtensionByPath = (path: string): string => {
	const lastSegment = getLastSegment(path);
	const secondLastSegment = getSecondLastSegment(path);

	if (path.includes("changelog")) return "txt";
	if (secondLastSegment === "blogs") return "md";

	return knownPaths[lastSegment] || knownPaths[secondLastSegment] || "html";
};

export const getFileNameWithExtension = (path: string): string => {
	const fileName = pathToFileNameMap[path] || getLastSegment(path);
	const extension = getExtensionByPath(path);
	return `${fileName}.${extension}`;
};

export const getFileIconInfo = (filename: string): IconInfo => {
	const extension =
		filename.split(".").pop()?.toLowerCase() || filename.toLowerCase();
	return extensionMap[extension] || { icon: BsFileEarmark, color: "#6e7681" };
};

export const getFileNameForPath = (path: string): string => {
	const lastSegment = getLastSegment(path);
	const extension = getExtensionByPath(path);
	return `${lastSegment}.${extension}`;
};

export const getTabLabelForPath = (path: string): string => {
	return path === "/" ? "home" : getLastSegment(path);
};

export const getShikiTheme = (theme: Theme, isDarkMode: boolean): string => {
	switch (theme) {
		case "default":
			return isDarkMode ? "github-dark" : "github-light";
		case "nord":
			return isDarkMode ? "nord" : "github-light";
		case "monokai":
			return isDarkMode ? "monokai" : "github-light";
		case "one-dark":
			return isDarkMode ? "one-dark-pro" : "one-light";
		case "solarized":
			return isDarkMode ? "solarized-dark" : "solarized-light";
		case "dracula":
			return isDarkMode ? "dracula" : "github-light";
		case "tokyo-night":
			return isDarkMode ? "tokyo-night" : "tokyo-night-light";
	}
};
export const formatDate = (dateString: string): string => {
	const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/);
	if (match) {
		const [_, year, month, day] = match;
		return `${year}/${month}/${day}`;
	}
	console.error(`Invalid date format: ${dateString}`);
	return dateString;
};
