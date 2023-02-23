# html5 语义化

  **什么是语义化？就是用合理、正确的标签来展示内容**
  **语义化优点：**
    易于用户阅读，样式丢失的时候能让页面呈现清晰的结构。
    有利于SEO，搜索引擎根据标签来确定上下文和各个关键字的权重。
    方便其他设备解析，如盲人阅读器根据语义渲染网页
    有利于开发和维护，语义化更具可读性，代码更好维护，与CSS3关系更和谐。

1. div 的滥用
    人们滥用 div 的原因： 有效 => 即具有你需要的结构
    但是滥用 div 有严重的问题：
        - *可访问性*：许多 tools 非常智能，会尽力解析页面结构，以帮助用户按照页面制作者的意图来引导用户，并为用户提供简单的跳转链接来指引他们到自己关心的页面部分。然而，<div> 标签并没有真正传递有关文档结构的 任何有用 信息。
        - *可读性*：要阅读多个 div 嵌套组成的代码结构，需要通过扫描 class、id，并且 </div> 和哪个 <div> 相对应也很难匹配。你会开始非常依赖 IDE 功能，例如着色不同的缩进级别或突出显示匹配的标记以跟踪您的位置，而在较长的文档中，它可能需要在这些功能之上进行大量的滚动扫描式阅读。
        - *标准和一致性*： 开始新的工作或转移到新项目，并且必须从头学习代码库中使用的让人抓狂的标记，那可能会令人很沮丧。如果每个人都有标准化的方法来标记 web 文档中常见结构，那么在不熟悉代码库的情况下，都可以很容易的浏览 HTML 文件并快速处理它应该展示的内容。

2. h5 语义化标准
    - HTML5 的主要进步之一是引入了一组**标准化的语义元素**。
    - [语义元素]：用事物的含义标记文档结构的元素，这种方式可以清楚地表明他们的用途和他们在文件中服务的目的是什么。[!important]重要的是，由于它是标准化的，定义文档的这些元素可以被每个人使用并理解，包括机器人。
    - HTML5 规范：强烈建议作者将 <div> 元素视为最后采取的元素，在没有其它元素适合的情况下。使用更合适的元素而不是 <div> 元素，不但可以使读者更容易访问，而且也更容易为作者提供可维护性。

3. 语义块元素分为两类：[主要结构] 和 [内容指标]
    - 【主要结构】------- 针对页面结构的语义化标签
      常见的一种模式： 头部、内容、底部：
          <div class="container" id="header">...</div>
          <div class="container" id="main">
              ...
              <div class="article-section">...</div>
              ...
          </div>
          <div class="container" id="footer">...</div>

      以这种方式构造文档非常有意义，既可以读取 HTML，又可以更加简单地在 CSS 中设置页面样式。
      页眉和页脚元素页可以使用 PHP 或 Rails/ERB 等语言中的部分模版来更易于使用，因为你可以在整个站点中包含常见的页眉和页脚部分 code：
          <?php include 'header.php'; ?>
          <div id="main">...</div>
          <?php include 'footer.php'; ?>

      所以[这个标准]就是： 当每个人都认为这是一个很好的模式。
      随后，WHATWG 和 W3C 的人员就将模式标准化为 HTML5 的四个新元素： <header> 和 <footer> 和 <main> 和 <section> ；
      **新标准优势：一目了然，代码可读性极高。**
        - <header> 和 <footer>
            这两元素基本上是双胞胎，它们在规范中的定义非常相似，并遵循相同的规则，唯一区别在于它们的语义中它们被允许使用的位置： <header>页眉在事物的前面， <footer>页脚在事物的末尾。
        - <main>
            文档的主要内容区域包括文档的特定内容，且不包括在一组文档中重复的内容。
            注意：所有其它东西，徽标、搜索表单和导航栏等都可以在 <body> 中的 <header> 或 <footer> 中，但是在 <main> 之外。
            注意：文档中不能有多个可见的main元素。即 <main> 不能在任意切片内容的整个页面中使用；它应该只被使用一次。或者更确切地说，它可以在文档中多次被使用，但是一次只能看到一个<main>元素，所有其它的必须被使用隐藏属性隐藏，如CSS中的display:none。
            页面基本大纲code_：
                <header>
                    <h1>Super duper best blog ever</h1>
                    ...
                </header>
                <main>
                    <h2>Why you should buy more cheeses than you currently do</h2>
                    ...
                </main>
                <footer>
                    Contact us!
                    <div class="contact-info">this.is.us@example.com</div>
                </footer>
        - <section>
            当你觉得一个主内容太大，难以管理，你就可以用到 <section> ;
            从结构上讲，它基本上只是一个具有特殊含义的<div>。一个<section>开始一个新的"sectioning content"区域，因此它可以有自己的<header>和<footer>。那么，<section> 和普通的旧 <div> 之间有什么区别，然后，你应该在什么时候使用它们呢？————
              - 该元素不是通用容器元素。当一个元素仅是用于样式目的或为脚本编写提供便利的时候，鼓励作者使用 <div></div>
              - 一般规则是元素仅在元素内容在文本[大纲]中明确列出时候才适用。
              - 简言之，如果要在目录中列出文档的一部分，请使用<section>，其他用 <div> 或者其他元素。
            推荐:
              <section>
                <p>这是一个段落。</p>
              </section>

    - 【内容指标】------- 针对内容传达的语义化标签
      - <article>
        该元素用于表示完全独立的内容区域，这些内容可以从页面中提升出来并放入另一个内容中，并且仍然有意义。
        这可能是文字文章或博客，但也可用于社交媒体帖子，如推特或脸书的墙贴。
        h5规范建议文章总有一个标题，标识是干什么的，理想情况下使用（<h1> ... <h6>）。
        <article>也可以有<header>，<footer>和<section>元素，因此你可以使用它来嵌入一个完整的文档片段，其中包含其它页面中所需的所有结构。
        code_:
            <article>
              <header>
                  <h1>Why you should buy more cheeses than you currently do</h1>
              </header>
              <section>
                  <header>
                      <h2>Part 1: Variety is spicy</h2>
                  </header>
                  <!-- cheesy content -->
              </section>
              <section>
                  <header>
                      <h2>Part 2: Cows are great</h2>
                  </header>
                  <!-- more cheesy content -->
              </section>
          </article>

        不仅更具可读性，而且它对辅助技术更有用；机器人不能总是弄清楚你的特定类名模式，但是它们可以遵循这种结构
      - <nav>
        该元素旨在清楚地识别页面上的主要导航块，帮助用户围绕站点其余部分找到路径的链接组（例如站点地图或标题中的链接列表）或当前页面。

        在我们的示例顶部，让我们将<nav>应用于标题中的那组链接。code\_:
        <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/archive">Archive</a>
        </nav>

        根本不改变结构，一目了然而且不需要在<div>上读物和处理类名来找到它，更重要的是机器人也可以找到它。
      - <address>
        该元素旨在调出联系信息，它通常在主页 <footer> 中用于标记企业的邮寄地址，电话号码，客户服务邮箱地址等等。
        有趣的是，如何在 <address> 元素中标记内容的规则是开放的。规范提到有几个其它规范可以解决这个问题，并且提供这种级别的粒度可能超出了HTML本身的范围。
        常见的解决方案是RDFa，也是W3C规范，它使用标签上的属性来标记数据的不同组件。下面是我们示例中的页脚在标记 <address> 元素和 RDFa 时可能看起来的样子code_：
            <footer>
              <section class="contact" vocab="http://schema.org/" typeof="LocalBusiness">
                <h2>Contact us!</h2>
                <address property="email">
                  <a href="mailto:us@example.com">us@example.com</a>
                </address>
                <address property="address" typeof="PostalAddress">
                  <p property="streetAddress">123 Main St., Suite 404</p>
                  <p>
                    <span property="addressLocality">Yourtown</span>,
                    <span property="addressRegion">AK</span>,
                    <span property="postalCode">12345</span>
                  </p>
                  <p property="addressCountry">United States of America</p>
                  </address>
              </section>
            </footer>

        RDFa 是一个 W3C 推荐标准。它扩充了 XHTML 的几个属性，网页制作者可以利用这些属性在网页中添加可供机器读取的后设资料。与 RDF 资料模型的对应关系使得 [1] RDFa 可以将 RDF 的三元组嵌入在 XHTML 文档中，它也使得符合标准的使用端可以从 RDFa 文件中提取出这些 RDF 三元组来。

        一般情况下，RDFa 使用 XHTML 标记（常为 <span> 或 <div>）中的简单属性为实体和属性分配简要的描述性名称。

