# 安装 Typescript

npm install -g typescript

## 编译代码 .ts => .js

tsc greeter.ts

## 类型注解

TypeScript 里的类型注解是一种轻量级的为函数或变量添加约束的方式。
eg: function(a: string) {} // 规定传参必须为字符串类型。

## 接口 interface

声明对象
在 ts 里，interface A {name: string, age: string}，有两个字段，当 function(person: Person) {}; person 可以 {} {name: 'ly'} {age: '22'} {name: 'ly',age: '22' } 中的任意一个
so，只在两个类型内部的结构兼容那么这两个类型就是兼容的。

## 类 class

ts 支持 js 的新特性，比如支持基于类的面向对象编程。
需要注意：在构造函数的参数上使用 public 等同于创建了同名的成员变量 [[详情可见===class.ts=>class.js]

## 运行 Typescript web 应用

index.html
