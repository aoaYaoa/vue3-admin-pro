const questions90 = [
    {
        id: 81,
        title: "JavaScript 动画和 CSS 动画的区别",
        tags: ["动画", "性能"],
        difficulty: "中等",
        code: `// CSS 动画实现
// HTML: <div class="box css-animation"></div>
.css-animation {
  width: 100px;
  height: 100px;
  background: blue;
  /* 定义动画 */
  animation: move 2s ease-in-out infinite alternate;
}

@keyframes move {
  from { transform: translateX(0); }
  to { transform: translateX(300px); }
}

// JavaScript 动画实现
// HTML: <div class="box" id="js-animation"></div>
const box = document.getElementById('js-animation');
let position = 0;
let direction = 1;

function animate() {
  position += direction * 2;
  
  if (position >= 300 || position <= 0) {
    direction *= -1; // 反向运动
  }
  
  box.style.transform = \`translateX(\${position}px)\`;
  requestAnimationFrame(animate);
}

animate();

// 复杂动画示例：抛物线运动
const projectile = document.createElement('div');
projectile.className = 'projectile';
document.body.appendChild(projectile);

let x = 0;
let y = 0;
let velocityX = 5;
let velocityY = -10;
const gravity = 0.5;

function updateProjectile() {
  velocityY += gravity;
  x += velocityX;
  y += velocityY;
  
  projectile.style.transform = \`translate(\${x}px, \${y}px)\`;
  
  if (y < window.innerHeight) {
    requestAnimationFrame(updateProjectile);
  }
}

updateProjectile();`,
        answer: `## JavaScript 动画与 CSS 动画的深度对比

### 1. 实现原理

#### CSS 动画
- 使用浏览器内置的合成器线程处理
- 通过 \`@keyframes\` 和 CSS 属性（如 transform、opacity）定义动画
- 支持 transition 和 animation 两种方式

\`\`\`css
/* Transition 示例 */
.element {
  transition: transform 0.3s ease;
}
.element:hover {
  transform: scale(1.1);
}

/* Animation 示例 */
@keyframes slide {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}
\`\`\`

#### JavaScript 动画
- 通过 \`requestAnimationFrame\` 或 \`setInterval\` 逐帧更新
- 直接操作 DOM 样式属性
- 需要手动计算动画进度

\`\`\`javascript
function animate() {
  element.style.left = \`\${currentPos}px\`;
  currentPos += speed;
  requestAnimationFrame(animate);
}
\`\`\`

### 2. 性能对比

| 特性                | CSS 动画                          | JavaScript 动画                  |
|---------------------|-----------------------------------|----------------------------------|
| 线程                | 合成器线程（不阻塞主线程）         | 主线程（可能被阻塞）             |
| 重排/重绘           | 优化较好，通常只触发合成层         | 可能触发重排和重绘               |
| GPU 加速            | 自动启用                          | 需手动触发（translateZ(0)）      |
| 帧率稳定性          | 更稳定（60fps）                   | 依赖代码优化                     |
| 内存消耗            | 较低                              | 较高（需维护动画状态）           |

### 3. 功能与控制能力

#### CSS 动画优势
- **自动反向播放**：\`animation-direction: alternate\`
- **暂停/恢复**：\`animation-play-state\`
- **时间函数**：内置贝塞尔曲线（ease、linear等）
- **关键帧控制**：百分比定义多个中间状态

\`\`\`css
animation: 
  pulse 1.5s ease-in-out infinite,
  color-change 3s linear infinite;
\`\`\`

#### JavaScript 动画优势
- **动态参数**：实时修改动画参数
- **复杂逻辑**：实现物理效果（弹性、碰撞等）
- **精准控制**：逐帧处理
- **事件集成**：与其他业务逻辑深度交互

\`\`\`javascript
// 实现弹性动画
function springAnimation() {
  const delta = target - current;
  velocity += delta * springiness;
  velocity *= damping;
  current += velocity;
}
\`\`\`

### 4. 适用场景

#### 推荐使用 CSS 动画
- 简单 UI 过渡（hover 效果、菜单展开）
- 性能敏感的动画（滚动、轮播图）
- 需要硬件加速的操作（3D 变换）
- 与 CSS 状态相关的动画（媒体查询触发）

#### 推荐使用 JavaScript 动画
- 复杂路径动画（贝塞尔曲线、物理运动）
- 需要实时交互的动画（游戏角色控制）
- 动态计算的动画（数据可视化）
- 需要精细控制的动画（暂停、倒放、速度调节）

### 5. 性能优化技巧

#### CSS 动画优化
- 优先使用 \`transform\` 和 \`opacity\`
- 避免动画期间修改布局属性
- 使用 \`will-change\` 提示浏览器
- 合理使用 \`translateZ(0)\` 强制 GPU 加速

\`\`\`css
.optimized {
  will-change: transform;
  transform: translateZ(0);
}
\`\`\`

#### JavaScript 动画优化
- 使用 \`requestAnimationFrame\` 而非 \`setTimeout\`
- 批量 DOM 操作（使用 DocumentFragment）
- 避免强制同步布局（读取布局属性前完成写入）
- 使用 Web Workers 处理复杂计算

\`\`\`javascript
// 使用分离的动画线程
const worker = new Worker('animator.js');
worker.postMessage({ type: 'start', config: animationConfig });
\`\`\`

### 6. 现代动画方案

#### Web Animations API
- 结合 CSS 和 JS 动画的优势
- 提供更细粒度的控制

\`\`\`javascript
element.animate([
  { transform: 'translateX(0)' },
  { transform: 'translateX(300px)' }
], {
  duration: 1000,
  iterations: Infinity
});
\`\`\`

#### 动画库选择
- **GSAP**：专业级动画库，性能优异
- **Anime.js**：轻量级，支持复杂时间线
- **Three.js**：3D 动画和 WebGL 集成
- **Lottie**：AE 动画导出播放

### 7. 总结对比

| 对比维度         | CSS 动画                          | JavaScript 动画                  |
|------------------|-----------------------------------|----------------------------------|
| 开发效率         | 快速实现简单动画                   | 需要更多代码                     |
| 性能             | 通常更好                          | 依赖实现方式                     |
| 复杂度           | 适合简单动画                      | 适合复杂动画                     |
| 控制粒度         | 有限                              | 完全控制                         |
| 浏览器兼容性     | 现代浏览器支持良好                 | 更广泛的兼容性                   |
| 资源消耗         | 较低                              | 较高                             |

根据项目需求选择合适方案，现代开发中常结合使用：用 CSS 处理基础动画，用 JavaScript 实现复杂交互动画。`
      },
      {
        id: 82,
        title: "获取元素位置？",
        tags: ["DOM", "位置"],
        difficulty: "简单",
        code: `// 获取元素相对于文档的位置
const element = document.getElementById('target');

// 方法1: offsetTop/offsetLeft
const offsetTop = element.offsetTop;
const offsetLeft = element.offsetLeft;

// 方法2: getBoundingClientRect
const rect = element.getBoundingClientRect();
const docTop = rect.top + window.pageYOffset;
const docLeft = rect.left + window.pageXOffset;

// 方法3: 递归计算offsetParent
function getAbsolutePosition(element) {
    let x = 0;
    let y = 0;
    while (element) {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
    }
    return { x, y };
}

// 获取视口内位置
const viewportTop = rect.top;
const viewportLeft = rect.left;

// 获取元素尺寸
const width = element.offsetWidth;
const height = element.offsetHeight;

// 滚动位置
const scrollTop = element.scrollTop;
const scrollLeft = element.scrollLeft;`,
        answer: `## 获取元素位置的多种方法详解

### 1. 基本位置属性
- **offsetTop/offsetLeft**：
  元素相对于最近定位祖先元素的偏移位置
  \`\`\`js
  const top = element.offsetTop;
  const left = element.offsetLeft;
  \`\`\`

- **clientTop/clientLeft**：
  元素边框的尺寸（通常等于边框宽度）
  \`\`\`js
  const borderTop = element.clientTop;
  const borderLeft = element.clientLeft;
  \`\`\`

### 2. getBoundingClientRect()
返回元素的大小及其相对于视口的位置信息：
\`\`\`js
const rect = element.getBoundingClientRect();
/*
rect包含以下属性：
top: 元素顶部到视口顶部的距离
left: 元素左侧到视口左侧的距离
right: 元素右侧到视口左侧的距离
bottom: 元素底部到视口顶部的距离
width: 元素宽度
height: 元素高度
*/
\`\`\`

### 3. 相对文档的位置计算
\`\`\`js
// 考虑滚动偏移
const docTop = rect.top + window.pageYOffset;
const docLeft = rect.left + window.pageXOffset;

// 或者使用现代方法
const absoluteRect = element.getBoundingClientRect();
const absoluteTop = absoluteRect.top + window.scrollY;
const absoluteLeft = absoluteRect.left + window.scrollX;
\`\`\`

### 4. 滚动位置相关
- **scrollTop/scrollLeft**：
  元素内容垂直/水平滚动的像素数
  \`\`\`js
  const scrollTop = element.scrollTop;
  const scrollLeft = element.scrollLeft;
  \`\`\`

- **scrollWidth/scrollHeight**：
  元素内容的总宽度/高度（包括不可见部分）
  \`\`\`js
  const totalWidth = element.scrollWidth;
  const totalHeight = element.scrollHeight;
  \`\`\`

### 5. 窗口相关位置
\`\`\`js
// 元素是否在视口中可见
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// 获取元素中心点坐标
const centerX = rect.left + rect.width / 2;
const centerY = rect.top + rect.height / 2;
\`\`\`

### 6. 现代API：Intersection Observer
用于高效检测元素可见性：
\`\`\`js
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log('元素进入视口');
        }
    });
});
observer.observe(element);
\`\`\`

### 对比总结
| 方法                | 特点                         | 适用场景                 |
|---------------------|-----------------------------|------------------------|
| offsetTop/offsetLeft | 相对定位父元素               | 传统布局中的位置计算     |
| getBoundingClientRect | 精确的视口相对位置           | 现代布局，需要精确位置   |
| scrollTop/scrollLeft | 滚动位置信息                 | 处理滚动相关逻辑         |
| IntersectionObserver | 异步检测可见性               | 懒加载、滚动动画         |

根据具体需求选择合适的方法，现代开发中推荐优先使用getBoundingClientRect和Intersection Observer API。`
      },
      {
        id: 83,
        title: "document.write 和 innerHTML 的区别",
        tags: ["DOM", "操作"],
        difficulty: "简单",
        code: `// document.write 使用示例
document.write('<h1>Hello World</h1>');

// 在已关闭的文档中使用会覆盖整个页面
window.onload = function() {
    document.write('这会覆盖原有内容!');
};

// innerHTML 使用示例
const container = document.getElementById('container');
container.innerHTML = '<p>新内容</p>';

// 安全插入内容
container.insertAdjacentHTML('beforeend', '<span>追加内容</span>');

// 性能对比
const data = new Array(1000).fill('<div>元素</div>').join('');

// 差性能写法
for (let i = 0; i < 1000; i++) {
    container.innerHTML += '<div>元素</div>';
}

// 好性能写法
const fragment = document.createDocumentFragment();
data.forEach(() => {
    const div = document.createElement('div');
    fragment.appendChild(div);
});
container.appendChild(fragment);`,
        answer: `## document.write 与 innerHTML 的深度对比

### 1. 基本概念

#### document.write
- 直接写入文档流
- 主要在页面加载阶段使用
- 在已关闭的文档中调用会清空整个页面

#### innerHTML
- 操作指定元素的HTML内容
- 可以随时使用
- 只影响目标元素及其子元素

### 2. 主要区别

| 特性                | document.write                  | innerHTML                      |
|---------------------|---------------------------------|--------------------------------|
| 作用范围            | 整个文档                        | 指定元素内部                   |
| 执行时机            | 主要在加载阶段                  | 任意时刻                      |
| 性能影响            | 可能阻塞解析                    | 局部重绘                      |
| 安全性              | 低（可能被XSS攻击）             | 需要谨慎处理（可能被XSS攻击）  |
| 使用场景            | 旧式脚本加载                    | 动态更新内容                   |
| 现代应用            | 不推荐使用                      | 仍广泛使用                    |

### 3. 安全注意事项

#### XSS 攻击示例
\`\`\`js
// 危险用法
const userInput = '<img src=x onerror=stealCookies()>';
element.innerHTML = userInput;

// 安全处理
element.textContent = userInput; // 转义HTML
\`\`\`

#### 安全使用建议
- 避免直接插入未经验证的用户输入
- 使用 \`textContent\` 替代 innerHTML 插入纯文本
- 使用 DOM 方法创建元素
- 使用第三方库（如DOMPurify）过滤内容

### 4. 性能优化

#### 差实践
\`\`\`js
// 多次操作DOM
for (let i = 0; i < 100; i++) {
    element.innerHTML += '<div>' + i + '</div>';
}
\`\`\`

#### 好实践
\`\`\`js
// 批量操作
let html = '';
for (let i = 0; i < 100; i++) {
    html += '<div>' + i + '</div>';
}
element.innerHTML = html;

// 或使用文档片段
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
    const div = document.createElement('div');
    fragment.appendChild(div);
}
element.appendChild(fragment);
\`\`\`

### 5. 现代替代方案

#### insertAdjacentHTML
\`\`\`js
// 更灵活的位置控制
element.insertAdjacentHTML('beforeend', '<p>新内容</p>');
/*
位置参数：
'beforebegin': 元素前插入
'afterbegin': 元素内部开头插入
'beforeend': 元素内部末尾插入
'afterend': 元素后插入
*/
\`\`\`

#### DOM API
\`\`\`js
// 更安全的元素创建方式
const div = document.createElement('div');
div.textContent = '安全内容';
element.appendChild(div);
\`\`\`

### 总结
- **document.write** 应避免在现代应用中使用
- **innerHTML** 需要谨慎处理用户输入
- 优先使用更安全的DOM操作方法
- 批量操作提高性能`
      },
      {
        id: 84,
        title: "mouseover 和 mouseenter 的区别",
        tags: ["DOM", "事件"],
        difficulty: "中等",
        code: `// 测试元素结构
// <div class="parent">
//   <div class="child"></div>
// </div>

const parent = document.querySelector('.parent');
const child = document.querySelector('.child');

// mouseover/mouseout 示例
parent.addEventListener('mouseover', () => console.log('parent mouseover'));
child.addEventListener('mouseover', () => console.log('child mouseover'));
parent.addEventListener('mouseout', () => console.log('parent mouseout'));

// mouseenter/mouseleave 示例
parent.addEventListener('mouseenter', () => console.log('parent mouseenter'));
child.addEventListener('mouseenter', () => console.log('child mouseenter'));
parent.addEventListener('mouseleave', () => console.log('parent mouseleave'));

// 测试场景：
// 1. 鼠标从外部进入parent
// 2. 在parent内移动到child
// 3. 从child移出到parent
// 4. 从parent移出到外部`,
        answer: `## mouseover/mouseout 与 mouseenter/mouseleave 的区别

### 1. 事件冒泡机制

#### mouseover/mouseout
- 会冒泡
- 当鼠标进入元素或其子元素时触发
- 可能触发多次

#### mouseenter/mouseleave
- 不冒泡
- 只在鼠标进入/离开元素本身时触发
- 更稳定的触发机制

### 2. 事件触发场景对比

假设有以下结构：
\`\`\`html
<div class="parent">
  <div class="child"></div>
</div>
\`\`\`

#### 测试步骤及结果：

| 操作                        | mouseover/mouseout                 | mouseenter/mouseleave       |
|----------------------------|-------------------------------------|-----------------------------|
| 进入parent                 | parent: mouseover                   | parent: mouseenter          |
| 从parent移动到child        | parent: mouseout → child: mouseover | 无事件                      |
| 从child移回parent         | child: mouseout → parent: mouseover| 无事件                      |
| 从parent移出到外部         | parent: mouseout                    | parent: mouseleave          |

### 3. 性能影响

- **mouseover/mouseout**：由于冒泡机制，可能触发更多事件处理
- **mouseenter/mouseleave**：更高效，只在目标元素变化时触发

### 4. 实际应用场景

#### 使用 mouseenter/mouseleave 当：
- 需要简单的悬停效果
- 不希望子元素影响父元素的悬停状态
- 需要更高性能的悬停检测

\`\`\`js
// 下拉菜单示例
const menu = document.getElementById('menu');
menu.addEventListener('mouseenter', showSubmenu);
menu.addEventListener('mouseleave', hideSubmenu);
\`\`\`

#### 使用 mouseover/mouseout 当：
- 需要检测子元素的进入/离开
- 需要事件冒泡来实现委托

\`\`\`js
// 事件委托示例
document.addEventListener('mouseover', function(e) {
    if (e.target.matches('.tooltip')) {
        showTooltip(e.target);
    }
});
\`\`\`

### 5. 兼容性与现代替代方案

- **Pointer Events**：统一处理鼠标、触摸、手写笔事件
  \`\`\`js
  element.addEventListener('pointerenter', handleEnter);
  element.addEventListener('pointerleave', handleLeave);
  \`\`\`

- **CSS 伪类**：简单悬停效果优先使用CSS
  \`\`\`css
  .element:hover {
      background: #f0f0f0;
  }
  \`\`\`

### 总结对比表

| 特性                | mouseover/mouseout          | mouseenter/mouseleave        |
|---------------------|-----------------------------|------------------------------|
| 冒泡                | 是                          | 否                           |
| 子元素影响          | 会触发                      | 不会触发                     |
| 性能                | 较低                        | 较高                         |
| 适用场景            | 需要事件委托                | 简单悬停效果                 |
| 现代替代            | pointerover/pointerout      | pointerenter/pointerleave    |

根据具体需求选择合适的事件类型，现代开发中推荐优先使用mouseenter/mouseleave或Pointer Events。`
      },
      {
        id: 85,
        title: "元素拖动实现方案",
        tags: ["DOM", "拖拽", "交互"],
        difficulty: "中等",
        code: `// 基本拖动实现
const draggable = document.getElementById('draggable');
let isDragging = false;
let startX, startY, initialX, initialY;

draggable.addEventListener('mousedown', startDrag);

function startDrag(e) {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    initialX = draggable.offsetLeft;
    initialY = draggable.offsetTop;
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
}

function drag(e) {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    draggable.style.left = \`\${initialX + dx}px\`;
    draggable.style.top = \`\${initialY + dy}px\`;
}

function stopDrag() {
    isDragging = false;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
}

// HTML5 拖放API
const dropZone = document.getElementById('drop-zone');

draggable.draggable = true;

draggable.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', e.target.id);
});

dropZone.addEventListener('dragover', e => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', e => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const draggedEl = document.getElementById(id);
    dropZone.appendChild(draggedEl);
    dropZone.classList.remove('drag-over');
});

// 使用现代Pointer Events
draggable.addEventListener('pointerdown', e => {
    e.target.setPointerCapture(e.pointerId);
    // 拖动逻辑类似鼠标事件
});`,
        answer: `## 元素拖动实现方案详解

### 1. 基本实现原理

#### 核心步骤：
1. **mousedown**：记录初始位置，开始拖动
2. **mousemove**：计算偏移量，更新元素位置
3. **mouseup**：结束拖动，清理事件

#### 注意事项：
- 使用绝对定位
- 处理边界限制
- 性能优化（防抖、requestAnimationFrame）

### 2. 原生实现优化版

\`\`\`js
class Draggable {
    constructor(element) {
        this.element = element;
        this.isDragging = false;
        this.initialX = 0;
        this.initialY = 0;
        this.startX = 0;
        this.startY = 0;

        this.element.style.position = 'absolute';
        this.element.addEventListener('mousedown', this.start.bind(this));
    }

    start(e) {
        this.isDragging = true;
        this.startX = e.clientX;
        this.startY = e.clientY;
        this.initialX = this.element.offsetLeft;
        this.initialY = this.element.offsetTop;

        document.addEventListener('mousemove', this.move);
        document.addEventListener('mouseup', this.end);
    }

    move = (e) => {
        if (!this.isDragging) return;
        const dx = e.clientX - this.startX;
        const dy = e.clientY - this.startY;
        
        requestAnimationFrame(() => {
            this.element.style.left = \`\${this.initialX + dx}px\`;
            this.element.style.top = \`\${this.initialY + dy}px\`;
        });
    }

    end = () => {
        this.isDragging = false;
        document.removeEventListener('mousemove', this.move);
        document.removeEventListener('mouseup', this.end);
    }
}
\`\`\`

### 3. HTML5 拖放API

#### 主要事件：
- **dragstart**：开始拖动
- **dragover**：在目标上方移动
- **dragleave**：离开目标
- **drop**：释放到目标

#### 数据传递：
\`\`\`js
// 设置数据
e.dataTransfer.setData('text/plain', 'payload');

// 获取数据
const data = e.dataTransfer.getData('text/plain');
\`\`\`

#### 限制与特性：
- 需要设置draggable="true"
- 默认只允许拖动文本和链接
- 文件拖动需要特殊处理

### 4. 现代方案：Pointer Events

统一处理各种输入设备：
\`\`\`js
element.addEventListener('pointerdown', start);
element.addEventListener('pointermove', move);
element.addEventListener('pointerup', end);
\`\`\`

优势：
- 支持触摸屏
- 更好的多点触控处理
- 压力敏感支持

### 5. 性能优化技巧

1. **使用transform代替top/left**：
   \`\`\`js
   element.style.transform = \`translate(\${dx}px, \${dy}px)\`;
   \`\`\`

2. **节流事件处理**：
   \`\`\`js
   function throttle(fn, delay) {
       let last = 0;
       return (...args) => {
           const now = Date.now();
           if (now - last >= delay) {
               fn(...args);
               last = now;
           }
       }
   }
   \`\`\`

3. **使用CSS硬件加速**：
   \`\`\`css
   .draggable {
       will-change: transform;
       backface-visibility: hidden;
   }
   \`\`\`

### 6. 第三方库推荐

1. **Draggable**：专业级拖拽库
2. **SortableJS**：列表排序
3. **Interact.js**：复杂交互处理
4. **React DnD**：React生态拖拽方案

### 总结对比

| 方案            | 优点                          | 缺点                  |
|----------------|-------------------------------|-----------------------|
| 原生实现        | 完全控制，无依赖              | 需要处理兼容性问题     |
| HTML5 API       | 内置文件拖放支持              | 定制能力有限           |
| Pointer Events  | 统一输入设备处理              | 旧浏览器不支持         |
| 第三方库        | 功能丰富，跨浏览器            | 增加包体积             |

根据项目需求选择合适方案，简单拖动可使用原生实现，复杂场景推荐使用成熟库。`
      },
      {
        id: 86,
        title: "script 标签 async 和 defer 的区别",
        tags: ["HTML", "性能优化"],
        difficulty: "中等",
        code: `<!-- 普通脚本 -->
<script src="normal.js"></script>

<!-- defer 脚本 -->
<script src="defer.js" defer></script>

<!-- async 脚本 -->
<script src="async.js" async></script>

<!-- 动态脚本 -->
<button onclick="loadScript()">加载脚本</button>
<script>
function loadScript() {
    const script = document.createElement('script');
    script.src = 'dynamic.js';
    document.body.appendChild(script);
}
</script>

<!-- 模块脚本 -->
<script type="module" src="module.js"></script>`,
        answer: `## script 标签 async 和 defer 的深度解析

### 1. 默认行为（无属性）

\`\`\`html
<script src="normal.js"></script>
\`\`\`
- **解析阻塞**：立即停止HTML解析
- **执行顺序**：按出现顺序立即执行
- **DOMContentLoaded**：在所有脚本执行完成后触发

### 2. defer 属性

\`\`\`html
<script src="defer.js" defer></script>
\`\`\`
- **解析行为**：异步下载，不阻塞HTML解析
- **执行时机**：在DOM解析完成后，DOMContentLoaded事件前按顺序执行
- **适用场景**：依赖DOM的脚本，需要保持执行顺序

### 3. async 属性

\`\`\`html
<script src="async.js" async></script>
\`\`\`
- **解析行为**：异步下载，不阻塞HTML解析
- **执行时机**：下载完成后立即执行（可能中断HTML解析）
- **执行顺序**：无序，先下载完成的先执行
- **适用场景**：独立脚本（如统计代码）

### 4. 对比总结

| 特性            | 普通脚本       | defer          | async          |
|----------------|---------------|----------------|----------------|
| 下载阻塞        | 是            | 否             | 否             |
| 执行阻塞        | 是            | 否             | 可能           |
| 执行顺序        | 文档顺序       | 文档顺序        | 下载完成顺序    |
| DOMContentLoaded | 延迟触发       | 之前触发        | 可能延迟        |
| 适用场景        | 关键渲染路径   | 依赖DOM的脚本   | 独立脚本        |

### 5. 现代模块系统

\`\`\`html
<script type="module" src="module.js"></script>
\`\`\`
- 默认具有defer行为
- 可以添加async属性使其行为类似常规async
- 支持ES6模块语法
- 自动严格模式

### 6. 动态脚本

\`\`\`js
const script = document.createElement('script');
script.src = 'dynamic.js';
document.body.appendChild(script);
\`\`\`
- 默认行为类似async
- 可以设置async=false来模拟defer行为

### 7. 性能优化建议
1. **关键脚本**：使用普通脚本（无属性）
2. **非关键脚本**：使用defer
3. **独立脚本**：使用async
4. **模块系统**：优先使用type="module"
5. **预加载**：结合<link rel="preload">使用`
      },
      {
        id: 87,
        title: "ES6 的继承和 ES5 的继承有什么区别",
        tags: ["ES6", "继承", "class"],
        difficulty: "中等",
        code: `// ES5 继承
function Animal(name) {
    this.name = name;
}
Animal.prototype.speak = function() {
    console.log(this.name + ' makes a noise.');
};

function Dog(name) {
    Animal.call(this, name);
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.speak = function() {
    console.log(this.name + ' barks.');
};

// ES6 继承
class Animal {
    constructor(name) {
        this.name = name;
    }
    speak() {
        console.log(\`\${this.name} makes a noise.\`);
    }
}

class Dog extends Animal {
    constructor(name) {
        super(name);
    }
    speak() {
        console.log(\`\${this.name} barks.\`);
    }
}

// 测试代码
const d = new Dog('Rex');
d.speak(); // Rex barks.`,
        answer: `## ES6 继承与 ES5 继承的深度对比

### 1. 实现方式

#### ES5 继承
- 构造函数继承：使用call/apply
- 原型继承：手动设置prototype链
- 需要修复constructor指向

\`\`\`js
function Child() {
    Parent.call(this); // 继承属性
}
Child.prototype = Object.create(Parent.prototype); // 继承方法
Child.prototype.constructor = Child; // 修复constructor
\`\`\`

#### ES6 继承
- 使用class和extends关键字
- 自动处理原型链
- 必须调用super()才能使用this

\`\`\`js
class Child extends Parent {
    constructor() {
        super(); // 必须调用
    }
}
\`\`\`

### 2. 主要差异

| 特性                | ES5                          | ES6                          |
|---------------------|------------------------------|------------------------------|
| 语法                | 函数+原型                    | class关键字                  |
| 静态方法继承        | 需手动处理                   | 自动继承                     |
| 原型方法枚举性      | 可枚举                       | 不可枚举                     |
| super关键字         | 无                           | 支持super调用父类方法        |
| 内置对象继承        | 困难（如Array）              | 可直接继承                   |
| 类属性初始化        | 在构造函数中                 | 可在类顶层声明               |

### 3. 静态方法继承

#### ES5 需要手动复制
\`\`\`js
Child.staticMethod = Parent.staticMethod;
\`\`\`

#### ES6 自动继承
\`\`\`js
class Child extends Parent {
    static childStatic() {
        super.parentStatic(); // 调用父类静态方法
    }
}
\`\`\`

### 4. 内置对象继承

#### ES5 的问题
\`\`\`js
function MyArray() {
    Array.call(this);
}
// 无法正确继承数组方法
\`\`\`

#### ES6 的解决
\`\`\`js
class MyArray extends Array {
    first() {
        return this[0];
    }
}
\`\`\`

### 5. 原型方法的差异

#### ES5 方法可枚举
\`\`\`js
Object.keys(Child.prototype); // 包含方法
\`\`\`

#### ES6 方法不可枚举
\`\`\`js
Object.keys(Child.prototype); // 空数组
\`\`\`

### 6. super 关键字的区别

- **ES6 的super**：
  - 在构造函数中指向父类构造函数
  - 在方法中指向父类原型
  - 静态方法中指向父类

- **ES5 模拟super**：
  \`\`\`js
  Parent.prototype.method.call(this);
  \`\`\`

### 7. 继承链检测

#### ES5
\`\`\`js
obj instanceof Parent;
\`\`\`

#### ES6
\`\`\`js
Object.getPrototypeOf(Child) === Parent;
\`\`\`

### 8. 总结
- **ES6 继承**更简洁、更安全
- 底层仍然是基于原型的继承
- 解决了ES5继承的多个痛点
- 推荐在新项目中使用ES6 class语法`
      },
      {
        id: 88,
        title: "Promise",
        tags: ["异步", "ES6"],
        difficulty: "中等",
        code: `// 基本用法
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        Math.random() > 0.5 ? 
            resolve('Success!') : 
            reject(new Error('Failed'));
    }, 1000);
});

promise
    .then(result => console.log(result))
    .catch(error => console.error(error));

// 链式调用
fetchData()
    .then(processData)
    .then(saveData)
    .catch(handleError);

// Promise 化回调函数
function readFilePromise(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

// async/await 用法
async function fetchUser() {
    try {
        const user = await fetch('/user');
        const posts = await fetch('/posts');
        return { user, posts };
    } catch (error) {
        console.error('Fetch failed:', error);
    }
}`,
        answer: `## Promise 深度解析

### 1. 核心概念

#### 三种状态：
- **pending**：初始状态
- **fulfilled**：操作成功完成
- **rejected**：操作失败

#### 特点：
- 不可逆性：状态一旦改变不可逆转
- 链式调用：.then() 返回新Promise
- 错误冒泡：错误会沿着链传递直到被捕获

### 2. 基本用法

#### 创建Promise
\`\`\`js
const promise = new Promise((resolve, reject) => {
    // 异步操作
    if (success) {
        resolve(value);
    } else {
        reject(error);
    }
});
\`\`\`

#### 消费Promise
\`\`\`js
promise
    .then(onFulfilled)
    .catch(onRejected)
    .finally(cleanup);
\`\`\`

### 3. 链式调用

\`\`\`js
doFirstThing()
    .then(result => doSecondThing(result))
    .then(newResult => doThirdThing(newResult))
    .catch(error => handleError(error));
\`\`\`

- 每个then返回新Promise
- 返回值可以是值或Promise
- 抛出错误会触发catch

### 4. 错误处理

#### 最佳实践：
\`\`\`js
// 方式1：统一catch
promise
    .then(step1)
    .then(step2)
    .catch(handleAllErrors);

// 方式2：中间处理
promise
    .then(step1)
    .catch(handleStep1Error)
    .then(step2)
    .catch(handleStep2Error);
\`\`\`

### 5. 组合方法

#### Promise.all()
\`\`\`js
Promise.all([promise1, promise2])
    .then(([result1, result2]) => {});
\`\`\`

#### Promise.race()
\`\`\`js
Promise.race([promise1, promise2])
    .then(firstResult => {});
\`\`\`

### 6. async/await

#### 基本用法
\`\`\`js
async function asyncCall() {
    try {
        const result = await promise;
        const result2 = await anotherPromise;
        return finalResult;
    } catch (error) {
        handleError(error);
    }
}
\`\`\`

#### 注意事项：
- await 只能在async函数中使用
- 异步函数总是返回Promise
- 并行优化：
  \`\`\`js
  const [res1, res2] = await Promise.all([promise1, promise2]);
  \`\`\`

### 7. 常见误区

1. **忘记return**：
   \`\`\`js
   // 错误
   .then(() => { doSomething(); })
   
   // 正确
   .then(() => doSomething())
   \`\`\`

2. **嵌套过深**：
   \`\`\`js
   // 避免
   first().then(r1 => {
       second().then(r2 => {
           // ...
       });
   });
   \`\`\`

3. **忽略错误处理**：
   \`\`\`js
   // 危险
   fetchData().then(handleData);
   
   // 安全
   fetchData()
       .then(handleData)
       .catch(logError);
   \`\`\`

### 8. 性能优化

1. **尽早处理错误**：
   \`\`\`js
   fetchData()
       .catch(handleError) // 尽早捕获
       .then(processData)
   \`\`\`

2. **并行处理**：
   \`\`\`js
   const [user, posts] = await Promise.all([
       fetchUser(),
       fetchPosts()
   ]);
   \`\`\`

3. **取消功能**：
   \`\`\`js
   const controller = new AbortController();
   fetch(url, { signal: controller.signal });
   controller.abort(); // 取消请求
   \`\`\`

### 9. 总结
- **优先使用async/await**：提升代码可读性
- **合理并行**：使用Promise.all处理独立任务
- **统一错误处理**：使用try/catch或.catch()
- **拆分函数**：保持每个函数单一职责
- **使用现代库**：如RxJS处理复杂异步流
- **避免过度嵌套**：通过函数组合保持代码扁平

通过合理选择异步处理模式，可以有效解决回调地狱问题，提升代码可维护性和可读性。`
      },
      {
        id: 89,
        title: "Promise all/allSettle/any/race 的区别",
        tags: ["Promise", "异步"],
        difficulty: "中等",
        code: `// 测试数据
const p1 = Promise.resolve(1);
const p2 = new Promise(res => setTimeout(res, 100, 2));
const p3 = Promise.reject(3);
const p4 = Promise.reject(4);

// Promise.all
Promise.all([p1, p2])
    .then(console.log); // [1, 2]

Promise.all([p1, p3])
    .catch(console.error); // 3

// Promise.allSettled
Promise.allSettled([p1, p3])
    .then(console.log);
/* [
    { status: 'fulfilled', value: 1 },
    { status: 'rejected', reason: 3 }
] */

// Promise.any
Promise.any([p3, p4])
    .catch(e => console.error(e.errors)); // [3, 4]

Promise.any([p1, p2])
    .then(console.log); // 1

// Promise.race
Promise.race([p2, p1])
    .then(console.log); // 1

Promise.race([p3, p1])
    .catch(console.error); // 3`,
        answer: `## Promise 组合方法详解

### 1. Promise.all()

#### 特点：
- 所有Promise成功时返回结果数组
- 任意一个失败立即拒绝

\`\`\`js
Promise.all([promise1, promise2])
    .then(values => {
        // values是完成值的数组
    })
    .catch(reason => {
        // 任一Promise被拒绝
    });
\`\`\`

**适用场景**：需要所有结果都成功的并行操作

### 2. Promise.allSettled()

#### 特点：
- 等待所有Promise完成（无论成功失败）
- 返回包含每个Promise结果的对象数组

\`\`\`js
Promise.allSettled([promise1, promise2])
    .then(results => {
        results.forEach(result => {
            if (result.status === 'fulfilled') {
                console.log(result.value);
            } else {
                console.error(result.reason);
            }
        });
    });
\`\`\`

**适用场景**：需要知道每个Promise的最终状态

### 3. Promise.any()

#### 特点：
- 任意一个Promise成功即返回该结果
- 全部失败时返回AggregateError

\`\`\`js
Promise.any([promise1, promise2])
    .then(firstSuccess => {})
    .catch(error => {
        console.error(error.errors); // 所有错误
    });
\`\`\`

**适用场景**：多个备用方案，取最先成功的

### 4. Promise.race()

#### 特点：
- 取最先完成的Promise（无论成功失败）

\`\`\`js
Promise.race([promise1, promise2])
    .then(firstResult => {})
    .catch(firstError => {});
\`\`\`

**适用场景**：超时控制、竞速请求

### 对比总结

| 方法            | 成功条件                | 失败条件                | 返回值               |
|----------------|------------------------|------------------------|---------------------|
| Promise.all     | 全部成功               | 任一失败               | 结果数组            |
| Promise.allSettled | 全部完成              | 不会失败               | 状态对象数组         |
| Promise.any     | 任一成功               | 全部失败               | 第一个成功值         |
| Promise.race    | 第一个完成（无论成败） | 第一个完成（无论成败） | 第一个完成的结果     |

### 使用示例

#### 超时控制
\`\`\`js
function withTimeout(promise, timeout) {
    return Promise.race([
        promise,
        new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), timeout)
        )
    ]);
}
\`\`\`

#### 优先请求
\`\`\`js
const primary = fetch('https://primary.api');
const fallback = fetch('https://fallback.api');

Promise.any([primary, fallback])
    .then(handleResponse);
\`\`\`

#### 批量处理
\`\`\`js
// 记录所有请求结果
const allRequests = requests.map(req => 
    req.catch(error => ({ error }))
);
const results = await Promise.all(allRequests);
\`\`\`

### 10. 总结
- **Promise.all**：并行操作，等待所有完成
- **Promise.allSettled**：等待所有完成，不关心结果
- **Promise.any**：取第一个成功，不等待其他完成
- **Promise.race**：取第一个完成，不等待其他完成

根据具体需求选择合适的方法，现代开发中推荐优先使用Promise.all和Promise.race。`
      },
      {
        id: 90,
        title: "如何解决异步回调地狱",
        tags: ["异步", "模式"],
        difficulty: "中等",
        code: `// 回调地狱示例
getData(function(a) {
    getMoreData(a, function(b) {
        getMoreData(b, function(c) {
            getMoreData(c, function(d) {
                console.log(d);
            });
        });
    });
});

// Promise 解决方案
getData()
    .then(a => getMoreData(a))
    .then(b => getMoreData(b))
    .then(c => getMoreData(c))
    .then(d => console.log(d))
    .catch(error => console.error(error));

// async/await 解决方案
async function process() {
    try {
        const a = await getData();
        const b = await getMoreData(a);
        const c = await getMoreData(b);
        const d = await getMoreData(c);
        console.log(d);
    } catch (error) {
        console.error(error);
    }
}

// 中间件方案（如redux-saga）
function* saga() {
    try {
        const a = yield call(getData);
        const b = yield call(getMoreData, a);
        const c = yield call(getMoreData, b);
        const d = yield call(getMoreData, c);
        yield put(successAction(d));
    } catch (error) {
        yield put(failureAction(error));
    }
}

// 函数组合方案
const pipeAsync = (...fns) => x => 
    fns.reduce(async (v, f) => f(await v), x);

const process = pipeAsync(
    getData,
    getMoreData,
    getMoreData,
    getMoreData
);

process().then(console.log);`,
        answer: `## 解决异步回调地狱的多种方案

### 1. 回调地狱的问题
- **嵌套过深**：代码向右扩展，难以阅读
- **错误处理困难**：需要在每个回调中处理错误
- **流程控制复杂**：并行/串行控制需要额外代码
- **难以复用**：逻辑被分散在多个回调中

### 2. Promise 解决方案

#### 链式调用
\`\`\`js
getData()
    .then(processA)
    .then(processB)
    .then(processC)
    .catch(handleError);
\`\`\`

**优点**：
- 扁平化代码结构
- 统一错误处理
- 支持返回值和Promise

### 3. async/await 方案

#### 同步风格代码
\`\`\`js
async function process() {
    try {
        const a = await step1();
        const b = await step2(a);
        return finalProcess(b);
    } catch (error) {
        handleError(error);
    }
}
\`\`\`

**优化技巧**：
- 并行执行独立操作：
  \`\`\`js
  const [a, b] = await Promise.all([getA(), getB()]);
  \`\`\`
- 提前返回：
  \`\`\`js
  const user = await getUser() || await createUser();
  \`\`\`

### 4. 函数式编程方案

#### 组合函数
\`\`\`js
const process = composeAsync(
    step1,
    step2,
    step3
);

process(input).then(console.log);
\`\`\`

#### 实现composeAsync
\`\`\`js
const composeAsync = (...fns) => x => 
    fns.reduce(async (acc, fn) => fn(await acc), x);
\`\`\`

### 5. 中间件模式

#### 使用生成器（Generator）
\`\`\`js
function* main() {
    const a = yield step1();
    const b = yield step2(a);
    return step3(b);
}

runGenerator(main);
\`\`\`

#### 使用redux-saga
\`\`\`js
import { call, put } from 'redux-saga/effects';

function* mainSaga() {
    try {
        const a = yield call(step1);
        const b = yield call(step2, a);
        yield put(successAction(b));
    } catch (error) {
        yield put(failureAction(error));
    }
}
\`\`\`

### 6. 事件发布/订阅模式

\`\`\`js
const emitter = new EventEmitter();

emitter
    .on('step1', data => {
        processStep1(data, (err, result) => {
            if (err) return emitter.emit('error', err);
            emitter.emit('step2', result);
        });
    })
    .on('step2', data => {
        // ...
    })
    .on('error', handleError);

emitter.emit('step1', initData);
\`\`\`

### 7. 响应式编程（RxJS）

\`\`\`js
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

from(getData())
    .pipe(
        switchMap(a => getMoreData(a)),
        switchMap(b => getMoreData(b)),
        switchMap(c => getMoreData(c))
    )
    .subscribe({
        next: d => console.log(d),
        error: console.error
    });
\`\`\`

### 8. 最佳实践总结
1. **优先使用async/await**：提升代码可读性
2. **合理并行**：使用Promise.all处理独立任务
3. **统一错误处理**：使用try/catch或.catch()
4. **拆分函数**：保持每个函数单一职责
5. **使用现代库**：如RxJS处理复杂异步流
6. **避免过度嵌套**：通过函数组合保持代码扁平

通过合理选择异步处理模式，可以有效解决回调地狱问题，提升代码可维护性和可读性。`
      },
    ]
    export default questions90;