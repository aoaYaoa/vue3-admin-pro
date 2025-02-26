const questions200 = [
  {
    id: 191,
    title: "类组件与函数组件对比",
    tags: ["React", "组件类型"],
    difficulty: "简单",
    code: `// 类组件
class ClassCounter extends React.Component {
  state = { count: 0 };

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

// 函数组件
function FunctionCounter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}`,
    answer: `## 类组件 vs 函数组件

### 1. 核心区别
| 特性         | 类组件                     | 函数组件               |
|--------------|---------------------------|-----------------------|
| 语法         | class语法                 | 函数语法              |
| 状态管理     | this.state                | useState Hook        |
| 生命周期     | 生命周期方法               | useEffect Hook       |
| this绑定     | 需要处理                  | 无this问题           |
| 代码量       | 较多                      | 更简洁               |

### 2. 使用场景
- **类组件**：
  - 需要错误边界
  - 遗留代码维护
  - 需要生命周期精细控制
- **函数组件**：
  - 新项目开发
  - 简单UI组件
  - 需要自定义Hook复用逻辑

### 3. Hooks的影响
- 状态逻辑复用更方便
- 减少嵌套层级
- 更函数式编程风格
- 更好的TypeScript支持`
  },
  {
    id: 192,
    title: "技术组件与业务组件划分",
    tags: ["React", "组件设计", "最佳实践"],
    difficulty: "中等",
    code: `// 技术组件（UI组件）
const PrimaryButton = ({ onClick, children }) => (
  <button 
    className="btn-primary"
    onClick={onClick}
  >
    {children}
  </button>
);

// 业务组件
const UserOrderList = ({ userId }) => {
  const [orders, loading] = useUserOrders(userId);
  
  return (
    <div className="order-list">
      {loading ? (
        <LoadingSpinner />
      ) : (
        orders.map(order => <OrderItem key={order.id} data={order} />)
      )}
    </div>
  );
};`,
    answer: `## 组件划分原则

### 1. 技术组件特点
- 无业务逻辑
- 可复用性强
- 样式驱动
- 通过props配置

### 2. 业务组件特点
- 包含业务逻辑
- 数据获取处理
- 组合技术组件
- 项目特定功能

### 3. 划分标准
| 维度         | 技术组件                 | 业务组件             |
|--------------|-------------------------|---------------------|
| 复用范围     | 跨项目                  | 项目内              |
| 修改频率     | 低                      | 高                  |
| 测试重点     | UI表现                  | 业务逻辑            |
| 依赖         | 无数据依赖              | 依赖业务API         |

### 4. 协作模式
- 技术组件由UI团队维护
- 业务组件由业务团队开发
- 通过Storybook维护组件库
- 使用PropTypes/TypeScript定义接口`
  },
  {
    id: 193,
    title: "React Context机制",
    tags: ["React", "Context", "状态管理"],
    difficulty: "中等",
    code: `// 创建Context
const ThemeContext = React.createContext('light');

// 提供者组件
function App() {
  const [theme, setTheme] = useState('dark');
  
  return (
    <ThemeContext.Provider value={theme}>
      <Toolbar />
      <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>
        Toggle Theme
      </button>
    </ThemeContext.Provider>
  );
}

// 消费者组件
function Button() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Themed Button</button>;
}`,
    answer: `## Context API 详解

### 1. 解决的问题
- 跨层级组件通信
- 避免prop drilling
- 全局状态管理（替代部分Redux场景）

### 2. 主要API
- createContext：创建上下文
- Provider：提供数据
- useContext：消费数据
- displayName：调试名称

### 3. 性能优化
- 拆分Context：按功能细分
- 使用memo防止不必要的渲染
- 配合useReducer管理复杂状态
- 使用选择器模式（结合useContextSelector）

### 4. 与Redux对比
| 特性         | Context API           | Redux              |
|--------------|-----------------------|--------------------|
| 适用场景     | 中小应用              | 复杂应用           |
| 调试工具     | 无内置                | Redux DevTools     |
| 中间件       | 不支持                | 支持               |`
  },
  {
    id: 194,
    title: "React与MVVM架构",
    tags: ["React", "架构模式", "MVVM"],
    difficulty: "中等",
    code: `// View层
function UserView({ user, onUpdateName }) {
  return (
    <div>
      <h1>{user.name}</h1>
      <input 
        value={user.name}
        onChange={e => onUpdateName(e.target.value)}
      />
    </div>
  );
}

// ViewModel层
function UserViewModel() {
  const [user, setUser] = useState({ name: 'John' });
  
  const handleUpdate = (name) => {
    setUser(prev => ({ ...prev, name }));
    // 这里可以加入验证逻辑
  };

  return <UserView user={user} onUpdateName={handleUpdate} />;
}`,
    answer: `## React与MVVM关系解析

### 1. MVVM要素
- Model：数据模型
- View：UI呈现
- ViewModel：业务逻辑

### 2. React实现
- **Model**：组件state/Redux store
- **View**：JSX模板
- **ViewModel**：自定义Hooks/组件逻辑

### 3. 主要差异
- 无数据绑定：React使用单向数据流
- 手动更新：需要setState触发更新
- 更灵活：不强制分层架构

### 4. 优势对比
| 维度       | React               | 传统MVVM           |
|------------|---------------------|--------------------|
| 数据流     | 单向                | 双向绑定           |
| 性能       | 虚拟DOM优化         | 脏检查/DOM监听     |
| 学习曲线   | 较低                | 较高               |
| 灵活性     | 高                  | 框架约束多         |`
  },
  {
    id: 195,
    title: "React实现MVVM模式",
    tags: ["React", "MVVM", "实现"],
    difficulty: "中等",
    code: `// 使用自定义Hook作为ViewModel
function useUserViewModel() {
  const [user, setUser] = useState({ name: '', email: '' });
  
  const updateUser = (field, value) => {
    setUser(prev => ({ ...prev, [field]: value }));
  };

  return { user, updateUser };
}

// View组件
function UserForm() {
  const { user, updateUser } = useUserViewModel();
  
  return (
    <form>
      <input
        value={user.name}
        onChange={e => updateUser('name', e.target.value)}
      />
      <input
        value={user.email}
        onChange={e => updateUser('email', e.target.value)}
      />
    </form>
  );
}`,
    answer: `## React实现MVVM模式

### 1. 实现方式
- **Model**：useState/useReducer/Redux
- **View**：JSX组件
- **ViewModel**：自定义Hooks

### 2. 数据绑定
- 单向绑定：通过props传递数据
- 双向绑定：受控组件+onChange

### 3. 优势
- 职责分离清晰
- 逻辑复用方便
- 测试友好

### 4. 典型模式
- 容器组件模式
- 高阶组件模式
- Render Props
- 自定义Hooks

### 5. 注意事项
- 避免过度抽象
- 合理拆分ViewModel
- 性能优化（memoization）
- 类型安全（TypeScript）`
  },
  {
    id: 196,
    title: "Redux的核心作用",
    tags: ["Redux", "状态管理"],
    difficulty: "中等",
    code: `// Action
const addTodo = text => ({
  type: 'ADD_TODO',
  payload: { text }
});

// Reducer
function todosReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { text: action.payload.text }];
    default:
      return state;
  }
}

// Store
const store = createStore(todosReducer);

// 组件中使用
function TodoApp() {
  const todos = useSelector(state => state);
  const dispatch = useDispatch();
  
  return (
    <div>
      {todos.map(todo => <div>{todo.text}</div>)}
      <button onClick={() => dispatch(addTodo('New Todo'))}>
        Add Todo
      </button>
    </div>
  );
}`,
    answer: `## Redux解决的问题

### 1. 核心功能
- 集中式状态管理
- 可预测的状态更新
- 时间旅行调试
- 中间件扩展

### 2. 适用场景
- 复杂的状态共享
- 需要持久化状态
- 大型团队协作
- 需要状态历史记录

### 3. 三大原则
- 单一数据源
- 状态只读（通过action修改）
- 使用纯函数修改状态（reducer）

### 4. 现代替代方案
- Redux Toolkit简化写法
- Context API + useReducer
- MobX
- Recoil

### 5. 最佳实践
- 按功能模块拆分reducer
- 使用createSlice简化代码
- 避免嵌套过深的状态
- 使用Reselect优化选择器`
  },
  {
    id: 197,
    title: "React性能优化策略",
    tags: ["React", "性能优化", "render"],
    difficulty: "中等",
    code: `// 1. React.memo
const MemoButton = React.memo(({ onClick }) => {
  return <button onClick={onClick}>Click</button>;
});

// 2. useMemo
function ExpensiveComponent({ list }) {
  const sortedList = useMemo(() => 
    list.sort((a, b) => a.value - b.value), 
  [list]);

  return <div>{sortedList.map(/* ... */)}</div>;
}

// 3. useCallback
function Parent() {
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []);

  return <Child onClick={handleClick} />;
}`,
    answer: `## React性能优化方案

### 1. 优化策略
- **组件记忆**：React.memo
- **计算缓存**：useMemo
- **函数缓存**：useCallback
- **虚拟化长列表**：react-window
- **代码分割**：React.lazy

### 2. 关键指标
- 减少不必要的渲染
- 降低渲染计算量
- 减少DOM操作
- 优化状态更新范围

### 3. 工具支持
- React DevTools Profiler
- Chrome Performance Tab
- why-did-you-render
- Memoization检查工具

### 4. 常见误区
- 过度优化简单组件
- 错误使用memo导致更差性能
- 忽略状态结构设计
- 忽视key的重要性

### 5. 高级技巧
- 状态下沉
- 组件提升
- 使用不可变数据
- 批量状态更新`
  },
  {
    id: 198,
    title: "虚拟DOM的核心价值",
    tags: ["React", "虚拟DOM", "原理"],
    difficulty: "中等",
    code: `// 原生DOM操作
function updateDOM(oldNode, newNode) {
  if (oldNode.textContent !== newNode.textContent) {
    oldNode.textContent = newNode.textContent;
  }
  // 需要手动比较所有属性...
}

// React Diff示例
function List({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
}`,
    answer: `## 虚拟DOM的意义

### 1. 核心优势
- **跨平台渲染**：支持SSR、Native等
- **声明式编程**：关注状态而非DOM操作
- **性能优化**：批量更新与智能Diff
- **开发效率**：简化UI更新逻辑

### 2. 工作原理
1. 状态变化生成新虚拟DOM树
2. Diff算法比较新旧树差异
3. 生成最小DOM操作指令
4. 批量执行真实DOM更新

### 3. 性能对比
| 操作         | 虚拟DOM                 | 直接DOM操作          |
|--------------|-------------------------|----------------------|
| 单次更新     | 稍慢                    | 更快                 |
| 复杂更新     | 更快                    | 更慢                 |
| 内存占用     | 较高                    | 较低                 |
| 可维护性     | 更好                    | 较差                 |

### 4. 现代优化
- 时间分片（Scheduler）
- 渐进式渲染
- 编译时优化（SolidJS）`
  },
  {
    id: 199,
    title: "React Diff算法原理",
    tags: ["React", "Diff算法", "虚拟DOM"],
    difficulty: "困难",
    code: `// Key的重要性
function List({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
}

// 节点复用示例
function UserList({ users }) {
  return (
    <div>
      {users.map(user => (
        <UserProfile 
          key={user.id}
          name={user.name}
          avatar={user.avatar}
        />
      ))}
    </div>
  );
}`,
    answer: `## React Diff算法解析

### 1. 核心策略
- **层级比较**：只比较同层级节点
- **类型不同则销毁重建**：div → span
- **Key优化列表比较**：稳定标识符提高复用

### 2. 优化算法
- **树差异**：O(n^3) → O(n)
- **列表对比**：使用key标识移动而非删除重建
- **组件缓存**：shouldComponentUpdate控制

### 3. 比较过程
1. 比较根元素类型
2. 处理属性变化
3. 递归子节点
4. 处理列表节点（key优化）

### 4. 性能技巧
- 保持稳定的组件结构
- 避免随机key
- 列表项使用唯一key
- 避免深层嵌套

### 5. 与Vue Diff对比
| 特性         | React                 | Vue               |
|--------------|-----------------------|-------------------|
| 双端比较     | 否                    | 是                |`
  },
  {
    id: 200,
    title: "Fiber架构深入解析",
    tags: ["React", "Fiber", "架构"],
    difficulty: "困难",
    code: `// 时间分片示例
function App() {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    // 开启并发更新
    startTransition(() => {
      setCount(c => c + 1);
    });
  };

  return (
    <div>
      <button onClick={handleClick}>Increment</button>
      <SlowComponent count={count} />
    </div>
  );
}`,
    answer: `## Fiber架构核心原理

### 1. 解决的问题
- 同步更新阻塞主线程
- 无法中断的渲染过程
- 优先级调度需求
- 复杂动画卡顿

### 2. 核心机制
- **链表结构**：可中断遍历
- **时间分片**：requestIdleCallback调度
- **优先级调度**：事件优先级划分
- **双缓冲**：current与workInProgress树

### 3. 工作流程
1. 生成Fiber树
2. 分片执行渲染任务
3. 可中断/恢复执行
4. 提交更新到DOM

### 4. 带来的新特性
- Suspense
- Concurrent Mode
- 自动批处理
- useTransition

### 5. 性能影响
| 场景         | Stack Reconciler     | Fiber Reconciler    |
|--------------|----------------------|---------------------|
| 输入响应     | 可能延迟             | 即时响应            |
| 复杂更新     | 卡顿明显             | 平滑过渡            |
| 后台渲染     | 不支持               | 支持                |
| 任务优先级   | 无                   | 多优先级            |`
  }
];

export default questions200;