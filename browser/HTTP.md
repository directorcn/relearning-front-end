# HTTP

> **安全性**：不会对服务器上的资源造成实质性的修改
>
> **幂等性**：多次执行相同的操作，结果也都是相同的



### HTTP Method

* `GET`：从服务器获取资源。

* `POST`：将数据发送到服务器。

* `HEAD`

* `PUT`

* `DELETE`

* `CONNECT`

* `OPTIONS`

* `TRACE`



#### `GET` 和 `POST` 区别？

* 可以对 `GET` 请求的数据做缓存

* `GET` 请求的参数是通过 `URL` 查询字符串传输的，`POST` 的参数放在 `body` 中

* `POST` 没有数据大小限制，`GET` 不同浏览器对 `URL` 长度限制略有不同

* `GET` 是安全的是也是幂等的，`POST` 不是幂等的（多次提交会创建多个资源），是“不安全”（增加、删除数据）的



### HTTP Status code

* **2xx** 请求成功

  * **200 OK** 请求成功。

* **3xx** 请求的资源发生了变动，希望客服端进一步处理。

  * **301 Moved Permanently**，永久重定向。

  * **302 Found**，临时重定向。

  * **304 Not Modified**，缓存重定向。

* **4xx** 客户端请求错误 

  * **403 Forbidden**，无权限。

  * **404 Not Found**，请求的资源不存在。

  * 405 Method Not Allowed，

* **5xx** 服务端请求错误

  * **500 Internal Server Error**，服务端错误。

  * **503 Service Unavailable**，服务端暂时性错误，可以一会再试。



### HTTP Head

#### Request Header

| Request Header    | 规定                                                         |
| ----------------- | ------------------------------------------------------------ |
| Accept            | 浏览器端接收的格式                                           |
| Accept-Encoding   | 浏览器端接收的编码方式                                       |
| Accept-Language   | 浏览器端接收的语言，用于判断服务器多语言                     |
| Cache-Control     | 控制缓存的时效性                                             |
| Connection        | 连接方式，如果是 `keep-alive`，且服务端支持，则会复用连接    |
| Host              | `HTTP` 访问使用的域名                                        |
| If-Modified-Since | 上次访问时的更改时间，如果服务端认为此后自己没有更新，则给出 `304` 响应 |
| If-None-Match     | 上次访问使用的 `E-Tag`，通常是页面的信息摘要，这个比更改时间更准确一些 |
| User-Agent        | 客户端标识                                                   |
| Cookie            | 客户端存储的 `cookie` 字符串                                 |



#### Response Header

| Response Header  | 规定                                                         |
| ---------------- | ------------------------------------------------------------ |
| Cache-Control    | 缓存控制，用于通知各级缓存保存的时间，例如 `max-age=0`，表示不要缓存 |
| Connection       | 连接类型，`keep-alive` 表示复用连接                          |
| Content-Encoding | 内容编码方式，通常是 `gzip`                                  |
| Content-Length   | 内容的长度，有利于浏览器判断内容是否已经结束                 |
| Content-Type     | 内容类型，所有请求网页的都是 `text/html`                     |
| Date             | 当前的服务器日期                                             |
| ETag             | 页面的信息摘要，用于判断是否需要重新到服务端取回页面，是资源的一个唯一标识 |
| Expires          | 过期时间，用于判断下次请求是否需要到服务端取回页面           |
| Keep-Alive       | 保持连接不断时需要的一些信息。例如，`timeout=5`，`max=100`   |
| Last-Modified    | 页面上次修改的时间                                           |
| Server           | 服务端软件的类型                                             |
| Set-Cookie       | 设置 `cookie`，可以存在多个                                  |
| Via              | 服务端的请求链路，对一些调试场景至关重要的一个头             |



### 强缓存、协商缓存


