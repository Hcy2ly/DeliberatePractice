# 如果选择 Chrome 作为开发环境，则必须知道的 11 个技巧

    1. 打开命令菜单
      > 快捷方式: cmd + Shift + p

    2. 技巧一： 强大的截图工具
      > 长截图: Screenshot Capture full size screenshot
      > 选中某一代码块，快捷键cmd+shift+p: Screenshot Capture node screenshot

    3. 技巧二: 在控制台中引用一个操作的结果
      > js方式： 'abcde'.split('').reverse().join('')  => 需要知道每一步，则 'abcde'.split('');  'abcde'.split('').reverse();  'abcde'.split('').reverse().join('')
      > Chrome 的方式： 可用 $_ 得到上一轮的结果 => 需要知道每一步，则 'abcde'.split('');  $_.reverse();  $_.join('');

    4. 重新发送XHR请求
      > 选择网络面板 NetWork，选择想要重新请求的 xhr，右键: replay xhr

    5. 监控页面加载状态
      > 在网络面板下，选择 Capture Screenshots 获得页面加载的截图。

    6. 复制变量
      > 在console下用: copy(location) 复制一个变量。

    7. 将图像复制为 data URI
      > 选择图像 => 右键，复制url

    8. 表格对象数组
      > table(object) 可以将对象制成表格

    9. 拖放元素面板
      > 选中代码块，可以上下拖动。

    10. 在控制台中引用当前选定的元素
      > 选中当前的代码块，然后点击console，输入$0，就可以引用这之前选中的代码块。

    11. 触发css伪类
      > elements =》 styles =》 :hov  可以看到很多伪类。

    12. 隐藏元素的快捷方式
      > 选中代码块 =》 点h

    13. 将DOM元素存储在全局临时变量中
      > 选择元素 =》 右击鼠标  =》 存储为全局变量 store as global variable

## 网络相关的前端面试题

<https://juejin.cn/post/6956046759428636708>
