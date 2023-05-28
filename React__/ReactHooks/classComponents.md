# 类组件

纯组件
纯组件：React.PureComponent 与 React.Component功能相似
区别：PureComponent 内部自动实现了 shouldComponentUpdate 钩子，不需要手动比较
原理：纯组件内部通过分别 对比 前后两次 props 和 state 的值，来决定是否重新渲染组件

只有在性能优化的时候可能会用到纯组件，不要所有的组件都使用纯组件，因为纯组件需要消耗性能进行对比

纯组件比较-值类型
说明：纯组件内部的对比是 shallow compare（浅层对比）
对于值类型来说：比较两个值是否相同（直接赋值即可，没有坑）

纯组件比较-引用类型
说明：纯组件内部的对比是 shallow compare（浅层对比）
对于引用类型来说：只比较对象的引用（地址）是否相同

纯组件的最佳实践：
注意：state 或 props 中属性值为引用类型时，应该创建新数据，不要直接修改原数据！

```
  // 正确！创建新数据
  const newObj = {...state.obj, number: 2}
  setState({ obj: newObj })
  // 正确！创建新数据
  // 不要用数组的push / unshift 等直接修改当前数组的的方法
  // 而应该用 concat 或 slice 等这些返回新数组的方法
  this.setState({
  list: [...this.state.list, {新数据}]
  })
```
