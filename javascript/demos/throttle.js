function throttle(fn, delay) {
    let previous = 0,
        timer = null,
        _this,
        args;
    let later = () => {
        previous = Date.now();
        timer = null;
        fn.apply(_this, args);
    };
    let throttled = function() {
        let now = Date.now();
        // 下次触发 fn 剩余的时间
        let remaining = delay - (now - previous);
        _this = this;
        args = arguments;
        // 没有剩余时间或修改了系统时间
        if (remaining <= 0 || remaining > delay) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            previous = now;
            fn.apply(_this, args);
        } else if (!timer) {
            timer = setTimeout(later, remaining);
        }
    }
    return throttled;
}
