import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.scss";
import AIChat from "@/components/elements/AIChat";
import Header from "@/components/layouts/Header/Header";
import IconSideBar from "@/components/layouts/IconSideBar";
import VSCodeSidebar from "@/components/layouts/SideBar";
import VSCodeTabs from "@/components/layouts/Tab";
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
					<div className="tw-flex tw-h-[calc(100vh-61px)] tw-overflow-hidden">
						<IconSideBar />
						<VSCodeSidebar />
						<div className="tw-flex tw-flex-col tw-flex-grow tw-min-w-0">
							<VSCodeTabs />
							<main className="tw-flex-grow">{children}</main>
						</div>
						<AIChat />
					</div>
				</RecoilProvider>
			</body>
		</html>
	);
}
