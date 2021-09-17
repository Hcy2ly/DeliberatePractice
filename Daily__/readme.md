# day day up

## 2021 0908

1. js 复杂判断的更优雅的写法

    if/else
    switch
    一元判断时：存到Object里
    一元判断时：存到Map里
    多元判断时：将condition拼接成字符串存到Object里
    多元判断时：将condition拼接成字符串存到Map里
    多元判断时：将condition存为Object存到Map里
    多元判断时：将condition写作正则存到Map里

    **不同： 不同条件执行相同语句，可以用switch、object简化。普通对象字面量的key只能是字符串，Map对象可以用任何类型的数据作为key，比如对象、正则对象等。**

2. 实现一个 将字符串转换成整数 的函数。
   分析： 
        首先，该函数会根据需要丢弃无用的开头空格字符，直到寻找到第一个非空格的字符为止。
        如果第一个非空字符为正或者负号时，则将该符号与之后面尽可能多的连续数字字符组合起来，形成一个有符号整数。
        假如第一个非空字符是数字，则直接将其与之后连续的数字字符组合起来，形成一个整数。
        该字符串在有效的整数部分之后也可能会存在多余的字符，那么这些字符可以被忽略，它们对函数不应该造成影响。 
        
        注意：假如该字符串中的第一个非空格字符不是一个有效整数字符、字符串为空或字符串仅包含空白字符时，则你的函数不需要进行转换，即无法进行有效转换。
        在任何情况下，若函数不能进行有效的转换时，请返回 0 。
        
        
   提示：
        本题中的空白字符只包括空格字符 ' ' 。 假设我们的环境只能存储 32 位大小的有符号整数，那么其数值范围为 [−231,  231 − 1]。如果数值超过这个范围，请返回  INT_MAX (231 − 1) 或 INT_MIN (−231) 。

   案例： 
        输入: "   -42"
        输出: -42
        解释: 第一个非空白字符为 '-', 它是一个负号。我们尽可能将负号与后面所有连续出现的数字组合起来，最后得到 -42 。
        
        输入: "4193 with words"
        输出: 4193
        解释: 转换截止于数字 '3' ，因为它的下一个字符不为数字。

        输入: "words and 987"
        输出: 0
        解释: 第一个非空字符是 'w', 但它不是数字或正、负号。因此无法执行有效的转换。

        输入: "-91283472332"
        输出: -2147483648
        解释: 数字 "-91283472332" 超过 32 位有符号整数范围。 因此返回 INT_MIN (−231) 。
   
   主要规则：
        忽略开头空格
        忽略整数部分后的字符
        返回有符号整数
        范围在 32 位内
        函数不能进行有效的转换时，请返回 0
        *所有的条件 parseInt 都满足*，除了: 1. 范围在 32 位内（含）;  2. 函数不能进行有效的转换：parseInt 返回的是 NaN.
   解答：[./parseIntPlus.js]

## 2021 0909

1. 【网页特效】丝滑的 macOS Dock效果
    核心： 当游标在同一个图标上左右移动时，都会影响到左边和右边的图标大小的，达到一个很连贯的效果
    案例： [macOSDock.html]

2. 每日算法：滑动窗口的最大值问题
   案例： 给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值。

            滑动窗口的位置             最大值
       [1  3  -1] -3  5  3  6  7       3 
        1 [3  -1  -3] 5  3  6  7       3 
        1  3 [-1  -3  5] 3  6  7       5 
        1  3  -1 [-3  5  3] 6  7       5 
        1  3  -1  -3 [5  3  6] 7       6 
        1  3  -1  -3  5 [3  6  7]      7

   分析：
    你可以假设 k 总是有效的，再输入数组不为空的情况下，1 <= k <= 输入数组的大小。因为这道题目的本质就是把一维数组幻化成二维数组并且求出每个数组里面的最大元素。

   解答：[maxSlidingWindow.js]
    1. 暴力for循环
    2. 优化：双端队列

## 2021 0910

