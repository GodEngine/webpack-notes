/**
 * html-webpack-plugin:
 *  自动管理output中的资源生成
 * clean-webpack-plugin
 *  每次build前清理掉旧的dist目录
 * extract-text-webpack-plugin
 *  将css抽取出来
 * webpack-manifest-plugin：
 *  生成清单文件
 * uglifyjs-webpack-plugin:
 *  压缩js（必须先经过babel-loader编译为es5，https://github.com/babel/babel-loader）
 */
// const path = require('path')
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpack = require('webpack')
const common = require('./webpack.common')

console.log('process.env.NODE_ENV', process.env.NODE_ENV)
const pro = merge(common, {
	mode: 'production',
	devtool: 'source-map', // 生成环境中勿用“inline-source-map”，会在bundle中生成内联sourcemap
	optimization: { 
		// splitChunks: { // 将不同bundle中的重复引入的模块提取出来
		// 	chunks: 'all'
		// },
		// minimize: true,
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: true // 开启貌似没什么卵用
			}),
			new OptimizeCSSAssetsPlugin({})
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
			// chunkFilename: '[id].css'
		}),
		new webpack.HashedModuleIdsPlugin()
	],
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				exclude: /node_modules/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
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
	}
})
console.log('pro', pro)
module.exports = pro