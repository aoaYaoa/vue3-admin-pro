const questions310 = [
  {
    id: 301,
    title: "XMLHttpRequest对象详解",
    tags: ["AJAX", "XMLHttpRequest", "前端技术"],
    difficulty: "中等",
    code: `// 创建XHR对象
const xhr = new XMLHttpRequest();

// 配置请求
xhr.open('GET', '/api/data', true);

// 事件处理
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      console.log(JSON.parse(xhr.responseText));
    } else {
      console.error('请求失败:', xhr.status);
    }
  }
};

// 发送请求
xhr.send();

// 设置超时
xhr.timeout = 5000;
xhr.ontimeout = function() {
  console.error('请求超时');
};`,
    answer: `## XMLHttpRequest核心功能

### 1. 主要属性
- **readyState**：请求状态（0-4）
- **status**：HTTP状态码
- **responseType**：响应数据类型
- **timeout**：超时时间

### 2. 事件处理
- **onreadystatechange**：状态变化
- **onload**：请求成功
- **onerror**：请求失败
- **ontimeout**：超时处理

### 3. 方法
- **open(method, url, async)**：初始化请求
- **send(body)**：发送请求
- **abort()**：终止请求
- **setRequestHeader()**：设置请求头

### 4. 现代应用
- 文件上传进度监控
- 大文件分片上传
- 兼容旧版浏览器`
  },
  {
    id: 302,
    title: "封装AJAX请求方法",
    tags: ["AJAX", "前端技术", "代码实现"],
    difficulty: "中等",
    code: `function ajax(options) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(options.method || 'GET', options.url, true);
    
    // 设置请求头
    if (options.headers) {
      for (let key in options.headers) {
        xhr.setRequestHeader(key, options.headers[key]);
      }
    }

    // 超时处理
    xhr.timeout = options.timeout || 10000;
    xhr.ontimeout = () => reject('请求超时');

    // 响应处理
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = options.responseType 
            ? xhr.response 
            : JSON.parse(xhr.responseText);
          resolve(response);
        } catch (e) {
          reject('解析响应失败');
        }
      } else {
        reject(xhr.statusText);
      }
    };

    xhr.onerror = () => reject('网络错误');
    xhr.send(options.data);
  });
}

// 使用示例
ajax({
  url: '/api/data',
  method: 'POST',
  data: JSON.stringify({ key: 'value' }),
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 5000
}).then(console.log).catch(console.error);`,
    answer: `## AJAX封装要点

### 1. 功能特性
- 支持Promise API
- 自动处理响应数据
- 可配置请求头
- 超时处理
- 错误处理

### 2. 增强功能
- 请求取消
- 拦截器
- 进度监控
- 自动重试
- 并发控制

### 3. 兼容性处理
- 低版本IE ActiveXObject
- CORS兼容
- 响应数据类型处理
- 超时兼容

### 4. 安全考虑
- CSRF Token自动添加
- 请求签名
- 参数过滤
- HTTPS强制`
  },
  {
    id: 303,
    title: "Fetch API实践",
    tags: ["Fetch", "前端技术", "网络请求"],
    difficulty: "中等",
    code: `// 基本使用
fetch('/api/data')
  .then(response => {
    if (!response.ok) {
      throw new Error('网络响应异常');
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('请求失败:', error));

// 带配置的请求
fetch('/api/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token'
  },
  body: JSON.stringify({ key: 'value' }),
  credentials: 'include',
  mode: 'cors'
});`,
    answer: `## Fetch API详解

### 1. 核心优势
- 基于Promise
- 更简洁的API
- 内置CORS支持
- 流式数据处理

### 2. 配置选项
| 选项        | 说明                      |
|-------------|---------------------------|
| method      | 请求方法（默认GET）       |
| headers     | 请求头对象                |
| body        | 请求体数据                |
| mode        | 请求模式（cors/no-cors）  |
| credentials | 凭证携带（include/same-origin）|
| cache       | 缓存策略                  |
| redirect    | 重定向处理                |

### 3. 高级功能
- 中断请求（AbortController）
- 流式读取
- 请求克隆
- 进度监控

### 4. 注意事项
- 默认不携带Cookie
- 错误处理（需检查response.ok）
- 超时处理需要自行实现
- 浏览器兼容性`
  },
  {
    id: 304,
    title: "Fetch与XHR对比",
    tags: ["Fetch", "XMLHttpRequest", "比较"],
    difficulty: "中等",
    code: `// XHR进度监控
xhr.upload.onprogress = (e) => {
  const percent = (e.loaded / e.total) * 100;
  console.log(\`上传进度: \${percent}%\`);
};

// Fetch进度监控（使用ReadableStream）
fetch(url)
  .then(response => {
    const reader = response.body.getReader();
    const contentLength = +response.headers.get('Content-Length');

    let receivedLength = 0;
    const chunks = [];
    
    function process() {
      return reader.read().then(({ done, value }) => {
        if (done) {
          return chunks;
        }
        
        chunks.push(value);
        receivedLength += value.length;
        console.log(\`下载进度: \${(receivedLength / contentLength * 100).toFixed(1)}%\`);
        return process();
      });
    }
    
    return process();
  });`,
    answer: `## Fetch vs XMLHttpRequest

### 1. 主要区别
| 特性            | Fetch                     | XHR                  |
|-----------------|---------------------------|----------------------|
| API设计         | Promise-based            | 事件回调              |
| 流式处理        | 支持                      | 有限支持              |
| 请求取消        | AbortController           | abort()              |
| Cookie处理      | 默认不发送                | 同源自动发送          |
| 超时处理        | 需自行实现                | 内置timeout属性      |
| 进度监控        | 需使用Streams API         | 原生支持              |
| 浏览器支持      | 现代浏览器                | 全浏览器支持          |

### 2. 选择建议
- **使用Fetch**：
  - 需要现代功能（流处理）
  - 简洁的Promise API
  - 不需要进度监控
  
- **使用XHR**：
  - 需要上传进度
  - 兼容旧浏览器
  - 需要即时取消请求

### 3. 兼容方案
- 使用polyfill（whatwg-fetch）
- 封装统一接口
- 特性检测切换实现`
  },
  {
    id: 305,
    title: "预检请求原理分析",
    tags: ["HTTP", "OPTIONS", "预检请求"],
    difficulty: "中等",
    code: `// 复杂请求示例
fetch('https://api.example.com/data', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'X-Custom-Header': 'value'
  },
  body: JSON.stringify({ key: 'value' })
});

// 预检请求响应头示例
Access-Control-Allow-Origin: https://client.com
Access-Control-Allow-Methods: PUT, DELETE
Access-Control-Allow-Headers: X-Custom-Header
Access-Control-Max-Age: 86400`,
    answer: `## 预检请求机制解析

### 1. 触发条件
- 非简单请求：
  - 非GET/POST/HEAD方法
  - 自定义请求头
  - Content-Type非以下类型：
    - text/plain
    - application/x-www-form-urlencoded
    - multipart/form-data

### 2. 请求流程
1. 浏览器发送OPTIONS预检请求
2. 服务端返回CORS响应头
3. 浏览器验证通过后发送实际请求
4. 服务端返回实际响应

### 3. 优化建议
- 设置Access-Control-Max-Age缓存预检
- 合并多个预检请求
- 避免不必要的自定义头
- 使用简单请求优化性能

### 4. 安全考虑
- 严格校验Origin
- 限制允许的方法和头
- 敏感操作禁用CORS
- 监控异常OPTIONS请求`
  },
  {
    id: 306,
    title: "WebSocket实时通信",
    tags: ["WebSocket", "实时通信", "网络协议"],
    difficulty: "中等",
    code: `// WebSocket客户端
const socket = new WebSocket('wss://echo.websocket.org');

socket.onopen = () => {
  console.log('连接已建立');
  socket.send('Hello Server!');
};

socket.onmessage = (event) => {
  console.log('收到消息:', event.data);
};

socket.onclose = (event) => {
  console.log('连接关闭:', event.code, event.reason);
};

// 服务端示例（Node.js）
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('收到消息:', message);
    ws.send(\`服务器回复: \${message}\`);
  });
});`,
    answer: `## WebSocket核心特性

### 1. 协议特点
- 全双工通信
- 低延迟
- 基于TCP
- 持久化连接
- 支持二进制数据

### 2. 握手过程
1. 客户端发送HTTP Upgrade请求
2. 服务端响应101状态码
3. 连接升级为WebSocket协议

### 3. 使用场景
- 实时聊天应用
- 多人在线游戏
- 股票行情推送
- 协同编辑工具
- 物联网设备控制

### 4. 优化策略
- 心跳保活机制
- 消息压缩
- 断线重连
- 负载均衡
- 消息确认机制`
  },
  {
    id: 307,
    title: "WebSocket握手过程",
    tags: ["WebSocket", "握手过程", "网络协议"],
    difficulty: "中等",
    code: `// 客户端握手请求头
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13

// 服务端响应头
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=`,
    answer: `## WebSocket握手详解

### 1. 握手步骤
1. 客户端发送HTTP Upgrade请求
   - 必须包含Upgrade: websocket
   - Connection: Upgrade
   - Sec-WebSocket-Key（随机Base64）
   - Sec-WebSocket-Version（13）

2. 服务端响应101状态码
   - 计算Sec-WebSocket-Accept：
     - 拼接客户端Key与GUID
     - SHA1哈希后Base64编码
   - 返回Upgrade头

### 2. 安全验证
- 验证Origin头
- 限制协议版本
- 使用wss加密连接
- 身份验证（Token/Cookie）

### 3. 注意事项
- 必须从HTTP/HTTPS升级
- 保持与传统HTTP兼容
- 处理跨域问题
- 防止劫持攻击`
  },
  {
    id: 308,
    title: "WebSocket数据类型支持",
    tags: ["WebSocket", "数据类型", "网络通信"],
    difficulty: "中等",
    code: `// 发送文本数据
socket.send('Hello World');

// 发送二进制数据
const buffer = new ArrayBuffer(128);
const view = new Uint8Array(buffer);
for (let i = 0; i < view.length; i++) {
  view[i] = i;
}
socket.send(buffer);

// 发送Blob数据
const blob = new Blob(['Hello from blob'], { type: 'text/plain' });
socket.send(blob);

// 接收处理
socket.binaryType = 'arraybuffer'; // 或 'blob'
socket.onmessage = (event) => {
  if (event.data instanceof ArrayBuffer) {
    const view = new Uint8Array(event.data);
    // 处理二进制数据
  } else {
    console.log('文本消息:', event.data);
  }
};`,
    answer: `## WebSocket数据传输

### 1. 支持类型
- **文本数据**：
  - String
  - JSON字符串
  - XML数据

- **二进制数据**：
  - ArrayBuffer
  - Blob
  - TypedArray
  - DataView

### 2. 数据格式
| 类型       | 描述                  | 适用场景              |
|------------|-----------------------|-----------------------|
| 文本       | UTF-8编码字符串       | 聊天消息/JSON数据     |
| 二进制     | 原始字节数据          | 文件传输/音视频流     |

### 3. 优化技巧
- 使用二进制传输压缩数据
- 分片传输大文件
- 数据序列化（Protocol Buffers）
- 流量控制
- 错误重传机制`
  },
  {
    id: 309,
    title: "Server-Sent Events实践",
    tags: ["SSE", "服务器推送", "网络通信"],
    difficulty: "中等",
    code: `// 客户端实现
const eventSource = new EventSource('/sse');

eventSource.onmessage = (event) => {
  console.log('新消息:', event.data);
};

eventSource.onerror = (err) => {
  console.error('SSE错误:', err);
};

// 服务端实现（Node.js）
app.get('/sse', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  let id = 0;
  const timer = setInterval(() => {
    res.write(\`id: \${++id}\n\`);
    res.write(\`data: \${new Date().toISOString()}\n\n\`);
  }, 1000);

  req.on('close', () => clearInterval(timer));
});`,
    answer: `## Server-Sent Events详解

### 1. 协议特点
- 基于HTTP
- 服务器到客户端的单向通信
- 自动重连
- 内置事件类型
- 简单易用

### 2. 事件格式
\`\`\`
event: notification
id: 123
data: { "message": "Hello" }
retry: 5000

data: 多行数据
data: 第二行
\`\`\`

### 3. 使用场景
- 实时通知
- 新闻推送
- 股票价格更新
- 日志监控
- 进度报告

### 4. 注意事项
- 保持连接持久化
- 处理连接中断
- 限制并发连接数
- 身份验证
- 浏览器兼容性`
  },
  {
    id: 310,
    title: "SSE适用场景分析",
    tags: ["SSE", "服务器推送", "应用场景"],
    difficulty: "中等",
    code: `// 股票价格更新
eventSource.addEventListener('stock', (e) => {
  const data = JSON.parse(e.data);
  updateStockPrice(data.symbol, data.price);
});

// 新闻推送
eventSource.addEventListener('news', (e) => {
  showNewsBanner(JSON.parse(e.data));
});

// 服务端发送特定事件
res.write(\`event: stock\n\`);
res.write(\`data: \${JSON.stringify({symbol: 'AAPL', price: 150})\}\n\n\`);

res.write(\`event: news\n\`);
res.write(\`data: \${JSON.stringify({title: '重大新闻'})\}\n\n\`);`,
    answer: `## SSE最佳实践

### 1. 适用场景
- 需要服务器推送
- 数据更新频率较低
- 不需要双向通信
- 需要自动重连
- 简单消息通知

### 2. 优势
- 基于HTTP，无需新协议
- 自动处理连接管理
- 内置事件类型支持
- 轻量级实现
- 良好的浏览器支持

### 3. 限制
- 单向通信（服务器到客户端）
- 最大并发连接数限制（6个）
- 不支持二进制数据
- 旧版浏览器不支持

### 4. 性能优化
- 消息压缩
- 合理设置retry时间
- 使用事件分类型处理
- 连接池管理
- 心跳保持`
  },
  {
    id: 311,
    title: "SSE与WebSocket对比",
    tags: ["SSE", "WebSocket", "比较"],
    difficulty: "中等",
    code: `// SSE客户端
const sse = new EventSource('/updates');

// WebSocket客户端
const ws = new WebSocket('wss://example.com/ws');

// 双向通信示例（WebSocket）
ws.onopen = () => ws.send('ping');
ws.onmessage = (e) => {
  if (e.data === 'pong') {
    // 处理响应
  }
};`,
    answer: `## SSE vs WebSocket

### 1. 协议对比
| 特性          | SSE                      | WebSocket               |
|---------------|--------------------------|-------------------------|
| 协议基础      | HTTP                     | 独立协议                |
| 方向          | 单向（服务端到客户端）   | 双向                    |
| 数据格式      | 文本                     | 文本/二进制             |
| 自动重连      | 支持                     | 需手动实现              |
| 浏览器支持    | 除IE外的现代浏览器       | 现代浏览器              |
| 复杂度        | 简单                     | 较复杂                  |

### 2. 选择建议
- **使用SSE**：
  - 只需服务器推送
  - 基于现有HTTP架构
  - 需要自动重连
  - 简单通知场景
  
- **使用WebSocket**：
  - 需要双向通信
  - 传输二进制数据
  - 低延迟交互
  - 复杂实时应用

### 3. 混合方案
- 使用SSE接收通知
- 使用WebSocket进行双向交互
- 共享身份验证
- 统一连接管理`
  },
  {
    id: 312,
    title: "HTTP/2核心特性解析",
    tags: ["HTTP2", "网络协议", "性能优化"],
    difficulty: "中等",
    code: `// HTTP/2服务器配置（Node.js）
const http2 = require('http2');
const fs = require('fs');

const server = http2.createSecureServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
});

server.on('stream', (stream, headers) => {
  stream.respond({
    'content-type': 'text/html',
    ':status': 200
  });
  stream.end('<h1>Hello HTTP/2</h1>');
});

server.listen(443);

// 客户端使用
const client = http2.connect('https://localhost:443');
const req = client.request({ ':path': '/' });
req.on('response', (headers) => {
  console.log(headers[':status']);
});
req.setEncoding('utf8');
req.on('data', (chunk) => console.log(chunk));`,
    answer: `## HTTP/2核心改进

### 1. 主要特性
- **二进制分帧**：提升解析效率
- **多路复用**：并行请求响应
- **头部压缩**：HPACK算法
- **服务器推送**：主动推送资源
- **流优先级**：优化资源加载

### 2. 性能优化
- 消除队头阻塞
- 减少TCP连接数
- 减少冗余头信息
- 智能资源推送
- 更好的带宽利用率

### 3. 升级建议
- 必须使用HTTPS
- 优化资源加载顺序
- 利用服务器推送
- 保持HTTP/1.1兼容
- 监控HTTP/2使用

### 4. 注意事项
- 旧设备兼容问题
- 代理服务器支持
- 正确配置TLS
- 避免不必要的推送
- 流控制管理`
  }
];

export default questions310;