import { aiChatOpenState } from "@/atoms/aichat";
import { fontFamilyState } from "@/atoms/fontFamily";
import { terminalOpenState } from "@/atoms/terminal";
import { themeState } from "@/atoms/themeState";
import CodeViewer from "@/components/elements/CodeViewer";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const SettingsCode = () => {
	const [isClient, setIsClient] = useState(false);
	const theme = useRecoilValue(themeState);
	const fontFamily = useRecoilValue(fontFamilyState);
	const aiChatOpen = useRecoilValue(aiChatOpenState);
	const terminalOpen = useRecoilValue(terminalOpenState);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) {
		return null;
	}

	const settingsJson = {
		theme: {
			isDarkMode: theme.isDarkMode,
			colorTheme: theme.theme,
		},
		fontFamily: fontFamily,
		aiChatOpen: aiChatOpen,
		terminalOpen: terminalOpen,
	};

	const jsonContent = JSON.stringify(settingsJson, null, 2);
	const contentLines = jsonContent.split("\n");

	return (
		<div className="settings-code tw-max-w-4xl">
			<div className="code-container">
				<div className="line-numbers">
					{contentLines.map((line, index) => (
						<span key={line}>{index + 1}</span>
					))}
				</div>
				<CodeViewer content={jsonContent} language="json" />
			</div>
		</div>
	);
};

export default SettingsCode;
