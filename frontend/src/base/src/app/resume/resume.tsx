"use client";

import { activeTabState } from "@/atoms/tabsState";
import dynamic from "next/dynamic";
import { useRecoilValue } from "recoil";

const ResumeCode = dynamic(() => import("./ResumeCode"), { ssr: false });
const ResumeContent = dynamic(() => import("./ResumeContent"), {
	ssr: false,
});

const Resume = () => {
	const activeTab = useRecoilValue(activeTabState);
	return <>{activeTab.isCode ? <ResumeCode /> : <ResumeContent />}</>;
};

export default Resume;
