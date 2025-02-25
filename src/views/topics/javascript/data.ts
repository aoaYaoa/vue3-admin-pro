// JavaScript 题目列表数据
interface Topic {
    id: number;
    title: string;
    tags: string[];
    difficulty: string;
}

export const topicList: Topic[] = [
    {
      id: 39,
      title: '以下哪段代码运行效率更高？为什么？',
      tags: ['优化', '性能'],
      difficulty: '中等'
    },
    {
      id: 40,
      title: '以下哪段代码效率更高？为什么？',
      tags: ['优化', '性能'],
      difficulty: '中等'
    },
    {
      id: 41,
      title: '如何判断 object 为空',
      tags: ['对象', '判断'],
      difficulty: '简单'
    },
    {
      id: 42,
      title: '强制类型转换、隐式类型转换',
      tags: ['类型转换'],
      difficulty: '中等'
    },
    {
      id: 43,
      title: '== 和 === 的区别',
      tags: ['比较', '运算符'],
      difficulty: '简单'
    },
    {
      id: 44,
      title: 'javascript 的数据类型有哪些',
      tags: ['基础', '数据类型'],
      difficulty: '简单'
    },
    {
      id: 45,
      title: 'javascript 变量在内存中的具体存储形式',
      tags: ['内存', '变量'],
      difficulty: '中等'
    },
    {
      id: 46,
      title: 'JS 单线程设计的目的',
      tags: ['基础', '单线程'],
      difficulty: '中等'
    },
    {
      id: 47,
      title: '如何判断 javascript 的数据类型？',
      tags: ['类型判断'],
      difficulty: '简单'
    },
    {
      id: 48,
      title: 'ES 每个版本引入了什么新特性？',
      tags: ['ES6+', '新特性'],
      difficulty: '中等'
    },
    {
      id: 49,
      title: 'let 声明变量的特性',
      tags: ['ES6', '变量声明'],
      difficulty: '简单'
    },
    {
      id: 50,
      title: '变量提升 & 函数提升 (var, let, const, function)',
      tags: ['提升', '作用域'],
      difficulty: '中等'
    },
    {
      id: 51,
      title: '如何判断对象相等',
      tags: ['对象', '比较'],
      difficulty: '中等'
    },
    {
      id: 52,
      title: 'null 和 undefined 的区别',
      tags: ['基础', '类型'],
      difficulty: '简单'
    },
    {
      id: 53,
      title: '用 setTimeout 来实现倒计时有什么问题？',
      tags: ['定时器', '异步'],
      difficulty: '中等'
    },
    {
      id: 54,
      title: 'JS 事件循环机制 - 宏任务和微任务',
      tags: ['事件循环', '异步'],
      difficulty: '困难'
    },
    {
      id: 55,
      title: '事件循环 - 以下代码输出顺序',
      tags: ['事件循环', '输出顺序'],
      difficulty: '困难'
    },
    {
      id: 56,
      title: '事件循环进阶 (1)',
      tags: ['事件循环', '进阶'],
      difficulty: '困难'
    },
    {
      id: 57,
      title: '事件循环进阶 (2)',
      tags: ['事件循环', '进阶'],
      difficulty: '困难'
    },
    {
      id: 58,
      title: '事件循环进阶 (3)',
      tags: ['事件循环', '进阶'],
      difficulty: '困难'
    },
    {
      id: 59,
      title: '事件循环进阶 (4)',
      tags: ['事件循环', '进阶'],
      difficulty: '困难'
    },
    {
      id: 60,
      title: '什么是内存泄漏',
      tags: ['内存', '性能优化'],
      difficulty: '中等'
    },
    {
      id: 61,
      title: '什么是闭包，有什么作用？',
      tags: ['闭包', '作用域'],
      difficulty: '中等'
    },
    {
      id: 62,
      title: '常用的 console 方法有哪些？',
      tags: ['调试', '工具'],
      difficulty: '简单'
    },
    {
      id: 63,
      title: '数组去重的方法',
      tags: ['数组', '算法'],
      difficulty: '简单'
    },
    {
      id: 64,
      title: 'JS 数组常见操作方式及返回值',
      tags: ['数组', '方法'],
      difficulty: '中等'
    },
    {
      id: 65,
      title: 'JS 数组 reduce 方法的使用',
      tags: ['数组', '函数式编程'],
      difficulty: '中等'
    },
    {
      id: 66,
      title: '如何遍历对象',
      tags: ['对象', '遍历'],
      difficulty: '简单'
    },
    {
      id: 67,
      title: '创建函数的几种方式',
      tags: ['函数', '基础'],
      difficulty: '简单'
    },
    {
      id: 68,
      title: '创建对象的几种方式',
      tags: ['对象', '创建模式'],
      difficulty: '中等'
    },
    {
      id: 69,
      title: '宿主对象、内置对象、原生对象的区别',
      tags: ['对象', '概念'],
      difficulty: '中等'
    },
    {
      id: 70,
      title: '如何区分数组和对象？',
      tags: ['类型判断', '数组'],
      difficulty: '简单'
    },
    {
      id: 71,
      title: '什么是类数组（伪数组）？有哪些？',
      tags: ['类数组', '概念'],
      difficulty: '中等'
    },
    {
      id: 72,
      title: '什么是作用域链',
      tags: ['作用域', '原理'],
      difficulty: '中等'
    },
    {
      id: 73,
      title: '作用域链如何延长',
      tags: ['作用域', '原理'],
      difficulty: '中等'
    },
    {
      id: 74,
      title: 'DOM 节点的 Attribute 和 Property 的区别',
      tags: ['DOM', '属性'],
      difficulty: '中等'
    },
    {
      id: 75,
      title: 'DOM 结构操作创建、添加、删除、修改',
      tags: ['DOM', '操作'],
      difficulty: '中等'
    },
    {
      id: 76,
      title: 'DOM 的事件模型',
      tags: ['DOM', '事件'],
      difficulty: '中等'
    },
    {
      id: 77,
      title: '事件三要素',
      tags: ['DOM', '事件'],
      difficulty: '简单'
    },
    {
      id: 78,
      title: '如何绑定事件，解除事件',
      tags: ['DOM', '事件'],
      difficulty: '简单'
    },
    {
      id: 79,
      title: '事件冒泡和事件捕获的区别',
      tags: ['DOM', '事件'],
      difficulty: '中等'
    },
    {
      id: 80,
      title: '事件委托',
      tags: ['DOM', '事件', '性能优化'],
      difficulty: '中等'
    },
    {
      id: 81,
      title: 'JavaScript 动画和 CSS 动画的区别',
      tags: ['动画', '性能'],
      difficulty: '中等'
    },
    {
      id: 82,
      title: '获取元素位置？',
      tags: ['DOM', '位置'],
      difficulty: '简单'
    },
    {
      id: 83,
      title: 'document.write 和 innerHTML 的区别',
      tags: ['DOM', '操作'],
      difficulty: '简单'
    },
    {
      id: 84,
      title: 'mouseover 和 mouseenter 的区别',
      tags: ['DOM', '事件'],
      difficulty: '中等'
    },
    {
      id: 85,
      title: '元素拖动实现方案',
      tags: ['DOM', '拖拽', '交互'],
      difficulty: '中等'
    },
    {
      id: 86,
      title: 'script 标签 async 和 defer 的区别',
      tags: ['HTML', '性能优化'],
      difficulty: '中等'
    },
    {
      id: 87,
      title: 'ES6 的继承和 ES5 的继承有什么区别',
      tags: ['ES6', '继承', 'class'],
      difficulty: '中等'
    },
    {
      id: 88,
      title: 'Promise',
      tags: ['异步', 'ES6'],
      difficulty: '中等'
    },
    {
      id: 89,
      title: 'Promise all/allSettle/any/race 的区别',
      tags: ['Promise', '异步'],
      difficulty: '中等'
    },
    {
      id: 90,
      title: '如何解决异步回调地狱',
      tags: ['异步', '模式'],
      difficulty: '中等'
    },
    {
      id: 91,
      title: '链式调用实现方式',
      tags: ['设计模式', '函数式'],
      difficulty: '中等'
    },
    {
      id: 92,
      title: 'new 操作符内在逻辑',
      tags: ['原型', '构造函数'],
      difficulty: '中等'
    },
    {
      id: 93,
      title: 'bind, apply, call 的区别',
      tags: ['函数', 'this'],
      difficulty: '中等'
    },
    {
      id: 94,
      title: 'Ajax 避免浏览器缓存方法',
      tags: ['Ajax', '缓存'],
      difficulty: '简单'
    },
    {
      id: 95,
      title: 'eval 的功能和危害',
      tags: ['安全', '反模式'],
      difficulty: '中等'
    },
    {
      id: 96,
      title: '惰性函数',
      tags: ['性能优化', '函数'],
      difficulty: '中等'
    },
    {
      id: 97,
      title: 'JS 监听对象属性的改变',
      tags: ['对象', '观察者模式'],
      difficulty: '中等'
    },
    {
      id: 98,
      title: 'prototype 和 __proto__ 的区别',
      tags: ['原型', '继承'],
      difficulty: '中等'
    },
    {
      id: 99,
      title: '原型链的实践 - 以下代码输出什么？',
      tags: ['原型', '原型链'],
      difficulty: '中等'
    },
    {
      id: 100,
      title: '如何理解 箭头函数 没有自己的this?',
      tags: ['ES6', '箭头函数', 'this'],
      difficulty: '中等'
    },
    {
      id: 101,
      title: '上下文与 this 指向',
      tags: ['this', '上下文'],
      difficulty: '中等'
    },
    {
      id: 102,
      title: '上下文与 this 指向 (1)',
      tags: ['this', '上下文'],
      difficulty: '中等'
    },
    {
      id: 103,
      title: '上下文与 this 指向 (2)',
      tags: ['this', '上下文'],
      difficulty: '中等'
    },
    {
      id: 104,
      title: '去除字符串首尾空格',
      tags: ['字符串', '方法'],
      difficulty: '简单'
    },
    {
      id: 105,
      title: 'Symbol 特性与作用',
      tags: ['ES6', 'Symbol'],
      difficulty: '中等'
    },
    {
      id: 106,
      title: 'String 的 startwith 和 includes 的区别',
      tags: ['字符串', '方法'],
      difficulty: '简单'
    },
    {
      id: 107,
      title: '字符串转数字的方法',
      tags: ['类型转换', '字符串'],
      difficulty: '简单'
    },
    {
      id: 108,
      title: 'promise 和 await/async 的区别',
      tags: ['异步', 'Promise', 'async/await'],
      difficulty: '中等'
    },
    {
      id: 109,
      title: 'Array.prototype.sort 内部实现原理',
      tags: ['数组', '算法'],
      difficulty: '困难'
    },
    {
      id: 110,
      title: 'JS 装箱机制 (auto boxing)',
      tags: ['基础概念', '类型系统'],
      difficulty: '中等'
    },
    {
      id: 111,
      title: '函数传值',
      tags: ['函数', '参数传递'],
      difficulty: '中等'
    },
    {
      id: 112,
      title: '不同类型宏任务的优先级',
      tags: ['事件循环', '宏任务'],
      difficulty: '困难'
    }
  ]