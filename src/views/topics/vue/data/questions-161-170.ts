const questions170 = [
  {
    id: 161,
    title: "为什么 Vue 中的 data 必须是函数",
    tags: ["Vue", "组件", "数据"],
    difficulty: "简单",
    code: `// 错误写法：对象形式
export default {
  data: {
    count: 0
  }
}

// 正确写法：函数形式
export default {
  data() {
    return {
      count: 0
    }
  }
}

// 测试实例
const ComponentA = { data: { count: 0 } };
const ComponentB = { data: { count: 0 } };

const a1 = new ComponentA();
const a2 = new ComponentA();
a1.data.count = 1;
console.log(a2.data.count); // 1（共享数据）

const ComponentC = { data() { return { count: 0 } } };
const c1 = new ComponentC();
const c2 = new ComponentC();
c1.data.count = 1;
console.log(c2.data.count); // 0（独立数据）`,
    answer: `## Vue 组件 data 必须为函数的原因

### 1. 根本原因
- 防止多个组件实例共享同一数据对象
- 确保每个组件实例维护独立的数据副本

### 2. 对象形式的问题
- 所有实例共享同一数据对象
- 修改一个实例会影响其他实例
- 导致状态污染

### 3. 函数形式的好处
- 每次实例化时返回新数据对象
- 保证数据独立性
- 符合组件化设计原则

### 4. 源码实现
\`\`\`js
function initData(vm) {
  let data = vm.$options.data;
  data = vm._data = typeof data === 'function' 
    ? getData(data, vm) 
    : data || {};
}
\`\`\`

### 5. 特殊情况
- 根实例可以使用对象形式（因为只实例化一次）
- 混合使用时优先函数形式

### 6. 最佳实践
- 始终使用函数形式
- 复杂数据使用工厂函数
- 避免在data中直接引用外部对象`
  },
  {
    id: 162,
    title: "Vue 父组件和子组件生命周期执行顺序",
    tags: ["Vue", "生命周期", "组件"],
    difficulty: "中等",
    code: `// 父组件
export default {
  beforeCreate() { console.log('Parent beforeCreate') },
  created() { console.log('Parent created') },
  beforeMount() { console.log('Parent beforeMount') },
  mounted() { console.log('Parent mounted') }
}

// 子组件
export default {
  beforeCreate() { console.log('Child beforeCreate') },
  created() { console.log('Child created') },
  beforeMount() { console.log('Child beforeMount') },
  mounted() { console.log('Child mounted') }
}

// 执行顺序：
// Parent beforeCreate
// Parent created
// Parent beforeMount
// Child beforeCreate
// Child created
// Child beforeMount
// Child mounted
// Parent mounted`,
    answer: `## 父子组件生命周期执行顺序

### 1. 创建阶段
父beforeCreate → 父created → 父beforeMount → 子beforeCreate → 子created → 子beforeMount → 子mounted → 父mounted

### 2. 更新阶段
父beforeUpdate → 子beforeUpdate → 子updated → 父updated

### 3. 销毁阶段
父beforeDestroy → 子beforeDestroy → 子destroyed → 父destroyed

### 4. 原理分析
- 父组件初始化到挂载前阶段
- 遇到子组件开始初始化子组件
- 子组件挂载完成后父组件完成挂载

### 5. 应用场景
- 父子组件数据依赖
- 性能优化（懒加载子组件）
- 错误边界处理

### 6. 注意事项
- 避免在父组件mounted中依赖子组件DOM
- 异步加载组件会影响执行顺序
- 使用keep-alive会触发activated/deactivated`
  },
  {
    id: 163,
    title: "watch 和 computed 的区别",
    tags: ["Vue", "watch", "computed"],
    difficulty: "简单",
    code: `// computed
computed: {
  fullName() {
    return this.firstName + ' ' + this.lastName;
  }
}

// watch
watch: {
  firstName(newVal) {
    this.fullName = newVal + ' ' + this.lastName;
  }
}

// 使用场景
data() {
  return {
    searchQuery: '',
    searchResults: []
  }
},
watch: {
  searchQuery(newVal) {
    this.searchResults = this.fetchResults(newVal);
  }
},
computed: {
  filteredList() {
    return this.list.filter(item => item.includes(this.filterText));
  }
}`,
    answer: `## watch 与 computed 对比

### 1. 核心区别
| 特性         | computed                     | watch                        |
|--------------|------------------------------|------------------------------|
| 缓存         | 有缓存                       | 无缓存                       |
| 异步         | 不支持                       | 支持                         |
| 返回值       | 必须返回                     | 不需要返回                   |
| 适用场景     | 派生数据                     | 副作用操作                   |

### 2. 实现原理
- **computed**：
  - 惰性求值
  - 依赖收集
  - 缓存机制

- **watch**：
  - 立即执行（可配置）
  - 深度观察（deep）
  - 异步操作

### 3. 使用建议
- 优先使用computed处理数据转换
- 需要异步或执行副作用时使用watch
- 复杂逻辑考虑拆分或使用watchEffect（Vue3）

### 4. 性能考量
- computed缓存减少计算次数
- watch频繁触发可能影响性能
- 避免在computed中执行耗时操作

### 5. 组合使用
\`\`\`js
computed: {
  userId() {
    return this.user.id;
  }
},
watch: {
  userId(newId) {
    this.fetchUserDetails(newId);
  }
}
\`\`\``
  },
  {
    id: 164,
    title: "computed 的实现机制",
    tags: ["Vue", "computed", "原理"],
    difficulty: "中等",
    code: `// 简化版实现
class Watcher {
  constructor(vm, expOrFn, cb, options) {
    this.vm = vm;
    this.getter = parsePath(expOrFn);
    this.cb = cb;
    this.value = this.get();
  }
  
  get() {
    pushTarget(this);
    const value = this.getter.call(this.vm, this.vm);
    popTarget();
    return value;
  }
  
  update() {
    const oldValue = this.value;
    this.value = this.get();
    this.cb.call(this.vm, this.value, oldValue);
  }
}

function initComputed(vm, computed) {
  const watchers = {};
  for (const key in computed) {
    const getter = computed[key];
    watchers[key] = new Watcher(
      vm,
      getter,
      noop,
      { lazy: true } // 标记为computed
    );
    
    Object.defineProperty(vm, key, {
      get() {
        const watcher = watchers[key];
        if (watcher.dirty) {
          watcher.evaluate();
        }
        if (Dep.target) {
          watcher.depend();
        }
        return watcher.value;
      }
    });
  }
}`,
    answer: `## computed 实现原理详解

### 1. 核心机制
- **惰性求值**：只有依赖变化时才重新计算
- **依赖追踪**：自动收集依赖项
- **缓存机制**：避免重复计算

### 2. 实现步骤
1. 初始化时创建计算属性watcher
2. 定义计算属性的getter
3. 访问计算属性时触发依赖收集
4. 依赖变化时标记dirty状态
5. 下次访问时重新计算

### 3. 关键点
- 计算属性watcher的lazy配置
- dirty标志位控制缓存
- 依赖收集的双向绑定
- 多层计算属性的依赖链

### 4. 与普通watcher区别
|          | computed watcher       | 普通 watcher         |
|----------|------------------------|----------------------|
| 执行时机 | 访问时                | 立即执行或配置      |
| 缓存     | 有                    | 无                  |
| 返回值   | 必须                  | 不需要              |
| 依赖追踪 | 自动                  | 自动                |

### 5. 性能优化
- 避免在computed中有副作用
- 减少计算属性的复杂度
- 合理拆分复杂计算属性
- 使用memoization技术`
  },
  {
    id: 165,
    title: "computed 不支持异步的原因",
    tags: ["Vue", "computed", "异步"],
    difficulty: "中等",
    code: `// 错误用法
computed: {
  async computedData() {
    const res = await fetchData();
    return res.data;
  }
}

// 正确做法
data() {
  return {
    rawData: null
  }
},
computed: {
  processedData() {
    return this.rawData ? process(this.rawData) : null;
  }
},
async created() {
  this.rawData = await fetchData();
}`,
    answer: `## computed 不支持异步的原因

### 1. 设计原理
- 同步求值：计算属性需要立即返回结果
- 依赖追踪：需要同步收集所有依赖
- 缓存机制：异步操作破坏缓存有效性

### 2. 技术限制
- 依赖收集系统基于同步代码
- 异步操作无法正确追踪依赖
- 无法保证返回值的时效性

### 3. 替代方案
- 使用watch + 状态组合
- 使用async/await + data + computed
- 使用Vue3的computed + ref异步
  \`\`\`js
  // Vue3示例
  const data = ref(null);
  const computedData = computedAsync(async () => {
    return data.value ? await process(data.value) : null;
  });
  \`\`\`

### 4. 原理分析
- computed的getter需要立即返回值
- 异步操作导致无法确定返回值时机
- 破坏响应式系统的依赖跟踪链

### 5. 最佳实践
- 保持computed纯函数特性
- 将异步操作移至methods或watch
- 使用状态管理处理复杂异步逻辑
- Vue3中可结合Suspense处理异步组件`
  },
  {
    id: 166,
    title: "Vue3 DOM Diff 算法",
    tags: ["Vue3", "Virtual DOM", "Diff算法"],
    difficulty: "困难",
    code: `// 核心diff逻辑
function patchChildren(n1, n2, container) {
  // 简单diff算法
  if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      patchArrayChildren(n1, n2, container);
    } else {
      // ...其他情况处理
    }
  } else {
    // ...文本处理
  }
}

// 双端比较
function patchKeyedChildren(c1, c2, container) {
  let i = 0;
  let e1 = c1.length - 1;
  let e2 = c2.length - 1;
  
  // 1. 前序比较
  while (i <= e1 && i <= e2 && sameVNode(c1[i], c2[i])) {
    patch(c1[i], c2[i], container);
    i++;
  }
  
  // 2. 后序比较
  while (i <= e1 && i <= e2 && sameVNode(c1[e1], c2[e2])) {
    patch(c1[e1], c2[e2], container);
    e1--;
    e2--;
  }
  
  // 3. 新增节点
  if (i > e1 && i <= e2) {
    // ...添加新节点
  }
  
  // 4. 删除节点
  else if (i > e2 && i <= e1) {
    // ...删除旧节点
  }
  
  // 5. 未知序列
  else {
    // 使用最长递增子序列优化
    const s1 = i;
    const s2 = i;
    const keyToNewIndexMap = new Map();
    // ...复杂diff逻辑
  }
}`,
    answer: `## Vue3 Diff 算法优化

### 1. 主要改进
- **双端比较**：头头、尾尾比较快速处理边界情况
- **最长递增子序列**：减少节点移动操作
- **静态标记**：跳过静态节点比较
- **Fragment支持**：处理多根节点组件

### 2. 核心步骤
1. 预处理相同的前置/后置节点
2. 识别新增/删除的节点
3. 处理未知序列：
   - 建立key到index的映射
   - 找出可复用的节点
   - 最小化移动操作

### 3. 最长递增子序列应用
- 确定最小的节点移动次数
- 时间复杂度O(n log n)
- 配合source数组记录位置

### 4. 性能对比
| 操作         | Vue2          | Vue3          |
|--------------|---------------|---------------|
| 静态节点     | 全量比较      | 跳过比较      |
| 相同前缀     | O(n)          | O(1)          |
| 节点移动     | O(n^2)        | O(n log n)    |
| 内存使用     | 较高          | 较低          |

### 5. 优化效果
- 编译时优化减少运行时比较
- 更高效的节点复用
- 减少不必要的DOM操作
- 更好的大型列表性能`
  },
  {
    id: 167,
    title: "Vue3 最长递增子序列算法作用",
    tags: ["Vue3", "算法", "Diff"],
    difficulty: "困难",
    code: `// 最长递增子序列实现
function getSequence(arr) {
  const p = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p[i] = j;
        result.push(i);
        continue;
      }
      
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = (u + v) >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p[v];
  }
  
  return result;
}

// 在diff中的应用
const lis = getSequence(sources);
let lisIndex = lis.length - 1;
for (i = toBePatched - 1; i >= 0; i--) {
  if (lis[lisIndex] === i) {
    lisIndex--;
  } else {
    move(c2[newIndex], container, anchor);
  }
}`,
    answer: `## 最长递增子序列在Diff中的应用

### 1. 算法目的
- 找到最小的移动次数
- 确定哪些节点可以保持原位
- 减少DOM操作提升性能

### 2. 实现原理
1. 建立新旧节点索引映射
2. 生成source数组记录节点位置变化
3. 计算最长递增子序列确定稳定节点
4. 仅移动非稳定节点

### 3. 时间复杂度
- 普通Diff：O(n^2)
- 使用LIS：O(n log n)

### 4. 具体步骤
1. **预处理**：处理相同的前后节点
2. **建立映射**：key到新索引的Map
3. **填充source**：记录新旧位置关系
4. **计算LIS**：找到最长稳定序列
5. **移动节点**：倒序处理非稳定节点

### 5. 优势
- 减少节点移动次数
- 保持已有DOM状态
- 提升列表渲染性能
- 优化动画效果

### 6. 扩展应用
- 表格排序优化
- 拖拽列表动画
- 大型数据渲染
- 虚拟滚动实现`
  },
  {
    id: 168,
    title: "Vue3 ref 和 reactive 的区别",
    tags: ["Vue3", "响应式", "Composition API"],
    difficulty: "中等",
    code: `// ref 使用
const count = ref(0);
console.log(count.value); // 0
count.value++;

// reactive 使用
const state = reactive({ count: 0 });
console.log(state.count); // 0
state.count++;

// 类型区别
interface Ref<T> {
  value: T;
}
function reactive<T extends object>(target: T): UnwrapNestedRefs<T>;

// 自动解包
const count = ref(0);
const state = reactive({ count });
console.log(state.count); // 0 (自动解包)`,
    answer: `## ref 与 reactive 对比

### 1. 基本区别
| 特性         | ref                          | reactive                     |
|--------------|------------------------------|------------------------------|
| 数据类型     | 任意类型                    | 对象/数组                    |
| 访问方式     | .value                       | 直接访问                     |
| TS支持       | 明确类型                    | 自动推断                     |
| 解包         | 模板中自动解包              | 无需解包                     |

### 2. 实现原理
- **ref**：
  - 使用对象包装
  - 通过getter/setter拦截
  - 适合基本类型

- **reactive**：
  - 使用Proxy代理
  - 深度响应式
  - 适合复杂对象

### 3. 使用场景
- **使用ref**：
  - 基本类型
  - 需要保持响应式的DOM引用
  - 需要重新赋值的变量

- **使用reactive**：
  - 复杂对象/嵌套数据
  - 表单对象
  - 组件状态管理

### 4. 相互转换
- ref包装reactive：
  \`\`\`js
  const state = reactive({ count: ref(0) });
  \`\`\`
- reactive解包ref：
  \`\`\`js
  const count = ref(0);
  const state = reactive({ count });
  console.log(state.count); // 0
  \`\`\`

### 5. 最佳实践
- 组合式API优先使用ref
- 相关数据集合使用reactive
- 导出状态时优先使用ref
- 使用toRefs解构reactive对象`
  },
  {
    id: 169,
    title: "Vue3 区分 ref 和 reactive 的必要性",
    tags: ["Vue3", "响应式", "设计原理"],
    difficulty: "中等",
    code: `// 统一API的假设问题
function unifiedAPI(value) {
  // 如何判断是基本类型还是对象？
  if (typeof value === 'object') {
    return reactive(value);
  } else {
    return ref(value);
  }
}

// 使用问题
const num = unifiedAPI(0);
const obj = unifiedAPI({ count: 0 });

console.log(num.value); // 需要.value
console.log(obj.count); // 直接访问

// 类型推导问题
interface State {
  count: number;
  name: string;
}

const state = unifiedAPI({
  count: 0,
  name: ''
}) as State; // 需要类型断言`,
    answer: `## 区分 ref 和 reactive 的设计考量

### 1. 类型系统支持
- 明确的值类型 vs 对象类型
- 更好的类型推断
- 避免自动类型转换的歧义

### 2. 使用场景差异
- 基本类型频繁操作需要.value
- 对象类型更自然的访问方式
- 明确的数据结构设计

### 3. 性能考量
- 基本类型用ref更轻量
- 对象用reactive深度响应
- 避免不必要的Proxy包装

### 4. 开发体验
- 明确的数据访问方式
- 减少意外行为
- 更好的代码可读性

### 5. 设计哲学
- 提供选择而不是强加约定
- 适应不同编程风格
- 明确职责边界

### 6. 替代方案分析
- **全用reactive**：基本类型需要包装，失去类型提示
- **全用ref**：对象访问需要.value，不够直观
- **自动判断**：类型系统限制，增加运行时开销`
  },
  {
    id: 170,
    title: "Vue 响应式 Observer 实现",
    tags: ["Vue", "响应式", "原理"],
    difficulty: "困难",
    code: `// Vue2 实现
function defineReactive(obj, key, val) {
  const dep = new Dep();
  Object.defineProperty(obj, key, {
    get() {
      dep.depend();
      return val;
    },
    set(newVal) {
      val = newVal;
      dep.notify();
    }
  });
}

// Vue3 实现
function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      track(target, key);
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      Reflect.set(target, key, value, receiver);
      trigger(target, key);
      return true;
    }
  });
}

// 依赖收集
const targetMap = new WeakMap();
function track(target, key) {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }
  dep.add(activeEffect);
}

// 触发更新
function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  const effects = depsMap.get(key);
  effects && effects.forEach(effect => effect());
}`,
    answer: `## Vue 响应式系统实现演进

### 1. Vue2 实现
- **基于Object.defineProperty**
- 递归转换对象属性
- 数组方法重写
- 局限性：
  - 无法检测属性添加/删除
  - 数组索引修改受限
  - 性能开销较大

### 2. Vue3 实现
- **基于Proxy**
- 懒代理机制
- 支持Map/Set等集合类型
- 优势：
  - 全面覆盖数据变化
  - 更好的性能
  - 更简洁的实现

### 3. 核心概念
- **Dep**：依赖收集器
- **Watcher**：观察者
- **Effect**：副作用（Vue3）
- **TargetMap**：依赖关系映射

### 4. 性能优化
- 懒代理：仅代理被访问属性
- 缓存访问路径
- 批量更新
- 更高效的依赖收集

### 5. 设计模式
- 观察者模式
- 发布-订阅模式
- 代理模式

### 6. 未来方向
- 更细粒度的响应式
- 编译时优化
- 更好的TypeScript支持
- 更智能的依赖追踪`
  }
];

export default questions170;