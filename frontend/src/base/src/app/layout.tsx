import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.scss";
import Header from "@/components/layouts/Header/Header";
import RecoilProvider from "./recoilProvider";

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
		<html lang="ja">
			<body className={inter.className}>
				<RecoilProvider>
					<Header />
					{children}
				</RecoilProvider>
			</body>
		</html>
	);
}
