const questions240 = [
  {
    id: 228,
    title: "性能指标监测与分析",
    tags: ["性能优化", "指标", "前端"],
    difficulty: "中等",
    code: `// 使用Performance API获取关键指标
const [entry] = performance.getEntriesByType('navigation');
console.log('关键时间指标：', {
  DNS查询耗时: entry.domainLookupEnd - entry.domainLookupStart,
  TCP连接耗时: entry.connectEnd - entry.connectStart,
  请求响应耗时: entry.responseEnd - entry.requestStart,
  DOM解析耗时: entry.domComplete - entry.domInteractive,
  白屏时间: entry.responseStart - entry.startTime,
  首次可交互时间: entry.domInteractive - entry.startTime
});

// 自定义性能标记
performance.mark('startWork');
// 执行耗时操作
performance.mark('endWork');
performance.measure('workTime', 'startWork', 'endWork');`,
    answer: `## 前端性能指标解析

### 1. 核心Web指标
- **LCP (Largest Contentful Paint)**：最大内容渲染时间（≤2.5s）
- **FID (First Input Delay)**：首次输入延迟（≤100ms）
- **CLS (Cumulative Layout Shift)**：累计布局偏移（≤0.1）

### 2. 传统性能指标
- **TTFB (Time to First Byte)**：首字节时间
- **FP/FCP (First Paint/Contentful Paint)**：首次渲染时间
- **TTI (Time to Interactive)**：可交互时间
- **FMP (First Meaningful Paint)**：首次有效渲染

### 3. 监测方法
- **Lighthouse**：综合性能评估
- **Web Vitals**：核心指标监测
- **Performance Timeline API**：详细性能分析
- **RUM (Real User Monitoring)**：真实用户数据收集

### 4. 优化目标
| 指标       | 优秀    | 需要改进  |
|------------|---------|-----------|
| LCP        | ≤2.5s   | >4s       |
| FID        | ≤100ms  | >300ms    |
| CLS        | ≤0.1    | >0.25     |
| TTFB       | ≤500ms  | >1.5s     |`
  },
  {
    id: 229,
    title: "Performance API应用实践",
    tags: ["性能", "API", "浏览器"],
    difficulty: "中等",
    code: `// 测量资源加载性能
const resourceTiming = performance.getEntriesByType('resource');
resourceTiming.forEach(res => {
  console.log(\`\${res.name} 加载时间: \${res.duration}ms\`);
});

// 长任务监控
const observer = new PerformanceObserver(list => {
  list.getEntries().forEach(entry => {
    console.log(\`长任务耗时: \${entry.duration}ms\`);
  });
});
observer.observe({ entryTypes: ['longtask'] });

// 内存监控
if (performance.memory) {
  console.log(\`内存使用: \${performance.memory.usedJSHeapSize} / \${performance.memory.jsHeapSizeLimit}\`);
}`,
    answer: `## Performance API详解

### 1. 主要功能
- **时间测量**：高精度时间戳
- **资源监控**：脚本、样式、图片等加载时间
- **用户计时**：自定义性能标记
- **内存监控**：JS堆内存使用情况

### 2. 核心方法
- **performance.now()**：获取高精度时间
- **performance.mark()**：创建自定义标记
- **performance.measure()**：测量两个标记间时间
- **performance.getEntries()**：获取性能条目

### 3. 性能条目类型
- **navigation**：页面导航信息
- **resource**：资源加载信息
- **paint**：绘制时间（FP/FCP）
- **longtask**：长任务监控

### 4. 最佳实践
- 关键路径性能标记
- 异常耗时任务监控
- 资源加载优化分析
- 内存泄漏检测`
  },
  {
    id: 230,
    title: "Webpack性能优化策略",
    tags: ["webpack", "性能优化", "构建工具"],
    difficulty: "中等",
    code: `// webpack.config.js优化示例
module.exports = {
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    },
    runtimeChunk: 'single'
  },
  module: {
    rules: [
      {
        test: /\\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      }
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new CompressionPlugin()
  ]
};`,
    answer: `## Webpack优化全攻略

### 1. 构建速度优化
- **缓存**：使用cache-loader、hard-source-webpack-plugin
- **多进程**：thread-loader、parallel-webpack
- **范围缩小**：缩小loader作用范围
- **DLL**：预编译公共库

### 2. 包体积优化
- **代码分割**：SplitChunksPlugin
- **Tree Shaking**：ES模块分析
- **压缩**：TerserWebpackPlugin
- **按需加载**：动态import()

### 3. 运行时优化
- **持久缓存**：contenthash
- **预加载**：使用魔法注释
- **运行时分离**：runtimeChunk
- **移除开发代码**：process.env.NODE_ENV

### 4. 高级技巧
- 使用webpack-bundle-analyzer分析
- 配置externals排除依赖
- 优化source map生成
- 使用最新webpack版本`
  },
  {
    id: 231,
    title: "长缓存优化策略",
    tags: ["缓存", "性能优化", "HTTP"],
    difficulty: "中等",
    code: `// webpack配置示例
output: {
  filename: '[name].[contenthash:8].js',
  chunkFilename: '[name].[contenthash:8].chunk.js'
},

// 服务端缓存头设置
Cache-Control: public, max-age=31536000, immutable

// 版本化静态资源
<link href="/app.5d82c5d3.css" rel="stylesheet">`,
    answer: `## 长缓存实现方案

### 1. 文件指纹策略
- **hash**：基于项目构建
- **chunkhash**：基于chunk内容
- **contenthash**：基于文件内容

### 2. 缓存控制
- **静态资源**：Cache-Control: max-age=31536000, immutable
- **HTML文件**：Cache-Control: no-cache
- **API响应**：Cache-Control: private, max-age=60

### 3. 版本管理
- 文件名包含内容hash
- 使用query参数版本号
- 基于内容生成ETag
- 部署非覆盖式更新

### 4. 更新策略
- 重要更新修改文件名
- 次要更新使用CDN刷新
- 兼容旧版本资源
- 监控缓存命中率`
  },
  {
    id: 232,
    title: "大数据遍历优化方案",
    tags: ["性能优化", "大数据", "算法"],
    difficulty: "困难",
    code: `// 分帧处理示例
async function processLargeData(data) {
  const CHUNK_SIZE = 1000;
  let index = 0;
  
  function processChunk() {
    const chunk = data.slice(index, index + CHUNK_SIZE);
    index += CHUNK_SIZE;
    
    // 处理当前分块
    for (const item of chunk) {
      // 执行复杂计算
    }
    
    if (index < data.length) {
      // 使用requestIdleCallback分帧处理
      requestIdleCallback(processChunk);
    }
  }
  
  processChunk();
}

// Web Worker处理
const worker = new Worker('data-processor.js');
worker.postMessage(largeData);`,
    answer: `## 大数据处理优化指南

### 1. 算法优化
- 使用时间复杂度更低的算法
- 避免嵌套循环
- 利用空间换时间
- 预处理数据

### 2. 执行策略
- **分帧处理**：使用requestIdleCallback
- **增量处理**：分批处理数据
- **Web Worker**：多线程计算
- **空闲时段处理**：利用页面空闲时间

### 3. 数据结构优化
- 使用TypedArray处理数值数据
- 使用位操作优化存储
- 采用索引加速查询
- 使用树结构优化查找

### 4. 内存管理
- 及时释放不再使用的数据
- 避免内存泄漏
- 使用对象池复用对象
- 优化数据表示方式`
  },
  {
    id: 233,
    title: "WebWorker处理千万级数据",
    tags: ["WebWorker", "多线程", "性能优化"],
    difficulty: "困难",
    code: `// 主线程
const worker = new Worker('data-worker.js');
worker.postMessage({ action: 'process', data: largeArray });

// data-worker.js
self.onmessage = function(e) {
  const { action, data } = e.data;
  if (action === 'process') {
    const result = processData(data);
    self.postMessage(result);
  }
};

function processData(data) {
  // 使用共享内存优化
  const sharedBuffer = new SharedArrayBuffer(data.length * 4);
  const sharedArray = new Int32Array(sharedBuffer);
  
  // 并行处理
  const workerCount = navigator.hardwareConcurrency || 4;
  const perChunk = Math.ceil(data.length / workerCount);
  
  for (let i = 0; i < workerCount; i++) {
    const start = i * perChunk;
    const end = start + perChunk;
    const worker = new Worker('sub-worker.js');
    worker.postMessage({
      data: sharedArray,
      start,
      end: Math.min(end, data.length)
    });
  }
  
  return sharedArray;
}`,
    answer: `## WebWorker优化大数据处理

### 1. 实现方案
- **数据分片**：将数据分割为多个chunk
- **并行处理**：利用多核CPU
- **共享内存**：使用SharedArrayBuffer
- **流水线处理**：重叠I/O和计算

### 2. 性能技巧
- 减少主线程与Worker通信次数
- 使用Transferable Objects减少拷贝
- 批量处理数据
- 合理控制Worker数量

### 3. 注意事项
- 避免内存拷贝开销
- 处理线程安全问题
- 管理Worker生命周期
- 处理错误和超时

### 4. 适用场景
- 复杂数学计算
- 图像/视频处理
- 大数据分析
- 实时数据处理`
  },
  {
    id: 234,
    title: "延迟加载技术方案",
    tags: ["延迟加载", "性能优化", "加载策略"],
    difficulty: "中等",
    code: `// 图片懒加载
const lazyImages = document.querySelectorAll('img[data-src]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
});
lazyImages.forEach(img => observer.observe(img));

// 组件懒加载
const LazyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <LazyComponent />
    </Suspense>
  );
}`,
    answer: `## 延迟加载技术解析

### 1. 实现方式
- **图片懒加载**：Intersection Observer API
- **代码分割**：动态import()
- **按需加载**：路由级代码分割
- **虚拟滚动**：只渲染可见区域

### 2. 优化策略
- 预加载关键资源
- 预连接重要域名
- 合理设置加载阈值
- 优雅降级处理

### 3. 性能影响
- 减少初始加载体积
- 提升首屏速度
- 可能增加交互延迟
- 需要合理预加载

### 4. 最佳实践
- 首屏关键资源优先加载
- 非关键资源延迟加载
- 使用loading占位符
- 监控资源加载时序`
  },
  {
    id: 235,
    title: "图片懒加载与预加载",
    tags: ["图片优化", "懒加载", "预加载"],
    difficulty: "简单",
    code: `// 懒加载实现
<img data-src="image.jpg" class="lazy">

<script>
document.addEventListener("DOMContentLoaded", () => {
  const lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => observer.observe(img));
  }
});
</script>

// 预加载实现
<link rel="preload" href="critical-image.jpg" as="image">
<img src="critical-image.jpg">`,
    answer: `## 图片加载策略对比

### 1. 懒加载（Lazy Loading）
- **适用场景**：
  - 非首屏图片
  - 长页面中的图片
  - 用户可能不会查看的内容

- **优点**：
  - 减少初始请求数
  - 节省带宽
  - 提升首屏速度

- **缺点**：
  - 滚动时可能产生布局偏移
  - 需要额外处理占位

### 2. 预加载（Preloading）
- **适用场景**：
  - 关键首屏图片
  - 用户可能访问的下一页资源
  - 高优先级资源

- **优点**：
  - 提前加载重要资源
  - 提升用户体验
  - 减少布局偏移

- **缺点**：
  - 可能浪费带宽
  - 过度使用影响性能

### 3. 混合策略
- 首屏关键图片预加载
- 非关键图片懒加载
- 使用Intersection Observer API
- 响应式图片适配`
  },
  {
    id: 236,
    title: "海量图片加载优化",
    tags: ["图片优化", "性能优化", "加载策略"],
    difficulty: "中等",
    code: `// 响应式图片示例
<picture>
  <source media="(max-width: 799px)" srcset="small.jpg">
  <source media="(min-width: 800px)" srcset="large.jpg">
  <img src="fallback.jpg" alt="示例图片">
</picture>

// 渐进式JPEG加载
<img src="progressive.jpg" alt="渐进式图片">

// WebP格式支持
<img 
  src="image.webp" 
  onerror="this.onerror=null;this.src='image.jpg'"
  alt="WebP图片"
>`,
    answer: `## 图片加载优化方案

### 1. 格式优化
- **WebP**：更小的体积
- **AVIF**：新一代压缩格式
- **渐进式JPEG**：逐步渲染
- **SVG**：矢量图形

### 2. 尺寸优化
- 响应式图片（srcset）
- 按需裁剪（CDN服务）
- 适当压缩质量
- 删除EXIF数据

### 3. 加载优化
- CDN加速
- HTTP/2多路复用
- 懒加载
- 预加载关键图片

### 4. 渲染优化
- 使用aspect-ratio保持布局稳定
- 使用blur-up技术
- 优先加载LCP图片
- 使用CSS渐变占位`
  },
  {
    id: 237,
    title: "CDN加速原理剖析",
    tags: ["CDN", "网络优化", "分发"],
    difficulty: "中等",
    code: `// DNS解析示例
nslookup example.com.cdn.cloudflare.net

// HTTP请求头
Accept-Encoding: gzip, br
If-None-Match: "xyzzy"
If-Modified-Since: Tue, 15 Nov 2022 12:45:26 GMT

// 缓存状态头
Age: 3600
Cache-Status: Hit`,
    answer: `## CDN工作原理详解

### 1. 核心原理
- **边缘节点**：全球分布的缓存服务器
- **内容分发**：就近访问原则
- **缓存策略**：热资源长期缓存
- **动态加速**：最优路径选择

### 2. 关键技术
- **DNS解析**：智能调度用户到最近节点
- **缓存控制**：遵循源站Cache-Control
- **内容预取**：提前缓存热门资源
- **协议优化**：HTTP/2、QUIC支持

### 3. 性能优势
- 减少网络延迟
- 降低源站压力
- 提高可用性
- 节省带宽成本

### 4. 使用场景
- 静态资源加速
- 大文件下载
- 视频点播/直播
- 动态API加速`
  },
  {
    id: 238,
    title: "浏览器渲染流程解析",
    tags: ["浏览器渲染", "DOM", "渲染树"],
    difficulty: "中等",
    code: `// 强制同步布局示例（应避免）
function badLayout() {
  const width = document.getElementById('box').offsetWidth;
  document.getElementById('box').style.width = width + 10 + 'px';
}

// 优化写法
function goodLayout() {
  const box = document.getElementById('box');
  const width = box.offsetWidth;
  requestAnimationFrame(() => {
    box.style.width = width + 10 + 'px';
  });
}`,
    answer: `## 浏览器渲染优化指南

### 1. 关键渲染路径
1. **JavaScript**：可能修改DOM/CSSOM
2. **Style**：计算样式
3. **Layout**：计算几何信息
4. **Paint**：绘制像素
5. **Composite**：图层合成

### 2. 优化策略
- **减少重排**：批量DOM操作
- **避免强制同步布局**：先读后写
- **使用transform/opacity**：跳过布局绘制
- **层创建**：will-change, translateZ(0)

### 3. 性能工具
- Chrome DevTools Performance面板
- Layout Shift可视化
- Layer面板分析
- Paint Flashing

### 4. 最佳实践
- 使用虚拟DOM库
- 优化CSS选择器
- 减少图层数量
- 合理使用GPU加速`
  },
  {
    id: 239,
    title: "页面加载全流程优化",
    tags: ["浏览器", "网络", "渲染"],
    difficulty: "中等",
    code: `// 关键资源预加载
<link rel="preconnect" href="https://cdn.example.com">
<link rel="preload" href="main.css" as="style">
<link rel="preload" href="app.js" as="script">

// 服务端推送
// HTTP/2 Server Push
:path: /style.css
:status: 200
content-type: text/css`,
    answer: `## 页面加载优化方案

### 1. 网络层优化
- **DNS预解析**：<link rel="dns-prefetch">
- **TCP预连接**：<link rel="preconnect">
- **HTTP/2**：多路复用、头部压缩
- **资源预加载**：preload, prefetch

### 2. 渲染层优化
- 关键CSS内联
- 异步非关键JS
- 字体预加载
- 骨架屏技术

### 3. 资源优化
- 压缩文本资源
- 使用现代图片格式
- 代码分割
- Tree Shaking

### 4. 缓存策略
- 长期缓存静态资源
- 使用Service Worker
- 合理设置Cache-Control
- 版本化资源URL`
  },
  {
    id: 240,
    title: "无限滚动性能优化",
    tags: ["性能优化", "无限滚动", "DOM"],
    difficulty: "中等",
    code: `// 虚拟滚动示例
<VirtualScroll
  itemCount={1000000}
  itemSize={50}
  height={500}
  width={300}
>
  {({ index, style }) => (
    <div style={style}>
      Item {index}
    </div>
  )}
</VirtualScroll>

// 滚动事件节流
window.addEventListener('scroll', throttle(() => {
  // 处理滚动逻辑
}, 100));`,
    answer: `## 无限滚动优化方案

### 1. 虚拟化技术
- 只渲染可见项
- 动态计算位置
- 回收DOM节点
- 动态加载数据

### 2. 性能优化
- 使用绝对定位
- 避免复杂布局
- 使用transform动画
- 节流滚动事件

### 3. 内存管理
- 限制历史记录
- 及时清理不可见项
- 使用对象池
- 避免内存泄漏

### 4. 用户体验
- 预加载相邻项
- 保持滚动位置
- 添加加载指示
- 错误重试机制`
  }
];

export default questions240;