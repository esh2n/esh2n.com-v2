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
import { type Variants, motion } from "framer-motion";
import { MessageCircle, Moon, Sun, Type } from "lucide-react";
import { useRecoilState } from "recoil";

const SettingsContent: React.FC = () => {
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
		if (
			newTheme === "nord" ||
			newTheme === "default" ||
			newTheme === "monokai" ||
			newTheme === "one-dark" ||
			newTheme === "solarized" ||
			newTheme === "dracula" ||
			newTheme === "tokyo-night"
		) {
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
		<div className="tw-w-full tw-overflow-x-hidden">
			<section className="settings-section">
				<div className="container">
					<motion.h2
						className="section-title"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<span className="emoji">⚙️</span>Settings
					</motion.h2>

					<motion.div
						className="settings-container"
						variants={containerVariants}
						initial="hidden"
						animate="visible"
					>
						<SettingCard
							icon={<Moon className="tw-h-5 tw-w-5" />}
							title="Dark Mode"
							variants={itemVariants}
						>
							<Switch
								checked={theme.isDarkMode}
								onCheckedChange={handleDarkModeToggle}
							/>
						</SettingCard>

						<SettingCard
							icon={<Sun className="tw-h-5 tw-w-5" />}
							title="Color Theme"
							variants={itemVariants}
						>
							<Select
								value={theme.theme}
								onValueChange={handleColorThemeChange}
							>
								<SelectTrigger className="tw-w-[180px]">
									<SelectValue placeholder="Select theme" />
								</SelectTrigger>
								<SelectContent
									position="popper"
									sideOffset={5}
									className="tw-z-50"
								>
									<SelectItem value="nord">Nord</SelectItem>
									<SelectItem value="monokai">Monokai</SelectItem>
									<SelectItem value="one-dark">One Dark</SelectItem>
									<SelectItem value="solarized">Solarized</SelectItem>
									<SelectItem value="dracula">Dracula</SelectItem>
									<SelectItem value="tokyo-night">Tokyo Night</SelectItem>
									<SelectItem value="default">Default</SelectItem>
								</SelectContent>
							</Select>
						</SettingCard>

						<SettingCard
							icon={<MessageCircle className="tw-h-5 tw-w-5" />}
							title="AI Chat"
							variants={itemVariants}
						>
							<Switch
								checked={aiChatOpen}
								onCheckedChange={handleAIChatToggle}
							/>
						</SettingCard>

						<SettingCard
							icon={<Type className="tw-h-5 tw-w-5" />}
							title="Font"
							variants={itemVariants}
						>
							<Select value={fontFamily} onValueChange={handleFontChange}>
								<SelectTrigger className="tw-w-[180px]">
									<SelectValue placeholder="Select font" />
								</SelectTrigger>
								<SelectContent
									position="popper"
									sideOffset={5}
									className="tw-z-50"
								>
									<SelectItem value="Inter">Inter</SelectItem>
									<SelectItem value="Roboto">Roboto</SelectItem>
									<SelectItem value="Open Sans">Open Sans</SelectItem>
								</SelectContent>
							</Select>
						</SettingCard>
					</motion.div>
				</div>
			</section>
		</div>
	);
};

const SettingCard: React.FC<{
	icon: React.ReactNode;
	title: string;
	children: React.ReactNode;
	variants: Variants;
}> = ({ icon, title, children, variants }) => (
	<motion.div
		className="setting-card"
		variants={variants}
		whileHover={{ scale: 1.02 }}
		whileTap={{ scale: 0.98 }}
	>
		<div className="tw-flex tw-items-center tw-justify-between tw-w-full">
			<div className="tw-flex tw-items-center tw-space-x-2">
				{icon}
				<span className="tw-text-lg">{title}</span>
			</div>
			<div className="tw-flex tw-items-center tw-justify-end tw-flex-shrink-0 tw-ml-4">
				{children}
			</div>
		</div>
	</motion.div>
);
export default SettingsContent;
