const questions140 = [
  {
    id: 131,
    title: "实现一个节流函数",
    tags: ["节流", "性能优化", "函数"],
    difficulty: "中等",
    code: `function throttle(fn, delay, options = { leading: true, trailing: true }) {
  let lastExec = 0;
  let timer = null;
  let lastArgs = null;

  return function(...args) {
    const context = this;
    const now = Date.now();
    lastArgs = args;

    if (options.leading && !timer) {
      if (now - lastExec >= delay) {
        execute();
      } else {
        schedule();
      }
    } else {
      schedule();
    }

    function execute() {
      fn.apply(context, lastArgs);
      lastExec = Date.now();
      timer = null;
    }

    function schedule() {
      if (!timer && options.trailing) {
        timer = setTimeout(() => {
          execute();
        }, delay - (now - lastExec));
      }
    }
  };
}

// 使用示例
const scrollHandler = throttle(() => {
  console.log('Scrolling');
}, 200);

window.addEventListener('scroll', scrollHandler);`,
    answer: `## 节流函数实现详解

### 1. 节流原理
- 在指定时间间隔内只执行一次
- 稀释高频事件触发频率
- 保持事件处理函数的执行节奏

### 2. 参数说明
- fn: 要执行的函数
- delay: 时间间隔（毫秒）
- options: { leading: 是否立即执行, trailing: 是否在间隔结束时执行 }

### 3. 应用场景
- 滚动事件处理
- 窗口resize事件
- 鼠标移动事件
- 游戏中的按键处理

### 4. 与防抖区别
|          | 节流                     | 防抖                     |
|----------|--------------------------|--------------------------|
| 触发频率 | 固定间隔                 | 停止触发后执行           |
| 适用场景 | 持续高频事件             | 单次触发事件             |
| 示例     | 滚动加载                 | 搜索建议                 |

### 5. 高级功能
- 取消功能
- 立即执行控制
- 最后一次调用保证

### 6. 性能优化
- 使用requestAnimationFrame（适合动画）
- 合理设置时间间隔
- 避免内存泄漏（及时取消）`
  },
  {
    id: 132,
    title: "实现图片上传并预览",
    tags: ["文件", "上传", "DOM"],
    difficulty: "中等",
    code: `// HTML: <input type="file" accept="image/*" id="uploader">
const uploader = document.getElementById('uploader');
const preview = document.createElement('div');
preview.style.display = 'flex';
document.body.appendChild(preview);

uploader.addEventListener('change', function(e) {
  const files = Array.from(e.target.files);
  
  files.forEach(file => {
    if (!file.type.startsWith('image/')) return;
    
    const reader = new FileReader();
    reader.onload = function(event) {
      const img = new Image();
      img.src = event.target.result;
      img.style.maxWidth = '200px';
      preview.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
});

// 上传到服务器
async function uploadToServer(file) {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    return await response.json();
  } catch (error) {
    console.error('Upload failed:', error);
  }
}`,
    answer: `## 图片上传与预览实现

### 1. 实现步骤
1. 监听文件输入变化
2. 验证文件类型
3. 使用FileReader读取文件
4. 创建Image对象预览
5. 使用FormData上传

### 2. 关键API
- FileReader
- URL.createObjectURL
- FormData
- fetch

### 3. 优化技巧
- 限制文件大小
- 压缩图片
- 多图上传
- 进度显示
- 错误处理

### 4. 安全考虑
- 文件类型验证
- 文件重命名
- 病毒扫描
- 访问控制

### 5. 扩展功能
- 拖拽上传
- 粘贴上传
- 图片裁剪
- EXIF信息处理`
  },
  {
    id: 133,
    title: "获取当前日期（年-月-日）",
    tags: ["日期", "格式化"],
    difficulty: "简单",
    code: `// 方法1: 使用Date方法
function getCurrentDate1() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return \`\${year}-\${month}-\${day}\`;
}

// 方法2: 使用toISOString
function getCurrentDate2() {
  return new Date().toISOString().split('T')[0];
}

// 方法3: 使用Intl.DateTimeFormat
const formatter = new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
});
function getCurrentDate3() {
  const parts = formatter.formatToParts(new Date());
  const year = parts.find(p => p.type === 'year').value;
  const month = parts.find(p => p.type === 'month').value;
  const day = parts.find(p => p.type === 'day').value;
  return \`\${year}-\${month}-\${day}\`;
}

console.log(getCurrentDate1()); // 2023-08-04`,
    answer: `## 日期格式化方法对比

### 1. 方法比较
| 方法               | 优点                     | 缺点                     |
|--------------------|--------------------------|--------------------------|
| 手动拼接           | 兼容性好                 | 代码冗长                 |
| toISOString        | 简洁                     | 时区问题                 |
| Intl.DateTimeFormat | 本地化支持               | 兼容性需要polyfill       |

### 2. 时区处理
- toISOString返回UTC时间
- 使用getTimezoneOffset处理本地时间
- 使用Intl API自动处理时区

### 3. 日期库推荐
- date-fns
- day.js
- moment.js（已停止维护）

### 4. 注意事项
- 月份从0开始
- 日期补零处理
- 夏令时问题
- 不同浏览器差异`
  },
  {
    id: 134,
    title: "实现 once 函数",
    tags: ["函数", "闭包"],
    difficulty: "中等",
    code: `function once(fn) {
  let called = false;
  let result;
  
  return function(...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}

// 使用示例
const initialize = once(() => {
  console.log('Initialized');
  return 'done';
});

initialize(); // 'Initialized' 返回 'done'
initialize(); // 无输出 返回 'done'

// 支持重置
function resettableOnce(fn) {
  let called = false;
  let result;
  
  const wrapper = function(...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
  
  wrapper.reset = () => {
    called = false;
    result = undefined;
  };
  
  return wrapper;
}`,
    answer: `## 单次执行函数实现

### 1. 实现原理
- 使用闭包记录调用状态
- 第一次调用执行原函数
- 后续调用直接返回缓存结果

### 2. 应用场景
- 单例初始化
- 支付按钮防重复点击
- 全局配置设置
- 缓存计算结果

### 3. 扩展功能
- 重置功能
- 异步支持
- 错误处理
- 参数记忆

### 4. 注意事项
- this绑定
- 参数传递
- 内存管理
- 并发调用处理

### 5. 性能优化
- 使用WeakMap存储多个函数的单次状态
- 惰性初始化
- 结果缓存时间控制`
  },
  {
    id: 135,
    title: "实现私有变量访问器",
    tags: ["封装", "私有变量"],
    difficulty: "中等",
    code: `// 使用闭包
function createCounter() {
  let count = 0;
  
  return {
    get() {
      return count;
    },
    set(value) {
      if (typeof value === 'number') {
        count = value;
      }
    },
    increment() {
      count++;
    }
  };
}

// 使用Symbol
const _count = Symbol('count');
class Counter {
  constructor() {
    this[_count] = 0;
  }
  
  get count() {
    return this[_count];
  }
  
  set count(value) {
    if (typeof value === 'number') {
      this[_count] = value;
    }
  }
}

// 使用WeakMap
const privateData = new WeakMap();
class SecureCounter {
  constructor() {
    privateData.set(this, { count: 0 });
  }
  
  get count() {
    return privateData.get(this).count;
  }
  
  set count(value) {
    if (typeof value === 'number') {
      privateData.get(this).count = value;
    }
  }
}`,
    answer: `## 私有变量实现方式

### 1. 闭包方式
- 真正的私有
- 每个实例独立
- 内存占用较高

### 2. Symbol方式
- 非真正私有（Object.getOwnPropertySymbols可获取）
- 类实例共享Symbol
- 较安全

### 3. WeakMap方式
- 真正的私有
- 内存管理更优
- 需要维护WeakMap

### 4. ES2022私有字段
\`\`\`js
class Counter {
  #count = 0;
  
  get count() {
    return this.#count;
  }
  
  set count(value) {
    if (typeof value === 'number') {
      this.#count = value;
    }
  }
}
\`\`\`

### 5. 应用场景
- 状态封装
- 数据验证
- 访问控制
- 日志记录

### 6. 设计原则
- 最小暴露原则
- 数据不可变性
- 访问控制粒度
- 防御性编程`
  },
  {
    id: 136,
    title: "封装原生Ajax为Promise",
    tags: ["Ajax", "Promise", "封装"],
    difficulty: "中等",
    code: `function ajax(url, options = {}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const { method = 'GET', data = null, headers = {} } = options;

    xhr.open(method, url);
    
    // 设置请求头
    Object.entries(headers).forEach(([key, value]) => {
      xhr.setRequestHeader(key, value);
    });

    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = xhr.responseType === 'json' 
            ? xhr.response 
            : JSON.parse(xhr.responseText);
          resolve(response);
        } catch (e) {
          reject(new Error('Parse error'));
        }
      } else {
        reject(new Error(xhr.statusText));
      }
    };

    xhr.onerror = function() {
      reject(new Error('Network error'));
    };

    xhr.send(data);
  });
}

// 使用示例
ajax('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  data: JSON.stringify({ key: 'value' })
})
  .then(data => console.log(data))
  .catch(error => console.error(error));`,
    answer: `## Ajax封装要点

### 1. 功能特性
- 支持所有HTTP方法
- 自动处理JSON
- 自定义请求头
- 错误处理

### 2. 错误处理
- 网络错误
- HTTP状态码错误
- JSON解析错误
- 超时处理

### 3. 扩展功能
- 取消请求
- 超时控制
- 进度监控
- 请求拦截

### 4. 替代方案
- fetch API
- axios
- jQuery.ajax

### 5. 安全考虑
- CSRF防护
- CORS处理
- 请求限流
- 敏感数据加密

### 6. 性能优化
- 请求缓存
- 批量请求
- 请求去重
- 压缩传输`
  },
  {
    id: 137,
    title: "实现 sleep 函数",
    tags: ["异步", "定时器"],
    difficulty: "简单",
    code: `// 基础版本
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 使用示例
async function demo() {
  console.log('开始');
  await sleep(2000);
  console.log('2秒后');
}

// 支持取消
function cancellableSleep(ms) {
  let timeoutId;
  const promise = new Promise(resolve => {
    timeoutId = setTimeout(resolve, ms);
  });
  promise.cancel = () => clearTimeout(timeoutId);
  return promise;
}

// 使用AbortController
function abortableSleep(ms, signal) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(resolve, ms);
    signal.addEventListener('abort', () => {
      clearTimeout(timeoutId);
      reject(new DOMException('Aborted', 'AbortError'));
    });
  });
}`,
    answer: `## 休眠函数实现解析

### 1. 实现原理
- 使用setTimeout和Promise
- 返回可等待的Promise
- 支持异步/await语法

### 2. 应用场景
- 模拟延迟
- 轮询间隔
- 动画控制
- 节流/防抖

### 3. 高级功能
- 取消功能
- 进度通知
- 精确计时
- 多任务协调

### 4. 替代方案
- requestAnimationFrame（用于动画）
- setInterval（周期性任务）
- Atomics.wait（Worker线程）

### 5. 注意事项
- 内存泄漏（及时清理）
- 精度问题（setTimeout不精确）
- 浏览器后台节流

### 6. 性能优化
- 使用Web Worker保持计时精度
- 使用performance.now高精度计时
- 批量处理休眠任务`
  },
  {
    id: 138,
    title: "实现图片下载功能",
    tags: ["下载", "Blob", "URL"],
    difficulty: "中等",
    code: `// 从URL下载
function downloadImage(url, filename = 'image') {
  fetch(url)
    .then(response => response.blob())
    .then(blob => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
      URL.revokeObjectURL(link.href);
    });
}

// 从Canvas下载
function downloadCanvas(canvas, filename = 'image.png') {
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL();
  link.click();
}

// 处理跨域图片
function downloadCrossOriginImage(url) {
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = function() {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    downloadCanvas(canvas);
  };
  img.src = url + '?t=' + Date.now(); // 避免缓存
}`,
    answer: `## 图片下载实现方案

### 1. 实现方式
- 使用a标签download属性
- 使用Blob和ObjectURL
- Canvas转DataURL
- 服务端代理下载

### 2. 跨域处理
- 设置crossOrigin属性
- 使用代理服务器
- 服务端设置CORS

### 3. 格式支持
- PNG
- JPEG
- WebP
- SVG

### 4. 安全限制
- 同源策略
- 浏览器安全设置
- 文件类型限制
- 用户手势要求（某些浏览器）

### 5. 优化技巧
- 图片压缩
- 批量下载
- 进度显示
- 错误重试

### 6. 扩展功能
- 图片编辑后下载
- 多图打包下载
- EXIF信息保留
- 下载统计`
  },
  {
    id: 139,
    title: "前端添加水印",
    tags: ["水印", "Canvas", "DOM"],
    difficulty: "中等",
    code: `function addWatermark(text, options = {}) {
  const {
    container = document.body,
    fontSize = 16,
    color = 'rgba(0,0,0,0.15)',
    angle = -30,
    gap = 100
  } = options;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // 计算水印尺寸
  ctx.font = \`\${fontSize}px sans-serif\`;
  const textWidth = ctx.measureText(text).width;
  const size = Math.sqrt(textWidth ** 2 + fontSize ** 2);
  
  canvas.width = size + gap;
  canvas.height = size + gap;
  
  // 绘制水印
  ctx.translate(canvas.width/2, canvas.height/2);
  ctx.rotate(angle * Math.PI / 180);
  ctx.fillStyle = color;
  ctx.font = \`\${fontSize}px sans-serif\`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 0, 0);

  // 创建全屏水印
  const watermark = document.createElement('div');
  watermark.style.position = 'fixed';
  watermark.style.top = '0';
  watermark.style.left = '0';
  watermark.style.width = '100%';
  watermark.style.height = '100%';
  watermark.style.pointerEvents = 'none';
  watermark.style.backgroundImage = \`url(\${canvas.toDataURL()})\`;
  watermark.style.backgroundRepeat = 'repeat';
  
  container.appendChild(watermark);
  
  // 防止删除
  const observer = new MutationObserver(() => {
    if (!watermark.parentNode) {
      container.appendChild(watermark);
    }
  });
  observer.observe(container, { childList: true });
  
  return watermark;
}`,
    answer: `## 前端水印实现详解

### 1. 实现原理
- 使用Canvas生成水印图案
- 通过CSS背景重复平铺
- 使用MutationObserver防止删除

### 2. 安全措施
- 禁止指针事件（pointer-events: none）
- 监控DOM变化
- 动态生成水印
- 服务端叠加水印

### 3. 水印类型
- 文字水印
- 图片水印
- 二维码水印
- 动态水印

### 4. 破解防护
- 禁用JavaScript
- 修改CSS
- 删除DOM节点
- 截图处理

### 5. 优化方向
- 性能优化（使用CSS代替Canvas）
- 响应式水印
- 动态水印（包含用户信息）
- 加密水印

### 6. 法律问题
- 用户隐私保护
- 版权声明
- 数据安全法规
- 用户协议告知`
  },
  {
    id: 140,
    title: "实现响应式数据与依赖收集",
    tags: ["响应式", "Vue原理", "观察者模式"],
    difficulty: "困难",
    code: `class Dep {
  constructor() {
    this.subscribers = new Set();
  }

  depend() {
    if (activeEffect) {
      this.subscribers.add(activeEffect);
    }
  }

  notify() {
    this.subscribers.forEach(effect => effect());
  }
}

let activeEffect = null;

function watchEffect(effect) {
  activeEffect = effect;
  effect();
  activeEffect = null;
}

class ReactiveObject {
  constructor(obj) {
    this.deps = new Map();
    
    return new Proxy(obj, {
      get(target, key) {
        let dep = this.deps.get(key);
        if (!dep) {
          dep = new Dep();
          this.deps.set(key, dep);
        }
        dep.depend();
        return Reflect.get(target, key);
      },
      set(target, key, value) {
        const result = Reflect.set(target, key, value);
        const dep = this.deps.get(key);
        if (dep) {
          dep.notify();
        }
        return result;
      }
    });
  }
}

// 使用示例
const state = new ReactiveObject({ count: 0 });

watchEffect(() => {
  console.log('Count:', state.count);
});

state.count++; // 触发更新`,
    answer: `## 响应式系统实现原理

### 1. 核心概念
- **依赖收集**：跟踪数据访问
- **观察者模式**：维护依赖列表
- **代理对象**：拦截属性访问

### 2. 实现步骤
1. 创建响应式对象（Proxy）
2. 属性访问时收集依赖（getter）
3. 属性修改时触发更新（setter）
4. 维护依赖关系（Dep类）

### 3. 关键组件
- **Dep**：依赖管理器
- **watchEffect**：副作用注册
- **ReactiveObject**：响应式对象包装

### 4. 优化方向
- 嵌套对象处理
- 数组方法重写
- 计算属性
- 批量更新
- 虚拟DOM集成

### 5. 与Vue3对比
- Vue3使用Proxy
- Vue2使用Object.defineProperty
- 性能优化（惰性依赖收集）

### 6. 扩展应用
- 状态管理
- 自动UI更新
- 数据校验
- 撤销/重做`
  }
];

export default questions140;