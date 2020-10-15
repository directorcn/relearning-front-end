## 进程和线程

线程依附于进程（一个进程内可以有多个线程），进程中的线程共享数据，进程间相互隔离，进程中任意线程崩溃都会导致整个进程挂掉。

## 单进程浏览器

浏览器所有的功能模块都运行在同一个进程，这些模块包括网络、插件、JavaScript 运行环境、渲染引擎和页面等。

## 多进程浏览器

浏览器主进程、插件进程、渲染进程、网络进程、GPU 进程



## HTTP

* **Cache**

![HTTP Cache](https://raw.githubusercontent.com/directorcn/links/master/relearning-fe/browser/HTTPStaleness.png)

## 从输入URL到页面展示，这中间发生了什么？

* 浏览器进程接收到用户输入的 URL 请求，浏览器进程将 URL 请求转发给网络进程
* 网络进程发起真正的 URL 请求（发起请求前会在本地缓存中查找，是否缓存了该资源，如果有缓存资源。直接返回；如果查找不到缓存资源，就会发起网络请求。发起请求前，DNS 解析，利用 IP 地址和服务器建立 TCP 连接，浏览器端构建请求行、请求头，向服务器发起请求）
* 网络进程接收到响应头数据，解析响应头，并将数据转发给浏览器进程
* 浏览器进程接收到网络进程的响应头数据之后，发送 CommitNavigation 消息到渲染进程
* 渲染进程接收到 CommitNavigation 消息后，便开始准备接收 HTML 数据，接收的方式是与网络进程建立数据管道
* 渲染进程会向浏览器进程确认提交，告诉浏览器进程，已经准备好接收和解析页面数据
* 渲染进程将 HTML 内容转换为浏览器能够读懂的 DOM 树结构（构建 DOM）
* 渲染引擎将 CSS 样式表转换为浏览器可以理解的 styleSheets，计算出 DOM 节点的样式（样式计算）
* 创建布局树，并计算元素的布局信息
* 对布局树进行分层，并生成分层树
* 为每个图层生成绘制列表，并将其提交到合成线程
* 合成线程将图层分成图块，并在光栅化线程池中将图块转换成位图
* 合成线程发送绘制图块命令 DrawQuad 给浏览器进程
* 浏览器进程根据 DrawQuad 消息生成页面，并显示到显示器上








