import { atom } from "recoil";

export const activeCodeTabState = atom<string | null>({
	key: "activeCodeTabState",
	default: null,
});

export const tabsState = atom<Array<{ path: string; label: string }>>({
	key: "tabsState",
	default: [],
});

export const codeTabsState = atom<Array<{ path: string; label: string }>>({
	key: "codeTabsState",
	default: [],
});
