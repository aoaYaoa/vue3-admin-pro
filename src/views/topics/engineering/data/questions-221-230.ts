const questions230 = [
  {
    id: 221,
    title: "Babel转译原理详解",
    tags: ["Babel", "转译", "原理"],
    difficulty: "困难",
    code: `// Babel处理流程伪代码
function babelTransform(code) {
  // 1. 解析
  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx']
  });
  
  // 2. 转换
  traverse(ast, {
    ArrowFunctionExpression(path) {
      // 转换箭头函数
      path.replaceWith(
        t.functionExpression(
          null,
          path.node.params,
          path.node.body
        )
      );
    }
  });
  
  // 3. 生成
  return generator(ast).code;
}

// 使用示例
const input = \`const add = (a, b) => a + b;\`;
const output = babelTransform(input);
console.log(output); // "const add = function(a, b) { return a + b; };"`,
    answer: `## Babel工作原理

### 1. 核心流程
1. **解析（Parse）**：将代码转换为AST
   - 词法分析（Lexical Analysis）
   - 语法分析（Syntactic Analysis）
   
2. **转换（Transform）**：遍历并修改AST
   - 插件系统应用转换规则
   - 维护作用域信息
   
3. **生成（Generate）**：从AST生成目标代码
   - 源码映射（Source Map）
   - 代码格式化

### 2. 关键组件
- **@babel/parser**：解析器（原Babylon）
- **@babel/traverse**：AST遍历器
- **@babel/generator**：代码生成器
- **@babel/types**：AST节点工具库

### 3. 插件开发
- 访问者模式（Visitor Pattern）
- 路径（Path）操作
- 作用域管理
- 代码模板生成

### 4. 性能优化
- 缓存AST
- 并行处理
- 按需加载插件
- 减少AST遍历次数`
  },
  {
    id: 222,
    title: "模块化与组件化对比",
    tags: ["模块化", "组件化", "架构"],
    difficulty: "中等",
    code: `// 模块化示例
// math.js
export function add(a, b) { return a + b; }

// app.js
import { add } from './math';
console.log(add(2, 3));

// 组件化示例
// Button.jsx
export default function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

// App.jsx
import Button from './Button';
function App() {
  return <Button onClick={() => console.log('clicked')}>Click</Button>;
}`,
    answer: `## 模块化 vs 组件化

### 1. 核心概念
- **模块化**：
  - 代码组织方式
  - 关注功能封装
  - 解决命名冲突
  - 提高复用性
  
- **组件化**：
  - UI构建方式
  - 关注视图与交互
  - 解决UI复用
  - 提升可维护性

### 2. 实现方式
|          | 模块化                 | 组件化                 |
|----------|------------------------|------------------------|
| 粒度     | 功能单元               | UI单元                |
| 依赖     | 逻辑依赖               | 父子关系/状态传递     |
| 通信     | 导入导出               | Props/事件            |
| 复用     | 跨项目                 | 项目内/UI库           |

### 3. 结合应用
- 组件内部使用模块化组织代码
- 模块化管理组件间的共享逻辑
- 组件化构建模块的UI部分
- 模块化处理数据层，组件化处理视图层`
  },
  {
    id: 223,
    title: "CommonJS与ESM对比",
    tags: ["模块化", "CommonJS", "ESM"],
    difficulty: "中等",
    code: `// CommonJS
const { add } = require('./math');
module.exports = { calculate: add };

// ESM
import { add } from './math';
export const calculate = add;

// 差异示例
// CommonJS动态导入
const path = './' + 'math';
const math = require(path);

// ESM静态导入（需动态导入使用import()）
const path = './' + 'math';
import(math).then(module => {
  // 使用模块
});`,
    answer: `## CommonJS vs ESM

### 1. 核心差异
| 特性         | CommonJS              | ESM                   |
|--------------|-----------------------|-----------------------|
| 加载方式     | 运行时加载            | 编译时静态分析        |
| 输出         | 值的拷贝              | 值的引用              |
| 同步性       | 同步加载              | 异步加载              |
| 顶层this     | 当前模块              | undefined             |
| 循环依赖处理 | 支持但可能有问题      | 静态分析自动处理      |

### 2. 使用场景
- **CommonJS**：
  - Node.js环境
  - 动态模块加载
  - 遗留系统维护
  
- **ESM**：
  - 浏览器环境
  - 现代前端项目
  - 需要Tree Shaking

### 3. 互操作性
- Node.js中通过.mjs/.cjs扩展名区分
- 使用打包工具转换
- 注意混合使用的陷阱
- 使用条件导出兼容不同环境`
  },
  {
    id: 224,
    title: "服务端渲染（SSR）实现原理",
    tags: ["SSR", "服务端渲染", "性能"],
    difficulty: "中等",
    code: `// Express + React SSR示例
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

const app = express();

app.get('*', (req, res) => {
  const html = renderToString(<App />);
  
  res.send(\`
    <!DOCTYPE html>
    <html>
      <head>
        <title>SSR Example</title>
      </head>
      <body>
        <div id="root">\${html}</div>
        <script src="/client.js"></script>
      </body>
    </html>
  \`);
});

app.listen(3000);`,
    answer: `## SSR核心原理

### 1. 工作流程
1. 服务器接收请求
2. 执行应用代码生成HTML
3. 发送包含初始状态的HTML
4. 客户端激活（Hydration）

### 2. 优势
- 更好的SEO
- 更快的首屏加载
- 更好的用户体验
- 支持无JavaScript环境

### 3. 挑战
- 服务器负载增加
- 开发复杂度提升
- 内存泄漏风险
- 状态管理复杂化

### 4. 优化策略
- 流式渲染
- 组件级缓存
- 预取数据
- 代码分割`
  },
  {
    id: 225,
    title: "SPA与MPA架构对比",
    tags: ["SPA", "MPA", "架构"],
    difficulty: "中等",
    code: `// SPA路由示例（React Router）
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Route path="/about" component={About} />
      <Route path="/users" component={Users} />
    </BrowserRouter>
  );
}

// MPA页面示例
/*
public/
  index.html
  about.html
  users.html
*/`,
    answer: `## SPA vs MPA

### 1. 核心差异
| 特性         | SPA                  | MPA                  |
|--------------|----------------------|----------------------|
| 页面数量     | 单个HTML文件         | 多个HTML文件         |
| 路由方式     | 前端路由             | 后端路由             |
| 数据加载     | 动态加载             | 整页刷新             |
| SEO          | 需要SSR优化          | 原生支持             |
| 开发成本     | 较高                 | 较低                 |

### 2. 适用场景
- **SPA**：
  - 复杂交互应用
  - 需要类原生体验
  - 前后端分离架构
  
- **MPA**：
  - 内容型网站
  - 需要良好SEO
  - 简单功能页面

### 3. 混合方案
- 核心功能使用SPA
- 静态页面使用MPA
- 结合SSR优化首屏
- 按需加载子应用`
  },
  {
    id: 226,
    title: "Vite的作用与优势",
    tags: ["Vite", "构建工具", "ESM"],
    difficulty: "简单",
    code: `// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    minify: 'terser'
  }
});`,
    answer: `## Vite核心优势

### 1. 主要特点
- **原生ESM支持**：浏览器直接运行ES模块
- **极速冷启动**：无需打包立即启动
- **按需编译**：只编译当前页面需要的模块
- **高效HMR**：毫秒级热更新

### 2. 性能对比
| 指标         | Webpack          | Vite             |
|--------------|------------------|------------------|
| 启动时间     | 10-30秒          | <1秒             |
| HMR速度      | 100-1000ms       | 10-100ms         |
| 构建速度     | 中等             | 快（Rollup）     |
| 内存占用     | 高               | 低               |

### 3. 适用场景
- 现代浏览器项目
- 快速原型开发
- 需要极致开发体验
- 轻量级应用开发

### 4. 功能扩展
- 支持TypeScript
- CSS模块化
- 静态资源处理
- 多框架支持（Vue/React等）`
  },
  {
    id: 227,
    title: "Vite构建流程解析",
    tags: ["Vite", "构建流程", "原理"],
    difficulty: "中等",
    code: `// Vite构建流程伪代码
async function viteBuild() {
  // 开发模式
  if (isDev) {
    // 启动预构建
    await optimizeDeps();
    
    // 启动开发服务器
    startDevServer({
      middleware: [
        // 处理ESM请求
        esmMiddleware,
        // 处理资源请求
        assetsMiddleware
      ]
    });
  } else {
    // 生产模式使用Rollup
    const bundle = await rollup.rollup(inputOptions);
    await bundle.write(outputOptions);
  }
}`,
    answer: `## Vite构建流程详解

### 1. 开发模式
1. **预构建**：
   - 转换CommonJS到ESM
   - 合并小模块
   - 缓存node_modules依赖
   
2. **请求处理**：
   - 拦截ESM导入
   - 按需转换代码
   - 实时HMR更新

### 2. 生产模式
1. **Rollup打包**：
   - 代码分割
   - Tree Shaking
   - 资源优化
   
2. **构建优化**：
   - 异步加载处理
   - CSS提取
   - 自动Polyfill

### 3. 核心模块
- **ESM Loader**：处理浏览器模块请求
- **Plugin System**：扩展构建能力
- **HMR Engine**：热更新引擎
- **Dependency Pre-Bundling**：依赖预构建

### 4. 性能关键
- 避免不必要的打包
- 利用浏览器缓存
- 并行处理请求
- 增量编译更新`
  },
  {
    id: 228,
    title: "Vite热更新原理",
    tags: ["Vite", "HMR", "热更新"],
    difficulty: "困难",
    code: `// Vite HMR伪代码
// 客户端
const socket = new WebSocket('ws://localhost:3000');
socket.onmessage = async ({ data }) => {
  const payload = JSON.parse(data);
  if (payload.type === 'update') {
    // 获取更新模块
    const module = await import(payload.path + '?t=' + Date.now());
    
    // 执行HMR回调
    if (module.hot) {
      module.hot.accept(() => {
        // 更新组件
      });
    }
  }
};

// 服务端
watcher.on('change', (file) => {
  const module = getAffectedModule(file);
  socket.send({
    type: 'update',
    path: module.path
  });
});`,
    answer: `## Vite HMR机制

### 1. 核心流程
1. 文件变动检测
2. 确定影响范围
3. 发送HMR通知
4. 客户端应用更新

### 2. 优势特性
- 基于原生ESM的HMR
- 精确的更新范围
- 极快的更新速度
- 保持应用状态

### 3. 实现细节
- **模块边界检测**：通过import链确定更新范围
- **缓存失效**：通过URL参数使缓存失效
- **热更新协议**：自定义WebSocket协议
- **状态保持**：代理组件实例

### 4. 对比Webpack HMR
| 特性         | Vite HMR            | Webpack HMR         |
|--------------|----------------------|---------------------|
| 更新速度     | 极快（<50ms）        | 较快（100-500ms）   |
| 更新粒度     | 模块级               | 模块级              |
| 实现方式     | 原生ESM              | Runtime注入        |
| 配置复杂度   | 无需配置             | 需要loader支持      |`
  },
  {
    id: 229,
    title: "Vite常用插件",
    tags: ["Vite", "插件", "工具"],
    difficulty: "简单",
    code: `// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import inspect from 'vite-plugin-inspect';

export default defineConfig({
  plugins: [
    vue(),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    inspect()
  ]
});`,
    answer: `## Vite常用插件

### 1. 核心插件
- **@vitejs/plugin-vue**：Vue单文件组件支持
- **@vitejs/plugin-react**：React快速刷新支持
- **@vitejs/plugin-legacy**：传统浏览器支持

### 2. 功能增强
- **vite-plugin-pwa**：PWA支持
- **vite-plugin-svg-icons**：SVG图标处理
- **vite-plugin-mock**：Mock数据

### 3. 优化类
- **vite-plugin-compression**：Gzip压缩
- **vite-plugin-imagemin**：图片压缩
- **vite-plugin-style-import**：按需加载样式

### 4. 调试工具
- **vite-plugin-inspect**：检查构建中间状态
- **vite-plugin-checker**：类型检查
- **vite-plugin-terminal**：终端输出优化

### 5. 开发辅助
- **vite-plugin-pages**：文件系统路由
- **vite-plugin-layouts**：布局系统
- **vite-plugin-api**：自动生成API客户端`
  },
  {
    id: 230,
    title: "编写Vite插件实践",
    tags: ["Vite", "插件", "实践"],
    difficulty: "困难",
    code: `// 简单Vite插件示例
function myPlugin() {
  return {
    name: 'vite-plugin-my',
    
    // 转换index.html
    transformIndexHtml(html) {
      return html.replace(
        /<title>(.*?)<\/title>/,
        '<title>My App</title>'
      );
    },
    
    // 处理自定义文件类型
    transform(code, id) {
      if (id.endsWith('.custom')) {
        return compileCustomFile(code);
      }
    },
    
    // 配置HMR
    handleHotUpdate({ file, server }) {
      if (file.endsWith('.custom')) {
        server.ws.send({
          type: 'custom',
          event: 'custom-update',
          data: { file }
        });
      }
    }
  };
}`,
    answer: `## Vite插件开发指南

### 1. 插件结构
- **name**：插件名称（必需）
- **钩子函数**：实现特定生命周期处理
- **配置处理**：修改Vite配置

### 2. 常用钩子
- **config**：修改配置
- **transformIndexHtml**：处理HTML
- **transform**：转换代码
- **handleHotUpdate**：自定义HMR

### 3. 开发技巧
- 利用Rollup插件兼容性
- 使用Vite特有的钩子
- 处理虚拟模块
- 利用模块图信息

### 4. 调试方法
- 使用vite-plugin-inspect
- 输出中间状态
- 编写测试用例
- 利用TypeScript类型提示

### 5. 发布规范
- 命名以vite-plugin-开头
- 提供TypeScript类型定义
- 完善文档说明
- 处理不同环境兼容性`
  }
];

export default questions230;