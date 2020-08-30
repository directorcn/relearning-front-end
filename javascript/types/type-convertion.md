# Type Convertion

|           | Number          | String           | Boolean  | Undefined | Null | Object | Symbol |
| --------- | --------------- | ---------------- | -------- | --------- | ---- | ------ | ------ |
| Number    | -               |                  | 0 false  | ×         | ×    | Boxing | ×      |
| String    |                 | -                | "" false | ×         | ×    | Boxing | ×      |
| Boolean   | true 0  false 1 | 'true' 'false'   | -        | ×         | ×    | Boxing | ×      |
| Undefined | NaN             | 'undefined'      | false    | -         | ×    | ×      | ×      |
| Null      | 0               | 'null'           | false    | ×         | -    | ×      | ×      |
| Object    | valueOf         | valueOf toString | true     | ×         | ×    | -      | ×      |
| Symbol    | ×               | ×                | ×        | ×         | ×    | ×      | -      |

