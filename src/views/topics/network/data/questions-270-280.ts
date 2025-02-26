const questions280 = [
  {
    id: 276,
    title: "HTTP请求方法详解",
    tags: ["HTTP", "网络协议", "基础"],
    difficulty: "简单",
    code: `// 使用fetch发送不同HTTP请求
// GET请求
fetch('/api/data', {
  method: 'GET'
})

// POST请求
fetch('/api/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ key: 'value' })
})

// PUT请求
fetch('/api/data/1', {
  method: 'PUT',
  body: JSON.stringify({ key: 'new-value' })
})

// DELETE请求
fetch('/api/data/1', {
  method: 'DELETE'
})`,
    answer: `## HTTP请求方法解析

### 1. 核心方法
- **GET**：获取资源（安全/幂等）
- **POST**：创建新资源
- **PUT**：完整更新资源（幂等）
- **DELETE**：删除资源（幂等）
- **PATCH**：部分更新资源
- **HEAD**：获取响应头
- **OPTIONS**：查询服务器支持方法

### 2. 安全性与幂等性
| 方法    | 安全   | 幂等   |
|---------|--------|--------|
| GET     | ✔️     | ✔️     |
| POST    | ❌     | ❌     |
| PUT     | ❌     | ✔️     |
| DELETE  | ❌     | ✔️     |

### 3. 使用场景
- **GET**：获取数据（搜索/分页）
- **POST**：提交表单/上传文件
- **PUT**：替换整个资源
- **PATCH**：更新部分字段
- **DELETE**：删除指定资源

### 4. 最佳实践
- 遵循RESTful规范
- 合理使用状态码
- 保持方法语义明确
- 注意请求大小限制`
  },
  {
    id: 277,
    title: "GET与POST方法对比",
    tags: ["HTTP", "请求方法", "网络协议"],
    difficulty: "简单",
    code: `// GET请求示例
const params = new URLSearchParams({ q: 'searchTerm' });
fetch(\`/api/search?\${params}\`);

// POST请求示例
fetch('/api/submit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: 'username=admin&password=123456'
})`,
    answer: `## GET与POST核心区别

### 1. 基本差异
| 特性         | GET                  | POST                 |
|--------------|----------------------|----------------------|
| 数据位置     | URL查询参数          | 请求体               |
| 数据大小     | 受URL长度限制        | 理论上无限制         |
| 可见性       | 明文显示在URL        | 不可见               |
| 缓存         | 可缓存               | 不可缓存             |
| 历史记录     | 保留在浏览器历史     | 不保留               |
| 安全性       | 不适合敏感数据       | 相对更安全           |

### 2. 技术实现
- **GET**：
  - 数据通过URL编码传输
  - 只能使用ASCII字符
  - 参数保留在服务器日志
  
- **POST**：
  - 支持多种编码类型
  - 可传输二进制数据
  - 支持分块传输

### 3. 使用建议
- **使用GET**：
  - 获取数据
  - 无副作用操作
  - 可收藏的链接
  
- **使用POST**：
  - 提交敏感数据
  - 大数据量传输
  - 有副作用的操作`
  },
  {
    id: 278,
    title: "RESTful API设计规范",
    tags: ["REST", "API设计", "网络架构"],
    difficulty: "中等",
    code: `// RESTful API示例
// 获取资源列表
GET /api/users

// 获取单个资源
GET /api/users/1

// 创建资源
POST /api/users
Body: { "name": "John", "email": "john@example.com" }

// 更新资源
PUT /api/users/1
Body: { "name": "John Doe" }

// 删除资源
DELETE /api/users/1`,
    answer: `## RESTful设计原则

### 1. 核心约束
- **统一接口**：标准化的资源操作
- **无状态**：每个请求包含完整上下文
- **可缓存**：明确缓存策略
- **分层系统**：客户端无需知道是否直接连接服务器
- **按需代码**（可选）：可下载执行代码扩展功能

### 2. 资源设计
- 使用名词复数形式
- 层级关系表达：/resources/:id/sub-resources
- 版本控制：/v1/api/resources
- 过滤分页：?page=2&limit=10&sort=name

### 3. HTTP方法使用
| 方法    | 路径            | 描述           |
|---------|-----------------|----------------|
| GET     | /users          | 获取用户列表   |
| POST    | /users          | 创建新用户     |
| GET     | /users/{id}     | 获取单个用户   |
| PUT     | /users/{id}     | 更新整个用户   |
| PATCH   | /users/{id}     | 部分更新用户   |
| DELETE  | /users/{id}     | 删除用户       |

### 4. 响应规范
- 正确使用状态码
- 统一响应格式：
  \`\`\`json
  {
    "code": 200,
    "data": {},
    "message": "success"
  }
  \`\`\`
- 错误处理：
  \`\`\`json
  {
    "error": {
      "code": 404,
      "message": "Resource not found"
    }
  }
  \`\`\``
  },
  {
    id: 279,
    title: "浏览器缓存机制解析",
    tags: ["缓存", "浏览器", "HTTP"],
    difficulty: "中等",
    code: `// 强缓存设置
res.setHeader('Cache-Control', 'public, max-age=31536000');
res.setHeader('Expires', new Date(Date.now() + 31536000000).toUTCString());

// 协商缓存设置
const etag = crypto.createHash('md5').update(content).digest('hex');
res.setHeader('ETag', etag);

// 客户端缓存验证
fetch('/api/data', {
  headers: {
    'If-None-Match': 'abc123'
  }
})`,
    answer: `## 浏览器缓存机制详解

### 1. 缓存类型
- **强缓存**：
  - Cache-Control（max-age, public/private）
  - Expires（绝对时间）
  
- **协商缓存**：
  - Last-Modified/If-Modified-Since
  - ETag/If-None-Match

### 2. 缓存流程
1. 检查强缓存是否有效
2. 有效：直接使用缓存（200 from cache）
3. 无效：发送请求验证协商缓存
4. 未修改：返回304使用缓存
5. 已修改：返回新资源

### 3. 缓存策略
| 资源类型       | 建议策略                     |
|----------------|------------------------------|
| 静态资源       | Cache-Control: max-age=31536000 |
| 动态接口       | Cache-Control: no-cache      |
| 用户相关数据   | private, max-age=0           |
| 频繁更新资源   | no-store                     |

### 4. 最佳实践
- 文件名哈希实现长期缓存
- 合理设置Vary头
- 使用Service Worker增强控制
- 监控缓存命中率`
  },
  {
    id: 280,
    title: "Cache-Control指令详解",
    tags: ["HTTP", "缓存", "请求头"],
    difficulty: "中等",
    code: `// 缓存配置示例
// 长期缓存
res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

// 不缓存
res.setHeader('Cache-Control', 'no-store');

// 需要重新验证
res.setHeader('Cache-Control', 'no-cache');

// 私有缓存
res.setHeader('Cache-Control', 'private, max-age=600');`,
    answer: `## Cache-Control指令解析

### 1. 常用指令
- **可缓存性**：
  - public：允许任何缓存
  - private：仅浏览器缓存
  - no-cache：需要验证
  - no-store：禁止缓存

- **过期时间**：
  - max-age=<seconds>：缓存有效期
  - s-maxage=<seconds>：CDN缓存时间
  - stale-while-revalidate：后台刷新宽限期

- **重新验证**：
  - must-revalidate：必须验证过期缓存
  - proxy-revalidate：要求代理服务器验证

- **其他**：
  - immutable：资源不会改变
  - no-transform：禁止代理修改内容

### 2. 典型配置
- **静态资源**：
  \`Cache-Control: public, max-age=31536000, immutable\`
  
- **动态内容**：
  \`Cache-Control: no-cache\`
  
- **用户敏感数据**：
  \`Cache-Control: private, max-age=300\`

### 3. 注意事项
- 多个指令用逗号分隔
- 优先级：no-store > no-cache > max-age
- 结合ETag使用更可靠
- 考虑CDN缓存行为

### 4. 调试工具
- Chrome DevTools Network面板
- 查看Size列标识（from memory/disk cache）
- 使用curl测试缓存头
- 在线缓存检查工具`
  }
];

export default questions280;