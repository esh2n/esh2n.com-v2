"use client";
import { themeState } from "@/atoms/themeState";
import { Switch } from "@/components/ui/switch";
import type { ThemeState } from "@/types/atoms";
import { Moon, Sun } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";

import "./style.scss";

export default function ThemeSwitcher(): JSX.Element {
	const [theme, setTheme] = useRecoilState<ThemeState>(themeState);
	const isDarkMode = theme.isDarkMode;
	const initialRenderRef = useRef(true);

	const applyTheme = useCallback((currentTheme: ThemeState): void => {
		const themeName = currentTheme.theme;
		const className = `${themeName}${currentTheme.isDarkMode ? "" : "-light"}`;
		const classList = Array.from(document.documentElement.classList);
		for (const cls of classList) {
			if (cls.startsWith(themeName) || cls.endsWith("-light")) {
				document.documentElement.classList.remove(cls);
			}
		}
		document.documentElement.classList.add(className);
	}, []);

	useEffect(() => {
		if (initialRenderRef.current) {
			initialRenderRef.current = false;
			// Load theme from localStorage on initial render
			const savedTheme = localStorage.getItem("theme");
			if (savedTheme) {
				const parsedTheme = JSON.parse(savedTheme) as ThemeState;
				setTheme(parsedTheme);
			} else {
				// If no saved theme, save the current theme to localStorage
				localStorage.setItem("theme", JSON.stringify(theme));
			}
		} else {
			// Save theme to localStorage on subsequent renders
			localStorage.setItem("theme", JSON.stringify(theme));
		}
		// Apply theme on every render
		applyTheme(theme);
	}, [theme, setTheme, applyTheme]);

	const toggleMode = useCallback((): void => {
		setTheme((prevTheme) => ({
			...prevTheme,
			isDarkMode: !prevTheme.isDarkMode,
		}));
	}, [setTheme]);

	return (
		<div className="tw-flex tw-items-center tw-space-x-1">
			<Switch
				id="dark-mode"
				className=""
				checked={isDarkMode}
				onCheckedChange={toggleMode}
			/>
			{!isDarkMode ? (
				<Sun className="icon-sun tw-h-5 tw-w-6" fill="currentColor" />
			) : (
				<Moon className="icon-moon tw-h-5 tw-w-6" fill="currentColor" />
			)}
		</div>
	);
}
