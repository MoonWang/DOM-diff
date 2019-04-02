// test2: 对比两个树，获取差异

let createElement = require('lib/createElement');
let diff = require('lib/diff');

let ul1 = createElement('ul', {class: 'my_ul'}, [
    createElement('li', {class: 'my_li_1'}, ['1']),
    createElement('li', {class: 'my_li_2'}, ['2']),
    createElement('li', {class: 'my_li_3'}, ['3'])
]);
let ul2 = createElement('ul', {class: 'my_ul'}, [
    // createElement('li', {class: 'my_li_1'}, ['1']),
    createElement('li', {class: 'my_li_2'}, ['2']),
    // createElement('li', {class: 'my_li_3'}, ['3'])
]);

console.log(ul1, ul2);
console.log(diff(ul1, ul2));