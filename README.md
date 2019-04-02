# 简单实现 DOM-diff

## 引入

前端开发关于性能优化有一个原则：**尽量减少 DOM 操作**。因为 DOM 操作会引起浏览器的重绘、回流，这就是比一个 js 语句执行慢很多的过程。而 React 在方面的表现格外优异，性能强大、渲染效率高。

在 React 中，在 JSX 到 DOM 的转换过程中，会先构建 `Virtual DOM` ，也就是虚拟节点，它通过 Javascript 的 Object 对象模拟 DOM 中的节点，然后再通过特定的 render 方法将其渲染成真实的 DOM 节点。

每次更新时，自上而下渲染 React 组件，都会对比此次和上次的 Virtual DOM ，然后只修改其中的差别部分，**只做最小的必要改动，以此提高渲染效率**。

更新中这个“找不同”的过程，叫做`调和（Reconciliation）`，它的实现就是依赖于我们要实现的 `DOM diff 算法`。 DOM diff 则是通过 Javascript 层面的计算，返回一个 `patch` 对象（即补丁对象），在通过特定的操作解析 patch 对象，完成页面的重新渲染。

## 过程（思路）

1. 生成 Virtual DOM 
    - 用 JavaScript 对象模拟 DOM
2. 渲染 DOM 
    - 把 Virtual DOM 转成真实 DOM 并插入页面中
3. 修改 Virtual DOM
    - 根据更新内容修改 Virtual DOM
4. 差异比较
    - 比较两棵 Virtual DOM 树的差异，得到差异对象 patch
5. 更新 DOM 
    - 把差异对象应用到真正的 DOM 树上

## 一、创建+渲染 Virtual DOM 

## 1、描述 

> 将 DOM 节点抽象成 JS 对象结构来描述，即将 DOM 树转换成 Virtual DOM 树。

描述一个节点有以下三项内容：
- 节点类型 String
- 节点属性 Object
- 子节点 Array

## 2、渲染

> 将 Vritual DOM 数渲染成真实 DOM 节点，插入 HTML 文档中

按照上面三项内容逐一处理：
- 创建节点
    - document.createElement(tagName);
- 添加属性
    - Element.setAttribute(name, value);
- 生成子节点
    - 说明
        - 生成子节点应该是在生成父节点之后，所以 render 的过程是`先序遍历`
    - 创建
        - 文本类型
            - document.createTextNode(data)
        - 节点类型
            - 调用子节点 render 方法，递归处理
    - 插入
        - father.appendChild(child);

## 3、测试

见 src/1.js 