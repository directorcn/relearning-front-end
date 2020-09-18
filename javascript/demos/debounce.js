function debounce(fn, delay, immediate) {
    let timer = null, result = void 0;
    let debounced = function() {
        const _this = this;
        const args = arguments;
        if (timer)
            clearTimeout(timer);
        if (immediate) {
            let callNow = !timer;
            timer = setTimeout(function() {
                timer = null;
            }, delay);
            if (callNow)
                result = fn.apply(_this, args);
        } else {
            timer = setTimeout(function() {
                fn.apply(_this, args);
            }, delay);
        }
        return result;
    }
    debounced.cancel = function() {
        clearTimeout(timer);
        timer = null;
    }
    return debounced;
}
