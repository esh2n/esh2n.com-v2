import { Hono } from "hono";

const ogp = new Hono();

ogp.get("/", (c) => {
	return c.text("Hello OGP!");
});

// ogp.get("/example", (c) => {
// 	return c.render(<h1>Hello!</h1>);
// });

export { ogp };
