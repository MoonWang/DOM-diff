// test3: 根据 test2 的结果打补丁

let createElement = require('lib/createElement');
let diff = require('lib/diff');
let patch = require('lib/patch');

let ul1 = createElement('div', {class: 'div'}, [
    createElement('p', {class: 'p'}, ['p标签']),
    createElement('ul', {class: 'ul'}, [
        createElement('li', {class: 'li1'}),
        createElement('li', {class: 'li2'}),
        createElement('li', {class: 'li3'}),
    ]),
    createElement('div', {class: 'div'}, ['div标签'])
]);

let root = ul1.render();
document.body.appendChild(root);

let ul2 = createElement('div', {class: 'div'}, [
    createElement('p', {class: 'p'}, ['p标签1']),
    createElement('ul', {class: 'ul1'}, [
        createElement('li', {class: 'li1'}),
        // createElement('li', {class: 'li2'}),
        createElement('li', {class: 'li3'}),
    ]),
    createElement('div', {class: 'div1'}, ['div标签'])
]);

console.log(ul1, ul2);
var patches = diff(ul1, ul2);
console.log(patches);

patch(root, patches);