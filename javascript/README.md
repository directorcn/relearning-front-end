# ECMA-262

## Lexical Grammer

`ecma-262` 标准中有 4 种顶级输入元素，区分 `/` 是除号还是 `RegExp`，区分 `{` 是不是 `template`

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

`Memeber` 运算返回的是 `Renference` 类型（Runtime）

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

