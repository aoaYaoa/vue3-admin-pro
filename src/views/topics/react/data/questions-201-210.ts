const questions210 = [
  {
    id: 201,
    title: "Flux架构模式解析",
    tags: ["Flux", "架构", "状态管理"],
    difficulty: "中等",
    code: `// Flux核心概念实现
const Dispatcher = {
  callbacks: [],
  register(callback) {
    this.callbacks.push(callback);
  },
  dispatch(action) {
    this.callbacks.forEach(cb => cb(action));
  }
};

const Store = {
  state: { count: 0 },
  emitChange() {
    console.log('State changed:', this.state);
  }
};

Dispatcher.register(action => {
  switch (action.type) {
    case 'INCREMENT':
      Store.state.count++;
      Store.emitChange();
      break;
  }
});

// 触发action
Dispatcher.dispatch({ type: 'INCREMENT' });`,
    answer: `## Flux架构详解

### 1. 核心概念
- **Action**：描述事件的对象
- **Dispatcher**：中央枢纽，分发Action
- **Store**：管理状态和业务逻辑
- **View**：订阅Store更新UI

### 2. 数据流向
1. View触发Action
2. Dispatcher分发Action
3. Store处理Action更新状态
4. Store通知View更新

### 3. 与Redux对比
| 特性         | Flux               | Redux              |
|--------------|--------------------|--------------------|
| Store数量    | 多个               | 单个               |
| Dispatcher   | 有                 | 无（内置）         |
| 状态修改     | 直接修改           | 纯函数返回新状态   |
| 中间件       | 不支持             | 支持               |

### 4. 适用场景
- 需要明确数据流向
- 复杂的状态管理
- 需要可追溯的状态变化
- 团队协作规范`
  },
  {
    id: 202,
    title: "React项目脚手架搭建",
    tags: ["React", "工程化", "脚手架"],
    difficulty: "简单",
    code: `// 使用create-react-app
npx create-react-app my-app
cd my-app
npm start

// 自定义配置
// craco.config.js
module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    }
  },
  jest: {
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1'
    }
  }
};

// 项目结构示例
/*
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── store/
│   ├── utils/
│   └── App.js
*/`,
    answer: `## React脚手架最佳实践

### 1. 常用工具
- **CRA**：快速启动项目
- **Vite**：更快的开发体验
- **Next.js**：服务端渲染框架

### 2. 核心配置
- 路径别名配置
- 环境变量管理
- 代理配置
- 代码分割策略

### 3. 目录结构规范
- 按功能划分模块
- 公共组件统一管理
- 业务组件按页面组织
- 状态管理集中处理

### 4. 工程化配置
- ESLint代码规范
- Prettier代码格式化
- Husky提交前检查
- Commitizen提交规范`
  },
  {
    id: 203,
    title: "React数据请求方案",
    tags: ["React", "数据获取", "Hooks"],
    difficulty: "中等",
    code: `// 使用useEffect
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetchUser(userId).then(data => {
      if (isMounted) {
        setUser(data);
        setLoading(false);
      }
    });
    return () => { isMounted = false };
  }, [userId]);

  return loading ? <Spinner /> : <Profile data={user} />;
}

// 使用SWR
import useSWR from 'swr';

function Profile() {
  const { data, error } = useSWR('/api/user', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  return <div>Hello {data.name}!</div>;
}`,
    answer: `## React数据请求方案

### 1. 常用方法
- **useEffect + fetch**：基础方案
- **axios**：功能更强大的HTTP客户端
- **SWR/React Query**：高级数据管理
- **Redux + Thunk/Saga**：状态管理集成

### 2. 最佳实践
- 处理组件卸载后的状态更新
- 错误处理与加载状态
- 请求取消（AbortController）
- 数据缓存与更新

### 3. 高级功能
- 自动重新验证（SWR）
- 乐观更新
- 分页加载
- 无限滚动

### 4. 性能优化
- 请求去重
- 数据缓存
- 预加载
- 请求合并`
  },
  {
    id: 204,
    title: "React refs的作用与使用",
    tags: ["React", "refs", "DOM操作"],
    difficulty: "简单",
    code: `// 创建ref
const inputRef = useRef(null);

// 访问DOM
function FocusInput() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus</button>
    </>
  );
}

// 保存可变值
function Timer() {
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      // ...
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);
}`,
    answer: `## React refs详解

### 1. 主要用途
- 访问DOM元素
- 保存可变值（不触发渲染）
- 集成第三方DOM库
- 管理焦点/文本选择

### 2. 使用规则
- 避免过度使用
- 不要用于可控制的状态
- 函数组件使用useRef
- 类组件使用createRef

### 3. 与state对比
| 特性         | refs                   | state                  |
|--------------|------------------------|------------------------|
| 触发渲染     | 否                     | 是                     |
| 异步更新     | 同步更新               | 批量更新               |
| 使用场景     | DOM操作/保存变量       | UI渲染相关状态         |

### 4. 注意事项
- 避免在渲染期间修改refs
- 转发refs给子组件（forwardRef）
- 合并多个refs（useMergeRefs）`
  },
  {
    id: 205,
    title: "列表渲染中key的作用",
    tags: ["React", "列表渲染", "性能优化"],
    difficulty: "简单",
    code: `// 正确使用key
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}

// 错误用法
function BadList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}`,
    answer: `## key的重要性

### 1. 核心作用
- 识别元素唯一性
- 优化Diff算法性能
- 保持组件状态
- 正确复用DOM元素

### 2. 选择原则
- 唯一稳定标识符（ID）
- 避免使用索引
- 避免随机值
- 全局唯一不重复

### 3. 性能影响
- 错误key导致不必要的重新渲染
- 正确key复用DOM节点
- 提高列表更新效率

### 4. 常见错误
- 使用数组索引作为key
- 随机生成key（如Math.random()）
- 不同列表使用相同key
- 动态生成不稳定的key`
  },
  {
    id: 206,
    title: "useState Hook使用指南",
    tags: ["React", "Hooks", "useState"],
    difficulty: "简单",
    code: `// 基本用法
const [count, setCount] = useState(0);

// 函数式更新
setCount(prev => prev + 1);

// 对象状态
const [user, setUser] = useState({ name: '', age: 0 });
setUser(prev => ({ ...prev, name: 'John' }));

// 延迟初始化
const [data] = useState(() => fetchInitialData());`,
    answer: `## useState使用详解

### 1. 基本规则
- 在组件顶层调用
- 遵循Hook调用顺序
- 可以多次使用
- 支持初始值或初始化函数

### 2. 更新方式
- 直接更新：setState(newValue)
- 函数式更新：setState(prev => newValue)
- 合并对象：需要手动展开旧状态

### 3. 性能优化
- 使用函数式更新避免闭包问题
- 复杂对象使用useReducer
- 避免在渲染期间设置状态
- 使用useMemo优化派生状态

### 4. 常见问题
- 异步更新问题
- 闭包陷阱
- 批量更新机制
- 状态提升需求`
  },
  {
    id: 207,
    title: "useEffect Hook使用指南",
    tags: ["React", "Hooks", "useEffect", "生命周期"],
    difficulty: "中等",
    code: `// 组件挂载/卸载
  const [count, setCount] = useState(0);
useEffect(() => {
  console.log('Component mounted');
  return () => console.log('Component unmounted');
}, []);

// 依赖更新
useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]);

// 异步操作
useEffect(() => {
  let isMounted = true;
  fetchData().then(data => {
    if (isMounted) setData(data);
  });
  return () => { isMounted = false };
}, []);`,
    answer: `## useEffect使用详解

### 1. 核心功能
- 处理副作用（数据获取、订阅等）
- 替代生命周期方法
- 清理资源
- 依赖追踪

### 2. 生命周期对应
- componentDidMount → []依赖
- componentDidUpdate → 指定依赖
- componentWillUnmount → 清理函数

### 3. 最佳实践
- 明确依赖数组
- 拆分不同逻辑到多个useEffect
- 及时清理定时器/订阅
- 使用自定义Hook封装复杂逻辑

### 4. 常见错误
- 无限循环（依赖设置不当）
- 内存泄漏（未清理资源）
- 过时的闭包值
- 竞态条件（异步操作未取消）`
  },
  {
    id: 208,
    title: "自定义Hook开发实践",
    tags: ["React", "Hooks", "自定义Hook"],
    difficulty: "中等",
    code: `// 鼠标位置Hook
function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return position;
}

// 使用自定义Hook
function App() {
  const { x, y } = useMousePosition();
  return (
    <div>
      Mouse position: {x}, {y}
    </div>
  );
}`,
    answer: `## 自定义Hook开发指南

### 1. 设计原则
- 以use开头命名
- 组合内置Hook
- 单一职责
- 可复用逻辑

### 2. 常见场景
- 数据获取
- 事件监听
- 表单处理
- 动画控制
- 状态管理

### 3. 最佳实践
- 参数设计灵活
- 返回必要数据
- 处理错误状态
- 提供清理功能

### 4. 测试策略
- 使用React Testing Library
- 隔离测试Hook逻辑
- 模拟不同场景
- 覆盖边界条件`
  }
];

export default questions210; 