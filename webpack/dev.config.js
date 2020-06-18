const merge = require('webpack-merge');
const baseConfig = require('./config');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
	.BundleAnalyzerPlugin;

const devConfig = {
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	watch: true,
	watchOptions: {
		aggregateTimeout: 200,
		poll: 1000,
		ignored: /node_modules/,
	},

	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.html',
			inject: true,
		}),
		new webpack.HotModuleReplacementPlugin(),
		new BundleAnalyzerPlugin({
			analyzerMode: 'server',
			analyzerHost: '127.0.0.1',
			analyzerPort: 8002,
			reportFilename: 'report.html',
			defaultSizes: 'parsed',
			openAnalyzer: true,
			generateStatsFile: false,
			statsFilename: 'stats.json',
			logLevel: 'info',
		}),
	],

	devServer: {
		host: 'localhost',
		contentBase: '../dist',
		compress: true,
		port: 3000,
		historyApiFallback: true,
		overlay: {
			//当出现编译器错误或警告时，就在网页上显示一层黑色的背景层和错误信息
			errors: true,
		},
		inline: true,
		hot: true,
	},
};

module.exports = merge(baseConfig, devConfig);
