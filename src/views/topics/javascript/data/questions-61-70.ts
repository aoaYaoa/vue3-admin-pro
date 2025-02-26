const questions70 = [
  {
    id: 61,
    title: "什么是闭包，有什么作用",
    tags: ["闭包", "作用域", "高级概念"],
    difficulty: "中等",
    code: `// 闭包示例
function createCounter() {
  let count = 0;  // 局部变量
  
  return function() {
    count++;  // 访问外部函数的变量
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3`,
    answer: `## 闭包的定义与原理

闭包是指一个函数能够访问并记住创建它时的词法作用域，即使该函数在其词法作用域之外执行。简单来说，闭包就是函数和声明该函数的词法环境的组合。

### 闭包的关键特性：

1. 函数内部可以访问外部函数的变量
2. 这些变量的值会被"记住"(保留在内存中)，不会被垃圾回收机制回收

### 闭包的主要作用：

1. **数据封装和私有变量**：创建私有变量，实现类似面向对象中的private
2. **状态保持**：维护函数调用之间的状态
3. **实现模块模式**：创建拥有私有变量和方法的模块
4. **函数工厂**：生成具有特定行为的函数
5. **实现柯里化和偏函数应用**：将多参数函数转换为一系列单参数函数

### 闭包的应用场景：

1. **计数器函数**：如示例代码展示的
2. **事件处理程序**：在回调函数中访问外层作用域的变量
3. **防抖和节流函数**：在闭包中保存定时器状态
4. **单例模式**：通过闭包缓存实例
5. **IIFE(立即执行函数)**：创建隔离的作用域

### 闭包的注意事项：

1. 闭包会占用内存，如果使用不当可能导致内存泄漏
2. 过度使用闭包可能导致代码难以理解和维护
3. 在循环中创建闭包时需要特别注意变量捕获问题`
  },
  {
    id: 62,
    title: "常用的 console 方法有哪些",
    tags: ["调试", "工具", "基础"],
    difficulty: "简单",
    code: `// 基本输出
console.log('普通日志输出');
console.info('信息类日志');
console.warn('警告信息');
console.error('错误信息');

// 分组和缩进
console.group('分组标题');
console.log('分组内容1');
console.log('分组内容2');
console.groupEnd();

// 性能测量
console.time('计时器');
// 执行一些操作...
console.timeEnd('计时器');

// 表格形式展示数据
console.table([
  { name: '张三', age: 25 },
  { name: '李四', age: 30 }
]);

// 断言
console.assert(1 === 2, '断言失败信息');

// 样式化输出
console.log('%c 彩色文本', 'color: red; font-size: 20px;');`,
    answer: `## JavaScript 控制台方法全解析

浏览器的 console 对象提供了多种方法用于调试和性能分析。以下是常用方法：

### 基本输出方法

1. **console.log()**：最常用的方法，在控制台打印普通信息
2. **console.info()**：信息类型的输出，在某些浏览器中会有特殊图标
3. **console.warn()**：警告类型的输出，通常以黄色背景显示
4. **console.error()**：错误类型的输出，通常以红色显示并包含堆栈跟踪
5. **console.debug()**：调试信息输出(需要开启调试级别)

### 格式化和分组

6. **console.group()** / **console.groupCollapsed()**：创建一个可折叠的分组
7. **console.groupEnd()**：结束当前分组
8. **console.table()**：以表格形式显示数据，非常适合展示对象数组
9. **console.dir()**：显示指定对象的所有属性

### 性能分析

10. **console.time(label)** / **console.timeEnd(label)**：测量操作执行时间
11. **console.timeLog(label)**：在不结束计时的情况下输出当前计时值
12. **console.count(label)**：计数器，统计执行次数

### 条件和堆栈

13. **console.assert(condition, message)**：条件为假时输出错误信息
14. **console.trace()**：输出当前执行位置的堆栈跟踪

### 清空和样式化

15. **console.clear()**：清空控制台
16. **自定义样式**：使用 %c 配合 CSS 样式字符串格式化输出

### 实用技巧

- 使用 console.table() 分析大型数据集
- 在循环中使用 console.count() 统计迭代次数
- 使用 console.group() 对相关日志进行分组
- 使用 console.time() 和 console.timeEnd() 进行性能分析

这些控制台方法是前端开发中不可或缺的调试工具，能够大幅提高开发效率和调试体验。`
  },
  {
    id: 63,
    title: "数组去重的方法",
    tags: ["数组", "算法", "常见问题"],
    difficulty: "中等",
    code: `// 1. 使用 Set + Array.from
function uniqueWithSet(arr) {
  return Array.from(new Set(arr));
}

// 2. 使用 Set + 展开运算符
function uniqueWithSetSpread(arr) {
  return [...new Set(arr)];
}

// 3. 使用 filter
function uniqueWithFilter(arr) {
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index;
  });
}

// 4. 使用 reduce
function uniqueWithReduce(arr) {
  return arr.reduce((unique, item) => {
    return unique.includes(item) ? unique : [...unique, item];
  }, []);
}

// 5. 使用 Map
function uniqueWithMap(arr) {
  const map = new Map();
  return arr.filter(item => {
    if (!map.has(item)) {
      map.set(item, true);
      return true;
    }
    return false;
  });
}

// 6. 使用对象 (仅适用于简单值)
function uniqueWithObject(arr) {
  const obj = {};
  return arr.filter(item => {
    return obj.hasOwnProperty(item) ? false : (obj[item] = true);
  });
}

// 测试数组
const array = [1, 2, 2, 3, 3, 4, 5, 5];

// 测试对象数组(需要更复杂的处理)
const objArray = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'Alice' }
];

// 使用键值对比去重对象数组
function uniqueObjectArray(arr, key) {
  const map = new Map();
  return arr.filter(item => {
    if (!map.has(item[key])) {
      map.set(item[key], true);
      return true;
    }
    return false;
  });
}

// 使用 JSON.stringify 去重对象数组
function uniqueByStringify(arr) {
  const map = new Map();
  return arr.filter(item => {
    const key = JSON.stringify(item);
    if (!map.has(key)) {
      map.set(key, true);
      return true;
    }
    return false;
  });
}`,
    answer: `## JavaScript 数组去重全解析

数组去重是前端开发中常见的需求，以下是多种实现方法及其比较：

### 1. 使用 Set (ES6+)
最简洁且高效的方法，Set 对象天然不允许重复值。

**优点**：
- 代码简洁，性能高
- 可以处理基本类型值

**缺点**：
- 无法直接处理对象引用类型的去重

### 2. 使用 filter + indexOf
通过检查元素第一次出现的索引是否等于当前索引。

**优点**：
- 兼容性好，适用于旧浏览器
- 代码易于理解

**缺点**：
- 性能较差，尤其是大数组
- indexOf 使用 === 比较，对 NaN 处理不当

### 3. 使用 reduce
将元素依次添加到新数组，仅当新数组中不存在该元素时。

**优点**：
- 函数式编程范式
- 逻辑清晰

**缺点**：
- includes() 对大数组效率较低
- 每次迭代创建新数组可能影响性能

### 4. 使用 Map
利用 Map 数据结构记录已出现的元素。

**优点**：
- 性能较好
- 可以通过自定义键处理对象去重

**缺点**：
- 代码稍复杂

### 5. 使用对象属性
利用对象属性名不可重复的特性。

**优点**：
- 代码简单
- 性能较好

**缺点**：
- 仅适用于作为属性名的类型(字符串、数字等)
- 可能有原型链污染风险

### 6. 对象数组去重
对象引用不同，需要比较关键属性或将对象序列化。

**解决方案**：
- 按指定键去重
- 使用 JSON.stringify 序列化比较(适用于简单对象)

### 性能比较(从快到慢)：
1. Set + 展开/Array.from (最快)
2. Map
3. Object 属性
4. reduce
5. filter + indexOf (最慢)

### 实践建议：
- 简单场景：优先使用 Set
- 对象数组：使用 Map + 自定义键
- 需求复杂：根据具体场景选择或组合使用

选择合适的去重方法应考虑：数组大小、元素类型、浏览器兼容性、性能要求等因素。`
  },
  {
    id: 64,
    title: "JS 数组常见操作方式及返回值",
    tags: ["数组", "方法", "基础"],
    difficulty: "中等",
    code: `// 创建数组
const array1 = [1, 2, 3, 4, 5];
const array2 = new Array(1, 2, 3);

// 添加和删除元素
array1.push(6);            // 返回新长度 6
array1.pop();              // 返回被删除的元素 6
array1.unshift(0);         // 返回新长度 6
array1.shift();            // 返回被删除的元素 0

// 在指定位置操作元素
array1.splice(1, 2, 'a');  // 返回被删除的元素数组 [2, 3]
                           // array1 现在是 [1, 'a', 4, 5]

// 数组截取与合并
const sliced = array1.slice(1, 3);    // 返回新数组 ['a', 4]
const combined = array1.concat(array2); // 返回新数组 [1, 'a', 4, 5, 1, 2, 3]

// 查找元素
const index = array1.indexOf('a');     // 返回索引 1
const lastIndex = array1.lastIndexOf(5); // 返回索引 3
const found = array1.includes(4);      // 返回布尔值 true

// 查找元素(ES6+)
const foundObj = [{id: 1}, {id: 2}].find(item => item.id === 2); // 返回找到的元素 {id: 2}
const foundIndex = [{id: 1}, {id: 2}].findIndex(item => item.id === 2); // 返回索引 1

// 数组转换
const joined = array1.join('-');      // 返回字符串 "1-a-4-5"
const reversed = [...array1].reverse(); // 返回反转后的新数组 [5, 4, 'a', 1]

// 数组排序
array1.sort();                        // 返回排序后的数组(原地修改) ['a', 1, 4, 5]
                                      // 注意：默认按字符串排序

// 数组迭代方法
array1.forEach(item => console.log(item)); // 返回 undefined
const mapped = array1.map(item => typeof item === 'number' ? item * 2 : item); // 返回新数组
const filtered = array1.filter(item => typeof item === 'number'); // 返回新数组 [1, 4, 5]
const hasNumbers = array1.some(item => typeof item === 'number'); // 返回布尔值 true
const allNumbers = array1.every(item => typeof item === 'number'); // 返回布尔值 false

// 数组归约
const sum = [1, 2, 3, 4].reduce((acc, curr) => acc + curr, 0); // 返回累加结果 10

// 填充数组
const filled = new Array(3).fill('x'); // 返回填充后的数组 ['x', 'x', 'x']

// 扁平化数组(ES2019+)
const flattened = [1, [2, [3, 4]]].flat(2); // 返回扁平化数组 [1, 2, 3, 4]

// 创建数组副本
const copy1 = [...array1];            // 使用展开语法
const copy2 = Array.from(array1);     // 使用Array.from()`,
    answer: `## JavaScript 数组方法全解析

JavaScript 数组提供了丰富的方法用于各种操作。下面按功能分类详细说明各个方法及其返回值：

### 1. 添加/删除元素

| 方法 | 描述 | 修改原数组 | 返回值 |
|------|------|------------|--------|
| **push(item1, item2, ...)** | 末尾添加元素 | ✅ | 新数组长度 |
| **pop()** | 删除最后一个元素 | ✅ | 被删除的元素 |
| **unshift(item1, item2, ...)** | 开头添加元素 | ✅ | 新数组长度 |
| **shift()** | 删除第一个元素 | ✅ | 被删除的元素 |
| **splice(start, deleteCount, items...)** | 删除/添加/替换元素 | ✅ | 被删除元素的数组 |

### 2. 数组访问与提取

| 方法 | 描述 | 修改原数组 | 返回值 |
|------|------|------------|--------|
| **slice(start, end)** | 提取数组的一部分 | ❌ | 新数组 |
| **concat(array1, array2, ...)** | 合并多个数组 | ❌ | 新数组 |
| **join(separator)** | 数组元素连接为字符串 | ❌ | 字符串 |
| **toString()** | 转换为字符串 | ❌ | 字符串 |

### 3. 搜索与位置

| 方法 | 描述 | 修改原数组 | 返回值 |
|------|------|------------|--------|
| **indexOf(item, from)** | 查找元素索引 | ❌ | 索引值或-1 |
| **lastIndexOf(item, from)** | 从后向前查找 | ❌ | 索引值或-1 |
| **includes(item, from)** | 检查数组是否包含元素 | ❌ | 布尔值 |
| **find(callback)** | 查找符合条件的第一个元素 | ❌ | 元素或undefined |
| **findIndex(callback)** | 查找符合条件的第一个元素的索引 | ❌ | 索引值或-1 |

### 4. 转换与排序

| 方法 | 描述 | 修改原数组 | 返回值 |
|------|------|------------|--------|
| **reverse()** | 颠倒数组元素顺序 | ✅ | 修改后的数组 |
| **sort(compareFunction)** | 对数组元素排序 | ✅ | 排序后的数组 |
| **fill(value, start, end)** | 用值填充数组 | ✅ | 填充后的数组 |
| **copyWithin(target, start, end)** | 复制数组的一部分到同数组中的另一位置 | ✅ | 修改后的数组 |

### 5. 迭代方法

| 方法 | 描述 | 修改原数组 | 返回值 |
|------|------|------------|--------|
| **forEach(callback)** | 为每个元素执行回调 | ❌ | undefined |
| **map(callback)** | 创建新数组，值是回调结果 | ❌ | 新数组 |
| **filter(callback)** | 创建包含通过测试的元素的新数组 | ❌ | 新数组 |
| **reduce(callback, initialValue)** | 使用回调函数将数组归约为单个值 | ❌ | 累加结果 |
| **reduceRight(callback, initialValue)** | 从右到左归约 | ❌ | 累加结果 |
| **every(callback)** | 检查所有元素是否通过测试 | ❌ | 布尔值 |
| **some(callback)** | 检查是否至少有一个元素通过测试 | ❌ | 布尔值 |

### 6. ES2015+新增方法

| 方法 | 描述 | 修改原数组 | 返回值 |
|------|------|------------|--------|
| **Array.from(arrayLike, mapFn, thisArg)** | 从类数组对象创建数组 | - | 新数组 |
| **Array.of(element0, element1, ...)** | 创建具有可变数量参数的数组 | - | 新数组 |
| **flat(depth)** | 展平嵌套数组 | ❌ | 新数组 |
| **flatMap(callback)** | 先映射再展平 | ❌ | 新数组 |

### 实用技巧

1. 使用**解构赋值**快速获取元素
2. 利用**展开运算符**(...) 复制数组
3. 链式调用多个方法如 \`array.filter(...).map(...)\`
4. 使用 Array.isArray() 检查是否为数组

### 注意事项

1. 许多方法不修改原数组，而是返回新数组
2. sort() 默认按字符串顺序排序，需要自定义比较函数
3. 对空数组调用 reduce() 没有初始值会报错`
  },
  {
    id: 65,
    title: "JS 数组 reduce 方法的妙用",
    tags: ["数组", "reduce", "函数式编程"],
    difficulty: "中等",
    code: `// 1. 数组求和
const sum = [1, 2, 3, 4].reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 10

// 2. 数组求最大值
const max = [1, 5, 2, 8, 3].reduce((max, curr) => Math.max(max, curr), -Infinity);
console.log(max); // 8

// 3. 数组扁平化
const flattened = [[1, 2], [3, 4], [5, 6]].reduce((acc, curr) => acc.concat(curr), []);
console.log(flattened); // [1, 2, 3, 4, 5, 6]

// 4. 统计数组中元素出现次数
const frequency = ['a', 'b', 'a', 'c', 'b', 'a'].reduce((count, curr) => {
  count[curr] = (count[curr] || 0) + 1;
  return count;
}, {});
console.log(frequency); // {a: 3, b: 2, c: 1}

// 5. 按属性分组
const people = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 25 },
  { name: 'Dave', age: 30 }
];

const groupByAge = people.reduce((acc, curr) => {
  (acc[curr.age] = acc[curr.age] || []).push(curr);
  return acc;
}, {});
console.log(groupByAge);
// {
//   25: [{ name: 'Alice', age: 25 }, { name: 'Charlie', age: 25 }],
//   30: [{ name: 'Bob', age: 30 }, { name: 'Dave', age: 30 }]
// }

// 6. 数组去重
const unique = [1, 2, 2, 3, 4, 4, 5].reduce((acc, curr) => {
  if (!acc.includes(curr)) {
    acc.push(curr);
  }
  return acc;
}, []);
console.log(unique); // [1, 2, 3, 4, 5]

// 7. 串行执行 Promise
const runPromisesInSequence = (promiseFactories, initialValue) =>
  promiseFactories.reduce(
    (promise, factory) => promise.then(factory),
    Promise.resolve(initialValue)
  );

// 8. 实现管道/组合功能
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const double = x => x * 2;
const addFive = x => x + 5;
const square = x => x * x;

const compute = pipe(double, addFive, square);
console.log(compute(3)); // ((3*2)+5)^2 = 121

// 9. 构建查询字符串
const queryString = Object.entries({
  name: 'John',
  age: 30,
  city: 'New York'
}).reduce((query, [key, value], index) => {
  return query + (index === 0 ? '?' : '&') + key + '=' + encodeURIComponent(value);
}, '');
console.log(queryString); // ?name=John&age=30&city=New%20York`,
    answer: `## JavaScript reduce 方法详解

\`reduce\` 是 JavaScript 数组的强大方法，用于将数组归约为单个值。它通过对数组中的每个元素执行提供的函数，从而累积出一个返回值。

### 基本语法

\`\`\`js
array.reduce(callback(accumulator, currentValue, currentIndex, array), initialValue)
\`\`\`

**参数说明**：
- **callback**：每个元素执行的函数，包含四个参数：
  - **accumulator**：累加器，上一次调用回调的返回值
  - **currentValue**：当前处理的元素
  - **currentIndex**：当前元素的索引（可选）
  - **array**：调用 reduce 的数组（可选）
- **initialValue**：首次调用回调时 accumulator 的初始值（可选但强烈推荐提供）

### 常见应用场景

#### 1. 累加/累乘计算

最基础的用法是计算数组元素之和或乘积：
\`\`\`js
const sum = [1, 2, 3, 4].reduce((acc, curr) => acc + curr, 0); // 10
const product = [1, 2, 3, 4].reduce((acc, curr) => acc * curr, 1); // 24
\`\`\`

#### 2. 数组扁平化

替代 \`flat()\` 方法扁平化嵌套数组：
\`\`\`js
const flattened = [[1, 2], [3, 4]].reduce((acc, curr) => acc.concat(curr), []);
\`\`\`

#### 3. 统计数据

计算元素出现频率：
\`\`\`js
const frequency = ['A', 'B', 'A'].reduce((acc, curr) => {
  acc[curr] = (acc[curr] || 0) + 1;
  return acc;
}, {});
\`\`\`

#### 4. 分组操作

根据特定属性对对象数组进行分组：
\`\`\`js
const groupBy = people.reduce((acc, person) => {
  (acc[person.age] = acc[person.age] || []).push(person);
  return acc;
}, {});
\`\`\`

#### 5. 数组去重

\`\`\`js
const unique = array.reduce((acc, curr) => 
  acc.includes(curr) ? acc : [...acc, curr], []);
\`\`\`

#### 6. 函数式编程

实现函数组合/管道：
\`\`\`js
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
\`\`\`

#### 7. 序列化操作

构建查询字符串：
\`\`\`js
const queryString = Object.entries(params).reduce(
  (qs, [key, value]) => \`\${qs}\${qs ? '&' : ''}\${key}=\${value}\`, 
  ''
);
\`\`\`

#### 8. 异步操作链

串行执行一系列 Promise：
\`\`\`js
const runSequentially = promiseFns => 
  promiseFns.reduce((p, fn) => p.then(fn), Promise.resolve());
\`\`\`

### 使用技巧与最佳实践

1. **始终提供初始值**：避免空数组错误，同时明确累加器的数据类型
2. **注意累加器类型**：确保累加器的初始类型与预期返回值一致
3. **保持回调函数纯净**：避免在 reduce 回调中产生副作用
4. **考虑性能**：对大型数组，考虑是否有更优的专用方法
5. **增强可读性**：复杂逻辑时，使用命名函数而非匿名函数

### 与其他数组方法的对比

- **map + filter 组合** vs **reduce**：前者更具可读性但需要多次遍历
- **forEach + 外部变量** vs **reduce**：前者更简单但不符合函数式风格
- **for 循环** vs **reduce**：前者性能可能略好但代码更冗长

reduce 是一个极其灵活的方法，几乎可以替代所有其他数组方法，但并不意味着所有场景都应该使用它。选择最清晰、最易维护的解决方案始终是最佳实践。`
  },
  {
    id: 66,
    title: "如何遍历对象",
    tags: ["对象", "遍历", "基础"],
    difficulty: "简单",
    code: `// 示例对象
const person = {
  name: 'Alice',
  age: 30,
  city: 'New York',
  greet: function() {
    console.log('Hello!');
  }
};

// 1. for...in 循环
console.log('--- for...in ---');
for (const key in person) {
  // 检查是否是对象自身的属性
  if (person.hasOwnProperty(key)) {
    console.log(key + ': ' + person[key]);
  }
}

// 2. Object.keys()
console.log('--- Object.keys() ---');
Object.keys(person).forEach(key => {
  console.log(key + ': ' + person[key]);
});

// 3. Object.values()
console.log('--- Object.values() ---');
Object.values(person).forEach(value => {
  console.log(value);
});

// 4. Object.entries()
console.log('--- Object.entries() ---');
Object.entries(person).forEach(([key, value]) => {
  console.log(key + ': ' + value);
});

// 5. Object.getOwnPropertyNames()
console.log('--- Object.getOwnPropertyNames() ---');
Object.getOwnPropertyNames(person).forEach(key => {
  console.log(key + ': ' + person[key]);
});

// 6. Reflect.ownKeys()
console.log('--- Reflect.ownKeys() ---');
Reflect.ownKeys(person).forEach(key => {
  console.log(key + ': ' + person[key]);
});

// 创建带有 Symbol 和不可枚举属性的对象
const advancedObject = {
  visible: 'I am visible',
  [Symbol('id')]: 'I am a symbol'
};

// 添加不可枚举属性
Object.defineProperty(advancedObject, 'hidden', {
  value: 'I am hidden',
  enumerable: false
});

console.log('--- 高级对象遍历 ---');
// for...in 不会显示 Symbol 和不可枚举属性
console.log('for...in:');
for (const key in advancedObject) {
  console.log(key); // 只显示 'visible'
}

// Object.keys() 不会显示 Symbol 和不可枚举属性
console.log('Object.keys():');
console.log(Object.keys(advancedObject)); // ['visible']

// getOwnPropertyNames() 会显示不可枚举属性，但不显示 Symbol
console.log('Object.getOwnPropertyNames():');
console.log(Object.getOwnPropertyNames(advancedObject)); // ['visible', 'hidden']

// Object.getOwnPropertySymbols() 只显示 Symbol 属性
console.log('Object.getOwnPropertySymbols():');
console.log(Object.getOwnPropertySymbols(advancedObject)); // [Symbol(id)]

// Reflect.ownKeys() 显示所有属性，包括 Symbol 和不可枚举属性
console.log('Reflect.ownKeys():');
console.log(Reflect.ownKeys(advancedObject)); // ['visible', 'hidden', Symbol(id)]`,
    answer: `## JavaScript 对象遍历方法全解析

JavaScript 提供了多种遍历对象属性的方法，每种方法各有特点和适用场景。以下是详细比较：

### 1. for...in 循环

最古老的对象遍历方法，遍历对象的可枚举属性，包括原型链上的属性。

\`\`\`js
for (const key in obj) {
  if (obj.hasOwnProperty(key)) { // 避免遍历原型链属性
    console.log(key, obj[key]);
  }
}
\`\`\`

**特点**：
- ✅ 广泛支持，兼容性好
- ✅ 可以遍历从原型链继承的属性
- ❌ 需要使用 hasOwnProperty 过滤继承属性
- ❌ 不遍历 Symbol 属性
- ❌ 不遍历不可枚举属性

### 2. Object.keys()

返回对象自身可枚举属性的字符串键名数组。

\`\`\`js
Object.keys(obj).forEach(key => {
  console.log(key, obj[key]);
});
\`\`\`

**特点**：
- ✅ 只包含对象自身的可枚举属性
- ✅ 返回数组，可以使用数组方法
- ❌ 不包含 Symbol 键
- ❌ 不包含不可枚举属性

### 3. Object.values()

返回对象自身可枚举属性的值的数组。

\`\`\`js
Object.values(obj).forEach(value => {
  console.log(value);
});
\`\`\`

**特点**：
- ✅ 直接获取所有值
- ✅ ES2017 新增，简化值的获取
- ❌ 丢失键名信息
- ❌ 与 Object.keys() 有相同的限制

### 4. Object.entries()

返回对象自身可枚举属性的键值对数组。

\`\`\`js
Object.entries(obj).forEach(([key, value]) => {
  console.log(key, value);
});
\`\`\`

**特点**：
- ✅ 同时获取键和值
- ✅ 支持解构赋值
- ✅ 可直接转换为 Map: new Map(Object.entries(obj))
- ❌ 与 Object.keys() 有相同的限制

### 5. Object.getOwnPropertyNames()

返回对象自身所有属性的字符串键名，包括不可枚举属性。

\`\`\`js
Object.getOwnPropertyNames(obj).forEach(key => {
  console.log(key, obj[key]);
});
\`\`\`

**特点**：
- ✅ 包含不可枚举属性
- ✅ 只返回对象自身属性
- ❌ 不包含 Symbol 键

### 6. Object.getOwnPropertySymbols()

返回对象自身的所有 Symbol 属性键。

\`\`\`js
Object.getOwnPropertySymbols(obj).forEach(sym => {
  console.log(sym, obj[sym]);
});
\`\`\`

**特点**：
- ✅ 专门用于 Symbol 属性
- ❌ 不包含字符串键名

### 7. Reflect.ownKeys()

返回对象自身的所有属性键，包括字符串键和 Symbol 键，也包括不可枚举属性。

\`\`\`js
Reflect.ownKeys(obj).forEach(key => {
  console.log(key, obj[key]);
});
\`\`\`

**特点**：
- ✅ 最全面的属性获取方法
- ✅ 包含所有类型的键
- ✅ 包含不可枚举属性
- ❌ 浏览器兼容性略差

### 属性类型与遍历方法对照表

| 方法 | 自身可枚举属性 | 自身不可枚举属性 | Symbol 属性 | 继承属性 |
|-----|--------------|----------------|------------|---------|
| for...in | ✅ | ❌ | ❌ | ✅ |
| Object.keys() | ✅ | ❌ | ❌ | ❌ |
| Object.values() | ✅ (值) | ❌ | ❌ | ❌ |
| Object.entries() | ✅ (键值对) | ❌ | ❌ | ❌ |
| Object.getOwnPropertyNames() | ✅ | ✅ | ❌ | ❌ |
| Object.getOwnPropertySymbols() | ❌ | ❌ | ✅ | ❌ |
| Reflect.ownKeys() | ✅ | ✅ | ✅ | ❌ |

### 选择指南

1. **简单对象遍历**：Object.keys() 或 Object.entries()
2. **需要遍历继承属性**：for...in + hasOwnProperty
3. **需要包括不可枚举和 Symbol**：Reflect.ownKeys()
4. **只需要所有值**：Object.values()
5. **需要处理特殊属性**：结合多种方法

不同场景下选择合适的遍历方法可以提高代码的效率和可读性。`
  },
  {
    id: 67,
    title: "创建函数的几种方式",
    tags: ["函数", "基础", "ES6"],
    difficulty: "简单",
    code: `// 1. 函数声明
function add1(a, b) {
  return a + b;
}

// 2. 函数表达式
const add2 = function(a, b) {
  return a + b;
};

// 3. 箭头函数
const add3 = (a, b) => a + b;

// 4. 函数构造函数
const add4 = new Function('a', 'b', 'return a + b');

// 5. 方法简写（对象字面量）
const calculator = {
  add(a, b) {
    return a + b;
  }
};

// 6. 类方法
class Calculator {
  add(a, b) {
    return a + b;
  }
}

// 7. 生成器函数
function* idGenerator() {
  let id = 0;
  while (true) {
    yield id++;
  }
}

// 8. 异步函数
async function fetchData() {
  const response = await fetch('https://api.example.com/data');
  return await response.json();
}

// 9. 立即执行函数表达式 (IIFE)
const result = (function(a, b) {
  return a + b;
})(1, 2);

// 10. 异步箭头函数
const fetchUser = async (id) => {
  const response = await fetch(\`https://api.example.com/users/\${id}\`);
  return await response.json();
};

// 11. 递归函数
function factorial(n) {
  return n <= 1 ? 1 : n * factorial(n - 1);
}

// 12. 柯里化函数
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

const curriedAdd = curry((a, b, c) => a + b + c);
console.log(curriedAdd(1)(2)(3)); // 6`,
    answer: `## JavaScript 函数创建方式详解

JavaScript 提供了多种创建函数的方式，每种方式有其特点和适用场景：

### 1. 函数声明

最基本的函数定义方式，会被提升到作用域顶部。

\`\`\`js
function functionName(parameters) {
  // 函数体
}
\`\`\`

**特点**：
- ✅ 完全提升，可以在声明前调用
- ✅ 语法简洁直观
- ✅ 便于调试(函数名出现在堆栈跟踪中)
- ❌ 无法避免被重新声明覆盖

### 2. 函数表达式

将函数赋值给变量的方式。

\`\`\`js
const functionName = function(parameters) {
  // 函数体
};
\`\`\`

**特点**：
- ✅ 可以创建匿名函数
- ✅ 变量提升但赋值不提升，避免提前使用
- ✅ 可用于条件判断中创建函数
- ❌ 需要先声明再使用

### 3. 箭头函数 (ES6)

更简洁的函数表达式语法。

\`\`\`js
const functionName = (parameters) => {
  // 函数体
};
\`\`\`

**特点**：
- ✅ 语法简洁，尤其适合单行函数
- ✅ 不绑定自己的 this, arguments
- ✅ 自动返回单表达式的值
- ❌ 不能作为构造函数
- ❌ 没有 arguments 对象
- ❌ 不能用作生成器

### 4. 函数构造函数

使用 Function 构造函数创建。

\`\`\`js
const functionName = new Function('param1', 'param2', 'return param1 + param2');
\`\`\`

**特点**：
- ✅ 可以动态生成函数代码
- ✅ 参数和函数体可以是字符串
- ❌ 性能较差
- ❌ 无法访问词法作用域
- ❌ 潜在安全风险(eval类似)

### 5. 对象方法简写 (ES6)

在对象字面量中定义方法的简洁方式。

\`\`\`js
const obj = {
  methodName(parameters) {
    // 方法体
  }
};
\`\`\`

**特点**：
- ✅ 简洁的语法
- ✅ 方法与对象直接相关联
- ✅ this 指向对象实例
- ❌ 不能独立于对象使用

### 6. 类方法 (ES6)

在 ES6 类中定义方法。

\`\`\`js
class ClassName {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return \`Hello, my name is \${this.name}\`;
  }
}
const person6 = new PersonClass('Frank', 33);
\`\`\`

**优点**：
- ✅ 面向对象风格
- ✅ 可以使用继承
- ✅ 在严格模式下运行
- ❌ 需要实例化类才能使用

### 7. 生成器函数 (ES6)

能够暂停和恢复执行的特殊函数。

\`\`\`js
function* generatorFunction() {
  yield value1;
  yield value2;
}
\`\`\`

**特点**：
- ✅ 可以控制函数执行流程
- ✅ 可以惰性计算序列
- ✅ 实现迭代器接口
- ❌ 语法较为特殊
- ❌ 理解和使用略复杂

### 8. 异步函数 (ES2017)

内置支持 Promise 的函数。

\`\`\`js
async function asyncFunction() {
  await promise;
}
\`\`\`

**特点**：
- ✅ 使异步代码看起来像同步代码
- ✅ 自动包装返回值为 Promise
- ✅ 支持 try/catch 捕获异步错误
- ❌ 需要了解 Promise 工作原理

### 9. 立即执行函数表达式 (IIFE)

定义后立即执行的函数。

\`\`\`js
(function() {
  // 函数体
})();
\`\`\`

**特点**：
- ✅ 创建独立的作用域
- ✅ 避免污染全局命名空间
- ✅ 数据私有化
- ❌ 只能执行一次

### 选择指南

1. **一般用途**：使用函数声明或函数表达式
2. **简单回调函数**：使用箭头函数
3. **面向对象编程**：使用类方法
4. **异步操作**：使用异步函数
5. **需要迭代控制**：使用生成器函数
6. **模块模式**：使用 IIFE
7. **动态代码**：在极特殊情况下使用函数构造函数

函数是 JavaScript 的核心概念，掌握各种创建方式有助于写出更清晰、更高效的代码。根据具体场景选择合适的函数创建方式可以提高代码质量和可维护性。`
  },
  {
    id: 68,
    title: "创建对象的几种方式",
    tags: ["对象", "基础", "创建方式"],
    difficulty: "中等",
    code: `// 1. 对象字面量
const person1 = {
  name: 'Alice',
  age: 30,
  greet() {
    return \`Hello, my name is \${this.name}\`;
  }
};

// 2. 构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.greet = function() {
    return \`Hello, my name is \${this.name}\`;
  };
}
const person2 = new Person('Bob', 25);

// 3. Object.create()
const personProto = {
  greet() {
    return \`Hello, my name is \${this.name}\`;
  }
};
const person3 = Object.create(personProto);
person3.name = 'Charlie';
person3.age = 35;

// 4. 工厂函数
function createPerson(name, age) {
  return {
    name,
    age,
    greet() {
      return \`Hello, my name is \${this.name}\`;
    }
  };
}
const person4 = createPerson('Dave', 40);

// 5. 构造函数 + 原型模式
function PersonProto(name, age) {
  this.name = name;
  this.age = age;
}
PersonProto.prototype.greet = function() {
  return \`Hello, my name is \${this.name}\`;
};
const person5 = new PersonProto('Eve', 28);

// 6. ES6 类
class PersonClass {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return \`Hello, my name is \${this.name}\`;
  }
}
const person6 = new PersonClass('Frank', 33);

// 7. 动态原型模式
function PersonDynamic(name, age) {
  this.name = name;
  this.age = age;
  
  // 只在第一次创建实例时定义原型方法
  if (typeof this.greet !== 'function') {
    PersonDynamic.prototype.greet = function() {
      return \`Hello, my name is \${this.name}\`;
    };
  }
}
const person7 = new PersonDynamic('Grace', 38);

// 8. Mixin 模式
const greetingMixin = {
  greet() {
    return \`Hello, my name is \${this.name}\`;
  }
};

const ageMixin = {
  getAge() {
    return this.age;
  }
};

const person8 = Object.assign({}, 
  { name: 'Hank', age: 45 }, 
  greetingMixin, 
  ageMixin
);

// 9. 单例模式
const PersonSingleton = (function() {
  let instance;
  
  function createInstance(name, age) {
    return {
      name,
      age,
      greet() {
        return \`Hello, my name is \${this.name}\`;
      }
    };
  }
  
  return {
    getInstance(name, age) {
      if (!instance) {
        instance = createInstance(name, age);
      }
      return instance;
    }
  };
})();

const person9 = PersonSingleton.getInstance('Ian', 50);`,
    answer: `## JavaScript 创建对象的方法全解析

JavaScript 提供了多种创建对象的方式，每种方式有其特点和适用场景。以下是详细解析：

### 1. 对象字面量

最简单直接的创建对象方式。

\`\`\`js
const obj = {
  property: value,
  method() { /* 代码 */ }
};
\`\`\`

**优点**：
- ✅ 语法简洁明了
- ✅ 代码量少，创建单个对象最快捷
- ✅ 可以直接初始化多个属性和方法

**缺点**：
- ❌ 创建多个相似对象时代码重复
- ❌ 无法实现对象继承

**适用场景**：单个简单对象、配置对象、一次性使用的对象

### 2. 构造函数

使用 \`new\` 关键字创建对象实例。

\`\`\`js
function Constructor(param1, param2) {
  this.prop1 = param1;
  this.prop2 = param2;
  this.method = function() { /* 代码 */ };
}
const obj = new Constructor('value1', 'value2');
\`\`\`

**优点**：
- ✅ 可以创建多个相似结构的对象
- ✅ 明确表示创建对象的意图
- ✅ 支持传递参数

**缺点**：
- ❌ 方法在每个实例中都会重新创建，浪费内存
- ❌ 如果忘记使用 \`new\` 会导致意外行为

**适用场景**：需要创建多个具有相同属性和方法的对象

### 3. Object.create()

基于现有对象创建新对象，新对象继承原对象的属性和方法。

\`\`\`js
const proto = { method() { /* 代码 */ } };
const obj = Object.create(proto);
obj.property = value;
\`\`\`

**优点**：
- ✅ 直接指定对象的原型
- ✅ 实现纯粹的原型继承
- ✅ 可以创建没有原型的对象：\`Object.create(null)\`

**缺点**：
- ❌ 语法相对复杂
- ❌ 属性需要单独添加

**适用场景**：需要明确指定原型链、创建具有特定原型的对象

### 4. 工厂函数

返回对象的普通函数。

\`\`\`js
function createObj(param1, param2) {
  return {
    prop1: param1,
    prop2: param2,
    method() { /* 代码 */ }
  };
}
const obj = createObj('value1', 'value2');
\`\`\`

**优点**：
- ✅ 可以创建多个相似对象
- ✅ 不需要使用 \`new\` 关键字
- ✅ 可以在函数内部封装复杂逻辑

**缺点**：
- ❌ 无法识别对象类型（instanceof 无效）
- ❌ 每个对象都有自己的方法副本

**适用场景**：需要封装创建对象的复杂过程、希望避免使用 \`new\` 关键字

### 5. 构造函数 + 原型模式

将方法定义在原型上，属性定义在构造函数中。

\`\`\`js
function Constructor(param1, param2) {
  this.prop1 = param1;
  this.prop2 = param2;
}
Constructor.prototype.method = function() { /* 代码 */ };
const obj = new Constructor('value1', 'value2');
\`\`\`

**优点**：
- ✅ 属性在实例中，保持独立
- ✅ 方法在原型中，所有实例共享
- ✅ 内存效率高

**缺点**：
- ❌ 代码分散，定义属性和方法的位置不同
- ❌ 原型上的引用类型属性会被所有实例共享

**适用场景**：性能要求高、需要创建大量对象

### 6. ES6 类

ES6引入的类语法。

\`\`\`js
class ClassName {
  constructor(param1, param2) {
    this.prop1 = param1;
    this.prop2 = param2;
  }
  
  method() { /* 代码 */ }
}
const obj = new ClassName('value1', 'value2');
\`\`\`

**优点**：
- ✅ 语法更接近其他面向对象语言
- ✅ 清晰的构造函数标识
- ✅ 内置支持 \`extends\` 继承
- ✅ 声明式方法定义

**缺点**：
- ❌ 旧版浏览器可能需要转译
- ❌ 本质上仍是原型继承的语法糖

**适用场景**：需要类层次结构、习惯于面向对象编程的开发者

### 7. 其他模式

**动态原型模式**：在构造函数中动态添加原型方法
**Mixin模式**：通过Object.assign()组合多个对象
**单例模式**：确保只创建一个对象实例

### 选择指南

1. **简单单个对象**：使用对象字面量
2. **多个相似对象，关注性能**：构造函数+原型模式
3. **清晰的类层次结构**：ES6类
4. **基于已有对象**：Object.create()
5. **复杂对象创建逻辑**：工厂函数或单例模式
6. **对象组合**：Mixin模式

随着JavaScript的发展，创建对象的最佳实践也在不断演变。面向更现代的应用程序开发，ES6类通常是首选方法，而对象字面量则是创建简单对象的最佳选择。选择方法时应考虑可读性、可维护性、内存效率和团队熟悉度。`
  },
  {
    id: 69,
    title: "宿主对象、内置对象、原生对象的区别",
    tags: ["对象", "概念", "分类"],
    difficulty: "中等",
    code: `// 原生对象（Native Objects）
// 由ECMAScript规范定义的对象
const obj = new Object(); // Object 构造函数创建的对象
const arr = new Array();  // Array 构造函数创建的对象
const date = new Date();  // Date 构造函数创建的对象
const regExp = new RegExp('\\d+'); // RegExp 构造函数创建的对象
const func = new Function('a', 'b', 'return a + b'); // Function 构造函数创建的对象
const err = new Error('出错了'); // Error 构造函数创建的对象

// 内置对象（Built-in Objects）
// 由ECMAScript规范定义，不需要显式实例化的对象
console.log(Math.PI); // Math 对象
console.log(JSON.stringify({ name: 'John' })); // JSON 对象
console.log(Reflect.has({ name: 'John' }, 'name')); // Reflect 对象
console.log(Infinity); // Infinity 是全局属性，表示无穷大
console.log(NaN); // NaN 是全局属性，表示"非数字"
console.log(undefined); // undefined 是全局属性

// 宿主对象（Host Objects）
// 由JavaScript运行环境提供的对象

// 浏览器环境
// window 是全局对象，也是宿主对象
// document 是DOM的入口点
// history, location, navigator 都是浏览器提供的
/* 
console.log(window);
console.log(document);
console.log(history);
console.log(location);
console.log(navigator);
console.log(screen);
*/

// Node.js环境
/* 
console.log(global); // Node.js 全局对象
console.log(process); // 进程对象
console.log(Buffer); // 用于处理二进制数据
console.log(require); // 模块加载
*/

// 自定义对象（User-defined Objects）
// 开发者创建的对象
const person = {
  name: 'John',
  age: 30,
  sayHello() {
    console.log('Hello!');
  }
};

// 使用构造函数创建的自定义对象
function Car(make, model) {
  this.make = make;
  this.model = model;
}
const myCar = new Car('Toyota', 'Corolla');`,
    answer: `## JavaScript 中的对象分类详解

JavaScript 中的对象可以分为多种类型，每种类型有不同的创建方式、用途和特性。

### 1. 原生对象（Native Objects）

原生对象是由 ECMAScript 规范定义的、可以通过构造函数创建的对象。

**主要特点**：
- 由 JavaScript 引擎实现，满足 ECMAScript 规范
- 通常使用内置构造函数创建实例
- 在所有 JavaScript 环境中都可用

**常见原生对象**：
- Object
- Array
- Function
- Boolean
- Number
- String
- Date
- RegExp
- Error (及各种特定错误类型)
- Symbol (ES6)
- Map, Set, WeakMap, WeakSet (ES6)
- ArrayBuffer, TypedArray (ES6)
- Promise (ES6)

**创建方式**：
\`\`\`js
const arr = new Array();
const date = new Date();
// 或使用字面量语法 (适用于部分原生对象)
const arr2 = [];
\`\`\`

### 2. 内置对象（Built-in Objects）

内置对象是 JavaScript 引擎提供的、不需要通过构造函数实例化的全局对象。

**主要特点**：
- 由 JavaScript 引擎直接提供
- 不需要使用 new 关键字创建
- 通常提供静态方法和属性

**常见内置对象**：
- Math：提供数学计算相关的方法和常量
- JSON：提供 JSON 解析和序列化功能
- Reflect：提供操作对象的方法 (ES6)
- Intl：国际化相关功能 (ES6)
- 全局对象（Global Object）：提供全局属性和方法，如 undefined、NaN、Infinity、eval()、isNaN() 等

**使用方式**：
\`\`\`js
Math.random();  // 不需要实例化
JSON.parse('{"name":"John"}');
\`\`\`

### 3. 宿主对象（Host Objects）

宿主对象是由 JavaScript 运行环境（如浏览器或 Node.js）提供的对象，不是 ECMAScript 规范的一部分。

**主要特点**：
- 由宿主环境（如浏览器、Node.js）提供
- 在不同环境中可能有显著差异
- 通常用于访问环境特定的功能

**浏览器环境的宿主对象**：
- window：全局对象，提供浏览器窗口相关功能
- document：DOM 树的入口点
- location：当前 URL 信息
- history：浏览历史记录
- navigator：浏览器信息
- XMLHttpRequest/fetch：网络请求
- console：控制台输出
- localStorage/sessionStorage：本地存储

**Node.js 环境的宿主对象**：
- global：全局对象
- process：当前进程信息
- Buffer：二进制数据处理
- require/module：模块系统
- fs/http/path 等模块提供的对象

**使用方式**：
\`\`\`js
// 浏览器中
document.getElementById('app');
window.localStorage.setItem('key', 'value');

// Node.js中
process.env.NODE_ENV;
require('fs').readFileSync('file.txt');
\`\`\`

### 4. 自定义对象（User-defined Objects）

开发者通过代码创建的对象。

**创建方式**：
- 对象字面量
- 构造函数
- ES6 类
- Object.create()

\`\`\`js
// 对象字面量
const user = { name: 'John' };

// 构造函数
function User(name) {
  this.name = name;
}
const user2 = new User('Jane');

// ES6 类
class User3 {
  constructor(name) {
    this.name = name;
  }
}
\`\`\`

### 对比表格

| 类别 | 创建方式 | 定义来源 | 示例 |
|------|---------|---------|------|
| 原生对象 | 构造函数/字面量 | ECMAScript 规范 | Array, Date, RegExp |
| 内置对象 | 直接使用 | ECMAScript 规范 | Math, JSON, Reflect |
| 宿主对象 | 环境提供 | 运行环境 | window, document, process |
| 自定义对象 | 开发者创建 | 用户代码 | 自定义类和对象 |

### 实际应用中的区分意义

理解不同类型对象的区别有助于：

1. **调试问题**：区分问题是由语言本身还是环境导致
2. **代码兼容性**：编写跨环境运行的代码
3. **性能优化**：了解不同对象的底层实现
4. **安全考虑**：部分宿主对象可能被篡改而原生对象通常更可靠

在日常开发中，重要的是理解每种对象的特性和限制，以便正确使用它们。`
  },
  {
    id: 70,
    title: "如何区分数组和对象?",
    tags: ["数组", "对象", "类型判断"],
    difficulty: "简单",
    code: `// 示例数据
const myArray = [1, 2, 3];
const myObject = { a: 1, b: 2 };

// 1. typeof 操作符 - 不能区分数组和对象
console.log(typeof myArray);   // 'object'
console.log(typeof myObject);  // 'object'

// 2. instanceof 操作符
console.log(myArray instanceof Array);  // true
console.log(myObject instanceof Array);  // false

// 3. Array.isArray() 方法
console.log(Array.isArray(myArray));  // true
console.log(Array.isArray(myObject));  // false

// 4. Object.prototype.toString.call()
console.log(Object.prototype.toString.call(myArray));  // '[object Array]'
console.log(Object.prototype.toString.call(myObject));  // '[object Object]'

// 5. 检查 length 属性和数字索引 (不够可靠)
const arrayLike = { 0: 'a', 1: 'b', length: 2 };
console.log(arrayLike.length);  // 2 (像数组)
console.log(myArray.length);    // 3
console.log(myObject.length);   // undefined

// 6. 检查数组方法
console.log(Array.prototype.slice === myArray.slice);  // true
console.log(Array.prototype.slice === myObject.slice); // false
console.log(typeof myArray.forEach === 'function');    // true
console.log(typeof myObject.forEach === 'function');   // false

// 7. 构造函数名称 (有些环境不支持)
console.log(myArray.constructor.name);  // 'Array'
console.log(myObject.constructor.name); // 'Object'

// 自定义判断函数
function isArray(value) {
  // 最可靠的方式: 优先使用 Array.isArray (ES5+)
  if (Array.isArray) {
    return Array.isArray(value);
  }
  // 回退方案: 使用 Object.prototype.toString
  return Object.prototype.toString.call(value) === '[object Array]';
}

console.log(isArray(myArray));  // true
console.log(isArray(myObject)); // false`,
    answer: `## JavaScript 中区分数组和对象的方法

在 JavaScript 中，数组本质上是一种特殊的对象，因此区分它们需要特定的方法。以下是各种区分数组和对象的方法及其优缺点。

### 1. typeof 操作符

\`\`\`js
typeof myArray;  // 'object'
typeof myObject; // 'object'
\`\`\`

**结论**：无法区分数组和对象，因为两者都返回 'object'。

### 2. instanceof 操作符

\`\`\`js
myArray instanceof Array;  // true
myObject instanceof Array;  // false
\`\`\`

**优点**：
- 语法简单直观
- 可以识别继承关系

**缺点**：
- 在多框架环境中不可靠（不同窗口或 iframe 的 Array 构造函数不同）
- 可以被重写或修改

### 3. Array.isArray() (推荐)

\`\`\`js
Array.isArray(myArray);  // true
Array.isArray(myObject); // false
\`\`\`

**优点**：
- ES5 标准方法，专门用于此目的
- 最简洁可靠
- 可以识别从其他窗口或框架创建的数组
- 语义明确

**缺点**：
- 在 ES5 之前的环境不支持（IE8 及以下）

### 4. Object.prototype.toString.call() (最可靠)

\`\`\`js
Object.prototype.toString.call(myArray);  // '[object Array]'
Object.prototype.toString.call(myObject); // '[object Object]'
\`\`\`

**优点**：
- 最全面可靠的方法，几乎适用于所有场景
- 可以区分多种对象类型，不仅限于数组
- 不易被篡改
- 跨框架可靠

**缺点**：
- 语法冗长
- 可读性稍差

### 5. 检查数组特有属性和方法

\`\`\`js
typeof myArray.forEach === 'function';  // true
typeof myObject.forEach === 'function'; // false
\`\`\`

**优点**：
- 可以用于特定场景

**缺点**：
- 不够可靠，因为对象可以添加同名方法
- 数组方法可能被修改
- 类数组对象可能有类似属性

### 6. constructor 属性

\`\`\`js
myArray.constructor === Array;  // true
myObject.constructor === Array; // false
\`\`\`

**优点**：
- 简单直观

**缺点**：
- constructor 属性可以被修改
- 不适用于没有 constructor 属性的对象

### 7. length 属性检查

检查是否有数字索引和 length 属性。

**缺点**：
- 极不可靠，因为类数组对象也有这些特征
- 普通对象也可以添加 length 属性

### 最佳实践

**综合可靠性、兼容性和简洁性**，推荐的检测顺序是：

1. 首选：\`Array.isArray(value)\`（现代环境）
2. 备选：\`Object.prototype.toString.call(value) === '[object Array]'\`（兼容性好）

**实用函数**：

\`\`\`js
function isArray(value) {
  // 优先使用标准方法
  if (Array.isArray) {
    return Array.isArray(value);
  }
  // 兼容性处理
  return Object.prototype.toString.call(value) === '[object Array]';
}
\`\`\`

### 其他考虑

1. **类数组对象** 如 DOM 集合、arguments 对象，它们有类似数组的行为但不是真正的数组。可以用 \`Array.from()\` 将它们转换为真正的数组。

2. **框架或库中** 通常已经提供了类型检测工具，如 Lodash 的 \`_.isArray()\`。

3. **TypeScript** 中，可以使用类型系统来区分数组和对象，在编译时就能检测类型错误。

选择合适的方法取决于你的使用环境、兼容性需求及代码风格。在现代 JavaScript 中，\`Array.isArray()\` 是最佳选择，而 \`Object.prototype.toString.call()\` 是最通用的兼容性方案。`
  }
];
export default questions70; 