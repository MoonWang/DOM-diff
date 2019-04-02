// 生成 Virtual DOM 
class Element {
    /**
     * 一、将 DOM 节点抽象成 JS 对象结构来描述， DOM 树 -> Virtual DOM 树
     * 描述一个节点，需要有3个维度：自己是什么节点、自己有哪些属性、自己有哪些子节点
     * @param {String} tagName 节点名称
     * @param {Object} attributes 属性对象
     * @param {Array} children 子节点数组
     */
    constructor(tagName, attributes, children) {
        this.tagName = tagName;
        this.attributes = attributes;
        this.children = children || [];
    }
    
    // 二、将 Virtual DOM 转成真实 DOM 渲染，从前面的描述来入手，逐一处理
    render() {
        let element;
        // 1. 自己是什么节点
        element = document.createElement(this.tagName);

        // 2. 自己有哪些属性
        for (let attr in this.attributes) {
            if (this.attributes.hasOwnProperty(attr)) {
                element.setAttribute(attr, this.attributes[attr]);
            }
        }

        // 3. 自己有哪些子节点
        this.children.forEach(child => {
            // 判断子节点是纯文本节点还是一个标签节点
            let childEle = (child instanceof Element) ?
                child.render() :
                document.createTextNode(child);
            element.appendChild(childEle);
        })

        return element;
    }
}

// 创建方法，每次返回一个实例
module.exports = function (tagName, attributes, children) {
    return new Element(tagName, attributes, children);
}