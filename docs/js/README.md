# ECMA-262

## Lexical Grammar

`ecma-262` 标准中有 4 种顶级输入元素，区分 `/` 是除号还是 `RegExp`，区分 `template` 中包不包含 `}`

```js
`hello ${(function (){ return 'world'; })()}`
```

### InputElement

* WhiteSpace (空白)

| Code Point | Name                      | Abbreviation | Escape Sequence |
| ---------- | ------------------------- | :----------- | ----------- |
| U+0009     | CHARACTER TABULATION      | `<TAB>`      | `\t`    |
| U+000B     | LINE TABULATION | `<VT>`      | `\v`      |
| U+000C     | FORM FEED                 | `<FF>`       | `\f` |
| U+0020     | SPACE                     | `SP`         |             |
| U+00A0     | NO-BREAK SPACE            | `NBSP`       |             |
| U+FEFF     | ZERO WIDTH NO-BREAK SPACE | `ZWNBSP`     |             |

`NBSP`：不间断空格，用途就是禁止自动换行。

`ZWNBSP`：零宽空格，`BOM` (`BYTE ORDER MARK`)，是一种不可打印的 `Unicode` 字符，用于可能需要换行处。




* LineTerminator (换行符)

| Code Point | Name            | Abbreviation | Escape Sequence |
| :--------- | :-------------- | :----------- | :-------------- |
| U+000A     | LINE FEED       | `LF`         | `\n`            |
| U+000D     | CARRIAGE RETURN | `CR`         | `\r`            |

`LF`：换行。

`CR`：回车。




* Comment (注释)

```js
// 单行注释

/**
 * 多行注释
*/ 
```




* Token (有效的输入元素)

  * `Punctuator` (符号)
  * `IdentifierName`

    * `Keywords` (关键字)
    * `Identifier` (标识符)

      * 变量名
      * 属性名
    * `Future reserved keywords`：`enum`
  * `Literal` (直接量)

`Punctuator`、`Keywords` 帮助程序形成结构，`Identifier`、`Literal` 代码中实际有效信息



## Expressions

### Left Handside

* Member

`Member` 运算返回的是 `Reference` 类型（Runtime）

```
a.b
a[b]
foo`string`
super.b
super['b']
new.target
new Foo()
```

```js
class Parent {
    constructor() {
        this.a = 100;
    }
    add(b) {
        return this.a + b
    }
}

class Child extends Parent {
    constructor() {
        super();
        console.log(super.add(this.a));
    }
}
var c = new Child; // 200

/************************************/
function foo() {
    console.log(new.target);
}
new foo();

/**********************************/

var name = 'world';
function bar() {
    console.log(arguments);
}
bar`hello ${name}!`;
```

* New

```
new Foo
```

```js
function cls1(s) {
    console.log('1', s);
}
function cls2(s) {
    console.log('2', s);
    return cls1;
}
new new cls2('nice');
```

* Call

```
foo()
super()
foo()['b']
foo().b
foo()`abc`
```



### Right Handside

* Update

> LeftHandSideExpression [no LineTerminator here] ++

```
a ++
a --
++ a
-- a
```

```js
var a = 1, b = 1, c = 1;
a
++
b
++
c

[a,b,c] // [1, 2, 2]
```

* Unary

```
delete a.b
void foo()
typeof a
+ a
- a
~ a
! a
await a
```

```js
var a = 100;
!!a // true
```

* Exponentiation

> 右结合

```
**
```

```js
2 ** 2 ** 3 // 2^8 = 256
2 ** (2 ** 3)
```

* Multiplicative

```
*
/
%
```

* Additive

```
+
-
```

* Shift

```
<<
>>
>>>
```

* Relationship

```
<
>
<=
>=
instanceof
in
```

* Equality

```
==
!=
===
!==
```

* Bitwise

```
&
^
|
```

* Logical

> 短路原则

```
&&
||
```

```js
function a() {
    console.log('a');
    return false;
}
function b() {
    console.log('b');
}

a() && b() // a false
a() || b() // a b
```

* Conditional

> 短路

```
?:
```

```js
function a() {
    console.log('a');
    return false;
}
function b() {
    console.log('b');
}

true ? a() : b() // a
false ? a() : b() // b
```

* Comma

```
,
```



## Statements

### Grammar

* 简单语句

  * ExpressionStatement
  * EmptyStatement
  * DebuggerStatement
  * ThrowStatement
  * ContinueStatement
  * BreakStatement
  * ReturnStatement

