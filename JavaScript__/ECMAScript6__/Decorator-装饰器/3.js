// 装饰类

/**********
 * 1. 装饰整个类
 */

// 定义装饰器 target为当前装饰的类本身
function testable(target) {
  target.isTestable = true; // 给target加上 isTestable 静态属性并且设置为true，target为 MyTestableClass。
}

@testable
class MyTestableClass {
  // ...
}

MyTestableClass.isTestable // true

// 上面代码中，@testable就是一个装饰器。它修改了MyTestableClass这个类的行为，为它加上了静态属性isTestable。testable函数的参数target是MyTestableClass类本身。

// 基本用法
// @decorator
// class A { }

// 等同于
// class A { }
// A = decorator(A) || A

/**********
 * 2. 装饰器传参数。如果觉得一个参数不够用，可以在装饰器外面再封装一层函数。
 * @param isTestable
 */
// 定义装饰器 外包裹一个带参数的函数
function testable2(isTestableVal) {
  return function (target) {
    target.isTestable = isTestableVal; // target为装饰的类 MyTestableClass，给类加上 isTestable 静态属性并且设置为传入的参数 isTestableVal。
  }
}

@testable2(true) // 装饰器传参数，isTestableVal为 true
class MyTestableClass { }
MyTestableClass.isTestable // true

@testable2(false) // 装饰器传参数，isTestableVal为 false
class MyClass { }
MyClass.isTestable // false

// 装饰器testable2可以接受参数，这就等于可以修改装饰器的行为。
// 注意，装饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。这意味着，装饰器能在编译阶段运行代码。也就是说，装饰器本质就是编译时执行的函数。

/**********
 * 3. 通过装饰器给类添加实例
 */
// 声明一个构造器
function testable3(target) {
  target.prototype.isTestable = true; // 装饰器拿到类本身，通过类的prototype属性给类的原型对象添加属性。
}

@testable3
class MyTestableClass { }

let obj = new MyTestableClass(); // 类的实例共享一个原型对象
obj.isTestable // true

// 上面代码中，装饰器函数testable3是在目标类的prototype对象上添加属性，因此就可以在所有实例上调用。

/*********
 * 4. 通过装饰器把一个对象的方法添加到装饰器装饰的类的实例上
 * 描述：通过装饰器mixins，把Foo对象的方法添加到了MyClass的实例上面。可以用Object.assign()模拟这个功能。
 */
// decorator.js  构造器集合
export function mixins(...list) {
  // ...list 遍历list对象的属性值传入
  return function (target) {
    Object.assign(target.prototype, ...list) // 利用 assign 的浅拷贝把list对象的属性添加到圆形对象上target.prototype
  }
}

// index.js
import { mixins } from './mixins'

const Foo = {
  foo() { console.log('foo') }
};

@mixins(Foo)
class MyClass { }

let obj = new MyClass(); // 所有实例均共享一个原型对象
obj.foo() // 'foo'


// 不使用装饰器的写法
const Foo = {
  foo() { console.log('foo') }
};

class MyClass { }

Object.assign(MyClass.prototype, Foo);

let obj = new MyClass();
obj.foo() // 'foo'

/*********
 * 5. 构造器实现 实际开发中，React 与 Redux 库结合使用
 */
// 不使用构造器的写法 - 函数嵌套函数 - HOC 高阶函数
class MyReactComponent extends React.Component {
  // ...
}
export default connect(mapStateToProps, mapDispatchToProps)(MyReactComponent)

// 使用构造器之后
@connect(mapStateToProps, mapDispatchToProps)
export default class MyReactComponent extends React.Component {
  // ...
}