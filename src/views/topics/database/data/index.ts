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
  // 数据库题目列表数据
const topicList = <Topic[]>([

    {
      id: 339,
      title: "数据库范式解析",
      tags: ["数据库", "范式", "设计理论"],
      difficulty: "中等",
      code: `-- 符合第三范式的表结构
  CREATE TABLE users (
    user_id INT PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    email VARCHAR(100) UNIQUE
  );
  
  CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    order_date DATE
  );
  
  CREATE TABLE order_items (
    item_id INT PRIMARY KEY,
    order_id INT REFERENCES orders(order_id),
    product_id INT REFERENCES products(product_id),
    quantity INT
  );`,
      answer: `## 数据库范式详解
  
  ### 1. 第一范式（1NF）
  - **原子性**：列不可再分
  - **消除重复组**：每个字段只存储单个值
  - **示例**：
    \`\`\`sql
    -- 不符合1NF
    CREATE TABLE contacts (
      id INT,
      phones VARCHAR(100) -- 存储多个电话号码
    );
    \`\`\`
  
  ### 2. 第二范式（2NF）
  - **消除部分依赖**：所有非主属性完全依赖主键
  - **拆分表结构**：
    \`\`\`sql
    -- 不符合2NF
    CREATE TABLE orders (
      order_id INT,
      product_id INT,
      product_name VARCHAR(50), -- 依赖product_id
      PRIMARY KEY (order_id, product_id)
    );
    \`\`\`
  
  ### 3. 第三范式（3NF）
  - **消除传递依赖**：非主属性不依赖其他非主属性
  - **示例优化**：
    \`\`\`sql
    CREATE TABLE products (
      product_id INT PRIMARY KEY,
      product_name VARCHAR(50)
    );
    \`\`\`
  
  ### 4. 反范式化设计
  - 适当冗余提升查询性能
  - 常见于数据仓库
  - 需要权衡数据一致性`
    },
    {
      id: 340,
      title: "MySQL与MongoDB对比",
      tags: ["MySQL", "MongoDB", "数据库对比"],
      difficulty: "中等",
      code: `// MongoDB文档示例
  {
    "_id": ObjectId("5f9d1b9b8b4b4b0001c8e9f1"),
    "name": "John Doe",
    "orders": [
      {
        "order_id": 1001,
        "products": [
          {"product_id": 1, "quantity": 2},
          {"product_id": 2, "quantity": 1}
        ]
      }
    ]
  }
  
  -- MySQL表结构
  CREATE TABLE users (
    user_id INT PRIMARY KEY,
    name VARCHAR(50)
  );
  
  CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
  );`,
      answer: `## 关系型 vs 非关系型数据库
  
  ### 1. 核心差异
  | 特性          | MySQL                  | MongoDB               |
  |---------------|------------------------|-----------------------|
  | 数据模型      | 关系型                 | 文档型                |
  | Schema        | 固定结构               | 动态Schema            |
  | 事务支持      | ACID                   | 多文档事务（4.0+）    |
  | 扩展方式      | 垂直扩展               | 水平扩展              |
  | 查询语言      | SQL                    | MongoDB查询语言       |
  
  ### 2. 适用场景
  - **MySQL**：
    - 复杂事务处理
    - 需要JOIN操作
    - 数据一致性要求高
    
  - **MongoDB**：
    - 快速迭代开发
    - 非结构化数据存储
    - 高吞吐量读写
    - 地理位置查询
  
  ### 3. 性能对比
  - **读取性能**：MongoDB > MySQL（非关联查询）
  - **写入性能**：MongoDB > MySQL
  - **复杂查询**：MySQL > MongoDB
  - **扩展性**：MongoDB > MySQL`
    },
    {
      id: 341,
      title: "MySQL索引优化实践",
      tags: ["MySQL", "索引", "性能优化"],
      difficulty: "中等",
      code: `-- 创建组合索引
  CREATE INDEX idx_name_age ON users(name, age);
  
  -- 使用覆盖索引
  EXPLAIN SELECT name, age FROM users WHERE name = 'John';
  
  -- 索引失效示例
  SELECT * FROM users WHERE YEAR(create_time) = 2023;`,
      answer: `## MySQL索引最佳实践
  
  ### 1. 索引类型
  - **B-Tree索引**：默认索引类型
  - **哈希索引**：Memory引擎
  - **全文索引**：文本搜索
  - **空间索引**：地理数据
  
  ### 2. 创建原则
  - 选择区分度高的列
  - 避免过度索引
  - 组合索引最左前缀原则
  - 考虑覆盖索引
  
  ### 3. 索引优化
  | 场景                | 优化方法                      |
  |---------------------|-----------------------------|
  | 模糊查询            | 前缀索引（name(10)）         |
  | 范围查询            | 组合索引放在最后             |
  | 排序操作            | 索引顺序与排序顺序一致       |
  | JOIN操作            | 外键字段建立索引             |
  
  ### 4. 常见问题
  - 隐式类型转换导致索引失效
  - 使用函数导致索引失效
  - OR条件未全部使用索引
  - 索引合并效率低`
    },
    {
      id: 342,
      title: "索引优缺点分析",
      tags: ["MySQL", "索引", "性能优化"],
      difficulty: "中等",
      code: `-- 索引带来的性能提升
  SELECT * FROM users WHERE email = 'user@example.com'; -- 有索引
  
  -- 索引维护成本示例
  ALTER TABLE users ADD INDEX idx_email (email); -- 锁表时间
  INSERT INTO users (email) VALUES ('new@example.com'); -- 写性能影响`,
      answer: `## 索引优缺点分析
  
  ### 1. 优势
  - 加速数据检索速度
  - 提高JOIN效率
  - 优化排序和分组
  - 实现覆盖索引查询
  
  ### 2. 劣势
  - 增加存储空间
  - 降低写操作性能
  - 维护成本高
  - 可能产生索引碎片
  
  ### 3. 使用建议
  - 读多写少的场景
  - 关键查询字段
  - 高基数列
  - 合理选择索引类型
  
  ### 4. 监控维护
  - 使用SHOW INDEX分析
  - 定期OPTIMIZE TABLE
  - 监控索引使用率
  - 删除未使用索引`
    },
    {
      id: 343,
      title: "MySQL存储引擎对比",
      tags: ["MySQL", "存储引擎", "InnoDB"],
      difficulty: "中等",
      code: `-- 查看存储引擎
  SHOW ENGINES;
  
  -- 指定存储引擎建表
  CREATE TABLE my_table (
    id INT PRIMARY KEY
  ) ENGINE=InnoDB;`,
      answer: `## MySQL存储引擎解析
  
  ### 1. InnoDB
  - **特性**：
    - 支持事务
    - 行级锁
    - 外键约束
    - 崩溃恢复
  - **适用场景**：
    - OLTP系统
    - 需要事务支持
    - 高并发写入
  
  ### 2. MyISAM
  - **特性**：
    - 表级锁
    - 全文索引
    - 高速读取
  - **适用场景**：
    - 只读/读多写少
    - 数据仓库
    - 日志系统
  
  ### 3. Memory
  - **特性**：
    - 内存存储
    - 临时表
    - 哈希索引
  - **适用场景**：
    - 临时数据处理
    - 高速缓存
    - 会话存储
  
  ### 4. 选择建议
  - 默认使用InnoDB
  - 需要全文索引考虑MyISAM
  - 临时数据使用Memory`
    },
    {
      id: 344,
      title: "InnoDB与MyISAM对比",
      tags: ["MySQL", "InnoDB", "MyISAM"],
      difficulty: "中等",
      code: `-- InnoDB事务示例
  START TRANSACTION;
  UPDATE accounts SET balance = balance - 100 WHERE user_id = 1;
  UPDATE accounts SET balance = balance + 100 WHERE user_id = 2;
  COMMIT;
  
  -- MyISAM插入速度测试
  INSERT INTO log_messages (message) VALUES ('test');`,
      answer: `## 存储引擎深度对比
  
  ### 1. 核心差异
  | 特性          | InnoDB                  | MyISAM               |
  |---------------|-------------------------|----------------------|
  | 事务支持      | ✔️                      | ❌                   |
  | 锁粒度        | 行级锁                  | 表级锁               |
  | 外键          | 支持                    | 不支持               |
  | 崩溃恢复      | 支持                    | 不支持               |
  | 全文索引      | 5.6+支持                | 支持                 |
  
  ### 2. 性能对比
  - **读取性能**：MyISAM > InnoDB（简单查询）
  - **写入性能**：InnoDB > MyISAM（并发写入）
  - **存储空间**：MyISAM < InnoDB
  - **内存使用**：InnoDB > MyISAM
  
  ### 3. 使用场景
  - **InnoDB**：
    - 银行交易系统
    - 电商订单系统
    - 需要事务的CRUD操作
    
  - **MyISAM**：
    - 网站内容管理
    - 日志分析系统
    - 数据仓库`
    },
    {
      id: 345,
      title: "常用SQL语法示例",
      tags: ["SQL", "数据库", "基础语法"],
      difficulty: "简单",
      code: `-- 数据查询
  SELECT name, age FROM users WHERE age > 18 ORDER BY age DESC LIMIT 10;
  
  -- 数据插入
  INSERT INTO users (name, email) VALUES ('John', 'john@example.com');
  
  -- 数据更新
  UPDATE users SET age = 30 WHERE id = 1;
  
  -- 数据删除
  DELETE FROM users WHERE status = 'inactive';`,
      answer: `## SQL基础语法指南
  
  ### 1. DDL（数据定义）
  \`\`\`sql
  CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
  );
  
  ALTER TABLE users ADD COLUMN email VARCHAR(100);
  DROP TABLE users;
  \`\`\`
  
  ### 2. DML（数据操作）
  \`\`\`sql
  -- 批量插入
  INSERT INTO users (name) VALUES ('Alice'), ('Bob');
  
  -- 条件更新
  UPDATE products SET price = price * 0.9 WHERE stock > 100;
  
  -- 联合删除
  DELETE orders, items 
  FROM orders
  JOIN items ON orders.id = items.order_id
  WHERE orders.status = 'expired';
  \`\`\`
  
  ### 3. 查询进阶
  \`\`\`sql
  -- 聚合查询
  SELECT department, AVG(salary) 
  FROM employees 
  GROUP BY department 
  HAVING AVG(salary) > 5000;
  
  -- 子查询
  SELECT name FROM users 
  WHERE id IN (SELECT user_id FROM orders);
  
  -- 分页查询
  SELECT * FROM products 
  ORDER BY id 
  LIMIT 10 OFFSET 20;
  \`\`\``
    },
    {
      id: 346,
      title: "SQL联表查询实践",
      tags: ["SQL", "连接查询", "数据库"],
      difficulty: "中等",
      code: `-- 内连接
  SELECT u.name, o.order_date 
  FROM users u
  JOIN orders o ON u.id = o.user_id;
  
  -- 左连接
  SELECT u.name, COUNT(o.id) 
  FROM users u
  LEFT JOIN orders o ON u.id = o.user_id
  GROUP BY u.id;
  
  -- 自连接
  SELECT e.name, m.name AS manager
  FROM employees e
  LEFT JOIN employees m ON e.manager_id = m.id;`,
      answer: `## 联表查询深度解析
  
  ### 1. 连接类型
  | 连接类型        | 描述                          |
  |----------------|-------------------------------|
  | INNER JOIN     | 返回匹配记录                  |
  | LEFT JOIN      | 返回左表全部+右表匹配         |
  | RIGHT JOIN     | 返回右表全部+左表匹配         |
  | FULL OUTER JOIN| 返回所有记录（MySQL不支持）    |
  | CROSS JOIN     | 笛卡尔积                      |
  
  ### 2. 性能优化
  - 为连接字段建立索引
  - 优先使用INNER JOIN
  - 避免多表联查（考虑反范式化）
  - 使用EXPLAIN分析执行计划
  - 控制结果集大小
  
  ### 3. 使用场景
  - **INNER JOIN**：需要精确匹配
  - **LEFT JOIN**：保留主表所有记录
  - **SELF JOIN**：层级数据查询
  - **UNION**：合并多个查询结果`
    },
    {
      id: 347,
      title: "Redis核心功能解析",
      tags: ["Redis", "缓存", "NoSQL"],
      difficulty: "简单",
      code: `// Redis基本操作
  127.0.0.1:6379> SET user:1 "John Doe"
  OK
  127.0.0.1:6379> GET user:1
  "John Doe"
  
  // 设置过期时间
  127.0.0.1:6379> SETEX session:abc 3600 "user_data"
  OK`,
      answer: `## Redis核心特性
  
  ### 1. 数据结构
  - **String**：缓存、计数器
  - **Hash**：对象存储
  - **List**：消息队列
  - **Set**：唯一集合
  - **Sorted Set**：排行榜
  - **HyperLogLog**：基数统计
  
  ### 2. 持久化机制
  - **RDB**：定时快照
  - **AOF**：追加操作日志
  - 混合持久化（4.0+）
  
  ### 3. 使用场景
  - 会话缓存
  - 排行榜/计数器
  - 消息队列
  - 实时数据分析
  - 分布式锁
  
  ### 4. 最佳实践
  - 合理设置过期时间
  - 避免大Key（>1MB）
  - 使用Pipeline批量操作
  - 监控内存使用`
    },
    {
      id: 348,
      title: "Kafka架构解析",
      tags: ["Kafka", "消息队列", "分布式系统"],
      difficulty: "中等",
      code: `// 生产者示例
  Properties props = new Properties();
  props.put("bootstrap.servers", "localhost:9092");
  props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
  props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");
  
  Producer<String, String> producer = new KafkaProducer<>(props);
  producer.send(new ProducerRecord<>("test-topic", "key", "value"));
  
  // 消费者示例
  Properties props = new Properties();
  props.put("group.id", "test-group");
  Consumer<String, String> consumer = new KafkaConsumer<>(props);
  consumer.subscribe(Collections.singletonList("test-topic"));`,
      answer: `## Kafka核心概念
  
  ### 1. 架构组件
  - **Broker**：服务节点
  - **Topic**：消息类别
  - **Partition**：分区（并行单位）
  - **Producer**：消息生产者
  - **Consumer**：消息消费者
  - **Zookeeper**：元数据管理
  
  ### 2. 特性优势
  - 高吞吐量（百万级/秒）
  - 消息持久化（磁盘存储）
  - 水平扩展能力
  - 消息回溯能力
  - 流式处理支持
  
  ### 3. 使用场景
  - 日志收集
  - 流数据处理
  - 事件溯源
  - 指标监控
  - 消息总线
  
  ### 4. 配置优化
  - 合理设置分区数
  - 优化批处理大小
  - 调整副本因子
  - 监控消费延迟`
    },
    {
      id: 349,
      title: "Redis与Kafka对比",
      tags: ["Redis", "Kafka", "技术对比"],
      difficulty: "中等",
      code: `// Redis发布订阅
  127.0.0.1:6379> SUBSCRIBE news
  Reading messages... (press Ctrl-C to quit)
  1) "subscribe"
  2) "news"
  3) (integer) 1
  
  // Kafka生产者
  producer.send(new ProducerRecord<>("news", "Breaking news!"));`,
      answer: `## Redis vs Kafka
  
  ### 1. 核心差异
  | 特性          | Redis                  | Kafka                 |
  |---------------|------------------------|-----------------------|
  | 数据持久化    | 可选                   | 必须                  |
  | 消息保留      | 基于策略删除           | 可配置保留时间        |
  | 消费模式      | 发布/订阅              | 消费者组              |
  | 吞吐量        | 10万级/秒              | 百万级/秒             |
  | 数据规模      | 内存限制               | 磁盘存储              |
  
  ### 2. 使用场景
  - **Redis**：
    - 实时缓存
    - 会话存储
    - 简单消息队列
    - 实时排行榜
    
  - **Kafka**：
    - 日志收集
    - 流处理管道
    - 事件溯源
    - 大数据管道
  
  ### 3. 如何选择
  - 需要持久化存储选Kafka
  - 低延迟需求选Redis
  - 大数据量选Kafka
  - 简单消息队列两者均可`
    },
    {
      id: 350,
      title: "主键设计最佳实践",
      tags: ["数据库", "主键设计", "最佳实践"],
      difficulty: "中等",
      code: `-- UUID主键示例
  CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50)
  );
  
  -- 雪花ID示例
  CREATE TABLE orders (
    id BIGINT PRIMARY KEY,
    -- 其他字段...
  );`,
      answer: `## 主键设计指南
  
  ### 1. 自增ID问题
  - **安全风险**：容易预测
  - **分库分表**：难以扩展
  - **数据迁移**：可能冲突
  - **隐私泄露**：暴露数据量
  
  ### 2. 替代方案
  - **UUID**：
    - 全局唯一
    - 无序存储影响性能
    - 占用空间大（32字符）
    
  - **雪花算法**：
    - 趋势递增
    - 包含时间戳
    - 分布式友好
    
  - **业务主键**：
    - 使用自然键（如ISBN）
    - 需要保证唯一性
    - 可能暴露业务信息
  
  ### 3. 选择建议
  - 分布式系统用雪花ID
  - 需要隐藏信息用UUID
  - 简单系统可用自增ID
  - 联合主键慎用`
    }

  
 
])
  export default topicList
 