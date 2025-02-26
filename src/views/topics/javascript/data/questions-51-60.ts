 
const questions60 = [
  
    {
        id: 51,
        title: "如何判断对象相等",
        tags: ["对象", "比较"],
        difficulty: "中等",
        code: `// 1. 直接比较引用 (==, ===)
    const obj1 = { name: "张三" };
    const obj2 = { name: "张三" };
    const obj3 = obj1;
    
    console.log(obj1 === obj2);  // false (不同引用)
    console.log(obj1 === obj3);  // true (相同引用)
    
    // 2. 浅比较 - 使用 Object.keys 和 every
    function shallowEqual(obj1, obj2) {
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);
      
      if (keys1.length !== keys2.length) {
        return false;
      }
      
      return keys1.every(key => obj1[key] === obj2[key]);
    }
    
    console.log(shallowEqual(
      { name: "张三", age: 30 },
      { name: "张三", age: 30 }
    )); // true
    
    console.log(shallowEqual(
      { name: "张三", age: 30 },
      { name: "李四", age: 30 }
    )); // false
    
    // 3. 深比较 - 处理嵌套对象
    function deepEqual(obj1, obj2) {
      // 处理原始类型比较
      if (obj1 === obj2) return true;
      
      // 处理 null 和非对象类型
      if (obj1 == null || obj2 == null || 
          typeof obj1 !== 'object' || typeof obj2 !== 'object') {
        return false;
      }
      
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);
      
      if (keys1.length !== keys2.length) {
        return false;
      }
      
      for (const key of keys1) {
        if (!keys2.includes(key)) return false;
        
        if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
          // 递归比较嵌套对象
          if (!deepEqual(obj1[key], obj2[key])) return false;
        } else if (obj1[key] !== obj2[key]) {
          return false;
        }
      }
      
      return true;
    }
    
    console.log(deepEqual(
      { name: "张三", address: { city: "北京", area: "朝阳" } },
      { name: "张三", address: { city: "北京", area: "朝阳" } }
    )); // true
    
    // 4. 使用 JSON.stringify() 简易比较
    function jsonEqual(obj1, obj2) {
      return JSON.stringify(obj1) === JSON.stringify(obj2);
    }
    
    console.log(jsonEqual(
      { name: "张三", age: 30, skills: ["JS", "CSS"] },
      { name: "张三", age: 30, skills: ["JS", "CSS"] }
    )); // true
    
    console.log(jsonEqual(
      { age: 30, name: "张三" },  // 注意属性顺序不同
      { name: "张三", age: 30 }
    )); // true (JSON.stringify 会按属性名排序)
    
    // 5. 处理特殊情况 - 数组比较
    const arr1 = [1, 2, { name: "张三" }];
    const arr2 = [1, 2, { name: "张三" }];
    
    console.log(arr1 === arr2);         // false
    console.log(deepEqual(arr1, arr2)); // true
    
    // 6. 使用第三方库 (lodash)
    // const _ = require('lodash');
    // console.log(_.isEqual(obj1, obj2)); // 更可靠的深度比较`,
        answer: `## JavaScript 对象相等比较
    
    在 JavaScript 中比较两个对象是否相等是一个常见但具有挑战性的任务。由于对象是引用类型，直接使用 \`==\` 或 \`===\` 操作符只会比较引用（内存地址），而不是内容。
    
    ### 1. 引用比较（浅比较）
    
    直接使用 \`==\` 或 \`===\` 操作符比较对象时，只有当两个变量引用完全相同的对象时才会返回 \`true\`：
    
    \`\`\`javascript
    const obj1 = { name: "张三" };
    const obj2 = { name: "张三" };
    const obj3 = obj1;
    
    console.log(obj1 === obj2); // false (不同引用，尽管内容相同)
    console.log(obj1 === obj3); // true (相同引用)
    \`\`\`
    
    ### 2. 浅层内容比较
    
    如果只需要比较对象的直接属性（一级属性），可以使用以下方法：
    
    \`\`\`javascript
    function shallowEqual(obj1, obj2) {
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);
      
      if (keys1.length !== keys2.length) {
        return false;
      }
      
      return keys1.every(key => obj1[key] === obj2[key]);
    }
    \`\`\`
    
    这种方法适用于简单对象，但对于嵌套对象或数组，它仍然使用引用比较。
    
    ### 3. 深度内容比较
    
    对于需要比较嵌套结构的情况，需要实现递归比较：
    
    \`\`\`javascript
    function deepEqual(obj1, obj2) {
      // 处理原始类型和相同引用
      if (obj1 === obj2) return true;
      
      // 处理 null 和非对象类型
      if (obj1 == null || obj2 == null || 
          typeof obj1 !== 'object' || typeof obj2 !== 'object') {
        return false;
      }
      
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);
      
      if (keys1.length !== keys2.length) {
        return false;
      }
      
      for (const key of keys1) {
        if (!keys2.includes(key)) return false;
        
        if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
          // 递归比较嵌套对象
          if (!deepEqual(obj1[key], obj2[key])) return false;
        } else if (obj1[key] !== obj2[key]) {
          return false;
        }
      }
      
      return true;
    }
    \`\`\`
    
    这个实现能够处理大多数嵌套对象和数组的比较，但仍有改进空间。
    
    ### 4. 使用 JSON.stringify() 进行比较
    
    对于没有循环引用和特殊值（如函数、undefined）的对象，可以使用 JSON.stringify() 进行简单比较：
    
    \`\`\`javascript
    function jsonEqual(obj1, obj2) {
      return JSON.stringify(obj1) === JSON.stringify(obj2);
    }
    \`\`\`
    
    **优点**：
    - 实现简单
    - 自动处理嵌套结构
    - 不受属性顺序影响（JSON.stringify 会按属性名排序）
    
    **缺点**：
    - 无法处理循环引用
    - 忽略 undefined 和函数属性
    - Date 对象会被转换为字符串
    - 性能较差（尤其对于大型对象）
    
    ### 5. 特殊情况处理
    
    #### 5.1 数组比较
    
    数组也是对象，可以使用上述深度比较方法：
    
    \`\`\`javascript
    const arr1 = [1, 2, { name: "张三" }];
    const arr2 = [1, 2, { name: "张三" }];
    
    console.log(arr1 === arr2);         // false
    console.log(deepEqual(arr1, arr2)); // true
    \`\`\`
    
    #### 5.2 处理 NaN 值
    
    NaN 是唯一一个不等于自身的值 (\`NaN !== NaN\`)，需要特殊处理：
    
    \`\`\`javascript
    // 在 deepEqual 函数中添加
    if (typeof obj1[key] === 'number' && typeof obj2[key] === 'number' &&
        isNaN(obj1[key]) && isNaN(obj2[key])) {
      continue; // 两个 NaN 视为相等
    }
    \`\`\`
    
    #### 5.3 日期对象比较
    
    \`\`\`javascript
    // 在 deepEqual 函数中添加
    if (obj1[key] instanceof Date && obj2[key] instanceof Date) {
      if (obj1[key].getTime() !== obj2[key].getTime()) {
        return false;
      }
      continue;
    }
    \`\`\`
    
    ### 6. 使用第三方库
    
    为避免重新发明轮子并处理各种边缘情况，可以使用成熟的第三方库：
    
    #### 6.1 Lodash/Underscore
    
    \`\`\`javascript
    const _ = require('lodash');
    console.log(_.isEqual(obj1, obj2)); // 可靠的深度比较
    \`\`\`
    
    #### 6.2 fast-deep-equal
    
    性能优化的深度相等比较库：
    
    \`\`\`javascript
    const equal = require('fast-deep-equal');
    console.log(equal(obj1, obj2));
    \`\`\`
    
    ### 7. 使用 Object.is()
    
    ES6 引入的 \`Object.is()\` 方法提供了更严格的相等性比较，能够正确处理 NaN 和 ±0：
    
    \`\`\`javascript
    console.log(Object.is(NaN, NaN)); // true
    console.log(Object.is(0, -0));    // false
    
    // 但对于对象仍然是引用比较
    console.log(Object.is(obj1, obj2)); // false (不同引用)
    \`\`\`
    
    ### 8. 性能考虑
    
    - **浅比较**：适用于简单对象，性能最佳
    - **JSON.stringify**：简单但性能较差，尤其对于大型对象
    - **递归深比较**：灵活但可能在深层嵌套对象上性能较差
    - **第三方库**：通常经过性能优化，推荐用于生产环境
    
    ### 9. 最佳实践
    
    1. **明确比较需求**：是否需要浅比较还是深比较？
    2. **处理特殊类型**：Date、RegExp、Map、Set 等需要特殊处理
    3. **考虑性能**：对于频繁比较大型对象，选择优化的方法或库
    4. **避免循环引用**：处理可能包含循环引用的对象时特别小心
    
    ### 总结
    
    JavaScript 中比较对象相等没有万能的解决方案，需要根据具体需求选择恰当的方法。对于简单场景，可以使用浅比较或 JSON.stringify；对于复杂场景，建议使用经过测试的第三方库如 Lodash 的 _.isEqual 或 fast-deep-equal。理解各种方法的优缺点，有助于在不同场景下做出最佳选择。`,
      },
      {
        id: 52,
        title: 'null 和 undefined 的区别',
        tags: ['基础', '类型'],
        difficulty: '简单',
        code: `// 1. 基本定义与类型
      console.log(typeof undefined); // "undefined"
      console.log(typeof null);      // "object" (这是JS的一个历史遗留bug)
      
      // 2. 变量声明但未赋值
      let variable;
      console.log(variable); // undefined
      
      // 3. 访问不存在的属性
      const obj = {};
      console.log(obj.nonExistentProperty); // undefined
      
      // 4. 函数没有返回值
      function noReturn() {
        // 没有return语句
      }
      console.log(noReturn()); // undefined
      
      // 5. 函数参数未传值
      function test(param) {
        console.log(param); // undefined
      }
      test();
      
      // 6. 显式赋值
      let emptyValue = null;
      let undefinedValue = undefined;
      
      // 7. 相等性比较
      console.log(null == undefined);  // true (宽松比较)
      console.log(null === undefined); // false (严格比较)
      
      // 8. 与数字运算的不同表现
      console.log(null + 1);      // 1 (null被视为0)
      console.log(undefined + 1); // NaN (undefined被视为NaN)
      
      // 9. JSON序列化
      const withNull = { value: null };
      const withUndefined = { value: undefined };
      console.log(JSON.stringify(withNull));      // {"value":null}
      console.log(JSON.stringify(withUndefined)); // {}`,
        answer: `## null 和 undefined 的区别
      
      JavaScript 中的 \`null\` 和 \`undefined\` 是两个表示"无"或"空"的特殊值，但它们在语义和使用场景上有明显区别。
      
      ### 1. 基本定义
      
      - **undefined**: 表示一个变量已声明但尚未赋值，或者一个对象属性/数组元素不存在
      - **null**: 表示一个空对象指针，是一个可以被赋值的值，表示变量有值，但值为"空"
      
      ### 2. 类型差异
      
      \`\`\`javascript
      console.log(typeof undefined); // "undefined"
      console.log(typeof null);      // "object" (这是JavaScript的一个历史遗留bug)
      \`\`\`
      
      \`null\` 被错误地返回为 "object" 类型是 JavaScript 早期版本遗留下来的问题，由于兼容性原因无法修复。
      
      ### 3. 出现场景
      
      **undefined 的典型出现场景：**
      
      1. 变量声明但未初始化
         \`\`\`javascript
         let variable;
         console.log(variable); // undefined
         \`\`\`
      
      2. 访问对象不存在的属性
         \`\`\`javascript
         const obj = {};
         console.log(obj.nonExistentProperty); // undefined
         \`\`\`
      
      3. 函数没有返回值
         \`\`\`javascript
         function noReturn() {}
         console.log(noReturn()); // undefined
         \`\`\`
      
      4. 函数参数未提供
         \`\`\`javascript
         function test(param) {
           console.log(param); // undefined
         }
         test();
         \`\`\`
      
      **null 的典型使用场景：**
      
      1. 表示对象的占位符
         \`\`\`javascript
         let object = null; // 明确表示此变量将来会是一个对象，但目前为空
         \`\`\`
      
      2. 在DOM操作中表示不存在的节点
         \`\`\`javascript
         document.querySelector('.non-existent'); // null
         \`\`\`
      
      3. 作为函数的返回值，表示特定的空状态
         \`\`\`javascript
         function findUser(id) {
           // 用户不存在时返回null
           return null;
         }
         \`\`\`
      
      ### 4. 相等性比较
      
      \`\`\`javascript
      console.log(null == undefined);  // true (使用双等号进行宽松比较)
      console.log(null === undefined); // false (使用三等号进行严格比较)
      \`\`\`
      
      双等号下它们被视为相等，这是JavaScript类型转换规则的特例。
      
      ### 5. 数值转换
      
      \`\`\`javascript
      // 数字转换
      console.log(Number(null));      // 0
      console.log(Number(undefined)); // NaN
      
      // 在数学运算中
      console.log(null + 1);      // 1 (null被视为0)
      console.log(undefined + 1); // NaN
      \`\`\`
      
      ### 6. 在JSON中的处理
      
      \`\`\`javascript
      const withNull = { value: null };
      const withUndefined = { value: undefined };
      
      console.log(JSON.stringify(withNull));      // {"value":null}
      console.log(JSON.stringify(withUndefined)); // {}
      \`\`\`
      
      JSON序列化时，\`null\` 值会被保留，而 \`undefined\` 会被忽略。
      
      ### 7. 函数默认参数
      
      ES6中函数参数默认值只会在参数为 \`undefined\` 时生效，而不会在参数为 \`null\` 时触发：
      
      \`\`\`javascript
      function test(param = 'default') {
        return param;
      }
      
      console.log(test(undefined)); // "default" (使用默认值)
      console.log(test(null));      // null (不使用默认值)
      \`\`\`
      
      ### 8. 最佳实践
      
      1. **使用 null 的场景**：
         - 当你想明确表示"这里应该有一个值，但目前没有"
         - 当你需要显式地表示一个变量或属性为空
         - 在需要进行类型检查的场景，如 \`if (value === null)\`
      
      2. **使用 undefined 的场景**：
         - 通常不会显式地为变量赋值 undefined
         - 判断变量或属性是否已被定义时: \`if (typeof variable === 'undefined')\`
         - 函数参数未传值的默认状态
      
      ### 9. 总结
      
      尽管 \`null\` 和 \`undefined\` 在某些场景下的表现相似，但它们有不同的语义和用途：
      
      | 特性 | null | undefined |
      |------|------|-----------|
      | 类型 | object (bug) | undefined |
      | 表示 | 有值但为空 | 未定义/未赋值 |
      | 是否是关键字 | 是 | 否 (全局变量) |
      | 数字转换 | 0 | NaN |
      | JSON序列化 | 保留 | 忽略 |
      | 典型用途 | 表示空对象 | 未初始化的变量 |
      
      理解它们的区别有助于编写更清晰、更具语义的代码，减少潜在的错误。`
      },
      {
        id: 53,
        title: "用 setTimeout 来实现倒计时有什么问题？",
        tags: ["定时器", "异步"],
        difficulty: "中等",
        code: `// 1. 基本的 setTimeout 倒计时实现
    function basicCountdown(seconds) {
      let remainingSeconds = seconds;
      
      function tick() {
        console.log(remainingSeconds);
        
        if (remainingSeconds <= 0) {
          console.log('倒计时结束!');
          return;
        }
        
        remainingSeconds--;
        setTimeout(tick, 1000); // 1000毫秒后再次调用
      }
      
      tick();
    }
    
    // 2. 真实计时差异演示
    function driftingCountdown(seconds) {
      const startTime = new Date().getTime();
      let remainingSeconds = seconds;
      
      function tick() {
        console.log(remainingSeconds);
        
        if (remainingSeconds <= 0) {
          const endTime = new Date().getTime();
          const actualTime = (endTime - startTime) / 1000;
          console.log(\`倒计时结束! 预期时间: \${seconds}秒, 实际时间: \${actualTime.toFixed(3)}秒\`);
          return;
        }
        
        remainingSeconds--;
        setTimeout(tick, 1000);
      }
      
      tick();
    }
    
    // 3. 补偿延迟的改进版本
    function compensatedCountdown(seconds) {
      const startTime = new Date().getTime();
      let remainingSeconds = seconds;
      let expectedTime = startTime;
      
      function tick() {
        console.log(remainingSeconds);
        
        if (remainingSeconds <= 0) {
          console.log('倒计时结束!');
          return;
        }
        
        remainingSeconds--;
        
        // 计算下一次调用的准确时间
        expectedTime += 1000;
        const now = new Date().getTime();
        const delay = Math.max(0, expectedTime - now);
        
        setTimeout(tick, delay);
      }
      
      tick();
    }
    
    // 4. 使用 requestAnimationFrame 的高精度实现
    function rafCountdown(seconds) {
      const startTime = performance.now();
      let remainingSeconds = seconds;
      let lastSecondTime = startTime;
      
      function tick(timestamp) {
        // 检查是否过了一秒
        if (timestamp - lastSecondTime >= 1000) {
          console.log(remainingSeconds);
          remainingSeconds--;
          lastSecondTime = timestamp;
        }
        
        if (remainingSeconds < 0) {
          console.log('倒计时结束!');
          return;
        }
        
        requestAnimationFrame(tick);
      }
      
      requestAnimationFrame(tick);
    }`,
        answer: `## 用 setTimeout 实现倒计时的问题
    
    setTimeout 是 JavaScript 中最常用的定时器函数，但在实现精确倒计时时存在一些问题。了解这些问题及其解决方案对于构建可靠的时间敏感应用至关重要。
    
    ### 基本实现方式
    
    使用 setTimeout 实现倒计时的基本方法如下：
    
    \`\`\`javascript
    function countdown(seconds) {
      let remainingSeconds = seconds;
      
      function tick() {
        console.log(remainingSeconds);
        
        if (remainingSeconds <= 0) {
          console.log('倒计时结束!');
          return;
        }
        
        remainingSeconds--;
        setTimeout(tick, 1000); // 每隔1秒调用一次
      }
      
      tick();
    }
    
    countdown(10); // 从10秒开始倒计时
    \`\`\`
    
    ### 主要问题
    
    #### 1. 定时器不精确
    
    setTimeout 的执行时间并不保证精确，可能会有延迟，主要原因包括：
    
    - **JavaScript 单线程执行**：如果主线程有长时间运行的任务，setTimeout 回调会被推迟
    - **最小延迟限制**：浏览器对非活跃标签页的 setTimeout 最小延迟通常为 1000ms
    - **系统负载**：CPU 繁忙时可能导致延迟增加
    - **定时器嵌套**：嵌套的 setTimeout 调用会有最小间隔限制（通常在 4ms 左右）
    
    这些因素导致的累积误差在长时间运行的倒计时中尤为明显。
    
    #### 2. 累积误差
    
    即使每次延迟只有几毫秒，但在长时间运行的倒计时中，这些误差会累积，导致显著的时间偏差：
    
    \`\`\`javascript
    // 演示累积误差
    function demonstrateError(seconds) {
      const startTime = new Date().getTime();
      let count = seconds;
      
      function tick() {
        if (count <= 0) {
          const elapsedTime = (new Date().getTime() - startTime) / 1000;
          console.log(\`预期运行 \${seconds} 秒，实际运行 \${elapsedTime.toFixed(3)} 秒\`);
          return;
        }
        
        count--;
        setTimeout(tick, 1000);
      }
      
      tick();
    }
    
    demonstrateError(60); // 一分钟倒计时可能会有几秒的误差
    \`\`\`
    
    #### 3. 后台运行和节能问题
    
    当浏览器标签页处于非活跃状态或设备进入节能模式时，setTimeout 的行为会受到影响：
    
    - 非活跃标签页中，setTimeout 的最小延迟会增加（通常至少 1000ms）
    - 设备休眠时，定时器可能完全暂停
    - 移动设备为了省电，可能限制后台 JavaScript 的执行
    
    #### 4. 浏览器兼容性问题
    
    不同浏览器对 setTimeout 的实现有细微差异，可能导致在不同环境下表现不一致。
    
    ### 解决方案
    
    #### 1. 基于系统时间的校准
    
    使用绝对时间点而不是相对延迟来消除累积误差：
    
    \`\`\`javascript
    function improvedCountdown(seconds) {
      const endTime = new Date().getTime() + seconds * 1000;
      
      function tick() {
        const remaining = Math.max(0, Math.round((endTime - new Date().getTime()) / 1000));
        console.log(remaining);
        
        if (remaining <= 0) {
          console.log('倒计时结束!');
          return;
        }
        
        // 计算下一秒的精确等待时间
        const wait = remaining * 1000 - (endTime - new Date().getTime() - 1000);
        setTimeout(tick, wait);
      }
      
      tick();
    }
    \`\`\`
    
    #### 2. 使用 requestAnimationFrame
    
    对于需要高精度的倒计时，可以结合使用 requestAnimationFrame：
    
    \`\`\`javascript
    function rafCountdown(seconds) {
      const startTime = performance.now();
      const endTime = startTime + seconds * 1000;
      let lastTick = 0;
      
      function tick(now) {
        const remaining = Math.ceil((endTime - now) / 1000);
        
        // 只在秒数变化时更新显示
        if (remaining !== lastTick) {
          console.log(remaining);
          lastTick = remaining;
        }
        
        if (remaining <= 0) {
          console.log('倒计时结束!');
          return;
        }
        
        requestAnimationFrame(tick);
      }
      
      requestAnimationFrame(tick);
    }
    \`\`\`
    
    #### 3. 使用 Web Workers
    
    对于需要在后台持续运行的倒计时，可以考虑使用 Web Workers：
    
    \`\`\`javascript
    // main.js
    const worker = new Worker('countdown-worker.js');
    
    worker.onmessage = function(e) {
      console.log(e.data);
      if (e.data === 0) {
        console.log('倒计时结束!');
      }
    };
    
    worker.postMessage(10); // 开始10秒倒计时
    
    // countdown-worker.js
    self.onmessage = function(e) {
      const seconds = e.data;
      const endTime = Date.now() + seconds * 1000;
      
      function tick() {
        const remaining = Math.ceil((endTime - Date.now()) / 1000);
        self.postMessage(remaining);
        
        if (remaining <= 0) return;
        setTimeout(tick, 100); // 更频繁检查以提高精度
      }
      
      tick();
    };
    \`\`\`
    
    #### 4. 第三方库
    
    考虑使用专门的计时库，如 \`date-fns\` 或 \`moment.js\` 的扩展，它们通常具有更可靠的计时功能。
    
    ### 最佳实践
    
    1. **通过实际时间校准**：每次 tick 时根据当前时间计算剩余时间，而不是简单递减
    2. **视觉反馈与实际时间分离**：UI 更新可以使用 requestAnimationFrame，而实际时间计算使用系统时间
    3. **补偿延迟**：根据上一次调用的延迟调整下一次调用的时间间隔
    4. **适当的后备方案**：例如当页面不可见时使用服务器时间或恢复时重新同步
    5. **考虑用户体验**：对于非关键场景（如UI倒计时），视觉平滑可能比绝对精确更重要
    
    ### 总结
    
    setTimeout 实现倒计时面临的主要问题是计时不精确和累积误差。通过基于绝对时间的校准、使用 requestAnimationFrame 或 Web Workers 可以显著改善精度。对于关键应用，应当结合服务器时间验证或使用专门设计的计时库。理解这些限制和解决方案，有助于开发更可靠的时间相关功能。`,
      },
      {
        id: 54,
        title: 'JS 事件循环机制 - 宏任务和微任务',
        tags: ['事件循环', '异步'],
        difficulty: '困难',
        code: `// 示例1: 宏任务和微任务的执行顺序
      console.log('1. 脚本开始');  // 同步代码
      
      setTimeout(() => {
        console.log('2. 宏任务 - setTimeout 回调');
      }, 0);
      
      Promise.resolve()
        .then(() => {
          console.log('3. 微任务 - Promise.then 回调');
        })
        .then(() => {
          console.log('4. 微任务 - 第二个 Promise.then 回调');
        });
      
      console.log('5. 脚本结束');  // 同步代码
      
      // 输出顺序:
      // 1. 脚本开始
      // 5. 脚本结束
      // 3. 微任务 - Promise.then 回调
      // 4. 微任务 - 第二个 Promise.then 回调
      // 2. 宏任务 - setTimeout 回调
      
      // 示例2: 复杂一点的例子
      console.log('A. 开始');
      
      setTimeout(() => {
        console.log('B. 第一个宏任务');
        Promise.resolve().then(() => {
          console.log('C. 宏任务中的微任务');
        });
      }, 0);
      
      new Promise((resolve) => {
        console.log('D. Promise 构造函数内部 (同步)');
        resolve();
      })
      .then(() => {
        console.log('E. 微任务1');
        setTimeout(() => {
          console.log('F. 微任务中的宏任务');
        }, 0);
      })
      .then(() => {
        console.log('G. 微任务2');
      });
      
      console.log('H. 结束');
      
      // 输出顺序:
      // A. 开始
      // D. Promise 构造函数内部 (同步)
      // H. 结束
      // E. 微任务1
      // G. 微任务2
      // B. 第一个宏任务
      // C. 宏任务中的微任务
      // F. 微任务中的宏任务`,
        answer: `## JavaScript 事件循环机制：宏任务与微任务
      
      JavaScript 的事件循环是其异步编程模型的核心，理解宏任务（Macrotask）和微任务（Microtask）的概念及其执行顺序，对于编写可靠的异步代码至关重要。
      
      ### 1. 事件循环基础
      
      JavaScript 是单线程执行的，但通过事件循环机制实现了非阻塞异步操作。事件循环基本流程如下：
      
      1. 执行当前调用栈中的同步代码
      2. 检查微任务队列，如果有微任务，执行所有微任务
      3. 执行一个宏任务
      4. 返回步骤 2，形成循环
      
      ![事件循环示意图](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop/the_javascript_runtime_environment_example.svg)
      
      ### 2. 宏任务与微任务
      
      #### 宏任务 (Macrotask)
      
      宏任务是由宿主环境（如浏览器、Node.js）提供的任务，包括：
      
      - \`setTimeout\`
      - \`setInterval\`
      - \`setImmediate\` (Node.js 特有)
      - I/O 操作
      - UI 渲染（浏览器特有）
      - \`requestAnimationFrame\`（浏览器特有）
      - \`MessageChannel\`
      
      #### 微任务 (Microtask)
      
      微任务是由 JavaScript 引擎提供的任务，包括：
      
      - \`Promise.then/catch/finally\`
      - \`queueMicrotask()\`
      - \`MutationObserver\`（浏览器特有）
      - \`process.nextTick\`（Node.js 特有，优先级高于其他微任务）
      
      ### 3. 执行顺序规则
      
      1. **先执行同步代码**，这些代码位于主执行上下文中
      2. **同步代码执行完后，执行当前微任务队列中的所有任务**
      3. **然后从宏任务队列中取出一个宏任务执行**
      4. **宏任务执行完后，再次执行所有微任务**
      5. **重复 3-4 步骤**
      
      简化记忆：**同步代码 → 微任务队列 → 一个宏任务 → 微任务队列 → 一个宏任务 → ...**
      
      ### 4. 详细案例分析
      
      让我们分析第一个例子的执行过程：
      
      \`\`\`javascript
      console.log('1. 脚本开始');  // 同步代码
      
      setTimeout(() => {
        console.log('2. 宏任务 - setTimeout 回调');
      }, 0);
      
      Promise.resolve()
        .then(() => {
          console.log('3. 微任务 - Promise.then 回调');
        })
        .then(() => {
          console.log('4. 微任务 - 第二个 Promise.then 回调');
        });
      
      console.log('5. 脚本结束');  // 同步代码
      \`\`\`
      
      执行顺序分析：
      
      1. **执行同步代码**：输出 '1. 脚本开始'
      2. 遇到 \`setTimeout\`，将其回调加入宏任务队列
      3. 遇到 \`Promise.then\`，将第一个 \`then\` 回调加入微任务队列
      4. **继续执行同步代码**：输出 '5. 脚本结束'
      5. **同步代码执行完毕，检查微任务队列**：
         - 执行第一个 \`then\` 回调：输出 '3. 微任务 - Promise.then 回调'
         - 第一个 \`then\` 完成后，将第二个 \`then\` 加入微任务队列
         - 执行第二个 \`then\` 回调：输出 '4. 微任务 - 第二个 Promise.then 回调'
      6. **微任务队列清空，执行一个宏任务**：
         - 执行 \`setTimeout\` 回调：输出 '2. 宏任务 - setTimeout 回调'
      
      第二个更复杂的例子展示了嵌套宏任务和微任务的情况。这样的执行顺序会产生：
      
      \`\`\`
      A. 开始
      D. Promise 构造函数内部 (同步)
      H. 结束
      E. 微任务1
      G. 微任务2
      B. 第一个宏任务
      C. 宏任务中的微任务
      F. 微任务中的宏任务
      \`\`\`
      
      ### 5. 关键细节和注意事项
      
      1. **Promise 构造函数执行器是同步执行的**
      
      \`\`\`javascript
      new Promise((resolve) => {
        console.log('同步执行');  // 会立即执行
        resolve();
      });
      \`\`\`
      
      2. **微任务队列总是在当前宏任务结束后，下一个宏任务开始前，被清空**
      
      如果微任务执行过程中又产生了新的微任务，这些新微任务会被添加到微任务队列末尾，并在当前事件循环周期中执行，而不是等到下一个宏任务。
      
      3. **Node.js 事件循环与浏览器略有差异**
      
      Node.js 的事件循环有多个阶段，而 \`process.nextTick()\` 的优先级高于其他微任务。
      
      4. **\`async/await\` 是 Promise 的语法糖**
      
      \`\`\`javascript
      async function test() {
        console.log('1');
        await Promise.resolve();
        console.log('2');  // 这相当于在 Promise.then 中执行
      }
      \`\`\`
      
      等价于：
      
      \`\`\`javascript
      function test() {
        console.log('1');
        return Promise.resolve().then(() => {
          console.log('2');
        });
      }
      \`\`\`
      
      ### 6. 常见面试问题及应用场景
      
      #### 问题：为什么需要区分宏任务和微任务？
      
      答：这种设计使 JavaScript 能够在同一事件循环周期内，保证一些高优先级任务（如 Promise 回调）的执行顺序和完整性，而不被新的事件打断，同时不阻塞主线程过长时间。
      
      #### 应用场景
      
      - **微任务**：适合需要在当前事件循环周期内尽快执行的短小任务，如状态更新后的回调
      - **宏任务**：适合分散执行的长任务、I/O 操作，或需要在 DOM 更新后执行的任务
      
      ### 7. 浏览器渲染时机
      
      浏览器通常在一个宏任务执行完成并且微任务队列清空后，检查是否需要重新渲染。这意味着：
      
      1. 多个微任务的 DOM 操作会在一次渲染中完成（批处理）
      2. 如果要确保 DOM 操作后立即更新视图，可能需要使用 \`requestAnimationFrame\`
      
      ### 8. 性能考虑
      
      - **微任务连续执行可能阻塞渲染**：如果微任务队列中任务过多或持续产生微任务，可能导致渲染延迟
      - **宏任务过多会导致任务饥饿**：如果宏任务队列任务过多，某些任务可能需要等待很长时间才能执行
      
      ### 9. 调试技巧
      
      使用 Chrome DevTools 的 Performance 面板可以记录和分析事件循环中的任务执行：
      
      1. 打开 DevTools，切换到 Performance 标签
      2. 点击 Record 按钮开始记录
      3. 执行要分析的代码
      4. 停止记录并分析 Main 部分的任务执行情况
      
      ### 10. 总结
      
      JavaScript 事件循环通过宏任务和微任务的协同工作，实现了异步编程模型。了解它们的执行顺序和优先级，对于理解复杂异步代码的行为、调试定时问题和优化应用性能至关重要。
      
      记住最基本的规则：**同步代码执行完后，先清空微任务队列，再执行一个宏任务，然后再清空微任务队列，如此循环**。`
      },
      {
        id: 55,
        title: '事件循环 - 以下代码输出结果',
        tags: ['事件循环', '异步', 'Promise'],
        difficulty: '困难',
        code: `setTimeout(() => {
        console.log('timeout');
      });
      
      function test() {
        console.log('test');
        return Promise.resolve().then(() => {
          test()
        });
      }
      
      test();`,
        answer: `## 事件循环与递归 Promise 分析
      
      这段代码演示了 JavaScript 事件循环中微任务（Promise）和宏任务（setTimeout）的执行机制，以及如何产生微任务饥饿问题。
      
      ### 执行结果
      
      这段代码会一直输出 \`test\`，而 \`timeout\` 永远不会被打印出来。
      
      ### 代码分析
      
      1. 首先注册一个 setTimeout 回调（宏任务），加入宏任务队列
      2. 调用 test() 函数，打印 "test"
      3. test() 函数返回一个 Promise，并在 then 回调中再次调用 test()
      4. 当前同步代码执行完毕，检查微任务队列
      5. 执行微任务队列中的 then 回调，它再次调用 test()
      6. test() 会再次打印 "test" 并返回一个新的 Promise，新的 then 回调又进入微任务队列
      7. 这个过程会不断重复，形成递归调用
      
      ### 关键机制解释
      
      在事件循环中，**微任务队列的处理具有优先级**。每当一个微任务完成后，JavaScript 引擎会检查微任务队列是否为空，如果不为空，会先处理完所有微任务，才会执行下一个宏任务。
      
      在这个例子中：
      - 每次执行 test() 都会产生一个新的微任务
      - 每个微任务执行后都会立即再产生一个新的微任务
      - 这导致微任务队列永远不会为空
      
      因此，事件循环被"卡住"在处理微任务的阶段，永远无法进入执行宏任务的阶段，setTimeout 的回调永远得不到执行。
      
      ### 微任务饥饿 (Starvation)
      
      这个例子展示了"微任务饥饿"问题：当微任务不断产生新的微任务时，宏任务队列中的任务可能会被"饿死"，无法得到执行。
      
      在实际开发中，应该避免这种无限递归的微任务模式，因为它会：
      1. 阻塞 UI 更新和渲染
      2. 阻塞用户交互事件处理
      3. 阻塞其他计划中的宏任务执行
      4. 可能导致浏览器标签页卡死或崩溃
      
      ### 将代码修改为有限执行
      
      如果我们想让 setTimeout 的回调得到执行，可以限制递归的深度：
      
      \`\`\`javascript
      let count = 0;
      const MAX_COUNT = 5;
      
      setTimeout(() => {
        console.log('timeout');
      });
      
      function test() {
        console.log('test');
        count++;
        
        if (count < MAX_COUNT) {
          return Promise.resolve().then(() => {
            test();
          });
        }
      }
      
      test();
      \`\`\`
      
      这个修改后的代码会输出 5 次 "test"，然后 "timeout"。
      
      ### 总结
      
      这个例子很好地展示了 JavaScript 事件循环的工作原理，特别是微任务和宏任务的优先级关系。理解这一机制对于编写高性能、不阻塞的异步代码至关重要。记住：
      1. 微任务总是优先于宏任务执行
      2. 微任务队列必须清空才能执行下一个宏任务
      3. 递归生成微任务可能导致宏任务无法执行`
      },
      {
        id: 56,
        title: '事件循环进阶 (1)',
        tags: ['事件循环', 'Promise', '异步'],
        difficulty: '困难',
        code: `Promise.resolve().then(() => {
        console.log(0);
        return Promise.resolve(4);
      }).then((res) => {
        console.log(res)
      })
      
      Promise.resolve().then(() => {
        console.log(1);
      }).then(() => {
        console.log(2);
      }).then(() => {
        console.log(3);
      }).then(() => {
        console.log(5);
      });`,
        answer: `## 事件循环进阶 - Promise链执行顺序分析
      
      这段代码展示了 JavaScript 事件循环中微任务队列处理的复杂性，特别是在嵌套 Promise 的情况下。
      
      ### 执行结果
      
      输出顺序为：
      \`\`\`
      0
      1
      2
      3
      5
      4
      \`\`\`
      
      ### 详细分析
      
      这个例子中有两条并行执行的 Promise 链：
      1. 第一条链：打印 0，返回 Promise.resolve(4)，然后打印这个值
      2. 第二条链：依次打印 1, 2, 3, 5
      
      #### 执行顺序推理：
      
      1. **初始状态**：两个 Promise.resolve() 被创建，它们的 then 回调被加入微任务队列
      
      2. **第一轮微任务处理**：
         - 第一个链的第一个 then 执行：打印 0，返回 Promise.resolve(4)
         - 第二个链的第一个 then 执行：打印 1，隐式返回 undefined
      
      3. **第二轮微任务处理**：
         - 第二个链的第二个 then 执行：打印 2
         - 第一个链的 Promise.resolve(4) 仍在处理中（关键点）
      
      4. **第三轮微任务处理**：
         - 第二个链的第三个 then 执行：打印 3
         - 第一个链的 Promise.resolve(4) 仍在处理中
      
      5. **第四轮微任务处理**：
         - 第二个链的第四个 then 执行：打印 5
         - 第一个链的 Promise.resolve(4) 完成处理
      
      6. **第五轮微任务处理**：
         - 第一个链的第二个 then 执行：打印 4
      
      ### 核心知识点解释
      
      这个案例展示了 JavaScript Promise 处理中一个重要的行为：
      
      **当在 then 回调中返回另一个 Promise 时，会比普通值多产生一个微任务周期的延迟。**
      
      具体原因是：
      1. 当你在 then 中返回 Promise.resolve(value) 时，原 Promise 链不会直接连接到这个新 Promise
      2. 而是创建了一种"解包任务"(unwrapping job)，这个任务会生成额外的微任务
      3. 这种解包过程为了支持 Promise 的递归解析行为
      
      ### 简化的心智模型
      
      可以这样理解：
      - 普通 Promise 链中，每个 then 在一个微任务周期内执行
      - 当你返回一个新 Promise 时，下一个 then 需要等待：
        1. 一个微任务周期来处理你返回的 Promise
        2. 再一个微任务周期来让其结果可用于下一个 then
      
      ### 实际应用意义
      
      理解这种行为对于编写和调试复杂的异步代码至关重要，尤其是：
      1. 在需要精确控制执行顺序的场景
      2. 调试看似奇怪的异步代码执行顺序问题
      3. 实现高级异步控制流模式
      
      在实际开发中，了解这种微妙的行为可以帮助我们避免难以预测的执行顺序问题。`
      },
      {
        id: 57,
        title: '事件循环进阶 (2)',
        tags: ['事件循环', 'Promise', '异步'],
        difficulty: '困难',
        code: `const first = () => (new Promise((resolve, reject) => {
        console.log(3);
        let p = new Promise((resolve, reject) => {
          console.log(7);
          setTimeout(() => {
            console.log(5);
            resolve(6);
            console.log(p);
          }, 0);
          resolve(1);
        });
        resolve(2);
        p.then(arg => {
          console.log(arg);
        });
      }));
      
      first().then((arg) => {
        console.log(arg);
      })
      
      console.log(4);`,
        answer: `## 事件循环进阶 - 嵌套 Promise 与 setTimeout 分析
      
      这段代码涉及嵌套的 Promise、setTimeout 和闭包引用，是 JavaScript 事件循环机制的一个复杂示例。
      
      ### 执行结果
      
      输出顺序为：
      \`\`\`
      3
      7
      4
      1
      2
      5
      Promise { <resolved>: 1 }
      \`\`\`
      
      ### 详细分析
      
      让我们一步步分析代码的执行流程：
      
      #### 1. 同步执行阶段
      
      1. 调用 \`first()\` 函数，返回一个新的 Promise
      2. 执行 Promise 构造函数的执行器函数:
         - 打印 \`3\`
         - 创建一个新的 Promise \`p\`
         - 执行 \`p\` 的执行器函数:
           - 打印 \`7\`
           - 设置一个 setTimeout 回调（加入宏任务队列）
           - 调用 \`resolve(1)\` 将 Promise \`p\` 的状态变为已解决，值为 \`1\`
         - 调用 \`resolve(2)\` 将外层 Promise 的状态变为已解决，值为 \`2\`
         - 为 Promise \`p\` 添加一个 then 回调
      3. 为 \`first()\` 返回的 Promise 添加一个 then 回调
      4. 打印 \`4\`
      
      这个阶段结束后，输出了: \`3, 7, 4\`
      
      #### 2. 微任务队列执行阶段
      
      当同步代码执行完毕后，JavaScript 引擎检查微任务队列并执行其中的任务：
      
      1. 执行 Promise \`p\` 的 then 回调（因为 \`p\` 已经被解决为 \`1\`）:
         - 打印 \`1\`
      2. 执行 \`first()\` 返回的 Promise 的 then 回调（因为它已经被解决为 \`2\`）:
         - 打印 \`2\`
      
      这个阶段结束后，新增输出: \`1, 2\`
      
      #### 3. 宏任务队列执行阶段
      
      微任务队列清空后，JavaScript 引擎从宏任务队列中取出下一个任务执行，即 setTimeout 回调：
      
      1. 打印 \`5\`
      2. 调用 \`resolve(6)\`（但这对 Promise \`p\` 没有影响，因为它已经被解决）
      3. 打印 Promise \`p\`（此时它是一个已解决的 Promise，值为 \`1\`）
      
      这个阶段结束后，新增输出: \`5, Promise { <resolved>: 1 }\`
      
      ### 关键点解释
      
      1. **Promise 的状态不可变**：一旦 Promise 被解决或拒绝，其状态和值就不能再被改变。在这个例子中，\`p\` 已经被 \`resolve(1)\` 解决，所以后续的 \`resolve(6)\` 没有效果。
      
      2. **Promise 构造函数中的代码是同步执行的**：Promise 的执行器函数会立即同步执行，而不是异步的。
      
      3. **事件循环优先级**：
         - 同步代码优先执行
         - 微任务队列（Promise callbacks）在当前执行栈清空后立即执行
         - 宏任务队列（setTimeout, setInterval 等）在微任务队列清空后才会执行
      
      4. **闭包引用**：在 setTimeout 回调中打印 \`p\` 时，可以访问到外层作用域中的 \`p\` 变量，展示了 JavaScript 闭包的特性。
      
      ### 实用技巧
      
      这个例子说明了几个实用的 JavaScript 异步编程技巧：
      
      1. **早期解决 Promise**：在某些复杂操作完成前，如果已经有了结果，可以提前 resolve Promise，这样依赖该结果的代码可以更早执行。
      
      2. **理解 Promise 状态不可变性**：一旦 Promise 状态确定，后续的 resolve/reject 调用都会被忽略，这是确保代码可预测性的重要特性。
      
      3. **调试复杂异步代码**：在异步代码中打印对象状态可以帮助理解当前执行环境，就像例子中打印 Promise \`p\` 一样。
      
      ### 总结
      
      理解此类复杂的异步执行顺序，需要牢记 JavaScript 事件循环的三个关键阶段：
      1. 同步代码执行
      2. 微任务队列处理
      3. 宏任务队列处理
      
      通过分解代码执行过程，即使是复杂的嵌套 Promise 和定时器组合，也能准确预测其行为。`
      },
      {
        id: 58,
        title: '事件循环进阶 (3)',
        tags: ['事件循环', 'Promise', 'async/await'],
        difficulty: '困难',
        code: `let a;
      let b = new Promise((resolve) => {
        console.log(1);
        setTimeout(() => {
          resolve();
        }, 1000);
      }).then(() => {
        console.log(2);
      })
      
      a = new Promise(async (resolve) => {
        console.log(a);
        await b;
        console.log(a);
        console.log(3);
        await a;
        resolve(true);
        console.log(4);
      });
      
      console.log(5);`,
        answer: `## 事件循环进阶 - Promise 自引用与 async/await 分析
      
      这段代码展示了 JavaScript 事件循环中的一个复杂情况：Promise 自引用、async/await 和延时执行的组合，它还暴露了一个常见的异步编程陷阱。
      
      ### 执行结果
      
      输出顺序为：
      \`\`\`
      1
      undefined
      5
      2
      Promise {<pending>}
      3
      \`\`\`
      
      **注意**：代码会在执行 \`await a\` 处卡住，不会输出 \`4\`。
      
      ### 详细分析
      
      #### 1. 初始执行阶段（同步代码）
      
      1. 声明变量 \`a\`（未赋值，为 \`undefined\`）
      2. 创建 Promise \`b\`，执行其构造函数：
         - 打印 \`1\`
         - 设置一个 1000ms 的定时器来解决这个 Promise
         - 为 \`b\` 添加一个 \`then\` 回调，当 \`b\` 解决时会打印 \`2\`
      3. 创建一个新的 Promise 并赋值给 \`a\`，执行其构造函数：
         - 打印 \`a\`（此时是 \`undefined\`，因为正在创建的 Promise 还未赋值给 \`a\`）
         - 遇到 \`await b\`，暂停执行，等待 \`b\` 解决
      4. 打印 \`5\`
      
      此阶段输出：\`1\`, \`undefined\`, \`5\`
      
      #### 2. 1000ms 后的执行（定时器触发）
      
      1. 1000ms 后，定时器触发，\`b\` 被解决
      2. 执行 \`b\` 的 \`then\` 回调，打印 \`2\`
      3. \`a\` 的 async 函数恢复执行：
         - 打印 \`a\`（现在是一个处于 pending 状态的 Promise）
         - 打印 \`3\`
         - 遇到 \`await a\` - 这里是关键点，创建了一个自引用的等待
      
      此阶段输出：\`2\`, \`Promise {<pending>}\`, \`3\`
      
      #### 3. 死锁情况分析
      
      代码在 \`await a\` 处形成了一个死锁：
      
      - Promise \`a\` 正在等待自身解决
      - 但 \`a\` 只有在 async 函数执行完毕后才能解决
      - async 函数因为 \`await a\` 被阻塞，永远无法执行到 \`resolve(true)\` 语句
      - 因此，\`a\` 永远不会解决，代码不会打印 \`4\`
      
      这是一个典型的"循环等待"问题，类似于操作系统中的死锁。
      
      ### 关键知识点
      
      1. **Promise 自引用**：在 Promise 的执行器或处理器中自引用当前 Promise 可能导致死锁。
      
      2. **async/await 执行顺序**：
         - \`await\` 表达式会暂停当前 async 函数的执行
         - 函数执行权交回给调用环境（事件循环）
         - 等待 Promise 解决后，async 函数从暂停点恢复执行
      
      3. **Promise 状态变更时机**：
         - Promise 只有在其执行器调用 resolve/reject 后才会变更状态
         - async 函数返回的 Promise 在函数完全执行完毕后才会解决
      
      4. **事件循环处理优先级**：
         - 同步代码
         - 微任务（Promise 回调）
         - 宏任务（setTimeout 等）
      
      ### 修正代码的方法
      
      要修复这个死锁问题，可以避免 Promise 自引用：
      
      \`\`\`javascript
      let a;
      let b = new Promise((resolve) => {
        console.log(1);
        setTimeout(() => {
          resolve();
        }, 1000);
      }).then(() => {
        console.log(2);
      })
      
      a = new Promise(async (resolve) => {
        console.log(a);
        await b;
        console.log(a);
        console.log(3);
        // 移除 await a
        resolve(true);
        console.log(4);
      });
      
      console.log(5);
      \`\`\`
      
      修改后的输出：\`1\`, \`undefined\`, \`5\`, \`2\`, \`Promise {<pending>}\`, \`3\`, \`4\`
      
      ### 实用教训
      
      1. **避免循环引用**：设计异步代码时，避免让 Promise 直接或间接地等待自身
      
      2. **理解 Promise 状态**：Promise 只能从 pending 变为 fulfilled 或 rejected，且状态变更是不可逆的
      
      3. **合理安排依赖关系**：确保异步操作之间的依赖关系不会形成循环
      
      4. **调试技巧**：在复杂异步代码中，可以通过打印 Promise 状态来追踪执行流程
      
      ### 总结
      
      这个例子展示了 JavaScript 异步编程中的一个常见陷阱 - Promise 自引用导致的死锁。通过理解 Promise 的状态转换机制和事件循环的工作原理，可以避免这类问题，编写出更可靠的异步代码。`
      },
      {
        id: 59,
        title: '事件循环进阶 (4)',
        tags: ['事件循环', 'Promise', '微任务'],
        difficulty: '中等',
        code: `const promiseA = Promise.resolve('1')
      promiseA.then((res) => {
        console.log('a:', res)
      }).then((res) => {
        console.log('a:', res)
      })
      
      const promiseB = Promise.resolve('2')
      promiseB.then((res) => {
        console.log('b:', res)
      })
      promiseB.then((res) => {
        console.log('b:', res)
      })`,
        answer: `## 事件循环进阶 - Promise 处理器的不同注册方式
      
      这段代码展示了两种不同的 Promise 处理方式：链式调用与独立处理器，以及它们在微任务队列中的执行顺序。
      
      ### 执行结果
      
      输出顺序为：
      \`\`\`
      a: 1
      b: 2
      b: 2
      a: undefined
      \`\`\`
      
      ### 详细分析
      
      代码中涉及两个已解决的 Promise 和它们的处理器：
      
      #### promiseA: 使用链式处理方式
      \`\`\`javascript
      promiseA.then(...).then(...)
      \`\`\`
      
      #### promiseB: 使用多个独立处理器
      \`\`\`javascript
      promiseB.then(...)
      promiseB.then(...)
      \`\`\`
      
      #### 执行流程解析
      
      1. **初始情况**：
         - 创建 promiseA，值为 '1'
         - 创建 promiseB，值为 '2'
         - 两个 Promise 都已经是已解决状态
         
      2. **微任务处理顺序**：
         - 注册 promiseA 的第一个 then 处理器
         - 注册 promiseB 的第一个 then 处理器
         - 注册 promiseB 的第二个 then 处理器
         - 注册 promiseA 的第二个 then 处理器（但要等第一个处理器执行完毕）
      
      3. **微任务队列的处理**：
         - 执行 promiseA 的第一个 then: 打印 'a: 1'，返回 undefined
         - 执行 promiseB 的第一个 then: 打印 'b: 2'
         - 执行 promiseB 的第二个 then: 打印 'b: 2'
         - 执行 promiseA 的第二个 then: 打印 'a: undefined'（因为上一个处理器未返回值）
      
      ### 关键知识点
      
      1. **Promise 解决状态**：
         - Promise.resolve() 创建一个已解决的 Promise
         - 已解决的 Promise 的处理器会在下一个微任务周期执行
      
      2. **Promise 处理器的两种模式对比**：
      
         **链式调用**：
         - 每个 then 会返回一个新的 Promise
         - 下一个 then 是在上一个 then 的处理器完成后才会执行
         - 后续 then 的输入值取决于前一个 then 的返回值
      
         **独立处理器**：
         - 多个 then 直接附加到同一个 Promise 上
         - 它们相互独立，都会接收到原始 Promise 的解决值
         - 它们会按注册顺序在同一个微任务周期中执行
      
      3. **返回值传递**：
         - 当 then 回调没有显式返回值时，返回 undefined
         - 这会作为链式调用中下一个 then 的输入
      
      ### 实际应用示例
      
      **链式调用**适用于：
      - 需要在前一步操作完成后再执行下一步
      - 处理步骤有依赖关系
      - 数据需要经过多道转换
      
      例如：
      \`\`\`javascript
      fetchUser(userId)
        .then(user => fetchUserPosts(user.id))
        .then(posts => processPostData(posts))
      \`\`\`
      
      **独立处理器**适用于：
      - 一个结果需要被多个不相关的处理器处理
      - 处理步骤相互独立
      
      例如：
      \`\`\`javascript
      const userPromise = fetchUser(userId);
      userPromise.then(user => updateUserInterface(user));
      userPromise.then(user => logUserActivity(user));
      userPromise.then(user => cacheUserData(user));
      \`\`\`
      
      ### 总结
      
      掌握 Promise 处理器的这两种注册方式及其区别，对于理解复杂的异步流程和正确设计异步代码至关重要。记住：
      - 链式调用适合序列化的、有依赖的操作
      - 独立处理器适合并行的、无依赖的操作
      - 微任务队列的处理是按照 Promise 被解决和处理器被注册的顺序进行的`
      },
      {
        id: 60,
        title: '什么是内存泄漏',
        tags: ['内存', '性能优化'],
        difficulty: '中等',
        code: `// 1. 全局变量导致的内存泄漏
      function createGlobalVariable() {
        leakyVariable = "我会泄漏到全局"; // 缺少 var/let/const
      }
      createGlobalVariable();
      
      // 2. 闭包引用导致的内存泄漏
      function createClosureLeak() {
        const largeData = new Array(10000).fill('占用大量内存的数据');
        
        return function() {
          // 这个内部函数引用了外部的 largeData，即使不使用它
          console.log("闭包函数被调用");
          // 内部使用了 largeData 中的一小部分，但整个 largeData 都被保留
          console.log(largeData[0].substring(0, 5));
        }
      }
      const leakyFunction = createClosureLeak();
      leakyFunction(); // largeData 在调用后仍然保留在内存中
      
      // 3. 定时器未清除导致的内存泄漏
      function startLeakyTimer() {
        const data = new Array(10000).fill('大量数据');
        
        setInterval(function() {
          // 这个定时器引用了 data，导致 data 无法被垃圾回收
          console.log(data[0].substring(0, 3));
        }, 1000);
      }
      startLeakyTimer(); // 这个定时器永远不会停止
      
      // 4. DOM 引用导致的内存泄漏
      function createDOMReference() {
        const elements = [];
        
        // 存储 DOM 元素引用
        for (let i = 0; i < 10; i++) {
          const el = document.createElement('div');
          document.body.appendChild(el);
          
          // 保存对 DOM 元素的引用
          elements.push(el);
        }
        
        // 移除 DOM 元素，但保留了 JavaScript 引用
        elements.forEach(el => {
          document.body.removeChild(el);
          // 没有从 elements 数组中移除引用，导致内存泄漏
        });
        
        return elements; // 返回对已删除 DOM 元素的引用
      }
      const removedElements = createDOMReference();
      
      // 5. 事件监听器导致的内存泄漏
      function addLeakyEventListener() {
        const button = document.createElement('button');
        document.body.appendChild(button);
        
        // 定义大量数据
        const largeData = new Array(10000).fill('大量数据');
        
        // 添加事件监听但不清理
        button.addEventListener('click', function() {
          // 这个事件处理函数引用了 largeData
          console.log(largeData.length);
        });
        
        // 移除 DOM 但没有移除事件监听器
        document.body.removeChild(button);
        // button = null; // 这样也不会移除事件监听器
      }
      addLeakyEventListener();
      
      // 正确的做法:
      // button.removeEventListener('click', handler);`,
        answer: `## JavaScript 内存泄漏详解
      
      内存泄漏是指程序中已分配的内存由于某种原因未被释放，导致系统内存占用不断增长，最终可能导致程序性能下降甚至崩溃。在 JavaScript 中，即使有垃圾回收机制，仍然很容易发生内存泄漏。
      
      ### 内存泄漏的定义
      
      内存泄漏是指程序中分配的内存在使用完毕后未被正确释放，导致这部分内存一直被占用而无法被再次使用。在 JavaScript 中，当一个对象不再被程序需要但仍然被某些引用所持有，垃圾回收器就无法回收它。
      
      ### JavaScript 中常见的内存泄漏类型
      
      #### 1. 意外的全局变量
      
      当变量未使用 var、let 或 const 声明时，JavaScript 会将其添加到全局对象中（浏览器中为 window）。全局变量的生命周期与页面相同，除非主动清除，否则不会被垃圾回收。
      
      \`\`\`javascript
      function createGlobalVariable() {
        leakyVariable = "我会泄漏到全局"; // 缺少 var/let/const
      }
      \`\`\`
      
      **解决方法**：
      - 使用严格模式 ('use strict') 来防止意外创建全局变量
      - 始终使用 var、let 或 const 声明变量
      
      #### 2. 闭包导致的泄漏
      
      闭包允许内部函数访问外部函数的变量，这可能导致内存泄漏，特别是当闭包保留了对大型数据结构的引用时。
      
      \`\`\`javascript
      function createClosureLeak() {
        const largeData = new Array(10000).fill('占用大量内存的数据');
        
        return function() {
          console.log(largeData[0].substring(0, 5));
        }
      }
      \`\`\`
      
      **解决方法**：
      - 只在闭包中引用需要的特定数据，而非整个大数据结构
      - 在不再需要时，将闭包赋值为 null
      
      #### 3. 定时器和回调函数
      
      未清除的定时器和回调函数是常见的泄漏源。setInterval 和 setTimeout 的回调函数如果引用了外部变量，这些变量将一直保留在内存中。
      
      \`\`\`javascript
      function startTimer() {
        const data = new Array(10000).fill('大量数据');
        
        setInterval(function() {
          console.log(data[0]);
        }, 1000);
      }
      \`\`\`
      
      **解决方法**：
      - 使用 clearInterval 或 clearTimeout 清除不再需要的定时器
      - 确保回调函数不持有对大型对象的引用
      
      #### 4. DOM 引用
      
      当 JavaScript 代码持有对 DOM 元素的引用，即使该元素从 DOM 树中移除，由于引用依然存在，该元素占用的内存也不会被回收。
      
      \`\`\`javascript
      const elements = [];
      // 存储 DOM 元素引用
      elements.push(document.getElementById('myElement'));
      // 稍后从 DOM 中移除元素
      document.body.removeChild(document.getElementById('myElement'));
      // 但 elements 数组仍然引用着该元素
      \`\`\`
      
      **解决方法**：
      - 在移除 DOM 元素前，确保清除对它的所有 JavaScript 引用
      - 使用弱引用（WeakMap, WeakSet）存储 DOM 元素引用
      
      #### 5. 事件监听器
      
      添加事件监听器但不移除也会导致内存泄漏，特别是在单页应用中，当视图变化时未移除旧视图的事件监听器。
      
      \`\`\`javascript
      function addListener() {
        const element = document.getElementById('button');
        element.addEventListener('click', () => {
          // 事件处理逻辑
        });
        // 如果后续移除了元素但没有移除事件监听器，可能导致泄漏
      }
      \`\`\`
      
      **解决方法**：
      - 当元素不再需要时，使用 removeEventListener 移除事件监听器
      - 在单页应用中，确保在组件卸载时清理所有事件监听器
      
      ### 如何检测内存泄漏
      
      1. **Chrome DevTools**：
         - 使用 Performance 面板记录页面性能
         - 查看内存使用曲线是否持续增长
         - 使用 Memory 面板拍摄堆快照，比较不同时间点的内存占用
      
      2. **堆快照对比**：
         - 在操作前后拍摄堆快照
         - 查找增加但未减少的对象实例
      
      3. **实时监控**：
         - 使用 Performance Monitor 实时监控内存使用
         - 观察 JS 堆大小随时间变化的趋势
      
      ### 防止内存泄漏的最佳实践
      
      1. **使用严格模式**：防止意外创建全局变量
      2. **合理使用闭包**：避免在闭包中引用大型对象
      3. **清理定时器**：使用完毕的定时器要及时清除
      4. **弱引用**：使用 WeakMap 和 WeakSet 存储对象引用
      5. **移除事件监听器**：不再需要时移除事件监听器
      6. **注意 DOM 引用**：删除 DOM 元素前清除对它的 JavaScript 引用
      7. **对象解构和局部变量**：只保留需要的数据，减少内存占用
      8. **避免循环引用**：对象之间的循环引用可能导致泄漏
      
      ### 现代框架中的内存管理
      
      现代 JavaScript 框架（如 React、Vue、Angular）提供了组件生命周期钩子，可以在其中清理资源：
      
      - **React**: 在 \`componentWillUnmount\` 或 \`useEffect\` 的清理函数中移除事件监听器和定时器
      - **Vue**: 在 \`beforeDestroy\` 或 \`unmounted\` 钩子中执行清理
      - **Angular**: 使用 \`ngOnDestroy\` 生命周期钩子进行清理
      
      ### 总结
      
      内存泄漏会导致应用程序性能下降，甚至在长时间运行后崩溃。通过理解 JavaScript 垃圾回收机制和常见的内存泄漏模式，开发者可以编写更加健壮和高效的应用程序。定期检测和修复内存泄漏是保持 Web 应用性能的关键步骤。`
      },
    ]

export default questions60;