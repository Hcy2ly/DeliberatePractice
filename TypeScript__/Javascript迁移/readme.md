

1. 设置目录
2. 书写配置文件
    /** tsconfig.json */
    {
        "compilerOptions": {
            "outDir": "./built",
            "allowJs": true,
            "target": "es5"
        },
        "include": [
            "./src/**/*"
        ]
    }
    配置项解析：
            读取所有可识别的src目录下的文件（通过include）。
            接受JavaScript做为输入（通过allowJs）。
            生成的所有文件放在built目录下（通过outDir）。
            将JavaScript代码降级到低版本比如ECMAScript 5（通过target）。
            更多（https://www.cnblogs.com/wangleicode/p/10937707.html）
3. 与构建工具集成 - webpack
  
  pm install ts-loader source-map-loader

  /** webpack.config.js */
  module.exports = {
      entry: "./src/index.ts",
      output: {
          filename: "./dist/bundle.js",
      },

      // Enable sourcemaps for debugging webpack's output.
      devtool: "source-map",

      resolve: {
          // Add '.ts' and '.tsx' as resolvable extensions.
          extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
      },

      module: {
          loaders: [
              // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
              { test: /\.tsx?$/, loader: "ts-loader" }
          ],

          preLoaders: [
              // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
              { test: /\.js$/, loader: "source-map-loader" }
          ]
      },

      // Other options...
  };
 
  要注意的是ts-loader必须在其它处理.js文件的加载器之前运行.