import { motion } from "framer-motion";

const ScrollIndicator = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 1, duration: 0.8 }}
			className="tw-absolute tw-bottom-8 tw-left-1/2 tw-transform tw--translate-x-1/2"
		>
			<motion.div
				animate={{ y: [0, 10, 0] }}
				transition={{
					repeat: Number.MAX_VALUE,
					duration: 1.5,
					ease: "easeInOut",
				}}
				className="tw-w-6 tw-h-10 tw-border-2 tw-border-white tw-rounded-full tw-flex tw-justify-center tw-items-start tw-p-2"
			>
				<motion.div
					animate={{ scaleY: [0.3, 1, 0.3] }}
					transition={{
						repeat: Number.MAX_VALUE,
						duration: 1.5,
						ease: "easeInOut",
					}}
					className="tw-w-1 tw-h-3 tw-bg-white tw-rounded-full"
				/>
			</motion.div>
		</motion.div>
	);
};

export default ScrollIndicator;
