const questions250 = [
  {
    id: 244,
    title: "设计模式基础概念",
    tags: ["设计模式", "基础概念"],
    difficulty: "简单",
    code: `// 简单工厂模式示例
class Button {
  constructor(type) {
    if (type === 'primary') {
      return new PrimaryButton();
    } else if (type === 'secondary') {
      return new SecondaryButton();
    }
  }
}

class PrimaryButton {
  render() {
    console.log('渲染主要按钮');
  }
}

class SecondaryButton {
  render() {
    console.log('渲染次要按钮');
  }
}

// 使用
const btn1 = new Button('primary');
const btn2 = new Button('secondary');`,
    answer: `## 设计模式基础概念

### 1. 定义
设计模式是软件设计中常见问题的典型解决方案，是经过验证的、可重用的设计经验总结。

### 2. 分类
- **创建型**：处理对象创建（工厂、单例等）
- **结构型**：处理对象组合（适配器、装饰器等）
- **行为型**：处理对象交互（观察者、策略等）

### 3. 核心原则
- **开闭原则**：对扩展开放，对修改关闭
- **单一职责**：一个类只做一件事
- **里氏替换**：子类可替换父类
- **接口隔离**：专用接口优于通用接口
- **依赖倒置**：依赖抽象而非实现

### 4. 学习价值
- 提高代码复用性
- 增强系统可维护性
- 促进团队交流
- 避免常见设计错误`
  },
  {
    id: 245,
    title: "设计模式的意义",
    tags: ["设计模式", "软件工程"],
    difficulty: "简单",
    code: `// 未使用设计模式的代码
class User {
  constructor(name) {
    this.name = name;
  }
  
  saveToFile(user) {
    // 直接操作文件系统
  }
  
  saveToDB(user) {
    // 直接操作数据库
  }
}

// 使用设计模式后的代码
class User {
  constructor(name) {
    this.name = name;
  }
}

class UserPersistence {
  constructor(strategy) {
    this.strategy = strategy;
  }
  
  save(user) {
    this.strategy.save(user);
  }
}

class FileStorage {
  save(user) {
    // 文件存储实现
  }
}

class DBStorage {
  save(user) {
    // 数据库存储实现
  }
}`,
    answer: `## 设计模式的意义

### 1. 解决常见问题
- 对象创建复杂性
- 组件耦合度过高
- 功能扩展困难
- 代码重复冗余

### 2. 带来的优势
- **解耦**：降低模块间依赖
- **复用**：通用解决方案
- **可维护**：标准结构易理解
- **灵活**：方便扩展修改

### 3. 适用场景
- 系统需要良好架构
- 需求可能频繁变化
- 需要长期维护
- 团队协作开发

### 4. 注意事项
- 不要过度设计
- 结合具体场景选择
- 理解模式思想而非死记硬背
- 避免模式滥用`
  },
  {
    id: 246,
    title: "MVC架构模式解析",
    tags: ["设计模式", "MVC", "架构模式"],
    difficulty: "中等",
    code: `// MVC简单实现
class Model {
  constructor(data) {
    this.data = data;
  }
}

class View {
  constructor(template) {
    this.template = template;
  }
  
  render(data) {
    return this.template.replace(/{{\w+}}/g, match => data[match.slice(2, -2)]);
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
  
  updateView() {
    const output = this.view.render(this.model.data);
    console.log(output);
  }
}

// 使用
const model = new Model({ name: 'John', age: 30 });
const view = new View('Name: {{name}}, Age: {{age}}');
const controller = new Controller(model, view);
controller.updateView();`,
    answer: `## MVC架构模式详解

### 1. 核心组件
- **Model**：数据与业务逻辑
- **View**：界面展示
- **Controller**：协调Model与View

### 2. 数据流向
1. 用户操作触发Controller
2. Controller更新Model
3. Model通知View更新
4. View从Model获取最新数据

### 3. 优势
- 关注点分离
- 可维护性强
- 组件可复用
- 方便分工协作

### 4. 局限性
- View与Model存在间接依赖
- 复杂应用可能Controller臃肿
- 数据流方向有时不明确

### 5. 适用场景
- 传统Web应用
- 桌面应用程序
- 需要清晰架构的中型项目`
  },
  {
    id: 247,
    title: "MVVM架构模式解析",
    tags: ["设计模式", "MVVM", "架构模式"],
    difficulty: "中等",
    code: `// MVVM简单实现
class Model {
  constructor(data) {
    this.data = data;
  }
}

class ViewModel {
  constructor(model) {
    this.model = model;
    this.bindings = [];
  }
  
  bind(key, element) {
    this.bindings.push({ key, element });
    element.value = this.model.data[key];
    element.addEventListener('input', e => this.update(key, e.target.value));
  }
  
  update(key, value) {
    this.model.data[key] = value;
    this.bindings.filter(b => b.key === key).forEach(b => b.element.value = value);
  }
}

// 使用
const model = new Model({ name: 'John' });
const viewModel = new ViewModel(model);
const input = document.querySelector('#nameInput');
viewModel.bind('name', input);`,
    answer: `## MVVM架构模式详解

### 1. 核心组件
- **Model**：数据层
- **View**：界面层
- **ViewModel**：业务逻辑与数据绑定

### 2. 核心机制
- **数据绑定**：自动同步View与ViewModel
- **命令**：封装UI操作
- **依赖追踪**：自动更新相关视图

### 3. 优势
- 双向数据绑定
- 低耦合
- 可测试性强
- 适合数据驱动场景

### 4. 与MVC对比
|          | MVC               | MVVM              |
|----------|-------------------|-------------------|
| 核心思想 | 关注点分离        | 数据驱动          |
| 数据流   | 单向              | 双向              |
| 适用场景 | 传统Web应用       | 现代前端框架      |
| 复杂度   | 中等              | 较高              |

### 5. 实现要点
- 实现数据劫持（Object.defineProperty/Proxy）
- 建立观察者模式
- 模板编译系统
- 虚拟DOM优化`
  },
  {
    id: 248,
    title: "MVC到MVVM的演进",
    tags: ["设计模式", "MVC", "MVVM", "架构演进"],
    difficulty: "中等",
    code: `// MVC的问题
class UserController {
  constructor() {
    this.model = new UserModel();
    this.view = new UserView();
  }
  
  updateUser(name) {
    this.model.setName(name);
    this.view.render(this.model.getUser());
    // 需要手动更新多个视图
    this.view2.render(this.model.getUser());
  }
}

// MVVM改进
class UserViewModel {
  constructor() {
    this.user = new UserModel();
    this.views = [];
  }
  
  addView(view) {
    this.views.push(view);
    view.render(this.user);
  }
  
  updateName(name) {
    this.user.name = name;
    this.views.forEach(view => view.render(this.user));
  }
}`,
    answer: `## 从MVC到MVVM的演进

### 1. MVC的局限性
- View与Model存在耦合
- Controller职责过重
- 多视图更新困难
- 数据流不够清晰

### 2. MVVM的改进
- **数据绑定**：自动同步视图
- **解耦**：View不直接依赖Model
- **可维护性**：业务逻辑集中管理
- **可测试性**：ViewModel可独立测试

### 3. 关键演进点
- 从被动更新到数据驱动
- 从命令式到声明式
- 从多向通信到单向数据流
- 从DOM操作到虚拟DOM

### 4. 现代框架实现
- Vue：基于Object.defineProperty/Proxy
- React：单向数据流+虚拟DOM
- Angular：脏检查机制

### 5. 选择建议
- 简单项目可用MVC
- 复杂交互推荐MVVM
- 大型应用考虑Flux/Redux`
  },
  {
    id: 249,
    title: "MVVM框架实现示例",
    tags: ["设计模式", "MVVM", "实现"],
    difficulty: "困难",
    code: `// 简易MVVM实现
class MVVM {
  constructor(options) {
    this.$el = document.querySelector(options.el);
    this.$data = options.data;
    
    // 数据劫持
    this.observe(this.$data);
    // 模板编译
    this.compile(this.$el);
  }
  
  observe(data) {
    Object.keys(data).forEach(key => {
      let value = data[key];
      const dep = new Dep();
      
      Object.defineProperty(data, key, {
        get() {
          Dep.target && dep.addSub(Dep.target);
          return value;
        },
        set(newVal) {
          value = newVal;
          dep.notify();
        }
      });
    });
  }
  
  compile(node) {
    [].slice.call(node.childNodes).forEach(node => {
      if (node.nodeType === 1) {
        this.compileElement(node);
      } else if (node.nodeType === 3) {
        this.compileText(node);
      }
    });
  }
  
  compileElement(node) {
    const attrs = node.attributes;
    [].slice.call(attrs).forEach(attr => {
      if (attr.name === 'v-model') {
        const key = attr.value;
        node.value = this.$data[key];
        node.addEventListener('input', e => {
          this.$data[key] = e.target.value;
        });
        new Watcher(this.$data, key, value => {
          node.value = value;
        });
      }
    });
  }
  
  compileText(node) {
    const reg = /{{(.*?)}}/g;
    const text = node.textContent;
    if (reg.test(text)) {
      const key = RegExp.$1.trim();
      node.textContent = this.$data[key];
      new Watcher(this.$data, key, value => {
        node.textContent = value;
      });
    }
  }
}

class Dep {
  constructor() {
    this.subs = [];
  }
  
  addSub(sub) {
    this.subs.push(sub);
  }
  
  notify() {
    this.subs.forEach(sub => sub.update());
  }
}

class Watcher {
  constructor(data, key, cb) {
    Dep.target = this;
    this.cb = cb;
    data[key]; // 触发getter
    Dep.target = null;
  }
  
  update() {
    this.cb();
  }
}

// 使用
const vm = new MVVM({
  el: '#app',
  data: { message: 'Hello MVVM' }
});`,
    answer: `## MVVM框架核心实现

### 1. 核心模块
- **Observer**：数据劫持
- **Dep**：依赖收集
- **Watcher**：更新触发
- **Compiler**：模板编译

### 2. 实现步骤
1. **数据劫持**：使用Object.defineProperty/Proxy
2. **依赖收集**：在getter中收集Watcher
3. **派发更新**：在setter中通知变化
4. **指令解析**：编译模板中的特殊语法
5. **双向绑定**：实现v-model等指令

### 3. 关键难点
- 数组变化的检测
- 嵌套对象监听
- 模板解析性能优化
- 批量异步更新

### 4. 性能优化
- 虚拟DOM
- 异步更新队列
- 组件级更新
- 惰性计算

### 5. 扩展功能
- 计算属性
- 侦听器
- 生命周期钩子
- 组件系统`
  },
  {
    id: 250,
    title: "面向对象编程基础",
    tags: ["面向对象", "OOP", "基础概念"],
    difficulty: "简单",
    code: `// 面向对象示例
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(\`\${this.name} makes a noise\`);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name);
  }
  
  speak() {
    console.log(\`\${this.name} barks\`);
  }
}

const dog = new Dog('Rex');
dog.speak(); // Rex barks

// 多态示例
function animalSpeak(animal) {
  animal.speak();
}

animalSpeak(new Animal('Generic')); // Generic makes a noise
animalSpeak(new Dog('Buddy'));      // Buddy barks`,
    answer: `## 面向对象基本特性

### 1. 四大特性
- **封装**：隐藏实现细节
- **继承**：代码复用与扩展
- **多态**：同一接口不同实现
- **抽象**：简化复杂系统

### 2. 核心概念
- **类与实例**：蓝图与具体对象
- **构造函数**：对象初始化
- **this关键字**：当前实例引用
- **访问控制**：public/private/protected

### 3. 设计原则
- **组合优于继承**：提高灵活性
- **开闭原则**：对扩展开放
- **里氏替换**：子类不破坏父类
- **依赖倒置**：面向接口编程

### 4. 优缺点
| 优点                  | 缺点                  |
|-----------------------|-----------------------|
| 代码复用              | 性能开销              |
| 易维护                | 过度设计风险          |
| 模块化                | 学习曲线陡峭          |
| 适合复杂系统          | 不适合简单场景        |

### 5. 应用场景
- GUI应用程序
- 游戏开发
- 企业级应用
- 框架/库开发`
  }
];

export default questions250;