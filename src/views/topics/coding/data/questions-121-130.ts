const questions130 = [
  {
    id: 121,
    title: '多维数组降为一维（数组扁平化）',
    description: '多维数组降为一维（数组扁平化）',
    answer: '多维数组降为一维（数组扁平化）',
    tags: ['数组', '递归', '扁平化'],
    difficulty: '中等',
    code: `// 递归实现
function flatten(arr) {
  return arr.reduce((acc, val) => 
    Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), 
  []);
}

// 使用迭代
function flattenIterative(arr) {
  const stack = [...arr];
  const result = [];
  while (stack.length) {
    const next = stack.pop();
    if (Array.isArray(next)) {
      stack.push(...next);
    } else {
      result.unshift(next);
    }
  }
  return result;
}

// 使用内置方法
const flattenNative = arr => arr.flat(Infinity);`
  },
  {
    id: 122,
    title: '找到页面所有 a标签的 href 属性',
    description: '找到页面所有 a标签的 href 属性',
    answer: '找到页面所有 a标签的 href 属性',
    tags: ['DOM', '操作', '选择器'],
    difficulty: '简单',
    code: `// 获取所有a标签
const links = document.getElementsByTagName('a');

// 转换为数组并提取href
const hrefs = Array.from(links).map(a => a.href);

// 使用querySelectorAll
const allLinks = document.querySelectorAll('a[href]');
const hrefList = Array.from(allLinks).map(a => a.href);

// 处理相对路径
function getAbsoluteUrls() {
  return Array.from(document.links).map(link => {
    return new URL(link.href, document.baseURI).href;
  });
}

// 过滤无效链接
const validHrefs = hrefs.filter(href => {
  try {
    return new URL(href).protocol.startsWith('http');
  } catch {
    return false;
  }
});`
  },
  {
    id: 123,
    title: '如何给按钮绑定两个事件',
    description: '如何给按钮绑定两个事件',
    answer: '如何给按钮绑定两个事件',
    tags: ['DOM', '事件'],
    difficulty: '简单',
    code: `// HTML: <button id="myBtn">点击我</button>

// 方法1: addEventListener
const btn = document.getElementById('myBtn');
btn.addEventListener('click', handleClick1);
btn.addEventListener('click', handleClick2);

// 方法2: 事件代理
document.body.addEventListener('click', function(e) {
  if (e.target.matches('#myBtn')) {
    handleClick1();
    handleClick2();
  }
});

// 方法3: 合并处理函数
function combinedHandler() {
  handleClick1();
  handleClick2();
}
btn.onclick = combinedHandler;

// 移除事件
btn.removeEventListener('click', handleClick1);`
  },
  {
    id: 124,
    title: '实现拖拉拽功能',
    description: '实现拖拉拽功能',
    answer: '实现拖拉拽功能',
    tags: ['拖拽', '交互', 'DOM'],
    difficulty: '中等',
    code: `class Draggable {
  constructor(element) {
    this.element = element;
    this.isDragging = false;
    this.initialX = 0;
    this.initialY = 0;
    this.xOffset = 0;
    this.yOffset = 0;

    this.element.style.position = 'absolute';
    this.element.style.cursor = 'move';

    this.element.addEventListener('mousedown', this.start.bind(this));
    document.addEventListener('mousemove', this.drag.bind(this));
    document.addEventListener('mouseup', this.end.bind(this));
  }

  start(e) {
    this.isDragging = true;
    
    this.initialX = e.clientX - this.xOffset;
    this.initialY = e.clientY - this.yOffset;

    if (this.isDragging) {
      document.body.style.userSelect = 'none';
    }
  }

  drag(e) {
    if (this.isDragging) {
      e.preventDefault();
      
      this.xOffset = e.clientX - this.initialX;
      this.yOffset = e.clientY - this.initialY;

      this.element.style.transform = \`translate(\${this.xOffset}px, \${this.yOffset}px)\`;
    }
  }

  end() {
    this.isDragging = false;
    document.body.style.userSelect = '';
  }
}

// 使用
new Draggable(document.getElementById('draggable'));`
  },
  {
    id: 125,
    title: '原地打乱数组（数组洗牌）',
    description: '原地打乱数组（数组洗牌）',
    answer: '原地打乱数组（数组洗牌）',
    tags: ['数组', '随机', '算法'],
    difficulty: '中等',
    code: `// Fisher-Yates 洗牌算法
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// ES6 版本
const modernShuffle = arr => {
  arr.forEach((_, i) => {
    const j = i + Math.floor(Math.random() * (arr.length - i));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  });
  return arr;
};

// 测试
const arr = [1, 2, 3, 4, 5];
console.log(shuffle([...arr])); // 随机顺序`
  },
  {
    id: 126,
    title: '不能用 Array.sort 方法如何实现排序',
    description: '不能用 Array.sort 方法如何实现排序',
    answer: '不能用 Array.sort 方法如何实现排序',
    tags: ['排序', '算法', '数组'],
    difficulty: '中等',
    code: `// 冒泡排序
function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

// 快速排序
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[0];
  const left = [];
  const right = [];
  for (let i = 1; i < arr.length; i++) {
    arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]);
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}

// 归并排序
function mergeSort(arr) {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  while (left.length && right.length) {
    result.push(left[0] < right[0] ? left.shift() : right.shift());
  }
  return [...result, ...left, ...right];
}`
  },
  {
    id: 127,
    title: '对象深拷贝',
    description: '对象深拷贝',
    answer: '对象深拷贝',
    tags: ['对象', '深拷贝', '递归'],
    difficulty: '中等',
    code: `function deepClone(obj, map = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (map.has(obj)) return map.get(obj);

  let clone;
  switch (true) {
    case obj instanceof Date:
      clone = new Date(obj);
      break;
    case obj instanceof RegExp:
      clone = new RegExp(obj);
      break;
    case Array.isArray(obj):
      clone = [];
      map.set(obj, clone);
      clone = obj.map(item => deepClone(item, map));
      break;
    case obj instanceof Map:
      clone = new Map();
      map.set(obj, clone);
      obj.forEach((v, k) => clone.set(k, deepClone(v, map)));
      break;
    case obj instanceof Set:
      clone = new Set();
      map.set(obj, clone);
      obj.forEach(v => clone.add(deepClone(v, map)));
      break;
    default:
      clone = Object.create(Object.getPrototypeOf(obj));
      map.set(obj, clone);
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          clone[key] = deepClone(obj[key], map);
        }
      }
  }
  return clone;
}

// 测试用例
const obj = { 
  date: new Date(),
  regex: /test/g,
  arr: [1, { a: 2 }],
  map: new Map([['key', 'value']]),
  set: new Set([1, 2, 3])
};
const cloned = deepClone(obj);`
  },
  {
    id: 128,
    title: '实现一个柯里化函数 add',
    description: '实现一个柯里化函数 add',
   
    tags: ['函数式编程', '柯里化'],
    difficulty: '中等',
    code: `// 基础柯里化
function add(a) {
  return function(b) {
    return a + b;
  };
}

// 通用柯里化
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
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6

// 支持占位符
function advancedCurry(fn) {
  const placeholder = Symbol();
  return function curried(...args) {
    const complete = args.length >= fn.length && 
      !args.slice(0, fn.length).includes(placeholder);
    
    if (complete) return fn.apply(this, args);
    
    return (...args2) => {
      const merged = [];
      let i = 0, j = 0;
      while (i < args.length || j < args2.length) {
        if (i < args.length && args[i] !== placeholder) {
          merged.push(args[i++]);
        } else {
          if (j < args2.length) {
            merged.push(args2[j++]);
            i++;
          } else {
            merged.push(placeholder);
            i++;
          }
        }
      }
      return curried(...merged);
    };
  };
}`,
    answer: `## 柯里化技术详解

### 1. 柯里化概念
- 将多参数函数转换为一系列单参数函数
- 延迟执行直到所有参数收集完成

### 2. 实现要点
- 参数长度判断
- 递归返回新函数
- 参数合并

### 3. 应用场景
- 参数复用
- 延迟计算
- 函数组合
- 动态生成函数

### 4. 高级功能
- 占位符支持
- 无限参数柯里化
- 自动柯里化装饰器

### 5. 性能考虑
- 内存占用（闭包）
- 调用栈深度
- 参数处理开销

### 6. 数学证明
柯里化与反柯里化遵循：
\`\`\`
curry(f)(a)(b) = f(a, b)
uncurry(g)(a, b) = g(a)(b)
\`\`\``
  },
  {
    id: 129,
    title: '字符串 "abcde" 如何反转',
    description: '字符串 "abcde" 如何反转',
    answer: '字符串 "abcde" 如何反转',
    tags: ['字符串', '反转'],
    difficulty: '简单',
    code: `// 方法1: 使用数组方法
function reverseStr1(str) {
  return str.split('').reverse().join('');
}

// 方法2: 递归
function reverseStr2(str) {
  return str === '' ? '' : reverseStr2(str.substr(1)) + str[0];
}

// 方法3: 循环
function reverseStr3(str) {
  let reversed = '';
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

// 方法4: 扩展运算符
const reverseStr4 = str => [...str].reverse().join('');

// 方法5: reduce
const reverseStr5 = str => [...str].reduce((acc, char) => char + acc, '');

// 测试
console.log(reverseStr1('abcde')); // edcba`
  },
  {
    id: 130,
    title: '实现一个防抖函数',
    description: '实现一个防抖函数',
    answer: '实现一个防抖函数',
    tags: ['防抖', '性能优化', '函数'],
    difficulty: '中等',
    code: `function debounce(fn, delay, immediate = false) {
  let timer = null;
  let isInvoked = false;

  return function(...args) {
    const context = this;
    
    if (immediate && !isInvoked) {
      fn.apply(context, args);
      isInvoked = true;
    }

    clearTimeout(timer);
    timer = setTimeout(() => {
      if (!immediate) {
        fn.apply(context, args);
      }
      isInvoked = false;
    }, delay);
  };
}

// 使用示例
const resizeHandler = debounce(() => {
  console.log('Window resized');
}, 300);

window.addEventListener('resize', resizeHandler);`
  }
];

export default questions130;