const merge = require('webpack-merge');
const baseConfig = require('./config');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const resolve = (dir) => path.join(__dirname, '..', dir);

const prodConfig = {
	mode: 'production',
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
						pure_funcs: ['console.log'], // 移除console
					},
				},
				sourceMap: true,
			}),
			new OptimizeCssAssetsWebpackPlugin(),
		],
		splitChunks: {
			chunks: 'async', // 提取的 chunk 类型，all: 所有，async: 异步，initial: 初始
			minSize: 30000, // 默认值，新 chunk 产生的最小限制 整数类型（以字节为单位）
			// maxSize: 0, // 默认值，新 chunk 产生的最大限制，0为无限 整数类型（以字节为单位）
			minChunks: 1, // 默认值，新 chunk 被引用的最少次数
			maxAsyncRequests: 5, // 默认值，按需加载的 chunk，最大数量
			maxInitialRequests: 3, // 默认值，初始加载的 chunk，最大数量
			// name: true, // 默认值，控制 chunk 的命名
			cacheGroups: {
				// 配置缓存组
				vendor: {
					name: 'vendor',
					chunks: 'initial',
					priority: 10, // 优先级
					reuseExistingChunk: false, // 允许复用已经存在的代码块
					test: /node_modules\/(.*)\.js/, // 只打包初始时依赖的第三方
				},
				common: {
					name: 'common',
					chunks: 'initial',
					// test: resolve("src/components"), // 可自定义拓展你的规则
					minChunks: 2,
					priority: 5,
					reuseExistingChunk: true,
				},
			},
		},
	},

	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.html',
			inject: true,
			minify: {
				minify: {
					removeComments: true, // 去掉注释
					collapseWhitespace: true, // 去掉多余空白
					removeAttributeQuotes: true, // 去掉一些属性的引号，例如id="moo" => id=moo
				},
				// more options:
				// https://github.com/kangax/html-minifier#options-quick-reference
			},
			// necessary to consistently work with multiple chunks via CommonsChunkPlugin
			// chunksSortMode: "dependency",
		}),
		// new AddAssetHtmlPlugin({
		// 	// files: [], // 默认会将下面匹配文件加入到所有HtmlWebpackPlugin指定的资源中，可以指定加入到那些里
		// 	filepath: resolve(`${}/**/*.js`),
		// 	includeSourcemap: false,
		// 	outputPath: assetsPath("js"),
		// 	publicPath: "js",
		// }),
		new MiniCssExtractPlugin({
			filename: 'css/[name].css',
		}),
		new ScriptExtHtmlWebpackPlugin({
			//`runtime` must same as runtimeChunk name. default is `runtime`
			inline: /runtime\..*\.js$/,
		}),
		new WorkboxWebpackPlugin.GenerateSW({
			// 1. 帮助 serviceworker 快速启动
			// 2. 删除旧的 serviceworker
			// 生成一个 serviceworker 配置文件
			clientsClaim: true,
			skipWaiting: true,
		}),
		new HardSourceWebpackPlugin(),
	],
};

module.exports = merge(baseConfig, prodConfig);
