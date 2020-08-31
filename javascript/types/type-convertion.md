# Type Convertion

|           | Number                | String           | Boolean   | Undefined | Null | Object | Symbol |
| --------- | --------------------- | ---------------- | --------- | --------- | ---- | ------ | ------ |
| Number    | -                     |                  | 0 =>false | ×         | ×    | Boxing | ×      |
| String    |                       | -                | ""=>false | ×         | ×    | Boxing | ×      |
| Boolean   | true => 1  false => 0 | 'true' 'false'   | -         | ×         | ×    | Boxing | ×      |
| Undefined | NaN                   | 'undefined'      | false     | -         | ×    | ×      | ×      |
| Null      | 0                     | 'null'           | false     | ×         | -    | ×      | ×      |
| Object    | valueOf               | valueOf toString | true      | ×         | ×    | -      | ×      |
| Symbol    | ×                     | ×                | ×         | ×         | ×    | Boxing | -      |

## Boxing

**`.` 运算符提供了装箱操作，它会根据原始数据类型构造一个临时对象，使得我们可以在原始数据类型上调用对应对象的方法。**

`Number()`、`String()`、`Boolean()` 强制类型转换

```js
var s = 'hello';
new String(s).length // 5
s.length // 5

!new String('') // fasle
!'' // true

Object("1") // boxing

// Symbol 不可以直接 new，除此之外与其他构造器没有差别
var symbol = Object(Symbol("1"))
symbol.constructor // Symbol
Object.getPrototypeOf(symbol) === Symbol.prototype // true
symbol instanceof Symbol // true
(function(){ return this }).apply(Symbol(1))
```



## Unboxing

- toPremitive
- valueOf / toString

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