4. 总结
    - 实例： index.html
      如果你问我（怎么看改造后的内容？），那这比原始例子的可读性高 100 倍，而且对于搜索引擎优化和可访问性目的而言，其效率将提高 100 倍。
    - 以上并不是 HTML 中唯一的语义元素。有很多其它元素可以帮助你标记和构建你的文本内容，嵌入媒体资源等等。
      - <aside> 定义 <article> 标签外的内容。aside 的内容应该与附近的内容相关。
      - <blockquote> 定义一个摘自另一个源的块引用
      - <cite> 标签定义作品（比如书籍、歌曲、电影、电视节目、绘画、雕塑等等）的标题。
      - <code> 是一个短语标签，用来定义计算机代码文本
      - <del> 定义文档中已删除的文本。
      - <figure> 规定独立的流内容（图像、图表、照片、代码等等）。元素的内容应该与主内容相关，同时元素的位置相对于主内容是独立的。如果被删除，则不应对文档流产生影响。
      - <ins> 定义已经被插入文档中的文本
      - <time> 定义公历的时间（24 小时制）或日期，时间和时区偏移是可选的。该元素能够以机器可读的方式对日期和时间进行编码，这样，举例说，用户代理能够把生日提醒或排定的事件添加到用户日程表中，搜索引擎也能够生成更智能的搜索结果。
      - <var> 标签是一个短语标签，用来定义变量。

6. html(5)代码规范
    - 使用正确的文档类型： <!doctype html> ｜ <!DOCTYPE html>
    - 推荐使用小写字母编写 html5 元素名
        <section>
          <p>这是一个段落。</p>
        </section>
    - 推荐关闭所有元素。h5 中，不是所有标签一定要关闭，例如 <p>... ，但是推荐都要添加关闭，例如 <p> ... </p>。
    - 推荐关闭空的 html 元素，例如 <meta charset="utf-8">(只有 h5 可这样) ===> <meta charset="utf-8" />
    - 推荐属性名用小写，例如 class。
    - 推荐属性值用双引号。
    - 推荐图片使用 alt 属性，可以在图片不能现实时候，替代图片显示。定义好图片尺寸，在加载的时候可以预留置顶空间，减少闪烁。
    - 推荐属性和属性值之间的等号少用空格。
    - 避免一行代码过长，尽量少于 80 字符。
    - 不要无缘无故添加空行。为每个逻辑功能添加空行，易读。
    - 缩进使用两个空格，不建议使用 tab，比较短的代码间不要使用不必要的空行和缩进。
    - 在 html5 中，<html> 和 <body> 标签是可以省略的。
          ```
            <!DOCTYPE html>
            <head>
              <title>页面标题</title>
            </head>

            <h1>这是一个标题</h1>
            <p>这是一个段落。</p>
          ```
