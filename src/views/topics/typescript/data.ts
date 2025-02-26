// TypeScript 题目列表数据
interface Topic {
    id: number;
    title: string;
    tags: string[];
    difficulty: string;
    code?: string;
    answer?: string;
}

const topicList: Topic[] = [
    {
        id: 113,
        title: 'TypeScript 和 JavaScript 的区别',
        tags: ['TypeScript', '基础概念'],
        difficulty: '简单',
        code: `// JavaScript 代码
function add(a, b) {
  return a + b;
}

// TypeScript 代码
function add(a: number, b: number): number {
  return a + b;
}

// 类型推断
let num = 5; // TypeScript 推断为 number 类型
num = 'hello'; // 错误

// 接口定义
interface User {
  name: string;
  age: number;
}

function greet(user: User) {
  console.log(\`Hello, \${user.name}\`);
}`,
        answer: `## TypeScript 与 JavaScript 的主要区别

### 1. 静态类型系统
- **TypeScript**：编译时类型检查
- **JavaScript**：动态类型

### 2. 类型注解
\`\`\`ts
let count: number = 5;
\`\`\`

### 3. 接口和类型别名
\`\`\`ts
interface Point {
  x: number;
  y: number;
}
\`\`\`

### 4. 高级类型
- 联合类型
- 交叉类型
- 泛型

### 5. 编译过程
- TS 需要编译为 JS 执行
- 支持现代 ES 特性

### 6. 工具支持
- 更好的 IDE 智能提示
- 代码重构更安全
- 自动生成文档

### 7. 适用场景
- 大型项目
- 团队协作开发
- 需要长期维护的项目`
    },
    {
        id: 114,
        title: 'TS 定义变量类型的方法',
        tags: ['TypeScript', '类型系统'],
        difficulty: '简单',
        code: `// 基本类型注解
let isDone: boolean = false;
let count: number = 42;
let name: string = 'Alice';

// 数组类型
let list1: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];

// 元组
let tuple: [string, number] = ['hello', 10];

// 枚举
enum Color { Red, Green, Blue }
let c: Color = Color.Green;

// 任意类型
let notSure: any = 4;
notSure = 'maybe a string';

// 空值
function warn(): void {
  console.log('Warning');
}

// 类型断言
let someValue: any = 'this is a string';
let strLength1: number = (<string>someValue).length;
let strLength2: number = (someValue as string).length;`,
        answer: `## TypeScript 变量类型定义方法

### 1. 基本类型
- boolean
- number
- string
- array
- tuple
- enum
- any
- void
- null/undefined
- never
- object

### 2. 类型声明方式
#### 显式注解
\`\`\`ts
let count: number = 5;
\`\`\`

#### 类型推断
\`\`\`ts
let name = 'Alice'; // 推断为 string
\`\`\`

#### 联合类型
\`\`\`ts
let id: string | number;
\`\`\`

#### 类型别名
\`\`\`ts
type ID = string | number;
\`\`\`

### 3. 高级类型
- 泛型
- 交叉类型
- 索引类型
- 映射类型

### 4. 类型断言
- 尖括号语法
- as 语法
- 非空断言操作符 (!)`
    },
    {
        id: 115,
        title: 'TypeScript 类型注解 (Type Annotation)',
        tags: ['TypeScript', '类型注解'],
        difficulty: '简单',
        code: `// 变量类型注解
let username: string = 'Alice';

// 函数参数和返回值
function add(a: number, b: number): number {
  return a + b;
}

// 对象类型
let user: { name: string; age: number } = {
  name: 'Bob',
  age: 30
};

// 数组类型
let numbers: number[] = [1, 2, 3];

// 接口注解
interface Product {
  id: number;
  name: string;
  price: number;
}

// 泛型函数
function identity<T>(arg: T): T {
  return arg;
}

// 类型断言
let input = document.getElementById('input') as HTMLInputElement;`,
        answer: `## TypeScript 类型注解详解

### 1. 基本类型注解
\`\`\`ts
let isDone: boolean = true;
let decimal: number = 6;
let color: string = "blue";
\`\`\`

### 2. 函数类型
#### 参数类型
\`\`\`ts
function greet(name: string) {
  return "Hello " + name;
}
\`\`\`

#### 返回值类型
\`\`\`ts
function add(a: number, b: number): number {
  return a + b;
}
\`\`\`

### 3. 对象类型
\`\`\`ts
let obj: { x: number; y: string } = { x: 10, y: 'hello' };
\`\`\`

### 4. 数组类型
\`\`\`ts
let list: number[] = [1, 2, 3];
let genericList: Array<number> = [1, 2, 3];
\`\`\`

### 5. 元组类型
\`\`\`ts
let tuple: [string, number] = ['hello', 10];
\`\`\`

### 6. 类型推断
\`\`\`ts
let x = 3; // 推断为 number 类型
\`\`\`

### 7. 最佳实践
- 优先使用类型推断
- 明确公共 API 的类型
- 合理使用 any 类型
- 使用接口定义复杂类型`
    },
    {
        id: 116,
        title: 'TypeScript 中的类型系统',
        tags: ['TypeScript', '类型系统'],
        difficulty: '中等',
        code: `// 结构类型系统
interface Point {
  x: number;
  y: number;
}

function printPoint(point: Point) {
  console.log(\`x: \${point.x}, y: \${point.y}\`);
}

const pointLike = { x: 1, y: 2, z: 3 };
printPoint(pointLike); // 有效

// 类型兼容性
interface Named {
  name: string;
}

class Person {
  constructor(public name: string) {}
}

let p: Named = new Person('Alice');

// 条件类型
type IsString<T> = T extends string ? true : false;
type A = IsString<string>; // true
type B = IsString<number>; // false

// 映射类型
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};`,
        answer: `## TypeScript 类型系统特性

### 1. 结构类型（鸭子类型）
- 基于形状（shape）的类型检查
- 不需要显式实现接口
- 支持属性兼容性检查

### 2. 类型兼容性
- 函数参数：逆变
- 返回值：协变
- 对象属性：协变

### 3. 高级类型
#### 联合类型
\`\`\`ts
type ID = string | number;
\`\`\`

#### 交叉类型
\`\`\`ts
type Named = { name: string };
type Aged = { age: number };
type Person = Named & Aged;
\`\`\`

#### 条件类型
\`\`\`ts
type TypeName<T> = T extends string ? "string" : "object";
\`\`\`

#### 映射类型
\`\`\`ts
type Partial<T> = {
  [P in keyof T]?: T[P];
};
\`\`\`

### 4. 类型推断
- 最佳通用类型
- 上下文类型
- 类型保护

### 5. 类型擦除
- 编译时类型检查
- 运行时无类型信息
- 需要类型守卫处理运行时类型`
    },
    {
        id: 117,
        title: 'TypeScript 中的接口 (Interface)',
        tags: ['TypeScript', '接口'],
        difficulty: '中等',
        code: `// 基本接口
interface User {
  name: string;
  age?: number; // 可选属性
  readonly id: number; // 只读属性
}

// 函数类型接口
interface SearchFunc {
  (source: string, subString: string): boolean;
}

// 可索引类型
interface StringArray {
  [index: number]: string;
}

// 类类型
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
}

// 继承接口
interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}

// 混合类型
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}`,
        answer: `## TypeScript 接口详解

### 1. 接口类型
- 对象接口
- 函数接口
- 可索引接口
- 类接口
- 混合类型接口

### 2. 特性
- 可选属性：?
- 只读属性：readonly
- 函数签名
- 索引签名
- 继承（extends）

### 3. 与类型别名的区别
| 特性         | 接口               | 类型别名           |
|-------------|--------------------|--------------------|
| 扩展        | 通过继承           | 通过交叉类型        |
| 合并        | 声明合并           | 不可合并            |
| 实现        | 可以被类实现        | 不能直接实现        |
| 类型表达式  | 只能定义对象类型    | 可以定义任意类型    |

### 4. 最佳实践
- 使用接口定义对象形状
- 使用类型别名定义联合或元组类型
- 公共 API 优先使用接口
- 需要合并声明时使用接口`
    },
    {
        id: 118,
        title: 'TypeScript 接口 (Interface) 与类型别名 (Type)',
        tags: ['TypeScript', '接口', '类型别名'],
        difficulty: '中等',
        code: `// 接口定义
interface Point {
  x: number;
  y: number;
}

// 类型别名定义
type Point = {
  x: number;
  y: number;
}

// 接口扩展
interface Animal {
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}

// 类型别名扩展
type Animal = {
  name: string;
}

type Bear = Animal & { 
  honey: boolean 
}

// 声明合并
interface Window {
  title: string;
}

interface Window {
  ts: string;
}

const src = 'const a = "Hello World"';
window.ts.transpileModule(src, {});`,
        answer: `## 接口与类型别名对比

### 1. 相同点
- 都可以定义对象类型
- 都支持泛型
- 都可以被类实现

### 2. 不同点
| 特性         | 接口               | 类型别名           |
|-------------|--------------------|--------------------|
| 声明合并    | 支持               | 不支持             |
| 扩展方式    | extends            | &（交叉类型）       |
| 类型表达式  | 仅对象类型         | 任意类型            |
| 实现        | 可以被类 implements| 不能直接实现        |

### 3. 使用场景
#### 推荐使用接口
- 定义对象形状
- 需要声明合并
- 需要被类实现

#### 推荐使用类型别名
- 定义联合类型
- 定义元组类型
- 需要复杂类型运算

### 4. 性能考虑
- 接口检查更快
- 类型别名可能更灵活
- 大型项目接口更易维护`
    },
    {
        id: 119,
        title: '拓扑排序-求模块依赖关系',
        tags: ['算法', '拓扑排序', '依赖关系'],
        difficulty: '困难',
        code: `function topologicalSort(modules: string[][]): string[] {
  const graph: Record<string, string[]> = {};
  const inDegree: Record<string, number> = {};
  
  // 构建图和入度表
  for (const [module, ...deps] of modules) {
    graph[module] = deps;
    inDegree[module] = deps.length;
    for (const dep of deps) {
      if (!(dep in inDegree)) inDegree[dep] = 0;
    }
  }

  const queue: string[] = [];
  const result: string[] = [];
  
  // 初始化队列
  for (const [module, degree] of Object.entries(inDegree)) {
    if (degree === 0) queue.push(module);
  }

  // 处理队列
  while (queue.length) {
    const current = queue.shift()!;
    result.push(current);
    
    for (const module in graph) {
      if (graph[module].includes(current)) {
        inDegree[module]--;
        if (inDegree[module] === 0) {
          queue.push(module);
        }
      }
    }
  }

  return result.length === Object.keys(inDegree).length ? result : [];
}

// 测试用例
const modules = [
  ['A', 'B', 'C'],
  ['B', 'C'],
  ['C']
];
console.log(topologicalSort(modules)); // ['C', 'B', 'A']`,
        answer: `## 拓扑排序算法详解

### 1. 算法步骤
1. **构建依赖图**：记录每个节点的出边
2. **统计入度**：记录每个节点的依赖数量
3. **初始化队列**：将入度为0的节点入队
4. **处理队列**：
   - 取出节点加入结果
   - 更新依赖该节点的节点入度
   - 将新入度为0的节点入队
5. **检查环**：结果长度是否等于节点总数

### 2. 时间复杂度
- O(V + E)（V: 顶点数，E: 边数）

### 3. 应用场景
- 任务调度
- 课程安排
- 编译顺序
- 依赖解析

### 4. 关键点
- 使用邻接表存储图
- 维护入度表
- 队列处理顺序影响结果
- 检测环的存在

### 5. 变体
- 并行处理：同时处理多个入度为0的节点
- 权重扩展：带权拓扑排序
- 字典序排序：使用优先队列`
    },
    {
        id: 120,
        title: '求笛卡尔积',
        tags: ['算法', '数学'],
        difficulty: '中等',
        code: `function cartesianProduct<T>(...sets: T[][]): T[][] {
  return sets.reduce((acc, set) => {
    return acc.flatMap(x => set.map(y => [...x, y]));
  }, [[]] as T[][]);
}

// 测试用例
const colors = ['红', '蓝'];
const sizes = ['S', 'L'];
const styles = ['圆领', 'V领'];
console.log(cartesianProduct(colors, sizes, styles));
/* 输出:
[
  ['红', 'S', '圆领'],
  ['红', 'S', 'V领'],
  ['红', 'L', '圆领'],
  ['红', 'L', 'V领'],
  ['蓝', 'S', '圆领'],
  ['蓝', 'S', 'V领'],
  ['蓝', 'L', '圆领'],
  ['蓝', 'L', 'V领']
]
*/`,
        answer: `## 笛卡尔积算法解析

### 1. 算法实现
- 使用数组的 reduce 和 flatMap
- 递归处理每个集合
- 逐步构建结果

### 2. 数学原理
- 多个集合的笛卡尔积是各集合元素的所有可能组合
- 组合数 = 各集合长度的乘积

### 3. 复杂度分析
- 时间复杂度：O(N*M)（N为结果数量，M为集合数）
- 空间复杂度：O(N*M)

### 4. 优化方向
- 惰性求值（生成器）
- 分块处理大数据集
- 并行计算

### 5. 应用场景
- 商品规格组合
- 参数组合测试
- 排列组合问题
- 多维度数据分析

### 6. 扩展实现
#### 生成器版本
\`\`\`ts
function* cartesianGenerator<T>(...sets: T[][]) {
  let result: T[][] = [[]];
  for (const set of sets) {
    result = result.flatMap(comb => set.map(item => [...comb, item]));
  }
  yield* result;
}
\`\`\`

#### 分块处理
\`\`\`ts
function cartesianProduct<T>(...sets: T[][]): T[][] {
  const result: T[][] = [[]];
  for (const set of sets) {
    const newResult: T[][] = [];
    for (const comb of result) {
      for (const item of set) {
        newResult.push([...comb, item]);
      }
    }
    result.splice(0, result.length, ...newResult);
  }
  return result;
}
\`\`\`

#### 并行计算
\`\`\`ts
function cartesianProduct<T>(...sets: T[][]): T[][] {
  const result: T[][] = [[]];
  const workers = [];
  for (let i = 0; i < sets.length; i++) {
    workers.push(async () => {
      const newResult: T[][] = [];
      for (const comb of result) {
        for (const item of sets[i]) {
          newResult.push([...comb, item]);
        }
      }
      result.splice(0, result.length, ...newResult);
    });
  }
  await Promise.all(workers);
  return result;
}
\`\`\`

### 7. 注意事项
- 处理大数据集时，考虑内存和性能
- 生成器版本适合惰性求值
- 分块处理适合均匀分布的数据
- 并行计算适合多核处理器`
    }
];

export default topicList;