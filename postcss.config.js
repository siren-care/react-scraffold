module.exports = {
	plugins: [
		require('autoprefixer'),
		require('cssnano'),
		require('postcss-px2rem')({ remUnit: 100, baseDpr: 2 }),
	],
};
