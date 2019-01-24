# webpack4 note：

## guides

### UglifyJsPlugin
压缩js: UglifyJsPlugin只能压缩es5的js，用es6编写的代码需用(babel-loader)[https://github.com/babel/babel-loader]编译js

source-map: 同时开启webpack-config的devtool sourcemap和UglifyJsPlugin options中的sourceMap属性属性才会生成source-map

### 懒加载
实现懒加载需要注意四个地方

- 设置output.chunkFilename：生成需要进行懒加载的模块。
- 设置需要懒加载的模块引入方式为import(magic comment，即动态引入)。
- 使用 (插件)[https://github.com/airbnb/babel-plugin-dynamic-import-webpack]，配置babelrc来允许使用`import()`es2015的动态import语法
- rules中使用babel-loader进行转码

### 缓存
为实现客户端的长效缓存，打包后的资源名称在内容未发送变化下希望hash值不变，需要设置为：

- filename和chunkFilename的hash需同时设置为`contenthash`
- 配置optimization的splitChunks属性的cacheGroups值

### tree shaking
tree shaking是利用es6中模块静态结构的特性，打包阶段将没有引用到的代码去除。

- package.json中设置sideEffects为false或pollyfill的数组
- 使用如UglifyJSPlugin的压缩工具

## ts版的webpack.config.js
- npm install -D typescript ts-node @types/node @types/webpack
- npm install --save-dev @types/webpack-dev-server
- import webpack from 'webpack' 类型为webpack.Configuration