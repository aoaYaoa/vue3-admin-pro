const questions280 = [
    {
        id: 271,
        title: '迭代器模式（Iterator Pattern）',
        tags: ['设计模式', '行为型模式', '迭代器'],
        difficulty: '中等',
        code: `// 迭代器模式示例
class Book {
  constructor(title) {
    this.title = title;
  }
}

class BookShelf {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
  }

  getIterator() {
    return new BookShelfIterator(this);
  }
}

class BookShelfIterator {
  constructor(bookShelf) {
    this.bookShelf = bookShelf;
    this.index = 0;
  }

  hasNext() {
    return this.index < this.bookShelf.books.length;
  }

  next() {
    return this.bookShelf.books[this.index++];
  }
}

// 使用
const shelf = new BookShelf();
shelf.addBook(new Book('设计模式'));
shelf.addBook(new Book('代码整洁之道'));
shelf.addBook(new Book('重构'));

const iterator = shelf.getIterator();
while (iterator.hasNext()) {
  console.log(iterator.next().title);
}`,
        answer: `## 迭代器模式详解

### 1. 核心思想
- 提供统一访问集合的方式
- 分离集合遍历逻辑
- 支持多种遍历方式

### 2. 主要角色
- **Iterator**：定义迭代接口
- **ConcreteIterator**：具体迭代器
- **Aggregate**：集合接口
- **ConcreteAggregate**：具体集合

### 3. 适用场景
- 需要统一遍历不同结构
- 需要支持多种遍历方式
- 隐藏集合内部实现
- 需要并行遍历

### 4. 优势
- 简化集合接口
- 支持多种遍历
- 解耦遍历算法
- 提高代码复用

### 5. 现代应用
- JavaScript迭代器协议
- 生成器函数
- 集合类库实现
- 数据库查询结果遍历`
    },
    {
        id: 272,
        title: '代理模式（Proxy Pattern）',
        tags: ['设计模式', '结构型模式', '代理'],
        difficulty: '中等',
        code: `// 代理模式示例
interface Image {
  display(): void;
}

class RealImage implements Image {
  constructor(filename: string) {
    this.filename = filename;
    this.loadFromDisk();
  }

  display() {
    console.log(\`显示图片: \${this.filename}\`);
  }

  private loadFromDisk() {
    console.log(\`加载图片: \${this.filename}\`);
  }
}

class ProxyImage implements Image {
  private realImage: RealImage | null = null;

  constructor(private filename: string) {}

  display() {
    if (!this.realImage) {
      this.realImage = new RealImage(this.filename);
    }
    this.realImage.display();
  }
}

// 使用
const image = new ProxyImage('test.jpg');
image.display(); // 第一次加载
image.display(); // 直接显示`,
        answer: `## 代理模式解析

### 1. 核心概念
- 为其他对象提供代理控制访问
- 代理与目标对象实现相同接口
- 控制对原对象的访问

### 2. 代理类型
- **虚拟代理**：延迟创建开销大的对象
- **保护代理**：控制访问权限
- **远程代理**：本地代表远程对象
- **缓存代理**：缓存请求结果
- **智能引用**：附加额外操作

### 3. 适用场景
- 需要控制对象访问
- 需要延迟初始化
- 需要本地代表远程对象
- 需要添加访问控制
- 需要缓存请求结果

### 4. 优势
- 职责清晰
- 高扩展性
- 智能化控制
- 保护目标对象

### 5. 相关模式
- **适配器模式**：改变接口
- **装饰器模式**：增强功能
- **外观模式**：简化接口`
    }
]
export default questions280; 