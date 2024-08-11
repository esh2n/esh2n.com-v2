"use client";

import { activeTabState } from "@/atoms/tabsState";
import dynamic from "next/dynamic";
import { useRecoilValue } from "recoil";

const SettingsCode = dynamic(() => import("./SettingsCode"), { ssr: false });
const SettingsContent = dynamic(() => import("./SettingsContent"), {
	ssr: false,
});

const Settings = () => {
	const activeTab = useRecoilValue(activeTabState);
	return <>{activeTab.isCode ? <SettingsCode /> : <SettingsContent />}</>;
};

export default Settings;
