const questions250 = [
  {
    id: 241,
    title: "动态高度虚拟列表实现",
    tags: ["虚拟列表", "性能优化", "动态高度"],
    difficulty: "困难",
    code: `// 动态高度虚拟列表组件示例
class DynamicHeightVirtualList {
  constructor(container, items, estimateHeight) {
    this.container = container;
    this.items = items;
    this.estimateHeight = estimateHeight; // 预估高度
    this.measuredHeights = new Map(); // 已测量高度缓存
    this.totalHeight = items.reduce((sum, _, i) => sum + this.getItemHeight(i), 0);
    this.visibleItems = [];
    
    this.virtualScroll = this.virtualScroll.bind(this);
    container.addEventListener('scroll', this.virtualScroll);
    this.virtualScroll();
  }

  getItemHeight(index) {
    return this.measuredHeights.get(index) || this.estimateHeight;
  }

  updateItemHeight(index, height) {
    const oldHeight = this.getItemHeight(index);
    this.measuredHeights.set(index, height);
    this.totalHeight += height - oldHeight;
  }

  virtualScroll() {
    const scrollTop = this.container.scrollTop;
    const viewportHeight = this.container.clientHeight;
    
    // 计算可见区域
    let startIndex = 0;
    let endIndex = 0;
    let currentHeight = 0;
    
    // 查找起始索引
    while (currentHeight < scrollTop && startIndex < this.items.length) {
      currentHeight += this.getItemHeight(startIndex);
      startIndex++;
    }
    
    // 查找结束索引
    endIndex = startIndex;
    while (currentHeight < scrollTop + viewportHeight && endIndex < this.items.length) {
      currentHeight += this.getItemHeight(endIndex);
      endIndex++;
    }

    // 渲染可见项
    this.renderItems(startIndex, endIndex);
  }

  renderItems(start, end) {
    // 实现渲染逻辑，使用绝对定位
    // 并在渲染后更新实际高度
    const itemsToRender = this.items.slice(start, end);
    itemsToRender.forEach((item, index) => {
      const pos = start + index;
      const element = this.createOrUpdateElement(pos);
      if (!this.measuredHeights.has(pos)) {
        const height = element.offsetHeight;
        this.updateItemHeight(pos, height);
      }
    });
  }
}`,
    answer: `## 动态高度虚拟列表解决方案

### 1. 核心挑战
- 高度不可预知导致滚动计算困难
- 动态内容可能引起布局抖动
- 高效测量和缓存高度
- 保持滚动位置稳定

### 2. 关键技术
- **预估高度**：初始使用估计值，后续动态更新
- **位置缓存**：记录已测量项的实际高度
- **滚动锚定**：保持滚动位置稳定
- **批量更新**：减少布局抖动

### 3. 实现策略
1. **双预估策略**：
   - 初始使用平均高度预估
   - 渲染后更新为实际高度
2. **滚动补偿**：
   - 高度变化时调整滚动位置
3. **视窗扩展**：
   - 上下多渲染缓冲项
4. **异步测量**：
   - 使用ResizeObserver监听尺寸变化

### 4. 性能优化
| 方法                | 优点                  | 缺点                |
|---------------------|-----------------------|---------------------|
| 固定缓冲区块        | 实现简单              | 可能空白间隙        |
| 动态缓冲区块        | 适应不同屏幕          | 计算复杂            |
| 二进制搜索定位      | 快速定位              | 需要高度累加信息    |
| 滚动节流+防抖       | 平衡性能与响应        | 可能感知延迟        |

### 5. 最佳实践
- 使用ResizeObserver监听尺寸变化
- 实现平滑滚动过渡
- 添加加载状态指示
- 提供滚动位置恢复功能`
  },
  {
    id: 242,
    title: "域名发散优化策略",
    tags: ["HTTP", "网络优化", "资源加载"],
    difficulty: "简单",
    code: `<!-- 域名发散示例 -->
<img src="https://static1.example.com/image1.jpg">
<img src="https://static2.example.com/image2.jpg">
<script src="https://cdn1.example.com/lib.js"></script>
<script src="https://cdn2.example.com/plugin.js"></script>

// DNS预解析
<link rel="dns-prefetch" href="//static1.example.com">
<link rel="dns-prefetch" href="//static2.example.com">`,
    answer: `## 域名发散技术解析

### 1. 产生背景
- 浏览器对同一域名并发请求限制（6-8个）
- HTTP/1.1的队头阻塞问题
- 需要提升资源加载并行度

### 2. 实现方式
- 将静态资源分散到多个子域名
- 常用模式：
  - static{1-4}.example.com
  - cdn{01-08}.example.net
- 配合DNS预解析优化

### 3. 优势与代价
| 优势                | 代价                  |
|---------------------|-----------------------|
| 提升并发下载能力    | DNS查询开销增加       |
| 避免请求阻塞        | TCP连接成本增加       |
| 更好利用CDN         | 缓存效率降低          |
| 适配HTTP/1.1限制    | 配置复杂度增加        |

### 4. 现代替代方案
- **HTTP/2**：多路复用解决队头阻塞
- **资源合并**：减少请求数量
- **预加载**：提前加载关键资源
- **智能CDN**：自动优化资源分发

### 5. 使用建议
- 在HTTP/1.1环境下使用
- 控制域名数量（通常2-4个）
- 配合连接复用策略
- 监控性能收益与成本`
  },
  {
    id: 243,
    title: "域名收敛优化策略",
    tags: ["HTTP", "网络优化", "资源加载"],
    difficulty: "简单",
    code: `<!-- 域名收敛示例 -->
<link rel="preconnect" href="https://static.example.com">
<script src="https://static.example.com/bundle.js"></script>
<img src="https://static.example.com/image.jpg">

// HTTP/2服务端配置
server {
  listen 443 ssl http2;
  server_name static.example.com;
  
  ssl_certificate /path/to/cert;
  ssl_certificate_key /path/to/key;
  
  location / {
    root /var/www/static;
    http2_push /css/main.css;
  }
}`,
    answer: `## 域名收敛技术解析

### 1. 产生背景
- HTTP/2的多路复用特性
- 减少DNS查询和TCP连接开销
- 提高缓存利用率
- 简化资源管理

### 2. 实现方式
- 合并资源到单一域名
- 启用HTTP/2协议
- 使用资源推送（Server Push）
- 优化缓存策略

### 3. 优势与挑战
| 优势                | 挑战                  |
|---------------------|-----------------------|
| 减少连接开销        | 需要HTTP/2支持        |
| 提高缓存效率        | 服务器配置复杂度       |
| 简化资源管理        | 需要合理分流策略       |
| 更好利用优先级      | 调试难度增加           |

### 4. 最佳实践
- 启用HTTP/2+HTTPS
- 使用资源优先级提示
- 实施智能压缩（Brotli）
- 配置合理的流优先级
- 监控连接利用率

### 5. 迁移步骤
1. 评估现有资源分布
2. 逐步合并域名
3. 配置HTTP/2服务器
4. 实施资源推送
5. 监控性能指标
6. 优化连接复用策略`
  }
];

export default questions250;