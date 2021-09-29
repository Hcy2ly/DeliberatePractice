## 2021 0911 （周六）

1. 面经知识点总结
   1. 前端知识体系
      1. 基础
         1. html
         2. css
         3. js
      2. typescript
      3. 计算机网络
      4. 浏览器
         1. 同源策略
         2. 渲染过程
         3. web安全
         4. 性能优化
      5. 数据结构和算法
      6. 单元测试
      7. 工程化-基础建设
         1. node 基础脚手架等
         2. 基本编译原理
         3. 构建工具
            1. webpack [vite]
            2. rollup
            3. esbuild
         4. 组件库
         5. 微前端
         6. 低代码
      8. 监控
         1. 性能监控
         2. 异常监控
      9. 埋点
      10. 可视化
          1.  canvas
          2.  webgl
      11. 跨端
          1.  flutter
          2.  jsbridge
      12. 小程序
          1.  微信小程序
          2.  uniapp
          3.  taro
      13. 框架
          1.  vue
          2.  react
          3.  angular
      14. 团队协作
          1.  git
          2.  eslint
          3.  commitlint
          4.  code review
      15. DevOps
          1.  docker
          2.  nginx
          3.  jenkins
          4.  Kubermetes
          5.  CI/CD

   2. 浏览器
      1. 相关问题
         1. 从输入网址到看到网页发生了什么
         2. dom 解析规则
         3. css、js是否会阻塞渲染
         4. xss、csrf
         5. 重绘和重排的区别
         6. 浏览器缓存是怎样的
         7. 跨域
      2. 参考资料
         1. 浏览器渲染详细过程：重绘、重排和 composite 只是冰山一角 - 掘金
         2. 浏览器工作原理与实践\_浏览器\_V8原理-极客时间
         3. 图解 Google V8\_虚拟机\_JavaScript\_Node.js\_前端\_Google-极客时间

   3. 前端基础 之 CSS
      1. BFC（块级格式化上下文）
         1. 规则
            1. body根元素
            2. 浮动元素，float不能为none
            3. position值为absolute，fixed
            4. display为inline-block、table-cells、flex
            5. overflow不为visible
         2. 作用
            1. BFC不会和float重叠
            2. BFC可以解决margin重叠
            3. 计算BFC的高度时，浮动元素也参与计算
      2. 盒模型
         1. 普通盒模型content不包括padding，而IE盒模型下content包含padding
         2. 普通盒模型
            1. content
            2. padding
            3. border
            4. margin
         3. IE盒模型
            1. content
            2. border
            3. margin
      3. 伪类和伪元素
         1. 伪类  -  伪类用于向某些选择器添加特殊的效果
         2. 伪元素  -  伪元素用于将特殊的效果添加到某些选择器
      4. 选择器  -  优先级  -  important > id > class > tagName
      5. 样式优先级 - 内联样式 > css选择器样式 > link引入的样式
      6. position
         1. 相对定位：relative - 相对自身进行定位
         2. 绝对定位：absolute - 基于父元素定位，没有非static，则根据浏览器。
         3. 固定定位：fixed - 相对浏览器视口进行绝对定位
         4. 粘性定位：sticky - 滑动到一定距离，进行固定定位
      7. 布局方式
         1. float - 早期布局方式，通过浮动元素方式，需要清除浮动
         2. flex - 弹性布局，兼容很好
         3. grid - 网格布局，通过网格方式进行实现，兼容不好
      8. 层级上下文
         1. 产生层级的属性
            1. position值不为static
            2. transform
            3. z-index
            4. will-change
            5. filter
            6. opacity
         2. 彻底搞懂CSS层叠上下文、层叠等级、层叠顺序、z-index
            1. 普通元素的层叠等级优先由其所在的层叠上下文决定。
            2. 层叠等级的比较只有在当前层叠上下文元素中才有意义。
            3. 为什么inline/inline-block元素的层叠顺序要高于block(块级)/float(浮动)元素？网页设计之初最重要的就是文字内容，所以在发生层叠时会优先显示文字内容，保证其不被覆盖。
            4. 层叠顺序：层叠上下文 background、border  >  z-index<0   >  block块级水平盒子  >  float 浮动盒子  >  inline/inline-block水平盒子  >  z-index: auto /z-index: 0   >  z-index > 0
            5. 首先先看要比较的两个元素是否处于同一个层叠上下文中：
               1.  如果是，谁的层叠等级大，谁在上面（怎么判断层叠等级大小呢？——看“层叠顺序”图）
               2.  如果不是，请先比较他们所处的层叠上下文的层叠等级。
            6. 当两个元素层叠等级相同、层叠顺序相同时，在DOM结构中后面的元素层叠等级在前面元素之上。

   4. 前端基础 之 JavaScript
      1. this
         1. 一般情况下，this指向调用者，箭头函数的this，指向调用的父作用域
         2. call、apply、bind修改this
      2. 作用域
         1. 全局作用域
         2. 函数作用域
         3. eval作用域
         4. 函数内部可以访问外部数据，就形成了作用域链，但是外部没办法访问函数内部的数据
      3. 闭包
         1. 函数内部嵌套了一个新的函数，嵌套的函数对外部的函数造成了引用就形成了闭包
         2. 应用
            1. 柯里化
            2. 节流、防抖
            3. compose组合函数、高阶函数
      4. 原型链
         1. 每个对象有一个 __proto__ 属性，表示自己的原型，而函数，是特殊的对象，有一个prototype属性表示自己的原型。
         2. 查找一个对象的属性，会沿着原型去找，找到了就返回，没找到就返回null。
      5. 继承
         1. 继承分为接口继承 或者 实现继承。接口继承只会继承方法签名，而实际继承继承实际的方法。由于函数没有签名。所以ECMAScript只能支持实现继承，而且其继承主要是通过原型链实现的继承。
      6. 事件循环
         1. 说说事件循环机制(满分答案来了)  https://blog.csdn.net/LuckyWinty/article/details/104765786/
         2. 宏任务 - setTimeout、setInterval、script、setImmediate、IO、Promise.resolve
         3. 微任务 - process.nextTick、Promise、async await、mutation observer
         4. 浏览器 - 执行宏任务，然后执行该宏任务产生的微任务，若微任务在执行过程中产生了新的微任务，则继续执行微任务，微任务执行完毕后，再回到宏任务中进行下一轮循环。
      7. 异步
         1. promise
            1. promise 是回调地狱的一个解决方案，有三种状态，pending(等待)、onFulfilled（成功）、onRejected（失败）
            2. 图灵社区
         2. generator - 比promise相对友好的一个方案，调用之后会返回一个next和done，done表示是否结束，结束后值为true，每次执行都需要调用next才会继续执行。
         3. async、await - promise + generator 的语法糖
      8. 事件流
         1. 捕获
         2. 目标
         3. 冒泡
      9.  垃圾回收 - 一文搞懂V8引擎的垃圾回收
      10. 模块规范
          1.  esmodule
              1.  值拷贝
              2.  静态模块、可被tree shaking
          2.  commonjs
              1.  值引用
              2.  可动态加载
              3.  可被缓存
              4.  默认严格模式
      11. 数据类型
          1.  基本类型
              1.  number
              2.  string
              3.  undefined
              4.  null
              5.  boolean
              6.  symbol
              7.  bigint
          2.  引用类型
              1.  array
              2.  object
          3.  判断
              1.  typeof 用来判断基本类型，instanceof 判断引用类型
              2.  Object.prototype.toString.call() 终极武器

   5. 前端基础之计算机网络
      1. HTTP3
         1. 介绍  - 基于udp并封装了一层quic协议进行实现
         2. 优点  - 彻底解决tcp阻塞
         3. HTTP3原理实战 - 知乎
      2. HTTP2
         1. 优点
            1. 多路复用
            2. 使用二进制传输
            3. 头部压缩
            4. server push
         2. 缺点  - 依然存在TCP阻塞，部分情况下可能会比HTTP1.1还慢。
         3. 基于HTTPS协议，但是加密是可选的
      3. HTTP
         1. 状态码
            1. 1xx 信息 - 101切换协议
            2. 2xx 请求成功
               1. 200 成功
               2. 204 预见请求
               3. 206 范围请求，如果有Range和if-range将返回206
            3. 3xx 重定向
               1. 301 永久重定向
               2. 302 临时重定向
               3. 304 存在协商缓存
            4. 4xx 客户端错误
               1. 400 客户端错误
               2. 401 认证失败
               3. 403 服务端接受到了请求，但是拒绝访问
               4. 404 文件不存在
               5. 405 请求方式错误
               6. 415 未知的媒体报错
            5. 5xx 服务端错误
               1. 500 服务器异常
               2. 502 网关错误
               3. 503 服务器繁忙中
               4. 504 服务器飞了
         2. 请求方式
      4. HTTPS
         1. 在http的基础上，增加了TLS\SSL协议进行加密传输，身份认证网络协议，通过数字证书、加密算法（RSA），非对称加密进行传输。
      5. HTTP 和 HTTPS握手  - [三次握手和四次挥手]
      6. TCP阻塞 - [动画：如何给面试官回答TCP的拥塞控制-掘金]
      7. DNS
         1. 查询
            1. 查询的时候，会向域名服务器进行查询，接收这个查询请求的域名服务器首先会在自己的数据库进行查找，如果有该域名的ip则返回，没有则继续上一层域名服务器查询，直到根域名服务器。
            2. 解析器和域名服务器将最新的域名会缓存，方便下次查找。
      8. OSI
         1. 应用层 - 为应用程序提供服务并规定通信的相关细节
         2. 表示层 - 将应用处理的信息转换为适合网络传输的格式，或者将下一层的数据转换为上一层能处理的格式，主要负责数据转换。
         3. 会话层 - 负责建立和断开连接，以及书的分割等数据传输的相关内容
         4. 传输层 - 管理2个点的数据传输（确保数据被送达）
         5. 网络层 - 将数据传输到目标地址，目标地址可以是多个网络通过路由器连接而成的地址，主要负责寻址和路由选择。
         6. 数据链路层 - 负责物理层上互联、节点之间的通信传输，将0，1序列划分为具有意义的数据帧传送给对方（数据帧的生成和接收）
         7. 物理层 - 负责哦，1比特流与电压的高低，灯光闪灭的转换。

   6. 前端工程化
      1. AST抽象语法树  - 通过词法分析和语法分析生成AST、可以通过对AST的修改，生成新的代码
      2. Babel - ES next 转 es5
      3. 代码格式化
         1. ESlint
         2. prettier
      4. postcss  - 解决css兼容问题
      5. 微前端  - qiankun
      6. commitlint[git——commit规范指南-简书]
         1. commit规范
         2. commitizen 校验commit
      7. vite
         1. 基于esbuild和rollup实现，内部采用esmodule进行解析，不需要编译，所以会比webpack快很多，并且esbuild是基于go实现的，可能有语言优势。
      8. 模块化
         1. amd
         2. cmd
         3. commomjs (node)
            1. require 支持动态加载
            2. require 可以被缓存
            3. require 也可以静态加载
            4. require 是基于值拷贝
         4. esmodule （浏览器）
            1. import from 静态加载，可以被tree shaking
            2. import() 动态加载，返回promise
            3. esmodule 值引用

   7. node
      1. 模块查找规则
         1. 模块支持的格式：js、json、node（c++编译后生成的模块）
         2. 查找是否内置模块
         3. 查找是否自定义模块 如/ ../ ./等
         4. 查找是否有node_modules模块，会从当前目录的上一级一直查询到根目录下的node_modules目录
         5. 从环境变量的NODE PATH加载
         6. 报错：找不到模块
         7. 核心模块也可以使用require('node:http')，将会跳过缓存，直接从lib目录进行加载  node16以上支持
         8. 可以通过require.resolve(xxx) 获取模块的加载路径
      2. 模块实现原理
         1. node 在加载模块的时候，会对模块进行缓存，引入多次也只会加载一次。
         2. (function(exports,require,modules,__filename,__dirname)(//模块代码实际存在于此处))
      3. stream
         1. readStream 可读流
         2. writeStream 可写流
         3. duplex 双工流
         4. transform 转换流
            1. 压缩流
            2. 加密流
      4. 非阻塞异步IO  - [Nodejs理论实践值《异步非阻塞IO与事件循环》-掘金]
      5. 中间件 - [深入浅出的node中间件原理-掘金]

   8. webpack
      1. 编译流程
         1. 初始化 entryOptions
         2. 初始化内部解析
         3. 确定编译环境
         4. 开始编译和以监听模式进行编译
         5. 编译之前
         6. 编译
         7. 开始构建 生成 compiler 对象
         8. 新的构建 产生compilation对象
         9. 构建结束 调用 make
         10. 编译结束
         11. 输出文件
         12. 编译完成
      2. 编译优化
         1. 优化分析
            1. 体积分析：webpack-bundle-analyzer
            2. 速度分析：speed-measure-webpack-plugin
            3. 日志分析：webpack -stats
         2. 优化方案
            1. 使用 dllPlugin
            2. babel-loader 添加 cacheDirectory
            3. 使用 thread-loader 优化 loader
            4. 使用高版本的node 和 webpack
            5. 开启tree shaking 和 scope hoisting
            6. webpack5 配置长缓存
            7. 使用 css-minimizer-webpack-plugin 压缩 css
            8. 使用terser-webpack-plugin 压缩js，并去掉无用的js
            9. webpack5 的 module-federation
      3. HMR
         1. webpack-dev-server 在启动的时候会给entry去注入webpack、hot、dev-server
         2. 注入 webpack-dev-server/client/index.js
         3. 判断是否存在webpack.HotModuleReplacementPlugin(作用：这个插件会注入一个module.hot的一个对象，该对象提供了一些方法，用于更新。)
         4. 监听webpack hooks 的 compile、done、invalid 钩子
         5. 初始化 express、webpack-dev-middleware
         6. 启动express、socket服务 ---- socket服务主要用于监听一些特定的事件进行更新处理
         7. webpack-dev-middleware会以watch的形式监听文件更改，当文件发生变化的时候，会生成xxx.hot-update.js (当前的文件) 和 xxx.hot-update.json （下次更改的hash），然后创建script进行更新。
      4. tree shaking （看文档）
         1. 基于es6的模块机制实现，主要是因为es6的模块是静态的  import from，可以被webpack解析，而require()，import()是可以动态的
         2. 如果有些模块有副作用需要在 package.json 设置 sideEffects:true。
      5. 核心
         1. entry - 入口文件
         2. output - 输出的路径
         3. loader
            1. webpack只支持js进行编译，而其他文件都需要loader进行转换，loader本质是个函数，每个loader都会拿到上一个loader所处理的结果，并在当前loader进行处理，然后并返回，传递给下一个loader。
            2. 可以通过loader-runner进行调试，schema-utils对loader的参数进行校验
            3. Loader Interface | webpack 中文文档
         4. plugin
            1. 作用
               1. 监听webpack的生命周期，在对应的生命周期进行相应的处理。
            2. 原理
               1. plugin是一个类，需要提供一个apply方法，apply内接受compiler对象，compiler是webpack构建期间所生成的编译对象，可以通过监听compiler.hook.xxx.tap或者tapAsync,来实现插件，其中还有一个重要的对象是compilation，而compilation是webpack每次产生新的构建就会生成一个对象，其中compiler在整个构建期间只会有一个，而compilation会有多个。
               2. compiler和compilation都继承于tapable，而tapable其实是类似于node的eventEmitter的一个库，插件主要就是通过compiler或者compilation对webpack的构建周期进行各种处理的一个方式。
      6. tapable
         1. 同步
            1. SyncHook
            2. SyncBailHook
            3. SyncWaterfallHook
            4. SyncLoopHook
         2. 异步
            1. 并行
               1. AsyncParallelHook
               2. AsyncParallelBailHook
            2. 串行
               1. AsyncSeriesHook
               2. AsyncSeriesBailHook
               3. AsyncSeriesWaterfallHook
         3. 类型
            1. ball - 当前函数有返回值，就停止执行
            2. waterfall - 调用时，值会传递给下一个函数
            3. loop - 当返回true表示继续循环，返回undefined结束循环。
         4. 注册方式 - 同步通过tap进行调用，异步调用tapAsync、tapPromise
         5. 调用方式 - 同步通过call进行调用，异步通过callAsync、promise

   9. 前端性能优化
      1.  文章
          1.  常见的性能优化方案
          2.  一些性能指标

   10. 前端监控
       1. 文章： 一篇讲透自研的前端错误监控

   11. 数据结构和算法
       1.  文章
           1.  宫水三叶的刷题日记
           2.  算法面试通关40讲\_算法面试\_LeetCode刷题
           3.  javascript-algorithms
           4.  VisuAlgo \- 数据结构和算法动态可视化
       2.  书
           1.  算法导论
           2.  剑指offer
           3.  小灰的漫画算法
