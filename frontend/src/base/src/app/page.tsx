"use client";

import { activeTabState } from "@/atoms/tabsState";
import dynamic from "next/dynamic";
import { useRecoilValue } from "recoil";

const HomeCode = dynamic(() => import("./HomeCode"), { ssr: false });
const HomeContent = dynamic(() => import("./HomeContent"), {
	ssr: false,
});

const Home = () => {
	const activeTab = useRecoilValue(activeTabState);
	return <>{activeTab.isCode ? <HomeCode /> : <HomeContent />}</>;
};

export default Home;
