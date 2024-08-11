"use client";

import { activeTabState } from "@/atoms/tabsState";
import dynamic from "next/dynamic";
import { useRecoilValue } from "recoil";

const ReadmeCode = dynamic(() => import("./ReadmeCode"), { ssr: false });
const ReadmeContent = dynamic(() => import("./ReadmeContent"), {
	ssr: false,
});

const Readme = () => {
	const activeTab = useRecoilValue(activeTabState);
	return <>{activeTab.isCode ? <ReadmeCode /> : <ReadmeContent />}</>;
};

export default Readme;
