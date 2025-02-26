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
        id: 329,
        title: "Node.js核心特性解析",
        tags: ["Node.js", "服务端", "基础概念"],
        difficulty: "简单",
        code: `// 异步I/O示例
    const fs = require('fs');
    
    // 非阻塞读取文件
    fs.readFile('file.txt', 'utf8', (err, data) => {
      if (err) throw err;
      console.log(data);
    });
    
    // 事件循环示例
    setImmediate(() => console.log('Immediate'));
    setTimeout(() => console.log('Timeout'), 0);
    process.nextTick(() => console.log('Next Tick'));`,
        answer: `## Node.js核心特性
    
    ### 1. 主要特点
    - **非阻塞I/O**：
      - 异步处理文件/网络操作
      - 高并发处理能力
      - 回调函数机制
    
    - **事件驱动**：
      - EventEmitter基础
      - 事件循环机制
      - 观察者模式
    
    - **单线程**：
      - 主线程处理事件循环
      - Worker Threads处理CPU密集型任务
      - 集群模式利用多核
    
    ### 2. 技术优势
    - 适合I/O密集型应用
    - 统一的JavaScript全栈开发
    - 丰富的模块生态系统（npm）
    - 高效的开发效率
    
    ### 3. 应用场景
    - Web服务端开发
    - 命令行工具
    - 微服务架构
    - 实时应用（Socket.io）
    - 服务端渲染（SSR）`
      },
      {
        id: 330,
        title: "Node.js应用场景分析",
        tags: ["Node.js", "服务端", "应用场景"],
        difficulty: "简单",
        code: `// 创建HTTP服务器
    const http = require('http');
    
    const server = http.createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello Node.js');
    });
    
    server.listen(3000, () => {
      console.log('Server running at http://localhost:3000/');
    });
    
    // 流处理示例
    const fs = require('fs');
    const zlib = require('zlib');
    
    fs.createReadStream('input.txt')
      .pipe(zlib.createGzip())
      .pipe(fs.createWriteStream('output.txt.gz'));`,
        answer: `## Node.js典型应用场景
    
    ### 1. Web服务开发
    - RESTful API服务
    - 实时聊天应用
    - 服务端渲染
    - BFF（Backend For Frontend）层
    
    ### 2. 工具开发
    - 构建工具（Webpack/Gulp）
    - CLI工具
    - 自动化脚本
    - 数据转换工具
    
    ### 3. 微服务架构
    - 高并发接口
    - 网关服务
    - 服务聚合
    - 轻量级服务
    
    ### 4. 其他场景
    - IoT应用
    - 实时数据分析
    - 代理服务器
    - 爬虫系统`
      },
      {
        id: 331,
        title: "跨域白名单配置实践",
        tags: ["Node.js", "CORS", "跨域"],
        difficulty: "中等",
        code: `// 动态CORS中间件
    const corsMiddleware = (allowedOrigins) => (req, res, next) => {
      const origin = req.headers.origin;
      if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
      }
      
      if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
      }
      next();
    };
    
    // 使用示例
    const allowedOrigins = [
      'https://client.com',
      'https://dev.client.com'
    ];
    app.use(corsMiddleware(allowedOrigins));`,
        answer: `## 跨域白名单配置指南
    
    ### 1. 配置要点
    - 动态验证请求来源
    - 严格限制允许的域名
    - 支持预检请求
    - 携带身份凭证
    - 设置安全响应头
    
    ### 2. 安全增强
    - 使用环境变量管理白名单
    - 定期审核允许的域名
    - 监控跨域请求日志
    - 结合JWT验证
    - 限制HTTP方法
    
    ### 3. 常见问题
    - 多个域名配置
    - 本地开发环境处理
    - 缓存问题
    - 通配符使用风险
    - 移动端兼容性`
      },
      {
        id: 332,
        title: "依赖管理对比分析",
        tags: ["Node.js", "npm", "依赖管理"],
        difficulty: "简单",
        code: `// package.json示例
    {
      "name": "my-app",
      "dependencies": {
        "express": "^4.17.1",
        "lodash": "4.17.21"
      },
      "devDependencies": {
        "eslint": "^7.32.0",
        "jest": "^27.0.6"
      }
    }
    
    // 安装生产依赖
    npm install express --save
    
    // 安装开发依赖
    npm install eslint --save-dev`,
        answer: `## 依赖类型解析
    
    ### 1. 核心区别
    |                | dependencies          | devDependencies       |
    |----------------|-----------------------|-----------------------|
    | 安装环境       | 生产环境              | 开发环境              |
    | 打包部署       | 包含                  | 不包含                |
    | 典型依赖       | 框架/库              | 构建工具/测试框架     |
    | 安装命令       | npm install --save    | npm install --save-dev|
    
    ### 2. 管理建议
    - 明确区分依赖类型
    - 使用精确版本号
    - 定期更新依赖
    - 审计依赖安全性
    - 使用npm audit
    
    ### 3. 特殊情况
    - peerDependencies
    - optionalDependencies
    - bundledDependencies
    - 全局安装依赖`
      },
      {
        id: 333,
        title: "幽灵依赖问题解决",
        tags: ["Node.js", "npm", "依赖管理"],
        difficulty: "中等",
        code: `// 使用package-lock.json
    {
      "lockfileVersion": 2,
      "requires": true,
      "packages": {
        "": {
          "dependencies": {
            "express": "^4.17.1"
          }
        },
        "node_modules/express": {
          "version": "4.17.1",
          "dependencies": {
            "accepts": "~1.3.7"
          }
        }
      }
    }
    
    // 使用pnpm解决
    npm install -g pnpm
    pnpm install`,
        answer: `## 幽灵依赖解决方案
    
    ### 1. 问题原因
    - 依赖树层级引用
    - 隐式依赖安装
    - 未声明直接使用
    - 包管理器差异
    
    ### 2. 解决方案
    - **严格依赖声明**：
      - 显式声明所有使用依赖
      - 使用lint工具检查
      
    - **包管理器选择**：
      - 使用pnpm（严格node_modules结构）
      - 使用Yarn PnP（消除node_modules）
      
    - **依赖锁定**：
      - 提交package-lock.json
      - 启用CI严格校验
      
    - **工具检测**：
      - depcheck扫描未使用依赖
      - npm ls查看依赖树`
      },
      {
        id: 334,
        title: "页面渲染全流程解析",
        tags: ["浏览器渲染", "网络", "性能优化"],
        difficulty: "中等",
        code: `// 性能追踪
    window.addEventListener('load', () => {
      const timing = performance.timing;
      console.log('DNS查询:', timing.domainLookupEnd - timing.domainLookupStart);
      console.log('TCP连接:', timing.connectEnd - timing.connectStart);
      console.log('请求响应:', timing.responseEnd - timing.requestStart);
      console.log('DOM解析:', timing.domComplete - timing.domInteractive);
    });
    
    // 关键渲染路径优化
    // 1. 内联关键CSS
    // 2. 异步加载非关键JS
    // 3. 预加载重要资源
    // 4. 使用CDN加速`,
        answer: `## 页面渲染全流程
    
    ### 1. 关键阶段
    1. **DNS解析**：域名转IP
    2. **TCP连接**：三次握手
    3. **HTTP请求**：发送请求
    4. **服务器处理**：生成响应
    5. **浏览器解析**：
       - 构建DOM树
       - 构建CSSOM树
       - 执行JavaScript
       - 生成渲染树
       - 布局与绘制
    
    ### 2. 优化策略
    - **网络层**：
      - DNS预取
      - TCP预连接
      - HTTP/2
      - CDN加速
      
    - **资源加载**：
      - 代码分割
      - 懒加载
      - 预加载
      
    - **渲染优化**：
      - 减少重排重绘
      - 使用CSS动画
      - 虚拟DOM
      - 服务端渲染`
      },
      {
        id: 335,
        title: "Koa与Express对比",
        tags: ["Node.js", "Koa", "Express"],
        difficulty: "中等",
        code: `// Express示例
    const express = require('express');
    const app = express();
    
    app.use((req, res, next) => {
      console.log('Middleware');
      next();
    });
    
    app.get('/', (req, res) => {
      res.send('Hello Express');
    });
    
    // Koa示例
    const Koa = require('koa');
    const app = new Koa();
    
    app.use(async (ctx, next) => {
      console.log('Middleware');
      await next();
    });
    
    app.use(ctx => {
      ctx.body = 'Hello Koa';
    });`,
        answer: `## Koa vs Express对比
    
    ### 1. 核心差异
    | 特性         | Express              | Koa                  |
    |--------------|----------------------|----------------------|
    | 中间件模型   | 回调函数             | async/await          |
    | 错误处理     | 集中式错误处理       | 链式错误捕获         |
    | 路由系统     | 内置路由             | 需第三方中间件       |
    | 体积         | 较大                 | 轻量                 |
    | 异步处理     | 回调方式             | 原生支持async/await  |
    
    ### 2. 中间件机制
    - **Express**：
      - 线性执行
      - 修改请求/响应对象
      - 手动调用next()
      
    - **Koa**：
      - 洋葱模型
      - 上下文对象封装
      - 自动返回Promise
    
    ### 3. 使用建议
    - **选择Express**：
      - 需要快速开发
      - 需要稳定成熟方案
      - 需要大量中间件支持
      
    - **选择Koa**：
      - 需要现代异步处理
      - 需要更灵活架构
      - 追求轻量级方案`
      },
      {
        id: 336,
        title: "Nginx配置实践",
        tags: ["Nginx", "服务器", "配置"],
        difficulty: "中等",
        code: `# 基本配置
    server {
        listen 80;
        server_name example.com;
        
        location / {
            root /var/www/html;
            index index.html;
        }
    }
    
    # 负载均衡配置
    upstream backend {
        server 10.0.0.1:3000;
        server 10.0.0.2:3000;
    }
    
    server {
        location / {
            proxy_pass http://backend;
        }
    }`,
        answer: `## Nginx核心配置
    
    ### 1. 主要功能
    - **静态资源服务**：
      - 高效文件服务
      - 缓存控制
      - Gzip压缩
      
    - **反向代理**：
      - 负载均衡
      - 请求转发
      - SSL终端
      
    - **安全防护**：
      - 限速限流
      - IP黑名单
      - 请求过滤
    
    ### 2. 常用配置
    - **负载均衡策略**：
      - 轮询（默认）
      - 加权轮询
      - IP哈希
      - 最少连接
      
    - **缓存配置**：
      - 代理缓存
      - 浏览器缓存
      - 缓存清除
      
    - **日志管理**：
      - 访问日志
      - 错误日志
      - 日志切割
    
    ### 3. 性能优化
    - 启用HTTP/2
    - 开启Gzip
    - 调整worker进程
    - 使用缓存头
    - 限制请求大小`
      },
      {
        id: 337,
        title: "Nginx代理与缓存配置",
        tags: ["Nginx", "代理", "缓存"],
        difficulty: "中等",
        code: `# 代理配置
    server {
        location /api/ {
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
    
    # 缓存配置
    proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m;
    
    server {
        location / {
            proxy_cache my_cache;
            proxy_cache_valid 200 302 10m;
            proxy_cache_valid 404      1m;
            add_header X-Cache-Status $upstream_cache_status;
        }
    }`,
        answer: `## Nginx代理与缓存优化
    
    ### 1. 代理配置要点
    - 请求头传递
    - 连接超时设置
    - 重试机制
    - 缓冲区配置
    - SSL配置
    
    ### 2. 缓存策略
    - **缓存层级**：
      - 内存缓存
      - 磁盘缓存
      - 多级缓存
      
    - **缓存控制**：
      - 根据状态码缓存
      - 根据请求方法缓存
      - 缓存键设计
      
    - **缓存失效**：
      - 时间过期
      - 主动清除
      - 条件请求
    
    ### 3. 安全配置
    - 限制并发连接
    - 设置速率限制
    - 隐藏版本信息
    - 配置WAF规则
    - 监控访问日志`
      },
      {
        id: 338,
        title: "反向代理实践指南",
        tags: ["代理", "Nginx", "服务架构"],
        difficulty: "中等",
        code: `# 反向代理配置
    server {
        listen 80;
        server_name api.example.com;
        
        location / {
            proxy_pass http://127.0.0.1:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
        }
    }
    
    # WebSocket代理
    map $http_upgrade $connection_upgrade {
        default upgrade;
        '' close;
    }
    
    server {
        location /ws/ {
            proxy_pass http://websocket_backend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection $connection_upgrade;
        }
    }`,
        answer: `## 反向代理核心应用
    
    ### 1. 主要优势
    - **安全性**：
      - 隐藏后端服务器
      - 统一安全策略
      - SSL终端
      
    - **扩展性**：
      - 水平扩展后端服务
      - 动态服务发现
      - 蓝绿部署
      
    - **性能优化**：
      - 负载均衡
      - 内容缓存
      - 压缩传输
    
    ### 2. 使用场景
    - 微服务网关
    - 静态资源加速
    - 协议转换
    - 访问控制
    - 服务聚合
    
    ### 3. 注意事项
    - 保持长连接
    - 处理WebSocket
    - 监控后端健康状态
    - 配置合理的超时
    - 日志收集分析`
      }
  ])
  export default topicList