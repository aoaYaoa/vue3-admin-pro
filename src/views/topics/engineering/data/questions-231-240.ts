const questions240 = [
  {
    id: 231,
    title: "Vite预构建功能解析",
    tags: ["Vite", "预构建", "依赖优化"],
    difficulty: "中等",
    code: `// vite.config.js
export default {
  optimizeDeps: {
    include: ['lodash-es'],
    exclude: ['moment'],
    force: true // 强制重新预构建
  }
}

// 预构建流程伪代码
async function optimizeDeps() {
  // 扫描入口文件
  const entries = await findEntryPoints();
  
  // 分析依赖
  const deps = await scanDeps(entries);
  
  // 转换CommonJS到ESM
  const converted = await convertCJS(deps);
  
  // 合并小模块
  const bundled = await bundle(converted);
  
  // 写入缓存
  writeCache(bundled);
}`,
    answer: `## Vite预构建机制

### 1. 主要功能
- **CommonJS转换**：将CJS模块转为ESM
- **依赖扁平化**：合并嵌套依赖
- **性能优化**：减少模块请求数量
- **缓存管理**：提升二次启动速度

### 2. 触发时机
- 首次启动开发服务器
- package.json变更
- 手动强制构建
- 依赖版本更新

### 3. 配置选项
- **include**：强制包含的依赖
- **exclude**：排除的依赖
- **force**：强制重新构建
- **keepNames**：保留导出名称

### 4. 性能影响
- 首次构建时间增加
- 后续开发速度显著提升
- 减少浏览器并发请求
- 优化模块加载性能`
  },
  {
    id: 232,
    title: "Vite项目性能优化策略",
    tags: ["Vite", "性能优化", "实践"],
    difficulty: "中等",
    code: `// vite.config.js
export default {
  build: {
    // 代码分割
    rollupOptions: {
      output: {
        manualChunks: {
          lodash: ['lodash-es'],
          ui: ['antd']
        }
      }
    },
    // 其他优化
    minify: 'terser',
    cssCodeSplit: true,
    sourcemap: false
  },
  server: {
    // 代理配置
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
}`,
    answer: `## Vite性能优化指南

### 1. 构建优化
- 代码分割（manualChunks）
- 按需加载组件
- 启用Gzip压缩
- 使用CDN加载第三方库

### 2. 开发优化
- 合理配置预构建
- 减少大文件处理
- 使用缓存策略
- 优化网络请求

### 3. 运行时优化
- 虚拟滚动长列表
- 图片懒加载
- 代码分割+预加载
- 使用Web Worker

### 4. 监控分析
- 使用vite-plugin-inspect
- 分析包大小
- 性能基准测试
- 使用Lighthouse审计`
  },
  {
    id: 233,
    title: "Rollup与Vite的关系",
    tags: ["Vite", "Rollup", "构建工具"],
    difficulty: "中等",
    code: `// Vite生产构建配置
import { defineConfig } from 'vite';
import rollupPlugin from 'rollup-plugin-xxx';

export default defineConfig({
  build: {
    rollupOptions: {
      plugins: [rollupPlugin()],
      output: {
        format: 'es',
        dir: 'dist'
      }
    }
  }
});`,
    answer: `## Vite与Rollup集成

### 1. 核心关系
- **开发模式**：Vite原生ESM处理
- **生产模式**：基于Rollup打包
- **插件兼容**：大部分Rollup插件可用
- **配置继承**：共享Rollup配置选项

### 2. 差异对比
| 特性         | Vite                 | Rollup              |
|--------------|----------------------|---------------------|
| 主要用途     | 开发服务器+构建      | 库打包              |
| 开发体验     | 极速HMR              | 无内置开发服务器    |
| 打包方式     | 按需+全量            | 全量打包            |
| 生态定位     | 应用开发             | 库开发              |

### 3. 联合使用场景
- 开发时使用Vite快速迭代
- 生产构建使用Rollup优化输出
- 共享Rollup插件生态
- 复杂项目混合配置

### 4. 最佳实践
- 简单项目使用Vite默认配置
- 复杂项目扩展Rollup选项
- 开发自定义Rollup插件
- 利用Vite的Rollup集成能力`
  },
  {
    id: 234,
    title: "Vite与传统构建工具加载性能对比",
    tags: ["Vite", "性能", "加载速度"],
    difficulty: "中等",
    code: `// 性能测试场景
// 项目规模：100+组件，50+路由
// 测试环境：本地开发服务器

// Webpack结果
const webpackMetrics = {
  coldStart: '12.3s',
  hmrUpdate: '850ms',
  bundleSize: '5.2MB',
  requests: 128
};

// Vite结果
const viteMetrics = {
  coldStart: '0.8s',
  hmrUpdate: '35ms',
  bundleSize: 'N/A (ESM)',
  requests: 15
};`,
    answer: `## 加载性能对比分析

### 1. 核心指标对比
| 指标         | Webpack          | Vite             |
|--------------|------------------|------------------|
| 冷启动时间   | 10-30秒          | <1秒             |
| HMR更新      | 100-1000ms       | 10-100ms         |
| 生产构建     | 20-60秒          | 10-30秒          |
| 内存占用     | 高               | 低               |

### 2. 性能差异原因
- **开发模式**：
  - Vite：原生ESM按需加载
  - Webpack：全量打包
  
- **生产模式**：
  - Vite：Rollup优化构建
  - Webpack：复杂优化流程

### 3. 优化建议
- 小型项目优先选择Vite
- 大型项目评估迁移成本
- 混合使用Vite+Webpack
- 关注浏览器兼容性

### 4. 未来趋势
- 浏览器原生支持ESM
- 构建工具轻量化
- 按需编译成为主流
- 开发体验持续优化`
  }
];

export default questions240; 