const questions110 = [
  {
    id: 101,
    title: "上下文与 this 指向",
    tags: ["this", "上下文"],
    difficulty: "中等",
    code: `// 默认绑定
function showThis() {
  console.log(this);
}
showThis(); // window（非严格模式）

// 隐式绑定
const obj = {
  name: 'Alice',
  show: function() {
    console.log(this.name);
  }
};
obj.show(); // Alice

// 显式绑定
function greet() {
  console.log(\`Hello, \${this.name}\`);
}
const john = { name: 'John' };
greet.call(john); // Hello, John

// new绑定
function Person(name) {
  this.name = name;
}
const p = new Person('Bob');
console.log(p.name); // Bob

// 箭头函数
const arrow = () => {
  console.log(this); // 继承外层this
};
arrow();`,
    answer: `## JavaScript this 绑定规则

### 1. 绑定优先级
new绑定 > 显式绑定 > 隐式绑定 > 默认绑定

### 2. 绑定方式详解
#### 默认绑定
- 非严格模式：指向全局对象（window）
- 严格模式：undefined

#### 隐式绑定
- 函数作为对象方法调用
- 容易丢失上下文：
  \`\`\`js
  const show = obj.show;
  show(); // this丢失
  \`\`\`

#### 显式绑定
- call/apply立即调用
- bind返回绑定函数
- 硬绑定：
  \`\`\`js
  const bound = func.bind(context);
  \`\`\`

#### new绑定
- 创建新对象
- 链接原型
- 绑定this
- 返回对象

#### 箭头函数
- 无自身this
- 继承定义时的外层this
- 不可修改

### 3. 特殊场景
- 事件处理函数：指向触发元素
- 定时器回调：默认指向全局对象
- 严格模式影响
- 模块作用域：顶层this为undefined`
  },
  {
    id: 102,
    title: "上下文与 this 指向 (1)",
    tags: ["this", "上下文"],
    difficulty: "中等",
    code: `const obj = {
  name: 'Alice',
  regular: function() {
    console.log(this.name);
  },
  arrow: () => {
    console.log(this.name);
  },
  nested: {
    show: function() {
      console.log(this.name);
    }
  }
};

obj.regular(); // Alice
obj.arrow(); // undefined（假设外层无name）
obj.nested.show(); // undefined

const show = obj.nested.show;
show(); // undefined`,
    answer: `## 嵌套对象中的this分析

### 代码解析：
1. **obj.regular()**：隐式绑定，this指向obj
2. **obj.arrow()**：箭头函数继承外层（模块作用域）this
3. **obj.nested.show()**：隐式绑定到nested对象
4. **show()**：默认绑定到全局对象

### 关键点：
- 箭头函数定义位置决定this
- 方法调用时的最近对象决定this
- 解耦方法调用会丢失上下文

### 解决方案：
- 使用bind：
  \`\`\`js
  obj.nested.show = obj.nested.show.bind(obj);
  \`\`\`
- 箭头函数保存this：
  \`\`\`js
  class Obj {
    constructor() {
      this.name = 'Alice';
      this.nested = {
        show: () => console.log(this.name)
      };
    }
  }
  \`\`\``
  },
  {
    id: 103,
    title: "上下文与 this 指向 (2)",
    tags: ["this", "上下文"],
    difficulty: "中等",
    code: `class Component {
  constructor() {
    this.state = { count: 0 };
    // 绑定方法
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    console.log(this.state.count);
  }
  
  handleArrow = () => {
    console.log(this.state.count);
  }
}

const comp = new Component();
const btn = document.querySelector('button');

// 正确绑定
btn.addEventListener('click', comp.handleClick);
btn.addEventListener('click', comp.handleArrow);

// 错误示例
btn.addEventListener('click', comp.handleClick.bind(null)); // this丢失`,
    answer: `## 类组件中的this处理

### 1. 构造函数绑定
- 在constructor中显式绑定
- 确保方法作为回调时this正确

### 2. 箭头函数属性
- 类属性箭头函数自动绑定实例
- Babel转译为构造函数内绑定：
  \`\`\`js
  class Component {
    constructor() {
      this.handleArrow = () => {...};
    }
  }
  \`\`\`

### 3. 最佳实践
- 事件处理使用箭头函数或绑定
- 避免在render中绑定（导致重复创建函数）
- 使用类属性简化绑定

### 4. 常见错误
- 忘记绑定回调函数
- 多次绑定覆盖this
- 在子组件传递未绑定的方法`
  },
  {
    id: 104,
    title: "去除字符串首尾空格",
    tags: ["字符串", "方法"],
    difficulty: "简单",
    code: `// 原生方法
const str = '  Hello World  ';
console.log(str.trim()); // 'Hello World'

// 正则实现
function trim(str) {
  return str.replace(/^\\s+|\\s+$/g, '');
}

// 处理全角空格
function fullTrim(str) {
  return str.replace(/^[\\s\\u3000]+|[\\s\\u3000]+$/g, '');
}

// 测试用例
console.log(trim(' \\t\\nHello\\u3000')); // 'Hello\\u3000'
console.log(fullTrim(' \\t\\nHello\\u3000')); // 'Hello'`,
    answer: `## 字符串去空方案对比

### 1. String.prototype.trim()
- 去除ASCII空白符（空格、制表符、换行符等）
- 不处理全角空格（\\u3000）
- ES5+支持

### 2. 正则表达式方案
- 基础版：
  \`\`\`js
  /^\\s+|\\s+$/g
  \`\`\`
  
- 增强版（包含全角空格）：
  \`\`\`js
  /^[\\s\\u3000]+|[\\s\\u3000]+$/g
  \`\`\`

### 3. 性能考虑
- 原生trim性能最佳
- 复杂正则可能影响性能
- 超长字符串建议分块处理

### 4. 扩展方法
- trimStart() / trimLeft()
- trimEnd() / trimRight()
- polyfill实现：
  \`\`\`js
  if (!String.prototype.trim) {
    String.prototype.trim = function() {
      return this.replace(/^\\s+|\\s+$/g, '');
    };
  }
  \`\`\``
  },
  {
    id: 105,
    title: "Symbol 特性与作用",
    tags: ["ES6", "Symbol"],
    difficulty: "中等",
    code: `// 创建Symbol
const sym1 = Symbol('desc');
const sym2 = Symbol('desc');
console.log(sym1 === sym2); // false

// 全局注册表
const globalSym = Symbol.for('key');
console.log(Symbol.keyFor(globalSym)); // 'key'

// 对象属性
const obj = {
  [sym1]: 'secret',
  [Symbol.iterator]: function*() { /*...*/ }
};

// 防止属性覆盖
Array.prototype[Symbol.iterator] = function() {}; // 安全

// 内置Symbol
class MyClass {
  [Symbol.toStringTag] = 'MyClass';
  [Symbol.toPrimitive](hint) { /*...*/ }
}`,
    answer: `## Symbol 的深度解析

### 1. 核心特性
- **唯一性**：每次创建新Symbol
- **不可变**：不能添加属性
- **不可枚举**：Object.keys不包含
- **类型转换**：只能显式转为字符串

### 2. 主要用途
- **唯一属性键**：避免命名冲突
- **定义协议**：实现迭代器、toStringTag等
- **元编程**：控制对象行为
- **私有属性模拟**：通过非导出Symbol

### 3. 内置Symbol
- **Symbol.iterator**：定义迭代器
- **Symbol.hasInstance**：控制instanceof
- **Symbol.toPrimitive**：类型转换
- **Symbol.toStringTag**：Object.prototype.toString

### 4. 使用注意事项
- JSON.stringify会忽略Symbol属性
- Object.assign会复制Symbol属性
- Reflect.ownKeys可以获取所有键
- 不能与new一起使用（非构造函数）

### 5. 私有属性实现
\`\`\`js
const _counter = Symbol('counter');
class Widget {
  constructor() {
    this[_counter] = 0;
  }
  increment() {
    this[_counter]++;
  }
}
\`\`\``
  },
  {
    id: 106,
    title: "String 的 startsWith 和 includes 的区别",
    tags: ["字符串", "方法"],
    difficulty: "简单",
    code: `const str = 'Hello World';

console.log(str.startsWith('Hello')); // true
console.log(str.includes('World')); // true
console.log(str.startsWith('World', 6)); // true
console.log(str.includes('Hello', 5)); // false

// 实现startsWith
function myStartsWith(str, search, pos = 0) {
  return str.substr(pos, search.length) === search;
}

// 实现includes
function myIncludes(str, search, pos = 0) {
  return str.indexOf(search, pos) !== -1;
}`,
    answer: `## 字符串包含检测方法对比

### 1. startsWith
- 检测字符串是否以指定子串开头
- 支持指定起始位置
- 返回布尔值
- 大小写敏感

### 2. includes
- 检测字符串是否包含子串
- 支持指定起始位置
- 返回布尔值
- 大小写敏感

### 3. 对比表
| 方法        | 检测位置     | 性能       | 适用场景         |
|------------|-------------|------------|----------------|
| startsWith | 开头        | O(n)       | 检测前缀         |
| includes   | 任意位置    | O(n)       | 通用包含检测     |
| indexOf    | 任意位置    | O(n)       | 需要位置信息     |

### 4. 性能考虑
- 简单检测优先使用内置方法
- 多次检测可预处理（如转为Set）
- 长字符串建议使用KMP等算法

### 5. 兼容性处理
\`\`\`js
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(search, pos) {
    return this.substr(pos || 0, search.length) === search;
  };
}
\`\`\``
  },
  {
    id: 107,
    title: "字符串转数字的方法",
    tags: ["类型转换", "字符串"],
    difficulty: "简单",
    code: `// 方法1: Number()
console.log(Number('123')); // 123
console.log(Number('12.3')); // 12.3
console.log(Number('123abc')); // NaN

// 方法2: parseInt
console.log(parseInt('123px')); // 123
console.log(parseInt('ff', 16)); // 255

// 方法3: parseFloat
console.log(parseFloat('12.3.4')); // 12.3

// 方法4: +运算符
console.log(+'123'); // 123

// 方法5: 位运算
console.log('123' | 0); // 123
console.log('12.3' | 0); // 12

// 方法6: 乘法
console.log('123' * 1); // 123`,
    answer: `## 字符串转数字方法对比

### 1. 各方法特性
| 方法        | 处理小数 | 自动进制 | 忽略非数字字符 | 空字符串 | 性能     |
|------------|---------|----------|---------------|---------|----------|
| Number()   | ✅       | ❌        | ❌             | 0       | 最快      |
| parseInt  | ❌       | ✅        | ✅             | NaN     | 较慢      |
| parseFloat| ✅       | ❌        | ✅             | NaN     | 较慢      |
| +运算符    | ✅       | ❌        | ❌             | 0       | 快        |
| 位运算     | ❌       | ❌        | ✅             | 0       | 最快      |

### 2. 使用建议
- **纯数字字符串**：Number或+
- **包含单位的值**：parseInt/parseFloat
- **进制转换**：parseInt
- **性能关键**：位运算或Number

### 3. 注意事项
- parseInt需要指定进制：
  \`\`\`js
  parseInt('08') // 8（ES5+）
  parseInt('08', 10) // 明确进制
  \`\`\`
- NaN检测：
  \`\`\`js
  Number.isNaN(Number('abc'))
  \`\`\`
- 大数精度：
  \`\`\`js
  Number('9007199254740993') // 精度丢失
  \`\`\``
  },
  {
    id: 108,
    title: "promise 和 await/async 的区别",
    tags: ["异步", "Promise", "async/await"],
    difficulty: "中等",
    code: `// Promise 链
fetchData()
  .then(process)
  .then(data => saveData(data))
  .catch(handleError);

// async/await
async function processData() {
  try {
    const raw = await fetchData();
    const processed = await process(raw);
    await saveData(processed);
  } catch (error) {
    handleError(error);
  }
}

// 混合使用
async function getPageData() {
  const [user, posts] = await Promise.all([
    fetchUser(),
    fetchPosts()
  ]);
  return { user, posts };
}`,
    answer: `## Promise 与 async/await 对比

### 1. 核心差异
| 特性          | Promise                          | async/await                     |
|---------------|-----------------------------------|---------------------------------|
| 语法          | 链式调用                         | 同步风格                        |
| 错误处理      | .catch() 或 then的第二个参数     | try/catch                       |
| 调试          | 困难（匿名函数）                  | 容易（同步流程）                 |
| 流程控制      | 需要手动链式调用                  | 自动暂停/恢复                    |
| 返回值        | Promise对象                       | Promise对象                     |

### 2. 转换关系
- async函数始终返回Promise
- await后面可以是Promise或普通值
- Promise可以转换为async函数：
  \`\`\`js
  async function wrapper() {
    return originalPromise;
  }
  \`\`\`

### 3. 最佳实践
- 使用async/await处理线性异步流程
- 使用Promise处理并行或复杂组合
- 避免在循环中误用await
- 始终使用try/catch包裹await

### 4. 性能考虑
- async/await本质上还是Promise
- 正确使用无性能差异
- 避免不必要的await：
  \`\`\`js
  // 错误
  const a = await getA();
  const b = await getB();
  
  // 正确
  const [a, b] = await Promise.all([getA(), getB()]);
  \`\`\``
  },
  {
    id: 109,
    title: "Array.prototype.sort 内部实现原理",
    tags: ["数组", "算法"],
    difficulty: "困难",
    code: `// V8引擎的排序实现（Timsort）
const arr = [5, 2, 9, 1, 5, 6];
arr.sort((a, b) => a - b); // [1, 2, 5, 5, 6, 9]

// 不稳定排序示例
const users = [
  {name: 'Alice', age: 25},
  {name: 'Bob', age: 25},
  {name: 'Charlie', age: 30}
];
users.sort((a, b) => a.age - b.age);
// Bob可能排在Alice前面

// 自定义稳定排序
function stableSort(arr, compare) {
  return arr
    .map((item, index) => ({item, index}))
    .sort((a, b) => compare(a.item, b.item) || a.index - b.index)
    .map(({item}) => item);
}`,
    answer: `## Array.sort 的深度解析

### 1. 实现算法
- **V8引擎**：Timsort（归并排序+插入排序）
- **Firefox**：Merge sort
- **Safari**：Quick sort + Insertion sort

### 2. 特性
- **时间复杂度**：O(n log n) 平均
- **空间复杂度**：O(n)
- **稳定性**：ES2019要求稳定排序
- **原地排序**：修改原数组

### 3. 比较函数
- 返回负数：a排在b前
- 返回正数：b排在a前
- 返回0：保持顺序（ES2019+）

### 4. 注意事项
- 默认字典序排序：
  \`\`\`js
  [1, 2, 10].sort(); // [1, 10, 2]
  \`\`\`
- NaN处理：NaN被视为小于其他数
- 稀疏数组：空位会被排在最后

### 5. 性能优化
- 避免在比较函数中创建对象
- 预转换数据格式
- 对于小数组（<10），插入排序更高效
- 使用TypedArray处理数字数组

### 6. 手写快排示例
\`\`\`js
function quickSort(arr, compare = (a, b) => a - b) {
  if (arr.length <= 1) return arr;
  const pivot = arr[0];
  const left = [];
  const right = [];
  for (let i = 1; i < arr.length; i++) {
    const cmp = compare(arr[i], pivot);
    cmp < 0 ? left.push(arr[i]) : right.push(arr[i]);
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}
\`\`\``
  },
  {
    id: 110,
    title: "JS 装箱机制 (auto boxing)",
    tags: ["基础概念", "类型系统"],
    difficulty: "中等",
    code: `// 原始类型访问属性
const str = 'hello';
console.log(str.length); // 5，临时包装为String对象

const num = 1.234;
console.log(num.toFixed(2)); // '1.23'，临时包装为Number对象

// 手动装箱
const strObj = new String('hello');
console.log(typeof strObj); // 'object'

// 类型转换
console.log(str instanceof String); // false
console.log(strObj instanceof String); // true

// 特殊用例
const a = 'hello';
a.custom = 'world';
console.log(a.custom); // undefined（临时对象被丢弃）`,
    answer: `## 自动装箱机制详解

### 1. 装箱过程
- 访问原始类型属性时自动创建包装对象
- 操作完成后立即丢弃包装对象
- 不影响原始值本身

### 2. 主要包装类型
| 原始类型 | 包装类型   | 示例方法               |
|---------|-----------|-----------------------|
| string  | String    | length, slice, replace|
| number  | Number    | toFixed, toExponential|
| boolean | Boolean   | valueOf               |
| symbol  | Symbol    | description           |

### 3. 注意事项
- 避免显式创建包装对象
- 使用typeof检测原始类型：
  \`\`\`js
  typeof new String('') // 'object'
  \`\`\`
- 值比较：
  \`\`\`js
  const s = new String('hello');
  console.log(s == 'hello'); // true
  console.log(s === 'hello'); // false
  \`\`\`

### 4. 自动装箱实现
\`\`\`js
// 伪代码实现
function getStringLength(str) {
  const tempObj = new String(str);
  const len = tempObj.length;
  tempObj = null;
  return len;
}
\`\`\``
  },
  {
    id: 111,
    title: "函数传值",
    tags: ["函数", "参数传递"],
    difficulty: "中等",
    code: `// 原始类型传值
function change(num) {
  num = 10;
}
let a = 1;
change(a);
console.log(a); // 1

// 对象类型传引用
function update(obj) {
  obj.value = 2;
}
const b = { value: 1 };
update(b);
console.log(b.value); // 2

// 试图修改引用
function replace(obj) {
  obj = { value: 3 };
}
replace(b);
console.log(b.value); // 2`,
    answer: `## JavaScript 参数传递规则

### 1. 传递机制
- **按值传递**：所有参数都是值传递
- 对于对象类型，传递的是引用的副本

### 2. 不同类型表现
| 类型       | 函数内修改参数 | 外部变量影响 |
|------------|----------------|--------------|
| 原始类型   | 不影响原值     | 无           |
| 对象类型   | 修改属性影响原对象 | 有           |
| 对象类型   | 重新赋值       | 无           |

### 3. 内存示意图
\`\`\`
原始类型：
a = 1
↓ 传递副本
num = 1 → 修改为10（不影响a）

对象类型：
b → {value:1}
↓ 传递引用副本
obj → {value:1} → 修改value为2
\`\`\`

### 4. 特殊案例
- 数组方法修改原数组：
  \`\`\`js
  function push(arr) {
    arr.push(4);
  }
  const nums = [1,2,3];
  push(nums); // nums变为[1,2,3,4]
  \`\`\`
  
- 重新赋值不影响原引用：
  \`\`\`js
  function reassign(arr) {
    arr = [4,5,6];
  }
  reassign(nums); // nums仍为[1,2,3,4]
  \`\`\``
  },
  {
    id: 112,
    title: "不同类型宏任务的优先级",
    tags: ["事件循环", "宏任务"],
    difficulty: "困难",
    code: `// 不同宏任务源
setTimeout(() => console.log('timeout'));
requestAnimationFrame(() => console.log('raf'));
queueMicrotask(() => console.log('microtask'));

const channel = new MessageChannel();
channel.port1.postMessage('');
channel.port2.onmessage = () => console.log('message');

Promise.resolve().then(() => console.log('promise'));

// 点击事件
button.addEventListener('click', () => console.log('click'));
button.click();`,
    answer: `## 事件循环任务优先级

### 1. 任务队列优先级
1. **微任务**：
   - Promise.then
   - queueMicrotask
   - MutationObserver

2. **渲染相关**：
   - requestAnimationFrame
   - Layout/Paint

3. **宏任务**（按浏览器实现排序）：
   - 用户交互（点击等）
   - MessageChannel
   - setTimeout/setInterval
   - I/O

### 2. 典型执行顺序
\`\`\`
1. 同步代码
2. 微任务
3. RAF回调
4. 渲染
5. 宏任务
\`\`\`

### 3. 代码示例分析
输出顺序可能为：
\`\`\`
click（同步执行）
promise（微任务）
raf（渲染阶段）
message（宏任务）
timeout（宏任务）
\`\`\`

### 4. 注意事项
- 不同浏览器实现可能有差异
- requestAnimationFrame在渲染前执行
- 多个同类型宏任务按入队顺序执行
- 用户交互事件通常优先级较高

### 5. 性能优化
- 耗时操作放入宏任务避免阻塞渲染
- 使用微任务更新UI状态
- 使用requestAnimationFrame处理动画
- 避免在微任务中执行耗时操作`
  }
];

export default questions110;