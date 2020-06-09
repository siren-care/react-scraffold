const path = require('path');

module.exports = {
	entry: {
		app: './src/index.tsx',
	},
	output: {
		filename: 'js/[name].[hash].js',
		path: path.resolve(__dirname, '../dist'),
	},
	optimization: {
		usedExports: true, // tree shaking
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					'style-loader',
					// Translates CSS into CommonJS

					{
						loader: require.resolve('css-loader'),
						options: {
							importLoaders: 1,
							modules: true, // 这里增加对css modules的支持
							// localIdentName: '[name]__[local]__[hash:base64:5]', //这里增加对css modules的支持
						},
					},

					// Compiles Sass to CSS
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
							implementation: require('sass'),
							sassOptions: {
								fiber: require('fibers'),
								includePaths: ['../src/'],
							},
						},
					},
					'postcss-loader',
				],
				exclude: /node_modules/,
			},

			{
				// for ant design
				test: /\.less$/,
				include: path.join(__dirname, '../node_modules'),
				use: [
					'style-loader',
					'css-loader',
					'postcss-loader',
					{
						loader: 'less-loader',
						options: {
							javascriptEnabled: true,
						},
					},
				],
			},

			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							//1024 == 1kb
							//小于10kb时打包成base64编码的图片否则单独打包成图片
							limit: 10240,
							name: path.join('img/[name].[hash:7].[ext]'),
						},
					},
				],
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10240,
							name: path.join('font/[name].[hash:7].[ext]'),
						},
					},
				],
			},
		],
	},

	performance: {
		// 性能提示，可以提示过大文件
		hints: 'warning', // 性能提示开关 false | "error" | "warning"
		maxAssetSize: 100000, // 生成的文件最大限制 整数类型（以字节为单位）
		maxEntrypointSize: 100000, // 引入的文件最大限制 整数类型（以字节为单位）
		assetFilter: function(assetFilename) {
			// 提供资源文件名的断言函数
			return /\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetFilename);
		},
	},

	resolve: {
		mainFields: ['browser', 'main', 'module'],
		extensions: ['.tsx', '.ts', '.js', '.jsx', '.json', '.css', '.scss'],
		alias: {
			src: require('path').resolve(__dirname, '../src'),
		},
	},
};
