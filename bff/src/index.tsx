import { Hono } from "hono";

import { notion } from "./notion/api";
import { ogp } from "./ogp/api";

const app = new Hono().route("/api/notion", notion).route("/api/ogp", ogp);
export type AppType = typeof app;
export default app;
