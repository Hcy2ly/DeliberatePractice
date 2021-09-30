# 装饰器知识点

1. 装饰器（Decorator）是一种与类（class）相关的语法，用来注释或修改类和类方法。

2. 装饰器是一种函数，写成 @ + 函数名。它可以放在类和类方法的定义前面。

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
  1. 装饰器可以用来装饰整个类。
  2. 装饰器传参。如果觉得一个参数不够用，可以在装饰器外面再封装一层函数。
  3. 前面的例子是为类添加一个静态属性，如果想添加实例属性，可以通过目标类的prototype对象操作。
  4. 过装饰器把一个对象的方法添加到装饰器装饰的类的实例上
  5. 实际开发中，React 与 Redux 库结合使用时，常常需要写成下面这样。

      class MyReactComponent extends React.Component {
        // ...
      }
      export default connect(mapStateToProps, mapDispatchToProps)(MyReactComponent);

  有了装饰器，就可以改写上面的代码。

      @connect(mapStateToProps, mapDispatchToProps)
      export default class MyReactComponent extends React.Component {}

4. 装饰方法

