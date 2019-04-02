module.exports = {
    // 设置属性，需要根据元素类型+属性类型来做特殊处理
    setAttr(element, attr, value) {
        switch (attr) {
            case 'style':
                element.style.cssText = value;
                break;
            case 'value':
                let tagName = element.tagName.toLowerCase();
                if (tagName == 'input' || tagName == 'textarea') {
                    element.value = value;
                } else {
                    element.setAttribute(attr, value);
                }
                break;
            default:
                element.setAttribute(attr, value);
                break;
        }
    },
    // 获取对象类型
    getType(obj) {
        // [object String]
        return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '');
    },
    // 判断是否为字符串类型
    isString(str) {
        return this.getType(str) == 'String';
    }
}