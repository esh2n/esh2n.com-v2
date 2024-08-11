import CodeViewer from "@/components/elements/CodeViewer";
import React, { useEffect, useState } from "react";

const ContactCode = () => {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) {
		return null;
	}

	const contactContent = {
		title: "📮 Contact.",
		description:
			"お気軽にご連絡ください。以下のSNSやメールでお待ちしております。",
		contactLinks: [
			{
				name: "GitHub",
				icon: "FaGithub",
				url: "https://github.com/esh2n",
			},
			{
				name: "Twitter",
				icon: "FaTwitter",
				url: "https://twitter.com/esh2n",
			},
			{
				name: "LinkedIn",
				icon: "FaLinkedin",
				url: "https://www.linkedin.com/in/esh2n",
			},
			{
				name: "Zenn",
				icon: "SiZenn",
				url: "https://zenn.dev/esh2n",
			},
			{
				name: "Email",
				icon: "FaEnvelope",
				url: "mailto:esh2n.bz@gmail.com",
			},
		],
	};

	const jsonContent = JSON.stringify(contactContent, null, 2);
	const contentLines = jsonContent.split("\n");

	return (
		<div className="contact-code tw-max-w-4xl">
			<div className="code-container">
				<div className="line-numbers">
					{contentLines.map((line, index) => (
						<span key={line}>{index + 1}</span>
					))}
				</div>
				<CodeViewer content={jsonContent} language="json" />
			</div>
		</div>
	);
};

export default ContactCode;
