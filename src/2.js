// test2: 对比两个树，获取差异

let createElement = require('lib/createElement');
let diff = require('lib/diff');

let ul1 = createElement('div', {class: 'div'}, [
    createElement('p', {class: 'p'}, ['p标签']),
    createElement('ul', {class: 'ul'}, [
        createElement('li', {class: 'li1'}),
        createElement('li', {class: 'li2'}),
        createElement('li', {class: 'li3'}),
    ]),
    createElement('div', {class: 'div'}, ['div标签'])
]);

document.body.appendChild(ul1.render());

let ul2 = createElement('div', {class: 'div'}, [
    createElement('p', {class: 'p'}, ['p标签1']),
    createElement('ul', {class: 'ul'}, [
        createElement('li', {class: 'li1'}),
        // createElement('li', {class: 'li2'}),
        createElement('li', {class: 'li3'}),
    ]),
    createElement('div', {class: 'div1'}, ['div标签'])
]);

console.log(ul1, ul2);
console.log(diff(ul1, ul2));