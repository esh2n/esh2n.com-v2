import Image from "next/image";

import "./style.scss";

const Logo = () => (
	<div className="logo-container">
		<div className="image-wrapper">
			<Image
				src="/images/blog_dev.png"
				alt="esh2n.dev logo"
				width={50}
				height={50}
				objectFit="contain"
			/>
		</div>
		<span className="logo-text tw-text-foreground">esh2n.dev</span>
	</div>
);

export default Logo;
