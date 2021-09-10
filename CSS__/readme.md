# css面试题总结


## 1 介绍一下标准的css的盒子模型？与低版本的IE的盒子模型有什么不同

标准盒子模型：宽度=内容的宽度（content）+ border + padding + margin
低版本IE盒子模型：宽度=内容宽度（content+border+padding）+ margin

## 2 box-sizing属性？

用来控制元素的盒子模型的解析模式，默认为content-box
context-box：W3C的标准盒子模型，设置元素的 height/width 属性指的是content部分的高/宽
border-box：IE传统盒子模型。设置元素的height/width属性指的是border + padding + content部分的高/宽

## 3 CSS选择器有哪些？哪些属性可以继承？

CSS选择符：
  id选择器(#_id)、类选择器(._class)、
  标签选择器(div, h1, p)、相邻选择器(h1 + p)、子选择器（ul > li）、后代选择器（li a）、
  通配符选择器（*）、属性选择器（a[rel="external"]）、伪类选择器（a:hover, li:nth-child）

可继承的属性：font-size, font-family, color
不可继承的样式：border, padding, margin, width, height

优先级（就近原则）：!important > [ id > class > tag ]
*!important 比内联优先级高*

## 4 CSS优先级算法如何计算？

元素选择符： 1
class选择符： 10
id选择符：100
元素标签（内联）：1000

*优先级按照权重值排序，权重越大，优先级越高。*
规则：
  !important声明的样式优先级最高，如果冲突再进行计算。
  如果优先级相同，则选择最后出现的样式。
  继承得到的样式的优先级最低。

## 5 CSS3新增伪类有那些?

p:first-of-type 选择属于其父元素的首个元素
p:last-of-type 选择属于其父元素的最后元素
p:only-of-type 选择属于其父元素唯一的元素
p:only-child 选择属于其父元素的唯一子元素
p:nth-child(2) 选择属于其父元素的第二个子元素
:enabled :disabled 表单控件的禁用状态。
:checked 单选框或复选框被选中。

## 6 如何居中div？如何居中一个浮动元素？如何让绝对定位的div居中？

水平居中: align-text: center; | margin: 0 auto;
上下左右居中：绝对定位 + 负margin | 绝对定位 + (left: 0; top: 0; margin: 0 auto;) | 绝对定位 + transform | 父级元素flex

## 7 display有哪些值？说明他们的作用?

display 属性可以设置元素的内部和外部显示类型 display types。

inline（默认）--内联
none--隐藏
block--块显示
table--表格显示
list-item--项目列表
inline-block
flex--弹性盒模型
inline-flex
grid--网格布局

## 8 position的值？

static（默认）：按照正常文档流进行排列；
relative（相对定位）：不脱离文档流，参考自身静态位置通过 top, bottom, left, right 定位；
absolute(绝对定位)：参考距其最近一个不为static的父级元素通过top, bottom, left, right 定位；
fixed(固定定位)：所固定的参照对像是可视窗口。

## 9 CSS3有哪些新特性？

RGBA和透明度
background-image background-origin(content-box/padding-box/border-box) background-size background-repeat
word-wrap（对长的不可分割单词换行）word-wrap：break-word
文字阴影：text-shadow： 5px 5px 5px #FF0000;（水平阴影，垂直阴影，模糊距离，阴影颜色）
font-face属性：定义自己的字体
圆角（边框半径）：border-radius 属性用于创建圆角
边框图片：border-image: url(border.png) 30 30 round
盒阴影：box-shadow: 10px 10px 5px #888888
媒体查询：定义两套css，当浏览器的尺寸变化时会采用不同的属性 

## 10 请解释一下CSS3的flexbox（弹性盒布局模型）,以及适用场景？

该布局模型的目的是提供一种更加高效的方式来对容器中的条目进行布局、对齐和分配空间。在传统的布局方式中，block 布局是把块在垂直方向从上到下依次排列的；而 inline 布局则是在水平方向来排列。弹性盒布局并没有这样内在的方向限制，可以由开发人员自由操作。
试用场景：弹性布局适合于移动前端开发，在Android和ios上也完美支持。

## 11 用纯CSS创建一个三角形的原理是什么？

首先，需要把元素的宽度、高度设为0。然后设置边框样式。

width: 0;
height: 0;
border-top: 40px solid transparent;
border-left: 40px solid transparent;
border-right: 40px solid transparent;
border-bottom: 40px solid #ff0000;

## 12 一个满屏品字布局如何设计?

1. 第一种真正的品字：
    三块高宽是确定的；
    上面那块用margin: 0 auto;居中；
    下面两块用float或者inline-block不换行；
    用margin调整位置使他们居中。
    第二种全屏的品字布局:
    上面的div设置成100%，下面的div分别宽50%，然后使用float或者inline使其不换行。

2. 第二种全屏的品字布局:
    上面的div设置成100%，下面的div分别宽50%，然后使用float或者inline使其不换行。

## 13 常见的兼容性问题？

1. 不同浏览器的标签默认的margin和padding不一样：
   [解决方法]: *{margin:0;padding:0;}

2. IE6双边距bug。块属性标签float后，又有横行的margin情况下，在IE6显示margin比设置的大。
   [解决方法]: display:inline;将其转化为行内属性。
   渐进识别的方式，从总体中逐渐排除局部。首先，巧妙的使用“9”这一标记，将IE浏览器从所有情况中分离出来。接着，再次使用“+”将IE8和IE7、IE6分离开来，这样IE8已经独立识别。
    {
    background-color:#f1ee18;/*所有识别*/
    .background-color:#00deff\9; /*IE6、7、8识别*/
    +background-color:#a200ff;/*IE6、7识别*/
    _background-color:#1e0bd1;/*IE6识别*/
    }

3. 设置较小高度标签（一般小于10px），在IE6，IE7中高度超出自己设置高度。
   [解决方法]: 给超出高度的标签设置overflow:hidden;或者设置行高line-height 小于你设置的高度。

4. IE下，可以使用获取常规属性的方法来获取自定义属性,也可以使用getAttribute()获取自定义属性；Firefox下，只能使用getAttribute()获取自定义属性。[解决方法]: 统一通过getAttribute()获取自定义属性。

5. Chrome 中文界面下默认会将小于 12px 的文本强制按照 12px 显示.
   [解决办法]: 加入 CSS 属性 -webkit-text-size-adjust: none; 解决。

6. 超链接访问过后hover样式就不出现了，被点击访问过的超链接样式不再具有hover和active了。
   [解决方法]: 是改变CSS属性的排列顺序:L-V-H-A ( love hate ): a:link {} a:visited {} a:hover {} a:active {}

## 14 为什么要初始化CSS样式

因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对CSS初始化往往会出现浏览器之间的页面显示差异。

## 15 absolute的containing block计算方式跟正常流有什么不同？

1. 无论属于哪种，都要先找到其祖先元素中最近的 position 值不为 static 的元素，然后再判断：
    若此元素为 inline 元素，则 containing block 为能够包含这个元素生成的第一个和最后一个 inline box 的 padding box (除 margin, border 外的区域) 的最小矩形；
    否则,则由这个祖先元素的 padding box 构成。
    如果都找不到，则为 initial containing block。

2. 补充：
    static(默认的)/relative：简单说就是它的父元素的内容框（即去掉padding的部分）
    absolute: 向上找最近的定位为absolute/relative的元素
    fixed: 它的containing block一律为根元素(html/body)

## 16 CSS里的visibility属性有个collapse属性值？在不同浏览器下以后什么区别？

当一个元素的visibility属性被设置成collapse值后，对于一般的元素，它的表现跟hidden是一样的。
  》 chrome中，使用collapse值和使用hidden没有区别。
  》 firefox，opera和IE，使用collapse值和使用display：none没有什么区别。

## 17 display:none与visibility：hidden的区别？

display：none 不显示对应的元素，在文档布局中不再分配空间（回流+重绘）
visibility：hidden 隐藏对应元素，在文档布局中仍保留原来的空间（重绘）

## 18 position跟display、overflow、float这些特性相互叠加后会怎么样？

position属性规定元素的定位类型；float属性是一种布局方式，定义元素在哪个方向浮动；display属性规定元素应该生成的框的类型。
类似于优先级机制：position：absolute/fixed优先级最高，有他们在时，float不起作用，display值需要调整。float 或者absolute定位的元素，只能是块元素或表格。

## 19 对BFC规范(块级格式化上下文：block formatting context)的理解？

BFC规定了内部的Block Box如何布局。
1. 定位方案：
    内部的 Box 会在垂直方向上一个接一个放置。
    Box 垂直方向的距离由 margin 决定，属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠。
    每个元素的 margin box 的左边，与包含块border box的左边相接触。
    BFC的区域不会与float box重叠。
    BFC是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。
    计算BFC的高度时，浮动元素也会参与计算。

2. 满足下列条件之一就可触发BFC
    根元素，即html
    float的值不为none（默认）
    overflow的值不为visible（默认）
    display的值为inline-block、table-cell、table-caption
    position的值为absolute或fixed

## 20 为什么会出现浮动和什么时候需要清除浮动？清除浮动的方式？

1. 浮动元素碰到包含它的边框或者浮动元素的边框停留。由于浮动元素不在文档流中，所以文档流的块框表现得就像浮动框不存在一样。浮动元素会漂浮在文档流的块框上。

2. 浮动带来的问题：
    父元素的高度无法被撑开，影响与父元素同级的元素
    与浮动元素同级的非浮动元素（内联元素）会跟随其后
    若非第一个元素浮动，则该元素之前的元素也需要浮动，否则会影响页面显示的结构。

3. 清除浮动的方式：
    父级div定义height
    最后一个浮动元素后加空div标签 并添加样式clear:both。
    包含浮动元素的父标签添加样式overflow为hidden或auto。
    父级div定义zoom


## 21 上下margin重合的问题

解决办法： 在重合元素外包裹一层容器，并触发该容器生成一个BFC。
<div class="aside"></div>
<div class="text">
    <div class="main"></div>
</div>
<!--下面是css代码-->
  .aside {
      margin-bottom: 100px;  
      width: 100px;
      height: 150px;
      background: #f66;
  }
  .main {
      margin-top: 100px;
      height: 200px;
      background: #fcc;
  }
    .text{
      /*盒子main的外面包一个div，通过改变此div的属性使两个盒子分属于两个不同的BFC，以此来阻止margin重叠*/
      overflow: hidden;  //此时已经触发了BFC属性。
  }

## 22 设置元素浮动后，该元素的display值是多少？

自动变成display:block

## 23 移动端的布局用过媒体查询吗？

通过媒体查询可以为不同大小和尺寸的媒体定义不同的css，适应相应的设备的显示。

  <link rel="stylesheet" type="text/css" href="xxx.css" media="only screen and (max-device-width:480px)">
  CSS : @media only screen and (max-device-width:480px) {/css样式/}

## 24 使用 CSS 预处理器吗？
Less sass 

## 25 CSS优化、提高性能的方法有哪些？

避免过度约束
避免后代选择符
避免链式选择符
使用紧凑的语法
避免不必要的命名空间
避免不必要的重复
最好使用表示语义的名字。一个好的类名应该是描述他是什么而不是像什么
避免！important，可以选择其他选择器
尽可能的精简规则，你可以合并不同类里的重复规则

## 26 浏览器是怎样解析CSS选择器的？

CSS选择器的解析是*从右向左解析*的。若从左向右的匹配，发现不符合规则，需要进行回溯，会损失很多性能。若从右向左匹配，先找到所有的最右节点，对于每一个节点，向上寻找其父节点直到找到根元素或满足条件的匹配规则，则结束这个分支的遍历。两种匹配规则的性能差别很大，是因为从右向左的匹配在第一步就筛选掉了大量的不符合条件的最右节点（叶子节点），而从左向右的匹配规则的性能都浪费在了失败的查找上面。
而在 CSS 解析完毕后，需要将解析的结果与 DOM Tree 的内容一起进行分析建立一棵 Render Tree，最终用来进行绘图。在建立 Render Tree 时（WebKit 中的「Attachment」过程），浏览器就要为每个 DOM Tree 中的元素根据 CSS 的解析结果（Style Rules）来确定生成怎样的 Render Tree。

## 27 在网页中的应该使用奇数还是偶数的字体？为什么呢？

使用偶数字体。偶数字号相对更容易和 web 设计的其他部分构成比例关系。Windows 自带的点阵宋体（中易宋体）从 Vista 开始只提供 12、14、16 px 这三个大小的点阵，而 13、15、17 px时用的是小一号的点。（即每个字占的空间大了 1 px，但点阵没变），于是略显稀疏。

## 28 margin和padding分别适合什么场景使用？

何时使用margin：
    需要在border外侧添加空白
    空白处不需要背景色
    上下相连的两个盒子之间的空白，需要相互抵消时。

何时使用padding：
  需要在border内侧添加空白
  空白处需要背景颜色
  上下相连的两个盒子的空白，希望为两者之和。
  
兼容性的问题：在IE5 IE6中，为float的盒子指定margin时，左侧的margin可能会变成两倍的宽度。通过改变padding或者指定盒子的display：inline解决。

## 29 元素竖向的百分比设定是相对于容器的高度吗？

当按百分比设定一个元素的宽度时，它是相对于父容器的宽度计算的，但是，对于一些表示竖向距离的属性，例如 padding-top , padding-bottom , margin-top , margin-bottom 等，当按百分比设定它们时，依据的也是父容器的宽度，而不是高度。

## 30 全屏滚动的原理是什么？用到了CSS的哪些属性？

1. 原理：有点类似于轮播，整体的元素一直排列下去，假设有5个需要展示的全屏页面，那么高度是500%，只是展示100%，剩下的可以通过transform进行y轴定位，也可以通过margin-top实现
2. overflow：hidden；transition：all 1000ms ease；
3. overflow：auto。

## 31 什么是响应式设计？响应式设计的基本原理是什么？如何兼容低版本的IE？

响应式网站设计(Responsive Web design)是一个网站能够兼容多个终端，而不是为每一个终端做一个特定的版本。
基本原理是通过媒体查询检测不同的设备屏幕尺寸做处理。
页面头部必须有meta声明的viewport。
<meta name=’viewport’ content=”width=device-width, initial-scale=1. maximum-scale=1,user-scalable=no”>

## 32 视差滚动效果？

视差滚动（Parallax Scrolling）通过在网页向下滚动的时候，控制背景的移动速度比前景的移动速度慢来创建出令人惊叹的3D效果。

1. CSS3实现
    优点：开发时间短、性能和开发效率比较好，缺点是不能兼容到低版本的浏览器
2. jQuery实现
    通过控制不同层滚动速度，计算每一层的时间，控制滚动效果。
    优点：能兼容到各个版本的，效果可控性好
    缺点：开发起来对制作者要求高
3. 插件实现方式
    例如：parallax-scrolling，兼容性十分好

## 33 ::before 和 :after中双冒号和单冒号有什么区别？解释一下这2个伪元素的作用

1. 单冒号(:)用于CSS3伪类，双冒号(::)用于CSS3伪元素。
2. ::before就是以一个子元素的存在，定义在元素主体内容之前的一个伪元素。并不存在于dom之中，只存在在页面之中。
3. :before 和 :after 这两个伪元素，是在CSS2.1里新出现的。起初，伪元素的前缀使用的是单冒号语法，但随着Web的进化，在CSS3的规范里，伪元素的语法被修改成使用双冒号，成为::before ::after。

## 34 你对line-height是如何理解的？

行高是指一行文字的高度，具体说是两行文字间基线的距离。CSS中起高度作用的是height和line-height，没有定义height属性，最终其表现作用一定是line-height。
单行文本垂直居中：把line-height值设置为height一样大小的值可以实现单行文字的垂直居中，其实也可以把height删除。
多行文本垂直居中：需要设置display属性为inline-block。

## 35 怎么让Chrome支持小于12px 的文字？

p{font-size:10px;-webkit-transform:scale(0.8);} //0.8是缩放比例

## 36 让页面里的字体变清晰，变细用CSS怎么做？

-webkit-font-smoothing在window系统下没有起作用，但是在IOS设备上起作用-webkit-font-smoothing：antialiased是最佳的，灰度平滑。

## 37 position:fixed;在android下无效怎么处理？

<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"/>

## 38 如果需要手动写动画，你认为最小时间间隔是多久，为什么？
多数显示器默认频率是60Hz，即1秒刷新60次，所以理论上最小间隔为1/60＊1000ms ＝ 16.7ms。

## 39 li与li之间有看不见的空白间隔是什么原因引起的？有什么解决办法？

行框的排列会受到中间空白（回车空格）等的影响，因为空格也属于字符,这些空白也会被应用样式，占据空间，所以会有间隔，把字符大小设为0，就没有空格了。
解决方法：
    可以将<li>代码全部写在一排
    浮动li中float：left
    在ul中用font-size：0（谷歌不支持）；可以使用letter-space：-3px

## display:inline-block 什么时候会显示间隙？

有空格时候会有间隙 解决：移除空格
margin正值的时候 解决：margin使用负值
使用font-size时候 解决：font-size:0、letter-spacing、word-spacing

## 41 有一个高度自适应的div，里面有两个div，一个高度100px，希望另一个填满剩下的高度

外层div使用position：relative；高度要求自适应的div使用position: absolute; top: 100px; bottom: 0; left: 0

## 42 png、jpg、gif 这些图片格式解释一下，分别什么时候用。有没有了解过webp？

png是便携式网络图片（Portable Network Graphics）是一种无损数据压缩位图文件格式.优点是：压缩比高，色彩好。 大多数地方都可以用。
jpg是一种针对相片使用的一种失真压缩方法，是一种破坏性的压缩，在色调及颜色平滑变化做的不错。在www上，被用来储存和传输照片的格式。
gif是一种位图文件格式，以8位色重现真色彩的图像。可以实现动画效果.
webp格式是谷歌在2010年推出的图片格式，压缩率只有jpg的2/3，大小比png小了45%。缺点是压缩的时间更久了，兼容性不好，目前谷歌和opera支持。

## 43 style标签写在body后与body前有什么区别？

页面加载自上而下 当然是先加载样式。
写在body标签后由于浏览器以逐行方式对HTML文档进行解析，当解析到写在尾部的样式表（外联或写在style标签）会导致浏览器停止之前的渲染，等待加载且解析样式表完成之后重新渲染，在windows的IE下可能会出现FOUC现象（即样式失效导致的页面闪烁问题）

## 44 CSS属性overflow属性定义溢出元素内容区的内容会如何处理?

参数是scroll时候，必会出现滚动条。
参数是auto时候，子元素内容大于父元素时出现滚动条。
参数是visible时候，溢出的内容出现在父元素之外。
参数是hidden时候，溢出隐藏。

## 45 阐述一下CSS Sprites

将一个页面涉及到的所有图片都包含到一张大图中去，然后利用CSS的 background-image，background- repeat，background-position 的组合进行背景定位。利用CSS Sprites能很好地减少网页的http请求，从而大大的提高页面的性能；CSS Sprites能减少图片的字节。

## 46 Flex布局，以及常用的属性

网页布局是 css 的一个重点应用
布局的传统解决方案，是基于**盒装模型**，依赖 display 属性 + position属性 + float属性。它对于那些特殊布局非常不方便，比如，垂直居中就不容易实现。
2009年，W3C提出了一种新的方案----Flex布局，可以简便、完整、响应式地实现各种页面布局。目前，它已经得到了所有浏览器的支持，这意味着，现在就能很安全地使用这项功能。
Flex 布局将成为未来布局的首选方案。

1. Flex布局是什么？
   
    Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。
    任何一个容器都可以指定为 Flex 布局。块级元素用 flex，行内元素用 inline-flex。
    Webkit 内核的浏览器，必须加上-webkit前缀。（现在都会引入postcss，其中有autoprefixer帮助我们实现前缀自动补齐）
    *注意，设为 Flex 布局以后，子元素的float、clear和vertical-align属性将失效。*

2. 基本概念

    采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。
    容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。
    *项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。*

3. （设置了flex的元素）容器的属性 
    6个属性：
          [flex-direction] 
          决定主轴的方向（即项目的排列方向）。
          >  flex-direction: row | row-reverse | column | column-reverse;  
                           // 默认水平紧贴着从左到右 | 从右到左 | 从上到下  | 从下到上；
          [flex-wrap] 
          默认情况下，项目都排在一条线（又称"轴线"）上。flex-wrap属性定义，如果一条轴线排不下，如何换行。
          >  flex-wrap: nowrap | wrap | wrap-reverse;
                      // 默认不换行 | 换行，第一行在上方 | 换行，第一行在下方
          [flex-flow]
          是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap
          >  flex-flow: <flex-direction> || <flex-wrap>;
          [justify-content]
          定义了项目在主轴上的对齐方式。会因为flex-direction属性改变默认主轴是水平还是垂直方向。
          >  justify-content: flex-start | flex-end | center | space-between | space-around;
                            // 主轴从左往右排列 | 从右往左  | 主轴居中 | 两端对齐，项目之间的间隔都相等 | 每个项目两侧的间隔相等
          [align-items]
          定义项目在交叉轴上如何对齐。
          >  align-items: flex-start | flex-end | center | baseline | stretch;
                        // 交叉轴的起点对齐 | 终点对齐  | 居中 | 项目中第一行文字的基线对齐 | 默认值，如果项目未设置高度或设为auto，将占满整个容器的高度。
          [align-content]
          定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
          >  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
                         // 与交叉轴的起点对齐 | 终点对齐 | 居中 | 与交叉轴两端对齐中间平均分布 | 每根轴线两侧的间隔都相等 | 默认值，轴线占满整个交叉轴


4. （被包裹的元素）项目属性
    6个属性：
          [order] 
            定义项目的排列顺序。数值越小，排列越靠前，默认为0。
            > order: <integer>; // -1， 0， 99
          [flex-grow]
            定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
            > flex-grow: <number>; /* default 0 */ 如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。
          [flex-shrink]
            定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
            > flex-shrink: <number>; /* default 1 */ 如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。
          [flex-basis]
            定义了在分配多余空间之前，项目占据的主轴空间（main size）
            > flex-basis: <length> | auto; /* default auto */ 它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。
          [flex]
            flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
            > flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ] 该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。
          [align-self]
            允许单个项目有与其他项目不一样的对齐方式。可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。
            > align-self: auto | flex-start | flex-end | center | baseline | stretch; 该属性可能取6个值，除了auto，其他都与align-items属性完全一致。


