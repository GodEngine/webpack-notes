/**
 * html-webpack-plugin:
 *  自动管理output中的资源生成
 * clean-webpack-plugin
 *  每次build前清理掉旧的dist目录
 * mini-css-extract-plugin
 *  异步loading、抽取css、支持HMR
 * webpack-manifest-plugin：
 *  生成清单文件
 */
const path = require('path')
const htmlplugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const webpack = require('webpack')

module.exports = {
	mode: 'development',
	entry: {
		// app: path.join(__dirname, 'src/index.js'),
		// math: path.join(__dirname, 'src/math.js'),
		app: path.join(__dirname, 'src/index.js')
		// index: './src/index.js'
	},
	output: {
		filename: '[name].[contenthash:8].bundle.js',
		// filename: '[name].bundle.js',
		/*
    * 懒加载功能需：
    * 1，设置output.chunkFilename
    * 2. 需要懒加载的模块设置为import(magic comment)动态引入
    * 3. 使用 https://github.com/airbnb/babel-plugin-dynamic-import-webpack 
    */
		chunkFilename: '[name].[contenthash:8].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	optimization: {
		runtimeChunk: 'single', // 将runtime单独生成一个bundle
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all'
				}
			}
		}
		// usedExports: true // 激活three shaking，mode为production下会自定设置
	},
	plugins: [
		new htmlplugin({
			title: 'Output Management'
		}),
		new CleanWebpackPlugin(['dist']),
		new ManifestPlugin({
			fileName: 'cus-manifest.json'
		}),
	],
	module: {
		rules: [
			{
				test: /\.(png|svg|jpg|gif|ico)$/,
				use: [
					'file-loader'
				]
			}
		]
	},
}