const questions300 = [
  {
    id: 291,
    title: "TCP四次挥手过程解析",
    tags: ["TCP", "连接终止", "网络协议"],
    difficulty: "中等",
    code: `// TCP四次挥手伪代码
function fourWayHandshake() {
  // 主动关闭方发送FIN
  client.send(FIN=1, seq=u);

  // 被动关闭方响应ACK
  server.send(ACK=1, seq=v, ack=u+1);

  // 被动关闭方发送FIN
  server.send(FIN=1, ACK=1, seq=w, ack=u+1);

  // 主动关闭方确认ACK
  client.send(ACK=1, seq=u+1, ack=w+1);

  // 连接完全关闭
  connection.closed = true;
}`,
    answer: `## TCP四次挥手详解

### 1. 挥手过程
1. **FIN**（主动方 -> 被动方）：
   - 发送FIN报文，进入FIN_WAIT_1状态
   - 序列号为已发送数据的最后一个字节+1

2. **ACK**（被动方 -> 主动方）：
   - 确认收到FIN，发送ACK
   - 进入CLOSE_WAIT状态
   - 主动方进入FIN_WAIT_2

3. **FIN**（被动方 -> 主动方）：
   - 被动方处理完数据后发送FIN
   - 进入LAST_ACK状态

4. **ACK**（主动方 -> 被动方）：
   - 主动方发送最终ACK
   - 进入TIME_WAIT状态（2MSL等待）
   - 被动方关闭连接

### 2. 关键状态
- **TIME_WAIT**：确保最后一个ACK到达
- **CLOSE_WAIT**：等待应用层关闭
- **LAST_ACK**：等待最终确认

### 3. 异常处理
- 丢失ACK的重传机制
- 处理半关闭状态
- 应对网络延迟的MSL时间
- 大量TIME_WAIT的优化`
  },
  {
    id: 292,
    title: "TCP拥塞控制机制",
    tags: ["TCP", "拥塞控制", "流量控制"],
    difficulty: "困难",
    code: `// 拥塞控制算法示例
class TCPCongestionControl {
  constructor() {
    this.cwnd = 1; // 拥塞窗口
    this.ssthresh = 16; // 慢启动阈值
    this.dupAckCount = 0;
  }

  onAckReceived() {
    if (this.cwnd < this.ssthresh) {
      // 慢启动阶段
      this.cwnd *= 2;
    } else {
      // 拥塞避免阶段
      this.cwnd += 1;
    }
  }

  onPacketLoss() {
    this.ssthresh = Math.max(this.cwnd / 2, 2);
    this.cwnd = 1;
    this.dupAckCount = 0;
  }

  onFastRetransmit() {
    this.ssthresh = Math.max(this.cwnd / 2, 2);
    this.cwnd = this.ssthresh + 3;
    this.dupAckCount = 0;
  }
}`,
    answer: `## TCP拥塞控制机制

### 1. 核心算法
- **慢启动（Slow Start）**：
  - 指数增长拥塞窗口
  - 初始cwnd=1 MSS
  - 达到ssthresh后进入拥塞避免

- **拥塞避免（Congestion Avoidance）**：
  - 线性增长拥塞窗口
  - 每个RTT增加1 MSS

- **快速重传（Fast Retransmit）**：
  - 收到3个重复ACK立即重传
  - 避免等待超时

- **快速恢复（Fast Recovery）**：
  - 调整ssthresh为当前cwnd一半
  - cwnd = ssthresh + 3

### 2. 现代改进
- **TCP Reno**：改进快速恢复
- **TCP Cubic**：适应高带宽延迟积
- **BBR**：基于瓶颈带宽和RTT

### 3. 参数调优
- 初始窗口大小
- 最大窗口限制
- RTT测量方法
- 丢包检测阈值`
  },
  {
    id: 293,
    title: "跨域问题解决方案",
    tags: ["跨域", "CORS", "同源策略"],
    difficulty: "中等",
    code: `// CORS配置示例（Node.js）
const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://client.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// JSONP示例
app.get('/api/jsonp', (req, res) => {
  const callback = req.query.callback;
  const data = { result: 'success' };
  res.send(\`\${callback}(\${JSON.stringify(data)})\`);
});`,
    answer: `## 跨域解决方案大全

### 1. 常见方案
- **CORS**：
  - 服务端设置响应头
  - 处理预检请求（OPTIONS）
  - 支持凭证（credentials）

- **JSONP**：
  - 利用<script>标签跨域
  - 仅支持GET请求
  - 需要服务端配合

- **代理服务器**：
  - 同源服务器转发请求
  - Nginx反向代理
  - 开发环境代理

- **WebSocket**：
  - 不受同源策略限制
  - 双向通信协议

### 2. CORS配置详解
| 响应头                      | 说明                          |
|----------------------------|-------------------------------|
| Access-Control-Allow-Origin | 允许的源（* 或具体域名）       |
| Access-Control-Allow-Methods | 允许的HTTP方法               |
| Access-Control-Allow-Headers | 允许的请求头                 |
| Access-Control-Max-Age     | 预检请求缓存时间              |
| Access-Control-Expose-Headers | 暴露给客户端的响应头         |

### 3. 安全注意事项
- 严格限制允许的源
- 避免使用通配符*
- 处理OPTIONS预检请求
- 合理设置缓存时间
- 敏感接口禁用CORS`
  },
  {
    id: 294,
    title: "同源策略限制行为解析",
    tags: ["同源策略", "安全", "浏览器"],
    difficulty: "中等",
    code: `// 同源检测示例
function isSameOrigin(url) {
  const a = document.createElement('a');
  a.href = url;
  
  return a.protocol === location.protocol &&
         a.hostname === location.hostname &&
         a.port === location.port;
}

// 跨域请求错误示例
fetch('https://other-domain.com/api')
  .catch(err => console.error('跨域请求被阻止:', err));`,
    answer: `## 同源策略限制行为

### 1. 同源定义
- 协议相同（http/https）
- 域名相同（www.example.com）
- 端口相同（80/443）

### 2. 受限操作
- **DOM访问**：
  - 不同源的iframe内容
  - window.open打开的窗口

- **网络请求**：
  - XMLHttpRequest/fetch跨域
  - Web字体加载
  - Web Workers脚本

- **存储访问**：
  - Cookies/LocalStorage
  - IndexedDB数据库

- **其他**：
  - Canvas图像污染
  - WebSocket连接（非完全限制）

### 3. 例外情况
- <script>标签加载脚本
- <img>标签加载图片
- <link>标签加载CSS
- <form>提交
- 部分新API（CORS启用时）`
  },
  {
    id: 295,
    title: "浏览器请求处理流程",
    tags: ["浏览器", "HTTP", "网络请求"],
    difficulty: "中等",
    code: `// 使用Performance API监控请求
const [navigationEntry] = performance.getEntriesByType('navigation');
console.log('请求时间分解:', {
  DNS查询: navigationEntry.domainLookupEnd - navigationEntry.domainLookupStart,
  TCP连接: navigationEntry.connectEnd - navigationEntry.connectStart,
  SSL握手: navigationEntry.connectEnd - navigationEntry.secureConnectionStart,
 请求发送: navigationEntry.responseStart - navigationEntry.requestStart,
 响应接收: navigationEntry.responseEnd - navigationEntry.responseStart
});`,
    answer: `## 浏览器请求处理流程

### 1. 完整流程
1. **解析URL**：
   - 分解协议/域名/路径
   - 处理特殊字符编码

2. **DNS查询**：
   - 浏览器缓存 -> 系统缓存 -> 路由器缓存
   - 递归查询DNS服务器

3. **建立TCP连接**：
   - 三次握手
   - TLS握手（HTTPS）

4. **发送HTTP请求**：
   - 构造请求头/体
   - 处理Cookie等凭证

5. **接收响应**：
   - 解析状态码
   - 处理重定向
   - 接收分块数据

6. **渲染处理**：
   - 解析HTML/CSS/JS
   - 加载子资源
   - 执行JavaScript

### 2. 优化建议
- DNS预解析（dns-prefetch）
- TCP预连接（preconnect）
- 资源预加载（preload）
- 服务端启用HTTP/2
- 合理使用缓存策略`
  },
  {
    id: 296,
    title: "XSS攻击与防御",
    tags: ["网络安全", "XSS", "Web攻击"],
    difficulty: "中等",
    code: `// XSS防御示例
function sanitize(input) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  };
  return input.replace(/[&<>"'/]/g, m => map[m]);
}

// CSP设置
res.setHeader('Content-Security-Policy', 
  "default-src 'self'; script-src 'self' https://trusted.cdn.com");
`,
    answer: `## XSS攻击全解析

### 1. 攻击类型
- **存储型XSS**：
  - 恶意脚本存储到数据库
  - 影响所有访问用户

- **反射型XSS**：
  - 恶意脚本通过URL参数注入
  - 需要诱导用户点击

- **DOM型XSS**：
  - 客户端脚本直接操作DOM
  - 不经过服务端

### 2. 防御措施
- **输入过滤**：
  - 转义特殊字符
  - 使用白名单验证

- **输出编码**：
  - HTML实体编码
  - JavaScript编码
  - URL编码

- **安全头设置**：
  - Content-Security-Policy（CSP）
  - X-XSS-Protection
  - HttpOnly Cookie

- **框架防护**：
  - React自动转义
  - Vue的v-html指令限制
  - 使用textContent代替innerHTML`
  },
  {
    id: 297,
    title: "SQL注入防御方案",
    tags: ["网络安全", "SQL注入", "数据库安全"],
    difficulty: "中等",
    code: `// 参数化查询示例（Node.js）
const sql = 'SELECT * FROM users WHERE id = ?';
db.query(sql, [userId], (err, results) => {
  // 处理结果
});

// ORM防护示例（使用Sequelize）
const users = await User.findAll({
  where: {
    id: req.params.id
  }
});`,
    answer: `## SQL注入攻防详解

### 1. 攻击原理
- 通过用户输入注入恶意SQL
- 绕过认证
- 窃取/篡改数据
- 执行管理操作

### 2. 防御策略
- **参数化查询**：
  - 使用预编译语句
  - 分离SQL逻辑与数据

- **输入验证**：
  - 白名单过滤
  - 类型检查
  - 长度限制

- **最小权限原则**：
  - 数据库账户限制权限
  - 禁用敏感操作

- **其他措施**：
  - 使用ORM框架
  - 定期安全审计
  - 错误信息处理
  - Web应用防火墙（WAF）`
  },
  {
    id: 298,
    title: "DDoS攻击防护",
    tags: ["网络安全", "DDoS", "拒绝服务攻击"],
    difficulty: "中等",
    code: `// 限流配置示例（Express）
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100 // 每个IP限制100次请求
});
app.use(limiter);

// 云防护配置示例
// 使用Cloudflare等CDN服务
// 配置防火墙规则：
// 阻止特定国家IP
// 过滤异常User-Agent
// 启用挑战验证（CAPTCHA）`,
    answer: `## DDoS攻击防护方案

### 1. 攻击类型
- **流量型攻击**：
  - SYN Flood
  - UDP Flood
  - ICMP Flood

- **应用层攻击**：
  - HTTP Flood
  - Slowloris
  - CC攻击

- **反射放大攻击**：
  - DNS反射
  - NTP放大
  - Memcached攻击

### 2. 防御措施
- **基础设施防护**：
  - 增加带宽冗余
  - 使用Anycast网络
  - 部署清洗中心

- **技术防护**：
  - 限速和限流
  - IP黑名单
  - SYN Cookie
  - 协议验证

- **云防护服务**：
  - AWS Shield
  - Cloudflare防护
  - Akamai Prolexic

### 3. 应急响应
- 实时监控流量
- 快速识别攻击模式
- 切换流量到清洗中心
- 与ISP协同防御`
  },
  {
    id: 299,
    title: "CSRF攻击与防御",
    tags: ["网络安全", "CSRF", "Web攻击"],
    difficulty: "中等",
    code: `// CSRF Token实现
const csrf = require('csurf');
app.use(csrf());

// 中间件设置Token
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

// 表单验证
<form action="/transfer" method="POST">
  <input type="hidden" name="_csrf" value="<%= csrfToken %>">
  <!-- 其他表单字段 -->
</form>`,
    answer: `## CSRF攻击防护指南

### 1. 攻击原理
- 利用用户已认证状态
- 诱导用户访问恶意页面
- 伪造请求执行敏感操作

### 2. 防御措施
- **CSRF Token**：
  - 服务端生成随机Token
  - 包含在表单和Cookie中
  - 验证Token一致性

- **SameSite Cookie**：
  - 设置SameSite=Strict/Lax
  - 限制跨站Cookie发送

- **验证请求来源**：
  - 检查Origin头
  - 验证Referer头

- **二次验证**：
  - 敏感操作需要重新认证
  - 使用验证码

### 3. 框架支持
- Express的csurf中间件
- Django内置CSRF防护
- Spring Security配置
- Laravel的CSRF令牌`
  },
  {
    id: 300,
    title: "Ajax技术解析",
    tags: ["AJAX", "前端技术", "异步通信"],
    difficulty: "简单",
    code: `// 原生XMLHttpRequest示例
const xhr = new XMLHttpRequest();
xhr.open('GET', '/api/data');
xhr.onload = function() {
  if (xhr.status === 200) {
    console.log(xhr.responseText);
  }
};
xhr.send();

// Fetch API示例
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`,
    answer: `## Ajax技术详解

### 1. 核心概念
- **Asynchronous**：异步通信
- **JavaScript**：客户端脚本
- **XML/JSON**：数据格式

### 2. 技术演进
- **XMLHttpRequest**：
  - 原始Ajax实现
  - 支持各种HTTP方法
  - 事件驱动模型

- **Fetch API**：
  - 基于Promise
  - 更简洁的语法
  - 默认不携带Cookie

- **Axios**：
  - 支持浏览器/Node.js
  - 自动转换JSON
  - 请求/响应拦截

### 3. 优缺点
| 优点                  | 缺点                  |
|-----------------------|-----------------------|
| 无刷新更新页面        | SEO不友好             |
| 异步提升用户体验      | 历史记录管理复杂      |
| 减少服务器负载        | 跨域问题              |
| 支持多种数据格式      | 错误处理较复杂        |

### 4. 现代应用
- 单页应用（SPA）
- 无限滚动加载
- 实时搜索建议
- 表单异步验证`
  }
];

export default questions300;