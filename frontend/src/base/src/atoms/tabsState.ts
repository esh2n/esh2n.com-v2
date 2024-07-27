import { atom } from "recoil";

export const activeTabState = atom<ActiveTab>({
	key: "activeTabState",
	default: {
		path: null,
		label: null,
		isCode: false,
	},
});

export type ActiveTab = {
	path: string | null;
	label: Label | null;
	isCode: boolean;
};

type Label = {
	page: string;
	code: string;
};
