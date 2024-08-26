"use client";
import { terminalOpenState } from "@/atoms/terminal";
import dynamic from "next/dynamic";
import { useRecoilValue } from "recoil";

const Terminal = dynamic(() => import("./ElmTerminal"), {
	ssr: false,
});

const TerminalWrapper: React.FC = () => {
	const isOpen = useRecoilValue(terminalOpenState);

	return isOpen ? <Terminal /> : null;
};

export default TerminalWrapper;
