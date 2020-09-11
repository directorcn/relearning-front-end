# JavaScript

## var、let 以及 const 的区别

- `var` 声明的变量存在**变量提升**，局部提升（只提升声明部分，值为 `undefined`），可以重复声明；

- `let`、`const` 的变量提升，只**提升声明部分**，不会赋值，也就是说，在 `BlockStatement` 内部，只要使用`let`、`const` 声明，读到块语句的开始，变量就已经声明好了，只是还没有赋值，也不是 `undefined`，只有读到变量声明的位置，变量才可用，这在语法上称作“暂时性死区”（`TDZ`）;

- `let`、`const` 支持块级作用域，不可以重复声明，`let` 可以只声明不赋值，`const` 声明的同时必须赋值，否则抛错；

- `let` 声明的变量可以被修改，`const` 一经声明不可改变（引用类型的值可以修改，不想被修改可以冻结对象 `Object.freeze()`）；

```js
console.log(a); // undefiend
var a = 100;

{
    console.log(b); // ReferenceError: Cannot access 'b' before initialization
	let b = 100;
}
```

*番外：*

`function` 关键字声明的函数会**整体提升**。

```js
foo(); // 1
function foo() {
    console.log(1);
}

/*******************************/
console.log(a); // undefined
var a = 100;

// 等同于
var a;
console.log(a); 
a = 100;
```



## for…of 与 for…in 区别

- 具有 `Iterator` 接口的数据结构（数组，字符串，类数组，`Arguments`、`Map`，`Set` 等）都可以用 `for...of` **迭代** ，`for...of` 内部调用的是数据结构的 `[Symbol.iterator]` 方法；

- `for...in...` 用来**枚举**对象自身的属性以及原型链上的*可枚举* 属性，只枚举自身的属性需借助 `hasOwnProperty` 属性。

- 拿 `k/v` 来讲，`for...of` **迭代**的是元素（值 `value`），`for...in` **枚举**的是属性（键 `key`）。 

*番外：*

`forEach` 遍历数组不能中断，且没有返回值。

```js
var arr = [1, 2, 3, 4, 5];
arr.forEach(v => {
    if (v === 2)
    	return false;
    console.log(v); // 1, 3, 4, 5
});
```



## this

* 默认绑定：`this` 默认绑定全局对象，严格模式下，绑定 `undefined`；
* `new` 绑定：函数被 `new` 调用，则 `this` 绑定到构造函数的实例对象；
* 显式绑定：函数被 `call`，`apply` 调用，或者 `bind`，`this` 绑定到指定的对象，如果传入`null` 或者 `undefiend`，绑定到 `window`；
* 隐式绑定：在某个执行上下文中调用，`this` 绑定到该执行上下文。
* 箭头函数没有自己的 `this`，指向离它最近的非箭头函数。



> [ecma-262 11 Function Object Table 27](https://www.ecma-international.org/ecma-262/11.0/index.html#sec-ecmascript-function-objects) 中定义了 `[[thisMode]]` 私有属性，它有三个取值：

* `lexical`：表示在当前执行上下文中找 `this`，这对应了箭头函数；

* `strict`：严格模式时使用，严格按照函数调用时传入的值，可能为 `null` 或者 `undefined`

* `global`：表示 `this` 为 `undefined` 时，取全局对象，这对应了普通函数。



## 箭头函数与普通函数的区别

* 箭头函数没有 `arguments`；

* 没有自己的 `this`，`this` 无法改变，使用 `call`，`apply`，`bind` 不能改变 `this`，不会报错，但是可以实现传参；

* 不可以用作构造函数，所以不能 `new`，也没有 `new.target`、`super`；

* 不可以用作 `generator` 函数，所以内部不可以使用 `yeild` 关键字;

* 没有原型 `prototype`。



## call、apply、bind

`call` 、`apply` 都可以改变 `this`，区别在于传参方式不同，第一个参数都是 `this`，`call` 接收的是一个**参数列表**，`apply` 接收的是一个**数组（或类数组）**。

`bind` 返回一个新函数

* `call`

```js
Function.prototype._call = function(context) {
    // 参数为 null 或 undefined, this 指向 window
    context = context || window;
    let args = [...arguments].slice(1);
    // 将调用 call 的对象添加到 context 上
    context.fn = this;
    // 执行 fn, 此时 this 指向 context, fn 就有了获取 context 内部属性的能力
    let result = context.fn(...args);
    delete context.fn;
    // 返回函数执行结果
    return result;
}
```

* `apply`

```js
Function.prototype._apply = function(context) {
    context = context || window;
    let args = arguments[1] || [];
    context.fn = this;
    let result = context.fn(args);
    delete context.fn;
    return result;
}
```

* `bind`

```js
Function.prototype._bind = function(context) {
    if (typeof this !== 'function')
        throw new TypeError(`${this}._bind is not a function`);
    let args = [...arguments].slice(1);
    let _this = this;
    // 返回一个新函数
    return function F() {
        if(this instanceof F) {
            return new _this(...args, ...arguments);
        }
        return _this.apply(context, args.concat(...arguments));
    }
}
```



## new

* 以构造函数的 `prototype` 属性为原型创建一个新对象；

* 以新对象为 `this`，执行函数的 `[[call]]`；（函数调用会执行函数的 `[[call]]`）

* 如果 `[[call]]` 的返回值是对象，那么，返回这个对象，否则返回第一步创建的新对象。

`new` 内部的实现

```js
function _new(constructor) {
    let args = [...arguments].slice(1);
    // 以构造函数的 `prototype` 属性为原型创建一个新对象；
    let context = Object.create(constructor.prototype);
    // 以新对象为 `this`，执行函数的 `[[call]]`；
    let result = constructor.apply(context, args);
    // 如果 `[[call]]` 的返回值是对象，那么，返回这个对象，否则返回第一步创建的新对象。
    return (typeof result !== null && typeof result === 'object') ?
        result : context;
}
```



## 继承

* [继承的几种方式]()



## 深拷贝、浅拷贝



## Promise



## 事件捕获与冒泡



## 防抖节流



