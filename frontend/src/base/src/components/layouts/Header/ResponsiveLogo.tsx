"use client";

import Logo from "@/components/elements/Logo";
import Link from "next/link";
import { useEffect, useState } from "react";

export const ResponsiveLogo = () => {
	const [isSmallScreen, setIsSmallScreen] = useState(false);
	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		setHasMounted(true);
		const checkScreenSize = () => {
			setIsSmallScreen(window.innerWidth < 768);
		};

		checkScreenSize();
		window.addEventListener("resize", checkScreenSize);

		return () => window.removeEventListener("resize", checkScreenSize);
	}, []);

	const logoProps = {
		width: isSmallScreen ? 16 : 20,
		height: isSmallScreen ? 16 : 20,
		fontSize: isSmallScreen ? 12 : 16,
	};

	const content = (
		<Link href="/">
			<Logo {...logoProps} />
		</Link>
	);

	if (!hasMounted) {
		return <div className="tw-flex tw-items-center">{content}</div>;
	}

	return (
		<div
			className={`tw-flex tw-items-center ${isSmallScreen ? "tw-ml-10" : ""}`}
		>
			{content}
		</div>
	);
};
