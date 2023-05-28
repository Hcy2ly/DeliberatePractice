# useEffect

componentDidMount 组件挂载 + componentDidUpdate 组件更新  + componentWillUnmount 组件将要摧毁
useEffect 的依赖项对应组件更新的 componentDidUpdate 如果有值就会刷新组件
useEffect(() => {
    // 没有依赖会默认一直刷新
})
useEffect(() => {
// 依赖为空数组只会刷新一次
},[])
useEffect(() => {
// x,y,z 任何一个刷新都会引起组件刷新
}, [x,y,z])
useEffect(() => {
console.log('组件挂载执行')
return () => {
console.log('组件销毁执行')
}
}, dependencies) // dependencies = any[]
