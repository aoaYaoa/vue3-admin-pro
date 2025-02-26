const questions80= [

  {
    id: 71,
    title: "什么是类数组（伪数组）？有哪些？",
    tags: ["类数组", "概念"],
    difficulty: "中等",
    code: `// arguments对象 - 函数内部的类数组对象
function example() {
  console.log(arguments);
  console.log(Array.isArray(arguments)); // false
  console.log(arguments.length); // 3
  console.log(arguments[0]); // 1
  
  // 尝试使用数组方法 (会报错)
  // arguments.forEach(item => console.log(item));
  
  // 转换为真正的数组
  const args1 = Array.from(arguments);
  const args2 = [...arguments];
  const args3 = Array.prototype.slice.call(arguments);
  
  // 转换后可以使用数组方法
  args1.forEach(item => console.log(item));
}

example(1, 2, 3);

// DOM集合也是类数组
const divs = document.querySelectorAll('div');
console.log(Array.isArray(divs)); // false
console.log(divs.length); // 取决于页面中div的数量
console.log(divs[0]); // 第一个div元素

// 自定义类数组对象
const arrayLike = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
};

console.log(arrayLike[0]); // 'a'
console.log(arrayLike.length); // 3

// 将类数组转换为数组的方法
const realArray1 = Array.from(arrayLike);
const realArray2 = Array.prototype.slice.call(arrayLike);
const realArray3 = [...arrayLike]; // 注意：仅适用于可迭代的类数组

// 检查是否为类数组
function isArrayLike(obj) {
  return obj && 
         typeof obj === 'object' && 
         typeof obj.length === 'number' && 
         obj.length >= 0 && 
         obj.length === Math.floor(obj.length);
}

console.log(isArrayLike(arrayLike)); // true
console.log(isArrayLike([1, 2, 3])); // true (数组也符合类数组的特征)
console.log(isArrayLike('string')); // true (字符串也是类数组)
console.log(isArrayLike({})); // false`,
    answer: `## 类数组对象（伪数组）详解

类数组对象（Array-like Object，也称为伪数组）是一种**拥有数字索引和length属性**的对象，但它**不具备数组的内置方法**（如forEach, map, filter等）。

### 1. 常见类数组对象

JavaScript 中常见的类数组对象包括：

1. **函数内的 arguments 对象**：包含传递给函数的所有参数
2. **DOM 集合**：如 document.getElementsByTagName()、document.querySelectorAll() 返回的结果
3. **字符串**：可以通过索引访问字符，有 length 属性
4. **HTMLCollection**：如 element.children
5. **NodeList**：如 node.childNodes
6. **自定义的拥有索引和 length 属性的对象**

### 2. 类数组对象的特征

类数组对象通常具有以下特征：

- 有 **length 属性**，表示元素数量
- 可以通过**非负整数索引**访问元素（如 obj[0]）
- 不继承 Array.prototype，**没有数组方法**
- 通常是**对象类型**（typeof 返回 'object'）
- **Array.isArray() 返回 false**

### 3. 类数组对象与真正数组的区别

| 特征 | 数组 | 类数组对象 |
|------|------|------------|
| 数据访问 | obj[i] | obj[i] |
| length 属性 | ✅ | ✅ |
| Array.isArray() | ✅ true | ❌ false |
| 数组方法 (map, forEach等) | ✅ 内置 | ❌ 不可直接使用 |
| instanceof Array | ✅ true | ❌ false |
| 原型链 | Array.prototype | 通常是 Object.prototype |

### 4. 将类数组转换为真正的数组

可以使用以下方法将类数组对象转换为真正的数组：

1. **Array.from()** (ES6)：
   \`\`\`js
   const array = Array.from(arrayLike);
   \`\`\`

2. **展开运算符** (ES6)：
   \`\`\`js
   const array = [...arrayLike]; // 注意：仅适用于可迭代的类数组
   \`\`\`

3. **Array.prototype.slice.call()**：
   \`\`\`js
   const array = Array.prototype.slice.call(arrayLike);
   // 或
   const array = [].slice.call(arrayLike);
   \`\`\`

4. **Array.prototype.concat.apply()**：
   \`\`\`js
   const array = Array.prototype.concat.apply([], arrayLike);
   \`\`\`

### 5. 类数组对象的应用场景

1. **函数参数处理**：使用 arguments 对象获取所有参数
2. **DOM 操作**：处理选择器返回的元素集合
3. **字符串处理**：利用字符串的类数组特性进行操作

### 6. 现代JavaScript中的替代方案

在现代JavaScript中，有更好的替代方案：

1. 使用**剩余参数**替代arguments：
   \`\`\`js
   function example(...args) {
     // args 是真正的数组
     args.forEach(arg => console.log(arg));
   }
   \`\`\`

2. 使用**Array方法**直接转换DOM集合：
   \`\`\`js
   Array.from(document.querySelectorAll('div')).forEach(div => {
     // 处理每个div
   });
   \`\`\`

3. 使用**Array.from的映射功能**：
   \`\`\`js
   Array.from(arrayLike, x => x * 2); // 转换并映射
   \`\`\`

了解类数组对象对于处理DOM API返回的结果以及函数参数特别有用，能够有效地进行数据转换和处理。`
  },
  {
    id: 72,
    title: "什么是作用域链",
    tags: ["作用域", "原理"],
    difficulty: "中等",
    code: `// 全局作用域
const global = "我是全局变量";

function outer() {
  // outer函数作用域
  const outer1 = "outer函数的变量1";
  const outer2 = "outer函数的变量2";
  
  function inner() {
    // inner函数作用域
    const inner1 = "inner函数的变量";
    
    // inner函数内部可以访问所有外部变量
    console.log(inner1); // "inner函数的变量"
    console.log(outer1); // "outer函数的变量1"
    console.log(outer2); // "outer函数的变量2"
    console.log(global); // "我是全局变量"
  }
  
  // outer函数可以访问自己的变量和全局变量
  console.log(outer1);  // "outer函数的变量1"
  console.log(global);  // "我是全局变量"
  // console.log(inner1); // 错误: inner1 is not defined
  
  inner();
}

outer();

// 作用域链查找变量示例
let value = "全局value";

function foo() {
  console.log(value); // "全局value" - 沿作用域链向上查找
}

function bar() {
  let value = "bar的value";
  foo(); // 输出 "全局value"，而不是 "bar的value"
}

function baz() {
  let value = "baz的value";
  
  function nested() {
    console.log(value); // "baz的value" - 在baz的作用域中找到了value
  }
  
  nested();
}

bar();
baz();`,
    answer: `## 作用域链详解

作用域链是 JavaScript 中用于解析变量值的一种机制，它由当前执行上下文的变量对象及其所有父级执行上下文的变量对象组成，呈链式结构。

### 1. 作用域链的定义

作用域链可以理解为一个指针列表，每个指针指向一个变量对象。查找变量时，会沿着这个链条由内向外查找，直到找到变量或到达全局作用域。

作用域链的结构可以表示为：
\`当前作用域 → 上一级作用域 → ... → 全局作用域\`

### 2. 作用域链的形成过程

作用域链的形成过程与函数调用密切相关：

1. **创建阶段**：当函数被创建时，会将父级作用域的引用保存在函数的内部属性 [[Environment]] 中
2. **执行阶段**：当函数执行时，会创建一个新的执行上下文和变量对象，并将这个变量对象放在作用域链的前端
3. **链接形成**：函数的作用域链由当前变量对象和[[Environment]]引用的父级作用域链组成

### 3. 变量查找机制

当访问一个变量时，JavaScript 引擎会按照以下流程工作：

1. 首先在当前执行上下文的变量对象中查找该变量
2. 如果未找到，则沿着作用域链向上查找父级作用域的变量对象
3. 重复步骤2，直到找到该变量或到达全局作用域
4. 如果在全局作用域中仍未找到，则抛出 ReferenceError 异常

这种查找机制遵循"就近原则"，即优先使用最近作用域中的变量。

### 4. 作用域链与闭包的关系

闭包是基于作用域链实现的：

- 当内部函数引用了外部函数的变量时，即使外部函数执行完毕，其变量对象也不会被垃圾回收
- 因为内部函数的作用域链仍然引用着外部函数的变量对象
- 这使得内部函数可以"记住"创建它的环境，形成闭包

### 5. 作用域链的重要性

作用域链在 JavaScript 中有几个重要作用：

1. **变量解析机制**：确定变量的访问权限和查找规则
2. **减少命名冲突**：内部作用域可以定义与外部作用域同名的变量，且不会覆盖外部变量
3. **数据封装**：通过闭包和作用域链可以创建私有变量
4. **模块化基础**：许多模块化模式依赖于作用域链和闭包

### 6. 性能考虑

作用域链的长度会影响变量查找的效率：

- 变量查找是沿着作用域链进行的，链越长，查找越慢
- 局部变量的访问速度快于全局变量
- 避免过深的函数嵌套可以缩短作用域链

### 7. 作用域链与 let/const

ES6 引入的 let 和 const 关键字也影响作用域链：

- 它们支持块级作用域，使作用域链更加细化
- 暂时性死区(TDZ)确保变量必须先声明后使用
- 这让变量查找规则更加严格和可预测

理解作用域链对于掌握 JavaScript 的变量机制、闭包、作用域等核心概念至关重要，也是高效编写和调试 JavaScript 代码的基础。`
  },
  {
    id: 73,
    title: "作用域链如何延长",
    tags: ["作用域", "原理"],
    difficulty: "中等",
    code: `// 1. try-catch 语句延长作用域链
try {
  throw new Error('错误信息');
} catch (error) {
  // catch 块内部创建了一个新的变量对象，包含参数 error
  console.log(error.message); // "错误信息"
}
// console.log(error); // 错误：error is not defined

// 2. with 语句延长作用域链 (不推荐使用，严格模式下禁用)
const person = { name: '张三', age: 25 };

with (person) {
  // with 块内部会将 person 对象添加到作用域链的顶端
  console.log(name); // "张三"
  console.log(age);  // 25
}

// 3. 闭包延长作用域链
function createCounter() {
  let count = 0; // 正常情况下，函数执行完成后这个变量会被回收
  
  // 返回的函数通过闭包保留了对外部函数作用域的引用
  return function() {
    return ++count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

// 4. IIFE (立即执行函数表达式) 创建独立作用域
const result = (function() {
  // 这里的变量不会污染全局作用域
  const privateVar = '私有变量';
  
  // 返回包含引用了私有变量的方法的对象
  return {
    getValue: function() {
      return privateVar;
    }
  };
})();

console.log(result.getValue()); // "私有变量"
// console.log(privateVar); // 错误：privateVar is not defined

// 5. 块级作用域 (ES6)
{
  let blockVar = '块级变量';
  const blockConst = '块级常量';
  
  console.log(blockVar);  // "块级变量"
  console.log(blockConst); // "块级常量"
}
// console.log(blockVar);  // 错误：blockVar is not defined
// console.log(blockConst); // 错误：blockConst is not defined

// 6. 函数参数也会延长作用域链
function greet(name) {
  // 参数 name 被添加到函数的活动对象中
  return 'Hello, ' + name;
}

console.log(greet('世界')); // "Hello, 世界"`,
    answer: `## 作用域链延长详解

作用域链延长是指在现有作用域链的前端临时添加一个变量对象的过程。这通常发生在特定的语法结构中，使得标识符解析需要在更多的地方进行查找。

### 1. try-catch 语句

当执行进入 catch 块时，会创建一个新的变量对象，其中包含捕获的错误对象。这个变量对象会被临时添加到作用域链的最前端：

\`\`\`js
try {
  // 正常的作用域链
  throw new Error();
} catch (error) {
  // 作用域链前端临时增加了包含 error 的变量对象
  console.log(error);
}
// error 不再可访问
\`\`\`

**特点**：
- catch 块内可以访问错误参数
- 错误参数仅在 catch 块内有效，出了 catch 块就会被移除

### 2. with 语句 (不推荐使用)

with 语句会将指定的对象添加到作用域链的前端，使得对象的所有属性成为变量一样可以直接访问：

\`\`\`js
const obj = { x: 10, y: 20 };
with (obj) {
  // 这里可以直接访问 obj 的属性
  console.log(x); // 10
}
\`\`\`

**特点**：
- 可以省略对象名前缀，直接访问属性
- 会严重影响性能，因为编译器无法进行优化
- 在严格模式下被禁用
- 可能导致意外的变量泄漏和难以追踪的 bug

### 3. 闭包

闭包是最常用且最有用的作用域链延长方式，它允许内部函数访问外部函数的变量，即使外部函数已经执行完毕：

\`\`\`js
function outer() {
  const outerVar = 'outer';
  
  return function inner() {
    // 内部函数保留了对外部函数作用域的引用
    return outerVar;
  };
}

const innerFunc = outer();
console.log(innerFunc()); // "outer"
\`\`\`

**特点**：
- 保留对外部函数变量的引用，使这些变量不被垃圾回收
- 非常适合创建私有变量和工厂函数
- 广泛应用于模块模式、柯里化、记忆化等场景

### 4. IIFE (立即执行函数表达式)

IIFE 是创建隔离作用域的一种模式，特别是在 ES6 之前没有块级作用域的时代：

\`\`\`js
(function() {
  // 这里的变量不会污染全局作用域
  const privateData = 'private';
  
  // 可以通过闭包暴露特定功能
})();
\`\`\`

**特点**：
- 创建独立的作用域，避免污染全局命名空间
- 常用于模块模式和数据隐藏

### 5. 块级作用域 (ES6)

ES6 引入的 let 和 const 关键字创建了块级作用域，这也是作用域链的一种延长：

\`\`\`js
{
  let blockVar = 'block';
  const blockConst = 'constant';
  
  // 这里可以访问块级变量
}
// 这里无法访问块级变量
\`\`\`

**特点**：
- 变量仅在声明的块内有效
- 不会提升，存在暂时性死区
- 有效避免循环中的闭包陷阱

### 6. 函数参数和变量声明

函数调用时会创建一个活动对象，其中包含函数参数和局部变量，这也会延长作用域链：

\`\`\`js
function func(param) {
  const localVar = 'local';
  // 作用域链：[活动对象(param, localVar), 全局对象]
}
\`\`\`

**特点**：
- 函数参数和局部变量在函数执行期间位于作用域链的最前端
- 函数执行完毕后，这些变量通常会被回收（除非被闭包引用）

### 7. 模块 (ES6)

ES6 模块系统也实现了一种作用域链延长：

\`\`\`js
// module.js
const privateData = 'private';
export function getData() {
  return privateData;
}

// main.js
import { getData } from './module.js';
// 这里可以调用 getData，但无法直接访问 privateData
\`\`\`

**特点**：
- 每个模块有自己独立的作用域
- 只有导出的内容对外可见
- 提供了更好的封装和隔离

### 实践建议

- **避免使用 with 语句**：它会导致性能问题和代码不可预测
- **合理使用闭包**：闭包强大但容易造成内存泄漏
- **优先使用 let/const 和块级作用域**：比 IIFE 更简洁明了
- **注意变量名冲突**：作用域链延长会增加命名冲突的可能性

理解作用域链延长机制有助于编写更可靠、更高效的 JavaScript 代码，尤其在设计复杂的函数、闭包和模块时尤为重要。`
  },
  {
    id: 74,
    title: "DOM 节点的 Attribute 和 Property 的区别",
    tags: ["DOM", "属性"],
    difficulty: "中等",
    code: `// HTML 元素
// <input id="username" type="text" value="初始值">

// 1. 获取DOM节点
const input = document.getElementById('username');

// 2. Attribute（特性）操作
console.log(input.getAttribute('value')); // "初始值"
console.log(input.getAttribute('type')); // "text"

input.setAttribute('value', '新的attribute值');
console.log(input.getAttribute('value')); // "新的attribute值"

// 3. Property（属性）操作
console.log(input.value); // "初始值"（如果用户未修改）
console.log(input.type); // "text"

input.value = '新的property值';
console.log(input.value); // "新的property值"

// 4. 特性和属性的区别
input.value = '用户输入';
console.log(input.value); // "用户输入"
console.log(input.getAttribute('value')); // "新的attribute值"（不会自动更新）

// 5. 自定义特性和属性
// HTML: <div id="box" data-custom="test"></div>
const div = document.getElementById('box');

// 自定义特性
console.log(div.getAttribute('data-custom')); // "test"
div.setAttribute('data-custom', 'changed');

// 使用dataset访问data-*特性
console.log(div.dataset.custom); // "changed"

// 自定义属性
div.customProp = '自定义属性值';
console.log(div.customProp); // "自定义属性值"
console.log(div.getAttribute('customProp')); // null（不会自动创建特性）

// 6. 特性与属性的同步规则
input.value = '属性值';  // 修改属性
console.log(input.value); // "属性值"
console.log(input.getAttribute('value')); // 仍然是之前的特性值

input.setAttribute('value', '特性值'); // 修改特性
console.log(input.value); // 如果用户未交互，会更新为"特性值"
console.log(input.getAttribute('value')); // "特性值"

// 7. checked, disabled等布尔特性的区别
// HTML: <input id="check" type="checkbox" checked>
const checkbox = document.getElementById('check');

console.log(checkbox.checked); // true
console.log(checkbox.getAttribute('checked')); // ""

checkbox.checked = false; // 修改属性
console.log(checkbox.checked); // false
console.log(checkbox.getAttribute('checked')); // 仍然是 ""（特性不变）

checkbox.removeAttribute('checked'); // 移除特性
console.log(checkbox.checked); // false

checkbox.setAttribute('checked', ''); // 添加特性
console.log(checkbox.checked); // true（会影响属性）`,
    answer: `## DOM 节点的 Attribute 和 Property 的区别

Attribute（特性）和 Property（属性）是 DOM 编程中两个容易混淆的概念。虽然它们有时会相互影响，但它们是完全不同的东西。

### 1. 基本定义

- **Attribute（特性）**：HTML 标签上的特性，它的值只能是字符串
- **Property（属性）**：JS 对象（DOM 节点）的属性，可以是任何类型的值

### 2. 存储位置不同

- **Attribute**：存在于 HTML 文本中，可以通过 HTML 标签查看
- **Property**：存在于 DOM 对象中，只有通过 JS 才能访问

### 3. 操作方式不同

#### Attribute 操作：

\`\`\`js
element.getAttribute('id')
element.setAttribute('id', 'newId')
element.hasAttribute('id')
element.removeAttribute('id')
\`\`\`

#### Property 操作：

\`\`\`js
element.id
element.id = 'newId'
element.value
element.checked
\`\`\`

### 4. 特性和属性的同步关系

**属性初始化**：
- 大多数 attribute 在 DOM 加载后会初始化对应的 property

**更新规则**：
- 修改 property 通常不会改变 attribute
- 修改 attribute 有时会同步到 property
- 这种同步关系因元素和属性类型而异

### 5. 不同类型特性的区别

#### 标准属性

对于标准 HTML 特性，大部分会在初始化时创建对应的 property：

\`\`\`js
// <input id="test" value="初始值">
input.id === input.getAttribute('id') // true
\`\`\`

但后续的更新通常是单向的：

\`\`\`js
input.id = 'newId' 
// property 更新了，但 attribute 仍保持原值
input.getAttribute('id') !== 'newId' // 在许多浏览器中是 true
\`\`\`

#### 值属性

\`value\` 是一个特殊情况：
- 初始时，property 从 attribute 获取值
- 修改 property 不会更新 attribute
- 修改 attribute 会更新 property，但仅在用户未交互时

这允许表单重置功能正常工作，因为表单重置会将元素的 value 重置为其 value attribute。

#### 布尔属性

对于 \`checked\`、\`disabled\` 等布尔属性：
- attribute 是布尔类型（存在/不存在）
- property 是真正的布尔值 (true/false)

\`\`\`js
// <input type="checkbox" checked>
checkbox.checked // true
checkbox.getAttribute('checked') // ""（表示存在）

checkbox.checked = false
checkbox.getAttribute('checked') // 仍然是 ""
\`\`\`

#### 对象属性

某些 property 是复杂对象，不是简单的特性映射：

\`\`\`js
// <select><option>A</option><option>B</option></select>
select.options // HTMLCollection，而不是字符串
\`\`\`

### 6. 自定义特性和属性

**自定义特性**：
- 推荐使用 \`data-*\` 前缀
- 可以通过 \`dataset\` 访问

\`\`\`js
// <div data-user-id="123"></div>
div.dataset.userId // "123"
\`\`\`

**自定义属性**：
- 可以直接添加到 DOM 对象上
- 不会创建对应的 attribute

\`\`\`js
div.customProperty = { key: 'value' }
div.getAttribute('customProperty') // null
\`\`\`

### 7. 性能和最佳实践

1. **操作 property 通常比 attribute 更高效**
2. **标准属性优先使用 property 访问**
3. **自定义数据使用 data-* 特性**
4. **表单元素值获取使用 property**
5. **对于表单重置，需要同时考虑 attribute 和 property**

### 8. 选择使用准则

- 需要获取 HTML 中设置的初始值或默认值，使用 **attribute**
- 需要获取当前值或状态，使用 **property**
- 需要存储自定义数据，使用 **data-*** 特性
- 需要反映到 HTML 标记上的更改，使用 **setAttribute()**

理解 attribute 和 property 的区别对于进行有效的 DOM 操作至关重要，尤其是在处理表单元素和创建复杂交互时。`
  },
  {
    id: 75,
    title: "DOM 结构操作创建、添加、删除、修改",
    tags: ["DOM", "操作"],
    difficulty: "中等",
    code: `// 1. 创建DOM节点
const div = document.createElement('div');
const text = document.createTextNode('文本内容');
const fragment = document.createDocumentFragment();
const comment = document.createComment('注释');

// 2. 添加DOM节点
// appendChild - 添加到末尾
const parent = document.getElementById('container');
parent.appendChild(div);

// insertBefore - 在特定节点前插入
const referenceNode = document.getElementById('reference');
parent.insertBefore(div, referenceNode);

// append/prepend (新API) - 添加多个节点或文本
div.append(text, document.createElement('span'), '更多文本');
div.prepend('开头文本', document.createElement('header'));

// 3. 删除节点
// 通过父元素删除
parent.removeChild(div);
// 元素自我删除 (新API)
div.remove();

// 4. 替换节点
const newNode = document.createElement('p');
parent.replaceChild(newNode, referenceNode);

// 5. 修改内容
div.textContent = '纯文本内容';
div.innerHTML = '<span>HTML内容</span>';

// 6. 修改样式
div.style.color = 'red';
div.className = 'highlight';
div.classList.add('active');
div.classList.remove('inactive');
div.classList.toggle('selected');

// 7. 修改属性
div.id = 'main';
div.setAttribute('data-id', '123');
div.getAttribute('id');
div.removeAttribute('hidden');

// 8. 复制节点
const clone = div.cloneNode(true); // true表示深复制

// 9. 批量处理 - 使用文档片段
const items = ['项目1', '项目2', '项目3'];
const fragment = document.createDocumentFragment();

items.forEach(item => {
  const li = document.createElement('li');
  li.textContent = item;
  fragment.appendChild(li);
});

document.getElementById('list').appendChild(fragment);`,
    answer: `## DOM 结构操作：创建、添加、删除、修改

DOM 操作是前端开发的核心技能，它允许我们动态地改变网页内容和结构。

### 1. 创建DOM节点

JavaScript提供了多种创建DOM节点的方法：

- **createElement**：创建元素节点
  \`\`\`js
  const div = document.createElement('div');
  \`\`\`

- **createTextNode**：创建文本节点
  \`\`\`js
  const text = document.createTextNode('文本内容');
  \`\`\`

- **createDocumentFragment**：创建文档片段（不会触发回流）
  \`\`\`js
  const fragment = document.createDocumentFragment();
  \`\`\`

- **createComment**：创建注释节点
  \`\`\`js
  const comment = document.createComment('注释');
  \`\`\`

### 2. 添加DOM节点

将节点添加到DOM树的方法：

- **appendChild**：在父节点末尾添加子节点
  \`\`\`js
  parent.appendChild(child);
  \`\`\`

- **insertBefore**：在参考节点前插入节点
  \`\`\`js
  parent.insertBefore(newNode, referenceNode);
  \`\`\`

- **append/prepend**（新API）：添加多个节点或文本
  \`\`\`js
  element.append(node1, 'text', node2);  // 末尾添加
  element.prepend(node1, 'text', node2); // 开头添加
  \`\`\`

- **insertAdjacentElement**：在指定位置插入节点
  \`\`\`js
  element.insertAdjacentElement('beforebegin', newElement);
  // 'afterbegin', 'beforeend', 'afterend'
  \`\`\`

### 3. 删除DOM节点

- **removeChild**：通过父节点删除子节点
  \`\`\`js
  parent.removeChild(child); // 返回被删除的节点
  \`\`\`

- **remove**（新API）：节点自我删除
  \`\`\`js
  element.remove();
  \`\`\`

### 4. 替换DOM节点

- **replaceChild**：用新节点替换现有节点
  \`\`\`js
  parent.replaceChild(newChild, oldChild);
  \`\`\`

- **replaceWith**（新API）：使用多个节点替换当前节点
  \`\`\`js
  element.replaceWith(node1, 'text', node2);
  \`\`\`

### 5. 修改节点内容

- **textContent**：修改纯文本内容（安全，性能好）
  \`\`\`js
  element.textContent = '纯文本内容';
  \`\`\`

- **innerHTML**：修改HTML内容（可能有XSS风险）
  \`\`\`js
  element.innerHTML = '<span>HTML内容</span>';
  \`\`\`

- **innerText**：考虑CSS样式的文本内容
  \`\`\`js
  element.innerText = '显示的文本内容';
  \`\`\`

### 6. 修改节点样式

- **直接修改style属性**
  \`\`\`js
  element.style.color = 'red';
  element.style.fontSize = '16px';
  \`\`\`

- **操作类名**
  \`\`\`js
  element.className = 'highlight'; // 覆盖现有类
  element.classList.add('active'); // 添加类
  element.classList.remove('disabled'); // 移除类
  element.classList.toggle('selected'); // 切换类
  element.classList.replace('old', 'new'); // 替换类
  \`\`\`

### 7. 修改节点属性

- **直接属性访问**
  \`\`\`js
  element.id = 'main';
  element.checked = true;
  \`\`\`

- **Attribute方法**
  \`\`\`js
  element.setAttribute('data-id', '123');
  element.getAttribute('href');
  element.hasAttribute('disabled');
  element.removeAttribute('hidden');
  \`\`\`

### 8. 克隆节点

\`\`\`js
const clone = node.cloneNode(true); // true表示深克隆（含子节点）
\`\`\`

### 9. 批量处理 - 使用文档片段

\`\`\`js
const fragment = document.createDocumentFragment();
// 添加多个节点到fragment
parent.appendChild(fragment); // 一次性添加，减少重排
\`\`\`

### 10. 现代最佳实践

- **优先使用新API**：如append、prepend、remove等
- **避免innerHTML**：防止XSS攻击
- **委托事件处理**：减少事件监听器数量
- **虚拟DOM思想**：批量处理DOM更新
- **使用requestAnimationFrame**：优化动画和布局更改

了解原生DOM操作仍然重要，即使在使用React、Vue等框架的情况下，因为理解底层原理可以帮助优化性能和解决复杂问题。`
  },
  {
    id: 76,
    title: "DOM 的事件模型",
    tags: ["DOM", "事件"],
    difficulty: "中等",
    code: `// 1. DOM0级事件模型 (传统/内联模型)
// HTML中的内联事件
// <button onclick="alert('点击了按钮')">点击我</button>

// JavaScript中的DOM0级事件
const btn = document.getElementById('myButton');
btn.onclick = function(event) {
  console.log('按钮被点击了');
  console.log(event); // 事件对象
};

// 移除DOM0级事件
btn.onclick = null;

// 2. DOM2级事件模型
// 添加事件监听器
document.getElementById('myDiv').addEventListener('click', function(e) {
  console.log('捕获阶段或冒泡阶段被点击');
}, false); // false表示在冒泡阶段触发（默认）

// 添加事件监听器 - 捕获阶段
document.getElementById('myDiv').addEventListener('click', function(e) {
  console.log('捕获阶段被点击');
}, true); // true表示在捕获阶段触发

// 移除事件监听器（需要引用相同的函数）
function handleClick(e) {
  console.log('处理点击事件');
}
const el = document.getElementById('myElement');
el.addEventListener('click', handleClick);
el.removeEventListener('click', handleClick);

// 3. 事件对象常用属性和方法
document.getElementById('link').addEventListener('click', function(e) {
  // 阻止默认行为（如链接跳转）
  e.preventDefault();
  
  // 阻止事件进一步传播（冒泡或捕获）
  e.stopPropagation();
  
  // 立即阻止事件传播，包括当前元素的其他事件处理器
  // e.stopImmediatePropagation();
  
  // 事件目标
  console.log(e.target); // 触发事件的元素
  console.log(e.currentTarget); // 事件处理器绑定的元素
  
  // 事件类型和时间戳
  console.log(e.type); // "click"
  console.log(e.timeStamp); // 事件发生的时间戳
  
  // 鼠标位置信息
  console.log(e.clientX, e.clientY); // 相对于视口的鼠标坐标
  console.log(e.pageX, e.pageY); // 相对于文档的鼠标坐标
  
  // 键盘信息（键盘事件特有）
  // console.log(e.key, e.code); // 按键值和按键码
  
  // 触摸信息（触摸事件特有）
  // console.log(e.touches, e.changedTouches);
});

// 4. 事件代理（委托）模式
document.getElementById('parent-list').addEventListener('click', function(e) {
  // 检查是否点击了列表项
  if (e.target.tagName === 'LI') {
    console.log('列表项被点击:', e.target.textContent);
  }
});

// 5. 自定义事件
const customEvent = new CustomEvent('myEvent', {
  detail: { name: '自定义事件', id: 1 },
  bubbles: true,
  cancelable: true
});

// 触发自定义事件
document.getElementById('customTarget').addEventListener('myEvent', function(e) {
  console.log('自定义事件被触发:', e.detail);
});
document.getElementById('customTarget').dispatchEvent(customEvent);`,
    answer: `## DOM 事件模型详解

DOM 事件模型描述了网页中事件的触发、传播和处理机制。随着 Web 标准的发展，DOM 事件模型经历了多次演变。

### 1. 事件模型的演进

DOM 事件模型主要有三种：

#### 1.1 DOM0 级事件模型（最早的模型）

- **特点**：简单直接，一个元素一个事件只能绑定一个处理函数
- **两种形式**：
  - HTML 内联方式：\`<button onclick="handleClick()">点击</button>\`
  - JavaScript 属性方式：\`element.onclick = function() {}\`
- **移除方式**：\`element.onclick = null\`

\`\`\`js
const btn = document.getElementById('btn');
btn.onclick = function() {
  alert('点击了按钮');
};
\`\`\`

#### 1.2 DOM2 级事件模型（现代标准）

- **特点**：支持事件捕获和冒泡，一个事件可以绑定多个处理函数
- **添加事件**：\`element.addEventListener(event, handler, useCapture)\`
- **移除事件**：\`element.removeEventListener(event, handler, useCapture)\`
- **第三个参数**：
  - \`false\`（默认）：在冒泡阶段处理事件
  - \`true\`：在捕获阶段处理事件

\`\`\`js
element.addEventListener('click', function(e) {
  console.log('处理点击事件');
}, false);
\`\`\`

#### 1.3 IE 事件模型（旧版 IE 浏览器）

- **特点**：只支持事件冒泡
- **添加事件**：\`element.attachEvent('onclick', handler)\`
- **移除事件**：\`element.detachEvent('onclick', handler)\`

> 注：现代 Web 开发已经很少需要考虑 IE 事件模型，这里仅作了解。

### 2. 事件流：捕获与冒泡

DOM2 级事件流包含三个阶段：

1. **捕获阶段**：事件从 \`window\` 对象沿 DOM 树向下传播到目标元素
2. **目标阶段**：事件到达目标元素
3. **冒泡阶段**：事件从目标元素沿 DOM 树向上传播回 \`window\` 对象

\`\`\`
       | |
       | |
       ↓ ↑
    +-------+
    |document|
    +-------+
       | |  
       | |  
       ↓ ↑  
    +-------+
    | body  |
    +-------+
       | |  
       | |  
       ↓ ↑  
    +-------+
    |  div  |
    +-------+
       | |  
       | |  
       ↓ ↑  
    +-------+
    |button |
    +-------+
    
    ↓ = 捕获阶段
    ↑ = 冒泡阶段
\`\`\`

### 3. 事件对象（Event Object）

当事件触发时，浏览器会创建一个事件对象并传递给事件处理函数。

#### 3.1 常用属性

- **\`e.target\`**：触发事件的元素
- **\`e.currentTarget\`**：绑定事件处理程序的元素
- **\`e.type\`**：事件类型（如 "click"）
- **\`e.timeStamp\`**：事件发生的时间戳
- **\`e.clientX/clientY\`**：鼠标相对于视口的坐标
- **\`e.pageX/pageY\`**：鼠标相对于文档的坐标

#### 3.2 常用方法

- **\`e.preventDefault()\`**：阻止默认行为（如链接跳转）
- **\`e.stopPropagation()\`**：阻止事件冒泡或捕获
- **\`e.stopImmediatePropagation()\`**：阻止事件传播并阻止当前元素上的其他事件处理程序

### 4. 事件代理（委托）

事件代理是一种基于事件冒泡的设计模式，它允许我们在父元素上监听子元素的事件。

**优点**：
- 减少事件处理器数量，提高性能
- 动态添加的元素无需重新绑定事件

\`\`\`js
// 不使用事件代理
document.querySelectorAll('li').forEach(li => {
  li.addEventListener('click', function() {
    console.log(this.textContent);
  });
});

// 使用事件代理
document.querySelector('ul').addEventListener('click', function(e) {
  if (e.target.tagName === 'LI') {
    console.log(e.target.textContent);
  }
});
\`\`\`

### 5. 自定义事件

DOM 允许创建和触发自定义事件：

\`\`\`js
// 创建自定义事件
const event = new CustomEvent('userLogin', {
  detail: { userId: 123 },
  bubbles: true,
  cancelable: true
});

// 触发自定义事件
element.dispatchEvent(event);
\`\`\`

### 6. 常见事件类型

- **鼠标事件**：\`click\`, \`dblclick\`, \`mousedown\`, \`mouseup\`, \`mousemove\`, \`mouseover\`, \`mouseout\`
- **键盘事件**：\`keydown\`, \`keyup\`, \`keypress\`
- **表单事件**：\`submit\`, \`reset\`, \`change\`, \`input\`, \`focus\`, \`blur\`
- **窗口事件**：\`load\`, \`resize\`, \`scroll\`, \`unload\`
- **触摸事件**：\`touchstart\`, \`touchmove\`, \`touchend\`

### 7. 实践建议

1. **使用事件委托**处理大量相似元素
2. **使用 addEventListener** 而非 DOM0 级方法
3. **解绑不再需要的事件处理程序**避免内存泄漏
4. **避免在捕获阶段注册事件**，除非有特殊需求
5. **谨慎使用事件阻止方法**，尤其是 \`stopPropagation()\`
6. **避免内联事件处理器**，保持关注点分离

理解 DOM 事件模型对于构建交互式 Web 应用至关重要，掌握事件流和事件处理机制可以帮助我们编写更高效、更可维护的代码。`
  },
  {
    id: 77,
    title: "事件三要素",
    tags: ["DOM", "事件"],
    difficulty: "简单",
    code: `// 1. 事件源（事件发生的元素）
const button = document.getElementById('myButton');
const link = document.querySelector('a');
const inputField = document.getElementById('username');

// 2. 事件类型（发生什么类型的事件）
// 常见事件类型：
// - 点击事件：click, dblclick
// - 鼠标事件：mouseover, mouseout, mousemove
// - 键盘事件：keydown, keyup, keypress
// - 表单事件：submit, reset, change, input, focus, blur
// - 窗口事件：load, resize, scroll, unload

// 3. 事件处理函数（事件发生时执行的代码）
// DOM0 级事件处理
button.onclick = function() {
  console.log('按钮被点击了');
};

// DOM2 级事件处理
link.addEventListener('click', function(event) {
  event.preventDefault(); // 阻止默认行为
  console.log('链接被点击了');
});

// 将这三要素结合使用
inputField.addEventListener('input', function(event) {
  console.log('输入内容：', event.target.value);
});

// 事件三要素的另一种写法 - 内联方式（不推荐，但需要了解）
// HTML: <button onclick="handleClick()">点击</button>
function handleClick() {
  alert('按钮被点击了');
}

// 事件三要素的解绑
function handleMouseOver() {
  console.log('鼠标悬停');
}

// 绑定事件
button.addEventListener('mouseover', handleMouseOver);

// 解绑事件
button.removeEventListener('mouseover', handleMouseOver);`,
    answer: `## 事件三要素详解

在 JavaScript 中处理 DOM 事件时，事件三要素是构成事件处理的基本组成部分。理解这三个要素对于有效地处理用户交互至关重要。

### 1. 事件源（Event Source）

事件源是指**触发事件的 HTML 元素**，也就是事件发生的对象。

- 可以通过多种方式获取事件源：
  \`\`\`js
  document.getElementById('myButton')
  document.querySelector('.myClass')
  document.getElementsByTagName('div')[0]
  \`\`\`

- 在事件处理函数中，可以通过 \`this\` 或 \`event.target\` 引用事件源：
  \`\`\`js
  button.onclick = function() {
    console.log(this); // 指向 button 元素
  };
  
  button.addEventListener('click', function(event) {
    console.log(event.target); // 获取触发事件的元素
    console.log(event.currentTarget); // 获取绑定事件的元素
  });
  \`\`\`

### 2. 事件类型（Event Type）

事件类型指定了**要响应的事件的种类**，不同类型的事件对应用户的不同交互行为。

#### 常见事件类型分类：

- **鼠标事件**
  - \`click\`: 单击
  - \`dblclick\`: 双击
  - \`mousedown\`: 鼠标按下
  - \`mouseup\`: 鼠标释放
  - \`mousemove\`: 鼠标移动
  - \`mouseover\`/\`mouseenter\`: 鼠标移入
  - \`mouseout\`/\`mouseleave\`: 鼠标移出

- **键盘事件**
  - \`keydown\`: 键盘按下
  - \`keyup\`: 键盘释放
  - \`keypress\`: 键盘按下（不包括功能键）

- **表单事件**
  - \`submit\`: 表单提交
  - \`reset\`: 表单重置
  - \`change\`: 表单元素值变化（失去焦点时触发）
  - \`input\`: 输入值变化（实时触发）
  - \`focus\`: 获得焦点
  - \`blur\`: 失去焦点

- **窗口事件**
  - \`load\`: 页面加载完成
  - \`resize\`: 窗口大小改变
  - \`scroll\`: 滚动

- **触摸事件**
  - \`touchstart\`: 触摸开始
  - \`touchmove\`: 触摸移动
  - \`touchend\`: 触摸结束

### 3. 事件处理函数（Event Handler）

事件处理函数是**当事件触发时执行的代码**，用于响应事件并执行特定操作。

#### 注册事件处理函数的三种方式：

1. **HTML 内联方式**（不推荐）
   \`\`\`html
   <button onclick="handleClick()">点击我</button>
   \`\`\`
   \`\`\`js
   function handleClick() {
     alert('按钮被点击了');
   }
   \`\`\`

2. **DOM0 级事件处理**
   \`\`\`js
   element.onclick = function() {
     console.log('事件处理');
   };
   \`\`\`
   特点：简单直接，但一个事件只能绑定一个处理函数

3. **DOM2 级事件处理**（推荐）
   \`\`\`js
   element.addEventListener('click', function(event) {
     console.log('事件处理');
   }, false);
   \`\`\`
   特点：可以为同一事件绑定多个处理函数，更灵活

#### 事件处理函数中的事件对象

当事件触发时，浏览器会创建一个事件对象（Event Object），并将其作为参数传递给事件处理函数。

\`\`\`js
element.addEventListener('click', function(event) {
  console.log(event.type); // "click"
  console.log(event.target); // 触发事件的元素
  event.preventDefault(); // 阻止默认行为
  event.stopPropagation(); // 阻止传播
});
\`\`\`

### 事件三要素的关系

这三个要素共同构成了完整的事件处理机制：
- **事件源**：告诉我们**在哪里**监听事件
- **事件类型**：告诉我们**监听什么**事件
- **事件处理函数**：告诉我们事件发生时**做什么**

简而言之：在某个元素上，当特定事件发生时，执行指定的代码。

### 实际应用示例

表单验证：
\`\`\`js
const form = document.getElementById('myForm'); // 事件源
form.addEventListener('submit', function(event) { // 事件类型和处理函数
  const username = document.getElementById('username').value;
  if (username.length < 3) {
    event.preventDefault(); // 阻止表单提交
    alert('用户名长度不能小于3');
  }
});
\`\`\`

事件三要素是 JavaScript 事件编程的基础，清晰地理解这些概念有助于编写更有条理、更易维护的事件处理代码。`
  },
  {
    id: 78,
    title: "如何绑定事件，解除事件",
    tags: ["DOM", "事件"],
    difficulty: "简单",
    code: `// 1. HTML内联方式绑定事件（不推荐）
// <button onclick="handleClick()">点击我</button>
function handleClick() {
  alert('Button clicked!');
}

// 2. DOM0级事件处理器
const btn1 = document.getElementById('btn1');
// 绑定事件
btn1.onclick = function() {
  console.log('按钮1被点击了');
};
// 解除事件
btn1.onclick = null;

// 3. DOM2级事件处理器（推荐）
const btn2 = document.getElementById('btn2');

// 具名函数（便于后续移除）
function clickHandler(e) {
  console.log('按钮2被点击了', e);
}

// 绑定事件
btn2.addEventListener('click', clickHandler);
// 解除事件
btn2.removeEventListener('click', clickHandler);

// 使用匿名函数绑定事件（无法直接解除）
btn2.addEventListener('click', function() {
  console.log('这个事件处理器无法直接被移除');
});

// 使用箭头函数和选项参数
btn2.addEventListener('click', (e) => {
  console.log('只执行一次的点击事件');
}, { once: true });

// 4. 事件处理中的this指向
const btn3 = document.getElementById('btn3');

// DOM0级，this指向事件源元素
btn3.onclick = function() {
  console.log(this); // 指向btn3
};

// DOM2级，this同样指向事件源元素（函数声明）
btn3.addEventListener('click', function() {
  console.log(this); // 指向btn3
});

// DOM2级，箭头函数的this不再指向事件源
btn3.addEventListener('click', (e) => {
  console.log(this); // 指向上下文（可能是window）
  console.log(e.currentTarget); // 使用事件对象获取元素
});

// 5. 一次性事件监听器
const btn4 = document.getElementById('btn4');
function handleOnce() {
  console.log('这个处理器只会执行一次');
  // 执行后自我解除
  btn4.removeEventListener('click', handleOnce);
}
btn4.addEventListener('click', handleOnce);

// 或使用options参数
btn4.addEventListener('click', () => {
  console.log('使用once选项，只会执行一次');
}, { once: true });

// 6. 添加和移除多个事件处理器
const el = document.getElementById('multi-event');

function handleMouseOver() {
  console.log('鼠标悬停');
}

function handleMouseOut() {
  console.log('鼠标移出');
}

// 为同一元素添加多个不同事件
el.addEventListener('mouseover', handleMouseOver);
el.addEventListener('mouseout', handleMouseOut);

// 为同一事件添加多个处理器
el.addEventListener('click', function first() {
  console.log('第一个点击处理器');
});
el.addEventListener('click', function second() {
  console.log('第二个点击处理器');
});

// 移除特定事件处理器
el.removeEventListener('mouseover', handleMouseOver);

// 实现绑定后返回解绑函数的工具方法
function bindEvent(element, eventType, handler) {
  element.addEventListener(eventType, handler);
  return function unbind() {
    element.removeEventListener(eventType, handler);
  };
}

// 使用工具方法
const unbindClick = bindEvent(el, 'click', () => console.log('可解绑的点击事件'));
// 稍后解绑
// unbindClick();`,
    answer: `## 绑定和解除事件的方法详解

在JavaScript中，我们有多种方式来绑定和解除DOM事件。掌握这些方法及其差异对于构建可维护的前端应用非常重要。

### 一、绑定事件的方法

#### 1. HTML内联方式（不推荐）

直接在HTML标签中添加事件属性：

\`\`\`html
<button onclick="handleClick()">点击我</button>
\`\`\`

\`\`\`javascript
function handleClick() {
  alert('Button clicked!');
}
\`\`\`

**缺点**：
- 混合了HTML和JavaScript代码，违反关注点分离原则
- 不易维护，尤其在大型应用中
- 会在全局作用域中查找函数

#### 2. DOM0级事件处理器

通过JavaScript给DOM元素的事件属性赋值：

\`\`\`javascript
const button = document.getElementById('myButton');
button.onclick = function() {
  console.log('按钮被点击了');
};
\`\`\`

**解除方法**：将事件属性设置为null

\`\`\`javascript
button.onclick = null;
\`\`\`

**特点**：
- 简单直观
- 每个事件只能绑定一个处理函数（后面会覆盖前面的）
- 无法控制事件触发阶段（捕获或冒泡）

#### 3. DOM2级事件处理器（推荐）

使用addEventListener方法：

\`\`\`javascript
const button = document.getElementById('myButton');

// 绑定事件
button.addEventListener('click', function(event) {
  console.log('按钮被点击了');
}, false); // false表示在冒泡阶段处理（默认值）
\`\`\`

**解除方法**：使用removeEventListener，必须提供相同的函数引用

\`\`\`javascript
function handleClick(event) {
  console.log('处理点击事件');
}

// 绑定事件
button.addEventListener('click', handleClick);

// 解除事件
button.removeEventListener('click', handleClick);
\`\`\`

**特点**：
- 可以为同一事件绑定多个处理函数
- 可以控制事件在捕获阶段还是冒泡阶段触发
- 提供更多高级选项（如once、passive等）
- 需要保持函数引用才能解除事件

### 二、事件解除的注意事项

#### 1. 匿名函数无法直接解除

\`\`\`javascript
// 绑定匿名函数
element.addEventListener('click', function() {
  console.log('这个事件处理器无法直接被移除');
});

// 无法解除，因为无法引用到相同的函数
element.removeEventListener('click', function() {
  console.log('这个事件处理器无法直接被移除');
});
\`\`\`

#### 2. 箭头函数中的this指向

\`\`\`javascript
// 普通函数，this指向元素本身
element.addEventListener('click', function() {
  console.log(this); // 指向element
});

// 箭头函数，this指向词法作用域
element.addEventListener('click', (e) => {
  console.log(this); // 可能是window或其他上下文
  console.log(e.currentTarget); // 应使用这个获取元素
});
\`\`\`

#### 3. 一次性事件监听

有两种方式创建只执行一次的事件监听器：

\`\`\`javascript
// 方法1：使用选项对象
element.addEventListener('click', handler, { once: true });

// 方法2：在处理函数内移除自身
function handleOnce() {
  console.log('只执行一次');
  element.removeEventListener('click', handleOnce);
}
element.addEventListener('click', handleOnce);
\`\`\`

### 三、高级模式和最佳实践

#### 1. 返回解绑函数的模式

创建一个绑定后返回解绑函数的实用方法：

\`\`\`javascript
function bindEvent(element, eventType, handler, options) {
  element.addEventListener(eventType, handler, options);
  return function unbind() {
    element.removeEventListener(eventType, handler, options);
  };
}

// 使用示例
const unbind = bindEvent(button, 'click', () => console.log('点击'));
// 稍后解绑
unbind();
\`\`\`

#### 2. 事件选项

addEventListener的第三个参数可以是布尔值或选项对象：

\`\`\`javascript
element.addEventListener('click', handler, {
  capture: false, // 是否在捕获阶段触发
  once: true,     // 是否只执行一次
  passive: true   // 是否不会调用preventDefault()
});
\`\`\`

#### 3. 事件代理模式

利用事件冒泡，在父元素上处理子元素事件：

\`\`\`javascript
document.getElementById('parent-list').addEventListener('click', function(e) {
  if (e.target.tagName === 'LI') {
    console.log('列表项被点击:', e.target.textContent);
  }
});
\`\`\`

### 四、性能和内存考虑

1. **始终解除不再需要的事件处理器**，避免内存泄漏
2. **优先使用事件代理**处理大量相似元素的事件
3. **避免在滚动、调整大小等高频率事件中执行复杂操作**
4. **使用passive: true**提高滚动性能

选择合适的事件绑定和解除方法，对于构建高性能、易维护的前端应用至关重要。在现代Web开发中，DOM2级事件处理模型（addEventListener/removeEventListener）是推荐的标准方法。`
  },
  {
    id: 79,
    title: "事件冒泡和事件捕获的区别",
    tags: ["DOM", "事件"],
    difficulty: "中等",
    code: `// 先创建一个嵌套的DOM结构用于演示
// <div id="grandparent">
//   <div id="parent">
//     <button id="child">点击我</button>
//   </div>
// </div>

// 1. 事件冒泡 (Event Bubbling)
// 事件从触发元素开始，向上冒泡至文档根节点
document.getElementById('child').addEventListener('click', function(e) {
  console.log('子元素被点击 - 冒泡阶段');
}, false); // 第三个参数false表示在冒泡阶段触发（默认值）

document.getElementById('parent').addEventListener('click', function(e) {
  console.log('父元素响应点击 - 冒泡阶段');
}, false);

document.getElementById('grandparent').addEventListener('click', function(e) {
  console.log('祖父元素响应点击 - 冒泡阶段');
}, false);

// 2. 事件捕获 (Event Capturing)
// 事件从文档根节点开始向下捕获，直到触发元素
document.getElementById('grandparent').addEventListener('click', function(e) {
  console.log('祖父元素响应点击 - 捕获阶段');
}, true); // 第三个参数true表示在捕获阶段触发

document.getElementById('parent').addEventListener('click', function(e) {
  console.log('父元素响应点击 - 捕获阶段');
}, true);

document.getElementById('child').addEventListener('click', function(e) {
  console.log('子元素被点击 - 捕获阶段');
}, true);

// 点击按钮时的输出顺序：
// 1. 祖父元素响应点击 - 捕获阶段
// 2. 父元素响应点击 - 捕获阶段
// 3. 子元素被点击 - 捕获阶段
// 4. 子元素被点击 - 冒泡阶段
// 5. 父元素响应点击 - 冒泡阶段
// 6. 祖父元素响应点击 - 冒泡阶段

// 3. 阻止事件传播
document.getElementById('parent').addEventListener('click', function(e) {
  console.log('父元素响应点击 - 冒泡阶段');
  e.stopPropagation(); // 阻止事件继续冒泡
  // 现在事件不会传播到祖父元素
}, false);

// 4. 阻止默认行为
document.querySelector('a').addEventListener('click', function(e) {
  e.preventDefault(); // 阻止链接的默认跳转行为
  console.log('链接被点击，但不会跳转');
});

// 5. 同时阻止默认行为和传播
document.querySelector('a').addEventListener('click', function(e) {
  e.preventDefault(); // 阻止默认行为
  e.stopPropagation(); // 阻止传播
  console.log('链接被点击，不会跳转，也不会冒泡');
});

// 6. 立即阻止传播
document.getElementById('child').addEventListener('click', function(e) {
  console.log('子元素第一个处理器');
  e.stopImmediatePropagation(); // 阻止后续处理器和事件传播
  // 下面的处理器不会被调用
}, false);

document.getElementById('child').addEventListener('click', function(e) {
  console.log('子元素第二个处理器 - 不会被执行');
}, false);`,
    answer: `## 事件冒泡和事件捕获的区别

事件冒泡和事件捕获是 DOM 事件流的两个阶段，它们决定了事件在 DOM 树中的传播方式。理解这两个概念对于有效地处理复杂的事件情况至关重要。

### 1. DOM 事件流的三个阶段

DOM 事件流包含三个阶段：

1. **捕获阶段（Capturing Phase）**：事件从 Window 开始，沿着 DOM 树向下传播到目标元素。
2. **目标阶段（Target Phase）**：事件到达目标元素。
3. **冒泡阶段（Bubbling Phase）**：事件从目标元素开始，沿着 DOM 树向上冒泡回 Window。

### 2. 事件冒泡（Event Bubbling）

**事件冒泡**是指当一个元素上的事件被触发后，事件会从该元素开始向上冒泡到父元素，直到到达 document 对象。

#### 特点：
- 从**最具体的元素**（事件目标）开始
- 向上传播到**较不具体的节点**（父节点）
- 默认情况下，大多数事件处理程序在**冒泡阶段**执行

\`\`\`js
element.addEventListener('click', handler, false); // false表示冒泡阶段（默认值）
\`\`\`

### 3. 事件捕获（Event Capturing）

**事件捕获**与事件冒泡正好相反，事件首先被最不具体的节点（document）捕获，然后向下传播到最具体的节点（事件目标）。

#### 特点：
- 从**最不具体的节点**（document）开始
- 向下传播到**最具体的元素**（事件目标）
- 需要在 addEventListener 的第三个参数中指定

\`\`\`js
element.addEventListener('click', handler, true); // true表示捕获阶段
\`\`\`

### 4. 事件传播图解

假设我们有以下嵌套结构：

\`\`\`
           HTML
            |
           BODY
            |
            DIV
            |
          BUTTON
\`\`\`

当点击 BUTTON 时，事件传播的完整顺序是：

1. **捕获阶段**：HTML → BODY → DIV → BUTTON
2. **目标阶段**：BUTTON
3. **冒泡阶段**：BUTTON → DIV → BODY → HTML

### 5. 关键区别

| 特性 | 事件冒泡 | 事件捕获 |
|------|----------|----------|
| 传播方向 | 从下往上（子到父） | 从上往下（父到子） |
| 默认行为 | 大多数事件默认冒泡 | 需要明确指定 |
| addEventListener 参数 | false（默认） | true |
| 支持度 | 所有现代浏览器 | 所有现代浏览器 |
| 常见用途 | 事件委托 | 拦截/前置处理 |

### 6. 控制事件传播

#### 阻止事件传播

可以使用 \`stopPropagation()\` 方法阻止事件进一步传播：

\`\`\`js
element.addEventListener('click', function(e) {
  e.stopPropagation(); // 阻止事件继续传播
  console.log('事件被处理，不会继续传播');
});
\`\`\`

#### 阻止同一元素的其他处理函数执行

使用 \`stopImmediatePropagation()\` 能阻止事件传播并阻止同一元素上的其他事件处理程序执行：

\`\`\`js
element.addEventListener('click', function(e) {
  e.stopImmediatePropagation();
  console.log('后面的处理程序不会执行');
});

element.addEventListener('click', function() {
  console.log('这个处理程序不会执行');
});
\`\`\`

### 7. 阻止默认行为

与事件传播相关但不同的是阻止默认行为：

\`\`\`js
link.addEventListener('click', function(e) {
  e.preventDefault(); // 阻止链接的默认跳转
  console.log('点击链接但不跳转');
});
\`\`\`

### 8. 实际应用场景

#### 事件冒泡的应用

- **事件委托**：在父元素上处理多个子元素的事件
  \`\`\`js
  document.getElementById('parent-list').addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
      console.log('列表项被点击:', e.target.textContent);
    }
  });
  \`\`\`

#### 事件捕获的应用

- **前置处理**：在事件到达目标元素前进行拦截或处理
  \`\`\`js
  // 例如，在表单提交前进行全局验证
  document.addEventListener('submit', validateForm, true);
  \`\`\`

### 9. 总结

- **事件冒泡**：从内到外（子→父），默认行为，适合事件委托
- **事件捕获**：从外到内（父→子），需要明确指定，适合前置拦截
- **先捕获后冒泡**：完整事件流是捕获阶段→目标阶段→冒泡阶段
- 使用 \`e.stopPropagation()\` 可以阻止事件传播
- 使用 \`e.preventDefault()\` 可以阻止默认行为

理解这两种事件传播机制及其区别，有助于更有效地处理复杂的用户交互和构建更健壮的事件处理系统。`
  },
  {
    id: 80,
    title: "事件委托",
    tags: ["DOM", "事件", "性能优化"],
    difficulty: "中等",
    code: `// 不使用事件委托的传统方式 - 为每个按钮添加事件监听器
// 问题：DOM元素多时性能差，且动态添加的元素需要额外处理
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
  button.addEventListener('click', function() {
    console.log('按钮被点击了：' + this.textContent);
  });
});

// 使用事件委托 - 只在父元素上设置一个事件监听器
// 优点：性能好，且能处理动态添加的元素
const container = document.getElementById('button-container');
container.addEventListener('click', function(e) {
  // 检查点击的是否为按钮元素
  if (e.target.classList.contains('btn')) {
    console.log('按钮被点击了：' + e.target.textContent);
  }
});

// 复杂一点的事件委托示例 - 处理多种元素和事件
const todoList = document.getElementById('todo-list');
todoList.addEventListener('click', function(e) {
  // 通过特性进行判断，处理不同的元素
  if (e.target.classList.contains('delete-btn')) {
    // 删除按钮被点击
    const todoItem = e.target.closest('.todo-item');
    console.log('删除待办事项:', todoItem.dataset.id);
    todoItem.remove();
  } else if (e.target.classList.contains('edit-btn')) {
    // 编辑按钮被点击
    const todoItem = e.target.closest('.todo-item');
    console.log('编辑待办事项:', todoItem.dataset.id);
  } else if (e.target.classList.contains('checkbox')) {
    // 复选框被点击
    console.log('切换完成状态:', e.target.checked);
  }
});

// 事件委托实现菜单功能示例
document.getElementById('menu').addEventListener('click', function(e) {
  e.preventDefault(); // 阻止链接默认行为
  
  // 获取菜单项数据
  if (e.target.tagName === 'A') {
    const action = e.target.dataset.action;
    switch (action) {
      case 'new':
        console.log('创建新文件');
        break;
      case 'open':
        console.log('打开文件');
        break;
      case 'save':
        console.log('保存文件');
        break;
    }
  }
});

// 实现一个优化的事件委托函数
function delegate(element, eventType, selector, handler) {
  element.addEventListener(eventType, function(e) {
    // 查找是否有符合选择器的元素被点击
    let target = e.target;
    let potentialElements = element.querySelectorAll(selector);
    let hasMatch = false;
    
    // 遍历潜在匹配元素
    for (let i = 0; i < potentialElements.length; i++) {
      let el = potentialElements[i];
      if (el === target || el.contains(target)) {
        hasMatch = true;
        // 设置正确的this和target
        e.delegateTarget = el;
        handler.call(el, e);
        break;
      }
    }
  });
}

// 使用delegate函数
delegate(document.body, 'click', '.btn', function(e) {
  console.log('按钮被委托点击了:', this.textContent);
});`,
    answer: `## 事件委托详解

事件委托（Event Delegation）是一种优化的事件处理模式，它**利用事件冒泡机制**，在父元素上统一处理子元素的事件，而不是为每个子元素单独添加事件监听器。

### 1. 事件委托的原理

事件委托的工作原理基于两个关键概念：

1. **事件冒泡**：当一个元素上的事件被触发时，同样的事件会在该元素的所有祖先元素上依次被触发。
2. **Event.target**：事件对象的 target 属性始终指向触发事件的那个具体元素。

通过在父元素上放置一个事件监听器，我们可以利用 event.target 来确定哪个具体的子元素触发了事件。

### 2. 事件委托的优势

#### 性能优化
- **减少事件处理器数量**：不必为每个元素添加事件监听器
- **减少内存占用**：少量的事件处理器意味着更少的内存消耗
- **提高性能**：尤其是对于大型应用或复杂DOM结构

#### 功能优势
- **动态元素处理**：自动处理动态添加的元素，无需重新绑定事件
- **简化代码**：集中管理事件，代码更简洁
- **减少重复代码**：避免为大量相似元素重复编写处理逻辑

### 3. 实现事件委托的步骤

1. **在共同的父元素上添加事件监听器**
2. **在事件处理函数中，使用 e.target 确定事件源**
3. **检查事件源是否是我们关心的元素类型**
4. **如果是目标元素，执行相应处理逻辑**

### 4. 事件委托的常见应用场景

#### 列表项处理
\`\`\`js
// 为整个列表添加一个事件处理器，而不是每个列表项
document.getElementById('todo-list').addEventListener('click', function(e) {
  if (e.target.tagName === 'LI' || e.target.closest('li')) {
    console.log('列表项被点击:', e.target.textContent);
  }
});
\`\`\`

#### 表格操作
\`\`\`js
// 为整个表格添加事件处理器，处理各种操作按钮
document.querySelector('table').addEventListener('click', function(e) {
  const target = e.target;
  if (target.classList.contains('edit')) {
    // 处理编辑操作
  } else if (target.classList.contains('delete')) {
    // 处理删除操作
  }
});
\`\`\`

#### 表单验证
\`\`\`js
// 在表单容器上监听所有输入事件
formContainer.addEventListener('input', function(e) {
  if (e.target.tagName === 'INPUT') {
    validateInput(e.target);
  }
});
\`\`\`

### 5. 事件委托的局限性

事件委托也存在一些限制：

- **不是所有事件都会冒泡**：例如 focus、blur、load、resize 等
- **有些场景可能需要阻止冒泡**：如果在子元素上阻止了事件冒泡，委托将失效
- **可能需要复杂的匹配逻辑**：确定具体的目标元素有时需要复杂的条件判断

### 6. 事件委托的高级技巧

#### 使用 closest() 方法处理嵌套元素
\`\`\`js
element.addEventListener('click', function(e) {
  // 查找最近的匹配选择器的祖先元素
  const item = e.target.closest('.item');
  if (item) {
    console.log('项目被点击:', item.textContent);
  }
});
\`\`\`

#### 使用 matches() 方法检查元素
\`\`\`js
element.addEventListener('click', function(e) {
  if (e.target.matches('button.action')) {
    console.log('动作按钮被点击');
  }
});
\`\`\`

#### 实现通用的委托函数
\`\`\`js
function delegate(parent, eventType, selector, handler) {
  parent.addEventListener(eventType, function(e) {
    if (e.target.matches(selector)) {
      handler.call(e.target, e);
    }
  });
}

// 使用方式
delegate(document.body, 'click', '.btn', function(e) {
  console.log('按钮被点击:', this.textContent);
});
\`\`\`

### 7. 最佳实践

1. **选择适当的父元素**：不要盲目使用document，选择合适的共同父元素
2. **明确的选择器匹配**：使用明确的类名或属性来识别目标元素
3. **避免过度复杂的匹配逻辑**：复杂的匹配会影响性能
4. **考虑事件类型**：记住某些事件不冒泡，不适用于委托
5. **适度使用**：不需要将所有事件都委托化，评估每种情况

事件委托是现代Web开发中常用的性能优化技术，尤其适合处理大量相似元素的交互，如列表、表格和菜单等UI组件。合理使用事件委托可以大幅提高应用性能和代码质量。`
  }
]

export default questions80;