import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.scss";

const inter = Fira_Code({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "esh2n.com",
	description: "esh2n.com | ShunyaEndoのポートフォリオサイト",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja" className="nord-light">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
