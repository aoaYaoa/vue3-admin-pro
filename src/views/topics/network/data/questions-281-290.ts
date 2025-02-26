const questions290 = [
  {
    id: 281,
    title: "HTTP状态码详解",
    tags: ["HTTP", "状态码", "网络协议"],
    difficulty: "中等",
    code: `// 常见状态码示例
fetch('/api/data')
  .then(response => {
    if (response.status === 200) {
      return response.json();
    } else if (response.status === 404) {
      throw new Error('资源未找到');
    } else if (response.status === 500) {
      throw new Error('服务器内部错误');
    }
  });

// 自定义错误处理中间件
app.use((err, req, res, next) => {
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});`,
    answer: `## HTTP状态码分类

### 1. 信息响应（100-199）
- 100 Continue：继续发送请求体
- 101 Switching Protocols：切换协议

### 2. 成功响应（200-299）
- 200 OK：请求成功
- 201 Created：资源已创建
- 204 No Content：无返回内容

### 3. 重定向（300-399）
- 301 Moved Permanently：永久重定向
- 302 Found：临时重定向
- 304 Not Modified：使用缓存

### 4. 客户端错误（400-499）
- 400 Bad Request：错误请求
- 401 Unauthorized：未认证
- 403 Forbidden：无权限
- 404 Not Found：资源不存在

### 5. 服务端错误（500-599）
- 500 Internal Server Error：服务器内部错误
- 502 Bad Gateway：网关错误
- 503 Service Unavailable：服务不可用

### 6. 最佳实践
- 正确使用语义化状态码
- 自定义错误信息
- 保持错误响应格式统一
- 记录错误日志`
  },
  {
    id: 282,
    title: "重定向状态码对比",
    tags: ["HTTP", "重定向", "状态码"],
    difficulty: "中等",
    code: `// 301重定向设置
res.writeHead(301, {
  'Location': '/new-url'
});

// 302重定向设置
res.writeHead(302, {
  'Location': '/temporary-url'
});

// 307临时重定向
res.writeHead(307, {
  'Location': '/temp-redirect'
});`,
    answer: `## 重定向状态码解析

### 1. 主要区别
| 状态码 | 类型       | 方法保持 | 缓存行为       | 使用场景               |
|--------|------------|----------|----------------|------------------------|
| 301    | 永久重定向 | 可能改变 | 可缓存         | 网站改版/域名更换      |
| 302    | 临时重定向 | 可能改变 | 通常不缓存     | 临时维护页面           |
| 307    | 临时重定向 | 保持原样 | 不缓存         | 需要保持请求方法的重定向 |
| 308    | 永久重定向 | 保持原样 | 可缓存         | 严格保持方法的永久重定向 |

### 2. 注意事项
- 避免重定向链（超过5次）
- 使用绝对URL
- 考虑SEO影响
- 测试不同浏览器的行为
- 监控重定向性能

### 3. 现代应用
- 单页应用路由重定向
- OAuth认证流程
- 多语言网站跳转
- 移动端适配跳转`
  },
  {
    id: 283,
    title: "权限相关状态码解析",
    tags: ["HTTP", "状态码", "权限"],
    difficulty: "中等",
    code: `// 401处理示例
app.get('/protected', (req, res) => {
  if (!req.headers.authorization) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
    return res.status(401).send('需要认证');
  }
  // 验证逻辑...
});

// 403处理示例
app.delete('/admin/data', (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({
      error: 'Forbidden',
      message: '需要管理员权限'
    });
  }
  // 删除逻辑...
});`,
    answer: `## 权限状态码对比

### 1. 核心区别
- **400 Bad Request**：
  - 客户端请求错误
  - 格式错误/参数缺失
  - 服务器无法处理

- **401 Unauthorized**：
  - 需要身份验证
  - 未提供有效凭证
  - 必须包含WWW-Authenticate头

- **403 Forbidden**：
  - 拒绝执行请求
  - 已认证但权限不足
  - 不需要提供认证方式

### 2. 使用场景
- **400**：
  - 请求体格式错误
  - 缺少必要参数
  - 参数类型错误

- **401**：
  - 未登录访问受保护资源
  - Token过期
  - 凭证无效

- **403**：
  - 普通用户访问管理员接口
  - IP黑名单
  - 访问时间限制

### 3. 安全建议
- 401响应包含认证方式
- 403不暴露敏感信息
- 记录未授权访问尝试
- 合理使用速率限制`
  },
  {
    id: 284,
    title: "HTTP与HTTPS对比",
    tags: ["HTTP", "HTTPS", "安全"],
    difficulty: "简单",
    code: `// 创建HTTPS服务器
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
};

https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('Hello HTTPS!');
}).listen(443);`,
    answer: `## HTTP与HTTPS核心区别

### 1. 基本差异
| 特性         | HTTP              | HTTPS                 |
|--------------|-------------------|-----------------------|
| 协议         | 应用层            | 传输层（SSL/TLS）     |
| 端口         | 80               | 443                   |
| 加密         | 明文传输          | 加密传输              |
| 证书         | 不需要            | 需要CA证书            |
| 握手         | TCP三次握手       | TLS握手               |
| 性能         | 更快              | 略慢（现代优化后差异小）|

### 2. HTTPS优势
- 数据加密防窃听
- 身份验证防冒充
- 数据完整性防篡改
- SEO排名提升
- 符合现代安全标准

### 3. 实施要点
- 使用Let's Encrypt免费证书
- 启用HTTP/2提升性能
- 配置HSTS强制HTTPS
- 定期更新SSL/TLS协议
- 监控证书有效期`
  },
  {
    id: 285,
    title: "HTTPS加密过程详解",
    tags: ["HTTPS", "加密", "SSL/TLS"],
    difficulty: "困难",
    code: `// TLS握手过程伪代码
function tlsHandshake() {
  // 客户端发送ClientHello
  const clientHello = {
    cipherSuites: ['TLS_AES_128_GCM_SHA256'],
    random: generateRandom(),
    extensions: [/*...*/]
  };

  // 服务端响应ServerHello
  const serverHello = {
    selectedCipher: 'TLS_AES_128_GCM_SHA256',
    random: generateRandom(),
    certificate: serverCert
  };

  // 密钥交换
  const preMasterSecret = generateKey();
  const encryptedKey = encryptWithPublicKey(preMasterSecret, serverPublicKey);

  // 生成会话密钥
  const masterSecret = deriveKeys(preMasterSecret, clientRandom, serverRandom);

  // 完成握手
  verifyHandshake(masterSecret);
}`,
    answer: `## HTTPS加密过程解析

### 1. TLS握手流程
1. **Client Hello**：
   - 支持的协议版本
   - 加密套件列表
   - 客户端随机数

2. **Server Hello**：
   - 选择的协议版本
   - 选择的加密套件
   - 服务器随机数
   - 服务器证书

3. **密钥交换**：
   - 客户端验证证书
   - 生成预主密钥
   - 使用服务器公钥加密传输

4. **生成会话密钥**：
   - 客户端随机数 + 服务器随机数 + 预主密钥
   - 通过PRF函数生成主密钥

5. **完成握手**：
   - 双方验证握手消息
   - 切换加密通信

### 2. 加密技术
- **对称加密**：AES-GCM（数据传输）
- **非对称加密**：RSA/ECC（密钥交换）
- **哈希算法**：SHA-256（完整性校验）
- **数字证书**：X.509标准

### 3. 性能优化
- 会话恢复（Session ID/Tickets）
- OCSP Stapling
- 启用TLS 1.3
- 使用ECDHE密钥交换
- 优化证书链`
  },
  {
    id: 286,
    title: "Cookie的作用与实现",
    tags: ["Cookie", "HTTP", "状态管理"],
    difficulty: "简单",
    code: `// 设置Cookie
res.setHeader('Set-Cookie', [
  'sessionId=abc123; Max-Age=3600; Secure; HttpOnly',
  'theme=dark; SameSite=Lax'
]);

// 读取Cookie
const cookies = req.headers.cookie.split(';').reduce((acc, cookie) => {
  const [name, value] = cookie.trim().split('=');
  acc[name] = decodeURIComponent(value);
  return acc;
}, {});`,
    answer: `## Cookie机制详解

### 1. 核心作用
- 会话状态管理
- 个性化设置存储
- 用户行为跟踪
- 跨请求保持状态

### 2. 重要属性
| 属性       | 作用                          | 示例                      |
|------------|-------------------------------|---------------------------|
| Expires    | 过期时间（绝对）              | Expires=Wed, 21 Oct 2022 07:28:00 GMT |
| Max-Age    | 存活时间（秒）                | Max-Age=3600              |
| Secure     | 仅HTTPS传输                   | Secure                    |
| HttpOnly   | 禁止JavaScript访问            | HttpOnly                  |
| SameSite   | 跨站请求限制                  | SameSite=Strict           |
| Domain     | 作用域名                      | Domain=.example.com       |
| Path       | 作用路径                      | Path=/api                 |

### 3. 安全实践
- 敏感Cookie设置HttpOnly和Secure
- 使用SameSite防止CSRF
- 限制Cookie作用域
- 定期轮换会话ID
- 监控异常Cookie使用`
  },
  {
    id: 287,
    title: "Cookie与Session对比",
    tags: ["Cookie", "Session", "状态管理"],
    difficulty: "中等",
    code: `// Session存储示例
const session = require('express-session');
app.use(session({
  secret: 'my-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

// 使用Session
app.post('/login', (req, res) => {
  req.session.user = { id: 123, name: 'John' };
  res.send('登录成功');
});`,
    answer: `## Cookie vs Session

### 1. 存储位置
|          | Cookie                      | Session                     |
|----------|-----------------------------|-----------------------------|
| 客户端   | 浏览器                      | 服务器（内存/数据库）       |
| 安全性   | 较低（可被篡改）            | 较高（仅存Session ID）     |
| 存储大小 | 有限（4KB左右）             | 理论上无限制                |
| 性能影响 | 每次请求自动携带            | 需要服务器存储/查询         |

### 2. 工作流程
1. 客户端首次请求
2. 服务器创建Session并返回Session ID
3. 客户端存储Session ID在Cookie
4. 后续请求携带Session ID
5. 服务器验证Session ID有效性

### 3. 使用建议
- **使用Cookie**：
  - 非敏感数据（主题偏好）
  - 客户端状态保持
  - 跟踪用户行为
  
- **使用Session**：
  - 用户认证信息
  - 敏感数据存储
  - 需要服务端控制的状态

### 4. 安全增强
- 定期更换Session ID
- 绑定用户IP/User-Agent
- 设置合理过期时间
- 使用签名Cookie`
  },
  {
    id: 288,
    title: "TCP协议特性解析",
    tags: ["TCP", "网络协议", "传输层"],
    difficulty: "中等",
    code: `// TCP服务端示例
const net = require('net');
const server = net.createServer(socket => {
  socket.on('data', data => {
    console.log('Received:', data.toString());
    socket.write('Message received');
  });
});

server.listen(3000, () => {
  console.log('TCP server listening on port 3000');
});`,
    answer: `## TCP核心特性

### 1. 主要特点
- **面向连接**：三次握手建立连接
- **可靠传输**：确认机制/重传机制
- **流量控制**：滑动窗口协议
- **拥塞控制**：慢启动/拥塞避免
- **有序传输**：数据包按序到达
- **全双工通信**：双向数据流

### 2. 报文结构
| 字段           | 长度（位） | 说明                     |
|----------------|------------|--------------------------|
| 源端口         | 16         | 发送方端口号             |
| 目的端口       | 16         | 接收方端口号             |
| 序列号         | 32         | 数据包顺序标识           |
| 确认号         | 32         | 期望收到的下一个序列号   |
| 数据偏移       | 4          | 头部长度                 |
| 控制标志       | 6          | URG/ACK/PSH/RST/SYN/FIN |
| 窗口大小       | 16         | 接收窗口大小             |
| 校验和         | 16         | 头部和数据校验           |
| 紧急指针       | 16         | 紧急数据位置             |

### 3. 应用场景
- 文件传输（FTP）
- 网页浏览（HTTP）
- 电子邮件（SMTP/POP3）
- 数据库连接`
  },
  {
    id: 289,
    title: "TCP三次握手过程",
    tags: ["TCP", "连接建立", "网络协议"],
    difficulty: "中等",
    code: `// 三次握手过程伪代码
function threeWayHandshake() {
  // 客户端发送SYN
  client.send(SYN=1, seq=x);

  // 服务端响应SYN-ACK
  server.send(SYN=1, ACK=1, seq=y, ack=x+1);

  // 客户端确认ACK
  client.send(ACK=1, seq=x+1, ack=y+1);

  // 连接建立成功
  connection.established = true;
}`,
    answer: `## TCP三次握手详解

### 1. 握手过程
1. **SYN**（客户端 -> 服务端）：
   - 客户端随机生成初始序列号x
   - 设置SYN=1，ACK=0
   - 进入SYN_SENT状态

2. **SYN-ACK**（服务端 -> 客户端）：
   - 服务端随机生成初始序列号y
   - 确认号ack=x+1
   - 设置SYN=1，ACK=1
   - 进入SYN_RCVD状态

3. **ACK**（客户端 -> 服务端）：
   - 确认号ack=y+1
   - 设置ACK=1
   - 双方进入ESTABLISHED状态

### 2. 设计目的
- 确认双方收发能力正常
- 协商初始序列号
- 防止历史连接干扰
- 确保连接双向可靠

### 3. 常见问题
- SYN Flood攻击防护
- 握手超时重传机制
- 序列号随机化安全
- 握手过程状态监控`
  },
  {
    id: 290,
    title: "TCP二次握手问题分析",
    tags: ["TCP", "连接建立", "网络安全"],
    difficulty: "中等",
    code: `// 二次握手可能的问题
function twoWayHandshake() {
  // 客户端发送SYN
  client.send(SYN=1, seq=x);

  // 服务端直接确认
  server.send(ACK=1, seq=y, ack=x+1);

  // 潜在问题：
  // - 无法确认客户端接收能力
  // - 可能接受历史连接
  // - 序列号同步问题
}`,
    answer: `## 二次握手问题分析

### 1. 主要问题
- **无法确认客户端接收能力**：
  - 服务端无法知道客户端是否能收到ACK
  - 可能导致半开连接

- **历史连接问题**：
  - 延迟的SYN包可能被误认为新连接
  - 造成资源浪费

- **序列号同步问题**：
  - 客户端无法确认服务端初始序列号
  - 可能导致数据混乱

- **资源浪费**：
  - 服务端提前分配资源
  - 可能遭受SYN Flood攻击

### 2. 安全风险
- 连接劫持风险增加
- 更容易遭受DoS攻击
- 数据完整性无法保证
- 无法可靠检测网络状况

### 3. 为什么需要三次
- 确保双向通信可靠
- 防止过期连接请求
- 同步双方序列号
- 建立明确的连接状态`
  }
];

export default questions290;