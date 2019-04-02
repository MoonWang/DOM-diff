// test1: 用描述创建节点

let createElement = require('lib/createElement');

let ul = createElement('ul', {class: 'my_ul'}, [
    createElement('li', {class: 'my_li_1'}, ['1']),
    createElement('li', {class: 'my_li_2'}, ['2']),
    createElement('li', {class: 'my_li_3'}, ['3'])
]);

document.body.appendChild(ul.render());