* 复合语句

  * **BlockStatement**

    ```  
    {                          |      [[type]]: normal
        ...                    |      [[value]]: --
    }                          |      [[target]]: --
    ```
    `BlockStatement` 一旦执行到非 `normal` 的语句，后面的语句就不会执行，这就是 `continue`，`break` 等语句可以改变代码执行顺序的基础逻辑。

  * **IterationStatement**

    ```
    while(...) ...
    do... while(...)
    for (xxx; ...; ...) ...
    for (xxx in ...) ...
    for (xxx of ...) ...
    for await (xxx of ...) ...
    
    xxx 可以放声明语句，for 循环会产生单独的作用域（父作用域）
    ```

    ```js
    for (let i = 1; i <= 10; i ++) {
        let i = 0;
        console.log(i); // 10 个 0 
    }
    // () 父域；Block 子域
    ```

  * LabelledStatement

  * SwitchStatement

    ```
    LabelledStatement          |      [[type]]: break, continue
    IterationStatement         |      [[value]]: --
    ContinueStatement          |      [[target]]: label
    BreakStatement             |
    SwitchStatement            |
    ```

  * TryStatement

    ```
    try {                      |     [[type]]: return
        ...                    |     [[value]]: --
      } catch(xxx) {           |     [[target]]: label
        ...                    |
      } finally {              |
        ...                    |
      }                        |
    ```

    **`try {...} catch {...}` 语句 `{}` 不可以省略，它不是 BlockStatement，但是会产生作用域。**

  * IfStatement

  * WithStatement

* 声明

  * FunctionDeclaration
  * GeneratorDeclaration
  * AsyncFunctionDeclaration
  * AsyncGeneratorDeclaration
  * VariableStatement
  * ClassDeclaration
  * LexicalDeclaration

### Runtime

* Completion Record  *语句执行完成*

> 用于描述异常、跳出等语句执行过程

```
[[type]]: normal, break, continue, return, throw
[[value]]: Types
[[target]]: label
```

* Lexical Environment



## Realm

> `Realm` 里有一套完整的 `JavaScript` 内置对象

在 `JavaScript` 中，函数表达式和对象直接量均会创建对象，使用 `.` 做隐士转换也会创建对象；这些对象也是有原型的，如果我们没有 `Realm`，就不知道它们的原型是什么。

```js
var iframe = document.createElement('iframe');
document.body.appendChild(iframe);
iframe.contentWindow.eval('this.o = {}');
var o1 = iframe.contentWindow.o;
o1 instanceof Object; // false
Object.getPrototypeOf(o1) === Object.prototype; // false
// 不是同一个 realm
```


### Global Object

#### Value properties

```
globalThis    Infinity    NaN    undefined
```

#### Function properties

```
eval()         isFinite()              isNaN()        parseFloat()    parseInt()
decodeURI()    decodeURIComponent()    encodeURI()    encodeURIComponent()
```

#### Constructor Properties

```
Array       ArrayBuffer    BigInt    BigInt64Array    BigUint64Array   Boolean
DataView    Date           Error     EvalError        Float32Array    Float64Array
Function    Int8Array      Int16Array    Int32Array   Map    Number    Object
Promise     Proxy       RangeError   ReferenceError   RegExp           Set
SharedArrayBuffer       String       Symbol           SyntaxError      TypeError
Uint8Array    Uint8ClampedArray      Uint16Array      Uint32Array      URIError
WeakMap     WeakSet
```

#### Other Properties

```
Atomics    JSON    Math    Reflect
```
[<img src="https://directorcn.github.io/links/static/images/js/global.png"/>](https://directorcn.github.io/links/static/pages/global.html)

## 函数调用

### Execution Context 执行上下文

> **Execution Context Stack**  执行上下文栈
>
> StackTop <=> **Running Execution Context**

![Execution Context Stack](https://directorcn.github.io/links/static/images/js/execution-context-stack.drawio.svg)

* **code evaluation state**

  `async`，`await` 以及 `generator` 需要记录代码执行的位置

* **LexicalEnvironment**

  * `this`
  * `new.target`
  * `super`
  * 变量：`let`、`const` 声明

* **VariableEnvironment**

  处理 `var` 声明，历史遗留包袱。

#### Environment Record

![Environment Record](https://directorcn.github.io/links/static/images/js/environment-record.drawio.svg)

