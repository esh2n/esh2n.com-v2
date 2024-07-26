"use client";
import { getFileIconInfo, getFileNameWithExtension } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import {
	activeCodeTabState,
	codeTabsState,
	tabsState,
} from "@/atoms/tabsState";

import FileIcon from "@/components/elements/FileIcon";
import "./style.scss";

type Tab = {
	path: string;
	label: string;
};

const VSCodeTabs: React.FC = () => {
	const [activeCodeTab, setActiveCodeTab] = useRecoilState(activeCodeTabState);
	const [tabs, setTabs] = useRecoilState(tabsState);
	const [codeTabs, setCodeTabs] = useRecoilState<Tab[]>(codeTabsState);
	const [activePageTab, setActivePageTab] = useState<string | null>(null);
	const pathname = usePathname();

	useEffect(() => {
		const updateTabs = (path: string) => {
			const isHome = path === "/";
			const newTab: Tab = {
				path: path,
				label: isHome ? "home" : path.split("/").pop() || "unknown",
			};
			const newCodeTab: Tab = {
				path: path,
				label: getFileNameWithExtension(path),
			};

			setTabs([newTab]);
			setCodeTabs([newCodeTab]);
			setActivePageTab(path);
			setActiveCodeTab(null);
		};

		updateTabs(pathname);
	}, [pathname, setTabs, setCodeTabs, setActiveCodeTab]);

	const handlePageTabClick = () => {
		setActivePageTab(pathname);
		setActiveCodeTab(null);
	};

	const handleCodeTabClick = (path: string) => {
		setActiveCodeTab(path);
		setActivePageTab(null);
	};

	return (
		<div className="vscode-tabs">
			<div className="tw-flex tw-text-sm">
				{/* 左側：通常のページタブ */}
				{tabs.map((tab) => (
					<PageTab
						key={tab.path}
						tab={tab}
						isActive={activePageTab === tab.path}
						onClick={handlePageTabClick}
					/>
				))}
				{/* 右側：コードタブ */}
				{codeTabs.map((tab) => {
					return (
						<CodeTab
							key={tab.path}
							tab={tab}
							isActive={activeCodeTab === tab.path}
							onClick={() => handleCodeTabClick(tab.path)}
						/>
					);
				})}
			</div>
		</div>
	);
};

const PageTab: React.FC<{
	tab: Tab;
	isActive: boolean;
	onClick: () => void;
}> = ({ tab, isActive, onClick }) => (
	<div
		className={`tw-flex tw-items-center tw-px-3 tw-py-2 tw-cursor-pointer ${
			isActive ? "highlight-bg" : "highlight-bg-hover"
		}`}
		onClick={onClick}
		onKeyUp={(e) => e.key === "Enter" && onClick()}
		tabIndex={0}
		role="button"
	>
		<span className="vscode-tab">{tab.label}</span>
	</div>
);

const CodeTab: React.FC<{
	tab: Tab;
	isActive: boolean;
	onClick: () => void;
}> = ({ tab, isActive, onClick }) => {
	return (
		<div
			className={`tw-flex tw-items-center tw-px-3 tw-py-2 tw-cursor-pointer ${
				isActive ? "highlight-bg" : "highlight-bg-hover"
			}`}
			onClick={onClick}
			onKeyUp={(e) => e.key === "Enter" && onClick()}
			tabIndex={0}
			role="button"
		>
			<FileIcon filename={getFileNameWithExtension(tab.path)} />
			<span className="vscode-tab tw-ml-2">{tab.label}</span>
		</div>
	);
};

export default VSCodeTabs;
