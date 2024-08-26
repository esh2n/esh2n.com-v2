import { atom } from "recoil";

export const terminalOpenState = atom<boolean>({
	key: "terminalOpenState",
	default: false,
});
