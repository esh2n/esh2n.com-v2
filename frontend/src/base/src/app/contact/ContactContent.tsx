"use client";

import { motion } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { SiZenn } from "react-icons/si";

const ContactContent: React.FC = () => {
	const contactLinks = [
		{
			name: "GitHub",
			icon: <FaGithub />,
			url: "https://github.com/esh2n",
		},
		{
			name: "Twitter",
			icon: <FaTwitter />,
			url: "https://twitter.com/esh2n",
		},
		{
			name: "LinkedIn",
			icon: <FaLinkedin />,
			url: "https://www.linkedin.com/in/esh2n",
		},
		{ name: "Zenn", icon: <SiZenn />, url: "https://zenn.dev/esh2n" },
		{
			name: "Email",
			icon: <FaEnvelope />,
			url: "mailto:esh2n.bz@gmail.com",
		},
	];

	return (
		<div className="tw-w-full tw-overflow-x-hidden">
			<section
				id="contact"
				className="contact-section tw-py-16 tw-bg-background tw-text-foreground"
			>
				<div className="tw-max-w-6xl tw-mx-auto tw-px-4">
					<motion.h2
						className="tw-text-4xl tw-font-semibold tw-mb-8 tw-text-primary"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<span className="tw-mr-2">📮</span>Contact.
					</motion.h2>

					<motion.p
						className="tw-text-lg tw-mb-8"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						お気軽にご連絡ください。以下のSNSやメールでお待ちしております。
					</motion.p>

					<div className="contact-links tw-grid tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-5 tw-gap-6">
						{contactLinks.map((link, index) => (
							<motion.a
								key={link.name}
								href={link.url}
								target="_blank"
								rel="noopener noreferrer"
								className="contact-link tw-flex tw-items-center tw-justify-center tw-p-4 tw-bg-primary tw-text-primary-foreground tw-rounded-lg tw-transition-all tw-duration-300 hover:tw-scale-105"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
							>
								<span className="tw-text-2xl tw-mr-2">{link.icon}</span>
								<span>{link.name}</span>
							</motion.a>
						))}
					</div>
				</div>
			</section>
		</div>
	);
};

export default ContactContent;
