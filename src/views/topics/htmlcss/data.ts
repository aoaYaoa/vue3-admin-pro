// HTML+CSS 题目列表数据
interface Topic {
    id: number;
    title: string;
    tags: string[];
    difficulty: string;
    code?: string;
    answer?: string;
}

export const topicList: Topic[] = [
    {
        id: 1,
        title: '什么是重绘，什么是回流（reflow）？',
        tags: ['DOM', '性能优化'],
        difficulty: '中等',
        code: `// 触发回流的代码示例
const element = document.getElementById('myElement');
element.style.width = '200px';      // 改变宽度 - 触发回流
element.style.height = '100px';     // 改变高度 - 触发回流
element.style.position = 'absolute'; // 改变定位 - 触发回流

// 只触发重绘的代码示例
element.style.color = 'red';        // 改变颜色 - 只触发重绘
element.style.backgroundColor = 'blue'; // 改变背景色 - 只触发重绘

// 优化写法 - 合并多次样式修改
element.classList.add('new-style'); // 一次性应用多个样式变化

// 使用 transform 替代位置变化 - 减少回流
element.style.transform = 'translateX(100px)'; // 使用GPU加速，不触发回流`,
        answer: `## 重绘 (Repaint)：

重绘是指当元素样式发生改变，但不影响布局的情况下，浏览器重新绘制元素的过程。例如，修改元素的背景颜色、字体颜色等。

## 回流 (Reflow)：

回流是指当元素的布局属性发生改变，需要重新计算元素在页面中的布局位置时，浏览器重新进行布局的过程。例如，修改元素的宽度、高度、位置等。

## 性能影响：

回流的成本比重绘高得多，因为它涉及重新计算元素的几何属性和页面布局。而重绘只需要重新绘制元素的样式。回流必定会引起重绘，而重绘不一定会引起回流。

## 如何减少回流：

1. **使用CSS动画代替JavaScript动画**：CSS动画利用GPU加速，在性能方面通常比JavaScript动画更高效。使用CSS的\`transform\`和\`opacity\`属性来创建动画效果，而不是改变元素的布局属性，如宽度、高度等。

2. **使用translate3d开启硬件加速**：将元素的位置属性设置为\`translate3d(0, 0, 0)\`，可以强制使用GPU加速，这有助于避免回流，并提高动画的流畅度。

3. **避免频繁操作影响布局的样式属性**：当需要对元素进行多次样式修改时，可以考虑将这些修改合并为一次操作。通过添加/移除CSS类来一次性改变多个样式属性，而不是逐个修改。

4. **使用requestAnimationFrame**：通过使用\`requestAnimationFrame\`方法调度动画帧，可以确保动画在浏览器的重绘周期内执行，从而避免不必要的回流。这种方式可确保动画在最佳时间点进行渲染。

5. **使用文档片段(Document Fragment)**：当需要向DOM中插入大量新元素时，可以先将这些元素添加到文档片段中，然后再将整个文档片段一次性插入到DOM中。这样做可以减少回流次数。(虚拟dom vue的方式)

6. **让元素脱离文档流**：position:absolute/position:fixed/float:left，(只减少回流，不是避免回流。)

7. **使用visibility: hidden替代display: none**：\`visibility: hidden\`不会触发回流，因为元素仍然占据空间，只是不可见。而使用\`display: none\`则会将元素从渲染树中移除，引起回流。`
      },
      {
        id: 2,
        title: 'Margin 塌陷问题如何解决？',
        tags: ['CSS', '布局'],
        difficulty: '简单',
        answer: 'Margin塌陷(又称Margin合并)是指在垂直方向上相邻的两个元素，它们的margin会合并成一个margin，值为两者中的较大者。\n\n解决方法：\n\n1. **创建BFC(块级格式化上下文)**：\n   - 给父元素设置`overflow: hidden`或`overflow: auto`\n   - 给父元素设置`display: flow-root`(现代浏览器)\n   - 给父元素设置`float: left/right`(不推荐)\n   - 给父元素设置`position: absolute/fixed`\n\n2. **使用内边距或边框**：\n   - 给父元素设置`padding-top`\n   - 给父元素设置`border-top`\n\n3. **添加空元素**：\n   - 在父元素内部的最前面添加一个空元素，并设置`clear: both`\n\n4. **使用伪元素**：\n   ```css\n   .parent::before {\n     content: "";\n     display: table;\n   }\n   ```\n\n5. **给父元素设置固定高度**（适用于已知高度的情况）'
      },
      {
        id: 3,
        title: '如何隐藏一个元素',
        tags: ['CSS', '显示隐藏'],
        difficulty: '简单',
        answer: 'CSS中隐藏元素的方法：\n\n1. **display: none**\n   - 元素完全从文档流中移除\n   - 不占用空间，不响应事件\n   - 会触发回流和重绘\n\n2. **visibility: hidden**\n   - 元素仍然占用原来的空间\n   - 不响应事件\n   - 只会触发重绘，不触发回流\n\n3. **opacity: 0**\n   - 元素完全透明但仍占用空间\n   - 可以响应事件\n   - 触发重绘，启用GPU加速时性能较好\n\n4. **position + 负值**\n   - 如`position: absolute; left: -9999px;`\n   - 元素被移出可视区域但仍在文档流中\n   - 仍然可以响应事件\n\n5. **transform: scale(0)或transform: translateX(-9999px)**\n   - 元素被缩放为0或移出可视区域\n   - 仍占用原始空间\n   - 性能好，可启用GPU加速\n\n6. **clip-path/clip**\n   - 裁剪元素可见部分\n   - 仍占用空间\n   - 性能较好\n\n7. **height: 0; overflow: hidden**\n   - 适用于需要动画过渡的情况\n   - 不占用垂直空间\n\n选择方法取决于具体需求：是否需要保留空间、是否需要响应事件、性能考虑等。'
      },
      {
        id: 4,
        title: 'overflow 不同值的区别。',
        tags: ['CSS', '样式'],
        difficulty: '简单',
        answer: 'overflow属性控制内容溢出元素框时的表现，有以下值：\n\n1. **visible (默认值)**\n   - 内容不会被裁剪，会显示在元素框之外\n\n2. **hidden**\n   - 内容会被裁剪，不显示超出元素框的部分\n   - 不提供滚动机制\n   - 会创建新的块级格式化上下文(BFC)\n\n3. **scroll**\n   - 内容会被裁剪，但浏览器会提供滚动条\n   - 无论内容是否溢出，都会显示滚动条\n   - 会创建新的BFC\n\n4. **auto**\n   - 仅当内容溢出时，浏览器才提供滚动条\n   - 会创建新的BFC\n\n5. **overlay** (非标准)\n   - 类似于auto，但滚动条绘制在内容之上而不占用空间\n   - 兼容性差，不推荐使用\n\n相关属性：\n- **overflow-x**: 控制水平方向溢出\n- **overflow-y**: 控制垂直方向溢出\n\n应用场景：\n- `hidden`: 裁剪内容，创建BFC防止margin塌陷\n- `auto/scroll`: 创建可滚动区域\n- `visible`: 允许内容超出边界(如下拉菜单)'
      },
      {
        id: 5,
        title: '三栏布局的实现方式（圣杯布局、双飞翼布局等）',
        tags: ['CSS', '布局'],
        difficulty: '中等',
        answer: '三栏布局是指两边固定宽度，中间自适应的布局。常见实现方式：\n\n1. **浮动布局**\n   - 左右两栏分别向左右浮动\n   - 中间栏设置左右margin预留空间\n   - 注意HTML顺序：先写两侧栏，再写中间栏\n\n2. **圣杯布局**\n   - 三栏都浮动\n   - 中间栏放在最前面，保证先渲染\n   - 容器设置左右padding为左右栏预留空间\n   - 左栏使用负margin-left: -100%，右移动到最左侧\n   - 右栏使用负margin-left: -自身宽度，右移到最右侧\n   - 左右栏分别使用相对定位调整到预留位置\n\n3. **双飞翼布局**\n   - 类似圣杯布局，但不使用相对定位\n   - 中间栏内部增加一个div，设置左右margin\n   - 其余同圣杯布局\n\n4. **Flex布局**\n   ```css\n   .container {\n     display: flex;\n   }\n   .center {\n     flex: 1; /* 自适应 */\n   }\n   .left, .right {\n     width: 200px; /* 固定宽度 */\n   }\n   ```\n\n5. **Grid布局**\n   ```css\n   .container {\n     display: grid;\n     grid-template-columns: 200px 1fr 200px;\n   }\n   ```\n\n6. **表格布局**\n   ```css\n   .container {\n     display: table;\n     width: 100%;\n   }\n   .left, .center, .right {\n     display: table-cell;\n   }\n   ```\n\n7. **绝对定位**\n   - 父容器相对定位\n   - 左右栏绝对定位\n   - 中间栏设置左右margin\n\n现代网页开发推荐使用Flex或Grid布局，代码简洁且灵活。'
      },
      {
        id: 6,
        title: 'calc() 方法',
        tags: ['CSS', '计算'],
        difficulty: '简单',
        answer: 'calc()是CSS3引入的一个函数，用于动态计算长度值，可以在声明CSS属性值时执行一些计算。\n\n**基本语法：**\n```css\n/* 属性: calc(表达式); */\nwidth: calc(100% - 80px);\n```\n\n**特点：**\n1. 可以混合使用不同的单位（px、%、em、rem等）\n2. 支持加(+)、减(-)、乘(*)、除(/)四则运算\n3. 运算符前后必须有空格，如`calc(100% - 20px)`而不是`calc(100%-20px)`\n4. 可以嵌套使用，如`calc(100% - calc(20px + 10px))`\n\n**常见用途：**\n1. **自适应布局**：`width: calc(100% - 80px);`\n2. **居中元素**：`margin-left: calc(50% - 50px);`\n3. **创建栅格系统**：`width: calc(100% / 12 * 4);`\n4. **动态计算字体大小**：`font-size: calc(1rem + 1vw);`\n5. **响应式设计**：结合媒体查询使用\n\n**兼容性：**\n- IE9+支持，但有一些限制\n- 现代浏览器支持良好\n- 在低版本浏览器可使用polyfill或提供回退方案\n\n**示例：**\n```css\n.sidebar {\n  width: 300px;\n}\n.main-content {\n  width: calc(100% - 300px - 40px); /* 100%宽度减去侧边栏宽度和间距 */\n  margin-left: 20px;\n  float: left;\n}\n```'
      },
      {
        id: 7,
        title: '实现一个固定长宽div 在各个浏览器下水平垂直居中',
        tags: ['CSS', '布局', '兼容性'],
        difficulty: '中等',
        answer: '**1. Flex布局（现代浏览器）**\n```css\n.parent {\n  display: flex;\n  justify-content: center; /* 水平居中 */\n  align-items: center;     /* 垂直居中 */\n  height: 100vh;           /* 使父容器占满视口高度 */\n}\n.child {\n  width: 200px;\n  height: 100px;\n  /* 其他样式 */\n}\n```\n\n**2. Grid布局（现代浏览器）**\n```css\n.parent {\n  display: grid;\n  place-items: center;   /* 水平垂直居中简写 */\n  height: 100vh;\n}\n.child {\n  width: 200px;\n  height: 100px;\n}\n```\n\n**3. 绝对定位 + 负margin（传统方法，需要知道子元素宽高）**\n```css\n.parent {\n  position: relative;\n  height: 100vh;\n}\n.child {\n  position: absolute;\n  width: 200px;\n  height: 100px;\n  top: 50%;\n  left: 50%;\n  margin-top: -50px;  /* 高度的一半 */\n  margin-left: -100px; /* 宽度的一半 */\n}\n```\n\n**4. 绝对定位 + transform（不需要知道子元素宽高）**\n```css\n.parent {\n  position: relative;\n  height: 100vh;\n}\n.child {\n  position: absolute;\n  width: 200px;\n  height: 100px;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n```\n\n**5. 绝对定位 + margin: auto（IE8+）**\n```css\n.parent {\n  position: relative;\n  height: 100vh;\n}\n.child {\n  position: absolute;\n  width: 200px;\n  height: 100px;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  margin: auto;\n}\n```\n\n**6. 表格布局（兼容性好）**\n```css\n.parent {\n  display: table-cell;\n  vertical-align: middle;\n  text-align: center;\n  width: 100vw;\n  height: 100vh;\n}\n.child {\n  width: 200px;\n  height: 100px;\n  display: inline-block;\n}\n```\n\n推荐：现代网站使用Flex或Grid方案，需要兼容老浏览器时使用绝对定位+负margin或表格布局方案。'
      },
      {
        id: 8,
        title: '渐进增强（progressive enhancement）和优雅降级（graceful degradation）',
        tags: ['CSS', '兼容性', '最佳实践'],
        difficulty: '中等',
        answer: '**渐进增强(Progressive Enhancement)**是指先构建基本功能，确保所有浏览器都能使用，然后再为现代浏览器添加高级功能。从基础到高级渐进添加功能。\n\n**优雅降级(Graceful Degradation)**是指先构建完整的功能，针对现代浏览器，然后再为低版本浏览器提供退化方案。从高级向基础退化。\n\n**两者的区别：**\n\n| 特性 | 渐进增强 | 优雅降级 |\n|------|----------|----------|\n| 起点 | 基础功能 | 高级功能 |\n| 方向 | 向上构建 | 向下兼容 |\n| 关注点 | 内容和功能 | 视觉效果 |\n| 实现方式 | 从基础HTML开始，添加CSS和JS | a从高级功能开始，添加兼容代码 |\n\n**渐进增强的示例：**\n```css\n/* 基础样式，所有浏览器 */\n.button {\n  background-color: blue;\n  color: white;\n  padding: 10px;\n}\n\n/* 现代浏览器增强 */\n@supports (background: linear-gradient(45deg, blue, purple)) {\n  .button {\n    background: linear-gradient(45deg, blue, purple);\n    border-radius: 5px;\n    box-shadow: 0 2px 10px rgba(0,0,0,0.2);\n    transition: transform 0.2s;\n  }\n  .button:hover {\n    transform: translateY(-2px);\n  }\n}\n```\n\n**优雅降级的示例：**\n```css\n/* 现代浏览器样式 */\n.button {\n  background: linear-gradient(45deg, blue, purple);\n  border-radius: 5px;\n  box-shadow: 0 2px 10px rgba(0,0,0,0.2);\n  transition: transform 0.2s;\n}\n.button:hover {\n  transform: translateY(-2px);\n}\n\n/* IE兼容回退方案 */\n@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {\n  .button {\n    background-color: blue;\n    /* 移除不支持的属性 */\n  }\n}\n```\n\n**最佳实践：**\n- 现代Web开发通常推荐采用渐进增强策略\n- 确保核心内容和功能对所有用户可用\n- 使用特性检测而非浏览器检测\n- 分离内容、表现和行为'
      },
      {
        id: 9,
        title: 'iframe 有哪些优缺点及使用场景？',
        tags: ['HTML', '嵌入'],
        difficulty: '简单',
        answer: '**iframe优点：**\n\n1. **隔离性**：iframe中的代码和主页面是相互隔离的，不会互相影响\n2. **按需加载**：可以延迟加载内容，减少主页面加载时间\n3. **沙箱环境**：提供安全的环境运行第三方内容\n4. **保持状态**：导航到其他页面时，iframe内容可以保持不变\n5. **跨域通信**：通过postMessage可以实现跨域页面通信\n\n**iframe缺点：**\n\n1. **SEO不友好**：搜索引擎难以索引iframe中的内容\n2. **可访问性差**：对屏幕阅读器等辅助技术不友好\n3. **性能消耗**：每个iframe都相当于一个独立页面，会消耗额外资源\n4. **阻塞页面加载**：默认情况下会阻塞主页面的onload事件\n5. **安全风险**：如果使用不当，可能导致点击劫持等安全问题\n6. **响应式设计困难**：iframe内容难以适应外部容器变化\n\n**使用场景：**\n\n1. **第三方内容嵌入**：广告、地图、视频播放器等\n2. **沙箱隔离**：需要运行不受信任的代码\n3. **局部页面更新**：只需更新页面的特定部分时\n4. **跨域请求**：在同源策略限制下获取其他域的内容\n5. **复杂的独立组件**：如在线编辑器、聊天窗口等\n6. **遗留系统集成**：将旧系统嵌入新系统\n\n**最佳实践：**\n\n1. 使用`sandbox`属性增强安全性\n2. 添加`loading=\"lazy\"`实现懒加载\n3. 使用`srcdoc`代替`src`减少HTTP请求\n4. 设置适当的CSP(Content Security Policy)策略\n5. 使用iframe标题(`title`属性)提高可访问性\n\n在现代Web开发中，应尽可能避免使用iframe，可考虑使用Ajax、Web Components或框架组件作为替代。'
      },
      {
        id: 10,
        title: 'CSS 盒子模型',
        tags: ['CSS', '基础'],
        difficulty: '简单',
        answer: 'CSS盒子模型描述了元素内容(content)、内边距(padding)、边框(border)和外边距(margin)如何一起决定元素的总体大小和位置。\n\n**两种盒模型：**\n\n1. **标准盒模型(content-box)**\n   - **计算方式**：width/height只包含content部分\n   - **总宽度计算**：width + padding-left + padding-right + border-left + border-right\n   - **总高度计算**：height + padding-top + padding-bottom + border-top + border-bottom\n   - **默认模式**：大多数浏览器默认使用此模式\n\n2. **替代盒模型(IE盒模型/border-box)**\n   - **计算方式**：width/height包含content + padding + border\n   - **总宽度计算**：width (已包含padding和border)\n   - **总高度计算**：height (已包含padding和border)\n   - **使用场景**：更直观的尺寸控制，宽高即为元素最终尺寸\n\n**设置盒模型类型：**\n```css\n/* 单个元素设置 */\n.element {\n  box-sizing: content-box; /* 标准盒模型 */\n  /* 或 */\n  box-sizing: border-box; /* 替代盒模型 */\n}\n\n/* 全局设置（常见做法） */\n* {\n  box-sizing: border-box;\n}\n```\n\n**注意事项：**\n\n1. margin不计入实际大小，但会影响元素的总占用空间\n2. margin可以为负值，padding和border不能为负值\n3. 相邻元素的垂直margin会发生合并(margin collapse)\n4. 百分比宽度基于父元素内容区宽度计算\n\n**最佳实践：**\n\n大多数现代CSS框架和开发者选择使用border-box进行开发，使布局计算更加直观。通常在CSS重置或初始化代码中添加：\n```css\n*, *::before, *::after {\n  box-sizing: border-box;\n}\n```'
      },
      {
        id: 11,
        title: 'HTML5 的特性',
        tags: ['HTML5', '新特性'],
        difficulty: '中等',
        answer: 'HTML5主要特性：\n\n**1. 语义化标签**\n- `<header>`, `<footer>`, `<nav>`, `<section>`, `<article>`, `<aside>`, `<main>`, `<figure>`, `<figcaption>`\n- 提供更好的文档结构和可访问性\n\n**2. 表单增强**\n- 新输入类型：email, url, number, range, date, time, color, search等\n- 新属性：placeholder, required, pattern, autocomplete, autofocus等\n- 新元素：`<datalist>`, `<output>`, `<progress>`, `<meter>`\n\n**3. 多媒体支持**\n- `<audio>` 和 `<video>` 原生支持音频和视频\n- `<track>` 元素支持字幕\n- `<canvas>` 用于2D图形绘制\n- `<svg>` 支持可缩放矢量图形\n\n**4. API和功能**\n- **本地存储**：localStorage, sessionStorage\n- **离线Web应用**：Application Cache(已弃用)和Service Workers\n- **拖放API**：drag-and-drop\n- **地理位置API**：Geolocation\n- **Web Workers**：后台线程\n- **Server-Sent Events**：服务器推送\n- **WebSockets**：双向通信\n- **History API**：操作浏览历史\n- **File API**：文件操作\n- **Web Storage**：本地数据存储\n\n**5. 连接特性**\n- WebRTC (Web Real-Time Communication)\n- WebSocket\n\n**6. 设备访问**\n- 媒体捕获(摄像头、麦克风)\n- 屏幕方向\n- 振动API\n\n**7. 性能优化**\n- Web Workers\n- 异步脚本加载(async, defer)\n- 预加载(preload, prefetch)\n\n**8. 图形和效果**\n- Canvas 2D Context\n- WebGL\n- CSS3动画和过渡\n- SVG集成\n\n**9. 移除的特性**\n- 移除`<frame>`, `<frameset>`, `<noframes>`\n- 废弃多个表现性元素：如`<font>`, `<center>`, `<big>`等\n\n**主要优势**：\n- 更丰富的语义结构\n- 减少对插件的依赖\n- 更好的移动端支持\n- 更强的跨平台能力\n- 增强的性能和离线能力'
      },
      {
        id: 12,
        title: 'CSS3 的特性',
        tags: ['CSS3', '新特性'],
        difficulty: '中等',
        answer: 'CSS3主要特性：\n\n**1. 选择器**\n- 属性选择器增强：`[attr^=]`, `[attr$=]`, `[attr*=]`\n- 结构伪类：`:nth-child()`, `:nth-of-type()`, `:only-child`, `:empty`等\n- 目标伪类：`:target`\n- 状态伪类：`:enabled`, `:disabled`, `:checked`等\n- 否定伪类：`:not()`\n- 伪元素新语法：`::`(如`::before`, `::after`)\n\n**2. 盒模型与布局**\n- `box-sizing`: 控制盒模型类型\n- Flexbox布局：`display: flex`\n- Grid布局：`display: grid`\n- 多列布局：`column-count`, `column-gap`等\n- 盒阴影：`box-shadow`\n- 轮廓：`outline`, `outline-offset`\n\n**3. 背景与边框**\n- 多重背景：`background-image: url(img1.jpg), url(img2.jpg)`\n- 背景大小：`background-size`\n- 背景原点：`background-origin`\n- 背景裁剪：`background-clip`\n- 圆角：`border-radius`\n- 图像边框：`border-image`\n\n**4. 文本效果**\n- 文本阴影：`text-shadow`\n- 文本溢出：`text-overflow`\n- 断词：`word-wrap`, `word-break`\n- 字体特性：`@font-face`\n- 文本装饰：`text-decoration-line`, `text-decoration-style`\n\n**5. 过渡与动画**\n- 过渡：`transition`\n- 2D转换：`transform`, `translate()`, `rotate()`, `scale()`, `skew()`\n- 3D转换：`transform: rotateX()`, `rotateY()`, `perspective`等\n- 动画：`@keyframes`, `animation`\n\n**6. 颜色与渐变**\n- RGBA：`rgba(255, 0, 0, 0.5)`\n- HSLA：`hsla(0, 100%, 50%, 0.5)`\n- 线性渐变：`linear-gradient()`\n- 径向渐变：`radial-gradient()`\n- 圆锥渐变：`conic-gradient()`(较新)\n\n**7. 媒体查询**\n- 响应式设计：`@media screen and (max-width: 768px) { ... }`\n\n**8. 计算与变量**\n- 计算值：`calc()`\n- 自定义属性（变量）：`--main-color: blue; color: var(--main-color);`\n\n**9. 其他特性**\n- 滤镜：`filter`\n- 混合模式：`mix-blend-mode`, `background-blend-mode`\n- 遮罩：`mask-image`\n- 剪裁：`clip-path`\n- 计数器：`counter-increment`, `counter-reset`\n- 栅格：`object-fit`, `object-position`\n\n**主要优势**：\n- 增强设计能力，减少图片使用\n- 提高性能，减少HTTP请求\n- 支持响应式设计\n- 简化复杂布局实现\n- 减少对JavaScript的依赖'
      },
      {
        id: 13,
        title: 'CSS 中选择器的优先级',
        tags: ['CSS', '选择器'],
        difficulty: '中等',
        answer: 'CSS选择器优先级是一个权重计算系统，决定当多个规则应用于同一元素时，哪个规则优先。\n\n**选择器优先级从高到低：**\n\n1. **!important** - 最高优先级，覆盖所有其他样式\n   ```css\n   p { color: red !important; }\n   ```\n\n2. **内联样式** - 优先级值: 1000\n   ```html\n   <p style="color: blue;">\n   ```\n\n3. **ID选择器** - 优先级值: 100\n   ```css\n   #header { ... }\n   ```\n\n4. **类选择器/属性选择器/伪类** - 优先级值: 10\n   ```css\n   .highlight { ... }\n   [type="text"] { ... }\n   :hover { ... }\n   ```\n\n5. **元素选择器/伪元素** - 优先级值: 1\n   ```css\n   p { ... }\n   ::before { ... }\n   ```\n\n6. **通用选择器/组合器** - 优先级值: 0\n   ```css\n   * { ... }     /* 通用选择器 */\n   > , + , ~ , 空格  /* 组合器 */\n   ```\n\n**优先级计算方法：**\n\n1. 计算选择器中ID选择器的数量 (a)\n2. 计算选择器中类选择器、属性选择器和伪类的数量 (b)\n3. 计算选择器中元素选择器和伪元素的数量 (c)\n4. 忽略通用选择器和组合器\n5. 按a-b-c表示优先级\n\n**示例：**\n```css\n#nav .link p { color: green; }           /* 优先级: 1-1-1 = 111 */\ndiv.container p.text { color: blue; }    /* 优先级: 0-2-2 = 022 */\nbody p { color: red; }                   /* 优先级: 0-0-2 = 002 */\n```\n\n**特殊规则：**\n\n1. **继承样式没有优先级**，任何直接应用的样式都会覆盖继承样式\n2. **同级别优先顺序**：当优先级相同时，后声明的规则优先\n3. **特殊性不会累加**：多个类选择器不会覆盖一个ID选择器\n\n**实践建议：**\n\n1. 避免过度使用`!important`\n2. 避免使用内联样式\n3. 保持选择器尽可能简单\n4. 利用CSS特性而不是依赖优先级解决冲突\n5. 使用BEM等命名方法降低选择器冲突可能性'
      },
      {
        id: 14,
        title: 'HTML5 input 元素 type 属性值',
        tags: ['HTML5', '表单'],
        difficulty: '简单',
        answer: 'HTML5引入了多种新的input类型，大大增强了表单的功能和用户体验。\n\n**传统input类型：**\n- **text** - 默认类型，文本输入\n- **password** - 密码字段，输入被掩码\n- **checkbox** - 复选框\n- **radio** - 单选按钮\n- **submit** - 提交表单按钮\n- **reset** - 重置表单按钮\n- **button** - 一般按钮\n- **file** - 文件上传\n- **hidden** - 隐藏字段\n- **image** - 图像提交按钮\n\n**HTML5新增input类型：**\n- **email** - 电子邮件地址输入，提供验证\n- **tel** - 电话号码输入\n- **url** - URL地址输入，提供验证\n- **number** - 数字输入，可设置范围\n- **range** - 范围滑块控件\n- **search** - 搜索输入框，通常带有清除按钮\n- **color** - 颜色选择器\n- **date** - 日期选择器(年月日)\n- **datetime-local** - 日期和时间选择(无时区)\n- **time** - 时间选择器(时分)\n- **week** - 周选择器\n- **month** - 月份选择器\n\n**HTML5新增input属性：**\n- **placeholder** - 输入提示文本\n- **required** - 必填字段\n- **pattern** - 正则表达式验证\n- **min/max** - 最小/最大值\n- **step** - 数值增减步长\n- **autocomplete** - 自动完成\n- **autofocus** - 自动聚焦\n- **multiple** - 允许多选或多文件上传\n- **form** - 指定表单ID，允许input在form外部\n- **formaction** - 覆盖表单action\n- **formmethod** - 覆盖表单method\n- **formnovalidate** - 禁用验证\n\n**兼容性与最佳实践：**\n1. 在不支持HTML5输入类型的浏览器中，会自动降级为text类型\n2. 即使使用HTML5验证，也应实现服务器端验证\n3. 对于复杂表单，考虑添加JavaScript增强验证\n4. 使用CSS伪类`:valid`和`:invalid`自定义验证样式\n5. 主流现代浏览器对大多数HTML5输入类型有良好支持'
      },
      {
        id: 15,
        title: 'CSS 中属性的继承性',
        tags: ['CSS', '继承'],
        difficulty: '中等',
        answer: 'CSS继承是指某些属性会从父元素自动传递给子元素的特性。\n\n**可继承的属性**（常见）：\n\n1. **文本相关**：\n   - `color` - 文本颜色\n   - `font-family` - 字体\n   - `font-size` - 字体大小\n   - `font-style` - 字体样式（如斜体）\n   - `font-weight` - 字体粗细\n   - `line-height` - 行高\n   - `text-align` - 文本对齐\n   - `text-indent` - 文本缩进\n   - `text-transform` - 文本转换（大小写等）\n   - `letter-spacing` - 字符间距\n   - `word-spacing` - 单词间距\n\n2. **列表相关**：\n   - `list-style` - 列表样式\n   - `list-style-type` - 列表项标记类型\n   - `list-style-position` - 列表项标记位置\n\n3. **其他**：\n   - `visibility` - 可见性\n   - `cursor` - 鼠标指针\n   - `direction` - 文本方向\n   - `white-space` - 空白处理\n\n**不可继承的属性**（常见）：\n\n1. **盒模型相关**：\n   - `width`, `height` - 宽高\n   - `margin`, `padding` - 外边距、内边距\n   - `border` - 边框\n   - `box-sizing` - 盒模型类型\n\n2. **定位相关**：\n   - `position` - 定位方式\n   - `top`, `right`, `bottom`, `left` - 定位坐标\n   - `z-index` - 层叠顺序\n   - `float` - 浮动\n   - `display` - 显示类型\n\n3. **背景相关**：\n   - `background` - 背景相关属性\n\n4. **其他**：\n   - `opacity` - 透明度\n   - `transform` - 变换\n   - `transition` - 过渡\n   - `animation` - 动画\n\n**控制继承的方法**：\n\n1. **inherit**：强制继承父元素的值\n   ```css\n   button {\n     color: inherit; /* 继承父元素的颜色 */\n   }\n   ```\n\n2. **initial**：重置为属性的初始值\n   ```css\n   p {\n     color: initial; /* 恢复到浏览器默认值 */\n   }\n   ```\n\n3. **unset**：如果属性可继承，则表现为`inherit`；否则表现为`initial`\n   ```css\n   div {\n     all: unset; /* 重置所有属性 */\n   }\n   ```\n\n4. **revert**：恢复为浏览器默认样式\n\n**实际应用：**\n\n1. 设置全局文本样式可以利用继承性：\n   ```css\n   body {\n     font-family: Arial, sans-serif;\n     color: #333;\n     line-height: 1.5;\n   }\n   ```\n\n2. 一些元素默认不会继承父元素的某些属性，如按钮、输入框，这时可以使用`inherit`：\n   ```css\n   button, input {\n     font-family: inherit;\n     color: inherit;\n   }\n   ```'
      },
      {
        id: 16,
        title: '画一条 0.5px 的线',
        tags: ['CSS', '技巧'],
        difficulty: '中等',
        answer: '在CSS中实现0.5px的线有多种方法，这在高分辨率屏幕（如Retina显示屏）上特别有用。\n\n**1. transform: scale()**\n```css\n/* 水平线 */\n.line-h {\n  height: 1px;\n  transform: scaleY(0.5);\n  transform-origin: 0 0;\n  background-color: #000;\n}\n\n/* 垂直线 */\n.line-v {\n  width: 1px;\n  transform: scaleX(0.5);\n  transform-origin: 0 0;\n  background-color: #000;\n}\n\n/* 四周边框 */\n.box {\n  position: relative;\n}\n.box::after {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 200%;\n  height: 200%;\n  transform: scale(0.5);\n  transform-origin: left top;\n  border: 1px solid #000;\n  box-sizing: border-box;\n}\n```\n\n**2. 线性渐变**\n```css\n.gradient-line {\n  height: 1px;\n  background: linear-gradient(0deg, transparent 50%, #000 50%);\n}\n```\n\n**3. box-shadow**\n```css\n.shadow-line {\n  height: 1px;\n  box-shadow: 0 0.5px 0 #000;\n  background: none;\n}\n```\n\n**4. SVG方法**\n```html\n<svg height="1" width="100%">\n  <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="#000" stroke-width="0.5"/>\n</svg>\n```\n\n**5. viewport meta设置**\n```html\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n```\n对于只针对Retina屏幕优化的情况，可以：\n```css\n@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {\n  .normal-line {\n    height: 0.5px;\n  }\n}\n```\n\n**6. Canvas方法**\n```javascript\nconst canvas = document.getElementById("myCanvas");\nconst ctx = canvas.getContext("2d");\nctx.beginPath();\nctx.moveTo(0, 0.5);\nctx.lineTo(300, 0.5);\nctx.strokeStyle = "#000";\nctx.lineWidth = 0.5;\nctx.stroke();\n```\n\n**各方法比较**：\n- **transform方法**：兼容性好，实现简单\n- **渐变方法**：视觉效果接近，适合特定场景\n- **box-shadow**：实现简单，但在某些浏览器可能有差异\n- **SVG方法**：精确控制，但需要额外的SVG元素\n- **viewport设置**：全局影响，不够灵活\n- **Canvas**：需要JavaScript，适用于动态情况\n\n**推荐方法**：对于大多数情况，transform scale方法是最佳选择，兼容性好且实现相对简单。'
      },
      {
        id: 17,
        title: 'position 的值',
        tags: ['CSS', '定位'],
        difficulty: '简单',
        answer: 'CSS中的`position`属性用于指定元素在文档中的定位方式。\n\n**1. static (默认值)**\n- 元素按照正常文档流定位\n- 不会受到top、right、bottom、left属性影响\n- 不会成为定位上下文\n- 示例：`position: static;`\n\n**2. relative (相对定位)**\n- 相对于元素在正常文档流中的位置进行定位\n- 原来的位置会被保留(不会脱离文档流)\n- 可使用top、right、bottom、left设置偏移量\n- 为绝对定位子元素创建定位上下文\n- 示例：`position: relative; top: 10px; left: 20px;`\n\n**3. absolute (绝对定位)**\n- 相对于最近的非static定位祖先元素进行定位\n- 如果没有这样的祖先，则相对于初始包含块(通常是viewport)\n- 脱离正常文档流，不保留原来的位置\n- 可使用top、right、bottom、left设置位置\n- 示例：`position: absolute; top: 20px; right: 30px;`\n\n**4. fixed (固定定位)**\n- 相对于viewport(视口)进行定位\n- 滚动页面时位置不变\n- 脱离正常文档流\n- 可使用top、right、bottom、left设置位置\n- 示例：`position: fixed; bottom: 10px; right: 10px;`\n\n**5. sticky (粘性定位)**\n- 基于用户滚动位置定位\n- 正常情况下按照relative定位\n- 当页面滚动，元素达到指定阈值时，表现为fixed定位\n- 必须设置至少一个阈值属性(top、right、bottom或left)\n- 示例：`position: sticky; top: 0;`\n\n**6. inherit**\n- 继承父元素的position值\n\n**7. initial**\n- 设置为默认值(static)\n\n**特点与应用场景：**\n\n- **static**: 默认布局，很少显式设置\n- **relative**: \n  - 微调元素位置\n  - 为绝对定位子元素创建上下文\n  - 不影响周围元素\n- **absolute**: \n  - 模态框、工具提示、下拉菜单\n  - 独立于文档流的UI元素\n  - 需要精确定位的元素\n- **fixed**: \n  - 固定头部/底部导航\n  - 返回顶部按钮\n  - 固定位置的广告\n- **sticky**: \n  - 粘性头部/导航\n  - 滚动到一定位置固定的元素\n  - 滚动列表中的分类标题\n\n**注意事项：**\n- 绝对和固定定位会使元素脱离文档流，可能引起布局问题\n- 固定定位在使用transform的父元素中会失效\n- sticky定位需要考虑浏览器兼容性(IE不支持)\n- z-index仅对定位元素(非static)有效'
      },
      {
        id: 18,
        title: '什么是浮动，浮动会引起什么问题，如何清除浮动？',
        tags: ['CSS', '浮动'],
        difficulty: '中等',
        answer: '**浮动(float)定义：**\n\n浮动是CSS定位属性，允许元素向左或向右浮动，使文本和内联元素环绕它。浮动元素会脱离正常文档流，但仍会影响布局。\n\n**浮动的基本用法：**\n```css\n.left { float: left; }\n.right { float: right; }\n.none { float: none; } /* 默认值 */\n```\n\n**浮动引起的问题：**\n\n1. **父元素高度塌陷**：浮动元素脱离文档流，父元素无法感知其高度，导致父元素高度为0或不足\n2. **后续元素上移**：非浮动元素会占据浮动元素原来的位置\n3. **文本环绕**：有时这是期望的效果，但也可能导致布局问题\n4. **多列布局时可能错位**：当元素高度不一致时，会导致下方元素布局混乱\n\n**清除浮动的方法：**\n\n1. **clear属性**：应用于浮动元素后的元素\n   ```css\n   .clear { clear: both; }\n   /* 或 clear: left/right; */\n   ```\n\n2. **空div方法**：在浮动元素后添加一个空元素\n   ```html\n   <div style="clear: both;"></div>\n   ```\n\n3. **父元素设置overflow**：触发BFC(块级格式化上下文)\n   ```css\n   .parent {\n     overflow: hidden; /* 或 auto/scroll */\n   }\n   ```\n\n4. **伪元素clearfix (最常用)**：\n   ```css\n   .clearfix::after {\n     content: "";\n     display: block; /* 或 table */\n     clear: both;\n   }\n   ```\n\n5. **现代clearfix (兼容性更好)**：\n   ```css\n   .clearfix::before,\n   .clearfix::after {\n     content: "";\n     display: table;\n   }\n   .clearfix::after {\n     clear: both;\n   }\n   ```\n\n6. **父元素也浮动**：不推荐，会导致更多浮动问题\n\n7. **父元素设置display: flow-root**：现代方法，创建BFC\n   ```css\n   .parent {\n     display: flow-root;\n   }\n   ```\n\n8. **Flexbox/Grid替代**：现代布局方式，完全避免浮动问题\n   ```css\n   .container {\n     display: flex;\n     /* 或 display: grid; */\n   }\n   ```\n\n**最佳实践：**\n\n1. 对于传统布局，使用clearfix方法是最可靠的选择\n2. 现代网站开发应考虑使用Flexbox或Grid替代浮动\n3. 使用display: flow-root在现代浏览器中是最简洁的解决方案\n4. overflow方法虽简单但可能导致内容被裁剪的问题\n\n**浮动的现代替代方案：**\n\n现代CSS布局方法(Flexbox和Grid)解决了大多数需要浮动的场景，使布局更加灵活、可靠。浮动现在主要用于特定效果，如文本环绕图片。'
      },
      {
        id: 19,
        title: 'line-height 和 height 的区别',
        tags: ['CSS', '文本'],
        difficulty: '简单',
        answer: '**line-height 和 height 的核心区别：**\n\n- **height**：设置元素整体的高度\n- **line-height**：设置文本行之间的距离(行间距)\n\n**line-height 详解：**\n\n1. **定义**：控制文本行之间的垂直间距\n2. **计算方式**：行高是指文本行基线(baseline)之间的距离\n3. **默认值**：normal (通常约为字体大小的1.2倍)\n4. **取值方式**：\n   - 具体长度值：如`20px`\n   - 相对字体大小：如`1.5`或`150%`\n   - normal：浏览器默认值\n5. **继承特性**：可继承给子元素\n\n**height 详解：**\n\n1. **定义**：控制元素的整体高度\n2. **计算方式**：包括内容、内边距(不含边框和外边距)\n3. **默认值**：auto (由内容决定)\n4. **取值方式**：\n   - 具体长度值：如`100px`\n   - 百分比：相对于包含块的高度\n   - auto：由内容决定\n5. **继承特性**：不可继承\n\n**主要功能区别：**\n\n1. **单行文本垂直居中**：\n   - 设置`line-height`等于`height`可以使单行文本垂直居中\n   - `height`只控制容器高度，不影响文本位置\n\n2. **多行文本**：\n   - `line-height`控制行间距\n   - `height`控制整个容器高度\n\n3. **空元素**：\n   - 空元素的`line-height`不起作用\n   - `height`仍然会撑开元素\n\n4. **溢出行为**：\n   - 内容总高度超过`height`会溢出或触发滚动\n   - `line-height`不会限制内容总高度\n\n**示例与应用：**\n\n**单行文本垂直居中**：\n```css\n.btn {\n  height: 40px;\n  line-height: 40px; /* 使文本垂直居中 */\n}\n```\n\n**设置合适的行间距**：\n```css\np {\n  line-height: 1.5; /* 设置为字体大小的1.5倍 */\n  font-size: 16px;\n}\n```\n\n**固定高度容器**：\n```css\n.box {\n  height: 300px;\n  overflow: auto; /* 内容超出时显示滚动条 */\n}\n```\n\n**最佳实践：**\n\n1. 文本元素（段落、标题等）应使用`line-height`控制行间距\n2. 容器元素使用`height`控制整体高度\n3. 避免给段落等文本元素设置固定`height`\n4. 为了可访问性和响应式设计，优先使用相对单位设置`line-height`（如1.5）\n5. 单行文本垂直居中时，考虑使用Flexbox代替`line-height`方法'
      },
      {
        id: 20,
        title: '设置一个元素的背景颜色',
        tags: ['CSS', '样式'],
        difficulty: '简单',
        answer: '设置元素背景颜色有多种方法和属性，从基础到高级：\n\n**1. background-color 属性：**\n\n最基本且常用的设置背景颜色的方法：\n```css\n.element {\n  background-color: red;\n}\n```\n\n**颜色值表示方法：**\n\n- **颜色名称**：`background-color: red;`\n- **十六进制**：`background-color: #FF0000;` 或简写 `#F00`\n- **RGB**：`background-color: rgb(255, 0, 0);`\n- **RGBA**：`background-color: rgba(255, 0, 0, 0.5);` (带透明度)\n- **HSL**：`background-color: hsl(0, 100%, 50%);` (色相-饱和度-亮度)\n- **HSLA**：`background-color: hsla(0, 100%, 50%, 0.5);` (带透明度)\n- **透明**：`background-color: transparent;`\n- **当前文本颜色**：`background-color: currentColor;`\n\n**2. background 简写属性：**\n\n```css\n/* 仅设置背景颜色 */\n.element {\n  background: red;\n}\n\n/* 设置多个背景属性 */\n```\n\n**3. 渐变背景：**\n\n**线性渐变：**\n```css\n.element {\n  background-color: #f06; /* 兼容不支持渐变的浏览器 */\n  background-image: linear-gradient(to right, red, blue);\n  /* 或使用角度 */\n  background-image: linear-gradient(45deg, red, blue);\n  /* 多色渐变 */\n  background-image: linear-gradient(to bottom, red, yellow, green, blue);\n  /* 控制颜色停止点 */\n  background-image: linear-gradient(to right, red 20%, blue 80%);\n}\n```\n\n**径向渐变：**\n```css\n.element {\n  background-image: radial-gradient(circle, red, blue);\n  /* 指定大小和位置 */\n  background-image: radial-gradient(circle at top right, red, blue);\n}\n```\n\n**圆锥渐变 (较新)：**\n```css\n.element {\n  background-image: conic-gradient(red, yellow, green, blue, violet);\n  /* 从特定角度开始 */\n  background-image: conic-gradient(from 45deg, red, blue);\n}\n```\n\n**4. 多重背景：**\n\n```css\n.element {\n  background: \n    linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),\n    #f06;\n}\n```\n\n**5. CSS变量：**\n\n```css\n:root {\n  --main-bg-color: #f06;\n}\n\n.element {\n  background-color: var(--main-bg-color);\n}\n```\n\n**6. 修改透明度而不影响内容：**\n\n```css\n/* 使用rgba背景色 */\n.element {\n  background-color: rgba(255, 0, 0, 0.5);\n}\n\n/* 使用伪元素 */\n.element {\n  position: relative;\n}\n.element::before {\n  content: "";\n  position: absolute;\n  top: 0; right: 0; bottom: 0; left: 0;\n  background-color: red;\n  opacity: 0.5;\n  z-index: -1;\n}\n```\n\n**最佳实践：**\n\n1. 为颜色选择提供回退方案以支持旧浏览器\n2. 使用CSS变量管理颜色方案\n3. 避免内联样式\n4. 考虑使用HSL以便于调整颜色\n5. 针对深色模式调整背景颜色'
      },
    {
      id: 21,
      title: 'inline-block、inline 和 block 的区别',
      tags: ['CSS', '布局'],
      difficulty: '简单',
      code: `/* 块级元素 */
.block-element {
  display: block;
  width: 200px;
  height: 100px;
  background-color: #f0ad4e;
  margin: 10px;
}

/* 内联元素 */
.inline-element {
  display: inline;
  background-color: #5bc0de;
  padding: 5px;
  /* 注意: width 和 height 对内联元素无效 */
  width: 200px; /* 无效 */
  height: 100px; /* 无效 */
}

/* 内联块级元素 */
.inline-block-element {
  display: inline-block;
  width: 200px;
  height: 100px;
  background-color: #5cb85c;
  margin: 10px;
  vertical-align: middle;
}`,
      answer: `## display: block（块级元素）

**特点**：
- 独占一行，默认情况下会填满父容器的宽度
- 可以设置 width 和 height 属性
- 可以设置 margin 和 padding
- 常见的块级元素: \`<div>\`, \`<p>\`, \`<h1>\`-\`<h6>\`, \`<ul>\`, \`<li>\`, \`<section>\` 等

## display: inline（内联元素）

**特点**：
- 不会独占一行，多个内联元素会在同一行显示，直到一行放不下才会换行
- **无法设置 width 和 height**
- 可以设置水平方向的 margin 和 padding，但垂直方向的 margin 不会产生效果
- 垂直方向的 padding 虽然会显示，但不会影响布局
- 常见的内联元素: \`<span>\`, \`<a>\`, \`<strong>\`, \`<em>\`, \`<i>\`, \`<b>\` 等

## display: inline-block（内联块级元素）

**特点**：
- 结合了 inline 和 block 的特性
- 不会独占一行，多个元素会在同一行显示
- 可以设置 width 和 height 属性
- 可以设置 margin 和 padding（所有方向都有效）
- 适合用于需要设置宽高但又不想独占一行的场景，例如导航菜单项、按钮等
- 常见的 inline-block 元素: \`<button>\`, \`<input>\`, \`<select>\` 等

## 应用场景对比

- **block**: 当需要元素独占一行，并控制其宽高和外边距时使用
- **inline**: 当希望元素在文本流中表现为文本的一部分时使用
- **inline-block**: 当需要元素不独占一行，但仍需要设置宽高和完整的盒模型属性时使用`
    },
    {
      id: 22,
      title: '为什么 img 是 inline 但有 width 和 height',
      tags: ['HTML', 'CSS', '置换元素'],
      difficulty: '中等',
      code: `/* 普通内联元素 */
span {
  display: inline;
  width: 200px;  /* 这个属性不会生效 */
  height: 100px; /* 这个属性不会生效 */
  background-color: lightblue;
}

/* img 元素 - 虽然是内联，但是宽高会生效 */
img {
  width: 200px;  /* 生效 */
  height: 100px; /* 生效 */
  background-color: lightgreen;
}

/* 其他置换元素示例 */
input, textarea, video {
  /* 宽高属性同样会生效 */
}`,
      answer: `## img 是置换元素

img 元素是一种特殊的**置换元素(replaced element)**。置换元素是指那些内容不受 CSS 视觉格式化模型控制的元素，它们的内容和尺寸是由外部资源（如图片文件、嵌入内容等）决定的。

## 置换元素的特性

虽然 \`<img>\` 默认是 \`display: inline\`，但作为置换元素，它具有以下特性：

1. **可以设置 width 和 height**：与普通内联元素不同，置换元素可以设置宽度和高度
2. **有内在尺寸**：即使不设置宽高，置换元素也有自己的默认尺寸（如图片的原始尺寸）
3. **可以设置垂直方向的 margin 和 padding**：这些属性对置换元素完全有效

## 常见的置换元素

除了 \`<img>\` 外，以下元素也都是置换元素：

- \`<input>\`
- \`<textarea>\`
- \`<select>\`
- \`<button>\`
- \`<video>\`
- \`<audio>\` (有控件时)
- \`<canvas>\`
- \`<iframe>\`
- \`<embed>\`
- \`<object>\`

## 解决相关布局问题

当使用 \`<img>\` 时，常见的一个问题是图片底部出现间隙。这可以通过以下方式解决：

1. 设置 \`display: block\`
2. 设置 \`vertical-align: middle\` 或其他值
3. 设置 \`line-height: 0\` 给父元素`
    },
    {
      id: 23,
      title: 'box-sizing 的作用，如何使用',
      tags: ['CSS', '盒模型'],
      difficulty: '简单',
      code: `/* 默认盒模型 (content-box) */
.content-box {
  box-sizing: content-box; /* 默认值 */
  width: 200px;
  height: 100px;
  padding: 20px;
  border: 5px solid #333;
  /* 实际占用空间：宽度 = 200px + 20px*2 + 5px*2 = 250px */
}

/* IE盒模型 (border-box) */
.border-box {
  box-sizing: border-box;
  width: 200px;
  height: 100px;
  padding: 20px;
  border: 5px solid #333;
  /* 实际占用空间：宽度 = 200px (包含了 padding 和 border) */
}

/* 常见的全局设置 */
* {
  box-sizing: border-box; /* 使所有元素使用 border-box 模型 */
}`,
      answer: `## box-sizing 属性的作用

box-sizing 属性定义了浏览器应该如何计算元素的总宽度和总高度。这个属性改变了 CSS 盒模型的工作方式，影响着 width 和 height 属性的行为。

## 两种盒模型

### 1. content-box (默认值)

- **标准盒模型** (W3C 盒模型)
- 设置的 width 和 height 只应用于元素的内容区
- 元素的总宽度 = width + padding-left + padding-right + border-left + border-right
- 元素的总高度 = height + padding-top + padding-bottom + border-top + border-bottom

### 2. border-box

- **IE 盒模型** (也被称为"怪异模式"盒模型)
- 设置的 width 和 height 包括内容区、内边距和边框
- 元素的总宽度 = width (包含了 padding 和 border)
- 元素的总高度 = height (包含了 padding 和 border)
- margin 仍然在元素宽高之外

## 使用 border-box 的好处

1. **更直观的尺寸控制**：设置的宽高就是元素实际占用的空间
2. **更容易实现响应式设计**：当使用百分比宽度时，不必担心内边距和边框会破坏布局
3. **便于固定宽度的布局**：使用 border-box 可以轻松确保元素的总宽度固定
4. **解决一些常见的 CSS 布局问题**：例如，当添加边框或内边距时不会改变元素的总尺寸

## 全局设置 (常见做法)

\`\`\`css
*, *::before, *::after {
  box-sizing: border-box;
}
\`\`\`

在现代 CSS 框架和项目中，将 box-sizing 设置为 border-box 已经成为标准做法，因为它使得布局更加直观和可预测。`
    },
    {
      id: 24,
      title: 'CSS 实现动画',
      tags: ['CSS', '动画'],
      difficulty: '中等',
      code: `/* 使用 transition 实现简单动画 */
.transition-example {
  width: 100px;
  height: 100px;
  background-color: #3498db;
  transition: all 0.5s ease;
}

.transition-example:hover {
  width: 150px;
  height: 150px;
  background-color: #e74c3c;
  transform: rotate(45deg);
}

/* 使用 animation 实现复杂动画 */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-50px);
  }
}

.animation-example {
  width: 100px;
  height: 100px;
  background-color: #2ecc71;
  animation: bounce 2s ease infinite;
}

/* 使用 transform 实现变换 */
.transform-example {
  width: 100px;
  height: 100px;
  background-color: #f39c12;
  transition: transform 0.5s ease;
}

.transform-example:hover {
  transform: scale(1.2) rotate(10deg) translateX(20px);
}`,
      answer: `## CSS 实现动画的方式

CSS 提供了三种主要的方式来创建动画和视觉效果：

### 1. CSS Transitions (过渡)

过渡允许 CSS 属性值在指定的持续时间内平滑地变化。

**基本语法**：
\`\`\`css
transition: property duration timing-function delay;
\`\`\`

**属性**：
- **transition-property**: 要过渡的 CSS 属性 (例如：width, color)
- **transition-duration**: 过渡持续时间 (例如：0.5s, 500ms)
- **transition-timing-function**: 过渡的速度曲线 (例如：ease, linear)
- **transition-delay**: 过渡开始前的延迟时间

**适用场景**：
- 鼠标悬停效果
- 简单的状态变化
- 根据用户交互触发的单次动画

### 2. CSS Animations (动画)

动画提供了更复杂、多步骤的动画能力，可以无限循环和精确控制。

**基本语法**：
\`\`\`css
@keyframes animationName {
  0% { /* 起始状态 */ }
  50% { /* 中间状态 */ }
  100% { /* 结束状态 */ }
}

.element {
  animation: animationName duration timing-function delay iteration-count direction fill-mode;
}
\`\`\`

**属性**：
- **animation-name**: 动画名称（与 @keyframes 定义的名称匹配）
- **animation-duration**: 动画持续时间
- **animation-timing-function**: 动画的速度曲线
- **animation-delay**: 动画开始前的延迟
- **animation-iteration-count**: 动画的播放次数 (例如：3, infinite)
- **animation-direction**: 动画的方向 (例如：normal, reverse, alternate)
- **animation-fill-mode**: 动画结束时的样式 (例如：forwards, backwards)
- **animation-play-state**: 控制动画的播放状态 (例如：running, paused)

**适用场景**：
- 循环动画
- 多步骤的复杂动画
- 页面加载或状态变化时自动触发的动画

### 3. CSS Transforms (变换)

变换可以对元素进行 2D 或 3D 转换，通常与过渡或动画一起使用。

**常用变换函数**：
- **translate(x, y)**: 移动元素
- **scale(x, y)**: 缩放元素
- **rotate(angle)**: 旋转元素
- **skew(x-angle, y-angle)**: 倾斜元素
- **matrix()**: 使用矩阵进行复杂变换

**3D 变换**：
- **translateZ(z)** 或 **translate3d(x, y, z)**
- **rotateX(angle)**, **rotateY(angle)**, **rotateZ(angle)**
- **perspective(length)**: 设置透视效果

## 性能优化

为了获得更好的动画性能：

1. **尽量使用 transform 和 opacity**：这些属性可以触发 GPU 加速
2. **避免同时动画多个 CSS 属性**：特别是那些触发重排的属性
3. **使用 will-change 属性**：提前告知浏览器元素将要变化
4. **使用 requestAnimationFrame**：对于 JavaScript 控制的动画

## 浏览器兼容性

现代浏览器对这些功能都有很好的支持，但对于一些特定功能或旧浏览器，可能需要添加前缀（如 -webkit-, -moz-, -ms-）。`
    },
    {
      id: 25,
      title: 'transition 和 animation 的区别',
      tags: ['CSS', '动画'],
      difficulty: '中等',
      code: `/* Transition 示例：鼠标悬停时改变颜色和大小 */
.transition-box {
  width: 100px;
  height: 100px;
  background-color: blue;
  transition: all 1s ease;
}

.transition-box:hover {
  width: 150px;
  height: 150px;
  background-color: red;
}

/* Animation 示例：自动循环播放的脉动效果 */
@keyframes pulse {
  0% {
    transform: scale(1);
    background-color: blue;
  }
  50% {
    transform: scale(1.2);
    background-color: purple;
  }
  100% {
    transform: scale(1);
    background-color: blue;
  }
}

.animation-box {
  width: 100px;
  height: 100px;
  background-color: blue;
  animation: pulse 2s infinite ease-in-out;
}`,
      answer: `## transition 和 animation 的区别

CSS 提供了两种主要的动画机制：transition（过渡）和 animation（动画）。它们有不同的特点和适用场景。

### 1. 触发方式

**transition**:
- 需要触发事件（如 hover, focus, 或通过 JavaScript 添加类）才能开始
- 是一个从 A 状态到 B 状态的单次过渡
- 例如：鼠标悬停时按钮颜色变化

**animation**:
- 可以自动播放，无需触发事件
- 可以定义复杂的关键帧序列
- 例如：页面加载时的加载动画

### 2. 复杂度和灵活性

**transition**:
- 简单，只能定义起始和结束状态
- 只有一个关键帧（从初始状态到最终状态）
- 不能定义中间状态或复杂的动画路径

**animation**:
- 复杂，可以定义多个关键帧（@keyframes）
- 可以在动画序列中的任意点定义不同状态
- 可以实现更复杂的动画效果和路径

### 3. 控制能力

**transition**:
- 有限的控制选项（持续时间、延迟、时间函数）
- 不能暂停、重复或反向播放
- 不能精确控制中间状态

**animation**:
- 更多控制选项（名称、持续时间、延迟、时间函数、迭代次数、方向、填充模式、播放状态）
- 可以设置为无限循环（infinite）
- 可以设置为交替反向播放（alternate）
- 可以使用 animation-play-state 暂停和继续

### 4. 语法对比

**transition**:
\`\`\`css
.element {
  transition: property duration timing-function delay;
}
\`\`\`

**animation**:
\`\`\`css
@keyframes animationName {
  0% { /* 样式 */ }
  50% { /* 样式 */ }
  100% { /* 样式 */ }
}

.element {
  animation: animationName duration timing-function delay iteration-count direction fill-mode play-state;
}
\`\`\`

### 5. 适用场景

**transition 适合**:
- 简单的状态变化
- 基于用户交互的反馈
- 只需要平滑过渡而不需要复杂动画的情况

**animation 适合**:
- 复杂的动画序列
- 需要自动开始的动画
- 需要重复播放的动画
- 需要精确定义中间状态的动画

### 6. 性能考虑

两者都应该优先使用 transform 和 opacity 属性来获得更好的性能，因为这些属性可以通过 GPU 加速，不会触发重排（reflow）。`
    },
    // 题目 26: 如何实现在某个容器中垂直居中一个元素
{
  id: 26,
  title: '如何实现在某个容器中垂直居中一个元素',
  tags: ['CSS', '布局', '居中'],
  difficulty: '中等',
  code: `/* 方法1: Flexbox */
.container-flex {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
  height: 300px;
  background-color: #f0f0f0;
}

/* 方法2: Grid */
.container-grid {
  display: grid;
  place-items: center;     /* 水平和垂直居中的简写 */
  height: 300px;
  background-color: #f0f0f0;
}

/* 方法3: 绝对定位 + transform */
.container-absolute {
  position: relative;
  height: 300px;
  background-color: #f0f0f0;
}
.centered-absolute {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}`,
  answer: `## 在容器中垂直居中元素的方法

垂直居中是前端开发中常见的布局需求，下面介绍几种常用的实现方法，从传统方法到现代CSS技术。

### 1. Flexbox 方法（最推荐）

Flexbox 是现代布局的首选方案，简单直观且灵活。

\`\`\`css
.container {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
  height: 300px;
}
\`\`\`

**优点**：
- 代码简洁明了
- 自动处理不同大小的子元素
- 响应式，容器大小变化时仍保持居中
- 适用于单个或多个子元素

### 2. Grid 布局

CSS Grid 提供了更简洁的居中方法。

\`\`\`css
.container {
  display: grid;
  place-items: center; /* align-items 和 justify-items 的简写 */
  height: 300px;
}
\`\`\`

**优点**：
- 代码极其简洁
- 自动处理不同大小的子元素
- 适用于复杂的二维布局

### 3. 绝对定位 + Transform

传统但兼容性好的方法。

\`\`\`css
.container {
  position: relative;
  height: 300px;
}
.centered-element {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
\`\`\`

**优点**：
- 兼容性好，支持老旧浏览器
- 子元素大小未知时也能居中

### 4. 表格布局方法

使用CSS表格属性实现居中。

\`\`\`css
.container {
  display: table;
  height: 300px;
  width: 100%;
}
.centered-element {
  display: table-cell;
  vertical-align: middle;
  text-align: center; /* 水平居中文本或inline元素 */
}
\`\`\`

**优点**：
- 较好的浏览器兼容性
- 适合垂直居中文本内容

### 5. 行高方法（仅适用于单行文本）

\`\`\`css
.container {
  height: 100px;
  line-height: 100px; /* 与容器高度相同 */
  text-align: center; /* 水平居中 */
}
\`\`\`

**优点**：
- 简单易用
- 不需要额外的包装元素

**缺点**：
- 仅适用于单行文本
- 不适用于多行内容

### 6. Margin Auto 方法（适用于固定高度）

\`\`\`css
.container {
  position: relative;
  height: 300px;
}
.centered-element {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 100px; /* 必须设置高度 */
  width: 200px;  /* 必须设置宽度 */
}
\`\`\`

**优点**：
- 不需要使用transform
- 在某些性能敏感的场景可能有优势

**缺点**：
- 需要知道子元素的确切尺寸

### 最佳实践建议

- 在现代网站中，优先使用Flexbox或Grid方法，代码简洁且功能强大
- 对于需要支持旧浏览器的项目，可以使用绝对定位+transform方法
- 根据具体场景选择最适合的方法，例如单行文本可以使用line-height方法`
},
    // 题目 27: 相对定位和绝对定位的区别
{
  id: 27,
  title: '相对定位和绝对定位的区别',
  tags: ['CSS', '定位'],
  difficulty: '中等',
  code: `/* 相对定位示例 */
.relative-example {
  position: relative;
  top: 20px;
  left: 20px;
  background-color: #f0ad4e;
  width: 200px;
  height: 100px;
}

/* 绝对定位示例 */
.parent {
  position: relative; /* 创建定位上下文 */
  width: 400px;
  height: 300px;
  background-color: #eee;
}

.absolute-example {
  position: absolute;
  top: 30px;
  left: 30px;
  background-color: #5bc0de;
  width: 200px;
  height: 100px;
}`,
  answer: `## 相对定位和绝对定位的区别

### 相对定位 (position: relative)

相对定位是相对于元素**原本在文档流中的位置**进行定位。

**特点：**

1. **保留原始空间**：元素移动后，原来的位置会被保留，不会影响其他元素的布局
2. **定位参照物**：以元素原本在文档流中的位置为参照
3. **层叠关系**：可以通过 z-index 控制层叠顺序
4. **创建定位上下文**：为其内部的绝对定位元素创建定位上下文

**示例：**
\`\`\`css
.relative-box {
  position: relative;
  top: 20px;
  left: 30px;
}
\`\`\`

上面的代码会使元素相对于其原始位置向下移动 20px，向右移动 30px。但元素原本占据的空间仍然保留。

### 绝对定位 (position: absolute)

绝对定位是相对于**最近的已定位祖先元素**进行定位。如果没有已定位的祖先元素，则相对于初始包含块（通常是视口）。

**特点：**

1. **脱离文档流**：元素完全从文档流中移除，不再占据空间
2. **定位参照物**：以最近的已定位祖先元素为参照（已定位指的是 position 值不是 static 的元素）
3. **影响布局**：元素脱离后，可能导致父元素高度塌陷（如果父元素高度依赖于该元素）
4. **层叠关系**：可以通过 z-index 控制层叠顺序

**示例：**
\`\`\`css
.parent {
  position: relative; /* 创建定位上下文 */
}

.absolute-box {
  position: absolute;
  top: 20px;
  right: 30px;
}
\`\`\`

上面的代码会使元素相对于 .parent 定位，距离 .parent 顶部 20px，右侧 30px。

### 主要区别总结

| 特性 | 相对定位 (relative) | 绝对定位 (absolute) |
|------|-------------------|-------------------|
| 参照物 | 元素原始位置 | 最近的已定位祖先元素 |
| 文档流 | 保留在文档流中 | 完全脱离文档流 |
| 原空间 | 保留 | 不保留 |
| 对其他元素的影响 | 不影响其他元素布局 | 会影响其他元素布局 |
| 创建定位上下文 | 是 | 否 |

### 使用场景

**相对定位适用于：**
- 微调元素位置，而不影响整体布局
- 为绝对定位的子元素创建定位上下文
- 利用 z-index 控制层叠顺序

**绝对定位适用于：**
- 需要精确控制元素位置的界面元素
- 弹出层、工具提示
- 独立于文档流的浮动控件
- 覆盖在其他内容上的元素

### 实际应用示例

**模态框居中定位：**
\`\`\`css
.modal-container {
  position: fixed; /* 或 absolute */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* 其他样式 */
}
\`\`\`

**导航栏的下拉菜单：**
\`\`\`css
.nav-item {
  position: relative; /* 创建定位上下文 */
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  /* 其他样式 */
}
\`\`\`

掌握相对定位和绝对定位的区别及应用场景，是构建复杂页面布局的基础。`
},
{
  id: 28,
  title: 'Flex 布局',
  tags: ['CSS', '布局', 'Flexbox'],
  difficulty: '中等',
  code: `/* 基本的 Flex 容器 */
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

/* Flex 子项 */
.item {
  flex: 1 0 200px;
}

/* 不同方向的 Flex */
.column-container {
  display: flex;
  flex-direction: column;
  height: 300px;
}

/* 复杂的 Flex 布局示例 */
.complex-layout {
  display: flex;
  flex-wrap: wrap;
}

.sidebar {
  flex: 0 0 250px;
}

.main-content {
  flex: 1;
  min-width: 300px;
}`,
  answer: `## Flex 布局详解

Flexbox（弹性盒子）是 CSS3 引入的一种一维布局模型，它提供了强大而灵活的方式来分配空间和对齐项目。

### 基本概念

Flex 布局分为两个部分：
1. **Flex 容器（container）**：设置 \`display: flex\` 或 \`display: inline-flex\` 的元素
2. **Flex 项目（items）**：Flex 容器的直接子元素

### Flex 容器属性

#### display

\`\`\`css
.container {
  display: flex; /* 或 inline-flex */
}
\`\`\`

#### flex-direction（主轴方向）

\`\`\`css
.container {
  flex-direction: row; /* 默认值，水平方向，从左到右 */
  /* 其他值: row-reverse, column, column-reverse */
}
\`\`\`

#### flex-wrap（是否换行）

\`\`\`css
.container {
  flex-wrap: nowrap; /* 默认值，不换行 */
  /* 其他值: wrap, wrap-reverse */
}
\`\`\`

#### flex-flow（方向和换行的简写）

\`\`\`css
.container {
  flex-flow: row wrap; /* 水平方向，允许换行 */
}
\`\`\`

#### justify-content（主轴对齐方式）

\`\`\`css
.container {
  justify-content: flex-start; /* 默认值，左对齐 */
  /* 其他值: flex-end, center, space-between, space-around, space-evenly */
}
\`\`\`

| 值 | 效果 |
|---|---|
| flex-start | 左对齐 |
| flex-end | 右对齐 |
| center | 居中 |
| space-between | 两端对齐，项目之间间隔相等 |
| space-around | 项目两侧间隔相等 |
| space-evenly | 项目间隔完全相等 |

#### align-items（交叉轴对齐方式）

\`\`\`css
.container {
  align-items: stretch; /* 默认值，拉伸填满容器高度 */
  /* 其他值: flex-start, flex-end, center, baseline */
}
\`\`\`

#### align-content（多行对齐方式）

\`\`\`css
.container {
  align-content: stretch; /* 默认值 */
  /* 其他值: flex-start, flex-end, center, space-between, space-around */
}
\`\`\`

#### gap, row-gap, column-gap（间距）

\`\`\`css
.container {
  gap: 10px; /* 行和列间距都为10px */
  /* 或分别设置 */
  row-gap: 10px;
  column-gap: 20px;
}
\`\`\`

### Flex 项目属性

#### order（排序）

\`\`\`css
.item {
  order: 0; /* 默认值，数值越小，排列越靠前 */
}
\`\`\`

#### flex-grow（放大比例）

\`\`\`css
.item {
  flex-grow: 0; /* 默认值，不放大 */
}

.item-grow {
  flex-grow: 1; /* 将占用剩余空间 */
}
\`\`\`

#### flex-shrink（缩小比例）

\`\`\`css
.item {
  flex-shrink: 1; /* 默认值，空间不足时将缩小 */
}

.item-no-shrink {
  flex-shrink: 0; /* 不缩小 */
}
\`\`\`

#### flex-basis（基础尺寸）

\`\`\`css
.item {
  flex-basis: auto; /* 默认值，项目本身大小 */
  /* 也可设置具体尺寸 */
  flex-basis: 200px;
}
\`\`\`

#### flex（简写属性）

\`\`\`css
.item {
  flex: 0 1 auto; /* 默认值: flex-grow flex-shrink flex-basis */
  
  /* 常用值 */
  flex: 1; /* 相当于 flex: 1 1 0% */
  flex: auto; /* 相当于 flex: 1 1 auto */
  flex: none; /* 相当于 flex: 0 0 auto，固定尺寸 */
}
\`\`\`

#### align-self（单个项目对齐方式）

\`\`\`css
.item {
  align-self: auto; /* 默认值，继承父容器的align-items */
  /* 其他值: flex-start, flex-end, center, baseline, stretch */
}
\`\`\`

### 常见布局案例

#### 1. 导航栏布局

\`\`\`css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

.logo {
  /* 固定尺寸 */
}

.nav-links {
  display: flex;
  gap: 20px;
}
\`\`\`

#### 2. 圣杯布局（头部，左右侧栏，主内容，底部）

\`\`\`css
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header, .footer {
  flex: 0 0 auto;
}

.main-container {
  display: flex;
  flex: 1;
}

.sidebar-left {
  flex: 0 0 200px;
}

.content {
  flex: 1;
}

.sidebar-right {
  flex: 0 0 200px;
}
\`\`\`

#### 3. 卡片栅格系统

\`\`\`css
.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  flex: 1 0 300px; /* 增长，不缩小，基础宽度 */
}

@media (max-width: 768px) {
  .card {
    flex-basis: 100%;
  }
}
\`\`\`

#### 4. 垂直居中

\`\`\`css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
\`\`\`

### Flex 布局的优势

1. **简单实现复杂布局**：使用少量代码就能实现以前需要复杂定位和浮动的布局
2. **响应式**：容易创建响应不同屏幕尺寸的布局
3. **垂直居中**：简单实现垂直居中，这在传统CSS中很困难
4. **空间分配**：可以精确控制元素之间和周围的空间
5. **顺序调整**：可以不修改HTML而调整显示顺序

### 兼容性考虑

Flexbox 在所有现代浏览器中都得到了很好的支持。对于需要支持非常老旧浏览器（如IE9及以下）的情况，通常需要回退方案。

当前的最佳实践是将Flexbox作为主要布局工具，配合Grid布局来处理更复杂的二维布局需求。`
},
    // 题目 29: Grid 布局
{
  id: 29,
  title: 'Grid 布局',
  tags: ['CSS', '布局', 'Grid'],
  difficulty: '中等',
  code: `/* 基本 Grid 容器 */
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto 100px;
  gap: 10px;
}

/* 特定网格项定位 */
.grid-item-span {
  grid-column: 1 / 3; /* 从第1条网格线到第3条网格线 */
  grid-row: 1 / 3;    /* 跨越两行 */
}

/* 使用网格区域命名 */
.grid-template-areas {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header header"
    "sidebar content aside"
    "footer footer footer";
  min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }

/* 响应式网格 */
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}`,
  answer: `## CSS Grid 布局详解

Grid 布局是 CSS 中一种强大的二维布局系统，专为设计复杂的网格布局而生。它允许开发者同时控制行和列，创建灵活且精确的布局。

### 基本概念

- **Grid 容器**：设置 \`display: grid\` 或 \`display: inline-grid\` 的元素
- **Grid 项目**：Grid 容器的直接子元素
- **Grid 线**：构成网格结构的水平和垂直分隔线
- **Grid 单元格**：网格中的最小单位，由相邻的两条行线和两条列线所围成
- **Grid 轨道**：两条相邻网格线之间的空间，即行或列
- **Grid 区域**：由四条网格线包围的矩形区域，可包含多个单元格

### Grid 容器属性

#### display

\`\`\`css
.container {
  display: grid; /* 或 inline-grid */
}
\`\`\`

#### grid-template-columns 和 grid-template-rows

定义网格的列和行的尺寸：

\`\`\`css
.container {
  grid-template-columns: 100px 200px 1fr;     /* 三列，宽度分别为100px、200px和剩余空间 */
  grid-template-rows: 50px auto 100px;        /* 三行，高度分别为50px、自动和100px */
  
  /* 使用repeat()函数简化重复值 */
  grid-template-columns: repeat(3, 1fr);      /* 三等分列 */
  
  /* 使用minmax()函数限制最小最大值 */
  grid-template-columns: minmax(100px, 1fr) 2fr 1fr;
}
\`\`\`

#### grid-template-areas

通过命名网格区域定义布局：

\`\`\`css
.container {
  grid-template-areas:
    "header header header"
    "sidebar content aside"
    "footer footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }
\`\`\`

#### gap, row-gap, column-gap

设置网格单元格之间的间距：

\`\`\`css
.container {
  row-gap: 10px;
  column-gap: 15px;
  /* 或简写为 */
  gap: 10px 15px;
  /* 如果间距相同，可以进一步简写 */
  gap: 10px;
}
\`\`\`

#### justify-items 和 align-items

控制网格项目在单元格内的水平和垂直对齐方式：

\`\`\`css
.container {
  justify-items: start | end | center | stretch; /* 默认为stretch */
  align-items: start | end | center | stretch;   /* 默认为stretch */
}
\`\`\`

#### justify-content 和 align-content

当网格总大小小于容器大小时，控制网格在容器内的对齐方式：

\`\`\`css
.container {
  justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
  align-content: start | end | center | stretch | space-around | space-between | space-evenly;
}
\`\`\`

#### grid-auto-flow

控制自动放置的网格项目的流动方向：

\`\`\`css
.container {
  grid-auto-flow: row | column | row dense | column dense;
}
\`\`\`

### Grid 项目属性

#### grid-column 和 grid-row

指定网格项目放置的位置：

\`\`\`css
.item {
  grid-column: 1 / 3;   /* 从第1条列线到第3条列线 */
  grid-row: 2 / 4;      /* 从第2条行线到第4条行线 */
  
  /* 也可以使用span关键字 */
  grid-column: 1 / span 2; /* 从第1条列线开始，跨越2个单元格 */
  
  /* 可以简写 grid-column-start 和 grid-column-end */
  grid-column-start: 1;
  grid-column-end: 3;
}
\`\`\`

#### grid-area

指定项目放置在哪个命名的网格区域，或直接指定网格线：

\`\`\`css
.item {
  grid-area: header; /* 放置在名为header的区域 */
  
  /* 或者直接指定网格线 row-start/column-start/row-end/column-end */
  grid-area: 1 / 2 / 3 / 4;
}
\`\`\`

#### justify-self 和 align-self

控制单个网格项目在单元格内的对齐方式：

\`\`\`css
.item {
  justify-self: start | end | center | stretch;
  align-self: start | end | center | stretch;
}
\`\`\`

### 响应式 Grid 布局

使用 Grid 创建响应式布局变得简单：

\`\`\`css
.responsive-grid {
  display: grid;
  /* 根据可用空间自动填充列，每列最小250px，最大1fr */
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}
\`\`\`

### 常见布局案例

#### 1. 经典网站布局（页眉、侧边栏、主内容、页脚）

\`\`\`css
.site-layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header"
    "sidebar content"
    "footer footer";
  min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.footer { grid-area: footer; }
\`\`\`

#### 2. 照片画廊

\`\`\`css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: 200px;
  gap: 10px;
}

.gallery img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 特殊照片可以跨越多个单元格 */
.gallery .featured {
  grid-column: span 2;
  grid-row: span 2;
}
\`\`\`

#### 3. 仪表盘布局

\`\`\`css
.dashboard {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(100px, auto);
  gap: 15px;
}

.widget-large {
  grid-column: span 2;
  grid-row: span 2;
}

.widget-wide {
  grid-column: span 4;
}
\`\`\`

### Grid vs Flexbox

| 特性 | Grid | Flexbox |
|------|------|---------|
| 维度 | 二维（行和列） | 一维（行或列） |
| 用途 | 整体页面布局 | 组件内部布局 |
| 方向控制 | 同时控制行和列 | 主轴和交叉轴 |
| 适用场景 | 复杂的网格系统 | 线性布局（导航栏等）|
| 项目放置 | 可以精确定位 | 主要基于顺序和大小 |

### Grid 布局的优势

1. **二维布局**：同时控制行和列，简化复杂布局
2. **显式定位**：可以精确放置元素，不依赖源顺序
3. **强大的对齐能力**：控制项目在单元格内以及整个网格的对齐
4. **响应式设计**：使用像 fr 和 minmax() 等特性轻松创建响应式设计
5. **命名区域**：通过 grid-template-areas 提供直观的布局可视化

### 浏览器兼容性

Grid 布局在所有现代浏览器中都得到了良好支持。IE11 部分支持较早版本的网格规范，需要添加前缀。

实际项目中，Grid 和 Flexbox 往往结合使用：Grid 用于整体页面布局，Flexbox 用于组件内部元素的排列。`
},
   // 题目 30: Less 和 SCSS 的区别
{
  id: 30,
  title: 'Less 和 SCSS 的区别',
  tags: ['CSS', '预处理器'],
  difficulty: '中等',
  code: `/* SCSS 语法示例 */
$primary-color: #3498db;
$padding: 10px;

.container {
  background-color: lighten($primary-color, 20%);
  
  .button {
    padding: $padding;
    border: 1px solid $primary-color;
    
    &:hover {
      background-color: $primary-color;
      color: white;
    }
    
    @media (max-width: 768px) {
      padding: $padding / 2;
    }
  }
}

/* Less 语法示例 */
@primary-color: #3498db;
@padding: 10px;

.container {
  background-color: lighten(@primary-color, 20%);
  
  .button {
    padding: @padding;
    border: 1px solid @primary-color;
    
    &:hover {
      background-color: @primary-color;
      color: white;
    }
    
    @media (max-width: 768px) {
      padding: @padding / 2;
    }
  }
}`,
  answer: `## Less 和 SCSS 的区别

### 1. 基本介绍

**SCSS (Sass)**:
- SCSS 是 Sass (Syntactically Awesome Style Sheets) 的一种语法格式
- 是一个强大的 CSS 预处理器，提供了变量、嵌套、混合、继承等功能
- 通常使用 Ruby 或 Node.js 实现（现代项目多使用 Node.js 实现的 Dart Sass 或 Node Sass）

**Less**:
- Less 是一个 CSS 预处理器，也提供了类似的功能
- 运行在 Node.js 环境或浏览器中
- 语法上更接近原生 CSS

### 2. 语法差异

#### 变量声明

**SCSS**:
\`\`\`scss
$primary-color: #3498db;
\`\`\`

**Less**:
\`\`\`less
@primary-color: #3498db;
\`\`\`

#### 嵌套和作用域

两者嵌套语法相似，但 SCSS 的变量作用域规则更严格。

#### 混合 (Mixins)

**SCSS**:
\`\`\`scss
@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
  -moz-border-radius: $radius;
  border-radius: $radius;
}

.box {
  @include border-radius(10px);
}
\`\`\`

**Less**:
\`\`\`less
.border-radius(@radius) {
  -webkit-border-radius: @radius;
  -moz-border-radius: @radius;
  border-radius: @radius;
}

.box {
  .border-radius(10px);
}
\`\`\`

### 3. 功能差异

#### 循环和控制指令

**SCSS** 支持丰富的控制指令：
\`\`\`scss
@for $i from 1 through 3 {
  .item-#{$i} { width: 100px * $i; }
}

@each $color in red, green, blue {
  .#{$color}-text { color: $color; }
}

@if $theme == dark {
  // 样式
} @else {
  // 样式
}
\`\`\`

**Less** 使用递归混合和条件判断：
\`\`\`less
.loop(@i) when (@i > 0) {
  .item-@{i} { width: 100px * @i; }
  .loop(@i - 1);
}
.loop(3);

@colors: red, green, blue;
each(@colors, {
  .@{value}-text { color: @value; }
});

.theme(@type) when (@type = dark) {
  // 样式
}
.theme(@type) when (@type = light) {
  // 样式
}
.theme(@theme);
\`\`\`

### 4. 工具和生态系统

- **SCSS**: 具有更广泛的社区支持和更多的工具集成
- **Less**: 相对简单，学习曲线较低

### 5. 性能和编译

- 对于大型项目，Dart Sass (SCSS 的实现) 通常编译性能更好
- Less 可以直接在浏览器中解析，但这在生产环境中不推荐

### 6. 总结对比

| 特性 | SCSS | Less |
|------|------|------|
| 变量声明 | $variable | @variable |
| 混合语法 | @mixin/@include | .mixin() |
| 选择器嵌套 | 支持 | 支持 |
| 运算能力 | 强大 | 基本支持 |
| 循环结构 | @for、@each、@while | 递归混合、each() |
| 条件语句 | @if/@else | guard 表达式 |
| 函数 | 丰富内置函数，可自定义 | 基本函数，可自定义 |
| 作用域 | 块级作用域 | 类似全局作用域 |
| 导入文件 | @import/@use | @import |
| 模块化 | 支持 @use 和命名空间 | 较弱 |
| 可扩展性 | 更强 | 一般 |
| 学习曲线 | 较陡 | 较平缓 |

### 7. 选择建议

- **选择 SCSS**: 大型项目、需要高级特性、构建复杂的样式系统
- **选择 Less**: 简单项目、学习成本低、小型团队

目前在行业中，SCSS 由于功能更完善、社区支持更好，使用更为广泛，特别是在中大型项目中。`
},
    {
      id: 31,
      title: 'CSS3 伪类，伪元素',
      tags: ['CSS3', '选择器'],
      difficulty: '中等',
      code: `/* 伪类示例 */
a:hover {
  color: red;
}

input:focus {
  border-color: blue;
}

li:nth-child(odd) {
  background-color: #f2f2f2;
}

p:first-of-type {
  font-weight: bold;
}

/* 伪元素示例 */
p::first-line {
  font-variant: small-caps;
}

p::first-letter {
  font-size: 2em;
}

.quote::before {
  content: "❝";
  color: #999;
}

.quote::after {
  content: "❞";
  color: #999;
}`,
      answer: `## CSS3 伪类与伪元素

### 伪类与伪元素的区别

1. **伪类**：选择元素的特定**状态**或**位置**，使用单冒号（:）
2. **伪元素**：创建不在文档树中的虚拟元素，使用双冒号（::）（CSS3 规范，但单冒号仍然兼容）

### 常用伪类（Pseudo-classes）

#### 1. 链接/用户操作相关伪类

- **:link** - 未访问的链接
- **:visited** - 已访问的链接
- **:hover** - 鼠标悬停的元素
- **:active** - 激活的元素（如鼠标按下）
- **:focus** - 获得焦点的元素（如输入框）

\`\`\`css
a:link { color: blue; }
a:visited { color: purple; }
a:hover { color: red; }
a:active { color: orange; }
input:focus { border-color: blue; }
\`\`\`

#### 2. 表单相关伪类

- **:checked** - 选中的复选框或单选按钮
- **:disabled** - 禁用的表单元素
- **:enabled** - 启用的表单元素
- **:valid** - 通过验证的表单元素
- **:invalid** - 未通过验证的表单元素
- **:required** - 必填的表单元素
- **:optional** - 选填的表单元素

\`\`\`css
input:checked { background-color: #e6f7ff; }
input:disabled { opacity: 0.5; }
input:valid { border-color: green; }
input:invalid { border-color: red; }
\`\`\`

#### 3. 结构性伪类

- **:first-child** - 作为第一个子元素的元素
- **:last-child** - 作为最后一个子元素的元素
- **:nth-child(n)** - 作为第n个子元素的元素
- **:nth-last-child(n)** - 从后往前数，第n个子元素
- **:first-of-type** - 特定类型的第一个元素
- **:last-of-type** - 特定类型的最后一个元素
- **:nth-of-type(n)** - 特定类型的第n个元素
- **:only-child** - 唯一的子元素
- **:only-of-type** - 特定类型的唯一子元素
- **:empty** - 没有子元素的元素

\`\`\`css
li:first-child { font-weight: bold; }
li:nth-child(odd) { background-color: #f2f2f2; }
p:first-of-type { margin-top: 0; }
div:empty { display: none; }
\`\`\`

#### 4. 否定伪类

- **:not(selector)** - 不匹配指定选择器的元素

\`\`\`css
input:not([type="submit"]) { border: 1px solid #ccc; }
li:not(.highlighted) { color: #333; }
\`\`\`

### 常用伪元素（Pseudo-elements）

伪元素使用双冒号（::）语法，CSS3 规范引入，但为保持兼容性，单冒号（:）同样有效。

- **::before** - 在元素内容之前插入内容
- **::after** - 在元素内容之后插入内容
- **::first-line** - 选择文本的第一行
- **::first-letter** - 选择文本的第一个字母
- **::selection** - 用户选中的文本部分
- **::placeholder** - 表单元素的占位符文本
- **::marker** - 列表项的标记（如项目符号或数字）

\`\`\`css
.quote::before {
  content: "❝";
  color: #999;
}

.quote::after {
  content: "❞";
  color: #999;
}

p::first-line {
  font-variant: small-caps;
}

p::first-letter {
  font-size: 2em;
  float: left;
  margin-right: 5px;
}

::selection {
  background-color: #a8d1ff;
  color: #000;
}

input::placeholder {
  color: #999;
  font-style: italic;
}
\`\`\`

### 伪类与伪元素的实际应用

#### 清除浮动

\`\`\`css
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
\`\`\`

#### 添加装饰性内容

\`\`\`css
.external-link::after {
  content: " ↗";
  font-size: 0.8em;
}

.required-field::after {
  content: "*";
  color: red;
  margin-left: 3px;
}
\`\`\`

#### 创建工具提示

\`\`\`css
[data-tooltip]:hover::before {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: white;
  padding: 5px 10px;
  border-radius: 3px;
}
\`\`\`

CSS3 的伪类和伪元素极大地增强了选择器的能力，使得我们可以更精确地定位元素并添加样式，而不需要额外的 HTML 标记。`
    },
    {
      id: 32,
      title: '::before 和 ::after 中双冒号的作用',
      tags: ['CSS', '伪元素'],
      difficulty: '中等',
      code: `/* CSS3 中推荐的双冒号语法 */
.element::before {
  content: "前缀";
  color: blue;
}

.element::after {
  content: "后缀";
  color: red;
}

/* CSS2 中的单冒号语法（仍然有效） */
.legacy:before {
  content: "前缀";
}

.legacy:after {
  content: "后缀";
}`,
      answer: `## ::before 和 ::after 中双冒号的作用

### 双冒号的引入

CSS3 引入双冒号（::）的主要目的是为了区分**伪类**和**伪元素**：

- **伪类**（:）：选择元素的特定状态，如 \`:hover\`, \`:active\`, \`:focus\` 等
- **伪元素**（::）：创建一个不在文档树中的虚拟元素，如 \`::before\`, \`::after\`, \`::first-line\` 等

### 历史背景

1. **CSS1 和 CSS2**：最初在 CSS1 和 CSS2 中，伪类和伪元素都使用单冒号（:）语法
   \`\`\`css
   p:first-line { font-weight: bold; }
   p:before { content: "注意: "; }
   \`\`\`

2. **CSS3**：为了解决混淆问题，引入了双冒号语法来明确区分伪元素
   \`\`\`css
   p::first-line { font-weight: bold; }
   p::before { content: "注意: "; }
   \`\`\`

### 兼容性考虑

为了保持向后兼容性，浏览器仍然支持伪元素的单冒号语法：
\`\`\`css
p:before { content: "旧语法，但仍然有效"; }
p::before { content: "新语法，推荐使用"; }
\`\`\`

两种写法在功能上是完全相同的，区别仅在于语法规范和可读性。

### ::before 和 ::after 的工作原理

这两个伪元素允许在元素内容的前面或后面插入内容：

\`\`\`css
.quote::before {
  content: "«";
}

.quote::after {
  content: "»";
}
\`\`\`

HTML：
\`\`\`html
<p class="quote">这是一段引用文字</p>
\`\`\`

渲染结果类似于：
\`\`\`
«这是一段引用文字»
\`\`\`

### 重要特性

1. **content 属性是必须的**：即使设置为空字符串 \`content: "";\`，也必须存在
2. **默认是行内元素**：可以通过 \`display\` 属性修改
3. **可以设置所有普通元素能设置的样式**
4. **不会出现在 DOM 中**：只在渲染时存在，无法通过 JavaScript 直接操作
5. **伪元素可以配合伪类使用**：如 \`.element:hover::after\`

### 实际应用场景

1. **添加装饰性内容**
   \`\`\`css
   .new-feature::after {
     content: "NEW";
     background-color: red;
     color: white;
     padding: 2px 5px;
     border-radius: 3px;
     font-size: 12px;
     margin-left: 5px;
   }
   \`\`\`

2. **清除浮动**
   \`\`\`css
   .clearfix::after {
     content: "";
     display: table;
     clear: both;
   }
   \`\`\`

3. **创建工具提示**
   \`\`\`css
   [data-tooltip]::after {
     content: attr(data-tooltip);
     display: none;
     position: absolute;
   }
   
   [data-tooltip]:hover::after {
     display: block;
   }
   \`\`\`

4. **添加图标**
   \`\`\`css
   .external-link::after {
     content: "↗";
     margin-left: 3px;
   }
   \`\`\`

5. **创建几何形状**
   \`\`\`css
   .triangle::before {
     content: "";
     display: inline-block;
     width: 0;
     height: 0;
     border-left: 5px solid transparent;
     border-right: 5px solid transparent;
     border-bottom: 10px solid black;
   }
   \`\`\`

双冒号伪元素提供了一种强大的方式来增强网页的视觉效果，而不需要添加额外的 HTML 元素，保持 HTML 结构的简洁和语义化。`
    },
    {
      id: 33,
      title: '响应式布局的实现方案',
      tags: ['CSS', '响应式设计'],
      difficulty: '中等',
      code: `/* 媒体查询 */
@media (max-width: 768px) {
  .container {
    width: 100%;
    padding: 0 15px;
  }
  .sidebar {
    display: none;
  }
}

/* 流式布局 */
.fluid-container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
}

/* Flexbox 布局 */
.flex-container {
  display: flex;
  flex-wrap: wrap;
}
.flex-item {
  flex: 1 1 300px; /* 放大、缩小、基础宽度 */
}

/* Grid 布局 */
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}`,
      answer: `## 响应式布局的实现方案

响应式网页设计（Responsive Web Design）是一种让网站能够自适应不同设备和屏幕尺寸的设计方法。以下是主要的响应式布局实现方案：

### 1. 媒体查询（Media Queries）

媒体查询是实现响应式设计的基础，它允许根据设备特性（如屏幕宽度、高度、分辨率等）来应用不同的 CSS 样式。

\`\`\`css
/* 移动设备 */
@media (max-width: 576px) {
  .container {
    width: 100%;
  }
}

/* 平板设备 */
@media (min-width: 577px) and (max-width: 992px) {
  .container {
    width: 90%;
  }
}

/* 桌面设备 */
@media (min-width: 993px) {
  .container {
    width: 80%;
    max-width: 1200px;
  }
}
\`\`\`

**优点**：
- 精确控制不同屏幕下的样式
- 可以针对特定设备做优化

**缺点**：
- 代码冗余
- 维护成本高

### 2. 流式布局（Fluid Layout）

流式布局使用相对单位（如百分比）而不是固定单位（如像素）来定义元素尺寸，使布局能够根据浏览器窗口大小自动调整。

\`\`\`css
.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
}

.column {
  float: left;
  width: 33.33%;
  padding: 0 15px;
}

@media (max-width: 768px) {
  .column {
    width: 50%;
  }
}

@media (max-width: 480px) {
  .column {
    width: 100%;
  }
}
\`\`\`

**优点**：
- 适应性强，几乎适用于任何屏幕尺寸
- 简单实用

**缺点**：
- 在极小或极大屏幕上可能会出现布局问题
- 对元素间的比例控制有限

### 3. Flexbox 布局

Flexbox（弹性盒子）是一种一维布局模型，提供了强大的空间分布和对齐能力。

\`\`\`css
.flex-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.flex-item {
  flex: 1 1 300px; /* 放大、缩小、基础宽度 */
  margin: 10px;
}

@media (max-width: 600px) {
  .flex-item {
    flex-basis: 100%;
  }
}
\`\`\`

**优点**：
- 灵活控制元素的大小、顺序和分布
- 轻松实现垂直居中等复杂布局
- 响应式设计更简单

**缺点**：
- 不适合复杂的二维布局
- 旧版浏览器支持有限

### 4. Grid 布局

Grid（网格）布局是一种二维布局系统，同时控制行和列，提供了更强大的布局能力。

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}
\`\`\`

**优点**：
- 强大的二维布局控制
- 使用 \`auto-fit\` 和 \`minmax()\` 可以实现高度响应式布局
- 显式和隐式的控制能力

**缺点**：
- 较新的技术，旧浏览器兼容性差
- 学习曲线较陡

### 5. 移动优先设计

移动优先是一种设计策略，先为移动设备设计页面，然后通过媒体查询为大屏幕添加样式。

\`\`\`css
/* 默认移动设备样式 */
.container {
  width: 100%;
  padding: 0 15px;
}

/* 平板样式 */
@media (min-width: 768px) {
  .container {
    width: 750px;
    margin: 0 auto;
  }
}

/* 桌面样式 */
@media (min-width: 992px) {
  .container {
    width: 970px;
  }
}
\`\`\`

**优点**：
- 强制优先考虑移动用户体验
- 通常产生更快、更精简的代码
- 符合渐进增强的原则

**缺点**：
- 大屏设计可能受限于移动设计

### 6. CSS 框架

使用 Bootstrap、Foundation 等响应式框架可以快速实现响应式设计。

\`\`\`html
<div class="container">
  <div class="row">
    <div class="col-sm-12 col-md-6 col-lg-4">内容1</div>
    <div class="col-sm-12 col-md-6 col-lg-4">内容2</div>
    <div class="col-sm-12 col-md-12 col-lg-4">内容3</div>
  </div>
</div>
\`\`\`

**优点**：
- 快速开发
- 解决了大多数常见问题
- 经过广泛测试的可靠性

**缺点**：
- 可能导致臃肿的代码
- 有时难以高度定制

### 7. 视口单位（Viewport Units）

使用 vw、vh、vmin、vmax 等视口相关单位使元素尺寸基于视口而不是父容器。

\`\`\`css
.responsive-title {
  font-size: 5vw; /* 视口宽度的5% */
}

.full-height {
  height: 100vh; /* 视口高度的100% */
}

.responsive-padding {
  padding: 2vmin; /* 视口宽度或高度中较小值的2% */
}
\`\`\`

**优点**：
- 简洁易用
- 高度响应性
- 元素尺寸直接与视口关联

**缺点**：
- 精确控制有限
- 在极小或极大屏幕上可能需要限制最小/最大值

### 实际应用中的组合策略

在实际项目中，通常会组合使用多种技术来实现最佳的响应式设计：

\`\`\`css
.modern-layout {
  /* 基础流式布局 */
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  
  /* 弹性布局 */
  display: flex;
  flex-wrap: wrap;
  
  /* 响应式字体 */
  font-size: calc(16px + 0.5vw);
}

.modern-layout__item {
  /* 基础占比 */
  flex: 1 1 300px;
  
  /* 响应式内边距 */
  padding: clamp(15px, 3vw, 30px);
}

/* 媒体查询进一步优化 */
@media (max-width: 768px) {
  .modern-layout {
    flex-direction: column;
  }
}
\`\`\`

选择适合项目的响应式设计方法取决于目标受众、设备支持要求、项目复杂性和开发团队的技能水平。现代的开发通常会倾向于使用 Flexbox 和 Grid 来简化响应式设计流程。`
    },
   // 题目 34: link 标签和 import 标签的区别
{
  id: 34,
  title: 'link 标签和 import 标签的区别',
  tags: ['HTML', 'CSS', '性能'],
  difficulty: '中等',
  code: `<!-- 使用link标签引入CSS -->
<link rel="stylesheet" href="styles.css">

<!-- 使用style标签和@import引入CSS -->
<style>
  @import url('styles.css');
</style>

/* 在CSS文件中使用@import */
@import url('another-styles.css');

/* link标签的其他用途 */
<link rel="icon" href="favicon.ico">
<link rel="preload" href="important.css" as="style">
<link rel="prefetch" href="future-page.html">`,
  answer: `## link 标签和 @import 的区别

\`<link>\` 标签和 \`@import\` 都可以用来引入外部 CSS 文件，但它们有许多重要区别。

### 1. 语法和位置

**link 标签**：HTML 标签，放在 HTML 文档的 \`<head>\` 部分
\`\`\`html
<link rel="stylesheet" href="styles.css">
\`\`\`

**@import**：CSS 规则，可以在 CSS 文件中使用，也可以在 \`<style>\` 标签内使用
\`\`\`css
@import url('styles.css');
\`\`\`
\`\`\`html
<style>
  @import url('styles.css');
</style>
\`\`\`

### 2. 加载方式和性能

**link 标签**：
- 与页面同时加载（并行下载）
- 可以同时加载多个文件
- 不会阻塞页面渲染

**@import**：
- 页面加载完才被加载（串行加载）
- 每个 @import 都会创建额外的 HTTP 请求
- 可能导致闪烁（FOUC - Flash of Unstyled Content）
- 影响页面加载性能，特别是嵌套 @import 的情况

### 3. 浏览器兼容性

**link 标签**：所有浏览器都支持

**@import**：IE 5+ 及其他现代浏览器支持，有些老旧浏览器可能不支持

### 4. JavaScript 操作

**link 标签**：可以通过 DOM 方法动态创建、修改或删除
\`\`\`javascript
// 动态创建 link 元素
const linkElement = document.createElement('link');
linkElement.rel = 'stylesheet';
linkElement.href = 'dynamic-styles.css';
document.head.appendChild(linkElement);
\`\`\`

**@import**：无法通过 JavaScript 直接操作，因为它不是 DOM 的一部分

### 5. 媒体查询支持

**link 标签**：使用 media 属性实现条件加载
\`\`\`html
<link rel="stylesheet" href="mobile.css" media="screen and (max-width: 768px)">
<link rel="stylesheet" href="print.css" media="print">
\`\`\`

**@import**：也支持媒体查询，但位于 CSS 内部
\`\`\`css
@import url('mobile.css') screen and (max-width: 768px);
\`\`\`

### 6. 功能扩展性

**link 标签**：不仅用于加载样式表，还可以：
- 设置网站图标： \`<link rel="icon" href="favicon.ico">\`
- 预加载资源： \`<link rel="preload" href="font.woff2" as="font">\`
- 预获取资源： \`<link rel="prefetch" href="next-page.html">\`
- 建立外部资源连接： \`<link rel="dns-prefetch" href="https://example.com">\`

**@import**：仅用于导入 CSS 文件

### 7. 加载控制

**link 标签**：可以使用 \`disabled\` 属性或通过 JavaScript 禁用/启用样式表
\`\`\`javascript
document.querySelector('link[href="styles.css"]').disabled = true;
\`\`\`

**@import**：无法轻易禁用已加载的样式

### 8. 实际应用建议

**推荐使用 \`<link>\` 的场景**：
- 生产环境下的主要样式表加载
- 需要并行加载多个样式文件
- 需要通过 JavaScript 操控样式加载
- 利用现代特性如预加载、预获取等优化性能

**\`@import\` 的适用场景**：
- 在主样式表中引入辅助样式（如变量、混合器）
- 按模块组织 CSS 代码
- 在开发环境中组织代码（生产环境应合并为单一文件）
- 按条件加载非关键路径上的样式

### 总结

在大多数情况下，出于性能和可控性考虑，推荐使用 \`<link>\` 标签而非 \`@import\`。特别是在生产环境中，应避免使用 \`@import\` 导入主要样式文件，以免影响页面加载性能。

如果项目使用构建工具（如 Webpack、Gulp），可以在开发时使用 \`@import\` 组织代码，但在构建过程中将其合并为单一文件，通过 \`<link>\` 引入。`
},
   // 题目 35: 块元素、行元素、置换元素的区别
{
  id: 35,
  title: '块元素、行元素、置换元素的区别',
  tags: ['HTML', 'CSS', '布局'],
  difficulty: '中等',
  code: `/* 块元素示例 */
div, p, h1, section {
  width: 300px;
  height: 100px;
  margin: 20px;
  padding: 10px;
  background-color: #f0f0f0;
}

/* 行内元素示例 */
span, a, em, strong {
  /* 这些设置对行内元素不生效或部分生效 */
  width: 200px;  /* 不生效 */
  height: 50px;  /* 不生效 */
  margin-top: 20px;  /* 不生效 */
  margin-right: 20px;  /* 生效 */
  padding: 10px;  /* 视觉上生效，但不影响布局 */
  background-color: #e0e0ff;
}

/* 置换元素示例 */
img, input, video, textarea {
  width: 200px;  /* 生效 */
  height: 50px;  /* 生效 */
  margin: 20px;  /* 完全生效 */
  padding: 10px;  /* 完全生效 */
  background-color: #ffe0e0;
}`,
  answer: `## 块元素、行元素和置换元素的区别

HTML 元素可以根据其特性和行为分为不同类型，理解它们之间的区别对于前端开发和布局至关重要。

### 块级元素（Block Elements）

**特点：**
- 独占一行，默认宽度自动填满其父元素容器
- 可以设置 width、height、margin、padding 等盒模型属性
- 内部可以包含块级元素和行内元素
- 一般用于网页布局的大结构

**常见的块级元素：**
\`\`\`html
<div>, <p>, <h1>-<h6>, <ul>, <ol>, <li>, <table>, <section>, <article>, <nav>, <header>, <footer>, <form>, <hr>, <pre>
\`\`\`

### 行内元素（Inline Elements）

**特点：**
- 不会独占一行，多个行内元素会在同一行内显示
- 宽高由内容决定，**无法设置 width 和 height**
- 水平方向的 margin 和 padding 生效，垂直方向的 margin 不生效
- 垂直方向的 padding 虽然视觉上生效，但不会影响布局
- 一般不能包含块级元素（例外：\`<a>\` 元素在 HTML5 中可以包含块级元素）

**常见的行内元素：**
\`\`\`html
<span>, <a>, <strong>, <em>, <i>, <b>, <small>, <br>, <label>, <cite>, <code>, <q>, <abbr>
\`\`\`

### 置换元素（Replaced Elements）

**特点：**
- 其内容不受 CSS 渲染模型控制，元素本身一般拥有固有尺寸
- 虽然很多置换元素默认是行内元素（display: inline），但它们**可以设置 width 和 height**
- 外观和尺寸由元素本身特性或外部资源决定
- margin 和 padding 属性在各个方向都完全生效

**常见的置换元素：**
\`\`\`html
<img>, <input>, <textarea>, <select>, <button>, <video>, <audio>, <canvas>, <iframe>, <embed>, <object>
\`\`\`

### 三者的主要区别对比

| 特性 | 块级元素 | 行内元素 | 置换元素 |
|------|---------|----------|----------|
| 默认排列方式 | 垂直排列，独占一行 | 水平排列，共享一行 | 取决于display属性，大多默认为inline |
| 设置宽高 | 有效 | 无效 | 有效 |
| 设置margin | 四个方向都有效 | 水平方向有效，垂直方向无效 | 四个方向都有效 |
| 设置padding | 四个方向都有效 | 视觉上有效，但垂直方向不影响布局 | 四个方向都有效 |
| 可包含元素 | 块级和行内元素 | 通常只能包含行内元素或文本 | 通常没有子元素 |
| 默认宽度 | 父容器的100% | 内容宽度 | 内容的固有宽度或指定宽度 |

### 特殊情况与转换

元素的行为可以通过 CSS 的 \`display\` 属性改变：

\`\`\`css
/* 将行内元素转为块级元素 */
span.block {
  display: block;
}

/* 将块级元素转为行内元素 */
div.inline {
  display: inline;
}

/* 行内块级元素：同时具备行内元素和块级元素的特点 */
.inline-block {
  display: inline-block;
}
\`\`\`

### 置换元素的特殊性

置换元素之所以特殊，是因为它们的内容和尺寸通常由外部资源决定，而不仅仅由CSS控制：

1. **固有尺寸**：比如图片有自己的宽高比，未设置尺寸时会按其原始尺寸显示
   
2. **替换性**：这类元素的内容实际上是被替换的，浏览器加载外部资源后替换到元素上

3. **特殊的默认值**：如 \`vertical-align: baseline\` 对于大多数置换元素来说默认生效

4. **格式化特性**：即使是行内置换元素，也可以设置宽高、垂直外边距等属性

### 实际应用建议

1. **布局结构**：使用块级元素创建页面的主要结构和布局
   
2. **文本和内联内容**：使用行内元素处理文本和需要与文本流内联的元素
   
3. **表单和媒体**：合理利用置换元素的特性，处理表单控件和媒体内容

4. **灵活转换**：根据设计需求，使用 \`display\` 属性灵活调整元素的行为

理解这三类元素的特性和差异，对于创建语义正确、布局合理的网页结构至关重要。`
},
    // 题目 36: 单行元素的文本省略号如何实现
{
  id: 36,
  title: '单行元素的文本省略号如何实现',
  tags: ['CSS', '文本'],
  difficulty: '简单',
  code: `/* 单行文本溢出显示省略号 */
.text-ellipsis {
  white-space: nowrap;        /* 文本不换行 */
  overflow: hidden;           /* 溢出隐藏 */
  text-overflow: ellipsis;    /* 文本溢出显示省略号 */
  
  /* 通常需要设置宽度限制 */
  width: 200px;
  /* 或者 max-width */
  max-width: 100%;
}

/* 实际应用示例 */
.card-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

/* 右侧省略号示例 (标准) */
.ellipsis-right {
  direction: ltr;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

/* 左侧省略号示例 */
.ellipsis-left {
  direction: rtl;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-align: left; /* 保持文本左对齐 */
}`,
  answer: `## 单行文本省略号实现方法

当文本内容超出容器宽度时，通过省略号（...）来表示被截断的内容是一种常见的用户界面模式。这在卡片、列表项或有限宽度的标题中特别有用。

### 基本实现方法

实现单行文本省略号需要三个 CSS 属性的组合：

\`\`\`css
.text-ellipsis {
  white-space: nowrap;      /* 防止文本换行 */
  overflow: hidden;         /* 隐藏溢出内容 */
  text-overflow: ellipsis;  /* 显示省略号 */
}
\`\`\`

这三个属性缺一不可：
- **white-space: nowrap** - 确保文本在一行内显示
- **overflow: hidden** - 隐藏超出容器的内容
- **text-overflow: ellipsis** - 在文本被截断的地方显示省略号

### 完整示例

通常还需要设置元素的宽度，才能触发省略效果：

\`\`\`css
.card-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 200px; /* 或使用百分比、max-width等 */
}
\`\`\`

HTML:
\`\`\`html
<div class="card-title">这是一个很长的标题，当它超出容器宽度时会显示省略号</div>
\`\`\`

### 省略号位置控制

#### 右侧省略（标准）
\`\`\`css
.ellipsis-right {
  direction: ltr; /* 左到右（默认） */
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
\`\`\`

#### 左侧省略
\`\`\`css
.ellipsis-left {
  direction: rtl; /* 右到左 */
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-align: left; /* 保持文本左对齐 */
}
\`\`\`

### 注意事项

1. **宽度限制**：必须设置元素的宽度（width、max-width 等），否则元素会自动扩展以容纳全部文本

2. **块级元素**：该技术最适用于块级元素或设置了 display:block/inline-block 的元素

3. **浏览器支持**：现代浏览器都支持这种方法，IE9+兼容

4. **可访问性考虑**：对于被截断的文本，考虑添加完整内容的 title 属性或工具提示：
   \`\`\`html
   <div class="text-ellipsis" title="完整的文本内容">长文本内容...</div>
   \`\`\`

5. **继承问题**：子元素会继承父元素的 text-overflow 属性，但只有当子元素也设置了 overflow:hidden 和 white-space:nowrap 时才会生效

### 多行文本省略（补充知识）

虽然题目要求单行省略，但作为补充，多行文本省略可以通过以下 CSS 实现（仅适用于 WebKit 内核浏览器如 Chrome、Safari）：

\`\`\`css
.multi-line-ellipsis {
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 显示的行数 */
  -webkit-box-orient: vertical;
  overflow: hidden;
}
\`\`\`

更通用的跨浏览器多行省略解决方案通常需要 JavaScript 或更复杂的 CSS 技巧。

### 实际应用场景

- 卡片布局中的标题
- 表格单元格中的长文本
- 导航菜单中的长项目名称
- 固定宽度布局中的标题
- 移动设备界面上的文本内容

单行文本省略是一种简单但有效的方式，可以在有限空间内优雅地处理可变长度的文本内容。`
},
    // 题目 37: HTML 语义化标签
{
  id: 37,
  title: 'HTML 语义化标签',
  tags: ['HTML', '语义化'],
  difficulty: '简单',
  code: `<!-- 非语义化布局 -->
<div class="header">
  <div class="logo">网站标志</div>
  <div class="nav">
    <div class="nav-item">首页</div>
    <div class="nav-item">关于</div>
  </div>
</div>
<div class="main-content">
  <div class="article">
    <div class="article-title">文章标题</div>
    <div class="article-meta">发布于：2023-05-20</div>
    <div class="article-content">文章内容...</div>
  </div>
  <div class="sidebar">
    <div class="widget">相关文章</div>
  </div>
</div>
<div class="footer">
  <div class="copyright">版权所有 © 2023</div>
</div>

<!-- 语义化布局 -->
<header>
  <div class="logo">网站标志</div>
  <nav>
    <ul>
      <li><a href="/">首页</a></li>
      <li><a href="/about">关于</a></li>
    </ul>
  </nav>
</header>
<main>
  <article>
    <h1>文章标题</h1>
    <time datetime="2023-05-20">发布于：2023-05-20</time>
    <p>文章内容...</p>
  </article>
  <aside>
    <section class="widget">相关文章</section>
  </aside>
</main>
<footer>
  <p>版权所有 © 2023</p>
</footer>`,
  answer: `## HTML 语义化标签详解

HTML 语义化是指使用恰当的 HTML 标签来表示内容的结构和含义，而不仅仅是为了展示效果。

### 1. 什么是 HTML 语义化？

HTML 语义化是指根据内容的结构化含义而选择合适的标签，让页面具有良好的结构，让人（开发者）和机器（浏览器、搜索引擎、屏幕阅读器等）都能够更好地理解网页内容。

### 2. 常用的语义化标签

#### 结构相关标签

| 标签 | 描述 | 用途 |
|------|------|------|
| \`<header>\` | 页眉 | 网站头部、文章头部信息 |
| \`<nav>\` | 导航 | 网站导航菜单 |
| \`<main>\` | 主要内容 | 页面的主体内容（每页只能有一个） |
| \`<article>\` | 文章 | 独立的内容块，如博客文章、评论 |
| \`<section>\` | 区段 | 内容的逻辑分区 |
| \`<aside>\` | 侧边栏 | 与主内容相关但可以单独存在的内容 |
| \`<footer>\` | 页脚 | 网站底部、文章结尾信息 |

#### 文本语义标签

| 标签 | 描述 | 用途 |
|------|------|------|
| \`<h1>\`-\`<h6>\` | 标题 | 文档或区块的标题，按重要性排序 |
| \`<p>\` | 段落 | 文本段落 |
| \`<blockquote>\` | 块引用 | 引用的大段文字 |
| \`<cite>\` | 引用 | 作品标题的引用 |
| \`<q>\` | 行内引用 | 短的行内引用文本 |
| \`<em>\` | 强调 | 强调文本（通常显示为斜体） |
| \`<strong>\` | 重要 | 重要文本（通常显示为粗体） |
| \`<mark>\` | 标记 | 突出显示的文本 |
| \`<time>\` | 时间 | 日期或时间 |
| \`<abbr>\` | 缩写 | 缩写词或首字母缩略词 |
| \`<dfn>\` | 定义 | 术语的定义实例 |
| \`<code>\` | 代码 | 计算机代码片段 |
| \`<pre>\` | 预格式化文本 | 保留空格和换行的文本块 |

#### 媒体和表单相关语义标签

| 标签 | 描述 | 用途 |
|------|------|------|
| \`<figure>\` | 图像/图表 | 自包含的内容（通常带有 \`<figcaption>\`） |
| \`<figcaption>\` | 图像说明 | 图像或图表的说明文字 |
| \`<audio>\` | 音频 | 嵌入音频内容 |
| \`<video>\` | 视频 | 嵌入视频内容 |
| \`<track>\` | 文本轨道 | 音频或视频的字幕 |
| \`<picture>\` | 响应式图片 | 响应式图片容器 |
| \`<fieldset>\` | 表单字段组 | 表单中的相关控件分组 |
| \`<legend>\` | 字段组标题 | 为 \`<fieldset>\` 定义标题 |
| \`<details>\` | 详细信息 | 用户可以展开查看的详细信息 |
| \`<summary>\` | 摘要 | \`<details>\` 元素的可见标题 |

### 3. 语义化标签实例对比

非语义化的布局主要使用 \`<div>\` 和 \`<span>\` 等通用标签，而语义化布局使用有具体含义的标签：

\`\`\`html
<!-- 非语义化布局 -->
<div class="header">...</div>
<div class="content">...</div>
<div class="footer">...</div>

<!-- 语义化布局 -->
<header>...</header>
<main>...</main>
<footer>...</footer>
\`\`\`

### 4. 语义化标签的优势

1. **提高可访问性**：屏幕阅读器等辅助技术能更好地解释页面内容

2. **提升 SEO**：搜索引擎更容易理解页面结构和内容的重要性

3. **代码可维护性**：语义化标签使代码结构更清晰，易于团队协作和维护

4. **更好的移动适配**：语义化标签有助于响应式设计和不同设备的适配

5. **未来兼容性**：随着 Web 标准的发展，语义化 HTML 更容易适应新技术

### 5. 语义化的最佳实践

1. **正确使用标题层级**：\`<h1>\` 到 \`<h6>\` 应按照重要性依次使用，不要跳级

2. **避免过度使用 \`<div>\`**：尽量使用语义化标签代替无意义的 \`<div>\`

3. **区分 \`<article>\` 和 \`<section>\`**：
   - \`<article>\` 用于独立、完整的内容单元
   - \`<section>\` 用于内容的主题分组

4. **正确使用 \`<nav>\`**：只用于主要导航链接，不要用于所有链接组

5. **使用 \`<button>\` 而非 \`<div class="button">\`**：利用原生标签的默认行为和可访问性

6. **使用 \`<ul>\`、\`<ol>\` 和 \`<li>\` 创建列表**：不要使用 \`<div>\` 模拟列表

7. **表单元素语义化**：使用 \`<label>\`、\`<fieldset>\`、\`<legend>\` 等增强表单可用性

8. **正确使用 \`<em>\` 和 \`<strong>\`**：
   - \`<em>\` 用于强调文本
   - \`<strong>\` 用于表示重要文本
   - 不要仅为了视觉效果而使用这些标签

### 6. 结论

HTML 语义化不仅是一种编码风格，更是提高网页质量的重要手段。它使网页更易于理解、维护和访问，同时提高了搜索引擎优化效果。虽然在视觉呈现上，语义化与非语义化的页面可能看起来相同，但在代码质量、可访问性和搜索引擎友好度上，语义化 HTML 具有明显优势。`
},
    // 题目 38: px, rpx, vw, vh, rem 的区别
{
  id: 38,
  title: 'px, rpx, vw, vh, rem 的区别',
  tags: ['CSS', '单位'],
  difficulty: '中等',
  code: `/* 绝对单位 */
.pixel {
  width: 200px;        /* 固定像素，不随设备变化 */
  font-size: 16px;
}

/* 相对于根元素(html)的字体大小 */
html {
  font-size: 16px;     /* 默认根元素字体大小 */
}
.rem-example {
  width: 10rem;        /* 等于 10 * 16px = 160px */
  margin: 1rem;        /* 等于 1 * 16px = 16px */
}

/* 视口单位 - 相对于视口尺寸 */
.viewport-units {
  width: 50vw;         /* 视口宽度的50% */
  height: 25vh;        /* 视口高度的25% */
  font-size: 5vmin;    /* 视口宽高中较小值的5% */
  padding: 2vmax;      /* 视口宽高中较大值的2% */
}

/* 微信小程序单位 - rpx */
.rpx-example {
  width: 200rpx;       /* 在750rpx设计稿下相当于200/750视口宽度 */
}

/* 响应式设计最佳实践 */
.responsive-component {
  /* 字体使用rem，便于整体缩放 */
  font-size: 1rem;
  
  /* 容器宽度使用百分比或vw */
  width: 90%;
  max-width: 1200px;
  
  /* 内边距可以混合使用 */
  padding: 1rem 5%;
  
  /* 边框使用px */
  border: 1px solid #ccc;
}`,
  answer: `## CSS 尺寸单位详细对比

在 CSS 中，不同的单位用于不同的测量目的。理解这些单位的区别和适用场景对于创建响应式、自适应的网页设计至关重要。

### 1. px (像素)

**定义**：CSS中的像素单位，是一个绝对单位。

**特点**：
- 固定大小，不会随用户设置或屏幕分辨率变化
- 在所有设备上显示的物理尺寸可能不同，取决于设备的像素密度
- 精确且可预测，适合需要精确布局的元素

**适用场景**：
- 边框、阴影等需要精确控制的小元素
- 不需要缩放的固定尺寸元素
- 1px 的细线、分隔线

\`\`\`css
.pixel-example {
  border: 1px solid black;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  width: 200px;
}
\`\`\`

### 2. rem (Root EM)

**定义**：相对于根元素（html）的字体大小的单位。

**特点**：
- 相对于根元素的字体大小进行计算
- 可以通过修改根元素字体大小来实现整站缩放
- 在响应式设计中常用于创建一致的缩放体验

**计算方式**：
如果 html 的 font-size 为 16px (浏览器默认)，则：
- 1rem = 16px
- 2rem = 32px
- 0.5rem = 8px

**适用场景**：
- 响应式布局中的主要尺寸单位
- 文本大小、间距、容器尺寸等需要统一缩放的元素
- 配合媒体查询调整根字体大小，实现不同设备上的适配

\`\`\`css
html {
  font-size: 16px;  /* 基准字体大小 */
}

.container {
  width: 60rem;     /* 960px (60 * 16px) */
  padding: 1rem;    /* 16px */
}

@media (max-width: 768px) {
  html {
    font-size: 14px;  /* 在小屏幕上整体缩小 */
  }
}
\`\`\`

### 3. vw/vh (视口宽度/高度)

**定义**：
- vw：视口宽度的 1/100
- vh：视口高度的 1/100

**特点**：
- 直接相对于视口尺寸，不需要中间计算
- 无论视口大小如何变化，比例保持不变
- 不受父元素尺寸的影响

**计算方式**：
在一个宽 1000px，高 800px 的视口中：
- 1vw = 10px (1000px * 1%)
- 1vh = 8px (800px * 1%)
- 50vw = 500px (视口宽度的一半)

**适用场景**：
- 全屏或部分屏幕的布局
- 需要与视口保持固定比例的元素
- 英雄横幅、全屏背景等

\`\`\`css
.hero-section {
  height: 80vh;    /* 视口高度的80% */
  width: 100vw;    /* 视口宽度的100% */
}

.modal {
  width: 50vw;
  max-width: 600px;  /* 限制在大屏幕上变得过大 */
}
\`\`\`

### 4. vmin/vmax

**定义**：
- vmin：视口宽度和高度中较小值的 1/100
- vmax：视口宽度和高度中较大值的 1/100

**特点**：
- 根据视口的最小或最大维度进行缩放
- 在屏幕旋转时保持一致的体验

**适用场景**：
- 在任何屏幕方向上都需要可见的关键元素
- 需要在保持可见性的同时最大化利用空间的元素

\`\`\`css
.square-element {
  width: 50vmin;    /* 在任何方向上都不会超过视口的一半 */
  height: 50vmin;
}

.background-element {
  font-size: 5vmax;  /* 在较大的维度上更突出 */
}
\`\`\`

### 5. rpx (响应式像素，小程序单位)

**定义**：微信小程序中的响应式单位，规定屏幕宽度为 750rpx。

**特点**：
- 专为移动应用设计的单位
- 会根据屏幕宽度自动缩放
- 基于 750rpx 设计稿的单位换算

**计算方式**：
假设设计稿宽度为 750px，实际设备宽度为 375px：
- 750rpx = 375px (设备宽度)
- 1rpx = 0.5px
- 200rpx = 100px

**适用场景**：
- 微信小程序、部分移动端框架
- 需要在不同设备上保持一致视觉效果的元素

### 6. 单位选择建议

**混合使用不同单位以获得最佳效果**：

1. **字体大小**：
   - 基础字体：rem (便于整体缩放)
   - 响应式标题：可考虑 vw 或 calc() 混合单位
   - 最小字体限制：使用 min() 函数避免字体过小

2. **布局尺寸**：
   - 容器宽度：百分比、vw 或 rem
   - 页面边距/内边距：rem 或 vw
   - 固定尺寸元素：px

3. **细节元素**：
   - 边框：px
   - 阴影：px
   - 图标尺寸：em (相对于字体大小)

### 7. 响应式设计最佳实践

\`\`\`css
:root {
  /* 设置基础字体大小变量 */
  --base-font-size: 16px;
  
  /* 媒体查询调整 */
  @media (max-width: 768px) {
    --base-font-size: 14px;
  }
}

html {
  font-size: var(--base-font-size);
}

.container {
  /* 限制最大宽度，使用百分比保持响应 */
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  
  /* 使用rem保持一致的间距缩放 */
  padding: 2rem;
}

/* 现代响应式文本 */
.responsive-text {
  /* 最小10px，最大为视口宽度的5%，默认首选1.2rem */
  font-size: clamp(10px, 5vw, 1.2rem);
}
\`\`\`

### 总结

| 单位 | 相对参照 | 特点 | 主要用途 |
|-----|---------|-----|---------|
| px | 无，绝对单位 | 固定大小，精确可控 | 边框、阴影、1px细线 |
| rem | 根元素字体大小 | 全局一致缩放 | 布局、字体、间距 |
| em | 父元素字体大小 | 局部相对缩放 | 组件内部元素、图标 |
| vw/vh | 视口宽度/高度 | 直接相对视口 | 全屏布局、响应式容器 |
| vmin/vmax | 视口最小/最大维度 | 适应屏幕方向变化 | 保持可见性的关键元素 |
| rpx | 设备宽度(750rpx) | 小程序专用缩放 | 微信小程序UI |

不同单位各有优势，在实际应用中通常需要根据设计需求混合使用多种单位，以创建既美观又功能完善的响应式布局。`
}
];