1. 使用Typescript的一些注意事项(回顾总结)
   ts 和 java 都是静态类型语言，ts不同的本质在于*ts作为一个静态类型语言，要编译成弱类型语言js来执行。所以ts只管得了编译时，却管不了运行时*
   
    - 易混乱的类型：
      1. never vs void
          1. never特点： 返回never的函数，都必须存在无法到达的终点，如死循环、抛出异常。
      
      2. any as unknown
          1. any 任何类型，会忽略语法检查
          2. unknown 不可预知的类型，不会忽略语法检查（这就是最大区别）

    - 一些“欺骗”编译器语法检查的行为：
      1. @ts-ignore  增加 @ts-ignore 的注释，会忽略下一行的语法检查。
      
      2. any  

      3. 类型断言 as  
          1. 告诉编译器编译类型是什么
          2. function fn(a: string | null): void {
                const length = (a as string).length
                console.log(length)
            }
            fn('abc') // Ok
            // fn(null) // Error js 运行报错
      
      4. 非空断操作符! 
          1. ! 用于排除 null undefined ，即告诉编译器：xx 变量肯定不是 null 或 undefined
          2. function fn(a: string | null | undefined) {
                let s: string = ''
                s = a // Error 语法检查失败
                s = a! // OK —— 【注意】如果 a 真的是 null 或者 undefined ，那么 s 也需要是 null 或者 undefined ，不然可能会带来 bug ！！！
            }
            // fn(null)
      
      5. 可选链 ?.
          1. ?.遇到 null 或 undefined 就可以立即停止某些表达式的运行，并返回 undefined【注意】这里只针对 null 和 undefined，对于 0 false '' 等 falsely 变量是不起作用的。
          2. 这个运算符，看似是获取一个属性，其实它是有条件判断的。即，它就是一个 ? : 三元表达式的语法糖
          3. function tryGetArrayElement<T>(arr?: T[], index: number = 0) {
              return arr?.[index];
            }
            // 编译产出：
            // "use strict";
            // function tryGetArrayElement(arr, index = 0) {
            //     return arr === null || arr === void 0 ? void 0 : arr[index];
            // }

    - type 和 interface 区别
      - 尽量没事用 interface => 引申：interface 声明的好处在哪？
    
    - private 和 #
      1. private 是ts中一开始就有的语法，而且目前只有ts有，es规范没有。
      2. ”#“ 是es目前的提案语法，然后被ts 3.8支持了，即 ts 和 es 都支持 #
      3. 所以两者都表示私有属性，背景不同，但是对于ts，用哪个都一样，
      4. *ts 只关注编译时，不关注运行时*
         1. private 
            1. private 编译之后，就失去了私有的特点。即，如果你执行 (new Person()).name ，虽然语法检查不通过，但运行时是可以成功的。即，private 仅仅是 ts 的语法，编译成 js 之后，就失效了。 
            2. // ts 源码
                class Person {
                    private name: string
                    constructor() {
                        this.name = 'zhangsan'
                    }
                }

                /* 编译结果如下
                "use strict";
                class Person {
                    constructor() {
                        this.name = 'zhangsan';
                    }
                }
                */
         2. ‘#’
            1. #编译之后，依然具有私有特点，而且用 (new Person()).name，在运行时也是无法实现的。即，# 是 ts 语法，但同时也是 ES 的提案语法，编译之后也不能失效。
            2. *但是，编译结果中，“私有”是通过 WeekMap 来实现的，所以要确保你的运行时环境支持 ES6 。*WeekMap 没有完美的 Polyfill 方案，强行 Polyfill 可能会发生内存泄漏。
            3. // ts 源码
                class Person {
                    #name: string
                    constructor() {
                        this.#name = 'zhangsan'
                    }
                }

                /* 编译结果如下
                "use strict";
                var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
                    if (!privateMap.has(receiver)) {
                        throw new TypeError("attempted to set private field on non-instance");
                    }
                    privateMap.set(receiver, value);
                    return value;
                };
                var _name;
                class Person {
                    constructor() {
                        _name.set(this, void 0);
                        __classPrivateFieldSet(this, _name, 'zhangsan');
                    }
                }
                _name = new WeakMap();
                */

    - 函数重载
       1.ts 的函数重载，先把各个情况的函数头写出来，然后再写一个统一的、兼容上述所有情况的函数头。最后，函数体自行处理参数。
       2. class Person {
              // 第一，各个情况的函数头写出来
              test(): void
              test(a: number, b: number): number
              test(a: string, b: string): string
              // 第二，统一的、兼容上述所有情况的函数头（有一个不兼容，就报错）
              test(a?: string | number, b?: string | number): void | string | number {
                  // 第三，函数体自行处理参数
                  
                  if (typeof a === 'string' && typeof b === 'string') {
                      return 'string params'
                  }
                  if (typeof a === 'number' && typeof b === 'number') {
                      return 'number params'
                  }
                  console.log('no params')
              }
          }

    - 注意函数定义的顺序
      1.  参数越精准，放在前面
          /* 错误：any 类型不精准，应该放在最后 */
          declare function fn(x: any): any;
          declare function fn(x: HTMLElement): number;
          declare function fn(x: HTMLDivElement): string;

          var myElem: HTMLDivElement;
          var x = fn(myElem); // x: any, wat?
      
      2. 不要为仅在末尾参数不同时写不同的重载，应该尽可能使用可选参数。
        /* 错误 */
        interface Example1 {
            diff(one: string): number;
            diff(one: string, two: string): number;
            diff(one: string, two: string, three: boolean): number;
        }

        /* OK */
        interface Example2 {
            diff(one: string, two?: string, three?: boolean): number;
        }
    
    - DOM 相关的类型
      js 写 DOM 操作非常简单，不用关心类型，直接访问属性和方法即可。但用 ts 之后，就得关心 DOM 操作的相关类型。
      不光我们使用 ts ，微软在设计 ts 时，也需要定义 DOM 操作相关的类型，放在 ts 的类库中，这样 ts 才能被 web 场景所使用。这些都定义在 lib.dom.d.ts 中。补：还有 ES 语法的内置类库，也在同目录下。
      一门成熟可用的编程语言，最基本的要包括：语法 + 类库 + 编译器 + 运行时（或者编译器和运行时统一为解释器）。然后再说框架，工具，包管理器等这些外围配置。
      1. Node Element：[NodeElement.png]。 Node 是一个接口，各种类型的 DOM API 对象会从这个接口继承。
      2. 事件参数类型： [Event.png]。 其实就是不同的事件，参数类型也是不一样的，什么方法属性也不一样。

