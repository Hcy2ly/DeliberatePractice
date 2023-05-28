# 寒冬大佬提问 <https://www.cnblogs.com/winter-cn/archive/2013/05/11/3072926.html>

好面试有三点衡量指标: 区分度 深度 覆盖范围

问题：css 的 position 属性有哪些取值，它们的行为是什么？

答案可以分成不同的层级:

  1. position 属性常用的取值 static、relative 以及 absolute 和它们的基本行为是每个前端都应该掌握的，包括 relative 和 absolute 的定位原点。 [position]
  2. fixed 旧版本 IE 不支持，但是一个对技术有热情的工程师也是应该了解的。 [浏览器兼容]
  3. 有过研究工程师可以知道 absolute 的 containing block 计算方式跟正常流不同，当然如果没读过标准的话，表述方式不一定是这样。 [position-如何计算当前元素的最终位置]
  4. 对 CSS 布局有深入研究的工程师会知道 position 跟 display、margin collapse、overflow、float 这些特性相互叠加后的行为。

区分度可以让题目可以适用于入门级到专家级的各种面试者
深度可以保证有深度研究的面试者可以展示他们的才能
覆盖范围可以有效地了解面试者擅长的方向

通过 position 想要引申的问题：关于 normal flow、containing block、bfc、margin collapse，base line，writing mode，bidi 等等

这些知识点从前到后越来越细致，也越来越偏，从最开始的 box 排布，到后面的行模型，再到文本排版，基本上是网页排版从整体到细节的顺序。

面试题有很多的类型：项目细节、知识型问题，开放性问题，案例问题以及传说中的 Funny Question。

我认为，web 前端工程师的竞争力 = web 前端知识 + 能力（= 编程能力 + 工程能力 + 架构能力）// 没有指出学习能力，因为有学习力的人不会连基础的前端知识都不知道。编程能力就是算法题之类的。

## 解答 - 边学习边总结

### position

<!-- 基础技能点理解均参考 MDN  -->

**CSS position 属性用于指定一个元素在文档中的定位方式。top，right，bottom 和 left 属性则决定了该元素的最终位置。**

什么是定位元素？
定位元素就是计算后 position 属性值为 relative、absolute、fixed 或者 sticky 的一个元素（除 static）
相对定位元素就是计算后位置属性 position 为 relative 的元素
绝对定位元素就是计算后位置属性 position 为 absolute or fixed 的元素
粘性定位元素就是计算后位置属性 position 为 sticky 的元素

*大多情况下，height和width 被设定为auto的绝对定位元素，按其内容大小调整尺寸，可以用top、left、bottom、right等字段控制水平垂直上的位置。*

- position 的定位类型有哪几种：
  1. static
     1. 默认值，指定元素使用正常的布局行为，即元素在文档常规流中当前的布局位置。
     2. 此时 top、right、left、z-index 属性无效
  2. relative
     1. 官方描述：该关键字下，元素先放置在未添加定位时的位置，再在不改变页面布局的前提下调整元素位置（因此会在此元素未添加定位时所在位置留下空白） =>  [自我理解：当没有添加top、left等关键词控制位置的时候，relative=static，和static的位置一致，添加之后，在top、left计算后的位置上]
     2. position:relative 对 table-*-group, table-row, table-column, table-cell, table-caption 元素无效。
  3. absolute
     1. 元素会被移出正常文档流，并不为元素预留空间，通过指定元素相对于最近的非 static 定位祖先元素的偏移，来确定元素位置。
     2. 绝对定位的元素可以设置外边距（margins），且不会与其他边距合并。
  4. fixed
     1. 元素会被移出正常文档流，并不为元素预留空间，而是通过指定元素相对于屏幕视口（viewport）的位置来指定元素位置。
     2. 元素的位置在屏幕滚动时不会改变。[经常用来做tab头部的菜单啥的]
     3. 打印时，元素会出现在的每页的固定位置
     4. fixed 属性会创建新的层叠上下文
     5. 当元素祖先的 transform, perspective 或 filter 属性非 none 时，容器由视口改为该祖先。
        1. transform: 允许你旋转，缩放，倾斜或平移给定元素。这是通过修改CSS视觉格式化模型的坐标空间来实现的。
        2. perspective: 指定了观察者与 z=0 平面的距离，使具有三维位置变换的元素产生透视效果。
        3. filter: 将模糊或颜色偏移等图形效果应用于元素。 [blur(5px);contrast(200%);试试这两个属性值切换，搁着给你测视力呢]
  5. sticky
     1. 元素根据正常文档流进行定位，然后相对它的最近滚动祖先（nearest scrolling ancestor）和 containing block (最近块级祖先 nearest block-level ancestor)，包括table-related元素，基于top, right, bottom, 和 left的值进行偏移。
     2. 偏移值不会影响任何其他元素的位置。
     3. 该值总是创建一个新的层叠上下文（stacking context）
     4. 一个sticky元素会“固定”在离它最近的一个拥有“滚动机制”的祖先上（当该祖先的overflow 是 hidden, scroll, auto, 或 overlay时），即便这个祖先不是最近的真实可滚动祖先。
     5. 这有效地抑制了任何“sticky”行为

