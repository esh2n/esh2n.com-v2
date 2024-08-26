"use client";
import { themeState } from "@/atoms/themeState";
import { Switch } from "@/components/ui/switch";
import type { ThemeState } from "@/types/atoms";
import { Moon, Sun } from "lucide-react";
import { Fira_Code, Inter, Open_Sans, Roboto } from "next/font/google";
import { useCallback, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";

import "./style.scss";
import { fontFamilyState } from "@/atoms/fontFamily";

const firaCode = Fira_Code({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ weight: ["400"], subsets: ["latin"] });
const openSans = Open_Sans({ subsets: ["latin"] });

export default function ThemeSwitcher(): JSX.Element {
	const [theme, setTheme] = useRecoilState<ThemeState>(themeState);
	const isDarkMode = theme.isDarkMode;
	const initialRenderRef = useRef(true);

	const [fontFamily, setFontFamily] = useRecoilState<string>(fontFamilyState);

	const applyTheme = useCallback(
		(currentTheme: ThemeState, currentFontFamily: string): void => {
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

			const font =
				fontFamily === "Fira Code"
					? firaCode
					: fontFamily === "Inter"
						? inter
						: fontFamily === "Roboto"
							? roboto
							: openSans;
			const body = document.body;
			body.className = font.className;
		},
		[fontFamily],
	);

	useEffect(() => {
		if (initialRenderRef.current) {
			initialRenderRef.current = false;
			const savedTheme = localStorage.getItem("theme");
			const savedFontFamily = localStorage.getItem("fontFamily");
			if (savedTheme) {
				const parsedTheme = JSON.parse(savedTheme) as ThemeState;
				setTheme(parsedTheme);
			} else {
				localStorage.setItem("theme", JSON.stringify(theme));
			}
			if (savedFontFamily) {
				const parsedFontFamily = JSON.parse(savedFontFamily) as string;
				setFontFamily(parsedFontFamily);
			} else {
				localStorage.setItem("fontFamily", JSON.stringify(fontFamily));
			}
		} else {
			localStorage.setItem("theme", JSON.stringify(theme));
			localStorage.setItem("fontFamily", JSON.stringify(fontFamily));
		}
		applyTheme(theme, fontFamily);
		document.body.style.display = "block";
	}, [theme, setTheme, applyTheme, fontFamily, setFontFamily]);

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
