const EOF = Symbol('EOF'); // End Of File

let currentToken = null;
let currentAttribute = null;

const stack = [{ type: 'document', children: [] }];
let currentTextNode = null;

function emit(token) {
    let top = stack[stack.length - 1];

    if (token.type === 'startTag') {
        let element = {
            type: 'element',
            children: [],
            attribute: []
        };

        element.tagName = token.tagName;

        for (let p in token) {
            if (p !== 'type' && p !== 'tagName') {
                element.attribute.push({
                    name: p,
                    value: token[p]
                });
            }
        }

        top.children.push(element);
        element.parent = top;

        if (!token.isSelfClosing)
            stack.push(element);

        currentTextNode = null;
    } else if (token.type === 'endTag') {
        if (token.tagName === top.tagName) {
            stack.pop();
        } else {
            throw new Error('Tag start end doesn\'t match!');
        }
        currentTextNode = null;
    } else if (token.type === 'text') {
        if (currentTextNode === null) {
            currentTextNode = {
                type: 'text',
                content: ''
            };
            top.children.push(currentTextNode);
        }
        currentTextNode.content += token.content;
    }
}

function data(c) {
    if (c === '<') {
        return tagOpen;
    } else if (c === EOF) {
        emit({
            type: 'EOF'
        });
        return;
    } else {
        emit({
            type: 'text',
            content: c
        })
        return data;
    }
}

function tagOpen(c) {
    if (c === '/') {
        return endTagOpen;
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: 'startTag',
            tagName: ''
        };
        return tagName(c);
    } else {
        return data(c);
    }
}

function endTagOpen(c) {
    if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: 'endTag',
            tagName: ''
        };
        return tagName(c);
    } else if (c === '>') {
        throw new Error('missing-end-tag-name parse error!');
    } else {
        return;
    }
}

function tagName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c === '/') {
        return selfClosingStartTag;
    } else if (c === '>') {
        emit(currentToken);
        return data;
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken.tagName += c;
        return tagName;
    } else if (c === '\u0000') {
    } else if (c === EOF) {
    } else {
        return tagName;
    }
}

function beforeAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c === '/' || c === '>' || c === EOF) {
        return afterAttributeName(c);
    } else if (c === '=') {
        return attributeName;
    } else {
        currentAttribute = {
            name: '',
            value: ''
        };
        return attributeName(c);
    }
}

function attributeName(c) {
    if (c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF) {
        return afterAttributeName(c);
    } else if (c === '=') {
        return beforeAttributeValue;
    } else if (c === '\u0000') {

    } else if (c === '"' || c === '\'' || c === '<') {
        return attributeName;
    } else {
        currentAttribute.name += c;
        return attributeName;
    }
}

function afterAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return afterAttributeName;
    } else if (c === '/') {
        return selfClosingStartTag;
    } else if (c === '=') {
        return beforeAttributeValue;
    } else if (c === '>') {
        emit(currentToken);
        return data;
    } else if (c === EOF) {
        emit({
            type: 'EOF'
        });
        return;
    } else {
        currentAttribute = {
            name: '',
            value: ''
        };
        return attributeName(c);
    }
}

function beforeAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeValue;
    } else if (c === '"') {
        return doubleQuotedAttributeValue;
    } else if (c === '\'') {
        return singleQuotedAttributeValue;
    } else if (c === '>') {
        emit(currentToken);
        return data;
    } else {
        return unquotedAttributeValue(c);
    }
}

function doubleQuotedAttributeValue(c) {
    if (c === '"') {
        return afterQuotedAttributeValue;
    } else if (c === '\u0000') {

    } else if (c === EOF) {
        emit({
            type: 'EOF'
        });
        return;
    } else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue;
    }
}

function singleQuotedAttributeValue(c) {
    if (c === '\'') {
        return afterQuotedAttributeValue;
    } else if (c === '\u0000') {

    } else if (c === EOF) {
        emit({
            type: 'EOF'
        });
        return;
    } else {
        currentAttribute.value += c;
        return singleQuotedAttributeValue;
    }
}

function unquotedAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return beforeAttributeName;
    } else if (c === '>') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if (c === '\u0000') {

    } else if (c === '\"' || c === '\'' || c === '<' || c === '=' || c === '`') {
        return;
    } else if (c === EOF) {
        emit({
            type: 'EOF'
        });
        return;
    } else {
        currentAttribute.value += c;
        return unquotedAttributeValue;
    }
}

function afterQuotedAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    } else if (c === '/') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return selfClosingStartTag;
    } else if (c === '>') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if (c === EOF) {
        emit({
            type: 'EOF'
        });
        return;
    } else {
        return beforeAttributeName(c);
    }
}

function selfClosingStartTag(c) {
    if (c === '>') {
        currentToken.isSelfClosing = true;
        emit(currentToken);
        return data;
    } else if (c === EOF) {
        emit({
            type: 'EOF'
        });
        return;
    } else {
        return beforeAttributeName(c);
    }
}

module.exports.parseHTML = function(html) {
    let state = data;
    for (let c of html) {
        state = state(c);
    }
    state = state(EOF);
    console.log(stack[0]);
};