"use client";

import { activeTabState } from "@/atoms/tabsState";
import dynamic from "next/dynamic";
import { useRecoilValue } from "recoil";

const ContactCode = dynamic(() => import("./ContactCode"), { ssr: false });
const ContactContent = dynamic(() => import("./ContactContent"), {
	ssr: false,
});

const Contact = () => {
	const activeTab = useRecoilValue(activeTabState);
	return <>{activeTab.isCode ? <ContactCode /> : <ContactContent />}</>;
};

export default Contact;
