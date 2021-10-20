/**
// 原始代码
function greeter(person) {
  return "Hello, " + person;
}
let user = "Jane User";
document.body.innerHTML = greeter(user);
*/
// /** 
//  当我们希望greeter函数的传参是一个string。但是我们又把真正的调用改成传入一个数组。 ----> 编译报错
function greeter(person) {
    return "Hello, " + person;
}
var user = ["Jane User"];
document.body.innerHTML = greeter(user);
// */
