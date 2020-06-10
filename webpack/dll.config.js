const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
	entry: {
		vendor: ["dayjs"],
		react: ["react", "react-dom"],
	},
	mode: "production",

	output: {
		filename: "[name].dll.js", // 输出的名字
		path: path.resolve(__dirname, "../dll"), // 输出的文件目录
		library: "[name]", // 将我们打包出来的文件以全部变量的形式暴露，可以在浏览器变量的名字进行访问
	},

	plugins: [
		// 每次运行时清空之前的 dll 文件
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: [path.join(__dirname, "../dll/**/*")],
		}),
		new webpack.DllPlugin({
			// path 指定manifest文件的输出路径
			path: path.join(__dirname, "../dll/[name].manifest.json"),
			// 和library 一致，输出的manifest.json中的name值
			name: "_dll_[name]_[hash:8]",
		}),
	],
};
