const questions260 = [
  {
    id: 251,
    title: "面向对象设计原则",
    tags: ["面向对象", "设计原则", "SOLID"],
    difficulty: "中等",
    code: `// 单一职责原则示例
class UserAuth {
  authenticate(username, password) {
    // 认证逻辑
  }
}

class UserData {
  save(user) {
    // 数据存储逻辑
  }
}

// 开闭原则示例
class Shape {
  area() {
    throw new Error('必须实现area方法');
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  
  area() {
    return Math.PI * this.radius ** 2;
  }
}

class Square extends Shape {
  constructor(side) {
    super();
    this.side = side;
  }
  
  area() {
    return this.side ** 2;
  }
}`,
    answer: `## SOLID设计原则详解

### 1. 单一职责原则 (SRP)
- 一个类只负责一个功能领域
- 优点：提高内聚，降低耦合
- 示例：分离用户认证与数据存储

### 2. 开闭原则 (OCP)
- 对扩展开放，对修改关闭
- 使用继承/组合扩展功能
- 示例：形状类继承体系

### 3. 里氏替换原则 (LSP)
- 子类必须能够替换父类
- 保持继承关系的正确性
- 示例：正方形不是长方形的子类

### 4. 接口隔离原则 (ISP)
- 客户端不应依赖不需要的接口
- 创建专用的小接口
- 示例：分离读写接口

### 5. 依赖倒置原则 (DIP)
- 依赖抽象而非具体实现
- 高层模块不依赖低层模块
- 示例：依赖数据库接口而非具体DB`
  },
  {
    id: 252,
    title: "单例模式实现",
    tags: ["设计模式", "创建型模式", "单例"],
    difficulty: "中等",
    code: `// 单例模式实现
class Logger {
  static instance;
  
  constructor() {
    if (Logger.instance) {
      return Logger.instance;
    }
    this.logs = [];
    Logger.instance = this;
  }
  
  log(message) {
    this.logs.push(message);
    console.log(message);
  }
  
  printLogCount() {
    console.log(\`\${this.logs.length} logs\`);
  }
}

// 使用
const logger1 = new Logger();
const logger2 = new Logger();
console.log(logger1 === logger2); // true`,
    answer: `## 单例模式详解

### 1. 核心思想
- 确保类只有一个实例
- 全局访问点
- 延迟初始化

### 2. 实现方式
- **饿汉式**：类加载时创建
- **懒汉式**：首次请求时创建
- **双重检查锁**：线程安全
- **静态内部类**：利用类加载机制

### 3. 使用场景
- 配置管理
- 日志系统
- 数据库连接池
- 缓存系统

### 4. 优缺点
| 优点                  | 缺点                  |
|-----------------------|-----------------------|
| 严格控制实例数量      | 难以测试              |
| 节省系统资源          | 违反单一职责原则      |
| 全局访问点            | 可能产生隐藏依赖      |

### 5. 注意事项
- 线程安全问题
- 序列化问题
- 反射攻击防护
- 依赖注入框架中的使用`
  },
  {
    id: 253,
    title: "工厂模式实践",
    tags: ["设计模式", "创建型模式", "工厂"],
    difficulty: "中等",
    code: `// 抽象工厂示例
class VehicleFactory {
  createCar() {
    throw new Error('必须实现createCar方法');
  }
  
  createBike() {
    throw new Error('必须实现createBike方法');
  }
}

class SportsVehicleFactory extends VehicleFactory {
  createCar() {
    return new SportsCar();
  }
  
  createBike() {
    return new SportsBike();
  }
}

class FamilyVehicleFactory extends VehicleFactory {
  createCar() {
    return new FamilyCar();
  }
  
  createBike() {
    return new FamilyBike();
  }
}

// 使用
const factory = new SportsVehicleFactory();
const car = factory.createCar();
const bike = factory.createBike();`,
    answer: `## 工厂模式解析

### 1. 模式分类
- **简单工厂**：单一方法创建不同对象
- **工厂方法**：子类决定实例化类
- **抽象工厂**：创建相关对象族

### 2. 核心优势
- 解耦创建逻辑
- 扩展性强
- 统一创建接口
- 支持复杂对象创建

### 3. 适用场景
- 对象创建过程复杂
- 需要统一创建接口
- 系统需要多系列产品
- 需要动态切换产品族

### 4. 与建造者模式区别
| 工厂模式              | 建造者模式            |
|-----------------------|-----------------------|
| 创建不同但相关类型的对象 | 创建复杂对象的不同表示 |
| 立即返回最终产品      | 分步骤构建对象        |
| 关注产品类型          | 关注构建过程          |

### 5. 最佳实践
- 使用依赖注入
- 结合配置文件
- 实现产品注册机制
- 使用泛型增强类型安全`
  },
  {
    id: 254,
    title: "建造者模式实现",
    tags: ["设计模式", "创建型模式", "建造者"],
    difficulty: "中等",
    code: `// 建造者模式示例
class Pizza {
  constructor() {
    this.toppings = [];
    this.crust = 'regular';
    this.size = 'medium';
  }
}

class PizzaBuilder {
  constructor() {
    this.pizza = new Pizza();
  }
  
  setSize(size) {
    this.pizza.size = size;
    return this;
  }
  
  setCrust(crust) {
    this.pizza.crust = crust;
    return this;
  }
  
  addTopping(topping) {
    this.pizza.toppings.push(topping);
    return this;
  }
  
  build() {
    return this.pizza;
  }
}

// 使用
const pizza = new PizzaBuilder()
  .setSize('large')
  .setCrust('thin')
  .addTopping('mushrooms')
  .addTopping('pepperoni')
  .build();`,
    answer: `## 建造者模式详解

### 1. 核心思想
- 分步骤构建复杂对象
- 隔离复杂对象的创建与表示
- 允许不同表示的对象创建

### 2. 主要角色
- **Builder**：抽象建造者接口
- **ConcreteBuilder**：具体建造者
- **Director**：指导构建过程
- **Product**：最终产品

### 3. 适用场景
- 创建复杂对象（多个部件）
- 需要不同表示的对象
- 需要精确控制构建过程
- 对象创建算法独立于部件

### 4. 优势
- 分步创建对象
- 改变产品内部表示
- 更好的控制构建过程
- 复用构建过程

### 5. 变体
- **Fluent Interface**：链式调用
- **Groovy-style Builder**：DSL式构建
- **Step Builder**：强制分步构建`
  },
  {
    id: 255,
    title: "原型模式应用",
    tags: ["设计模式", "创建型模式", "原型"],
    difficulty: "中等",
    code: `// 原型模式示例
class DocumentPrototype {
  clone() {
    const clone = new DocumentPrototype();
    Object.assign(clone, this);
    return clone;
  }
}

class Report extends DocumentPrototype {
  constructor(title, sections) {
    super();
    this.title = title;
    this.sections = sections;
    this.footer = 'Confidential';
  }
}

// 使用
const original = new Report('Monthly Report', ['Sales', 'Expenses']);
const copy = original.clone();
copy.sections.push('Profit');`,
    answer: `## 原型模式解析

### 1. 核心概念
- 通过克隆现有对象创建新对象
- 避免重复初始化开销
- 动态获取对象运行时状态

### 2. 实现方式
- **浅拷贝**：复制基本类型，引用共享
- **深拷贝**：完全独立副本
- **注册表管理**：原型对象管理

### 3. 适用场景
- 对象创建成本高
- 需要动态配置对象
- 需要保存对象状态快照
- 系统需要简单对象副本

### 4. 与工厂模式对比
| 原型模式              | 工厂模式              |
|-----------------------|-----------------------|
| 克隆现有对象          | 新建对象              |
| 保留对象状态          | 初始化为默认状态      |
| 适合复杂对象创建      | 适合简单对象创建      |

### 5. JavaScript实现
- Object.create()
- Object.assign()
- 自定义clone方法
- 处理循环引用`
  },
  {
    id: 256,
    title: "适配器模式实践",
    tags: ["设计模式", "结构型模式", "适配器"],
    difficulty: "中等",
    code: `// 适配器模式示例
class OldAPI {
  request(data) {
    return \`XML: <response>\${JSON.stringify(data)}</response>\`;
  }
}

class NewAPI {
  jsonRequest(data) {
    return { status: 200, data };
  }
}

class APIAdapter {
  constructor(api) {
    this.api = api;
  }
  
  request(data) {
    const result = this.api.jsonRequest(data);
    return \`JSON: \${JSON.stringify(result)}\`;
  }
}

// 使用
const oldApi = new OldAPI();
const adapter = new APIAdapter(new NewAPI());
console.log(adapter.request({ user: 'test' }));`,
    answer: `## 适配器模式详解

### 1. 核心作用
- 转换接口不兼容的对象
- 充当两个接口之间的桥梁
- 复用已有类

### 2. 实现方式
- **类适配器**：多重继承
- **对象适配器**：组合方式
- **双向适配器**：双向转换

### 3. 适用场景
- 集成遗留系统
- 使用第三方库
- 接口版本升级
- 统一多个类的接口

### 4. 优缺点
| 优点                  | 缺点                  |
|-----------------------|-----------------------|
| 提高代码复用          | 增加系统复杂性        |
| 提高类的透明性        | 过多适配器难维护      |
| 灵活替换被适配对象    | 可能降低性能          |

### 5. 相关模式
- **桥接模式**：分离抽象与实现
- **装饰器模式**：增强对象功能
- **代理模式**：控制对象访问`
  },
  {
    id: 257,
    title: "装饰者模式实现",
    tags: ["设计模式", "结构型模式", "装饰者"],
    difficulty: "中等",
    code: `// 装饰者模式示例
class Coffee {
  cost() {
    return 5;
  }
}

class MilkDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }
  
  cost() {
    return this.coffee.cost() + 2;
  }
}

class SugarDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }
  
  cost() {
    return this.coffee.cost() + 1;
  }
}

// 使用
let coffee = new Coffee();
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);
console.log(coffee.cost()); // 8`,
    answer: `## 装饰者模式解析

### 1. 核心思想
- 动态添加功能
- 替代子类继承
- 保持接口一致性

### 2. 主要角色
- **Component**：抽象组件
- **ConcreteComponent**：具体组件
- **Decorator**：抽象装饰类
- **ConcreteDecorator**：具体装饰类

### 3. 适用场景
- 扩展对象功能
- 动态添加/撤销功能
- 替代多层继承
- 需要透明使用对象

### 4. 优势
- 比继承更灵活
- 避免特征组合爆炸
- 运行时添加功能
- 遵守开闭原则

### 5. 注意事项
- 保持装饰器接口透明
- 管理装饰器顺序
- 避免多层装饰性能问题
- 与代理模式区分`
  },
  {
    id: 258,
    title: "观察者模式应用",
    tags: ["设计模式", "行为型模式", "观察者"],
    difficulty: "中等",
    code: `// 观察者模式实现
class Subject {
  constructor() {
    this.observers = [];
  }
  
  addObserver(observer) {
    this.observers.push(observer);
  }
  
  removeObserver(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }
  
  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

class Observer {
  update(data) {
    console.log(\`收到更新: \${data}\`);
  }
}

// 使用
const subject = new Subject();
const observer1 = new Observer();
const observer2 = new Observer();

subject.addObserver(observer1);
subject.addObserver(observer2);
subject.notify('新数据!');`,
    answer: `## 观察者模式详解

### 1. 核心概念
- 定义对象间一对多依赖
- 主题状态变化自动通知观察者
- 又称发布-订阅模式

### 2. 实现方式
- **推模式**：主题主动推送数据
- **拉模式**：观察者主动获取数据
- **事件总线**：全局事件系统

### 3. 适用场景
- 抽象耦合的场景
- 跨系统消息交换
- 需要广播通信
- 链式触发系统

### 4. 优缺点
| 优点                  | 缺点                  |
|-----------------------|-----------------------|
| 解耦观察者与被观察者  | 通知顺序不可控        |
| 支持广播通信          | 循环引用问题          |
| 动态建立关系          | 观察者过多影响性能    |

### 5. 现代应用
- React状态管理
- Vue响应式系统
- Redux的Store
- DOM事件系统`
  },
  {
    id: 259,
    title: "策略模式实践",
    tags: ["设计模式", "行为型模式", "策略"],
    difficulty: "中等",
    code: `// 策略模式示例
class PaymentStrategy {
  pay(amount) {
    throw new Error('必须实现pay方法');
  }
}

class CreditCardStrategy extends PaymentStrategy {
  pay(amount) {
    console.log(\`信用卡支付 \${amount} 元\`);
  }
}

class AlipayStrategy extends PaymentStrategy {
  pay(amount) {
    console.log(\`支付宝支付 \${amount} 元\`);
  }
}

class PaymentContext {
  constructor(strategy) {
    this.strategy = strategy;
  }
  
  executePay(amount) {
    this.strategy.pay(amount);
  }
}

// 使用
const context = new PaymentContext(new AlipayStrategy());
context.executePay(100);`,
    answer: `## 策略模式解析

### 1. 核心思想
- 定义算法族，封装每个算法
- 使算法可独立变化
- 运行时选择算法

### 2. 主要角色
- **Context**：维护策略引用
- **Strategy**：抽象策略接口
- **ConcreteStrategy**：具体策略

### 3. 适用场景
- 需要多种算法变体
- 避免使用条件语句选择算法
- 算法需要自由切换
- 隐藏算法实现细节

### 4. 优势
- 算法自由切换
- 避免多重条件判断
- 扩展性良好
- 算法复用

### 5. 相关模式
- **工厂模式**：创建策略对象
- **状态模式**：状态改变行为
- **命令模式**：封装请求为对象`
  },
  {
    id: 260,
    title: "命令模式实现",
    tags: ["设计模式", "行为型模式", "命令"],
    difficulty: "中等",
    code: `// 命令模式示例
class Light {
  on() {
    console.log('开灯');
  }
  
  off() {
    console.log('关灯');
  }
}

class Command {
  execute() {}
}

class LightOnCommand extends Command {
  constructor(light) {
    super();
    this.light = light;
  }
  
  execute() {
    this.light.on();
  }
}

class RemoteControl {
  constructor() {
    this.command = null;
  }
  
  setCommand(command) {
    this.command = command;
  }
  
  pressButton() {
    this.command.execute();
  }
}

// 使用
const light = new Light();
const remote = new RemoteControl();
remote.setCommand(new LightOnCommand(light));
remote.pressButton();`,
    answer: `## 命令模式详解

### 1. 核心概念
- 将请求封装为对象
- 支持请求的排队、记录、撤销
- 解耦请求发送者与接收者

### 2. 主要角色
- **Command**：抽象命令接口
- **ConcreteCommand**：具体命令
- **Invoker**：触发命令
- **Receiver**：命令执行者

### 3. 适用场景
- 需要回调功能
- 需要支持撤销/重做
- 需要事务系统
- 需要命令队列

### 4. 高级功能
- **宏命令**：组合多个命令
- **撤销/重做**：维护命令历史
- **事务处理**：原子操作
- **延迟执行**：命令队列

### 5. 应用实例
- 文本编辑器操作
- 数据库事务
- 任务调度系统
- GUI按钮事件处理`
  }
];

export default questions260;