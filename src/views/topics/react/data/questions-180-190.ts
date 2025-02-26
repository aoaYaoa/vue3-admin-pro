const questions190 = [
  {
    id: 185,
    title: "React Fiber 架构设计原因",
    tags: ["React", "Fiber", "原理"],
    difficulty: "困难",
    code: `// Fiber节点结构
type Fiber = {
  tag: WorkTag,
  key: null | string,
  elementType: any,
  type: any,
  stateNode: any,
  return: Fiber | null,
  child: Fiber | null,
  sibling: Fiber | null,
  index: number,
  ref: any,
  pendingProps: any,
  memoizedProps: any,
  updateQueue: mixed,
  memoizedState: any,
  dependencies: Dependencies | null,
  mode: TypeOfMode,
  effectTag: SideEffectTag,
  nextEffect: Fiber | null,
  firstEffect: Fiber | null,
  lastEffect: Fiber | null,
  lanes: Lanes,
  childLanes: Lanes,
  alternate: Fiber | null,
  actualDuration?: number,
  actualStartTime?: number,
  selfBaseDuration?: number,
  treeBaseDuration?: number,
  _debugID?: number,
  _debugSource?: Source | null,
  _debugOwner?: Fiber | null,
  _debugIsCurrentlyTiming?: boolean,
  _debugHookTypes?: Array<HookType> | null,
};`,
    answer: `## React Fiber 设计原因

### 1. 解决的核心问题
- **同步更新阻塞**：大组件树更新导致主线程卡顿
- **优先级调度**：无法中断高耗时的渲染过程
- **增量渲染**：拆分渲染任务为多个小任务

### 2. 主要改进
- **可中断的异步渲染**：使用requestIdleCallback调度
- **优先级控制**：区分用户交互等高优先级更新
- **错误边界**：更好的错误处理机制
- **渐进式渲染**：分片处理大型更新

### 3. 实现原理
- **Fiber节点**：虚拟DOM的扩展结构
- **双缓存技术**：current树和workInProgress树
- **链表结构**：实现可中断遍历
- **副作用列表**：批量处理DOM更新

### 4. 性能提升
| 指标         | Stack Reconciler | Fiber Reconciler |
|--------------|------------------|------------------|
| 任务拆分     | 不可拆分         | 可拆分           |
| 优先级控制   | 无               | 有               |
| 最大FPS      | 30               | 60               |
| 卡顿感知     | 明显             | 轻微             |

### 5. 影响
- 支持Suspense等新特性
- 为并发模式打下基础
- 提升复杂应用性能`
  },
  {
    id: 186,
    title: "React 组件生命周期方法",
    tags: ["React", "生命周期"],
    difficulty: "简单",
    code: `class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // 在render前调用
    return null;
  }

  componentDidMount() {
    // 组件挂载后
  }

  shouldComponentUpdate(nextProps, nextState) {
    // 决定是否更新
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // 在DOM更新前捕获信息
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // 更新完成后
  }

  componentWillUnmount() {
    // 组件卸载前
  }

  render() {
    return <div>{this.state.count}</div>;
  }
}`,
    answer: `## React 生命周期方法

### 1. 挂载阶段
1. constructor()
2. static getDerivedStateFromProps()
3. render()
4. componentDidMount()

### 2. 更新阶段
1. static getDerivedStateFromProps()
2. shouldComponentUpdate()
3. render()
4. getSnapshotBeforeUpdate()
5. componentDidUpdate()

### 3. 卸载阶段
1. componentWillUnmount()

### 4. 错误处理
1. static getDerivedStateFromError()
2. componentDidCatch()

### 5. 生命周期图示
\`\`\`
Mounting:
constructor → getDerivedStateFromProps → render → componentDidMount

Updating:
getDerivedStateFromProps → shouldComponentUpdate → render → getSnapshotBeforeUpdate → componentDidUpdate

Unmounting:
componentWillUnmount
\`\`\`

### 6. 最佳实践
- 避免在render中执行副作用
- 使用componentDidUpdate处理更新逻辑
- 在componentWillUnmount清理资源`
  },
  {
    id: 187,
    title: "state 和 props 的区别",
    tags: ["React", "state", "props"],
    difficulty: "简单",
    code: `// 父组件
function Parent() {
  const [count, setCount] = useState(0);
  return <Child count={count} />;
}

// 子组件
class Child extends React.Component {
  state = { localCount: 0 };
  
  render() {
    return (
      <div>
        <p>Props count: {this.props.count}</p>
        <p>State count: {this.state.localCount}</p>
      </div>
    );
  }
}`,
    answer: `## state 与 props 对比

### 1. 核心区别
| 特性         | state                      | props                     |
|--------------|----------------------------|---------------------------|
| 所有权       | 组件自身拥有               | 父组件传入                |
| 可变性       | 组件内部可修改             | 只读                      |
| 作用范围     | 组件内部私有               | 跨组件传递                |
| 更新触发     | setState触发重新渲染       | 父组件重新渲染时更新      |

### 2. 使用原则
- **props向下**：父传子数据
- **state保持**：组件内部状态
- **状态提升**：共享状态提升到共同父组件

### 3. 更新机制
- **props更新**：父组件重新渲染时
- **state更新**：调用setState方法

### 4. 最佳实践
- 避免直接修改state
- props用于配置组件
- state管理交互状态
- 复杂状态使用状态管理`
  },
  {
    id: 188,
    title: "高阶组件（HOC）详解",
    tags: ["React", "HOC", "设计模式"],
    difficulty: "中等",
    code: `// 高阶组件示例
function withLogger(WrappedComponent) {
  return class extends React.Component {
    componentDidMount() {
      console.log(\`Component \${WrappedComponent.name} mounted\`);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

// 使用HOC
const EnhancedComponent = withLogger(MyComponent);

// 带参数的HOC
function withToggle(toggleProp) {
  return function(WrappedComponent) {
    return class extends React.Component {
      state = { isOn: false };
      
      toggle = () => {
        this.setState(prev => ({ isOn: !prev.isOn }));
      };

      render() {
        const toggleProps = {
          [toggleProp]: this.state.isOn,
          onToggle: this.toggle
        };
        return <WrappedComponent {...this.props} {...toggleProps} />;
      }
    };
  };
}`,
    answer: `## 高阶组件（HOC）模式

### 1. 核心概念
- **函数接受组件**：输入一个组件，返回新组件
- **代码复用**：抽取通用逻辑
- **Props代理**：操作或传递props
- **反向继承**：继承被包装组件

### 2. 常见场景
- 权限控制
- 日志记录
- 数据获取
- 状态管理

### 3. 实现方式
- **Props Proxy**：操作props
- **Inheritance Inversion**：继承被包装组件
- **Render Hijacking**：控制渲染输出

### 4. 注意事项
- 避免修改原组件
- 正确传递refs
- 保持displayName可读
- 组合多个HOC时注意顺序

### 5. 与Hooks对比
| 特性         | HOC                        | Hooks                     |
|--------------|----------------------------|---------------------------|
| 嵌套问题     | 多层嵌套导致wrapper hell   | 扁平化调用                |
| 逻辑复用     | 组件层面                   | 函数层面                  |
| 性能影响     | 可能产生额外组件           | 更轻量                    |`
  },
  {
    id: 189,
    title: "受控组件与非受控组件",
    tags: ["React", "表单", "组件设计"],
    difficulty: "中等",
    code: `// 受控组件
function ControlledForm() {
  const [value, setValue] = useState('');
  
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return <input value={value} onChange={handleChange} />;
}

// 非受控组件
class UncontrolledForm extends React.Component {
  inputRef = React.createRef();

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.inputRef.current.value);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input ref={this.inputRef} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}`,
    answer: `## 受控 vs 非受控组件

### 1. 核心区别
| 特性         | 受控组件                   | 非受控组件               |
|--------------|----------------------------|--------------------------|
| 数据管理     | React状态控制             | DOM自身维护              |
| 更新方式     | onChange事件+setState      | ref直接访问DOM           |
| 表单验证     | 实时验证                   | 提交时验证               |
| 适用场景     | 复杂表单交互               | 简单表单/文件上传        |

### 2. 选择建议
- **使用受控**：
  - 需要即时验证
  - 复杂表单逻辑
  - 动态表单字段
- **使用非受控**：
  - 简单表单
  - 文件上传
  - 集成第三方库

### 3. 性能考量
- 受控组件每次输入触发渲染
- 非受控组件性能更好但可控性差

### 4. 最佳实践
- 优先使用受控组件
- 复杂表单使用Formik等库
- 非受控组件配合defaultValue`
  },
  {
    id: 190,
    title: "展示组件与容器组件",
    tags: ["React", "组件设计", "模式"],
    difficulty: "中等",
    code: `// 展示组件
const UserList = ({ users, isLoading }) => (
  isLoading ? (
    <div>Loading...</div>
  ) : (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
);

// 容器组件
class UserListContainer extends React.Component {
  state = { users: [], isLoading: true };

  componentDidMount() {
    fetch('/api/users')
      .then(res => res.json())
      .then(users => this.setState({ users, isLoading: false }));
  }

  render() {
    return <UserList {...this.state} />;
  }
}`,
    answer: `## 组件设计模式

### 1. 展示组件（Presentational）
- **职责**：UI呈现
- **特点**：
  - 无状态（可函数组件）
  - 接收props渲染UI
  - 不关心数据来源
  - 可复用性强

### 2. 容器组件（Container）
- **职责**：数据逻辑
- **特点**：
  - 管理状态
  - 处理业务逻辑
  - 与数据层交互
  - 通常为class组件

### 3. 优势
- **关注点分离**：UI与逻辑解耦
- **可复用性**：展示组件可复用
- **可维护性**：逻辑集中管理
- **测试友好**：独立测试各层

### 4. 现代演进
- **Hooks替代容器组件**：useState/useEffect
- **状态管理库**：Redux, MobX
- **组件组合模式**：Render Props, Compound Components

### 5. 最佳实践
- 保持展示组件纯净
- 容器组件处理副作用
- 合理拆分组件职责
- 结合Hooks优化结构`
  }
];

export default questions190;