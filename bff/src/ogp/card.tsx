// @ts-nocheck
import type { FC, ReactNode } from 'hono/jsx';

interface CardProps {
	pageTitle: string;
	title: string;
	date: string;
	description: string;
	image: string;
	tags: string[];
}

const VSCodeWindow: FC<{ children: ReactNode; pageTitle: string }> = ({ children, pageTitle }) => (
	<div style={{
		width: '1200px',
		height: '630px',
		background: '#1e1e1e',
		borderRadius: '8px',
		overflow: 'hidden',
		fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
		color: '#d4d4d4',
		display: 'flex',
		flexDirection: 'column',
		boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
	}}>
		<div style={{
			background: '#323233',
			padding: '12px 20px',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
		}}>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#ff5f56', marginRight: '10px' }}></div>
				<div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#ffbd2e', marginRight: '10px' }}></div>
				<div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#27c93f', marginRight: '10px' }}></div>
			</div>
			<span style={{ fontSize: '24px', fontWeight: 'bold' }}>{pageTitle}</span>
		</div>
		{children}
	</div>
);

const Icon: FC<{ path: string }> = ({ path }) => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#569cd6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d={path} />
	</svg>
);

const Tag: FC<{ name: string }> = ({ name }) => (
	<div style={{
		background: '#4ec9b0',
		color: '#1e1e1e',
		padding: '4px 8px',
		borderRadius: '4px',
		fontSize: '16px',
		marginRight: '8px',
		marginBottom: '8px',
		display: 'flex',
		alignItems: 'center',
	}}>
		{name}
	</div>
);
export const Card: FC<CardProps> = ({ pageTitle, title, date, description, image, tags }) => (
	<VSCodeWindow pageTitle={pageTitle}>
		<div style={{ padding: '40px', flex: 1, display: 'flex', alignItems: 'center' }}>
			<div style={{
				width: '180px',
				height: '180px',
				borderRadius: '50%',
				overflow: 'hidden',
				marginRight: '40px',
				flexShrink: 0,
				border: '4px solid #4ec9b0',
				background: '#2d2d2d',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
				<img
					src={image}
					alt="Author avatar"
					style={{
						maxWidth: '100%',
						maxHeight: '100%',
						objectFit: 'contain'
					}}
				/>
			</div>
			<div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
				<div style={{
					fontSize: '40px',
					color: '#4ec9b0',
					marginBottom: '16px',
					lineHeight: '1.2',
					fontWeight: 'bold',
					textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
				}}>
					{title}
				</div>
				<div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
					<Icon path="M12 2v10m0 0v10m0-10h10m-10 0H2" />
					<span style={{ color: '#9cdcfe', fontSize: '18px', marginLeft: '12px' }}>{date}</span>
				</div>
				<div style={{
					fontSize: '20px',
					color: '#d4d4d4',
					lineHeight: '1.4',
					maxHeight: '84px',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					display: '-webkit-box',
					WebkitLineClamp: 3,
					WebkitBoxOrient: 'vertical',
					marginBottom: '16px',
				}}>
					{description}
				</div>
				<div style={{ display: 'flex', flexWrap: 'wrap' }}>
					{tags.map((tag, index) => (
						<Tag key={index} name={tag} />
					))}
				</div>
			</div>
		</div>
		<div style={{
			background: 'linear-gradient(45deg, #4ec9b0, #569cd6)',
			height: '8px',
			width: '100%',
			position: 'absolute',
			bottom: 0,
		}} />
	</VSCodeWindow>
);