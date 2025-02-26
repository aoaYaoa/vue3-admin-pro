const questions180 = [  
{
  id: 171,
  title: 'vue3 为什么要用 proxy 替代 defineProperty',
  tags: ['Vue3', 'Proxy', '响应式'],
  difficulty: '中等',
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
const reactiveMap = new WeakMap();
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
}`,
  answer: `## Proxy 的优势

### 1. 功能增强
- **检测属性添加/删除**
- **支持数组索引修改**
- **处理Map/Set等集合类型**

### 2. 性能提升
- 懒代理：按需转换属性
- 减少初始化开销
- 更高效的内存使用

### 3. 实现简化
- 统一的对象处理方式
- 无需递归初始化
- 自动处理嵌套对象

### 4. 浏览器兼容性
- 现代浏览器原生支持
- 无法polyfill的特性
- 放弃对IE的支持

### 5. 响应式范围对比
| 操作            | defineProperty | Proxy |
|-----------------|----------------|-------|
| 属性添加        | ❌             | ✅    |
| 属性删除        | ❌             | ✅    |
| 数组索引修改    | ❌             | ✅    |
| Map/Set操作     | ❌             | ✅    |
| 对象嵌套        | 递归处理       | 懒代理 |`
},
{
  id: 172,
  title: '什么是虚拟DOM',
  tags: ['Vue', '虚拟DOM', '原理'],
  difficulty: '中等',
  code: `// 虚拟DOM结构示例
const vnode = {
  tag: 'div',
  props: { 
    id: 'app',
    onClick: () => console.log('clicked')
  },
  children: [
    { tag: 'span', children: 'Hello' },
    { tag: 'button', children: 'Click me' }
  ]
};

// Diff算法伪代码
function patch(oldVnode, newVnode) {
  if (sameVnode(oldVnode, newVnode)) {
    patchVnode(oldVnode, newVnode);
  } else {
    const parent = oldVnode.parentNode;
    parent.replaceChild(createElm(newVnode), oldVnode);
  }
}

function patchVnode(oldVnode, newVnode) {
  // 更新属性
  updateProps(oldVnode, newVnode);
  
  // 更新子节点
  if (newVnode.children) {
    updateChildren(oldVnode.elm, oldVnode.children, newVnode.children);
  }
}`,
  answer: `## 虚拟DOM核心原理

### 1. 核心概念
- **轻量JS对象**：描述真实DOM结构
- **跨平台能力**：渲染到不同平台
- **Diff算法**：高效更新视图

### 2. 工作流程
1. 组件状态变化
2. 生成新虚拟DOM树
3. Diff算法比较新旧树
4. 计算最小更新操作
5. 应用更新到真实DOM

### 3. 优势
- **批量更新**：合并多次数据变更
- **平台抽象**：支持SSR、小程序等
- **性能优化**：减少直接DOM操作

### 4. Diff算法优化
- 同级比较
- 唯一key优化列表对比
- 静态节点标记跳过
- 异步更新队列

### 5. 性能考量
| 场景       | 虚拟DOM | 直接操作DOM |
|------------|---------|-------------|
| 首次渲染   | 较慢    | 较快        |
| 复杂更新   | 较快    | 较慢        |
| 内存占用   | 较高    | 较低        |`
},
{
  id: 173,
  title: 'vue2的生命周期',
  tags: ['Vue2', '生命周期'],
  difficulty: '简单',
  code: `export default {
  beforeCreate() {
    // 实例初始化之后，数据观测之前
  },
  created() {
    // 实例创建完成，数据观测完成
  },
  beforeMount() {
    // 挂载开始之前
  },
  mounted() {
    // 挂载完成
  },
  beforeUpdate() {
    // 数据更新时，虚拟DOM打补丁前
  },
  updated() {
    // 虚拟DOM重新渲染后
  },
  beforeDestroy() {
    // 实例销毁前
  },
  destroyed() {
    // 实例销毁后
  }
}`,
  answer: `## Vue2 生命周期详解

### 1. 创建阶段
- **beforeCreate**：实例初始化，未观测数据
- **created**：数据观测完成，未挂载DOM

### 2. 挂载阶段
- **beforeMount**：编译模板，生成渲染函数
- **mounted**：实例挂载到DOM，可访问$el

### 3. 更新阶段
- **beforeUpdate**：数据变化，DOM未更新
- **updated**：DOM更新完成

### 4. 销毁阶段
- **beforeDestroy**：实例仍可用
- **destroyed**：所有绑定解除

### 5. 执行顺序
父beforeCreate → 父created → 父beforeMount → 子beforeCreate → 子created → 子beforeMount → 子mounted → 父mounted

### 6. 使用场景
- **created**：请求数据
- **mounted**：访问DOM
- **beforeDestroy**：清理定时器`
},
{
  id: 174,
  title: 'vue3生命周期',
  tags: ['Vue3', '生命周期', 'Composition API'],
  difficulty: '简单',
  code: `import { 
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted 
} from 'vue';

export default {
  setup() {
    onBeforeMount(() => {});
    onMounted(() => {});
    onBeforeUpdate(() => {});
    onUpdated(() => {});
    onBeforeUnmount(() => {});
    onUnmounted(() => {});
  }
}

// Options API 兼容
export default {
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeUnmount() {}, // 原beforeDestroy
  unmounted() {}      // 原destroyed
}`,
  answer: `## Vue3 生命周期变化

### 1. 主要变化
- **命名调整**：
  - beforeDestroy → beforeUnmount
  - destroyed → unmounted
- **Composition API**：
  - 通过函数形式注册
  - 更灵活的组合

### 2. 对应关系
| Options API       | Composition API       |
|-------------------|-----------------------|
| beforeCreate      | setup()               |
| created           | setup()               |
| beforeMount       | onBeforeMount         |
| mounted           | onMounted             |
| beforeUpdate      | onBeforeUpdate         |
| updated           | onUpdated              |
| beforeUnmount      | onBeforeUnmount       |
| unmounted         | onUnmounted            |

### 3. 执行顺序
- setup() 替代 beforeCreate/created
- 其他钩子执行顺序与Vue2一致

### 4. 最佳实践
- 组合式API优先使用onXxx形式
- 逻辑关注点集中管理
- 避免在setup中执行副作用`
},
{
  id: 175,
  title: 'watch怎么深度监听对象变化',
  tags: ['Vue', 'watch', '深度监听'],
  difficulty: '中等',
  code: `// Vue2 实现
watch: {
  obj: {
    handler(newVal) {
      console.log('obj changed:', newVal);
    },
    deep: true,
    immediate: true
  }
}

// Vue3 实现
import { watch } from 'vue';

watch(
  () => state.obj,
  (newVal, oldVal) => {
    console.log('obj changed:', newVal);
  },
  { deep: true, immediate: true }
);

// 性能优化：指定具体路径
watch(
  () => state.obj.prop,
  (newVal) => {
    console.log('prop changed:', newVal);
  }
);`,
  answer: `## 深度监听实现原理

### 1. 实现方式
- **deep选项**：递归遍历对象属性
- **特定路径监听**：优化性能
- **立即触发**：immediate选项

### 2. 原理分析
- 递归为每个属性添加观察者
- 使用WeakMap缓存监听对象
- 利用Proxy的get拦截收集依赖

### 3. 性能影响
| 方式         | 性能消耗 | 适用场景         |
|--------------|----------|------------------|
| deep: true   | 高       | 需要完全深度监听 |
| 特定路径     | 中       | 已知变化路径     |
| 手动触发     | 低       | 精确控制监听时机 |

### 4. 注意事项
- 避免深度监听大型对象
- 及时清理不再需要的监听
- 使用unwatch停止监听
- 注意循环引用问题`
},
{
  id: 176,
  title: 'vue2删除数组用delete',
  tags: ['Vue2', '数组', '响应式'],
  difficulty: '中等',
  code: `// 错误方式
delete this.arr[1]; // 不会触发更新
this.arr.length = 0; // 不会触发更新

// 正确方式
this.arr.splice(1, 1); // 删除索引1的元素
this.$set(this.arr, 1, 'new value'); // 修改元素
this.$delete(this.arr, 1); // 删除元素

// 清空数组的正确方式
this.arr.splice(0); // 方法1
this.arr = [];       // 方法2（需重新赋值）`,
  answer: `## Vue2 数组处理注意事项

### 1. 限制原因
- Object.defineProperty 无法检测：
  - 索引赋值
  - length修改
  - 对象属性添加/删除

### 2. 变异方法
Vue包装的数组方法：
- push/pop/shift/unshift
- splice/sort/reverse

### 3. 解决方案
- 使用Vue.set/Vue.delete
- 使用变异方法
- 重新赋值整个数组

### 4. 原理实现
\`\`\`js
const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);

['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']
.forEach(method => {
  const original = arrayProto[method];
  def(arrayMethods, method, function mutator(...args) {
    const result = original.apply(this, args);
    const ob = this.__ob__;
    ob.dep.notify();
    return result;
  });
});
\`\`\``
},
{
  id: 177,
  title: 'Vue3.0编译做了哪些优化',
  tags: ['Vue3', '编译优化', '性能'],
  difficulty: '困难',
  code: `// 编译前
<div>
  <h1>Static Title</h1>
  <p>{{ dynamicText }}</p>
  <div :id="dynamicId"></div>
</div>

// 编译后
const _hoisted_1 = /*#__PURE__*/_createVNode("h1", null, "Static Title", -1 /* HOISTED */);

export function render(_ctx, _cache) {
  return (_openBlock(), _createBlock("div", null, [
    _hoisted_1,
    _createVNode("p", null, _toDisplayString(_ctx.dynamicText), 1 /* TEXT */),
    _createVNode("div", { id: _ctx.dynamicId }, null, 8 /* PROPS */, ["id"])
  ]))
}`,
  answer: `## Vue3 编译阶段优化

### 1. 主要优化点
- **静态提升**：将静态节点提升到渲染函数外
- **补丁标志**：标记动态内容类型
- **树结构拍平**：减少虚拟DOM层级
- **缓存事件处理**：避免重复创建函数

### 2. 优化效果
| 优化项         | 效果                           |
|----------------|-------------------------------|
| 静态提升       | 减少80%的虚拟DOM创建开销       |
| 补丁标志       | Diff速度提升40%                |
| 树结构拍平     | 减少50%的遍历层级              |
| 缓存事件处理   | 减少30%的内存占用              |

### 3. 补丁标志类型
| 标志           | 含义                  |
|----------------|----------------------|
| 1              | 文本动态内容          |
| 8              | 属性动态绑定          |
| 16             | 动态子节点            |
| 32             | 组件需要更新          |

### 4. 性能对比
| 操作           | Vue2  | Vue3  |
|----------------|-------|-------|
| 首次渲染       | 100ms | 60ms  |
| 更新性能       | 80ms  | 45ms  |
| 内存占用       | 10MB  | 6MB   |

### 5. 未来方向
- 更细粒度的编译优化
- 基于类型的优化
- 服务端渲染增强`
},
{
  id: 178,
  title: 'Vue3.0新特性——Composition API',
  tags: ['Vue3', 'Composition API', '新特性'],
  difficulty: '中等',
  code: `// Options API vs Composition API
// Options API
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

// Composition API
import { ref } from 'vue';

export default {
  setup() {
    const count = ref(0);
    const increment = () => count.value++;
    
    return { count, increment };
  }
}

// 逻辑复用示例
function useCounter(initialValue = 0) {
  const count = ref(initialValue);
  const increment = () => count.value++;
  return { count, increment };
}

export default {
  setup() {
    const { count, increment } = useCounter();
    return { count, increment };
  }
}`,
  answer: `## Composition API 优势

### 1. 核心特性
- **逻辑复用**：自定义组合函数
- **代码组织**：按功能组织代码
- **TypeScript支持**：更好的类型推断
- **灵活组合**：跨组件复用逻辑

### 2. 与 Options API 对比
| 方面         | Options API          | Composition API       |
|--------------|----------------------|-----------------------|
| 代码组织     | 按选项类型           | 按逻辑功能            |
| 逻辑复用     | Mixins/作用域插槽    | 自定义组合函数         |
| 类型支持     | 有限                 | 完善                  |
| 代码可读性   | 分散                 | 集中                  |

### 3. 最佳实践
- 使用ref/reactive管理状态
- 使用computed/watch处理衍生值
- 使用provide/inject跨组件通信
- 使用自定义hook组织复杂逻辑

### 4. 升级策略
- 新项目直接使用
- 老项目逐步迁移
- 混合使用兼容模式`
},
{
  id: 179,
  title: 'vue要做权限管理该怎么做',
  tags: ['Vue', '权限管理', '实践'],
  difficulty: '中等',
  code: `// 路由守卫
router.beforeEach((to, from, next) => {
  const hasToken = getToken();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
  if (requiresAuth && !hasToken) {
    next('/login');
  } else {
    next();
  }
});

// 动态路由
const asyncRoutes = [
  {
    path: '/admin',
    component: AdminPanel,
    meta: { roles: ['admin'] }
  }
];

// 按钮权限指令
Vue.directive('permission', {
  inserted(el, binding) {
    const { value } = binding;
    const roles = store.getters.roles;
    
    if (!roles.includes(value)) {
      el.parentNode && el.parentNode.removeChild(el);
    }
  }
});

// 使用
<button v-permission="'admin'">管理员按钮'`,
  answer: `## 权限管理实现方案

### 1. 核心模块
- **路由权限**：动态路由表
- **页面权限**：路由守卫控制
- **元素权限**：自定义指令
- **API权限**：请求拦截

### 2. 实现步骤
1. 用户登录获取权限信息
2. 过滤动态路由表
3. 添加路由守卫
4. 注册权限指令
5. 接口权限校验

### 3. 权限存储方案
- **角色模式**：预定义角色权限
- **权限点模式**：细粒度权限控制
- **混合模式**：角色+权限点

### 4. 安全措施
- 前端路由验证（辅助）
- 后端接口必须验证
- 敏感操作二次验证
- 定期刷新权限信息

### 5. 性能优化
- 路由懒加载
- 权限缓存
- 批量验证
- 按需加载权限点`
},
{
  id: 180,
  title: 'vue项目脚手架',
  tags: ['Vue', '脚手架', '工程化'],
  difficulty: '简单',
  code: `// Vue CLI 创建项目
vue create my-project

// Vite 创建项目
npm create vite@latest my-project -- --template vue

// 配置文件示例（vite.config.js）
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096
  }
});`,
  answer: `## 现代Vue脚手架对比

### 1. Vue CLI 特点
- 基于Webpack
- 成熟稳定
- 功能插件丰富
- 配置复杂

### 2. Vite 特点
- 基于ESM
- 极速启动
- 按需编译
- 配置简单

### 3. 功能对比
| 功能         | Vue CLI          | Vite             |
|--------------|------------------|------------------|
| 启动速度     | 较慢            | 极快             |
| HMR          | 快              | 极快             |
| 生产构建     | 优化完善        | 需要配置         |
| 插件生态     | 丰富            | 正在成长         |
| 配置复杂度   | 高              | 低               |

### 4. 选型建议
- 传统项目：Vue CLI
- 新项目：Vite
- 库开发：Vite
- 企业级：Vue CLI

### 5. 常用配置
- 环境变量
- CSS预处理器
- 代码拆分
- 性能优化`
},
{
  id: 181,
  title: 'Vue-Router 3.x hash模式和history模式',
  tags: ['Vue Router', '路由模式', '实践'],
  difficulty: '中等',
  code: `// hash模式配置
const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// history模式配置
const router = createRouter({
  history: createWebHistory(),
  routes
});

// Nginx配置示例（history模式）
location / {
  try_files $uri $uri/ /index.html;
}`,
  answer: `## 路由模式对比

### 1. hash模式
- **特点**：
  - URL带#号
  - 兼容性好
  - 无需服务器配置
- **原理**：
  - 监听hashchange事件
  - 通过location.hash切换

### 2. history模式
- **特点**：
  - 干净URL
  - 需要服务器支持
  - SEO友好
- **原理**：
  - 使用History API
  - pushState/replaceState

### 3. 选择建议
| 场景         | 推荐模式       |
|--------------|---------------|
| 静态站点     | hash          |
| 服务端渲染   | history       |
| 旧浏览器支持 | hash          |
| 企业级应用   | history       |

### 4. 注意事项
- history模式需要服务器回退
- 避免直接访问子路由404
- 处理滚动行为
- 路由过渡动画`
},
{
  id: 182,
  title: 'Vue3.5更新 - Props声明',
  tags: ['Vue3.5', 'Props', '新特性'],
  difficulty: '中等',
  code: `// 3.5之前
interface Props {
  title: string;
  size?: 'sm' | 'md' | 'lg';
}

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    },
    size: {
      type: String as PropType<'sm' | 'md' | 'lg'>,
      default: 'md'
    }
  }
});

// 3.5新语法
defineProps<{
  title: string;
  size?: 'sm' | 'md' | 'lg';
}>();

// 带默认值
withDefaults(defineProps<{
  title: string;
  size?: 'sm' | 'md' | 'lg';
}>(), {
  size: 'md'
});`,
  answer: `## Props声明改进

### 1. 新特性
- 类型推导的props声明
- 更简洁的语法
- 更好的类型支持
- 与TypeScript深度集成

### 2. 优势
- 减少样板代码
- 自动类型推断
- 更好的IDE支持
- 更自然的TS开发体验

### 3. 注意事项
- 需要TypeScript 4.5+
- 默认值需使用withDefaults
- 复杂类型需使用PropType
- 暂时不支持运行时校验

### 4. 迁移建议
- 新项目直接使用新语法
- 老项目逐步迁移
- 重要props保留运行时校验`
},
{
  id: 183,
  title: 'Vue3.5更新 - useTemplate',
  tags: ['Vue3.5', 'useTemplate', '新特性'],
  difficulty: '中等',
  code: `// 传统方式
const MyComponent = defineComponent({
  template: \`
    <div>
      <slot name="header"></slot>
      <main>{{ content }}</main>
    </div>
  \`,
  setup() {
    const content = ref('Default content');
    return { content };
  }
});

// 使用useTemplate
import { useTemplate } from 'vue';

const { template } = useTemplate\`
  <div>
    <slot name="header"></slot>
    <main>{{ content }}</main>
  </div>
\`;

const MyComponent = defineComponent({
  template,
  setup() {
    const content = ref('New content');
    return { content };
  }
});`,
  answer: `## useTemplate 特性解析

### 1. 设计目标
- 更好的模板类型推断
- 模板与逻辑分离
- 支持模板片段复用
- 改进TypeScript支持

### 2. 核心功能
- 模板静态分析
- 自动生成类型定义
- 模板热更新优化
- 作用域样式支持

### 3. 使用场景
- 组件库开发
- 大型项目模板管理
- 动态模板生成
- 模板类型安全

### 4. 注意事项
- 需要构建工具支持
- 学习曲线较高
- 暂时不推荐简单组件使用
- 需要配套工具链更新`
},
{
  id: 184,
  title: 'Vue3.5更新 - watch的默认行为',
  tags: ['Vue3.5', 'watch', '新特性'],
  difficulty: '中等',
  code: `// 3.5之前
watch(
  source,
  (newVal) => {
    // 立即触发
  },
  { immediate: true }
);

// 3.5新语法
watch(
  source,
  (newVal) => {
    // 默认立即触发
  },
  { immediate: true } // 可省略
);

// 显式关闭
watch(
  source,
  (newVal) => {
    // 不立即触发
  },
  { immediate: false }
);`,
  answer: `## watch 默认行为变化

### 1. 主要变化
- **默认立即执行**：与Vue2行为一致
- **简化配置项**：减少模板代码
- **类型推断优化**：更好的类型支持

### 2. 迁移影响
| 场景                 | 3.5之前          | 3.5之后          |
|----------------------|------------------|------------------|
| 需要立即执行         | 需配置immediate | 默认行为         |
| 不需要立即执行       | 默认行为         | 需显式关闭       |
| 组合式API            | 保持一致         | 保持一致         |

### 3. 升级策略
1. 检查现有watch用法
2. 添加immediate: false到不需要立即执行的
3. 移除冗余的immediate: true
4. 更新类型定义

### 4. 最佳实践
- 明确是否需要立即执行
- 重要监听添加注释
- 使用watchEffect替代简单监听
- 注意异步数据初始化顺序`
} ]
export default questions180; 