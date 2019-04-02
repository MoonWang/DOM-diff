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
}