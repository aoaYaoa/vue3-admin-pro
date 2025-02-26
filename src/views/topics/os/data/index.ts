export interface Topic {
    id: number;
    title: string;
    tags: string[];
    difficulty: string;
    answer?: string;
    code?: string;
    description:string
  }
  // 题目列表
const topicList = <Topic[]>([
    {
      id: 273,
      title: "0.1 + 0.2 不等于 0.3 的原因",
      tags: ["浮点数", "IEEE 754", "精度问题"],
      difficulty: "中等",
      code: `// 浮点数精度问题示例
  console.log(0.1 + 0.2); // 0.30000000000000004
  console.log(0.1 + 0.2 === 0.3); // false
  
  // 解决方案
  function safeAdd(a: number, b: number): number {
    const precision = Math.pow(10, 10);
    return (Math.round(a * precision) + Math.round(b * precision)) / precision;
  }
  console.log(safeAdd(0.1, 0.2)); // 0.3`,
      answer: `## 浮点数精度问题解析
  
  ### 1. IEEE 754标准
  - 双精度浮点数（64位）
  - 组成：1位符号 + 11位指数 + 52位尾数
  - 二进制表示无法精确表示某些十进制小数
  
  ### 2. 问题原因
  - 0.1的二进制表示是无限循环小数
  - 0.2的二进制表示也是无限循环小数
  - 相加后的二进制结果需要舍入
  - 转换为十进制时出现精度误差
  
  ### 3. 解决方案
  - **四舍五入**：toFixed()或Math.round()
  - **放大为整数**：先乘精度系数再计算
  - **使用库**：decimal.js、big.js
  - **比较容差**：允许小误差范围
  
  ### 4. 正确比较方法
  \`\`\`javascript
  function numbersEqual(a, b) {
    return Math.abs(a - b) < Number.EPSILON;
  }
  \`\`\`
  
  ### 5. 注意事项
  - 金融计算使用整数分单位
  - 避免连续浮点运算
  - 注意舍入误差累积
  - 了解语言特性`
    },
    {
      id: 274,
      title: "进程与线程的区别",
      tags: ["操作系统", "进程", "线程"],
      difficulty: "中等",
      code: `// 多进程示例（Node.js）
  const { fork } = require('child_process');
  const worker = fork('worker.js');
  worker.send({ task: 'process_data' });
  
  // 多线程示例（Web Worker）
  const worker = new Worker('worker.js');
  worker.postMessage({ task: 'thread_task' });`,
      answer: `## 进程与线程对比
  
  ### 1. 基本概念
  - **进程**：资源分配的基本单位
  - **线程**：CPU调度的基本单位
  
  ### 2. 主要区别
  | 特性         | 进程                     | 线程                     |
  |--------------|--------------------------|--------------------------|
  | 资源分配     | 独立内存空间             | 共享进程内存             |
  | 创建开销     | 大（需复制资源）         | 小（共享资源）           |
  | 通信方式     | IPC（管道、消息队列等）  | 共享内存                 |
  | 容错性       | 一个进程崩溃不影响其他    | 一个线程崩溃导致进程终止 |
  | 上下文切换   | 开销大                   | 开销小                   |
  
  ### 3. 使用场景
  - **进程**：
    - 需要高隔离性
    - 计算密集型任务
    - 需要利用多核CPU
    
  - **线程**：
    - IO密集型任务
    - 需要共享数据
    - 实时响应要求高
  
  ### 4. 现代技术
  - **进程**：Cluster模块、Docker容器
  - **线程**：Worker Threads、线程池
  - **协程**：更轻量的执行单元
  
  ### 5. 选择建议
  - 根据任务类型选择
  - 平衡性能与复杂度
  - 考虑编程语言特性
  - 注意资源共享问题`
    },
    {
      id: 275,
      title: "内存中的堆与栈",
      tags: ["内存管理", "堆", "栈"],
      difficulty: "中等",
      code: `// 栈内存示例（基本类型）
  let a = 10;
  let b = a;
  b = 20;
  console.log(a); // 10
  
  // 堆内存示例（对象类型）
  let obj1 = { value: 10 };
  let obj2 = obj1;
  obj2.value = 20;
  console.log(obj1.value); // 20`,
      answer: `## 堆栈内存管理解析
  
  ### 1. 栈内存
  - **存储内容**：基本类型值、函数调用帧
  - **管理方式**：自动分配释放（LIFO）
  - **特点**：
    - 固定大小
    - 访问速度快
    - 内存连续
    - 空间较小（通常MB级）
  
  ### 2. 堆内存
  - **存储内容**：对象、闭包、动态数据
  - **管理方式**：手动/垃圾回收
  - **特点**：
    - 动态分配
    - 访问速度较慢
    - 内存不连续
    - 空间较大（GB级）
  
  ### 3. 内存分配过程
  1. 基本类型值存入栈
  2. 对象在堆中创建，栈存引用地址
  3. 函数调用创建栈帧
  4. 闭包数据存入堆
  
  ### 4. 垃圾回收
  - **栈**：函数执行完自动清除
  - **堆**：
    - 引用计数（有循环引用问题）
    - 标记清除（现代主流算法）
    - 分代回收（V8引擎）
  
  ### 5. 优化建议
  - 避免全局变量
  - 及时解除引用
  - 使用对象池
  - 注意闭包使用
  - 避免内存泄漏`
    }
  ])
  export default topicList