## 47 BFC是什么？能解决什么问题？

块级 格式化 上下文：  Block Formatting Context
FC: Formatting Context指的是页面中的一个渲染区域,并且拥有自己的渲染规则.决定子元素如何定位,以及和其他元素的相互作用和联系.
BFC: 块级格式化上下文, 是一个独立的块级渲染区域,只针对块级元素,有一套自己的渲染规则来约束块级盒子,与外部无关.

满足以下CSS声明的元素就会生成BFC.
  根元素 html
  float不为none
  overflow不为hidden
  display: inline-block, table-cell, table-caption(注意: 值为table会生成BFC是因为会默认生成一个匿名的table-cell,所以不是table生成了BFC)
  position: absolute, fixed

BFC在布局中的解决的问题：
    1 解决margin折叠: 同一个BFC中的两个相邻Box才会发生重叠与方向无关，不过由于上文提到的第一条限制，我们甚少看到水平方向的margin重叠。
    2 解决浮动: 在清楚浮动带来的问题的解决方案中,一定会回答用BFC清除,那到底是怎么清除的呢? 根本原因就是父级元素创建BFC后,子元素即使浮动也会参与BFC高度的计算.即不会产生高度塌陷的问题.
    3 多栏布局的BFC实现： 通过BFC约束: BFC的区域不会与float的元素区域重叠, 可以来实现多栏布局.

## 48 