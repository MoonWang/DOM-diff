let utils = require('./utils');
let config = require('./config')

// 序号就是节点在旧节点树中的索引（位置），按照 README.md 中图示，先序遍历
let keyIndex = -1;
// 记录差异的对象 { 序号: [{差异1}, {差异2}] }
let patches = {};
/**
 * 计算并返回两个树的差异描述对象
 * @param {Object} oldTree 旧的 Virtual DOM 树
 * @param {Object} newTree 新的 Virtual DOM 树
 */
function diff(oldTree, newTree) {
    // 提取方法用于递归遍历对比
    walk(oldTree, newTree);
    return patches;
}

/**
 * 获取两个节点之间的差异变化描述
 * @param {*} oldNode 旧节点
 * @param {*} newNode 新节点
 */
function walk(oldNode, newNode) {
    ++keyIndex; // 每次进入遍历都先自加，保证 index 不出错
    let currentPatches = []; //这个数组里记录了所有的oldNode的变化
    if (!utils.isString(oldNode) && !newNode) { // 不存在新节点，表示旧节点被删除
        // 删除节点描述 type - REMOVE 
        currentPatches.push({
            type: config.REMOVE,
            keyIndex
        });
        //如果说老节点的新的节点都是文本节点的话
    } else if (utils.isString(oldNode) && utils.isString(newNode)) { // 都是文本节点
        if (oldNode != newNode) { // 新旧文本节点的不相同，表示文本节点改变
            // 文本节点改变 type - TEXT 
            currentPatches.push({
                type: config.TEXT,
                content: newNode
            });
        }
    } else if (oldNode.tagName == newNode.tagName) { // 节点类型相同
        // 比较新旧元素的属性对象
        let attrsPatch = diffAttr(oldNode.attributes, newNode.attributes);
        // 如果新旧元素有差异的属性的话
        if (Object.keys(attrsPatch).length > 0) {
            // 属性节点改变 type - ATTRS 
            currentPatches.push({
                type: config.ATTRS,
                attrs: attrsPatch
            });
        }
        // 继续深递归遍历子节点
        diffChildren(oldNode.children, newNode.children);
    } else { // 节点不是文本节点，且节点类型也不相同，则判定为节点被替换了
        // 节点改变 type - REPLACE 
        currentPatches.push({
            type: config.REPLACE,
            node: newNode
        });
    }

    if (currentPatches.length > 0) {
        patches[keyIndex] = currentPatches;
    }
}

/**
 * 获取同一个节点新旧属性的差异描述对象
 * @param {Obejct} oldAttrs 节点的旧属性对象
 * @param {Obejct} newAttrs 节点的新属性对象
 */
function diffAttr(oldAttrs, newAttrs) {
    let attrsPatch = {};
    for (let attr in oldAttrs) {
        //如果说老的属性和新属性不一样。一种是值改变 ，一种是属性被删除 了
        if (oldAttrs[attr] != newAttrs[attr]) {
            attrsPatch[attr] = newAttrs[attr];
        }
    }
    for (let attr in newAttrs) {
        if (!oldAttrs.hasOwnProperty(attr)) {
            attrsPatch[attr] = newAttrs[attr];
        }
    }
    return attrsPatch;
}

/**
 * 遍历子节点数组进行差异对比
 * @param {Array} oldChildren 
 * @param {Array} newChildren 
 */
function diffChildren(oldChildren, newChildren) {
    oldChildren.forEach((child, idx) => {
        // 同位置对比
        walk(child, newChildren[idx]);
    });
}

module.exports = diff;
