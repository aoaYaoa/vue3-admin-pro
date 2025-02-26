const questions100 = [
    {
        id: 91,
        title: "链式调用实现方式",
        tags: ["设计模式", "函数式"],
        difficulty: "中等",
        code: `class Calculator {
  constructor(value = 0) {
    this.value = value;
  }

  add(num) {
    this.value += num;
    return this;
  }

  subtract(num) {
    this.value -= num;
    return this;
  }

  multiply(num) {
    this.value *= num;
    return this;
  }

  getResult() {
    return this.value;
  }
}

// 使用示例
const result = new Calculator(10)
  .add(5)
  .multiply(2)
  .subtract(3)
  .getResult(); // 10+5=15, 15*2=30, 30-3=27`,
        answer: `## 链式调用实现原理

### 1. 实现方式
- **返回this**：每个方法执行后返回实例对象本身
- **方法封装**：将操作拆分为独立的方法
- **终止方法**：提供获取最终结果的方法

### 2. 核心代码
\`\`\`js
class Chainable {
  method1() {
    // 操作逻辑
    return this;
  }
  
  method2() {
    // 操作逻辑
    return this;
  }
}
\`\`\`

### 3. 适用场景
- 数学计算（如示例）
- DOM操作（jQuery风格）
- 构建器模式
- 查询构造器

### 4. 优缺点
**优点**：
- 代码可读性强
- 操作流程清晰
- 方便组合多个操作

**缺点**：
- 调试困难
- 需要维护对象状态
- 不能中断链式调用

### 5. 现代扩展
**函数式链式调用**：
\`\`\`js
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const calc = pipe(
  x => x + 5,
  x => x * 2,
  x => x - 3
);

calc(10); // 27
\`\`\``
  },
  {
    id: 92,
    title: "new 操作符内在逻辑",
    tags: ["原型", "构造函数"],
    difficulty: "中等",
    code: `// 手动实现new
function myNew(constructor, ...args) {
  // 1. 创建新对象并链接原型
  const obj = Object.create(constructor.prototype);
  
  // 2. 执行构造函数绑定this
  const result = constructor.apply(obj, args);
  
  // 3. 返回对象
  return result instanceof Object ? result : obj;
}

// 测试用例
function Person(name) {
  this.name = name;
}
Person.prototype.say = function() {
  return \`I'm \${this.name}\`;
};

const p = myNew(Person, 'Alice');
console.log(p.name); // Alice
console.log(p.say()); // I'm Alice`,
    answer: `## new 操作符执行过程

### 完整步骤：
1. **创建空对象**：创建一个新对象
2. **链接原型**：将对象的__proto__指向构造函数的prototype
3. **绑定this**：将this指向新对象并执行构造函数
4. **返回对象**：如果构造函数返回对象则返回该对象，否则返回新对象

### 代码实现解析：
\`\`\`js
function myNew(constructor, ...args) {
  // 步骤1&2
  const obj = Object.create(constructor.prototype);
  
  // 步骤3
  const result = constructor.apply(obj, args);
  
  // 步骤4
  return result instanceof Object ? result : obj;
}
\`\`\`

### 特殊情况处理：
- **构造函数返回基本类型**：忽略返回值
- **构造函数返回对象**：使用该对象
- **箭头函数作为构造函数**：抛出TypeError

### 内存变化示意图：
\`\`\`
[新对象] --> [构造函数.prototype]
               ↑
           实例继承
\`\`\``
  },
  {
    id: 93,
    title: "bind, apply, call 的区别",
    tags: ["函数", "this"],
    difficulty: "中等",
    code: `const obj = { name: 'Alice' };

function greet(greeting, punctuation) {
  return \`\${greeting}, \${this.name}\${punctuation}\`;
}

// call 立即执行
console.log(greet.call(obj, 'Hello', '!')); // Hello, Alice!

// apply 立即执行（数组参数）
console.log(greet.apply(obj, ['Hi', '!!'])); // Hi, Alice!!

// bind 返回新函数
const bound = greet.bind(obj, 'Hey');
console.log(bound('...')); // Hey, Alice...`,
    answer: `## 三种方法对比

| 方法    | 参数形式     | 执行时机   | 返回值       |
|--------|------------|----------|-------------|
| call   | 参数列表     | 立即执行   | 函数返回值    |
| apply  | 数组参数     | 立即执行   | 函数返回值    |
| bind   | 参数列表     | 延迟执行   | 绑定this的新函数 |

### 1. call
\`\`\`js
func.call(context, arg1, arg2, ...)
\`\`\`
- 立即调用函数
- 适合已知参数个数的情况

### 2. apply
\`\`\`js
func.apply(context, [argsArray])
\`\`\`
- 立即调用函数
- 适合参数个数不确定或数组参数

### 3. bind
\`\`\`js
const bound = func.bind(context, arg1, arg2)
bound(arg3)
\`\`\`
- 返回新函数，可多次调用
- 支持柯里化（参数分次传递）

### 实现原理示例：
\`\`\`js
Function.prototype.myBind = function(context, ...args) {
  const self = this;
  return function(...innerArgs) {
    return self.apply(context, args.concat(innerArgs));
  };
};
\`\`\``
  },
  {
    id: 94,
    title: "Ajax 避免浏览器缓存方法",
    tags: ["Ajax", "缓存"],
    difficulty: "简单",
    code: `// 1. URL添加随机参数
xhr.open('GET', '/api/data?_=' + Date.now());

// 2. 设置请求头
xhr.setRequestHeader('Cache-Control', 'no-cache');
xhr.setRequestHeader('Pragma', 'no-cache');

// 3. POST请求（不会被缓存）
xhr.open('POST', '/api/data');

// 4. 服务端设置响应头
// Cache-Control: no-store, must-revalidate
// Expires: 0

// 5. 使用fetch API禁用缓存
fetch('/api/data', {
  cache: 'no-cache',
  headers: {
    'Cache-Control': 'no-cache'
  }
});`,
    answer: `## 避免Ajax缓存的完整方案

### 1. 客户端解决方案
- **URL添加随机参数**：
  \`\`\`js
  url += (url.includes('?') ? '&' : '?') + '_=' + Date.now();
  \`\`\`
  
- **设置请求头**：
  \`\`\`js
  xhr.setRequestHeader('Cache-Control', 'no-cache');
  xhr.setRequestHeader('Pragma', 'no-cache');
  \`\`\`
  
- **使用POST方法**：浏览器不会缓存POST请求

### 2. 服务端解决方案
- **设置响应头**：
  \`\`\`http
  Cache-Control: no-store, no-cache, must-revalidate
  Expires: Thu, 01 Jan 1970 00:00:00 GMT
  Pragma: no-cache
  \`\`\`

### 3. 现代API配置
**fetch禁用缓存**：
\`\`\`js
fetch(url, {
  cache: 'no-store',
  headers: {
    'Cache-Control': 'no-cache'
  }
});
\`\`\`

### 4. 框架方案（如axios）
\`\`\`js
axios.get('/api/data', {
  params: {
    timestamp: Date.now()
  },
  headers: {
    'Cache-Control': 'no-cache'
  }
});
\`\`\``
  },
  {
    id: 95,
    title: "eval 的功能和危害",
    tags: ["安全", "反模式"],
    difficulty: "中等",
    code: `// 基本用法
const result = eval('2 + 2'); // 4

// 作用域访问
let a = 10;
function test() {
  const a = 20;
  eval('console.log(a)'); // 20
  (0, eval)('console.log(a)'); // 10（全局作用域）
}

// 安全风险示例
const userInput = 'alert("XSS")';
eval(userInput); // 执行任意代码

// JSON解析（不安全）
const data = eval('(' + jsonString + ')');

// 替代方案：Function
const safeEval = (code) => Function('"use strict";return ' + code)();`,
    answer: `## eval 的深度解析

### 1. 主要功能
- 执行字符串形式的JavaScript代码
- 访问当前作用域
- 动态生成代码

### 2. 主要危害
- **XSS攻击**：执行任意输入代码
- **作用域污染**：可能修改局部变量
- **性能低下**：无法被JavaScript引擎优化
- **调试困难**：错误堆栈不清晰
- **代码混淆**：降低可读性和可维护性

### 3. 安全使用建议
- 绝对不要执行用户输入
- 使用严格模式：
  \`\`\`js
  eval('"use strict"; let x = 20;');
  \`\`\`
- 使用间接调用隔离作用域：
  \`\`\`js
  (0, eval)(code); // 在全局作用域执行
  \`\`\`

### 4. 替代方案
- **JSON解析**：
  \`\`\`js
  JSON.parse(jsonString);
  \`\`\`
  
- **Function构造函数**：
  \`\`\`js
  const sum = new Function('a', 'b', 'return a + b');
  \`\`\`
  
- **动态import**：
  \`\`\`js
  const module = await import('/path.js');
  \`\`\`
  
- **Web Workers**：隔离执行环境

### 5. 性能对比
操作 | 执行时间（10000次）
---|---
eval | ~500ms 
Function | ~10ms
直接执行 | ~1ms

应尽量避免在生产环境中使用eval`
  },
  {
    id: 96,
    title: "惰性函数",
    tags: ["性能优化", "函数"],
    difficulty: "中等",
    code: `// 浏览器特性检测
function addEvent(type, handler) {
  if (window.addEventListener) {
    // 重写函数
    addEvent = function(type, handler) {
      el.addEventListener(type, handler, false);
    };
  } else if (window.attachEvent) {
    addEvent = function(type, handler) {
      el.attachEvent('on' + type, handler);
    };
  } else {
    addEvent = function(type, handler) {
      el['on' + type] = handler;
    };
  }
  // 首次调用执行
  return addEvent(type, handler);
}

// 计算属性缓存
function heavyCompute() {
  const result = compute(); // 耗时操作
  heavyCompute = () => result; // 重写为直接返回值
  return result;
}`,
    answer: `## 惰性函数模式详解

### 1. 实现原理
- **函数重定义**：在第一次执行时检测环境或计算结果
- **替换实现**：用更高效的具体实现替换原函数
- **后续调用**：直接使用优化后的函数

### 2. 适用场景
- 浏览器特性检测
- 计算属性缓存
- 单次初始化逻辑
- 条件判断优化

### 3. 性能优势
- 避免重复的条件判断
- 减少不必要的计算
- 优化后续调用性能

### 4. 实现模式

#### 条件检测型：
\`\`\`js
function lazy() {
  if (condition) {
    lazy = implementationA;
  } else {
    lazy = implementationB;
  }
  return lazy();
}
\`\`\`

#### 结果缓存型：
\`\`\`js
function compute() {
  const result = heavyWork();
  compute = () => result;
  return result;
}
\`\`\`

### 5. 注意事项
- 不要用于需要动态更新的数据
- 确保首次调用正确初始化
- 注意函数引用的变化
- 不能用于箭头函数（会改变this绑定）`
  },
  {
    id: 97,
    title: "JS 监听对象属性的改变",
    tags: ["对象", "观察者模式"],
    difficulty: "中等",
    code: `// Object.defineProperty
const obj = {};
let value = '';

Object.defineProperty(obj, 'name', {
  get() {
    return value;
  },
  set(newVal) {
    console.log('name changed:', newVal);
    value = newVal;
  }
});

// Proxy
const proxy = new Proxy({}, {
  set(target, prop, value) {
    console.log(\`\${prop} changed to \${value}\`);
    return Reflect.set(target, prop, value);
  }
});

// Class + Setter
class Observable {
  #name = '';
  
  get name() {
    return this.#name;
  }
  
  set name(value) {
    console.log('name changed:', value);
    this.#name = value;
  }
}

// 手动派发更新（如Vue2）
function defineReactive(obj, key) {
  let val = obj[key];
  const deps = [];
  
  Object.defineProperty(obj, key, {
    get() {
      if (currentWatcher) deps.push(currentWatcher);
      return val;
    },
    set(newVal) {
      val = newVal;
      deps.forEach(watcher => watcher());
    }
  });
}`,
    answer: `## 对象属性监听方案对比

### 1. Object.defineProperty
- **优点**：
  - 兼容性好（ES5）
  - 精确控制属性
- **缺点**：
  - 需要遍历对象属性
  - 无法检测新增属性
  - 数组变化需要hack处理

### 2. Proxy
- **优点**：
  - 拦截整个对象
  - 支持数组变化
  - 支持新增属性
- **缺点**：
  - 无法polyfill
  - 浏览器兼容性要求

### 3. 类属性
- **优点**：
  - 标准语法
  - 类型安全
- **缺点**：
  - 需要类定义
  - 无法监听已有对象

### 4. 手动派发
- **优点**：
  - 完全控制
  - 无浏览器限制
- **缺点**：
  - 代码冗余
  - 需要显式调用

### 性能对比
方案 | 初始化开销 | 触发开销
---|---|---
defineProperty | 高 | 低
Proxy | 中 | 低
Class | 低 | 低
手动派发 | 低 | 高

### 应用场景
- **表单验证**：实时校验输入
- **状态管理**：如Vue的响应式系统
- **日志记录**：跟踪对象变化
- **数据同步**：自动保存修改`
  },
  {
    id: 98,
    title: "prototype 和 __proto__ 的区别",
    tags: ["原型", "继承"],
    difficulty: "中等",
    code: `function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  console.log(this.name + ' makes a noise.');
};

const dog = new Animal('Rex');

// 关系示意图
console.log(
  dog.__proto__ === Animal.prototype, // true
  Animal.prototype.__proto__ === Object.prototype, // true
  Animal.__proto__ === Function.prototype // true
);

// 设置原型
const parent = { family: 'Canidae' };
const child = { name: 'Puppy' };
Object.setPrototypeOf(child, parent);

console.log(child.family); // Canidae
console.log(child.__proto__ === parent); // true`,
    answer: `## 原型系统详解

### 1. 核心概念
- **prototype**：函数特有的属性，指向原型对象
- **__proto__**：对象实例的属性，指向构造函数的prototype
- **constructor**：原型对象的属性，指向构造函数

### 2. 关系图示
\`\`\`
实例对象 --__proto__--> 构造函数.prototype
构造函数.prototype --constructor--> 构造函数
构造函数 --prototype--> 构造函数.prototype
\`\`\`

### 3. 原型链查找
\`\`\`js
dog.hasOwnProperty('name'); // true
dog.hasOwnProperty('speak'); // false
dog.speak(); // 通过__proto__查找到Animal.prototype
\`\`\`

### 4. 现代操作方式
- **获取原型**：
  \`\`\`js
  Object.getPrototypeOf(dog);
  \`\`\`
  
- **设置原型**：
  \`\`\`js
  Object.setPrototypeOf(child, parent);
  \`\`\`
  
- **创建对象**：
  \`\`\`js
  const obj = Object.create(parent);
  \`\`\`

### 5. 性能注意事项
- 避免修改已存在对象的原型
- 使用Object.create初始化原型
- 优先使用现代API操作原型`
  },
  {
    id: 99,
    title: "原型链的实践 - 以下代码输出什么？",
    tags: ["原型", "原型链"],
    difficulty: "中等",
    code: `function Parent() {}
Parent.prototype.value = 1;

function Child() {}
Child.prototype = new Parent();

const child = new Child();
Child.prototype.value = 2;

console.log(child.value); // ?
console.log(child.__proto__ === Child.prototype); // ?
console.log(child.__proto__.__proto__ === Parent.prototype); // ?

Parent.prototype.value = 3;
console.log(child.value); // ?`,
    answer: `## 原型链实践解析

### 代码执行分析：
1. **原型链建立**：
   \`\`\`
   child -> Child.prototype (Parent实例) -> Parent.prototype
   \`\`\`
   
2. **初始值设置**：
   - Parent.prototype.value = 1
   - Child.prototype.value = 2（修改实例属性）
   - Parent.prototype.value = 3

### 输出结果：
\`\`\`js
console.log(child.value); // 2
console.log(child.__proto__ === Child.prototype); // true 
console.log(child.__proto__.__proto__ === Parent.prototype); // true
console.log(child.value); // 2（仍为2，因为实例属性覆盖原型）
\`\`\`

### 关键点：
- **属性查找顺序**：实例属性 > 构造函数原型 > 上级原型
- **引用关系**：修改Parent.prototype会影响已创建的实例
- **原型污染**：直接修改内置对象原型会影响所有实例

### 内存结构示意图：
\`\`\`
child 
  → Child.prototype (Parent实例) 
    → Parent.prototype 
      → Object.prototype
\`\`\``
  },
  {
    id: 100,
    title: "如何理解箭头函数没有自己的this?",
    tags: ["ES6", "箭头函数", "this"],
    difficulty: "中等",
    code: `const obj = {
  name: 'Alice',
  regular: function() {
    console.log(this.name);
  },
  arrow: () => {
    console.log(this.name);
  }
};

obj.regular(); // Alice
obj.arrow(); // undefined（假设外层作用域没有name）

// 事件监听示例
button.addEventListener('click', function() {
  console.log(this); // button元素
});

button.addEventListener('click', () => {
  console.log(this); // 外层this（如window）
});

// 类方法错误示例
class Person {
  name = 'Bob';
  say = () => {
    console.log(this.name);
  };
}
const p = new Person();
const say = p.say;
say(); // Bob（正确绑定）`,
    answer: `## 箭头函数this解析

### 1. 核心特性
- **词法作用域**：this在定义时确定，而非调用时
- **无自身this**：继承外层作用域的this值
- **不可改变**：call/apply/bind无法修改

### 2. 与普通函数对比
| 特性         | 普通函数       | 箭头函数         |
|-------------|--------------|----------------|
| this绑定    | 动态         | 词法作用域       |
| arguments   | 有           | 无（可用剩余参数）|
| 构造函数    | 可以         | 不可           |
| 原型属性    | 有           | 无             |

### 3. 适用场景
- **回调函数**：保持外层this
- **类方法**：自动绑定实例
- **函数式编程**：避免this干扰

### 4. 注意事项
- 避免在对象方法中使用
- 避免在原型方法中使用
- 避免需要动态this的场景
- 慎用事件处理函数

### 5. 实现原理
Babel转译后的代码：
\`\`\`js
// 原代码
const arrow = () => console.log(this);

// 转译后
var _this = this;
var arrow = function() {
  console.log(_this);
};
\`\`\``
  }
];

export default questions100;