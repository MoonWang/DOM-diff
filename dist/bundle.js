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

/***/ "./lib/createElement.js":
/*!******************************!*\
  !*** ./lib/createElement.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var utils = __webpack_require__(/*! ./utils */ \"./lib/utils.js\");\n\n// 生成 Virtual DOM \nclass Element {\n    /**\n     * 一、将 DOM 节点抽象成 JS 对象结构来描述， DOM 树 -> Virtual DOM 树\n     * 描述一个节点，需要有3个维度：自己是什么节点、自己有哪些属性、自己有哪些子节点\n     * @param {String} tagName 节点名称\n     * @param {Object} attributes 属性对象\n     * @param {Array} children 子节点数组\n     */\n    constructor(tagName, attributes, children) {\n        this.tagName = tagName;\n        this.attributes = attributes;\n        this.children = children || [];\n    }\n    \n    // 二、将 Virtual DOM 转成真实 DOM 渲染，从前面的描述来入手，逐一处理\n    render() {\n        let element;\n        // 1. 自己是什么节点\n        element = document.createElement(this.tagName);\n\n        // 2. 自己有哪些属性\n        for (let attr in this.attributes) {\n            if (this.attributes.hasOwnProperty(attr)) {\n                // element.setAttribute(attr, this.attributes[attr]);\n                utils.setAttr(element, attr, this.attributes[attr]);\n            }\n        }\n\n        // 3. 自己有哪些子节点\n        this.children.forEach(child => {\n            // 判断子节点是纯文本节点还是一个标签节点\n            let childEle = (child instanceof Element) ?\n                child.render() :\n                document.createTextNode(child);\n            element.appendChild(childEle);\n        })\n\n        return element;\n    }\n}\n\n// 创建方法，每次返回一个实例\nmodule.exports = function (tagName, attributes, children) {\n    return new Element(tagName, attributes, children);\n}\n\n//# sourceURL=webpack:///./lib/createElement.js?");

/***/ }),

/***/ "./lib/utils.js":
/*!**********************!*\
  !*** ./lib/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n    // 设置属性，需要根据元素类型+属性类型来做特殊处理\n    setAttr(element, attr, value) {\n        switch (attr) {\n            case 'style':\n                element.style.cssText = value;\n                break;\n            case 'value':\n                let tagName = element.tagName.toLowerCase();\n                if (tagName == 'input' || tagName == 'textarea') {\n                    element.value = value;\n                } else {\n                    element.setAttribute(attr, value);\n                }\n                break;\n            default:\n                element.setAttribute(attr, value);\n                break;\n        }\n    },\n}\n\n//# sourceURL=webpack:///./lib/utils.js?");

/***/ }),

/***/ "./src/1.js":
/*!******************!*\
  !*** ./src/1.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// test1: 用描述创建节点\n\nlet createElement = __webpack_require__(/*! lib/createElement */ \"./lib/createElement.js\");\n\nlet ul = createElement('ul', {class: 'my_ul'}, [\n    createElement('li', {class: 'my_li_1'}, ['1']),\n    createElement('li', {class: 'my_li_2'}, ['2']),\n    createElement('li', {class: 'my_li_3'}, ['3'])\n]);\n\ndocument.body.appendChild(ul.render());\n\n//# sourceURL=webpack:///./src/1.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("console.log('DOM-diff');\n\n__webpack_require__(/*! ./1.js */ \"./src/1.js\");\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });