let set = new Set;
let globalProperties = [
    // Function Properties
    'eval',
    'isFinite',
    'isNaN',
    'parseFloat',
    'parseInt',
    'decodeURI',
    'decodeURIComponent',
    'encodeURI',
    'encodeURIComponent',
    // Constructor Properties
    'Array',
    'ArrayBuffer',
    'BigInt',
    'BigInt64Array',
    'BigUint64Array',
    'Boolean',
    'DataView',
    'Date',
    'Error',
    'EvalError',
    'Float32Array',
    'Float64Array',
    'Function',
    'Int8Array',
    'Int16Array',
    'Int32Array',
    'Map',
    'Number',
    'Object',
    'Promise',
    'Proxy',
    'RangeError',
    'ReferenceError',
    'RegExp',
    'Set',
    'SharedArrayBuffer',
    'String',
    'Symbol',
    'SyntaxError',
    'TypeError',
    'Uint8Array',
    'Uint8ClampedArray',
    'Uint16Array',
    'Uint32Array',
    'URIError',
    'WeakMap',
    'WeakSet',
    // Other Properties
    'Atomics',
    'JSON',
    'Math',
    'Reflect'
];

let queue = [];
for (let p of globalProperties) {
    queue.push({
        path: [p],
        object: this[p]
    });
}

let current;
while(queue.length) {
    current = queue.shift();
    // console.log(current.path.join('.'));
    if (set.has(current.object))
        continue;
    set.add(current.object);
    for (let p of Object.getOwnPropertyNames(current.object)) {
        let property = Object.getOwnPropertyDescriptor(current.object, p);
        if (property.hasOwnProperty("value") &&
            ((typeof property.value !== null) && (typeof property.value === "object") || (typeof property.value === "object")) &&
            property.value instanceof Object)
            queue.push({
                path: current.path.concat([p]),
                object: property.value
            });

        if (property.hasOwnProperty("get") && (typeof property.get === 'function'))
        queue.push({
            path: current.path.concat([p]),
            object: property.get
        });
   
        if (property.hasOwnProperty("set") && (typeof property.set === 'function'))
        queue.push({
            path: current.path.concat([p]),
            object: property.set
        });
    }
}
