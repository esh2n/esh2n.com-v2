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
		const modeClass = currentTheme.isDarkMode ? "dark" : "";
		document.documentElement.classList.remove("dark");
		document.documentElement.classList.remove(
			"default",
			"nord",
			"monokai",
			"dracula",
			"one-dark",
			"solarized",
			"tokyo-night",
		);
		if (modeClass) {
			document.documentElement.classList.add(themeName, modeClass);
		} else {
			document.documentElement.classList.add(themeName);
		}
	}, []);

	useEffect(() => {
		if (initialRenderRef.current) {
			initialRenderRef.current = false;
			const savedTheme = localStorage.getItem("theme");
			if (savedTheme) {
				const parsedTheme = JSON.parse(savedTheme) as ThemeState;
				setTheme(parsedTheme);
			} else {
				localStorage.setItem("theme", JSON.stringify(theme));
			}
		} else {
			localStorage.setItem("theme", JSON.stringify(theme));
		}
		applyTheme(theme);
		document.body.style.display = "block";
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
