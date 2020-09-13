const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

const resolvePromise = (promise2, x, resolve, reject) => {
    // promise2 和 x 是同一个引用的话, 直接抛错 
    if (promise2 === x) {
        throw new TypeError('Chaining cycle detected for promise #<Promise>');
    }

    if ((x !== null && typeof x === 'object') || typeof x === 'function') {
        let called;
        try {
            // 取then then 属性有可能是通过Object.definedProperty定义的
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called)
                        return;
                    called = true;
                    // y 可能还是一个 promise
                    resolvePromise(promise2, y, resolve, reject);
                }, r => {
                    if (called)
                        return;
                    called = true;
                    // 采用 promise 失败的数据向下传递
                    reject(r);
                });
            } else {
                // x 是一个普通对象, 直接成功即可
                resolve(x);
            }
        } catch (e) {
            if (called)
                return;
            called = true;
            reject(e);
        }
    } else {
        resolve(x);
    }
}

class _Promise {
    constructor(executor) {
        this.status = PENDING;
        this.data = void 0;
        this.resolveCbs = [];
        this.rejectCbs = [];

        let resolve = (value) => {
            if (this.status === PENDING) {
                this.status = FULFILLED;
                this.data = value;
                this.resolveCbs.length && this.resolveCbs.forEach(fn => fn()); // 发布
            }
        };

        let reject = (error) => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.data = error;
                this.rejectCbs.length && this.rejectCbs.forEach(fn => fn()); // 发布
            }
        };

        try {
            executor(resolve, reject);
        } catch(e) {
            console.log(e);
            reject(e);
        }
    }

    then(onFulfilled, onRejected) {
        // onFulfilled onRejected 可选参数 
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val;
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw new Error(err) };

        let promise2 = new _Promise((resolve, reject) => {
            // 同步
            if (this.status === FULFILLED) {
                // 保证可以拿到 promise2; onFulfilled onRejected 是异步的
                setTimeout(() => {
                    // try catch 只能捕获同步异常 所以需要在里面捕获
                    try {
                        let x = onFulfilled(this.data);
                        // x 如果是普通值, 直接 resolve ; 
                        //   如果是 promise 可能执行 resolve, 也可能执行 reject
                        resolvePromise(promise2, x, resolve, reject);
                    } catch(e) {
                        reject(e);
                    }
                }, 0);
            }
            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.data);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            }

            // 异步调用 resolve reject
            if (this.status === PENDING) {
                // 订阅
                this.resolveCbs.push(() => {
                    // todo...
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.data);
                            resolvePromise(promise2, x, resolve, reject);
                        }  catch(e) {
                            reject(e);
                        }
                    }, 0);
                    
                });
                this.rejectCbs.push(() => {
                    // todo...
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.data);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch(e) {
                            reject(e);
                        }
                    }, 0);
                   
                })
            }
        });
        return promise2;
    }

}

_Promise.all = values => {
    return new _Promise((resolve, reject) => {
        let result = [], counter = 0;

        let isPromise = value => {
            if (value !== null && typeof value === 'object' || typeof value === 'function') {
                if (value.then && typeof value.then === 'function')
                    return true;
            } else {
                return false;
            }
        };

        let processData = (key, value) => {
            result[key] = value;
            if (++counter === values.length)
                resolve(result);
        };
        for (let i = 0; i < values.length; i ++) {
            let current = values[i];
            if (isPromise(current)) {
                current.then(val => {
                    processData(i, val);
                }, reject)
            } else {
                processData(i, current);
            }
        }
    })
}

_Promise.defer = _Promise.deferred = function() {
    let dfd = {}
    dfd.promise = new _Promise((resolve, reject) => {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}

module.exports = _Promise;
