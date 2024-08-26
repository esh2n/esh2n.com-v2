/** @type {import('next').NextConfig} */
const withDebug = process.env.NODE_ENV === "development";
const nextConfig = {
	async serverMiddleware(app) {
		if (process.env.NODE_ENV === "development") {
			app.use(
				"/api",
				createProxyMiddleware({
					target: "http://localhost:5000",
					changeOrigin: true,
					pathRewrite: { "^/api": "" },
				}),
			);
		}
	},
	images: {
		domains: ["avatars.githubusercontent.com", "bff.esh2n.workers.dev"],
	},
	webpack(config, { isServer, dev }) {
		const MODE =
			process.env.npm_lifecycle_event === "dev" ? "development" : "production";
		config.resolve.extensions.push(".elm");
		if (MODE === "development") {
			config.module.rules.push({
				test: /\.elm$/,
				exclude: [/elm-stuff/, /node_modules/],
				use: [
					{ loader: "elm-hot-webpack-loader" },
					{
						loader: "elm-webpack-loader",
						options: {
							// add Elm's debug overlay to output
							debug: withDebug,
						},
					},
				],
			});
		} else {
			config.module.rules.push({
				test: /\.elm$/,
				exclude: [/elm-stuff/, /node_modules/],
				use: {
					loader: "elm-webpack-loader",
					options: {
						optimize: true,
					},
				},
			});
		}
		config.experiments = {
			...config.experiments,
			asyncWebAssembly: true,
			layers: true,
		};
		config.output.webassemblyModuleFilename =
			isServer && !dev
				? "../static/wasm/[modulehash].wasm"
				: "static/wasm/[modulehash].wasm";

		return config;
	},
};

export default nextConfig;
