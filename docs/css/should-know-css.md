# CSS 总体结构

## at 规则

* [@charset]( https://www.w3.org/TR/css-syntax-3/)

* [@import](https://www.w3.org/TR/css-cascade-4/)

* [@media](https://www.w3.org/TR/css3-conditional/)

* [@page]( https://www.w3.org/TR/css-page-3/)

* [@counter-style](https://www.w3.org/TR/css-counter-styles-3/)

* [@keyframes](https://www.w3.org/TR/css-animations-1/)

* [@font-face](https://www.w3.org/TR/css-fonts-3/)

* [@supports](https://www.w3.org/TR/css3-conditional/)

* [@namespace](https://www.w3.org/TR/css-namespaces-3/)



## 普通规则

### Selector

* simple selector 简单选择器

    * `ID selector`

    * `class selector`

    * `pseudo-classes`

    * `attribute selector`

    * `type (tag name) selector`

    * `pseudo-elements`

    * `universal selector` * 

* compound selector 复合选择器

    只能由简单选择器组成，不可以包含空格。若包含 `type selector` 或者 `universal selector` 须前置（放在最前面），`pseudo-class`、`pseudo-elements` 放在最后面。

    ```css
    div.container {}
    *.wrapper {}
    span:first-child {}
    p::before {}
    ```

* complex selector 复杂选择器

    * `>` child 子代选择器

    * `+` next sibling 直接后继

    * `~` subsequent-sibling 后继

    * `||` 列选择器

    * `<space>` 后代(子孙)选择器

* selector list 选择器列表

    用**逗号**分割的选择器列表表示由选择器列表中每个单独选择器选择的所有元素的并集。

### Declaration

```css
div { width: 100px; }
```

`{` 和 `}` 内用 `;` 分割的每条 `rule` 就是 `declaration`

#### Key

##### Property

* [`position`](https://www.w3.org/TR/2011/REC-CSS2-20110607/visuren.html#choose-position)

    * `static`

    * `relative`

    > relative position. the box is offset relative to its normal position. When a box B is relatively positioned, the position of the following box is calculated as though B were not offset.

    > 相对于它自己在正常流位置的偏移，不会影响紧跟的盒子的位置

    * `absolute`

    > absolute position. These properties specify offsets with respect to the box's containing block. Absolutely positioned boxes are taken out of the normal flow. do not collapse with any other margins.

    > 相对于 [containing block](https://www.w3.org/TR/2011/REC-CSS2-20110607/visudet.html#containing-block-details) 的偏移，脱离文档流，不会发生 `margin` 折叠

    > 1. 如果元素有 `position: absolute`，则 containing block 从最近的祖先以 `position` 的 `absolute` `relative` 或者 `fixed` 建立，若祖先元素是 `inline`，偏移量从 containing block 的 `padding` 算起
    > 2. 如果没有这样的祖先元素，则 containing block 为初始的 containing block, root element `html`

    * `fixed`

    > 固定定位，相对于 viewport 的偏移

    * `sticky`

    > 1. `sticky` 是 `relative` 和 `fixed` 的混合，当没有达到阈值表现的是相对定位，达到阈值则表现为固定定位。
    > 2. 父元素的 `overflow` 不能是 `visible` 以外的值；必须设置 `top` `bottom` `left` `right` 其一；父元素的高度不能低于 `sticky` 元素的高度；`sticky` 元素仅在其父元素内生效

* `flex`

> `flex` 属性是 `flex-grow` `flex-shrink` `flex-basis` 的简写。
> `flex-grow` flex-item 的 flex 增长系数
> `flex-shrink` flex-item 的收缩规则。flex-item 宽度之和大于容器才会收缩
> `flex-basis` 分配多余空间之前，flex-item 占据的主轴空间（main size）

...

##### Variable

#### Value

## 机制

### 选择器优先级

css 优先级用三元组来表示 [X, Y, Z]

X：`ID selector`

Y：`class selector`, `attribute selector`, `pseudo-classes`

Z：`type selector`, `pseudo-elements`

`universal selector`, `combinators` (> + ~ ||) 没有优先级

`not()` 也不参与优先级的计算

`!important` 仅用于 `hotfix`

[specificity](https://specifishity.com/)

![css selector specificity](https://directorcn.github.io/links/static/images/css/specifishity.png)


### 伪类

* 链接/行为

    *  `:any-link` 所有的超链接

    * `:link` 未访问的超链接

    * `:visited` 访问过的超链接

    * `:active` 

    * `:focus` 获得焦点

    * `:target` `a` 标签当锚点使用或者 URL # 后面的片段

    * `:hover` 鼠标悬停

* 树结构

    * `:empty` 没有子元素，子元素只可以是元素节点或文本节点(包含空格)

    * `:nth-child()`

    * `:nth-last-child()`

    * `:first-child`、`:last-child`

    * `:only-child` 唯一子元素，没有任何兄弟元素

    ~~:last-child~~、~~:nth-last-child~~、~~:only-child~~ 这些就不建议使用了，会有 `CSS` 回溯的问题（可能导致重排或者重绘），只有读到父节点的结尾，才能确定是否命中该规则

* 逻辑型

    * `not(simple selector)` 只能是 simple selector

### 伪元素

* `::before`

* `::after`

* `::first-line`

* `::first-letter`

`::first-line` 与排版的第一行相关

**可用属性**

> `::first-line` -> `font` 系列，`color` 系列，`background` 系列，`word-spacing`，`letter-spacing`，`text-decoration`，`text-transform`，`line-height`

> `::first-letter` -> 在上面的基础上，增加了 `float`，`vertical-align`，盒模型系列 `margin`，`border`，`padding`

那么为什么 `::first-letter` 可以设置 `float`，而 `::first-line` 不行呢？思考一下。为什么又可以设置 `font` 呢？ 

> `font` 系列，`color` 系列，`background` 系列，`word-spacing`，`letter-spacing`，`text-decoration`，`text-transform`，这些属性都是作用于文字的，不是作用于盒，文字在排版的时候是进来一个排一个，而不是一行满了再排或者其他


### 动画

#### Animation

> `@keyframes` 定义，`animation` 使用

```css
@keyframes ball {
    from {
        background: darkgreen;
        width: 100px;
        height: 100px;
        transform: translate(0, 0);
    }
    to {
        background: lightgreen;
        width: 10px;
        height: 10px;
        transform: translate(500px, 45px);
    }
}
div {
    border-radius: 50%;
    animation: ball 5s infinite;
}
```

<animation-ball />

* `animation-name` 时间曲线

* `animation-duration` 动画的时长

* `animation-timing-function` 动画的时间曲线

* `animation-delay` 动画开始前的延迟

* `animation-iteration-count` 动画播放的次数

* `animation-direction` 动画运动的方向

#### Transition

* `transition-property` 要变换的属性

* `transition-duration` 变换的时长

* `transition-timing-function` 时间曲线

* `transition-delay` 延迟 

#### cubic-bezier

* [cubic-bezier.com/](https://cubic-bezier.com/)

### 排版

#### 盒模型

要了解盒模型，首先得有盒的概念，举个栗子，`<div></div>` 从源代码角度来说，`div` 就是一个标签，从语义上来讲，它是一个元素，于表现而言，它就是一个盒(Box)。另外，一个元素也可以产生多个盒，比如 span。我们可以通过 `getClientRects` 来查看盒的个数。

<box-model />

* 标准盒模型

```css
box-sizing: content-box;
```

Width = content width

* IE 盒模型

```css
box-sizing: border-box;
```
IE 盒模型的 `width` 是包含 `border` 的，Width = content width + padding + border

浏览器 (IE 除外) 默认采用的是标准盒模型。


#### Normal flow

##### Layout

* 收集盒进行

* 计算盒再行中的排布

* 计算行的排布


##### IFC

背景：Hello 的 `line-height: 100px`，World 的 `line-height: 70px`，从下图中你会发现它们对齐了！！！Amazing! 如果 World 的行盒内没有文本，会发生什么呢？请你先思考一下，再在下面的 demo 验证你的猜想，如果你已经有了答案，那么恭喜你。


<ifc />

* 行盒 `inline box` 内文本默认是根据(行盒最后一行文字的) `base-line` 对齐的，

* 行盒 `inline box` 内无文本行盒的下边缘就是 `base-line`

行盒的 `height` 属性超过父元素的 `line-height` 属性，又会有什么“礼物”呢？

<ifc type="2" />

* 行盒的 `height` 属性，超出父元素的 `line-height` 属性，则最高的行盒(子元素)的下边缘就是 `baseline`

...

这里有各种大礼包，So，当我们使用行盒的时候，需要给行盒加 `vertical-align` 属性，推荐的取值是 `top` / `middle` / `bottom`，这几种情况会比较符合我们的预期。


##### float 与 clear

* `float` 只在正常流生效

* `float` 会脱离文档流，再遇到浮动元素会抵住浮动的元素

* 元素都浮动，一行里放不下，会换行

* `clear` 会换行

* `float` 会导致重排

<float />

##### margin 折叠

* `margin` 折叠只发生在 BFC 里面

* 不同的 BFC 不会发生 `margin` 折叠

<margin-collapsing />

##### BFC

[BFC](https://xie.infoq.cn/article/1d343e72a49ed641566b4ac5d)

block level boxes 可以放入 BFC

block containers 可以容纳 BFC

block boxes `overflow` 的属性值是 `visible`，就和 父 BFC 合并



#### Flex


#### Grid

