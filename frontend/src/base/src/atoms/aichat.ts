import { atom } from "recoil";

export const aiChatWidthState = atom<number>({
	key: "aiChatWidthState",
	default: 300,
});

export const aiChatOpenState = atom<boolean>({
	key: "aiChatOpenState",
	default: false,
});
