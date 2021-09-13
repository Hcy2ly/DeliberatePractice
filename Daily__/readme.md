# daily up up

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

2. 实现一个 将字符串转换成整数 的函数。[./parseInt+函数实现.js]
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

## 2021 0909

1. 【网页特效】丝滑的 macOS Dock效果
    核心： 当游标在同一个图标上左右移动时，都会影响到左边和右边的图标大小的，达到一个很连贯的效果
    案例： [丝滑的macOSDock效果.html]

2. 每日算法：滑动窗口最大值问题

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

2. 每日算法：翻转字符串里的单词
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