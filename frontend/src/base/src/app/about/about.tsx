"use client";

import { activeTabState } from "@/atoms/tabsState";
import dynamic from "next/dynamic";
import { useRecoilValue } from "recoil";

const AboutCode = dynamic(() => import("./AboutCode"), { ssr: false });
const AboutContent = dynamic(() => import("./AboutContent"), {
	ssr: false,
});

const About = () => {
	const activeTab = useRecoilValue(activeTabState);
	return <>{activeTab.isCode ? <AboutCode /> : <AboutContent />}</>;
};

export default About;
