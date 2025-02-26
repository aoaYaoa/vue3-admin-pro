const questions220 = [
  {
    id: 209,
    title: "Webpack的核心作用",
    tags: ["Webpack", "工程化", "构建工具"],
    difficulty: "简单",
    code: `// webpack.config.js 基本配置
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.js$/, use: 'babel-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' })
  ]
};`,
    answer: `## Webpack的核心作用

### 1. 主要功能
- **模块打包**：将多个模块打包成少量文件
- **资源处理**：处理各种静态资源（CSS、图片等）
- **代码转换**：通过Loader转换ES6+、TypeScript等
- **代码优化**：代码压缩、Tree Shaking等
- **开发支持**：热更新、Source Map等

### 2. 核心概念
- **Entry**：打包入口
- **Output**：输出配置
- **Loader**：文件转换器
- **Plugin**：扩展功能
- **Mode**：开发/生产模式

### 3. 与竞品对比
|          | Webpack          | Rollup           | Vite            |
|----------|------------------|------------------|-----------------|
| 适用场景 | 复杂应用         | 库开发           | 现代Web应用     |
| 打包方式 | 模块化           | ESM优先          | 原生ESM         |
| 构建速度 | 较慢             | 中等             | 极快            |
| 配置复杂度 | 高              | 中等             | 低              |

### 4. 典型应用场景
- SPA应用打包
- 多页面应用
- 微前端架构
- 静态资源优化`
  },
  {
    id: 210,
    title: "Webpack构建流程解析",
    tags: ["Webpack", "构建流程", "原理"],
    difficulty: "中等",
    code: `// 简化的构建流程伪代码
function webpackBuild(config) {
  // 初始化
  const compiler = createCompiler(config);
  
  // 开始编译
  compiler.run((err, stats) => {
    // 处理错误
    if (err) throw err;
    
    // 输出结果
    console.log(stats.toString());
  });
}

// 核心阶段：
// 1. 初始化参数
// 2. 开始编译
// 3. 解析模块依赖
// 4. 构建模块AST
// 5. 生成依赖图
// 6. 封装代码块
// 7. 生成最终文件`,
    answer: `## Webpack构建流程详解

### 1. 初始化阶段
- 合并配置参数
- 创建Compiler对象
- 加载插件系统

### 2. 编译阶段
- 解析入口文件
- 构建模块依赖图
- 应用Loader转换
- 生成AST分析依赖

### 3. 生成阶段
- 代码分割（Code Splitting）
- 创建Chunk
- 优化处理（Tree Shaking等）
- 生成最终资源

### 4. 输出阶段
- 生成文件到输出目录
- 触发插件钩子（afterEmit等）
- 完成构建

### 5. 关键路径优化
- 缓存利用
- 并行处理
- 增量编译
- 持久化缓存`
  },
  {
    id: 211,
    title: "Webpack热更新原理",
    tags: ["Webpack", "HMR", "热更新"],
    difficulty: "困难",
    code: `// HMR工作流程伪代码
// 1. 客户端建立WebSocket连接
const socket = new WebSocket('ws://localhost:8080');

// 2. 服务端监听文件变化
compiler.watch({}, (err) => {
  // 文件变化时生成新hash
  const newHash = generateHash();
  
  // 发送hash到客户端
  socket.send(JSON.stringify({ type: 'hash', data: newHash }));
  
  // 发送更新模块信息
  socket.send(JSON.stringify({ type: 'update', data: changedModules }));
});

// 3. 客户端处理更新
socket.onmessage = (e) => {
  const message = JSON.parse(e.data);
  if (message.type === 'hash') {
    // 保存最新hash
    currentHash = message.data;
  } else if (message.type === 'update') {
    // 获取更新模块
    const updatedModules = message.data;
    
    // 检查模块是否接受更新
    updatedModules.forEach(moduleId => {
      if (module.hot.accept(moduleId)) {
        // 执行更新
        applyUpdate(moduleId);
      }
    });
  }
};`,
    answer: `## HMR热更新原理

### 1. 核心流程
1. 建立WebSocket连接
2. 文件变动触发重新编译
3. 生成差异补丁（manifest）
4. 客户端应用更新

### 2. 关键步骤
- **文件监听**：通过文件系统watch机制
- **增量构建**：只编译修改的模块
- **模块热替换**：保留应用状态更新模块
- **状态保持**：避免页面刷新丢失状态

### 3. 实现细节
- **中间件架构**：webpack-dev-server
- **内存文件系统**：提升速度
- **模块依赖管理**：记录模块关系
- **安全回退**：更新失败自动刷新

### 4. 性能优化
- 仅更新修改的模块
- 避免全量重新加载
- 增量编译
- 客户端缓存管理`
  },
  {
    id: 212,
    title: "常用Webpack Loader",
    tags: ["Webpack", "Loader", "工具"],
    difficulty: "简单",
    code: `// 常见Loader配置
module.exports = {
  module: {
    rules: [
      // 处理CSS
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      
      // 处理图片
      { test: /\.(png|jpg|gif)$/, use: 'file-loader' },
      
      // Babel转译
      { 
        test: /\.js$/, 
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      
      // 处理Vue单文件组件
      { test: /\.vue$/, use: 'vue-loader' }
    ]
  }
};`,
    answer: `## 常用Loader分类

### 1. 文件处理
- **file-loader**：处理文件资源
- **url-loader**：带base64转换的文件加载
- **image-webpack-loader**：图片压缩

### 2. 样式处理
- **css-loader**：解析CSS
- **style-loader**：注入样式到DOM
- **sass-loader**：编译Sass/SCSS
- **postcss-loader**：应用PostCSS插件

### 3. JS处理
- **babel-loader**：ES6+转译
- **ts-loader**：TypeScript编译
- **eslint-loader**：代码检查

### 4. 框架相关
- **vue-loader**：Vue单文件组件
- **react-hot-loader**：React热更新

### 5. 优化类
- **thread-loader**：多进程加速
- **cache-loader**：缓存构建结果`
  },
  {
    id: 213,
    title: "常用Webpack Plugin",
    tags: ["Webpack", "Plugin", "工具"],
    difficulty: "简单",
    code: `// 常用Plugin配置
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [
    // 自动生成HTML
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    
    // 清理构建目录
    new CleanWebpackPlugin(),
    
    // 提取CSS
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    
    // 定义环境变量
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};`,
    answer: `## 常用Plugin分类

### 1. 基础功能
- **HtmlWebpackPlugin**：生成HTML文件
- **CleanWebpackPlugin**：清理构建目录
- **DefinePlugin**：定义全局常量

### 2. 优化相关
- **SplitChunksPlugin**：代码分割
- **CompressionPlugin**：Gzip压缩
- **BundleAnalyzerPlugin**：包分析

### 3. 样式处理
- **MiniCssExtractPlugin**：提取CSS
- **PurgeCSSPlugin**：去除无用CSS

### 4. 开发辅助
- **HotModuleReplacementPlugin**：热更新
- **ProgressPlugin**：显示构建进度

### 5. 性能优化
- **DllPlugin**：动态链接库
- **TerserPlugin**：代码压缩
- **ImageMinimizerPlugin**：图片压缩`
  },
  {
    id: 214,
    title: "Loader与Plugin区别",
    tags: ["Webpack", "Loader", "Plugin"],
    difficulty: "中等",
    code: `// Loader示例：处理CSS
{
  test: /\.css$/,
  use: ['style-loader', 'css-loader']
}

// Plugin示例：生成HTML
new HtmlWebpackPlugin({
  template: './src/index.html'
})`,
    answer: `## Loader vs Plugin

### 1. 核心区别
| 特性         | Loader                  | Plugin                 |
|--------------|-------------------------|------------------------|
| 职责         | 转换文件内容           | 扩展功能               |
| 执行时机     | 模块加载阶段            | 整个构建周期           |
| 使用方式     | 配置在module.rules     | 配置在plugins数组      |
| 输入输出     | 处理单个文件            | 处理整个构建流程       |

### 2. 工作流程差异
- **Loader**：
  1. 匹配文件类型
  2. 按顺序应用Loader
  3. 转换文件内容
  
- **Plugin**：
  1. 监听Webpack事件钩子
  2. 在适当时机执行操作
  3. 可以修改整个构建结果

### 3. 开发方式
- **Loader开发**：
  - 导出一个转换函数
  - 处理输入内容返回新内容
  
- **Plugin开发**：
  - 实现apply方法
  - 监听compiler钩子

### 4. 典型应用
- **Loader**：文件转换、语法转译
- **Plugin**：优化资源、添加功能、修改构建行为`
  },
  {
    id: 215,
    title: "编写自定义Loader",
    tags: ["Webpack", "Loader", "实践"],
    difficulty: "困难",
    code: `// 简单Loader示例：给JS文件添加注释
module.exports = function(source) {
  const header = '// This file is processed by my-loader\\n';
  return header + source;
};

// 异步Loader示例
module.exports = function(source) {
  const callback = this.async();
  
  someAsyncProcess(source, (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};`,
    answer: `## 自定义Loader开发指南

### 1. 基本结构
- 导出一个函数
- 接收源文件内容
- 返回处理后的内容

### 2. 开发要点
- 保持Loader的单一职责
- 处理二进制数据使用raw属性
- 异步处理使用this.async()
- 合理使用缓存（this.cacheable）

### 3. 常用工具
- **loader-utils**：获取Loader参数
- **schema-utils**：参数校验
- **babel**：AST转换

### 4. 测试方法
- 使用jest进行单元测试
- 编写测试用例覆盖不同场景
- 集成到实际项目中验证

### 5. 发布规范
- 命名规范（xxx-loader）
- 提供TypeScript类型定义
- 完善文档和使用示例`
  },
  {
    id: 216,
    title: "编写自定义Plugin",
    tags: ["Webpack", "Plugin", "实践"],
    difficulty: "困难",
    code: `// 简单Plugin示例：构建完成提示
class BuildDonePlugin {
  apply(compiler) {
    compiler.hooks.done.tap('BuildDonePlugin', stats => {
      console.log('Build completed!');
    });
  }
}

// 复杂示例：生成版本文件
class VersionFilePlugin {
  constructor(options) {
    this.options = options;
  }
  
  apply(compiler) {
    compiler.hooks.emit.tapAsync('VersionFilePlugin', (compilation, callback) => {
      const version = new Date().toISOString();
      compilation.assets['version.txt'] = {
        source: () => version,
        size: () => version.length
      };
      callback();
    });
  }
}`,
    answer: `## 自定义Plugin开发指南

### 1. 基本结构
- 类实现apply方法
- 接收compiler参数
- 监听生命周期钩子

### 2. 核心概念
- **Compiler**：整个Webpack实例
- **Compilation**：单次构建过程
- **Tapable**：事件流系统
- **Assets**：生成资源管理

### 3. 常用钩子
- **compile**：开始编译
- **emit**：生成资源到输出目录前
- **done**：构建完成
- **afterEmit**：资源输出后

### 4. 开发技巧
- 使用Tapable管理事件
- 合理处理异步操作
- 修改compilation.assets
- 使用Webpack内置工具类

### 5. 调试方法
- 使用node --inspect调试
- 编写测试用例
- 输出中间状态信息
- 使用webpack-dev-server验证`
  },
  {
    id: 217,
    title: "Webpack构建速度优化",
    tags: ["Webpack", "性能优化", "构建速度"],
    difficulty: "中等",
    code: `// 优化配置示例
module.exports = {
  // 1. 缩小文件搜索范围
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': path.resolve('src')
    }
  },
  
  // 2. 使用缓存
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    }
  },
  
  // 3. 多进程处理
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'thread-loader',
          'babel-loader'
        ]
      }
    ]
  },
  
  // 4. 排除不需要处理的模块
  externals: {
    lodash: '_'
  }
};`,
    answer: `## Webpack构建优化策略

### 1. 通用优化
- 升级Webpack和Node.js版本
- 缩小文件搜索范围
- 合理使用alias
- 减少文件处理数量

### 2. 缓存策略
- 开启持久化缓存（cache.type）
- 使用cache-loader
- HardSourceWebpackPlugin
- Babel缓存（cacheDirectory）

### 3. 并行处理
- thread-loader
- parallel-webpack
- HappyPack（已弃用）

### 4. 代码优化
- 代码分割（SplitChunks）
- 按需加载
- 减少polyfill体积
- 使用DLL预编译

### 5. 开发优化
- 优化source map生成
- 禁用生产环境优化
- 使用webpack-dev-middleware`
  },
  {
    id: 218,
    title: "Webpack魔法注释",
    tags: ["Webpack", "魔法注释", "代码分割"],
    difficulty: "中等",
    code: `// 动态导入命名chunk
import(/* webpackChunkName: "lodash" */ 'lodash')
  .then(_ => {
    // 使用lodash
  });

// 预加载/预获取
const Login = () => import(
  /* webpackPrefetch: true */
  /* webpackPreload: true */
  './Login'
);

// 指定模式
import(
  /* webpackMode: "lazy" */
  './module'
);`,
    answer: `## Webpack魔法注释详解

### 1. 常用注释
- **webpackChunkName**：命名代码块
- **webpackPrefetch**：预获取资源
- **webpackPreload**：预加载资源
- **webpackMode**：指定加载模式
- **webpackInclude**/Exclude：过滤模块

### 2. 使用场景
- 路由懒加载
- 按需加载第三方库
- 优化首屏加载速度
- 资源优先级控制

### 3. 注意事项
- 需要配合babel插件使用
- 注释必须符合JSON格式
- 避免过度预加载
- 合理命名chunk

### 4. 性能影响
- 合理使用可提升加载性能
- 不当使用可能浪费带宽
- 需要平衡首屏和后续加载速度
- 结合浏览器缓存策略`
  },
  {
    id: 219,
    title: "Webpack代码分割案例",
    tags: ["Webpack", "代码分割", "实践"],
    difficulty: "中等",
    code: `// 动态导入实现代码分割
button.addEventListener('click', () => {
  import('./math.js').then(math => {
    console.log(math.add(16, 26));
  });
});

// SplitChunks配置
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};`,
    answer: `## Webpack代码分割策略

### 1. 分割方式
- 入口起点：entry配置多个入口
- 动态导入：import()语法
- SplitChunks：公共代码提取

### 2. 优化技巧
- 按路由分割代码
- 提取公共依赖
- 分离第三方库
- 运行时代码单独打包

### 3. 性能考量
- 减少初始加载体积
- 利用浏览器缓存
- 平衡chunk数量
- 预加载关键资源

### 4. 监控分析
- 使用webpack-bundle-analyzer
- 查看chunk大小
- 分析重复依赖
- 优化模块归属`
  },
  {
    id: 220,
    title: "Webpack与Vite对比",
    tags: ["Webpack", "Vite", "对比"],
    difficulty: "中等",
    code: `// Vite配置示例
// vite.config.js
export default {
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src')
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          lodash: ['lodash']
        }
      }
    }
  }
};`,
    answer: `## Webpack vs Vite

### 1. 核心差异
| 特性         | Webpack              | Vite                |
|--------------|----------------------|---------------------|
| 构建方式     | 打包所有资源         | 原生ESM按需加载     |
| 开发速度     | 较慢（全量构建）     | 极快（按需编译）    |
| 配置复杂度   | 高                   | 低                  |
| 生态         | 丰富                 | 快速成长中          |
| 生产构建     | 优化完善             | 基于Rollup          |

### 2. 适用场景
- **Webpack**：
  - 复杂项目构建
  - 需要深度定制
  - 历史项目维护
  
- **Vite**：
  - 现代浏览器项目
  - 快速启动新项目
  - 开发体验优先

### 3. 迁移考虑
- 项目规模
- 浏览器支持需求
- 现有配置复杂度
- 团队熟悉程度

### 4. 未来趋势
- 逐步转向ESM标准
- 构建工具轻量化
- 开发体验优化
- 更智能的代码分割`
  }
];

export default questions220;