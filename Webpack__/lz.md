# webpack

1. Happypack

   在使用 Webpack 对项目进行构建时，会对大量文件进行解析和处理。当文件数量变多之后，webpack 构建速度就会变慢。
   运行在 node.js 上的 webpack 是单线程的，所以 webpack 处理任务要一个一个进行操作。
   由于 JavaScript 是单线程模型，要想发挥多核 CPU 的能力，只能通过多进程去实现，而无法通过多线程实现。
   而 happypack 的作用就是将文件解析任务分解成多个子进程并发执行。子进程处理完任务后再将结果发送给主进程。
   happypack 只能用在 loader 上，使用多个进程同时对文件进行编译。
