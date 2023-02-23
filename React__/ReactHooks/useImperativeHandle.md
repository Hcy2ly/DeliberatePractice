# useImperativeHandle

1. 和 forwardRef 一起使用。

2. React.forwardRef

   React.forwardRef 会创建一个组件（假设叫小桥），可以将接收到的 ref 传递至小桥下的另一个组件中。

   通常用于：

   - 转发 refs 到 DOM 组件
   - 在高阶组件中转发 refs

   React.forwardRef 接受渲染函数作为参数。React 将使用 props 和 ref 作为参数来调用此函数。此函数应返回 React 节点。

   ```
    const FancyButton = React.forwardRef((props, ref) => (
      <button ref={ref} className="FancyButton">
        {props.children}
      </button>
    ));

    // You can now get a ref directly to the DOM button:
    const demoRef = React.createRef();
    <FancyButton ref={demoRef}>Click me!</FancyButton>;
    // 这里的 demoRef 会作为第二个参数被传入 React.forwardRef 函数中的渲染函数。该渲染函数会将 demoRef 传递给 <button ref={ref} className="FancyButton">{props.children}</button>
    // ref.current 会指向当前的 DOM 实例
   ```

3. 高阶组件 （HOC）
   用于复用组件逻辑的一种高级技巧。简单说，就是一个以组件为参数，又返回一个新组件的函数。例如：Redux的connect、
