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
         2. #
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


## 2021 0912 （周日）

## 2021 0913
