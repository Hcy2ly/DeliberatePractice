# 装饰器知识点

1. 装饰器（Decorator）是一种与类（class）相关的语法，用来注释或修改类和类方法。

2. 装饰器是一种函数，写成@ + 函数名。它可以放在类和类方法的定义前面。

    @frozen // 可以装饰类
    class Foo {
      @configurable(false) // 也可用来装饰函数
      @enumerable(true)
      method() {}

      @throttle(500)
      expensiveMethod() {}
    }
    上面代码一共使用了四个装饰器，一个用在类本身，另外三个用在类方法。

3. 装饰类
  装饰器可以用来装饰整个类。

      @testable
      class MyTestableClass {
        // ...
      }

      // 定义装饰器 target为当前装饰的类本身
      function testable(target) {
        target.isTestable = true;
      }

      MyTestableClass.isTestable // true

  上面代码中，@testable就是一个装饰器。它修改了MyTestableClass这个类的行为，为它加上了静态属性isTestable。testable函数的参数target是MyTestableClass类本身。

  基本用法：
      @decorator
      class A {}

      等同于
      class A {}
      A = decorator(A) || A

  装饰器传参数：
      // 如果觉得一个参数不够用，可以在装饰器外面再封装一层函数。
      function testable(isTestable) {
        return function(target) {
          target.isTestable = isTestable;
        }
      }

      @testable(true) // 装饰器传参数
      class MyTestableClass {}
      MyTestableClass.isTestable // true

      @testable(false)
      class MyClass {}
      MyClass.isTestable // false

  装饰器testable可以接受参数，这就等于可以修改装饰器的行为。

  【注意，装饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。这意味着，装饰器能在编译阶段运行代码。也就是说，装饰器本质就是编译时执行的函数。】

  前面的例子是为类添加一个静态属性，如果想添加实例属性，可以通过目标类的prototype对象操作。

      function testable(target) {
        target.prototype.isTestable = true;
      }

      @testable
      class MyTestableClass {}

      let obj = new MyTestableClass();
      obj.isTestable // true
  上面代码中，装饰器函数testable是在目标类的prototype对象上添加属性，因此就可以在实例上调用。

  下面是另外一个例子。

      // mixins.js
      export function mixins(...list) {
        return function (target) {
          Object.assign(target.prototype, ...list)
        }
      }

      // main.js
      import { mixins } from './mixins'

      const Foo = {
        foo() { console.log('foo') }
      };

      @mixins(Foo)
      class MyClass {}

      let obj = new MyClass();
      obj.foo() // 'foo'

  上面代码通过装饰器mixins，把Foo对象的方法添加到了MyClass的实例上面。可以用Object.assign()模拟这个功能。

      const Foo = {
        foo() { console.log('foo') }
      };

      class MyClass {}

      Object.assign(MyClass.prototype, Foo);

      let obj = new MyClass();
      obj.foo() // 'foo'

  实际开发中，React 与 Redux 库结合使用时，常常需要写成下面这样。

      class MyReactComponent extends React.Component {
        // ...
      }
      export default connect(mapStateToProps, mapDispatchToProps)(MyReactComponent);

  有了装饰器，就可以改写上面的代码。

      @connect(mapStateToProps, mapDispatchToProps)
      export default class MyReactComponent extends React.Component {}

4. 装饰方法