2. 每日算法：翻转字符串里的单词 [reverseWords.js]
   案例： 
        输入: "the sky is blue"
        输出: "blue is sky the"

        输入: "  hello world!  "
        输出: "world! hello"
        解释: 输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。

        输入: "a good   example"
        输出: "example good a"
        解释: 如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。

   分析：
        无空格字符构成一个单词。
        输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。
        如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。

   解法：
        1- 正则 + JS API
        2- 双端队列 JS原生实现

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

## 2021 0912 （周日）

## 2021 0913

1. 值得记录的面试总结：https://juejin.cn/post/6991724298197008421#comment [建议用来知识梳理]

2. 每日算法：第一个只出现一次的字符
   题目： 
        在字符串 s 中找出第一个只出现一次的字符。如果没有，返回一个单空格。s 只包含小写字母。
   解答：
        使用 map 两次遍历即可。
        遍历字符串，将每个字符的值与出现次数记录到 map 中。
        再次遍历 map.keys() ，获取 map 中每个字符出现的次数，判断是否仅仅只有 1 次，返回第一个仅出现一次的字符

## 2021 0914

1. 60个非常常用的css代码片段 [https://mp.weixin.qq.com/s/wtLd1HFNceetJFqlUfXj6A]
   
2. 每日算法：二叉树的层序遍历  [levelOrder.js]
   题目：
        给你一个二叉树，请你返回其按 层序遍历 得到的节点值。（即逐层地，从左到右访问所有节点）。
   案例：
        二叉树：[3,9,20,null,null,15,7] ,
                          3
                        / \
                        9  20
                          /  \
                        15   7
        返回其层次遍历结果：
                        [
                          [3],
                          [9,20],
                          [15,7]
                        ]
   解答：
     1. 广度优先遍历
     2. 深度优先遍历

## 2021 0915

## 2021 0916

## 2021 0917

1. 浏览器原生css 替代 js的一些优秀片段
   问题：
      如今依赖 JavaScript 提供交互的网站越来越多。虽然 JavaScript 可以提供愉快的体验，但同时也带来了一些负面影响：
       1. 页面加载时间变长;
       2. 只有在 JavaScript 加载完成且正确无误后，页面才能使用；
       3. 团队需要足够的手段和资源来关注可用性、反应性和可访问性。
       鉴于这些缺点，我们可以依靠浏览器提供的原生解决方案，这种方式不仅可以降低成本，而且还可以享受社区创建的 Web 标准专业知识带来的优势。通常，这些解决方案的代码量较少，因此还可以减少开发团队的维护工作（比如无需更新使用的库）。

   重点关注：**js加载会阻塞浏览器的渲染**
      浏览器只有一个线程来控制页面的渲染。在运行 JavaScript 时，浏览器会延迟用户交互事件与界面更新。这就很讨厌了，因为你会觉得页面没有响应你的操作，或者感觉动画很卡。

   css原生在以下场景的处理方式：
      1. 限制显示的行数
         js只能通过计算字体所占位置来控制，但是会因为字体的修改，浏览器兼容字体不同导致计算不准确。
         原生有一个 -webkit-line-clamp CSS属性。除了 IE 和 Firefox 68 之前的版本外，所有浏览器都支持该属性。
      2. 重要的元素始终显示在页面上
         js只能通过监听页面滚动高度修改页面定位是relative还是absolute来实现。
         原生有一个position：sticky;属性可以实现。而且没有性能、响应性或内容跳跃的问题：只要浏览器可以滚动，它就会将元素准确地定位到你声明的位置上。你可以利用 top 、 bottom 、 left 或 right 选择定位。[会根据你给的top等偏移量固定在某个位置。]除了IE和旧版的 Chrome 或 Firefox 之外，所有浏览器都支持sticky。旧版的 Safari 需要 -webkit-sticky 前缀。
      3. 平滑滚动
         js只能通过定期执行修改滚动位置的操作，还要保证这个时候没有别的js加载阻塞渲染。
         原生CSS有一个属性scroll-behavior: smooth 和 {behavior: 'smooth'}，可以代替JavaScript的 scroll 、 scrollTo 和 scrollIntoView ，将所有有关计时的决定都交给CSS。这样可能更符合常用设备的常规做法。
      4. 滚动到吸附点 （通过这种方式，可以创建幻灯片、水平列表，吸附到每张图片或每一节，让它们占据整个窗口。）
         场景是下面是各种商品图选择上面是一个图片的展示和向滚动，手指点击下面某个商品图选项，上面的区域就开始滚动到当前这张图片。 
         js做的话需要监听鼠标点击事件和移动事件。
         CSS的滚动吸附功能可以处理该行为。在滚动的容器中，定义 scroll-snap-type 来指示吸附的方向，以及吸附必定发生还是仅在接近吸附点时发生。然后在容器的子元素中定义 scroll-snap-align 来标明吸附点。
      5. 延迟图像加载
         js需要使用 <img/> 标签，通过修改属性值加载显示图片。这种方法的主要缺点就是，在相应的JavaScript执行之前图像不会被显示。而且这种情况发生的频率远超你的想象。搜索引擎也很难看到图像，因为本质上图像并不存在，而且爬虫也不会滚动屏幕。选择何时触发加载非常重要。怎样根据当前的带宽来决定当图像距离视口多远时进行加载？是否应当考虑滚动的速度？
         原生css的懒加载直接用属性loading设置为lazy就可以实现。几乎不需要任何代价，就可以让网站还在变快。


2. 每日算法：无重复字符的最长子串
   题目： 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度 和 字符。
   
   案例： 
      输入: "abcabcbb"
      输出: 3 
      解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

      输入: "bbbbb"
      输出: 1
      解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。

   解法： 
      1. 维护数组
      2. 维护下标
      3. 优化Map
