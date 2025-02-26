const questions160 = [
  {
    id: 153,
    title: 'Vue2 不能监听数组下标和对象新增属性的原因',
    tags: ['Vue2', '响应式', '原理'],
    difficulty: '中等',
    code: `// Vue2 响应式实现核心代码
function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get() {
      console.log('get', key);
      return val;
    },
    set(newVal) {
      console.log('set', key);
      val = newVal;
    }
  });
}

const obj = {};
defineReactive(obj, 'a', 1);

// 无法检测以下操作
obj.b = 2; // 新增属性
const arr = [];
defineReactive(arr, 0, 'item');
arr[0] = 'new'; // 数组索引赋值
arr.length = 0; // 修改数组长度`,
    answer: `## Vue2 响应式限制原因

### 1. 对象新增属性
- **原因**：Object.defineProperty 需要预先定义属性
- **解决方案**：
  \`\`\`js
  Vue.set(obj, 'b', 2)
  this.$set(this.obj, 'b', 2)
  \`\`\`

### 2. 数组索引修改
- **原因**：性能考虑，数组元素可能非常多
- **解决方案**：
  \`\`\`js
  Vue.set(arr, index, value)
  arr.splice(index, 1, value)
  \`\`\`

### 3. 数组长度修改
- **原因**：length 属性不可配置
- **解决方案**：
  \`\`\`js
  arr.splice(newLength)
  \`\`\`

### 4. 实现原理
- 遍历对象属性递归定义getter/setter
- 数组方法重写（push/pop/shift/unshift/splice/sort/reverse）

### 5. Vue3改进
- 使用Proxy代理整个对象
- 支持动态属性添加
- 支持数组索引修改
- 支持Map/Set等集合类型`
  },
  {
    id: 154,
    title: 'vue2 和 vue3 的具体区别',
    tags: ['Vue2', 'Vue3', '比较'],
    difficulty: '中等',
    code: `// Vue2 选项式API
export default {
  data() {
    return { count: 0 }
  },
  methods: {
    increment() {
      this.count++;
    }
  }
}

// Vue3 组合式API
import { ref } from 'vue';

export default {
  setup() {
    const count = ref(0);
    const increment = () => count.value++;
    return { count, increment };
  }
}

// Vue3 响应式对比
const obj = reactive({ a: 1 });
obj.b = 2; // 自动响应

const arr = reactive([]);
arr[0] = 'item'; // 自动响应`,
    answer: `## Vue2 vs Vue3 主要区别

### 1. 架构改进
- **Monolithic → 模块化**
- 更好的Tree-shaking支持
- 自定义渲染器

### 2. 响应式系统
|          | Vue2            | Vue3            |
|----------|-----------------|-----------------|
| 实现方式 | Object.defineProperty | Proxy         |
| 数组支持 | 需要特殊处理    | 原生支持        |
| 新增属性 | 需要Vue.set     | 自动检测        |
| 集合类型 | 不支持          | 支持Map/Set    |

### 3. 组合式API
- 更好的逻辑复用
- 更灵活的组织代码
- 更好的TypeScript支持

### 4. 性能提升
- 编译时优化（静态节点提升）
- 更快的虚拟DOM
- 更小的包体积

### 5. 其他改进
- Fragment组件
- Teleport组件
- Suspense组件
- 自定义指令API变更`
  },
  {
    id: 155,
    title: 'vue 的通讯方式',
    tags: ['Vue', '组件通信'],
    difficulty: '简单',
    code: `// 1. Props/$emit
// 父组件
<Child :msg="message" @update="handleUpdate" />

// 子组件
props: ['msg'],
methods: {
  send() {
    this.$emit('update', newValue);
  }
}

// 2. provide/inject
// 祖先组件
provide() {
  return { theme: 'dark' }
}

// 后代组件
inject: ['theme']

// 3. Event Bus
// event.js
import Vue from 'vue';
export const bus = new Vue();

// 组件A
bus.$emit('event', data);

// 组件B
bus.$on('event', handler);

// 4. Vuex/Pinia
// store.js
export default createStore({
  state: { count: 0 },
  mutations: { increment(state) { state.count++ } }
})

// 组件
this.$store.commit('increment');`,
    answer: `## Vue 组件通信方式

### 1. 父子组件通信
- **Props 向下传递**
- **Events 向上传递**
- **v-model 语法糖**

### 2. 跨级组件通信
- **provide/inject**
- **全局事件总线**
- **Vuex/Pinia 状态管理**

### 3. 兄弟组件通信
- 共同父组件中转
- 事件总线
- 状态管理

### 4. 其他方式
- **$parent/$children**（不推荐）
- **$refs** 直接访问
- **作用域插槽**
- **属性透传**

### 5. 最佳实践
- 简单场景用 props/emit
- 复杂数据用状态管理
- 避免过度使用事件总线
- 合理使用依赖注入`
  },
  {
    id: 156,
    title: 'vue 的常用修饰符',
    tags: ['Vue', '修饰符', '指令'],
    difficulty: '简单',
    code: `<!-- 事件修饰符 -->
<button @click.stop="handleClick">阻止冒泡</button>
<input @keyup.enter="submit">

<!-- 表单修饰符 -->
<input v-model.lazy="msg">
<input v-model.number="age">
<input v-model.trim="name">

<!-- 鼠标修饰符 -->
<div @click.middle="middleClick">中键点击</div>
<div @click.right.prevent="rightClick">右键菜单</div>

<!-- 系统修饰符 -->
<input @keyup.ctrl.enter="submit">
<div @click.ctrl.exact="ctrlClick">精确控制</div>`,
    answer: `## Vue 常用修饰符详解

### 1. 事件修饰符
- **.stop**：阻止事件冒泡
- **.prevent**：阻止默认行为
- **.capture**：使用捕获模式
- **.self**：仅当事件源是当前元素时触发
- **.once**：只触发一次
- **.passive**：提升滚动性能

### 2. 按键修饰符
- **.enter**
- **.tab**
- **.delete**
- **.esc**
- **.space**
- **.up**
- **.down**
- **.left**
- **.right**

### 3. 系统修饰键
- **.ctrl**
- **.alt**
- **.shift**
- **.meta** (Mac Command键)

### 4. 鼠标按钮修饰符
- **.left**
- **.right**
- **.middle**

### 5. 表单修饰符
- **.lazy**：输入完成后更新
- **.number**：自动转为数字
- **.trim**：自动去除首尾空格

### 6. 自定义修饰符
通过全局配置自定义：
\`\`\`js
Vue.config.keyCodes.f1 = 112
\`\`\``
  },
  {
    id: 157,
    title: 'vue2 初始化过程做了什么？',
    tags: ['Vue2', '初始化', '生命周期'],
    difficulty: '中等',
    code: `// 初始化流程伪代码
function Vue(options) {
  this._init(options);
}

Vue.prototype._init = function(options) {
  // 合并选项
  this.$options = mergeOptions(
    this.constructor.options,
    options || {}
  );
  
  // 初始化生命周期
  initLifecycle(this);
  
  // 初始化事件
  initEvents(this);
  
  // 初始化渲染函数
  initRender(this);
  
  // 调用beforeCreate钩子
  callHook(this, 'beforeCreate');
  
  // 初始化注入
  initInjections(this);
  
  // 初始化状态（props/data/methods等）
  initState(this);
  
  // 初始化提供
  initProvide(this);
  
  // 调用created钩子
  callHook(this, 'created');
  
  // 挂载实例
  if (this.$options.el) {
    this.$mount(this.$options.el);
  }
}`,
    answer: `## Vue2 初始化过程详解

### 1. 主要阶段
1. **选项合并**：合并全局选项和组件选项
2. **初始化生命周期**：建立父子组件关系
3. **初始化事件**：处理父组件传递的事件
4. **初始化渲染**：创建虚拟DOM相关方法
5. **调用beforeCreate**：此时数据未初始化
6. **初始化注入**：处理provide/inject
7. **初始化状态**：
   - props
   - methods
   - data（响应式处理）
   - computed
   - watch
8. **调用created**：数据已可用，DOM未生成
9. **挂载实例**：编译模板，创建渲染函数

### 2. 响应式处理
- 使用Object.defineProperty递归转换data
- 为每个属性创建Dep收集依赖
- 数组方法重写

### 3. 模板编译
1. 解析模板生成AST
2. 优化静态节点
3. 生成渲染函数

### 4. 挂载阶段
- 创建Watcher实例
- 执行首次渲染
- 触发mounted钩子`
  },
  {
    id: 158,
    title: 'created 和 mounted 的区别',
    tags: ['Vue', '生命周期'],
    difficulty: '简单',
    code: `export default {
  created() {
    // 可以访问数据，但DOM未生成
    console.log('created', this.$data);
    console.log('created', document.getElementById('app')); // null
  },
  mounted() {
    // DOM已挂载完成
    console.log('mounted', document.getElementById('app'));
  }
}`,
    answer: `## created vs mounted 生命周期对比

### 1. 执行时机
| 钩子函数 | 执行时机                     |
|----------|-----------------------------|
| created  | 实例创建完成，数据观测/事件配置完成，但DOM未生成 |
| mounted  | 实例挂载到DOM后调用          |

### 2. 主要区别
| 特性       | created          | mounted          |
|------------|------------------|------------------|
| DOM访问    | 不可访问         | 可以访问         |
| 数据状态   | 数据已初始化     | 数据已初始化     |
| 子组件状态 | 子组件未挂载     | 子组件已挂载     |
| 服务端渲染 | 在服务端和客户端都会执行 | 只在客户端执行 |

### 3. 使用场景
- **created**：
  - 初始化非DOM相关操作
  - 请求数据
  - 初始化第三方库
- **mounted**：
  - 访问或操作DOM
  - 集成DOM相关库（如地图、图表）
  - 添加事件监听（非Vue事件）

### 4. 注意事项
- 避免在created中操作DOM
- 服务端渲染时注意生命周期差异
- 异步操作需处理组件销毁情况`
  },
  {
    id: 159,
    title: 'Vue 的 $nextTick 是什么？原理是？',
    tags: ['Vue', 'nextTick', '异步更新'],
    difficulty: '中等',
    code: `// 使用示例
this.message = '更新';
this.$nextTick(() => {
  console.log('DOM已更新');
});

// 原理实现伪代码
const callbacks = [];
let pending = false;

function nextTick(cb) {
  callbacks.push(cb);
  
  if (!pending) {
    pending = true;
    // 优先使用微任务
    if (typeof Promise !== 'undefined') {
      Promise.resolve().then(flushCallbacks);
    } else {
      setTimeout(flushCallbacks, 0);
    }
  }
}

function flushCallbacks() {
  pending = false;
  const copies = callbacks.slice();
  callbacks.length = 0;
  for (let i = 0; i < copies.length; i++) {
    copies[i]();
  }
}`,
    answer: `## $nextTick 原理详解

### 1. 作用
- 在下次DOM更新循环结束之后执行回调
- 用于获取更新后的DOM状态

### 2. 实现原理
1. **异步队列**：将回调存入队列
2. **批量处理**：合并多个nextTick调用
3. **执行时机**：
   - 优先使用微任务（Promise.then）
   - 降级方案（MutationObserver → setImmediate → setTimeout）

### 3. 执行流程
1. 数据变更触发Watcher更新
2. Watcher将更新任务加入队列
3. 调用nextTick添加回调到队列
4. 事件循环处理微任务时执行更新和回调

### 4. 使用场景
- 操作更新后的DOM
- 等待视图更新后执行操作
- 集成第三方DOM库

### 5. 注意事项
- 避免在nextTick中修改数据导致无限循环
- 服务端渲染时nextTick立即执行
- 合理使用await语法：
  \`\`\`js
  await this.$nextTick();
  // 后续代码
  \`\`\``
  },
  {
    id: 160,
    title: '以下两段代码在 vue 中有什么区别?',
    tags: ['Vue', '响应式', '实践'],
    difficulty: '中等',
    code: `// 代码1
this.obj.property = 'new value';
this.$forceUpdate();

// 代码2
this.$set(this.obj, 'property', 'new value');`,
    answer: `## Vue 响应式更新对比

### 1. 代码分析
**代码1**：
- 直接修改对象属性
- 手动触发强制更新
- 不推荐使用

**代码2**：
- 使用Vue.set方法
- 自动触发响应式更新
- 推荐做法

### 2. 主要区别
|          | 直接赋值 + $forceUpdate       | $set                     |
|----------|-------------------------------|--------------------------|
| 响应式   | 非响应式属性需要强制更新       | 自动建立响应式           |
| 性能     | 全组件重新渲染                | 精准更新                 |
| 适用场景 | 紧急修复特殊情况              | 常规的动态属性添加       |
| 代码维护 | 容易遗漏更新                  | 自动追踪依赖             |

### 3. 原理对比
- **$forceUpdate**：
  - 强制组件重新渲染
  - 跳过shouldComponentUpdate
  - 所有子组件也会更新
  
- **$set**：
  - 添加响应式属性
  - 触发依赖更新
  - 仅影响相关依赖

### 4. 最佳实践
- 优先使用$set/$delete
- 避免直接操作数组索引
- 复杂对象使用深拷贝更新
- 性能关键时使用不可变数据`
  }
];

export default questions160;