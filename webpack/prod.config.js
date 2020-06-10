const merge = require("webpack-merge");
const baseConfig = require("./config");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

const resolve = (dir) => path.join(__dirname, "..", dir);

const prodConfig = {
	mode: "production",
	optimization: {
		runtimeChunk: true,
		minimizer: [
			new TerserPlugin({
				cache: true,
				// parallel: true,
				terserOptions: {
					compress: {
						warnings: true,
						drop_console: true,
						drop_debugger: true,
						pure_funcs: ["console.log"], // 移除console
					},
				},
				sourceMap: true,
			}),
			new OptimizeCssAssetsWebpackPlugin(),
		],
		splitChunks: {
			chunks: "async", // 提取的 chunk 类型，all: 所有，async: 异步，initial: 初始
			minSize: 30000, // 默认值，新 chunk 产生的最小限制 整数类型（以字节为单位）
			// maxSize: 0, // 默认值，新 chunk 产生的最大限制，0为无限 整数类型（以字节为单位）
			minChunks: 1, // 默认值，新 chunk 被引用的最少次数
			maxAsyncRequests: 5, // 默认值，按需加载的 chunk，最大数量
			maxInitialRequests: 3, // 默认值，初始加载的 chunk，最大数量
			// name: true, // 默认值，控制 chunk 的命名
			cacheGroups: {
				// 配置缓存组
				vendor: {
					name: "vendor",
					chunks: "initial",
					priority: 10, // 优先级
					reuseExistingChunk: false, // 允许复用已经存在的代码块
					test: /node_modules\/(.*)\.js/, // 只打包初始时依赖的第三方
				},
				common: {
					name: "common",
					chunks: "initial",
					// test: resolve("src/components"), // 可自定义拓展你的规则
					minChunks: 2,
					priority: 5,
					reuseExistingChunk: true,
				},
			},
		},
	},

	plugins: [
		new AddAssetHtmlPlugin({
			filepath: resolve(`../dll/**/*.js`),
			includeSourcemap: false,
		}),
		new webpack.DllReferencePlugin({
			manifest: path.join(__dirname, `../dll/vendor.manifest.json`),
		}),
		new webpack.DllReferencePlugin({
			manifest: path.join(__dirname, `../dll/react.manifest.json`),
		}),
	],

	module: {
		rules: [
			// 多线程编译
			// {
			// 	test: /\.tsx?$/,
			// 	// exclude: /node_modules/,
			// 	// include: path.resolve(__dirname, '../src'),
			// 	use: [
			// 		{
			// 			loader: "thread-loader",
			// 			options: {
			// 				workers: 3, // 开启几个 worker 进程来处理打包，默认是 os.cpus().length - 1
			// 			},
			// 		},
			// 		"babel-loader",
			// 	],
			// },
			// 压缩图片
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name]_[hash].[ext]",
							outputPath: "images/",
						},
					},
					{
						loader: "image-webpack-loader",
						options: {
							// 压缩 jpeg 的配置
							mozjpeg: {
								progressive: true,
								quality: 65,
							},
							// 使用 imagemin**-optipng 压缩 png，enable: false 为关闭
							optipng: {
								enabled: false,
							},
							// 使用 imagemin-pngquant 压缩 png
							pngquant: {
								quality: "65-90",
								speed: 4,
							},
							// 压缩 gif 的配置
							gifsicle: {
								interlaced: false,
							},
							// 开启 webp，会把 jpg 和 png 图片压缩为 webp 格式
							webp: {
								quality: 75,
							},
						},
					},
				],
			},
		],
	},
};

module.exports = merge(baseConfig, prodConfig);
