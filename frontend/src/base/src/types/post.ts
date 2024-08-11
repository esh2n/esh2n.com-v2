export interface Post {
	id: string;
	title: string;
	slug: string;
	tags: string[];
	author: string;
	emoji: string;
	createdAt: string;
	updatedAt: string;
}

export interface PostResponse {
	content: {
		[x: string]: string;
	};
	postInfo: {
		title: string;
		tags: string[];
		author: string;
		emoji: string;
		createdAt: string;
		updatedAt: string;
	};
}
