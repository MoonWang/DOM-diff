let utils = require('./utils');
let config = require('./config');

// 节点在旧节点树中的索引（位置）
let keyIndex = -1;
// diff 方法获取的，记录差异的对象
var allPatches;

/**
 * 开始打补丁，从根节点开始，按照差异描述对象，按索引处理
 * @param {DOM Element} root 根节点
 * @param {Object} patches 差异描述对象
 */
function patch(root, patches) {
    allPatches = patches;
    walk(root);
}

/**
 * 处理的顺序
 * @param {DOM Element} node 
 */
function walk(node) {
    // 索引绝对递增
    ++keyIndex;
    let patch = allPatches[keyIndex];

    // 差异上到下获取，补丁从下到上打，所以这里采用的是`后序遍历打补丁`
    // 先遍历处理子节点
    (node.childNodes || []).forEach(child => walk(child));

    // 最后处理当前节点
    if (patch) {
        doPatch(node, patch);
    }
}

/**
 * 处理具体的节点
 * @param {DOM Element} node 
 * @param {Object} patch 
 */
function doPatch(node, patch) {
    // 根据约定的 type 进行处理
    switch (patch.type) {
        case config.REMOVE: // 节点删除
            node.parentNode.removeChild(node);
        case config.TEXT: // 文本修改
            node.textContent = patch.content;
            break;
        case config.ATTRS: // 属性修改
            for (let attr in patch.attrs) {
                let value = patch.attrs[attr];
                if (value) {
                    utils.setAttr(node, attr, value);
                } else {
                    node.removeAttribute(attr);
                }
            }
            break;
        case config.REPLACE: // 节点替换
            let newNode = (patch.node instanceof Element) ?
                patch.node.render() : 
                document.createTextNode(patch.node);
            node.parentNode.replaceChild(newNode, node);
            break;
    }
}
module.exports = patch;