export type ThemeState = {
	theme: Theme;
	isDarkMode: boolean;
};

export type Theme =
	| "default"
	| "nord"
	| "monokai"
	| "one-dark"
	| "solarized"
	| "dracula"
	| "tokyo-night";
