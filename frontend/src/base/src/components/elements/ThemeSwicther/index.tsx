"use client";
import { themeState } from "@/atoms/themeState";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

import "./style.scss";

export default function ThemeSwitcher() {
	const [theme, setTheme] = useRecoilState(themeState);
	const isDarkMode = theme.isDarkMode;

	useEffect(() => {
		const themeName = theme.theme;
		const className = `${themeName}${isDarkMode ? "" : "-light"}`;
		document.documentElement.classList.add(className);
	});

	const toggleMode = () => {
		const isDarkMode = !theme.isDarkMode;
		setTheme({ ...theme, isDarkMode });

		const themeName = theme.theme;
		const darkClassName = `${themeName}`;
		const lightClassName = `${themeName}-light`;

		if (isDarkMode) {
			document.documentElement.classList.remove(lightClassName);
			document.documentElement.classList.add(darkClassName);
		} else {
			document.documentElement.classList.remove(darkClassName);
			document.documentElement.classList.add(lightClassName);
		}
	};

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
