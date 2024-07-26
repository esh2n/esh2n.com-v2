"use client";

import { aiChatOpenState } from "@/atoms/aichat";
import { fontFamilyState } from "@/atoms/fontFamily";
import { themeState } from "@/atoms/themeState";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { MessageCircle, Moon, Sun, Type } from "lucide-react";
import { useRecoilState } from "recoil";

const SettingsPage: React.FC = () => {
	const [theme, setTheme] = useRecoilState(themeState);
	const [fontFamily, setFontFamily] = useRecoilState(fontFamilyState);
	const [aiChatOpen, setAiChatOpen] = useRecoilState(aiChatOpenState);

	const handleDarkModeToggle = () => {
		setTheme({
			...theme,
			isDarkMode: !theme.isDarkMode,
		});
	};

	const handleColorThemeChange = (newTheme: string) => {
		if (newTheme === "nord" || newTheme === "default") {
			setTheme({
				...theme,
				theme: newTheme,
			});
		}
	};

	const handleAIChatToggle = () => {
		setAiChatOpen(!aiChatOpen);
	};

	const handleFontChange = (newFont: string) => {
		setFontFamily(newFont);
	};

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: { y: 0, opacity: 1 },
	};

	return (
		<motion.div
			className="settings-page tw-space-y-6 tw-max-w-xl tw-mx-auto tw-p-6"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			<motion.h1
				className="tw-text-3xl tw-font-bold tw-mb-8"
				variants={itemVariants}
			>
				Settings
			</motion.h1>

			<motion.div
				className="setting-item tw-flex tw-justify-between tw-items-center tw-p-4 tw-rounded-lg hover:tw-bg-gray-100 dark:hover:tw-bg-gray-800 tw-transition-colors"
				variants={itemVariants}
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
			>
				<div className="tw-flex tw-items-center tw-space-x-2">
					<Moon className="tw-h-5 tw-w-5" />
					<span className="tw-text-lg">Dark Mode</span>
				</div>
				<Switch
					checked={theme.isDarkMode}
					onCheckedChange={handleDarkModeToggle}
				/>
			</motion.div>

			<motion.div
				className="setting-item tw-flex tw-justify-between tw-items-center tw-p-4 tw-rounded-lg hover:tw-bg-gray-100 dark:hover:tw-bg-gray-800 tw-transition-colors"
				variants={itemVariants}
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
			>
				<div className="tw-flex tw-items-center tw-space-x-2">
					<Sun className="tw-h-5 tw-w-5" />
					<span className="tw-text-lg">Color Theme</span>
				</div>
				<Select value={theme.theme} onValueChange={handleColorThemeChange}>
					<SelectTrigger className="tw-w-[180px]">
						<SelectValue placeholder="Select theme" />
					</SelectTrigger>
					<SelectContent position="popper" sideOffset={5} className="tw-z-50">
						<SelectItem value="nord">Nord</SelectItem>
						<SelectItem value="default">Default</SelectItem>
					</SelectContent>
				</Select>
			</motion.div>

			<motion.div
				className="setting-item tw-flex tw-justify-between tw-items-center tw-p-4 tw-rounded-lg hover:tw-bg-gray-100 dark:hover:tw-bg-gray-800 tw-transition-colors"
				variants={itemVariants}
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
			>
				<div className="tw-flex tw-items-center tw-space-x-2">
					<MessageCircle className="tw-h-5 tw-w-5" />
					<span className="tw-text-lg">AI Chat</span>
				</div>
				<Switch checked={aiChatOpen} onCheckedChange={handleAIChatToggle} />
			</motion.div>

			<motion.div
				className="setting-item tw-flex tw-justify-between tw-items-center tw-p-4 tw-rounded-lg hover:tw-bg-gray-100 dark:hover:tw-bg-gray-800 tw-transition-colors"
				variants={itemVariants}
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
			>
				<div className="tw-flex tw-items-center tw-space-x-2">
					<Type className="tw-h-5 tw-w-5" />
					<span className="tw-text-lg">Font</span>
				</div>
				<Select value={fontFamily} onValueChange={handleFontChange}>
					<SelectTrigger className="tw-w-[180px]">
						<SelectValue placeholder="Select font" />
					</SelectTrigger>
					<SelectContent position="popper" sideOffset={5} className="tw-z-50">
						<SelectItem value="Inter">Inter</SelectItem>
						<SelectItem value="Roboto">Roboto</SelectItem>
						<SelectItem value="Open Sans">Open Sans</SelectItem>
					</SelectContent>
				</Select>
			</motion.div>
		</motion.div>
	);
};

export default SettingsPage;