- 浏览器兼容性：
  
  1. position
     1. pc端 Firefox：在 Firefox 57 之前，绝对定位在应用于 已border-collapse应用于它们的表格内的元素 时无法正常工作（错误 1379306）。
     2. 移动端 Firefox for Android： 在 Firefox 30 之前，不支持表行和行组的绝对定位（错误 63895）。
     3. *补充说明*: absolute和margin，padding都不冲突，可同时生效。 absolute会改变display值，所以会产生包裹性。 absolute的元素脱离正常流。所以会产生破坏性。 absolute存在时【不加top,right,bottom,left】，float不起作用，所以可以用来去浮动。
     4. *补充说明*: position和float的关系: 为什么绝对定位元素可能会覆盖浮动元素，因为浏览器渲染的时候相同堆叠上下文中，先渲染非定位元素，再渲染浮动元素，最后渲染已定位元素。**关键问题是，此时设置float元素的z-index来覆盖absolute无效。因为z-index值只适用于已经定位的元素（即position:relative/absolute/fixed），对浮动元素不起作用的。可将float元素的position属性值设置为relative，然后设置z-index。因为已定位元素并且z-index不是默认的auto的话会生成一个新的堆叠上下文。**
  2. fixed
     1. pc端firefox：在 Firefox 44 之前position: fixed，大多数情况下没有创建堆栈上下文。Firefox 和规范已被修改以模仿 Chrome 和 Safari 的长期行为。
     2. IE浏览器：在 Internet Explorer 中，如果文档处于 quirks mode（怪异模式），则固定定位不起作用。
        1. 浏览器模式补充：**目前浏览器的排版引擎使用三种模式：怪异模式（Quirks mode）、接近标准模式（Almost standards mode）、以及标准模式（Standards mode）。** *在怪异模式下*，排版会模拟 Navigator 4 与 Internet Explorer 5 的非标准行为。为了支持在网络标准被广泛采用前，就已经建好的网站，这么做是必要的。*在标准模式下*，行为即（但愿如此）由 HTML 与 CSS 的规范描述的行为。*在接近标准模式下*，只有少数的怪异行为被实现。
        2. 浏览器如何决定使用哪个模式？
           1. 对 HTML 文件来说，浏览器使用文件开头的 DOCTYPE 来决定用怪异模式处理或标准模式处理。*请确定你把 DOCTYPE 正确地置于 HTML 文件的顶端。*如果有任何其他字符位于 DOCTYPE 之前，比如注释或 XML 声明，会导致 Internet Explorer 9 或更早期的浏览器触发怪异模式。
           2. XHTML，如果你的网页使用 XHTML 并在 Content-Type HTTP 标头使用application/xhtml+xml MIME 类型，你不需要使用 DOCTYPE 启动标准模式，因为这种文件会永远使用标准模式。不过请注意，页面使用 application/xhtml+xml 会令 Internet Explorer 8 出于未知格式之故出现下载对话框，因为首个支持 XHTML 的 Internet Explorer 版本是 Internet Explorer 9。*如果你的类 XHTML 网页使用 text/html MIME 类型，浏览器会将其视为 HTML，这时就需要使用 DOCTYPE 启用标准模式。*
        3. 查看当前浏览器模式：在 Firefox 中，请从右键菜单选择 查看页面信息，然后查看 渲染模式。在 Internet Explorer 中，请按下 F12，然后查看 文档模式。
  3. 绝对定位的flex子项： 全部支持
  4. Table elements as sticky positioning containers： Internet Explorer不支持
  5. sticky： Internet Explorer不支持，safari 6.1-13
  6. 需要加-webkit，13以后均支持

### containing block 计算方式总结

- Containing Block

  包含块（Containing Block）是视觉格式化模型的一个重要概念，它与框模型类似，也可以理解为一个矩形，而这个矩形的作用是为它里面包含的元素提供一个参考，元素的尺寸和位置的计算往往是由该元素所在的包含块决定的。
  *简单地说就是定位参考或者坐标参考系。元素一旦定义了定位显示，无论是相对，绝对或者固定，都具有包含块的性质，它所包含的定位元素都将以包含块为坐标系进行定位和调整。*

- 包含块的计算方式

  1. static(默认的)/relative：简单说就是它的父元素的内容框content-box(即去掉 padding 的部分)。[可以理解为relative是从static到absolute的一个过渡属性状态。就像在inline和block中间过渡有一个inline-block。][relative元素仍然处于正常流，且不改变display属性，可能会覆盖页面其他元素。]
  2. absolute: 向上找最近的定位为 absolute/relative 的非static元素。没有就是 initial containing block(初始包含块)。
     1. 如果祖先元素是块级元素，则包含块是祖先元素的padding框。
     2. 如果祖先元素是内联元素，包含块取决于祖先元素的direction属性。则 containing block 为能够包含这个元素生成的第一个和最后一个 inline box 的 padding box (除 margin, border 外的区域) 的最小矩形；
  3. fixed: 它的 containing block 一律为根元素(html/body), 根元素也是 initial containing block。
