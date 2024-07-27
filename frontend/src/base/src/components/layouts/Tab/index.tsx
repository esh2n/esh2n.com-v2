"use client";

import { activeTabState } from "@/atoms/tabsState";
import FileIcon from "@/components/elements/FileIcon";
import { getFileNameWithExtension } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import "./style.scss";

type Tab = {
	path: string;
	label: string;
};

const VSCodeTabs: React.FC = () => {
	const [activeTab, setActiveTab] = useRecoilState(activeTabState);
	const [isLoading, setIsLoading] = useState(true);
	const pathname = usePathname();

	useEffect(() => {
		const updateTabs = (path: string) => {
			const isHome = path === "/";
			const newActiveTab = {
				path: path,
				label: {
					page: isHome ? "home" : path.split("/").pop() || "unknown",
					code: getFileNameWithExtension(path),
				},
				isCode: false,
			};
			setActiveTab(newActiveTab);
			setIsLoading(false);
		};

		updateTabs(pathname);
	}, [pathname, setActiveTab]);

	const handleTabClick = (isCode: boolean) => {
		setActiveTab((prev) => ({
			...prev,
			isCode: isCode,
		}));
	};

	return (
		<div className="vscode-tabs">
			<div className="tw-flex tw-text-sm">
				{isLoading ? (
					<>
						<SkeletonTab />
						<SkeletonTab />
					</>
				) : (
					<>
						<Tab
							path={activeTab.path || ""}
							label={activeTab.label?.page || ""}
							isActive={!activeTab.isCode}
							onClick={() => handleTabClick(false)}
						/>
						<Tab
							path={activeTab.path || ""}
							label={activeTab.label?.code || ""}
							isActive={activeTab.isCode}
							onClick={() => handleTabClick(true)}
							hasIcon={true}
						/>
					</>
				)}
			</div>
		</div>
	);
};

const Tab: React.FC<{
	path: string;
	label: string;
	isActive: boolean;
	onClick: () => void;
	hasIcon?: boolean;
}> = ({ path, label, isActive, onClick, hasIcon = false }) => (
	<div
		className={`tw-flex tw-items-center tw-px-3 tw-py-2 tw-cursor-pointer ${
			isActive ? "highlight-bg" : "highlight-bg-hover"
		}`}
		onClick={onClick}
		onKeyUp={(e) => e.key === "Enter" && onClick()}
		tabIndex={0}
		role="button"
	>
		{hasIcon && <FileIcon filename={getFileNameWithExtension(path)} />}
		<span className="vscode-tab tw-ml-2 tw-mr-2">{label}</span>
	</div>
);

const SkeletonTab: React.FC = () => (
	<div className="tw-flex tw-items-center tw-px-3 tw-py-2 tw-animate-pulse">
		<div className="tw-w-4 tw-h-4 tw-bg-gray-300 tw-rounded tw-mr-2" />
		<div className="tw-w-20 tw-h-4 tw-bg-gray-300 tw-rounded" />
	</div>
);

export default VSCodeTabs;
