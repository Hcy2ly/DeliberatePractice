/**
// 原始代码
function greeter(person) {
  return "Hello, " + person;
}
let user = "Jane User";
document.body.innerHTML = greeter(user);
*/

/** 
// 当我们希望greeter函数的传参是一个string。但是我们又把真正的调用改成传入一个数组。 ----> 编译报错
function greeter(person: string) {
  return "Hello, " + person;
}
let user = ["Jane User"]; 
document.body.innerHTML = greeter(user); // Argument of type 'string[]' is not assignable to parameter of type 'string'.
*/

/** 
 * so，TypeScript提供了静态的代码分析，它可以分析代码结构和提供的类型注解。
 * 但是要注意的是，尽管有错误，greeter.js文件还是被创建了，也就是ts只检查，不阻止运行。
*/

// 基础类型 可以用 number、string 等定义。
// 对象类型 用 interface 接口定义。在TypeScript里，允许我们在实现接口时候只要保证包含了接口要求的结构就可以，不必和声明的一模一样。