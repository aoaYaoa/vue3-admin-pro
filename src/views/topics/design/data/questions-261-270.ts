const questions270 = [
  {
    id: 261,
    title: "状态模式实践",
    tags: ["设计模式", "行为型模式", "状态"],
    difficulty: "中等",
    code: `// 状态模式示例
class VendingMachine {
  constructor() {
    this.state = new NoCoinState(this);
  }

  setState(state) {
    this.state = state;
  }

  insertCoin() {
    this.state.insertCoin();
  }

  selectProduct() {
    this.state.selectProduct();
  }

  dispense() {
    this.state.dispense();
  }
}

class State {
  constructor(machine) {
    this.machine = machine;
  }

  insertCoin() {
    throw new Error('必须实现insertCoin方法');
  }

  selectProduct() {
    throw new Error('必须实现selectProduct方法');
  }

  dispense() {
    throw new Error('必须实现dispense方法');
  }
}

class NoCoinState extends State {
  insertCoin() {
    console.log('硬币已插入');
    this.machine.setState(new HasCoinState(this.machine));
  }

  selectProduct() {
    console.log('请先插入硬币');
  }

  dispense() {
    console.log('请先选择商品');
  }
}

class HasCoinState extends State {
  selectProduct() {
    console.log('商品已选择');
    this.machine.setState(new DispensingState(this.machine));
  }

  insertCoin() {
    console.log('已存在硬币');
  }

  dispense() {
    console.log('请先选择商品');
  }
}

class DispensingState extends State {
  dispense() {
    console.log('商品已发放');
    this.machine.setState(new NoCoinState(this.machine));
  }

  insertCoin() {
    console.log('正在发放商品，请稍候');
  }

  selectProduct() {
    console.log('正在发放商品，请稍候');
  }
}`,
    answer: `## 状态模式详解

### 1. 核心思想
- 对象行为随状态改变而改变
- 将状态封装为独立类
- 通过委托实现状态转换

### 2. 主要角色
- **Context**：维护当前状态
- **State**：抽象状态接口
- **ConcreteState**：具体状态实现

### 3. 适用场景
- 对象行为取决于状态
- 需要大量条件状态判断
- 状态转换逻辑复杂
- 需要清晰的状态管理

### 4. 优势
- 消除条件分支
- 方便添加新状态
- 状态转换显式管理
- 状态逻辑集中维护

### 5. 注意事项
- 控制状态转换的正确性
- 避免状态类膨胀
- 合理划分状态粒度
- 处理跨状态操作`
  },
  {
    id: 262,
    title: "访问者模式实现",
    tags: ["设计模式", "行为型模式", "访问者"],
    difficulty: "困难",
    code: `// 访问者模式示例
class ComputerPartVisitor {
  visitComputer(computer) {}
  visitMouse(mouse) {}
  visitKeyboard(keyboard) {}
  visitMonitor(monitor) {}
}

class ComputerPart {
  accept(visitor) {}
}

class Computer extends ComputerPart {
  constructor() {
    super();
    this.parts = [new Mouse(), new Keyboard(), new Monitor()];
  }

  accept(visitor) {
    this.parts.forEach(part => part.accept(visitor));
    visitor.visitComputer(this);
  }
}

class Mouse extends ComputerPart {
  accept(visitor) {
    visitor.visitMouse(this);
  }
}

class Keyboard extends ComputerPart {
  accept(visitor) {
    visitor.visitKeyboard(this);
  }
}

class Monitor extends ComputerPart {
  accept(visitor) {
    visitor.visitMonitor(this);
  }
}

class DisplayVisitor extends ComputerPartVisitor {
  visitComputer(computer) {
    console.log('显示电脑');
  }

  visitMouse(mouse) {
    console.log('显示鼠标');
  }

  visitKeyboard(keyboard) {
    console.log('显示键盘');
  }

  visitMonitor(monitor) {
    console.log('显示显示器');
  }
}

// 使用
const computer = new Computer();
computer.accept(new DisplayVisitor());`,
    answer: `## 访问者模式解析

### 1. 核心概念
- 将算法与对象结构分离
- 在不修改类的前提下添加新操作
- 双重分派机制

### 2. 主要角色
- **Visitor**：定义访问操作
- **ConcreteVisitor**：实现具体算法
- **Element**：定义accept接口
- **ObjectStructure**：元素集合

### 3. 适用场景
- 需要对复杂对象结构进行操作
- 需要多个不相关的操作
- 数据结构稳定但操作多变
- 需要分离关注点

### 4. 优缺点
| 优点                  | 缺点                  |
|-----------------------|-----------------------|
| 添加新操作容易        | 增加新元素类型困难    |
| 相关行为集中          | 破坏封装性            |
| 访问多个类            | 复杂对象结构效率问题  |

### 5. 应用实例
- 编译器语法树遍历
- 文件系统访问
- XML文档处理
- 复杂报表生成`
  },
  {
    id: 263,
    title: "模板方法模式实践",
    tags: ["设计模式", "行为型模式", "模板方法"],
    difficulty: "中等",
    code: `// 模板方法模式示例
abstract class DataProcessor {
  process() {
    this.readData();
    this.validate();
    this.transform();
    this.save();
  }

  readData() {
    throw new Error('必须实现readData方法');
  }

  validate() {
    console.log('执行通用验证');
  }

  abstract transform();

  save() {
    console.log('保存到数据库');
  }
}

class CSVProcessor extends DataProcessor {
  readData() {
    console.log('读取CSV文件');
  }

  transform() {
    console.log('转换CSV数据');
  }
}

class XMLProcessor extends DataProcessor {
  readData() {
    console.log('读取XML文件');
  }

  transform() {
    console.log('转换XML数据');
  }

  validate() {
    super.validate();
    console.log('执行XML特定验证');
  }
}`,
    answer: `## 模板方法模式详解

### 1. 核心思想
- 定义算法骨架
- 子类重定义某些步骤
- 控制子类扩展点

### 2. 实现要点
- 抽象类定义模板方法
- 基本方法分为：
  - 抽象方法：必须由子类实现
  - 钩子方法：可选覆盖
  - 具体方法：通用实现

### 3. 适用场景
- 算法步骤固定但部分可变
- 需要代码复用
- 控制子类扩展方式
- 重要流程需要统一管理

### 4. 优势
- 代码复用最大化
- 反向控制结构
- 方便维护算法结构
- 规范化开发流程

### 5. 注意事项
- 合理设计抽象方法数量
- 避免过度细化步骤
- 防止模板方法膨胀
- 使用钩子方法灵活控制`
  },
  {
    id: 264,
    title: "中介者模式实现",
    tags: ["设计模式", "行为型模式", "中介者"],
    difficulty: "中等",
    code: `// 中介者模式示例
class ChatRoom {
  showMessage(user, message) {
    const time = new Date().toLocaleTimeString();
    console.log(\`[\${time}] \${user.name}: \${message}\`);
  }
}

class User {
  constructor(name, chatMediator) {
    this.name = name;
    this.chatMediator = chatMediator;
  }

  send(message) {
    this.chatMediator.showMessage(this, message);
  }
}

// 使用
const chatRoom = new ChatRoom();
const user1 = new User('John', chatRoom);
const user2 = new User('Alice', chatRoom);

user1.send('Hi!');
user2.send('Hello!');`,
    answer: `## 中介者模式解析

### 1. 核心思想
- 用中介对象封装交互
- 对象间解耦
- 集中控制交互逻辑

### 2. 主要角色
- **Mediator**：定义中介接口
- **ConcreteMediator**：协调各对象
- **Colleague**：交互的各个对象

### 3. 适用场景
- 对象间交互复杂
- 需要集中控制逻辑
- 减少类间依赖
- 系统组件多对多交互

### 4. 优势
- 减少类间耦合
- 简化对象协议
- 集中控制交互
- 容易扩展新对象

### 5. 注意事项
- 避免中介者过于复杂
- 合理划分职责边界
- 防止中介者成为上帝对象
- 考虑性能影响`
  },
  {
    id: 265,
    title: "备忘录模式实践",
    tags: ["设计模式", "行为型模式", "备忘录"],
    difficulty: "中等",
    code: `// 备忘录模式示例
class EditorMemento {
  constructor(content) {
    this.content = content;
  }
}

class Editor {
  constructor() {
    this.content = '';
  }

  type(text) {
    this.content += text;
  }

  save() {
    return new EditorMemento(this.content);
  }

  restore(memento) {
    this.content = memento.content;
  }
}

class History {
  constructor() {
    this.states = [];
  }

  push(state) {
    this.states.push(state);
  }

  pop() {
    return this.states.pop();
  }
}

// 使用
const editor = new Editor();
const history = new History();

editor.type('Hello');
history.push(editor.save());
editor.type(' World');
console.log(editor.content); // Hello World

editor.restore(history.pop());
console.log(editor.content); // Hello`,
    answer: `## 备忘录模式详解

### 1. 核心概念
- 捕获对象状态
- 不破坏封装保存状态
- 支持状态恢复

### 2. 主要角色
- **Originator**：创建备忘录
- **Memento**：存储状态
- **Caretaker**：管理备忘录

### 3. 适用场景
- 需要撤销/重做功能
- 需要保存对象历史状态
- 需要快照功能
- 防止直接访问对象内部状态

### 4. 实现方式
- **完全封装**：仅Originator可访问状态
- **部分封装**：有限访问权限
- **增量存储**：仅保存变化部分
- **压缩存储**：优化存储空间

### 5. 应用实例
- 文本编辑器撤销
- 游戏存档
- 事务回滚
- 数据库快照`
  },
  {
    id: 266,
    title: "解释器模式实现",
    tags: ["设计模式", "行为型模式", "解释器"],
    difficulty: "困难",
    code: `// 解释器模式示例
class Context {
  constructor(input) {
    this.input = input;
    this.output = 0;
  }
}

class Expression {
  interpret(context) {}
}

class NumberExpression extends Expression {
  constructor(number) {
    super();
    this.number = number;
  }

  interpret(context) {
    context.output = this.number;
  }
}

class AddExpression extends Expression {
  constructor(left, right) {
    super();
    this.left = left;
    this.right = right;
  }

  interpret(context) {
    this.left.interpret(context);
    const left = context.output;
    this.right.interpret(context);
    context.output += left;
  }
}

// 使用
const context = new Context();
const expression = new AddExpression(
  new NumberExpression(10),
  new NumberExpression(20)
);
expression.interpret(context);
console.log(context.output); // 30`,
    answer: `## 解释器模式解析

### 1. 核心思想
- 定义语法表示
- 解释语言中的句子
- 构建抽象语法树

### 2. 主要角色
- **AbstractExpression**：抽象表达式
- **TerminalExpression**：终结符表达式
- **NonterminalExpression**：非终结符表达式
- **Context**：全局信息

### 3. 适用场景
- 需要解释简单语法
- 效率不是关键因素
- 文法容易扩展
- 需要动态执行表达式

### 4. 优势
- 容易修改语法规则
- 扩展新的表达式
- 实现文法简单
- 结合组合模式构建语法树

### 5. 注意事项
- 复杂文法难以维护
- 效率可能较低
- 考虑使用解析器生成器
- 避免过度使用`
  },
  {
    id: 267,
    title: "享元模式实践",
    tags: ["设计模式", "结构型模式", "享元"],
    difficulty: "中等",
    code: `// 享元模式示例
class TreeType {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }

  draw(x, y) {
    console.log(\`在(\${x}, \${y})绘制\${this.color}的\${this.name}\`);
  }
}

class TreeFactory {
  static treeTypes = new Map();

  static getTreeType(name, color) {
    let type = this.treeTypes.get(name);
    if (!type) {
      type = new TreeType(name, color);
      this.treeTypes.set(name, type);
    }
    return type;
  }
}

class Tree {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
  }

  draw() {
    this.type.draw(this.x, this.y);
  }
}

// 使用
const type1 = TreeFactory.getTreeType('松树', '绿色');
const type2 = TreeFactory.getTreeType('枫树', '红色');

const trees = [
  new Tree(1, 2, type1),
  new Tree(3, 4, type1),
  new Tree(5, 6, type2)
];

trees.forEach(tree => tree.draw());`,
    answer: `## 享元模式详解

### 1. 核心概念
- 共享细粒度对象
- 减少内存使用
- 分离内部/外部状态

### 2. 状态分类
- **内部状态**：可共享的部分
- **外部状态**：不可共享的部分

### 3. 适用场景
- 大量相似对象
- 对象大部分状态可外部化
- 需要缓存对象
- 内存占用需要优化

### 4. 实现步骤
1. 分离内部和外部状态
2. 创建享元工厂
3. 客户端维护外部状态
4. 通过工厂获取享元

### 5. 应用实例
- 文字编辑器字符对象
- 游戏中的粒子系统
- 图形渲染图元
- 数据库连接池`
  },
  {
    id: 268,
    title: "责任链模式实现",
    tags: ["设计模式", "行为型模式", "责任链"],
    difficulty: "中等",
    code: `// 责任链模式示例
class Handler {
  setNext(handler) {
    this.nextHandler = handler;
    return handler;
  }

  handle(request) {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
  }
}

class AuthHandler extends Handler {
  handle(request) {
    if (request.isAuthenticated) {
      console.log('认证通过');
      return super.handle(request);
    }
    console.log('认证失败');
    return false;
  }
}

class LoggingHandler extends Handler {
  handle(request) {
    console.log(\`记录请求: \${request.url}\`);
    return super.handle(request);
  }
}

class CacheHandler extends Handler {
  constructor() {
    super();
    this.cache = new Map();
  }

  handle(request) {
    if (this.cache.has(request.url)) {
      console.log('返回缓存结果');
      return this.cache.get(request.url);
    }
    const result = super.handle(request);
    this.cache.set(request.url, result);
    return result;
  }
}

// 使用
const auth = new AuthHandler();
const logger = new LoggingHandler();
const cache = new CacheHandler();

auth.setNext(logger).setNext(cache);

const request = { url: '/api/data', isAuthenticated: true };
auth.handle(request);`,
    answer: `## 责任链模式解析

### 1. 核心思想
- 多个对象处理请求
- 解耦请求发送者和接收者
- 动态组合处理链

### 2. 主要角色
- **Handler**：定义处理接口
- **ConcreteHandler**：具体处理器
- **Client**：创建处理链

### 3. 适用场景
- 多个对象可处理请求
- 需要动态指定处理者
- 需要解耦请求与处理
- 需要顺序处理请求

### 4. 优势
- 降低耦合度
- 动态调整责任链
- 增强扩展性
- 灵活分配责任

### 5. 注意事项
- 保证请求被处理
- 控制链的长度
- 避免循环引用
- 处理性能开销`
  },
  {
    id: 269,
    title: "桥接模式实践",
    tags: ["设计模式", "结构型模式", "桥接"],
    difficulty: "中等",
    code: `// 桥接模式示例
class Renderer {
  renderShape(shape) {}
}

class VectorRenderer extends Renderer {
  renderShape(shape) {
    console.log(\`绘制矢量\${shape}\`);
  }
}

class RasterRenderer extends Renderer {
  renderShape(shape) {
    console.log(\`绘制位图\${shape}\`);
  }
}

class Shape {
  constructor(renderer) {
    this.renderer = renderer;
  }

  draw() {}
}

class Circle extends Shape {
  constructor(renderer, radius) {
    super(renderer);
    this.radius = radius;
  }

  draw() {
    this.renderer.renderShape(\`圆形，半径\${this.radius}\`);
  }
}

class Square extends Shape {
  constructor(renderer, side) {
    super(renderer);
    this.side = side;
  }

  draw() {
    this.renderer.renderShape(\`正方形，边长\${this.side}\`);
  }
}

// 使用
const vector = new VectorRenderer();
const raster = new RasterRenderer();

new Circle(vector, 5).draw();
new Square(raster, 10).draw();`,
    answer: `## 桥接模式详解

### 1. 核心概念
- 分离抽象与实现
- 使用组合代替继承
- 独立变化维度

### 2. 主要角色
- **Abstraction**：抽象接口
- **RefinedAbstraction**：扩展抽象
- **Implementor**：实现接口
- **ConcreteImplementor**：具体实现

### 3. 适用场景
- 需要避免永久绑定实现
- 抽象和实现都需要扩展
- 需要运行时切换实现
- 存在多个变化维度

### 4. 优势
- 分离接口与实现
- 提高可扩展性
- 隐藏实现细节
- 减少子类数量

### 5. 相关模式
- **适配器模式**：改变接口
- **抽象工厂模式**：创建相关对象
- **策略模式**：封装算法`
  },
  {
    id: 270,
    title: "组合模式实现",
    tags: ["设计模式", "结构型模式", "组合"],
    difficulty: "中等",
    code: `// 组合模式示例
class FileSystemComponent {
  constructor(name) {
    this.name = name;
  }

  add(component) {
    throw new Error('不支持添加');
  }

  remove(component) {
    throw new Error('不支持删除');
  }

  display(depth = 0) {
    console.log(' '.repeat(depth * 2) + this.name);
  }
}

class File extends FileSystemComponent {
  constructor(name) {
    super(name);
  }
}

class Directory extends FileSystemComponent {
  constructor(name) {
    super(name);
    this.children = [];
  }

  add(component) {
    this.children.push(component);
  }

  remove(component) {
    const index = this.children.indexOf(component);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }

  display(depth = 0) {
    super.display(depth);
    this.children.forEach(child => child.display(depth + 1));
  }
}

// 使用
const root = new Directory('root');
const home = new Directory('home');
const user = new Directory('user');
const file1 = new File('file1.txt');
const file2 = new File('file2.txt');

root.add(home);
home.add(user);
user.add(file1);
user.add(file2);

root.display();`,
    answer: `## 组合模式解析

### 1. 核心思想
- 统一处理树形结构
- 一致对待单个对象和组合
- 递归组合对象

### 2. 主要角色
- **Component**：统一接口
- **Leaf**：叶子节点
- **Composite**：容器组件

### 3. 适用场景
- 表示部分-整体层次
- 希望忽略对象差异
- 需要树形结构处理
- 需要递归组合

### 4. 实现方式
- **透明式**：所有方法在Component
- **安全式**：仅Composite有管理方法

### 5. 应用实例
- 文件系统
- GUI组件树
- 组织结构管理
- XML文档处理`
  }
];

export default questions270; 