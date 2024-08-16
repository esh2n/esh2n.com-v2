import { Hono } from "hono";
import { cors } from "hono/cors";

import { notion } from "./notion/api";
import { ogp } from "./ogp/api";

const app = new Hono()
	.use(
		"/*",
		cors({
			origin: [
				"http://localhost:3000",
				"http://esh2n.dev",
				"https://esh2n-com-v2.vercel.app/",
				"https://www.esh2n.dev",
			],
			allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
			allowHeaders: ["Content-Type", "Authorization"],
			exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
			maxAge: 600,
			credentials: true,
		}),
	)
	.use(
		"/",
		cors({
			origin: "http://esh2n.dev",
			allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
			allowHeaders: ["Content-Type", "Authorization"],
			exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
			maxAge: 600,
			credentials: true,
		}),
	)
	.route("/api/notion", notion)
	.route("/api/ogp", ogp);
export type AppType = typeof app;
export default app;
