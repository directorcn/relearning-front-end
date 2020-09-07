let set = new Set;

function getOwnPropNames(root) {
    if (root === window) {
        return [
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
            'Reflect',
        ];
    }
    return Object.getOwnPropertyNames(root);
}

// 属性特性
function getOwnPropOfAttr(object, property) {
    return Object.getOwnPropertyDescriptor(object, property).value;
}

function isObject(v) {
    return v !== null && (typeof v === 'object' || typeof v === 'function');
}

function getProps(obj, root = 'global') {
    if (set.has(obj) || !isObject(obj)) {
        return null;
    }
    set.add(obj);
    const objectPropNames = getOwnPropNames(obj).filter(prop => isObject(getOwnPropOfAttr(obj, prop)));
    return objectPropNames.map(prop => {
        const path = `${root}.${prop}`
        // const path = root.path.concat(prop);
        return {
            path,
            id: path,
            prop,
            children: getProps(getOwnPropOfAttr(obj, prop), path)
        };
    });
}
const children = getProps(globalThis);
