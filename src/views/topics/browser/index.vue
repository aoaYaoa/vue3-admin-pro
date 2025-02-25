<template>
  <div class="topic-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <h2>浏览器 题目</h2>
          <el-input
            v-model="searchText"
            placeholder="搜索题目..."
            prefix-icon="Search"
            clearable
            style="width: 300px"
          />
        </div>
      </template>
      
      <el-table
        :data="filteredTopics"
        style="width: 100%"
        row-key="id"
        border
        highlight-current-row
        @row-click="handleRowClick"
      >
        <el-table-column type="index" width="60" align="center" />
        <el-table-column prop="title" label="题目" min-width="250">
          <template #default="{ row }">{{ row.title }}</template>
        </el-table-column>
        <el-table-column prop="tags" label="标签" width="250">
          <template #default="{ row }">
            <el-tag v-for="tag in row.tags" :key="tag" class="tag-item">{{ tag }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="difficulty" label="难度" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="getDifficultyType(row.difficulty)">{{ row.difficulty }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
      
      <!-- 题目详情抽屉 -->
      <el-drawer
        v-model="drawerVisible"
        :title="currentTopic?.title"
        size="50%"
        direction="rtl"
        destroy-on-close
        :close-on-click-modal="false"
      >
        <div v-if="currentTopic" class="topic-detail-drawer">
          <div class="topic-meta-header">
            <el-tag v-for="tag in currentTopic.tags" :key="tag" class="topic-tag">{{ tag }}</el-tag>
            <el-tag :type="getDifficultyType(currentTopic.difficulty)" class="topic-difficulty">
              {{ currentTopic.difficulty }}
            </el-tag>
          </div>
          
          <el-divider content-position="left">问题详情</el-divider>
          
          <div class="topic-content">
            <div class="topic-question">
              <h3>{{ currentTopic.title }}</h3>
              <div class="topic-description" v-html="currentTopic.description"></div>
            </div>
            
            <el-divider content-position="left">参考答案</el-divider>
            
            <div class="topic-answer" v-html="currentTopic.answer"></div>
            
            <!-- 代码示例 -->
            <div class="code-example" v-if="currentTopic.code">
              <el-divider content-position="left">代码示例</el-divider>
              <pre class="code-block">{{ currentTopic.code }}</pre>
            </div>
          </div>
        </div>
      </el-drawer>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'

// 保留 Search 图标引用，确保它在模板中被使用
// 例如在模板中的搜索输入框：<el-input prefix-icon="Search" ... />
const searchIcon = Search

interface Topic {
  id: number
  title: string
  description: string
  answer: string
  tags: string[]
  difficulty: string
  code?: string
}

// 题目列表
const topicList = ref<Topic[]>([
  {
    id: 226,
    title: 'V8 垃圾回收机制',
    description: 'V8 JavaScript引擎如何处理垃圾回收？描述其使用的主要算法和机制。',
    answer: 'V8引擎使用两种垃圾回收器：新生代(Scavenge)和老生代(Mark-Sweep & Mark-Compact)。\n\n新生代：对于存活时间短的对象，V8采用Scavenge算法，将内存分为两个半空间（From和To），垃圾回收时将From空间中的存活对象复制到To空间，然后清空From空间。\n\n老生代：对于存活时间长的对象，V8使用标记-清除(Mark-Sweep)和标记-整理(Mark-Compact)算法。标记-清除先标记活动对象，然后清除未标记对象；标记-整理在此基础上还会整理内存碎片。\n\nV8还使用了增量标记、惰性清理等优化策略，减少垃圾回收导致的主线程暂停时间。',
    tags: ['V8引擎', '垃圾回收', '内存管理'],
    difficulty: '中等',
    code: 'console.log("V8垃圾回收示例");'
  },
  {
    id: 227,
    title: 'localStorage 、sessionStorage 与 cookies 的区别',
    description: '解释 localStorage、sessionStorage 和 cookies 之间的主要区别，包括存储限制、生命周期和使用场景。',
    answer: 'localStorage、sessionStorage 和 cookies 的主要区别：\n\n1. 存储容量：\n- localStorage 和 sessionStorage 通常有5MB左右（取决于浏览器）\n- cookies 通常限制在4KB左右\n\n2. 生命周期：\n- localStorage：永久存储，除非手动清除\n- sessionStorage：仅在当前会话(窗口/标签页)有效，关闭则清除\n- cookies：可设置过期时间，默认为会话cookies\n\n3. 作用域：\n- localStorage：同源所有窗口共享\n- sessionStorage：仅同源同窗口共享\n- cookies：同源所有窗口共享，可通过path属性限制\n\n4. 自动发送：\n- cookies：每次HTTP请求自动发送到服务器\n- localStorage/sessionStorage：不会自动发送\n\n5. 适用场景：\n- localStorage：长期存储用户设置、主题等\n- sessionStorage：表单临时数据、单次会话状态\n- cookies：需要服务器访问的数据、身份验证等',
    tags: ['存储', 'Web API', '缓存'],
    difficulty: '简单',
    code: 'localStorage.setItem("key", "value");\nconst value = localStorage.getItem("key");\nlocalStorage.removeItem("key");'
  },
  {
    id: 228,
    title: '浏览器的事件循环机制',
    description: '详细解释浏览器的事件循环(Event Loop)机制，包括宏任务、微任务以及它们的执行顺序。',
    answer: '浏览器的事件循环机制是JavaScript处理异步操作的核心。\n\n主要组成部分：\n1. 调用栈(Call Stack)：执行JavaScript代码的地方，同步任务在此执行\n2. 任务队列：\n   - 宏任务队列(Macrotask Queue)：存放setTimeout、setInterval、I/O、UI渲染等任务\n   - 微任务队列(Microtask Queue)：存放Promise回调、MutationObserver、queueMicrotask()等任务\n\n执行顺序：\n1. 执行调用栈中的同步代码\n2. 调用栈清空后，检查微任务队列，执行所有微任务\n3. 执行一个宏任务\n4. 再次检查微任务队列，执行所有微任务\n5. 进行UI渲染(如果需要)\n6. 回到步骤3，循环往复\n\n这种机制确保了微任务总是在下一个宏任务之前执行完毕，使Promise等异步API能够尽快得到处理。',
    tags: ['事件循环', 'JavaScript', '异步'],
    difficulty: '中等',
    code: 'console.log("1"); // 同步任务\nsetTimeout(() => console.log("2"), 0); // 宏任务\nPromise.resolve().then(() => console.log("3")); // 微任务\nconsole.log("4"); // 同步任务\n\n// 执行顺序: 1, 4, 3, 2'
  },
  {
    id: 229,
    title: '浏览器渲染过程',
    description: '描述浏览器从接收HTML到页面渲染的完整过程。',
    answer: '浏览器渲染过程包括以下步骤：\n\n1. 解析HTML：将HTML解析成DOM树\n2. 解析CSS：将CSS解析成CSSOM树\n3. 合并：将DOM和CSSOM合并成渲染树(Render Tree)\n4. 布局(Layout/Reflow)：计算每个可见元素的尺寸和位置\n5. 绘制(Paint)：将渲染树中的各个节点绘制到屏幕上\n6. 合成(Composite)：将绘制的各个图层合成为最终页面\n\n这个过程中，JavaScript会阻塞解析，因为它可能修改DOM；CSS不会阻塞HTML解析，但会阻塞渲染。\n\n现代浏览器采用了各种优化技术：\n- 预加载扫描器(Preload Scanner)：提前发现并加载外部资源\n- 渐进式渲染：不等待所有内容加载完成就开始显示部分内容\n- 硬件加速：利用GPU加速某些渲染操作',
    tags: ['渲染', 'DOM', 'CSSOM'],
    difficulty: '中等',
    code: '// 性能优化示例\ndocument.addEventListener("DOMContentLoaded", () => {\n  console.log("DOM完全加载和解析");\n});\nwindow.addEventListener("load", () => {\n  console.log("页面及所有资源加载完成");\n});'
  },
  {
    id: 230,
    title: '浏览器缓存机制',
    description: '解释浏览器的缓存机制，包括强缓存、协商缓存及相关的HTTP头。',
    answer: '浏览器缓存机制主要分为两类：强缓存和协商缓存。\n\n1. 强缓存：\n- Cache-Control：最重要的缓存控制头\n  * max-age=seconds：资源有效期\n  * public/private：是否可被中间代理缓存\n  * no-cache：每次使用前需验证\n  * no-store：不缓存任何内容\n- Expires：指定资源过期的绝对时间(HTTP/1.0)\n\n2. 协商缓存：当强缓存失效时使用\n- ETag/If-None-Match：资源的唯一标识符，精确\n- Last-Modified/If-Modified-Since：资源的最后修改时间，不太精确\n\n工作流程：\n1. 浏览器首先检查强缓存\n2. 如果命中强缓存，直接使用本地缓存\n3. 如果强缓存失效，发送请求到服务器验证协商缓存\n4. 如果资源未变化，服务器返回304(Not Modified)，浏览器使用本地缓存\n5. 如果资源已变化，服务器返回200和新资源',
    tags: ['缓存', 'HTTP', '性能优化'],
    difficulty: '中等',
    code: '// 服务端设置缓存头示例(Node.js)\nres.setHeader("Cache-Control", "max-age=86400");\nres.setHeader("ETag", fileHashValue);\nres.setHeader("Last-Modified", fileLastModifiedDate);'
  },
  {
    id: 231,
    title: '跨域资源共享(CORS)',
    description: '什么是CORS？它如何工作？简单请求和预检请求有什么区别？',
    answer: 'CORS(跨域资源共享)是一种浏览器机制，允许受控访问来自不同源的资源。\n\n工作原理：\n- 浏览器自动为跨域请求添加Origin头，指示请求来源\n- 服务器在响应中添加Access-Control-Allow-*头，指示允许的跨域操作\n- 浏览器根据这些响应头决定是否允许访问响应\n\nCORS请求分为两类：\n\n1. 简单请求：符合以下条件\n- 方法为GET、POST或HEAD\n- 仅包含CORS安全的头部\n- Content-Type限制为text/plain、application/x-www-form-urlencoded或multipart/form-data\n\n2. 预检请求：不符合简单请求条件的跨域请求\n- 浏览器先发送OPTIONS请求，获取服务器允许的操作\n- 服务器通过Access-Control-Allow-Methods和Access-Control-Allow-Headers指示允许的方法和头部\n- 只有预检通过，浏览器才会发送实际请求\n\n主要的CORS响应头：\n- Access-Control-Allow-Origin：允许的来源\n- Access-Control-Allow-Methods：允许的HTTP方法\n- Access-Control-Allow-Headers：允许的请求头\n- Access-Control-Allow-Credentials：是否允许携带凭证(cookies)\n- Access-Control-Max-Age：预检请求的缓存时间',
    tags: ['安全', '跨域', 'HTTP'],
    difficulty: '中等',
    code: '// 服务端CORS配置示例(Node.js + Express)\napp.use((req, res, next) => {\n  res.header("Access-Control-Allow-Origin", "https://trusted-site.com");\n  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");\n  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");\n  res.header("Access-Control-Allow-Credentials", "true");\n  \n  if (req.method === "OPTIONS") {\n    return res.sendStatus(204); // 预检请求成功响应\n  }\n  next();\n});'
  },
  {
    id: 232,
    title: 'Web Worker 的使用',
    description: '什么是Web Worker？它有什么用途和限制？如何使用它处理复杂计算？',
    answer: 'Web Worker是一种在后台线程中运行脚本的API，可以执行复杂计算而不阻塞UI线程。\n\n主要特点：\n- 运行在与主线程分离的后台线程中\n- 通过消息机制与主线程通信\n- 不能直接访问DOM、window对象或父页面上的某些API\n- 可以使用计时器、XHR、Fetch等API\n\n类型：\n1. 专用Worker：只能被创建它的脚本访问\n2. 共享Worker：可以被多个脚本共享\n3. Service Worker：作为网络代理，可用于离线缓存\n\n用途：\n- 复杂数据处理和计算\n- 图像/视频处理\n- 数据加密解密\n- 长轮询和WebSocket连接处理\n\n限制：\n- 不能访问DOM和window对象\n- 不能使用某些方法，如alert()\n- 受同源策略限制\n- 创建过多Worker会消耗资源\n\n最佳实践：\n- 仅用于重计算任务\n- 避免过于频繁地传递大量数据\n- 考虑使用SharedArrayBuffer和Atomics API进行更高效的数据共享\n- 使用完毕及时终止不需要的Worker',
    tags: ['多线程', 'JavaScript', '性能'],
    difficulty: '中等',
    code: '// 主线程代码\nconst worker = new Worker("worker.js");\n\n// 发送消息给worker\nworker.postMessage({data: [1, 2, 3, 4], task: "calculate"});\n\n// 接收worker的结果\nworker.onmessage = function(e) {\n  console.log("计算结果:", e.data.result);\n};\n\n// worker.js内容\nself.onmessage = function(e) {\n  const data = e.data.data;\n  let result;\n  \n  // 执行耗时计算\n  if (e.data.task === "calculate") {\n    result = data.map(x => x * x).reduce((a, b) => a + b, 0);\n  }\n  \n  // 返回结果给主线程\n  self.postMessage({result: result});\n};'
  },
  {
    id: 233,
    title: 'Service Worker 与渐进式Web应用',
    description: 'Service Worker的作用是什么？如何使用它实现离线访问和消息推送？',
    answer: 'Service Worker是一种特殊的Web Worker，作为Web应用、浏览器和网络之间的代理，能够拦截网络请求、缓存资源并提供离线访问能力。它是PWA(渐进式Web应用)的核心技术之一。\n\n主要功能：\n1. 网络代理：拦截并处理网络请求\n2. 离线缓存：缓存资源供离线使用\n3. 后台同步：在有网络连接时同步数据\n4. 推送通知：接收服务器推送的消息并显示通知\n\n生命周期：\n- 注册：通过navigator.serviceWorker.register()注册\n- 安装：首次注册或版本更新时触发install事件\n- 激活：新安装成功或旧版本不再使用时触发activate事件\n- 控制页面：激活后开始拦截作用域内页面的请求\n- 终止：空闲时可能被浏览器终止，需要时重新启动\n\n离线访问实现：\n- 使用Cache API缓存静态资源和动态数据\n- 在fetch事件中实现缓存策略(缓存优先、网络优先等)\n- 定期更新缓存内容\n\n消息推送实现：\n- 使用Push API订阅推送服务\n- 将订阅信息发送至服务器\n- 服务器通过Web Push协议发送消息\n- Service Worker接收消息并使用Notification API显示通知\n\n注意事项：\n- 仅在HTTPS环境下可用(localhost除外)\n- 有特定的作用域限制\n- 采用Promise-based API设计\n- 遵循更新生命周期规则',
    tags: ['PWA', '离线应用', '缓存'],
    difficulty: '困难',
    code: '// 注册Service Worker\nif (\'serviceWorker\' in navigator) {\n  navigator.serviceWorker.register(\'/sw.js\')\n    .then(registration => {\n      console.log(\'SW注册成功:\', registration.scope);\n    })\n    .catch(error => {\n      console.error(\'SW注册失败:\', error);\n    });\n}\n\n// sw.js内容\nconst CACHE_NAME = \'my-site-v1\';\nconst urlsToCache = [\n  \'/\',\n  \'/styles/main.css\',\n  \'/scripts/main.js\',\n  \'/images/logo.png\'\n];\n\n// 安装事件 - 缓存资源\nself.addEventListener(\'install\', event => {\n  event.waitUntil(\n    caches.open(CACHE_NAME)\n      .then(cache => cache.addAll(urlsToCache))\n  );\n});\n\n// 拦截请求 - 实现离线访问\nself.addEventListener(\'fetch\', event => {\n  event.respondWith(\n    caches.match(event.request)\n      .then(response => {\n        // 缓存命中，返回缓存的资源\n        if (response) {\n          return response;\n        }\n        \n        // 缓存未命中，从网络获取\n        return fetch(event.request).then(response => {\n          // 检查是否有效响应\n          if (!response || response.status !== 200 || response.type !== \'basic\') {\n            return response;\n          }\n          \n          // 克隆响应以缓存\n          const responseToCache = response.clone();\n          caches.open(CACHE_NAME).then(cache => {\n            cache.put(event.request, responseToCache);\n          });\n          \n          return response;\n        });\n      })\n  );\n});'
  },
  {
    id: 234,
    title: '浏览器安全机制',
    description: '讨论浏览器的安全机制，如同源策略、内容安全策略(CSP)以及如何防御常见的Web攻击。',
    answer: '浏览器安全机制是防止恶意网站攻击用户的关键防线，主要包括：\n\n1. 同源策略(Same-Origin Policy)：\n- 网页只能访问来自相同源(协议+主机+端口)的资源\n- 限制对DOM、Cookie、LocalStorage、XMLHttpRequest等的跨域访问\n- 可通过CORS、JSONP、postMessage等技术有限度地突破\n\n2. 内容安全策略(CSP)：\n- 通过HTTP头或meta标签指定允许加载的资源来源\n- 限制内联脚本和样式的执行\n- 控制表单提交、iframe嵌入、WebSocket连接等\n- 提供报告功能，记录违规尝试\n\n3. HTTPS和TLS：\n- 加密传输数据，防止中间人攻击\n- 验证服务器身份，防止钓鱼\n\n4. 沙箱隔离：\n- 限制浏览器标签页间的互相访问\n- iframe沙箱属性进一步限制嵌入内容\n\n5. 其他安全机制：\n- SRI(子资源完整性)：验证外部资源完整性\n- HSTS：强制使用HTTPS\n- X-XSS-Protection：提供XSS过滤\n- X-Frame-Options：控制iframe嵌入\n\n防御主要Web攻击：\n\n1. XSS(跨站脚本)防御：\n- 对用户输入进行转义\n- 使用CSP限制脚本来源\n- 设置HttpOnly和Secure cookie标志\n\n2. CSRF(跨站请求伪造)防御：\n- 使用CSRF令牌\n- 验证Referer/Origin头\n- SameSite cookie属性\n\n3. 点击劫持防御：\n- X-Frame-Options头\n- CSP\'s frame-ancestors指令\n\n4. 注入攻击防御：\n- 参数化查询替代字符串拼接\n- 输入验证和净化\n- 最小权限原则',
    tags: ['安全', 'XSS', 'CSRF'],
    difficulty: '困难',
    code: '// CSP 实现示例\n// 服务器响应头设置\nres.setHeader("Content-Security-Policy", "default-src \'self\'; script-src \'self\' https://trusted-cdn.com; img-src *");\n\n// 或HTML中设置\n// <meta http-equiv="Content-Security-Policy" content="default-src \'self\'; script-src \'self\' https://trusted-cdn.com">\n\n// XSS防御：输入转义\nfunction escapeHTML(str) {\n  return str.replace(/[&<>"\']/g, m => ({\n    \'&\': \'&amp;\',\n    \'<\': \'&lt;\',\n    \'>\': \'&gt;\',\n    \'"\': \'&quot;\',\n    "\'": \'&#39;\'\n  }[m]));\n}\n\n// CSRF防御：令牌实现\nconst csrfToken = generateRandomToken();\nsession.csrfToken = csrfToken;\n\n// 在表单中包含令牌\n// <input type="hidden" name="_csrf" value="{{ csrfToken }}">\n\n// 在提交处理中验证令牌\nif (req.body._csrf !== req.session.csrfToken) {\n  return res.status(403).send("CSRF验证失败");\n}'
  },
  {
    id: 235,
    title: 'IndexedDB与客户端存储',
    description: 'IndexedDB的特点与使用方法，以及它与其他存储方案的比较。',
    answer: 'IndexedDB是一个底层API，用于在客户端存储大量结构化数据，提供了丰富的查询能力和更高的存储限制。\n\n主要特点：\n1. 存储容量大：通常限制为设备可用空间的50%，远超其他存储方案\n2. 异步API：所有操作都是异步的，不会阻塞主线程\n3. 事务性：支持事务，确保数据一致性\n4. 键值存储：每条记录由键标识，支持多种数据类型\n5. 索引支持：可以创建索引加速查询\n6. 支持二进制数据：可以存储文件、图像等\n\n基本概念：\n- 数据库(Database)：顶层容器\n- 对象仓库(Object Store)：类似表格\n- 索引(Index)：加速查询的结构\n- 事务(Transaction)：操作单元\n- 游标(Cursor)：遍历结果集\n\n与其他存储方案比较：\n\n1. Cookies:\n- 容量小(4KB)vs IndexedDB(大)\n- 自动随请求发送 vs 仅在客户端\n- 简单字符串 vs 复杂结构化数据\n\n2. LocalStorage/SessionStorage:\n- 同步API vs 异步API\n- 容量小(5-10MB) vs 大(无固定限制)\n- 只能存字符串 vs 可存任何类型\n- 无索引查询 vs 有索引和查询\n\n3. Cache API:\n- 主要用于资源缓存 vs 用于应用数据\n- 无索引检索 vs 有索引和查询\n- 配合Service Worker vs 独立使用\n\n4. WebSQL(已废弃):\n- SQL接口 vs 对象存储接口\n- 不再维护 vs 活跃发展\n\n使用场景：\n- 离线应用数据\n- 大型数据集(如文件、图像)\n- 需要复杂查询的数据\n- 临时缓存数据以减少网络请求',
    tags: ['存储', '数据库', 'Web API'],
    difficulty: '中等',
    code: '// 打开数据库\nconst dbRequest = indexedDB.open("MyDatabase", 1);\n\n// 数据库升级事件\ndbRequest.onupgradeneeded = function(event) {\n  const db = event.target.result;\n  \n  // 创建对象仓库\n  const store = db.createObjectStore("customers", { keyPath: "id" });\n  \n  // 创建索引\n  store.createIndex("name", "name", { unique: false });\n  store.createIndex("email", "email", { unique: true });\n};\n\n// 数据库打开成功\ndbRequest.onsuccess = function(event) {\n  const db = event.target.result;\n  \n  // 创建事务\n  const transaction = db.transaction("customers", "readwrite");\n  const store = transaction.objectStore("customers");\n  \n  // 添加数据\n  store.add({\n    id: 1,\n    name: "John Doe",\n    email: "john@example.com",\n    age: 30\n  });\n  \n  // 查询数据\n  const getRequest = store.get(1);\n  getRequest.onsuccess = function(event) {\n    console.log("获取成功:", event.target.result);\n  };\n  \n  // 使用索引查询\n  const nameIndex = store.index("name");\n  const emailIndex = store.index("email");\n  \n  const emailQuery = emailIndex.get("john@example.com");\n  emailQuery.onsuccess = function(event) {\n    console.log("通过邮箱查询:", event.target.result);\n  };\n  \n  // 使用游标遍历\n  const cursorRequest = store.openCursor();\n  cursorRequest.onsuccess = function(event) {\n    const cursor = event.target.result;\n    if (cursor) {\n      console.log("游标数据:", cursor.value);\n      cursor.continue();\n    }\n  };\n  \n  // 事务完成\n  transaction.oncomplete = function() {\n    console.log("事务完成");\n    db.close();\n  };\n};'
  }
])

// 搜索功能
const searchText = ref('')
const filteredTopics = computed(() => {
  if (!searchText.value) return topicList.value
  
  const keyword = searchText.value.toLowerCase()
  return topicList.value.filter(topic => 
    topic.title.toLowerCase().includes(keyword) || 
    topic.tags.some(tag => tag.toLowerCase().includes(keyword)) ||
    topic.description.toLowerCase().includes(keyword)
  )
})

// 难度颜色映射
const getDifficultyType = (difficulty: string) => {
  switch (difficulty) {
    case '简单': return 'success'
    case '中等': return 'warning'
    case '困难': return 'danger'
    default: return 'info'
  }
}

// 题目详情查看
const drawerVisible = ref(false)
const currentTopic = ref<Topic | null>(null)

const handleRowClick = (row: Topic) => {
  currentTopic.value = row
  drawerVisible.value = true
}

// 添加检查代码确保数据初始化
onMounted(() => {
  console.log('浏览器题目组件已加载', topicList.value)
})

// 这里保留route引用，防止lint错误
const route = useRoute()
console.log('Current route:', route.path)
</script>

<style scoped>
.topic-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h2 {
  margin: 0;
  font-size: 22px;
  font-weight: 500;
}

.tag-item {
  margin-right: 5px;
  margin-bottom: 5px;
}

/* 抽屉中的样式 */
.topic-detail-drawer {
  padding: 20px;
}

.topic-meta-header {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.topic-difficulty {
  margin-left: auto;
}

.topic-content {
  font-size: 16px;
  line-height: 1.6;
}

.topic-question h3 {
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: 500;
}

.topic-description {
  color: #606266;
  margin-bottom: 20px;
}

.topic-answer {
  color: #606266;
  white-space: pre-line;
}

.code-block {
  background-color: #f5f7fa;
  border-radius: 4px;
  padding: 16px;
  overflow-x: auto;
  font-family: monospace;
  line-height: 1.4;
}
</style>
