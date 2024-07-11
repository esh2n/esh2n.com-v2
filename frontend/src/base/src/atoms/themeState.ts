import type { ThemeState } from "@/types/atoms";
import { atom } from "recoil";

const initialThemeState: ThemeState = {
	theme: "nord",
	isDarkMode: false,
};
export const themeState = atom({
	key: "themeState",
	default: initialThemeState,
});
