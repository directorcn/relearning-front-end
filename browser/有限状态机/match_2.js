// 如何用状态机处理诸如 'abcabx' 这样的字符串

function match(string) {
    let state = start;
    for (let c of string) {
        state = state(c);
    }
    return state === end;
}

function start(c) {
    if (c === 'a') {
        return foundA;
    } else {
        return start;
    }
}

function foundA(c) {
    if (c === 'b') {
        return foundB;
    } else {
        return start(c);
    }
}

function foundB(c) {
    if (c === 'c') {
        return foundC;
    } else {
        return start(c);
    }
}

function foundC(c) {
    if (c === 'a') {
        return foundA2;
    } else {
        return start(c);
    }
}

function foundA2(c) {
    if (c === 'b') {
        return foundB2;
    } else {
        return start(c);
    }
}

function foundB2(c) {
    if (c === 'x') {
        return end;
    } else {
        // 当找 x 时, 已经可以确定前面是 a, b, 不是 x 还可能是 c, 所以切到 foundB
        return foundB(c);
    }
}

function end() {
    return end;
}

console.log(match('abcabcabx'));
