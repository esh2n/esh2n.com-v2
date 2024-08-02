"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const AnimatedWrapper: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return <>{children}</>;
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			{children}
		</motion.div>
	);
};

export default AnimatedWrapper;
