1.  _设置目录_

2.  _书写配置文件_

    ```
    // tsconfig.json
    {
      "compilerOptions": {
        "outDir": "./built",
        "allowJs": true,
        "target": "es5"
      },
      "include": [
        "./src/**/\*"
      ]
    }
    ```

    配置项解析：
    读取所有可识别的 src 目录下的文件（通过 include）。
    接受 JavaScript 做为输入（通过 allowJs）。
    生成的所有文件放在 built 目录下（通过 outDir）。
    将 JavaScript 代码降级到低版本比如 ECMAScript 5（通过 target）。
    更多（https://www.cnblogs.com/wangleicode/p/10937707.html）

3.  _与构建工具集成 - webpack_
    npm install ts-loader source-map-loader

    ```
    // webpack.config.js
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
    ```

    要注意的是 ts-loader 必须在其它处理.js 文件的加载器之前运行.

4.  _把相关的 js 文件转换到 ts 文件_
    .js => .ts
    .jsx => .tsx
    因为 ts 只会校验 不会控制编译，如果我们希望 ts 报错了就不让文件编译，我们可以【启用严格检查】
    js 文件转 ts 会遇到的几个步骤：

    1.  **去除错误**
        若不出所料，在转换后将会看到错误信息。

        1. 【由模块导入】：对于 cannot find xxx define 的变量啥的，添加 ts 声明即可。 对于 cannot find xxx module 啥的，npm install ，存在，那就 declare module 声明 或者 在配置文件中声明。

        2. 【由模块导出】：通常来讲，由模块导出涉及添加属性到 exports 或 module.exports。 TypeScript 允许你使用顶级的导出语句。

           ```
           // 例如 1:
           // js 这么写：
           module.exports.feedPets = function(pets) {
             // ...
           }
           // ====> ts 这么写：
           export function feedPets(pets) {
             // ...
           }

           // 例如 2:有时你会完全重写导出对象。 这是一个常见模式，这会将模块变为可立即调用的模块：
           var express = require("express");
           var app = express();
           // js 这么写：
           function foo() {
             // ...
           }
           module.exports = foo;
           //====> ts 这么写：
           function foo() {
             // ...
           }
           export = foo;
           ```

        3. 【过多过少的参数】：
           有时你会发现你在调用一个具有过多或过少参数的函数。 通常，这是一个 BUG，但在某些情况下，你可以声明一个使用 arguments 对象的函数而不需要写出所有参数:

           ```
           function myCoolFunction() {
             if(argument.length == 2 && !Array.isArray(argument[1])) {
               var f = arguments[0];
               var arr = arguments[1];
               // ...
             }
             // ...
           }

           myCoolFunction(function(x) { console.log(x) }, [1, 2, 3, 4]);
           myCoolFunction(function(x) { console.log(x) }, 1, 2, 3, 4);
           ```

           这种情况下，我们需要用 ts 的函数重载来告诉调用者 myCoolFunction 函数的调用

           ```
           function myCoolFunction(f: (x: number) => void, nums: number[]): void;
           function myCoolFunction(f: (x: number) => void, ...nums: number[]): void;
           function myCoolFunction() {
               if (arguments.length == 2 && !Array.isArray(arguments[1])) {
                   var f = arguments[0];
                   var arr = arguments[1];
                   // ...
               }
               // ...
           }
           ```

           ps： 重载函数是函数的一种特殊情况，为方便使用，C++允许在同一范围中声明几个功能类似的同名函数，但是这些同名函数的形式参数（指参数的个数、类型或者顺序）必须不同，也就是说用同一个函数完成不同的功能。这就是重载函数。重载函数常用来实现功能类似而所处理的数据类型不同的问题。不能只有函数返回值类型不同。

        4. 【连续添加属性】

           ```
           // 有些人可能会因为代码美观性而喜欢先创建一个对象然后立即添加属性：
           var options = {};
           options.color = "red";
           options.volume = 11;
           // ts中 默认值会影射类型 且后续不可修改 一旦赋值与声明不符 就会提示报错 因此在ts中, 1. 可以选择 一次赋默认值 来确定类型
           let options = {
             color: "red",
             volume: 11
           };
           // 2. 或者 先声明类型 再赋值
           interface Options { color: string; volume: number }

           let options = {} as Options;
           options.color = "red";
           options.volume = 11;
           ```

        5. 【any, object, {}】
           any 是最灵活的类型，当你使用 any 时，你会失去大多数 TypeScript 提供的错误检查和编译器支持。
           Object 和{}，你应该选择{}。 虽说它们基本一样，但是从技术角度上来讲 {}在一些深奥的情况里比 Object 更普通。

    2.  **启用严格检查**
        ts 提供了一些检查来保证安全以及帮助分析你的程序。当代码转换成 ts，可以启用这些检查来获得高度安全性。

        1. 【没有隐式的 any】
           某些情况下，ts 无法判断某些值的类型，就会用 any 代替。但是使用 any 意味着失去了类型安全保障，并且得不到工具的支持。
           所以当一定要用 any 类型的时候，可以考虑使用 [noImplicitAny] 选项，让 ts 标记出使用 any 的地方，并且给出一个错误。

        2. 【严格的 null 和 undefined 检查】
           默认模式下，ts 把 null 和 undefined 当做属于任何类型。也就是，声明为 number 类型的值也可以是 null 或者 undefined。
           但是，因为在 js 中，null 和 undefined 经常会带来 bug，所以 ts 有 [strictNullChecks] 选项来帮助我们分辨。
           当启用 strictNullChecks，null 和 undefined 就获得了他们各自的类型 null 和 undefined。当任何值可能为 null 或者 undefined 的时候，可以用联合类型，比如 number ｜ null 或者 number ｜ undefined
           假设有一个值 ts 认为可能为 null 或者 undefined，但是你更清楚它的类型后，可以用 ! 后缀。例如：

           ```
           declare var foo: string[] | null;

           foo.length; // error - 'foo' is possibly 'null'
           foo!.length; // okay - 'foo!' just has type 'string[]'
           ```

           要当心，当使用 strictNullChecks，依赖也需要相应地启用 strictNullChecks，null。

        3. 【this 没有隐式的 any】
           当在类的外部使用 this 关键字时，它会默认获得 any 类型。

           ```
           // 假设有一个Point类，并且我们要添加一个函数做为它的方法
           class Point {
             constructor(public x, public y) {}
             getDistance(p: Point) {
                 let dx = p.x - this.x;
                 let dy = p.y - this.y;
                 return Math.sqrt(dx ** 2 + dy ** 2);
             }
           }
           // ...
           // Reopen the interface.
           interface Point {
             distanceFromOrigin(point: Point): number;
           }
           Point.prototype.distanceFromOrigin = function(point: Point) {
             return this.getDistance({ x: 0, y: 0});
           }
           ```

           这就产生了我们上面提到的错误 - 如果我们错误地拼写了 getDistance 并不会得到一个错误。 正因此，TypeScript 有 noImplicitThis 选项。 当设置了它，TypeScript 会产生一个错误当没有明确指定类型（或通过类型推断）的 this 被使用时。 解决的方法是在接口或函数上使用指定了类型的 this 参数：

           ```
           Point.prototype.distanceFromOrigin = function(this: Point, point: Point) {
             return this.getDistance({ x: 0, y: 0});
           }
           ```
