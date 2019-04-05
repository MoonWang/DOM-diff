/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/config.js":
/*!***********************!*\
  !*** ./lib/config.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n    REMOVE: 'REMOVE', // 节点要移除\n    TEXT: \"TEXT\", // 文本内容要改变\n    ATTRS: \"ATTRS\", // 属性要改变\n    REPLACE: \"REPLACE\", // 节点\b要整个替换  \n}\n\n//# sourceURL=webpack:///./lib/config.js?");

/***/ }),

/***/ "./lib/createElement.js":
/*!******************************!*\
  !*** ./lib/createElement.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var utils = __webpack_require__(/*! ./utils */ \"./lib/utils.js\");\n\n// 生成 Virtual DOM \nclass Element {\n    /**\n     * 一、将 DOM 节点抽象成 JS 对象结构来描述， DOM 树 -> Virtual DOM 树\n     * 描述一个节点，需要有3个维度：自己是什么节点、自己有哪些属性、自己有哪些子节点\n     * @param {String} tagName 节点名称\n     * @param {Object} attributes 属性对象\n     * @param {Array} children 子节点数组\n     */\n    constructor(tagName, attributes, children) {\n        this.tagName = tagName;\n        this.attributes = attributes;\n        this.children = children || [];\n    }\n    \n    // 二、将 Virtual DOM 转成真实 DOM 渲染，从前面的描述来入手，逐一处理\n    render() {\n        let element;\n        // 1. 自己是什么节点\n        element = document.createElement(this.tagName);\n\n        // 2. 自己有哪些属性\n        for (let attr in this.attributes) {\n            if (this.attributes.hasOwnProperty(attr)) {\n                // element.setAttribute(attr, this.attributes[attr]);\n                utils.setAttr(element, attr, this.attributes[attr]);\n            }\n        }\n\n        // 3. 自己有哪些子节点\n        this.children.forEach(child => {\n            // 判断子节点是纯文本节点还是一个标签节点\n            let childEle = (child instanceof Element) ?\n                child.render() :\n                document.createTextNode(child);\n            element.appendChild(childEle);\n        })\n\n        return element;\n    }\n}\n\n// 创建方法，每次返回一个实例\nmodule.exports = function (tagName, attributes, children) {\n    return new Element(tagName, attributes, children);\n}\n\n//# sourceURL=webpack:///./lib/createElement.js?");

/***/ }),

/***/ "./lib/diff.js":
/*!*********************!*\
  !*** ./lib/diff.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("let utils = __webpack_require__(/*! ./utils */ \"./lib/utils.js\");\nlet config = __webpack_require__(/*! ./config */ \"./lib/config.js\")\n\n// 序号就是节点在旧节点树中的索引（位置），按照\b README.md 中图示，先序遍历\nlet keyIndex = -1;\n// 记录差异的对象 { 序号: [{差异1}, {差异2}] }\nlet patches = {};\n/**\n * 计算并返回两个树的差异描述对象\n * @param {Object} oldTree 旧的 Virtual DOM 树\n * @param {Object} newTree 新的 Virtual DOM 树\n */\nfunction diff(oldTree, newTree) {\n    // 提取方法用于递归遍历对比\n    walk(oldTree, newTree);\n    return patches;\n}\n\n/**\n * 获取两个节点之间的差异变化描述\n * @param {*} oldNode 旧节点\n * @param {*} newNode 新节点\n */\nfunction walk(oldNode, newNode) {\n    ++keyIndex; // 每次进入遍历都先自加，保证 index 不出错\n    // 下面的情况是互斥的，所以没必要用数组存储，直接按 index 保存差异 obj\n    if (!utils.isString(oldNode) && !newNode) { // 不存在新节点，表示旧节点被删除\n        // 删除节点描述 type - REMOVE \n        patches[keyIndex] = {\n            type: config.REMOVE,\n            keyIndex\n        };\n        //如果说老节点的新的节点都是文本节点的话\n    } else if (utils.isString(oldNode) && utils.isString(newNode)) { // 都是文本节点\n        if (oldNode != newNode) { // 新旧文本节点的不相同，表示文本节点改变\n            // 文本节点改变 type - TEXT \n            patches[keyIndex] = {\n                type: config.TEXT,\n                content: newNode\n            };\n        }\n    } else if (oldNode.tagName == newNode.tagName) { // 节点类型相同\n        // 比较新旧元素的属性对象\n        let attrsPatch = diffAttr(oldNode.attributes, newNode.attributes);\n        // 如果新旧元素有差异的属性的话\n        if (Object.keys(attrsPatch).length > 0) {\n            // 属性节点改变 type - ATTRS \n            patches[keyIndex] = {\n                type: config.ATTRS,\n                attrs: attrsPatch\n            };\n        }\n        // 继续深递归遍历子节点\n        diffChildren(oldNode.children, newNode.children);\n    } else { // 节点不是文本节点，且节点类型也不相同，则判定为节点被替换了\n        // 节点改变 type - REPLACE \n        patches[keyIndex] = {\n            type: config.REPLACE,\n            node: newNode\n        };\n    }\n}\n\n/**\n * 获取同一个节点新旧属性的差异描述对象\n * @param {Obejct} oldAttrs 节点的旧属性对象\n * @param {Obejct} newAttrs 节点的新属性对象\n */\nfunction diffAttr(oldAttrs, newAttrs) {\n    let attrsPatch = {};\n    for (let attr in oldAttrs) {\n        //如果说老的属性和新属性不一样。一种是值改变 ，一种是属性被删除 了\n        if (oldAttrs[attr] != newAttrs[attr]) {\n            attrsPatch[attr] = newAttrs[attr];\n        }\n    }\n    for (let attr in newAttrs) {\n        if (!oldAttrs.hasOwnProperty(attr)) {\n            attrsPatch[attr] = newAttrs[attr];\n        }\n    }\n    return attrsPatch;\n}\n\n/**\n * 遍历子节点数组进行差异对比\n * @param {Array} oldChildren \n * @param {Array} newChildren \n */\nfunction diffChildren(oldChildren, newChildren) {\n    oldChildren.forEach((child, idx) => {\n        // 同位置对比\n        walk(child, newChildren[idx]);\n    });\n}\n\nmodule.exports = diff;\n\n\n//# sourceURL=webpack:///./lib/diff.js?");

