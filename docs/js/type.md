# Data Type

## 原始数据类型

### Undefined

`Undefined` 类型只有一个值，就是 `undefined`，表示“未定义”。任何变量在声明之后，赋值前都是 `undefined` 类型，值也是`undefined`。在 `JavaScript` 中 `undefined` 并非关键字，而是一个全局变量，值为 `undefined`，为了避免无意中的篡改，推荐用 `void 0` 来代替。全局作用域的 `undefined` 变量不能被修改，局部作用域的`undefined` 变量可以被修改。 

```js
{
    let undefined = 100;
    console.log(undefined); // 100
}
```

### Null

`Null` 类型只有一个值，就是 `null` 本身。表示“空”。

### Boolean

只有两个逻辑值 `true` 和 `false`。

### String

字符串类型通常用于表示正在运行的`JavaScript` 程序中的文本数据，最大长度 ![img](https://latex.codecogs.com/svg.latex?2^{53}%20-%201)，但这并不是字符串的最大字符数，字符串的长度是字符串中元素的数量，每个元素可以视为单个`UTF-16` 代码单元，所以字符串的最大程度与字符串的编码方式强相关。

#### String Grammar

```js
"abc"
'abc'
`abc`

// template 词法解析 1.`${  2. }`
var name = 'template';

`hello,${
name
}`
```



### Symbol

所有非字符串值的集合，其值是唯一且不可变的。

### Number

`Number` 类型有 18437736874454810627(即 ![img](https://latex.codecogs.com/svg.latex?2^{64}-2^{53}+3)) 个值，`NaN`、`Infinity`、`-Infinity` 都是 `Number` 类型。

* **IEEE 754 Double Float**

  * Sign （1 bit）*符号*， `0` 代表数值为正，`1` 代表数值为负。

  * Exponent（11 bit）*指数*

  * Fraction（52 bit）*有效数字* ，大于等于1，小于2。

  在二进制，第一个有效数字必定是“1”，因此这个“1”并不会存储。

  二进制浮点数 ![img](https://latex.codecogs.com/svg.latex?V%20=%20(-1)^S%20%20*%202^E*%20M)

  **高位放在低地址就是大端法，低位放在低地址就是小端法**

![binary double float](https://directorcn.github.io/links/static/images/js/doublefloat.png)

<binary-float />


为了处理负指数的情况，实际的指数值按要求需要加上一个偏置（Bias）值作为保存在指数段中的值。（单精度是 127，双精度是 1023）。拿 0.1 来举例：

```
0.1 = (-1)^0 * 2^(0b01111111011 - 1023) * 1.10011(0011)
```

更多你可以参照这篇博文[浮点数的二进制表示](https://ruanyifeng.com/blog/2010/06/ieee_floating-point_representation.html)

跑下面这片代码你可以看到浮点数在内存中的存储序列。

```js
function convertDouble(val) {
    const bits = new Array(64).fill(0);
    const bytes = new Uint8Array(8);
    const memory = new Float64Array(bytes.buffer);
    memory[0] = (val);
    for (let i = 0; i < 8; i ++) {
        let byte = bytes[i];
        for (let j = 0; j < 8; j ++) {
            bits[(8 - i) * 8 - j - 1] = byte & 1;
            byte = byte >> 1;
        }
    }
    return bits.join('');
}
```

#### Number Grammar

* `DecimalLiteral`

  * 0
  * 0.
  * .2
  * 1E3

* `BinaryIntegerLiteral`

  * 0b111

* `OctalIntegerLiteral`

  * 0o10

* `HexIntegerLiteral`

  * 0xFF

```js
2 .toString(2) // '10'
2.toString(2) // SyntaxError 2.是一个合法的 token -> DecimalLiteral
```



### BigInt

`BigInt` 是一种数字类型的数据，它可以表示任意精度格式的整数。



## 引用数据类型

### Object

`Object`对象的定义是“属性的集合”。属性分为数据属性和访问器属性，二者都是 `key-value` 结构，`key` 可以是字符串或者 `Symbol` 类型。

*对象：唯一、状态（描述对象）、行为（状态的改变）*

* 在 `JavaScript` 运行时，原生对象的描述非常简单，我们只需要关心**原型**和**属性**两个部分。

![Object](https://directorcn.github.io/links/static/images/js/object.drawio.svg)

* `JavaScript` 用属性来统一抽象对象的**状态**（state）和**行为**（behavior）。

> 一般来说，数据属性用来描述状态，访问器属性用来描述行为；数据属性中如果存储函数，也是可以来描述行为的。

![Object Property type](https://directorcn.github.io/links/static/images/js/property.drawio.svg)

`writable`：是否可写

`enumerable`：是否可以 for...in... 枚举

`configurable`：属性是否可以改变


* 原型

每一个构造函数对象都会有 `prototype` 属性，指向原型对象，所有原型对象都有 `constructor` 属性，指向与之关联的构造函数。构造函数的实例，都有 `[[prototype]]` 内部属性，指向构造函数的原型对象。

```js
function Animal(name) {
    this.name = name
}
Animal.prototype.say = function(wow) {
    return `I'm ${this.name}, ${wow}!`
}

const cat = new Animal('cat')
cat.name // cat
cat.say('meow') // I'm cat, meow!

const tiger = new Animal('tiger');
tiger.name // tiger
tiger.say('roar') // I'm tiger, roar!
```

![原型](https://directorcn.github.io/links/static/images/js/prototypal.drawio.svg)

  * 原型存在的问题：

    * 弱化了构造函数传递参数的能力，所有实例默认都会拿到相同的初始值

    * 所有实例都共享属性，这对函数来说比较适合，原始类型的值也可以在实例上添加同名属性屏蔽，但是如果是引用类型的属性，某一个实例修改了该属性，等同于修改了原型上的这个属性，这并不一定是我们期望的。

* 原型链

![原型链](https://directorcn.github.io/links/static/images/js/prototype-chain.drawio.svg)

当我们访问属性时，如果当前对象没有，则会沿着原型找原型对象是否有此名称的属性，而原型对象可能还有原型，因此，会有“原型链”这一说法。这一算法保证了对象只需要描述自身与原型的区别即可。

```js
Object.prototype.compare = function(a, b) {
    return a < b
}
function SuperFn() {
    this.superProp = 'superProperty'
    this.prop = null
}

function SubFn() {
    this.prop = 'subProperty'
}

SubFn.prototype = new SuperFn

const child = new SubFn

child.prop // subProperty
child.superProp // superProperty
child.compare(1, 2) // true
```

![compare](https://directorcn.github.io/links/static/images/js/compare.drawio.svg) 

**Q：如何判断一个变量的数据类型？**

众所周知，`typeof` 运算符可以用来判断变量的类型（原始数据类型除了 `null` 都可以按预期返回），除了函数对象可以正确的返回 `function`，其它都是 `object`，（当然，`null` 也返回 `object`，历史遗留，这里不再赘述），这并不符合我们的预期，我们更希望能够返回正确的构造函数对象。`JavaScript` 中也提供了这样的运算符，它就是 `instanceof`。

```js
V instanceof Target
```

在 `V` 的原型链上，找 `Target` 的原型属性（`prototype`），存在返回 `true` ，否则 `false`。

实现一个 `instanceof`

```js
function instance_of(V, Target) {
    const O = Target.prototype;
    V = Object.getPrototypeOf(V);
    while(true) {
        if (V === null) // 找到了原型链的顶端
            return false;
        if (O === V) // 
            return true;
        V = Object.getPrototypeOf(V); // 沿着原型链向上一层查找
    }
}
```



#### API

* `{}` | `[]` | `.` | `Object.defineProperty`

* `Object.create` | `Object.setPrototypeOf` | `Object.getPrototypeOf`

* `new` | `class` | `extends`

* `new` | `function` | `prototype` (不推荐使用)


#### Special Object

##### Function Object

![Function Object](https://directorcn.github.io/links/static/images/js/function-object.drawio.svg)

除了一般对象的属性和原型，函数对象还有一个行为 `[[Call]]`。我们用 `JavaScript` 关键字、箭头运算符或者 `Function` 构造器创建的对象，都会有 `[[Call]]` 这个行为。我们用类似 `fn()` 这样的语法把对象当作函数调用时，会访问到 `[[Call]]` 这个行为。如果对应的对象没有 `[[Call]]` 行为就会报错。


##### Array Object

```js
const a = [];
a[10] = 10;
a.length // 11
Object.getOwnPropertyDescriptor(a, 'length'); // { value: 11, ... } data property
```

通过以上代码，你会发现 `length` 是 `Data Property`，但是作为一个 `Data Property`，我们并没有给它赋值，它是如何改变的呢？

>The value of the "length" property is numerically greater than the name of every own property whose name is an array index; whenever an own property of an Array object is created or changed, other properties are adjusted as necessary to maintain this invariant. **Specifically, whenever an own property is added whose name is an array index, the value of the "length" property is changed, if necessary, to be one more than the numeric value of that array index;** and whenever the value of the "length" property is changed, every own property whose name is an array index whose value is not smaller than the new length is deleted. 
>
>[ecma-262  - 11.0 - 9.4.2 章节](https://www.ecma-international.org/ecma-262/11.0/index.html#sec-array-exotic-objects) 

`Array` 的 `length` 属性根据最大的下标自动发生变化，最大索引 + 1



##### Object.prototype

```js
Object.setPrototypeOf(Object.prototype, { a:1 });
Object.getPrototypeOf(Object.prototype); // null
```

`Object.prototype` 已经是原型链的顶端了，不能再给它设置原型。



##### String Object

为了支持下标运算，String 的正整数属性访问会去字符串里查找。

. . . 


![堆栈](https://directorcn.github.io/links/static/images/js/stack.drawio.svg)

```js
var foo = 'foo'
var bar = { name: 'bar' }
```

**原始数据类型存储在栈（stack）内存，引用数据类型存储在堆（heap）内存，栈内存储的是堆地址。原始类型的赋值会完整复制变量值，而引用类型的赋值是复制引用地址。**



**Q：为什么一定要分“堆”和“栈”两个存储空间呢？所有数据直接存放在“栈”中不就可以了吗？**

> `JavaScript` 引擎需要用栈来维护程序执行期间上下文的状态，如果栈空间大了话，所有的数据都存放在栈空间里面，那么会影响到上下文切换的效率，进而又影响到整个程序的执行效率。所以通常情况下，栈空间都不会设置太大，主要用来存放一些原始类型的小数据。而引用类型的数据占用的空间都比较大，所以这一类数据会被存放到堆中，堆空间很大，能存放很多大的数据，不过缺点是分配内存和回收内存都会占用一定的时间。



#### 垃圾回收

* 栈内存回收：移动栈指针

* 堆内存回收：

> 从 GC Roots 对象出发，遍历 GC Roots 中的所有对象，如果通过 GC Roots 没有遍历到的对象，则这些对象便是垃圾数据。V8 会有专门的垃圾回收器来回收这些垃圾数据。
>
> V8 依据代际假说，将堆内存划分为新生代和老生代两个区域，新生代中存放的是生存时间短的对象，老生代中存放生存时间久的对象。为了提升垃圾回收的效率，V8 设置了两个垃圾回收器，主垃圾回收器和副垃圾回收器。主垃圾回收器负责收集老生代中的垃圾数据，副垃圾回收器负责收集新生代中的垃圾数据。
>
> 副垃圾回收器采用了 Scavenge 算法，是把新生代空间对半划分为两个区域，一半是对象区域，一半是空闲区域。新的数据都分配在对象区域，等待对象区域快分配满的时候，垃圾回收器便执行垃圾回收操作，之后将存活的对象从对象区域拷贝到空闲区域，并将两个区域互换。主垃圾回收器回收器主要负责老生代中的垃圾数据的回收操作，会经历标记、清除和整理过程。
>
[图解 Google V8 · V8 的两个垃圾回收器是如何工作的](https://time.geekbang.org/column/article/230845)

## Type Conversion

![Type conversion](https://directorcn.github.io/links/static/images/js/type-conversion.drawio.svg)

### Boxing

**`.` 运算符提供了装箱操作，它会根据原始数据类型构造一个临时对象，使得我们可以在原始数据类型上调用对应对象的方法。**

`Number()`、`String()`、`Boolean()` 强制类型转换

```js
var s = 'hello';
new String(s).length // 5
s.length // 5

!new String('') // false
!'' // true

Object('1') // boxing

// Symbol 不可以直接 new，除此之外与其他构造器没有差别
var symbol = Object(Symbol('1'))
symbol.constructor // Symbol
Object.getPrototypeOf(symbol) === Symbol.prototype // true
symbol instanceof Symbol // true
(function(){ return this }).apply(Symbol(1))
```



### Unboxing

* toPrimitive

* valueOf / toString

```js
1 + {} // '1[object Object]'
1 + { valueOf() { return 2; } } // 3
1 + { toString() { return 3; } } // 4
'1' + { toString() { return '1'; } } // '11'
1 + { valueOf() { return 2; }, toString() { return 3; } } // 3
'1' + { valueOf() { return 2; }, toString() { return '3'; } } // '12'
1 + { 
    [Symbol.toPrimitive](){ return 6; },
    valueOf() { return 2; },
    toString() { return '3'; }
} // 7
```

拆箱操作，如果有 `toPrimitive`，只调 `toPrimitive`。如果没有 `toPrimitive`，会执行默认的 `toPrimitive`，会先调 `valueOf`，再调 `toString`。

## 参考

* [IEEE 754](https://zh.wikipedia.org/wiki/IEEE_754)
* [双精度浮点数](https://zh.wikipedia.org/wiki/%E9%9B%99%E7%B2%BE%E5%BA%A6%E6%B5%AE%E9%BB%9E%E6%95%B8)
* [二进制转换工具](http://www.binaryconvert.com/)
