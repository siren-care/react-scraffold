const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const devConfig = {
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.ejs',
			inject: true,
			minify: {
				removeComments: true, // 去掉注释
				collapseWhitespace: true, // 去掉多余空白
				removeAttributeQuotes: true, // 去掉一些属性的引号，例如id="moo" => id=moo
			},
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
	devServer: {
		host: 'localhost',
		compress: true,
		port: 8000,
		historyApiFallback: true,
		overlay: {
			//当出现编译器错误或警告时，就在网页上显示一层黑色的背景层和错误信息
			errors: true,
		},
		inline: true,
		hot: true,
		contentBase: path.join(__dirname, 'webpack'),
		// proxy: {
		//   '/api/v1': {
		//     target: '',
		//     ws: true,
		//     changeOrigin: true,
		//     pathRewrite: {
		//       '^/api/v1': '/api/v1'
		//     }
		//   }
		// }
		watchContentBase: true,
	},
};

module.exports = merge(baseConfig, devConfig);