/***/ }),

/***/ "./lib/patch.js":
/*!**********************!*\
  !*** ./lib/patch.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("let utils = __webpack_require__(/*! ./utils */ \"./lib/utils.js\");\nlet config = __webpack_require__(/*! ./config */ \"./lib/config.js\");\n\n// 节点在旧节点树中的索引（位置）\nlet keyIndex = -1;\n// diff 方法获取的，记录差异的对象\nvar allPatches;\n\n/**\n * 开始打补丁，从根节点开始，按照差异描述对象，按索引处理\n * @param {DOM Element} root 根节点\n * @param {Object} patches 差异描述对象\n */\nfunction patch(root, patches) {\n    allPatches = patches;\n    walk(root);\n}\n\n/**\n * 处理的顺序\n * @param {DOM Element} node \n */\nfunction walk(node) {\n    // 索引绝对递增\n    ++keyIndex;\n    let patch = allPatches[keyIndex];\n\n    // 差异上到下获取，补丁从下到上打，所以这里采用的是`后序遍历打补丁`\n    // 先遍历处理子节点\n    (node.childNodes || []).forEach(child => walk(child));\n\n    // 最后处理当前节点\n    if (patch) {\n        doPatch(node, patch);\n    }\n}\n\n/**\n * 处理具体的节点\n * @param {DOM Element} node \n * @param {Object} patch \n */\nfunction doPatch(node, patch) {\n    // 根据约定的 type 进行处理\n    switch (patch.type) {\n        case config.REMOVE: // 节点删除\n            node.parentNode.removeChild(node);\n        case config.TEXT: // 文本修改\n            node.textContent = patch.content;\n            break;\n        case config.ATTRS: // 属性修改\n            for (let attr in patch.attrs) {\n                let value = patch.attrs[attr];\n                if (value) {\n                    utils.setAttr(node, attr, value);\n                } else {\n                    node.removeAttribute(attr);\n                }\n            }\n            break;\n        case config.REPLACE: // 节点替换\n            let newNode = (patch.node instanceof Element) ?\n                patch.node.render() : \n                document.createTextNode(patch.node);\n            node.parentNode.replaceChild(newNode, node);\n            break;\n    }\n}\nmodule.exports = patch;\n\n//# sourceURL=webpack:///./lib/patch.js?");

/***/ }),

/***/ "./lib/utils.js":
/*!**********************!*\
  !*** ./lib/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n    // 设置属性，需要根据元素类型+属性类型来做特殊处理\n    setAttr(element, attr, value) {\n        switch (attr) {\n            case 'style':\n                element.style.cssText = value;\n                break;\n            case 'value':\n                let tagName = element.tagName.toLowerCase();\n                if (tagName == 'input' || tagName == 'textarea') {\n                    element.value = value;\n                } else {\n                    element.setAttribute(attr, value);\n                }\n                break;\n            default:\n                element.setAttribute(attr, value);\n                break;\n        }\n    },\n    // 获取对象类型\n    getType(obj) {\n        // [object String]\n        return Object.prototype.toString.call(obj).replace(/\\[object\\s|\\]/g, '');\n    },\n    // 判断是否为字符串类型\n    isString(str) {\n        return this.getType(str) == 'String';\n    }\n}\n\n//# sourceURL=webpack:///./lib/utils.js?");

/***/ }),

/***/ "./src/3.js":
/*!******************!*\
  !*** ./src/3.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// test3: 根据 test2 的结果打补丁\n\nlet createElement = __webpack_require__(/*! lib/createElement */ \"./lib/createElement.js\");\nlet diff = __webpack_require__(/*! lib/diff */ \"./lib/diff.js\");\nlet patch = __webpack_require__(/*! lib/patch */ \"./lib/patch.js\");\n\nlet ul1 = createElement('div', {class: 'div'}, [\n    createElement('p', {class: 'p'}, ['p标签']),\n    createElement('ul', {class: 'ul'}, [\n        createElement('li', {class: 'li1'}),\n        createElement('li', {class: 'li2'}),\n        createElement('li', {class: 'li3'}),\n    ]),\n    createElement('div', {class: 'div'}, ['div标签'])\n]);\n\nlet root = ul1.render();\ndocument.body.appendChild(root);\n\nlet ul2 = createElement('div', {class: 'div'}, [\n    createElement('p', {class: 'p'}, ['p标签1']),\n    createElement('ul', {class: 'ul1'}, [\n        createElement('li', {class: 'li1'}),\n        // createElement('li', {class: 'li2'}),\n        createElement('li', {class: 'li3'}),\n    ]),\n    createElement('div', {class: 'div1'}, ['div标签'])\n]);\n\nconsole.log(ul1, ul2);\nvar patches = diff(ul1, ul2);\nconsole.log(patches);\n\npatch(root, patches);\n\n//# sourceURL=webpack:///./src/3.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("console.log('DOM-diff');\n\n// require('./1.js');\n// require('./2.js');\n__webpack_require__(/*! ./3.js */ \"./src/3.js\");\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });