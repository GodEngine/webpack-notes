/**
 * html-webpack-plugin:
 *  自动管理output中的资源生成
 * clean-webpack-plugin
 *  每次build前清理掉旧的dist目录
 * extract-text-webpack-plugin
 *  将css抽取出来
 * webpack-manifest-plugin：
 *  生成清单文件
 */
const webpack = require('webpack')
const merge = require('webpack-merge')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const common = require('./webpack.common')

const dev = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map', // 生成环境中勿用“inline-source-map”，会在bundle中生成内联sourcemap
	devServer: {
		contentBase: './dist',
		port: 9000,
		compress: true,
		hot: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin()
		// new MiniCssExtractPlugin({
		// 	filename: '[name].css',
		// 	chunkFilename: '[id].css'
		// })
	],
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					'style-loader',
					'css-loader',
				],
			},
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
		]
	},
	// optimization: {
	// 	splitChunks: {
	// 		chunks: 'all'
	// 	}
	// }
})
console.log('dev', dev)
module.exports = dev