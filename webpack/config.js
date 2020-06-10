const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

const resolve = (dir) => path.join(__dirname, "..", dir);

module.exports = {
	entry: "./src/index.tsx",
	output: {
		filename: "js/[name].[hash].js",
		path: resolve("dist"),
	},

	resolve: {
		alias: {
			"@": require("path").resolve(__dirname, "../src"),
		},
		extensions: [
			"*",
			".mjs",
			".js",
			".vue",
			".json",
			".gql",
			".graphql",
			".ts",
			".tsx",
		],

		modules: [
			path.resolve(__dirname, "node_modules"), // 指定当前目录下的 node_modules 优先查找
			"node_modules", // 将默认写法放在后面
		],
	},

	// Enable sourcemaps for debugging webpack's output.
	devtool: "source-map",

	module: {
		rules: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
			{
				test: /\.tsx?$/,
				loader: "awesome-typescript-loader",
				exclude: /node_modules/,
			},

			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.mjs$/,
				include: /node_modules/,
				type: "javascript/auto",
			},
			{
				test: /\.css/,
				use: [
					{ loader: MiniCssExtractPlugin.loader },
					"style-loader",
					"css-loader",
				],
				exclude: /node_modules/,
				include: resolve("src"),
			},

			// // 减小构建目标
			// {
			// 	test: /\.(j|t)s|tsx$/,
			// 	exclude: /node_modules/,
			// 	include: path.resolve(__dirname, "../src"),
			// 	use: ["babel-loader"],
			// },

			{
				test: /\.(gif|jpg|png|bmp|eot|woff|woff2|ttf|svg)/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 10240,
							outputPath: "images",
						},
					},
				],
			},

			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: { loader: "babel-loader" }, // options 在 .babelrc 定义
			},
		],
	},

	plugins: [
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "./src/index.html",
			inject: true,
			minify: {
				removeComments: true, // 去掉注释
				collapseWhitespace: true, // 去掉多余空白
				removeAttributeQuotes: true, // 去掉一些属性的引号，例如id="moo" => id=moo
			},
		}),
		new CleanWebpackPlugin(),
		new ScriptExtHtmlWebpackPlugin({
			//`runtime` must same as runtimeChunk name. default is `runtime`
			inline: /runtime\..*\.js$/,
		}),
		new MiniCssExtractPlugin({
			filename: "css/[name].css",
		}),
	],

	performance: {
		// 性能提示，可以提示过大文件
		hints: "warning", // 性能提示开关 false | "error" | "warning"
		maxAssetSize: 100000, // 生成的文件最大限制 整数类型（以字节为单位）
		maxEntrypointSize: 100000, // 引入的文件最大限制 整数类型（以字节为单位）
		assetFilter: function (assetFilename) {
			// 提供资源文件名的断言函数
			return /\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetFilename);
		},
	},

	// When importing a module whose path matches one of the following, just
	// assume a corresponding global variable exists and use that instead.
	// This is important because it allows us to avoid bundling all of our
	// dependencies, which allows browsers to cache those libraries between builds.

	// externals: {
	// 	react: "React",
	// 	"react-dom": "ReactDOM",
	// },
};
