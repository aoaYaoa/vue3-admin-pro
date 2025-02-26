const questions50 = [
    {
        id: 39,
        title: "以下哪段代码运行效率更高（隐藏类）",
        tags: ["JavaScript", "性能优化", "V8引擎"],
        difficulty: "中等",
        code: `// 代码片段 A
    const obj1 = {
        a: 1
    }
    const obj2 = {
        a: 1
    }
    const obj3 = {
        a: 1
    }
    
    // 代码片段 B
    const obj1 = {
        a: 1
    }
    const obj2 = {
        b: 1
    }
    const obj3 = {
        c: 1
    }`,
        answer: `## 代码运行效率分析
    
    代码片段 A 的运行效率更高。
    
    ### 原因分析
    
    这个问题涉及到 JavaScript 引擎（尤其是 V8 引擎）内部的一个重要优化机制：**隐藏类（Hidden Class）**。
    
    ### 隐藏类（Hidden Class）
    
    V8 引擎为了加速 JavaScript 对象属性的访问，会在运行时为对象创建"隐藏类"（也称为"Shape"或"Map"）。隐藏类记录了对象的结构信息，包括属性名和属性在内存中的偏移量。
    
    #### 工作原理
    
    1. **相同结构共享隐藏类**：具有相同属性结构的对象可以共享同一个隐藏类
    2. **属性访问优化**：引擎可以通过隐藏类快速找到属性在内存中的位置，而不需要每次都进行字符串查找
    3. **内联缓存**：V8 会缓存对象的隐藏类和属性偏移量，以加速后续访问
    
    ### 两段代码的比较
    
    #### 代码片段 A
    \`\`\`javascript
    const obj1 = { a: 1 }
    const obj2 = { a: 1 }
    const obj3 = { a: 1 }
    \`\`\`
    
    这三个对象具有完全相同的结构（都只有一个属性 \`a\`），因此 V8 引擎会为它们分配**相同的隐藏类**。
    
    #### 代码片段 B
    \`\`\`javascript
    const obj1 = { a: 1 }
    const obj2 = { b: 1 }
    const obj3 = { c: 1 }
    \`\`\`
    
    这三个对象具有不同的属性名，因此 V8 引擎需要为每个对象创建**独立的隐藏类**，这增加了内存消耗和处理开销。
    
    ### 性能影响
    
    1. **内存使用**：代码片段 A 只需要创建一个隐藏类，而代码片段 B 需要创建三个隐藏类
    
    2. **内联缓存命中率**：当函数多次操作相同隐藏类的对象时，内联缓存的命中率会更高，提升性能
    
    3. **JIT优化**：V8 的即时编译器（JIT）能更有效地优化处理相同隐藏类的对象的代码
    
    ### 最佳实践
    
    基于隐藏类优化机制，在 JavaScript 中可以采取以下实践提高性能：
    
    1. **初始化所有对象属性**：尽量在构造函数中初始化所有属性，避免后续动态添加
    
    2. **保持一致的属性顺序**：属性的声明顺序也会影响隐藏类，保持一致的顺序可以提高性能
       \`\`\`javascript
       // 好的做法 - 相同顺序
       const obj1 = { a: 1, b: 2 };
       const obj2 = { a: 3, b: 4 };
       
       // 不好的做法 - 不同顺序
       const obj1 = { a: 1, b: 2 };
       const obj2 = { b: 4, a: 3 };
       \`\`\`
    
    3. **避免删除属性**：删除属性会改变对象的隐藏类
       \`\`\`javascript
       // 避免这样做
       const obj = { a: 1, b: 2 };
       delete obj.b;
       \`\`\`
    
    4. **使用类或构造函数**：使用类或构造函数创建相同结构的对象，可以充分利用隐藏类优化
    
    ### 结论
    
    代码片段 A 因为创建了结构相同的对象，能够共享隐藏类，所以在 V8 引擎等现代 JavaScript 引擎中运行效率更高。这种优化对单个对象影响很小，但在大量对象和频繁访问的场景下，性能差异会更加明显。`,
      },
      {
        id: 40,
        title: "以下哪段代码效率更高（数组 - 快速模式/字典模式）",
        tags: ["JavaScript", "数组", "性能优化"],
        difficulty: "中等",
        code: `// 代码片段 A
    const arr1 = [];
    for (let i = 0; i < 10000000; ++i) {
      arr1[i] = 1;
    }
    
    // 代码片段 B
    const arr2 = [];
    arr2[10000000 - 1] = 1;
    for (let i = 0; i < 10000000; ++i) {
      arr2[i] = 1;
    }`,
        answer: `## 数组创建效率分析
    
    代码片段 A 的运行效率更高。
    
    ### 核心结论
    
    左侧代码（代码片段 A）会使用 V8 引擎的**快速模式（Fast Mode）**数组，而右侧代码（代码片段 B）因为提前设置了最后一个元素，会使用**字典模式（Dictionary Mode）**数组。快速模式的数组在内存访问和操作上比字典模式更高效。
    
    ### V8 引擎的数组实现机制
    
    JavaScript 中的数组在 V8 引擎内部有两种主要的实现方式：
    
    #### 1. 快速模式（Fast Mode）
    
    - **特点**：用连续的内存块存储元素，类似于 C++ 数组
    - **适用情况**：元素类型相同、索引连续、长度适中的数组
    - **优势**：
      - 内存布局紧凑
      - 索引访问速度快（O(1)复杂度）
      - 适合迭代和批量操作
    
    #### 2. 字典模式（Dictionary Mode）
    
    - **特点**：使用哈希表（类似对象）存储键值对
    - **适用情况**：稀疏数组、混合类型数组、非数字索引、极大数组
    - **劣势**：
      - 内存消耗更大
      - 元素访问需要哈希计算
      - 性能整体较慢
    
    ### 代码片段分析
    
    #### 代码片段 A
    \`\`\`javascript
    const arr1 = [];
    for (let i = 0; i < 10000000; ++i) {
      arr1[i] = 1;
    }
    \`\`\`
    
    这段代码从空数组开始，**按顺序**填充元素，V8 会将其实现为快速模式数组。数组中所有元素类型相同（数字 1），且索引是连续的。
    
    #### 代码片段 B
    \`\`\`javascript
    const arr2 = [];
    arr2[10000000 - 1] = 1;  // 关键差异点
    for (let i = 0; i < 10000000; ++i) {
      arr2[i] = 1;
    }
    \`\`\`
    
    这段代码首先设置了数组的最后一个元素，**创建了一个稀疏数组**（中间有999万个空槽位），V8 会将其转换为字典模式。即使后续循环填充了所有空槽，数组仍会保持字典模式。
    
    ### 性能影响因素
    
    1. **内存分配**：
       - 快速模式：一次性分配连续内存块，随数组增长可能需要重新分配
       - 字典模式：散列表结构，占用更多内存，但扩容时有更灵活的策略
    
    2. **元素访问**：
       - 快速模式：直接通过内存偏移量访问元素，极快
       - 字典模式：需要哈希表查找，更慢
    
    3. **数组转换**：
       - 从快速模式到字典模式的转换会带来性能成本
       - 一旦数组变为字典模式，通常不会自动转回快速模式
    
    ### 实际测试结果
    
    在实际性能测试中，代码片段 A 通常比代码片段 B 快 2-5 倍，具体取决于硬件环境和引擎版本。
    
    ### 最佳实践
    
    1. **预分配数组大小**：如果知道数组大小，可以提前分配
       \`\`\`javascript
       // 更好的做法
       const arr = new Array(10000000);
       for (let i = 0; i < arr.length; ++i) {
         arr[i] = 1;
       }
       \`\`\`
    
    2. **避免创建稀疏数组**：不要跳跃索引赋值
       \`\`\`javascript
       // 避免这样
       const arr = [];
       arr[0] = 1;
       arr[10000] = 2;  // 创建稀疏数组
       \`\`\`
    
    3. **使用数组方法替代手动操作**：
       \`\`\`javascript
       // 填充已知大小的数组
       const arr = new Array(1000).fill(1);
       
       // 添加元素到数组末尾
       arr.push(value);  // 优于 arr[arr.length] = value
       \`\`\`
    
    4. **保持数组元素类型一致**：混合类型会降低性能
       \`\`\`javascript
       // 避免这样
       const arr = [1, 2, 3];
       arr.push("string");  // 混合类型可能导致降级为字典模式
       \`\`\`
    
    ### 其他影响数组性能的因素
    
    1. **数组长度**：极长数组（超过一定阈值）会自动使用字典模式
    2. **元素类型**：单一类型的数组（如全是整数）性能最佳
    3. **索引类型**：使用非整数作为索引会转换为字典模式
    4. **数组操作**：在数组开头添加/删除元素（shift/unshift）比在末尾操作（push/pop）代价更高
    
    ### 结论
    
    在处理大型数组时，应避免创建稀疏数组，尽量保持元素类型一致，并按顺序操作数组元素，以充分利用 V8 引擎的快速模式优化。代码片段 A 展示了更高效的数组填充方式，因为它能让数组保持在快速模式下。`,
      },
      {
        id: 41,
        title: "如何判断 object 为空",
        tags: ["对象", "判断"],
        difficulty: "简单",
        code: `// 方法一：使用 Object.keys()
    function isEmpty1(obj) {
      return Object.keys(obj).length === 0;
    }
    
    // 方法二：使用 JSON.stringify()
    function isEmpty2(obj) {
      return JSON.stringify(obj) === '{}';
    }
    
    // 方法三：使用 for...in 循环
    function isEmpty3(obj) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          return false;
        }
      }
      return true;
    }
    
    // 方法四：使用 Object.entries() (ES8)
    function isEmpty4(obj) {
      return Object.entries(obj).length === 0;
    }
    
    // 测试
    const emptyObj = {};
    const nonEmptyObj = { key: 'value' };
    
    console.log(isEmpty1(emptyObj));      // true
    console.log(isEmpty1(nonEmptyObj));   // false
    
    // 注意：处理边界情况
    console.log(isEmpty1(null));          // TypeError
    console.log(isEmpty1(undefined));     // TypeError
    
    // 改进的版本，处理边界情况
    function isEmptySafe(obj) {
      if (obj === null || obj === undefined) {
        return true;
      }
      return Object.keys(obj).length === 0;
    }`,
        answer: `## 判断 JavaScript 对象是否为空
    
    在 JavaScript 中判断一个对象是否为空（即不包含任何属性），有多种方法，每种方法各有优缺点。
    
    ### 方法一：使用 \`Object.keys()\` 来获取对象的所有键，然后检查数组长度是否为 0。
    
    \`\`\`javascript
    function isEmpty(obj) {
      return Object.keys(obj).length === 0;
    }
    \`\`\`
    
    **优点**：
    - 简洁明了
    - 性能较好
    - ES5 标准方法，兼容性好
    
    **缺点**：
    - 如果传入 \`null\` 或 \`undefined\` 会抛出 TypeError
    
    ### 方法二：使用 JSON.stringify()
    
    \`\`\`javascript
    function isEmpty(obj) {
      return JSON.stringify(obj) === '{}';
    }
    \`\`\`
    
    **优点**：
    - 代码简单
    
    **缺点**：
    - 性能较差（需要完整序列化对象）
    - 对于包含特殊值（如函数、undefined）的对象处理不正确
    - 如果传入 \`null\` 会返回 "null" 而不是 "{}"
    
    ### 方法三：使用 for...in 循环
    
    \`\`\`javascript
    function isEmpty(obj) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          return false;
        }
      }
      return true;
    }
    \`\`\`
    
    **优点**：
    - 可以排除原型链上的属性（通过 hasOwnProperty）
    - 在某些旧环境中可能是唯一选择
    
    **缺点**：
    - 代码较长
    - 需要 hasOwnProperty 检查
    - 如果传入 \`null\` 或 \`undefined\` 会抛出 TypeError
    
    ### 方法四：使用 Object.entries() 或 Object.values()
    
    \`\`\`javascript
    function isEmpty(obj) {
      return Object.entries(obj).length === 0;
      // 或者
      // return Object.values(obj).length === 0;
    }
    \`\`\`
    
    **优点**：
    - 语义清晰
    - 与 Object.keys() 性能相近
    
    **缺点**：
    - ES2017 (ES8) 引入，对旧浏览器兼容性较差
    - 对 null/undefined 会抛出错误
    
    ### 处理边界情况
    
    在实际应用中，需要处理 \`null\` 和 \`undefined\` 等边界情况：
    
    \`\`\`javascript
    function isEmpty(obj) {
      // 检查 null 和 undefined
      if (obj == null) {
        return true;
      }
      
      return Object.keys(obj).length === 0;
    }
    \`\`\`
    
    ### 更完整的实现
    
    考虑所有边界情况的完整实现：
    
    \`\`\`javascript
    function isEmpty(value) {
      // null 和 undefined 视为空
      if (value == null) {
        return true;
      }
      
      // 非对象类型视为非空
      if (typeof value !== 'object') {
        return false;
      }
      
      // 数组通过长度判断
      if (Array.isArray(value)) {
        return value.length === 0;
      }
      
      // 普通对象通过键判断
      return Object.keys(value).length === 0;
    }
    \`\`\`
    
    ### 性能考虑
    
    在大多数情况下，\`Object.keys(obj).length === 0\` 是最推荐的方式，因为它简洁且性能良好。但对于超大对象，for...in 循环可能更高效，因为它可以在找到第一个属性时立即返回。
    
    ### 实际应用示例
    
    \`\`\`javascript
    // 表单验证
    function validateForm(formData) {
      if (isEmpty(formData)) {
        return '表单不能为空';
      }
      // 继续其他验证...
    }
    
    // API 请求处理
    function processApiResponse(response) {
      if (isEmpty(response.data)) {
        return '未获取到数据';
      }
      // 处理数据...
    }
    \`\`\`
    
    ### 总结
    
    判断对象是否为空的最佳实践：
    1. 一般情况使用 \`Object.keys(obj).length === 0\`
    2. 需要处理 null/undefined 等边界情况
    3. 考虑使用适合项目环境的方法（兼容性要求）
    4. 对于特定需求，可能需要自定义判断逻辑`,
      },
      {
        id: 43,
        title: "== 和 === 的区别",
        tags: ["比较", "运算符"],
        difficulty: "简单",
        code: `// 相等运算符(==)：比较值，会进行类型转换
    console.log(5 == '5');          // true
    console.log(true == 1);         // true
    console.log(null == undefined); // true
    console.log(0 == false);        // true
    console.log('' == false);       // true
    console.log([] == false);       // true
    console.log({} == '[object Object]'); // true
    
    // 严格相等运算符(===)：比较值和类型，不进行类型转换
    console.log(5 === '5');          // false
    console.log(true === 1);         // false
    console.log(null === undefined); // false
    console.log(0 === false);        // false
    console.log('' === false);       // false
    console.log([] === false);       // false
    console.log({} === '[object Object]'); // false
    
    // 复杂类型的比较（引用比较）
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 3];
    const arr3 = arr1;
    
    console.log(arr1 == arr2);   // false（不同引用）
    console.log(arr1 === arr2);  // false（不同引用）
    console.log(arr1 == arr3);   // true（相同引用）
    console.log(arr1 === arr3);  // true（相同引用）`,
        answer: `## == 和 === 的区别
    
    JavaScript 提供了两种主要的相等比较操作符：\`==\` (相等) 和 \`===\` (严格相等)。理解它们之间的区别对于编写可靠的代码至关重要。
    
    ### 1. 基本区别
    
    - **\`==\` (相等/宽松相等)**：
      - 比较值，会在比较前进行类型转换
      - 也称为"抽象相等比较"或"宽松相等"
    
    - **\`===\` (严格相等)**：
      - 比较值和类型，不进行类型转换
      - 也称为"严格相等比较"
    
    ### 2. 类型转换规则（== 操作符）
    
    当使用 \`==\` 比较不同类型的值时，JavaScript 会按照以下规则进行类型转换：
    
    1. **如果一个操作数是布尔值**，会将布尔值转换为数值（true 转为 1，false 转为 0）
    2. **如果一个操作数是字符串，另一个是数值**，会将字符串转换为数值
    3. **如果一个操作数是对象，另一个不是**，会调用对象的 valueOf() 或 toString() 方法转换为原始值
    4. **null 和 undefined 相等**（\`null == undefined\` 返回 true）
    5. **NaN 与任何值都不相等**，包括它自己（\`NaN == NaN\` 返回 false）
    
    ### 3. 详细比较示例
    
    #### 数字与字符串比较
    
    \`\`\`javascript
    5 == '5'    // true (字符串 '5' 转换为数字 5)
    5 === '5'   // false (类型不同)
    
    0 == ''     // true (空字符串转换为数字 0)
    0 === ''    // false (类型不同)
    \`\`\`
    
    #### 布尔值比较
    
    \`\`\`javascript
    true == 1    // true (true 转换为数字 1)
    true === 1   // false (类型不同)
    
    false == 0   // true (false 转换为数字 0)
    false === 0  // false (类型不同)
    
    false == ''  // true (两者都转换为数字 0)
    false === '' // false (类型不同)
    \`\`\`
    
    #### null 和 undefined 比较
    
    \`\`\`javascript
    null == undefined  // true (特殊规则)
    null === undefined // false (类型不同)
    
    null == 0          // false (没有转换)
    null === 0         // false (类型不同)
    
    undefined == 0     // false (没有转换)
    undefined === 0    // false (类型不同)
    \`\`\`
    
    #### 对象比较
    
    \`\`\`javascript
    // 对象与原始值比较
    [1, 2] == '1,2'  // true (数组转换为字符串后比较)
    [1, 2] === '1,2' // false (类型不同)
    
    // 对象之间比较（引用比较）
    const a = {}
    const b = {}
    a == b   // false (不同引用)
    a === b  // false (不同引用)
    
    const c = a
    a == c   // true (相同引用)
    a === c  // true (相同引用)
    \`\`\`
    
    ### 4. 奇怪的案例
    
    \`\`\`javascript
    // 一些容易令人困惑的例子
    [] == ''         // true ([] 转换为 '')
    [] == 0          // true ([] 转换为 '' 再转换为 0)
    [0] == 0         // true ([0] 转换为 '0' 再转换为 0)
    [1] == 1         // true ([1] 转换为 '1' 再转换为 1)
    ['0'] == false   // true (两者都转换为数字 0)
    \`\`\`
    
    ### 5. 最佳实践
    
    1. **优先使用 === 运算符**：几乎在所有情况下，都应该使用严格相等运算符（===）以避免意外的类型转换
       
    2. **特殊情况使用 ==**：只在确实需要考虑不同类型的相等性时使用，例如检查变量是否为 null 或 undefined：
       \`\`\`javascript
       if (value == null) {
         // 等价于 value === null || value === undefined
       }
       \`\`\`
    
    3. **对象比较注意事项**：
       - 使用 === 或 == 比较对象时，都是比较引用而非内容
       - 如果需要比较对象内容，考虑使用 JSON.stringify 或专门的深度比较库
       - 数组可以使用 JSON.stringify 或 Array.every 进行内容比较
    
    ### 6. 总结
    
    1. **\`==\` 相等运算符**：
       - 会进行类型转换
       - 使用复杂的转换规则
       - 可能导致意外结果
       - 适用场景有限
    
    2. **\`===\` 严格相等运算符**：
       - 不进行类型转换
       - 只有类型和值都相同时返回 true
       - 结果更可预测
       - 推荐在大多数情况下使用
    
    在现代 JavaScript 开发中，除非有特殊需求，否则应始终使用 \`===\` 严格相等运算符，以避免因隐式类型转换带来的意外问题。`,
      },
      {
        id: 44,
        title: "javascript 的数据类型有哪些",
        tags: ["基础", "数据类型"],
        difficulty: "简单",
        code: `// 原始数据类型
    let str = "Hello";            // 字符串 String
    let num = 42;                 // 数字 Number
    let bigInt = 9007199254740991n; // BigInt (ES2020)
    let bool = true;              // 布尔值 Boolean
    let undef = undefined;        // Undefined
    let n = null;                 // Null
    let sym = Symbol("id");       // Symbol (ES6)
    
    // 引用数据类型
    let obj = { name: "Alice" };  // 对象 Object
    let arr = [1, 2, 3];          // 数组 Array（特殊的对象）
    let func = function() {};     // 函数 Function（特殊的对象）
    let date = new Date();        // Date 对象
    let regExp = /\\d+/;           // 正则表达式对象
    let map = new Map();          // Map 对象 (ES6)
    let set = new Set();          // Set 对象 (ES6)
    let weakMap = new WeakMap();  // WeakMap 对象 (ES6)
    let weakSet = new WeakSet();  // WeakSet 对象 (ES6)
    
    // 类型检查
    console.log(typeof str);      // "string"
    console.log(typeof num);      // "number"
    console.log(typeof bigInt);   // "bigint"
    console.log(typeof bool);     // "boolean"
    console.log(typeof undef);    // "undefined"
    console.log(typeof n);        // "object" (历史遗留问题)
    console.log(typeof sym);      // "symbol"
    console.log(typeof obj);      // "object"
    console.log(typeof arr);      // "object"
    console.log(typeof func);     // "function"
    
    // 特殊值
    console.log(Number.NaN);      // NaN (Not a Number)
    console.log(Infinity);        // 无穷大
    console.log(-Infinity);       // 负无穷大`,
        answer: `## JavaScript 的数据类型
    
    JavaScript 是一种弱类型、动态类型的编程语言，它的数据类型可以分为两大类：**原始类型(Primitive Types)** 和 **引用类型(Reference Types)**。
    
    ### 1. 原始数据类型 (Primitive Types)
    
    原始类型是不可变的简单数据，直接存储在变量分配的内存中。JavaScript 有 7 种原始数据类型：
    
    #### 1) String（字符串）
    表示文本数据。
    \`\`\`javascript
    let name = "JavaScript";
    let message = 'Hello, World!';
    let template = \`Value: \${name}\`; // 模板字符串 (ES6)
    \`\`\`
    
    #### 2) Number（数字）
    表示整数和浮点数。
    \`\`\`javascript
    let integer = 42;
    let float = 3.14;
    let scientific = 2.5e5; // 250000
    let binary = 0b1010; // 10
    let octal = 0o744; // 484
    let hex = 0xFF; // 255
    let special = Infinity; // 无穷大
    let notANumber = NaN; // 非数值
    \`\`\`
    
    #### 3) BigInt（大整数，ES2020引入）
    表示任意精度的整数。
    \`\`\`javascript
    let bigNumber = 9007199254740991n; // 数字后加 n
    let anotherBigNumber = BigInt("9007199254740991");
    \`\`\`
    
    #### 4) Boolean（布尔值）
    表示逻辑值：true 或 false。
    \`\`\`javascript
    let isActive = true;
    let isLoggedIn = false;
    \`\`\`
    
    #### 5) Undefined（未定义）
    表示变量已声明但未赋值。
    \`\`\`javascript
    let notDefined;
    console.log(notDefined); // undefined
    \`\`\`
    
    #### 6) Null（空值）
    表示一个空对象指针或不存在的对象。
    \`\`\`javascript
    let empty = null;
    \`\`\`
    
    #### 7) Symbol（符号，ES6引入）
    表示唯一且不可变的值，主要用于对象属性的标识符。
    \`\`\`javascript
    let id = Symbol("id");
    let user = {
      [id]: 42
    };
    \`\`\`
    
    ### 2. 引用数据类型 (Reference Types)
    
    引用类型是存储在堆内存中的对象，变量实际上只存储了对象在内存中的地址（引用）。所有不属于原始类型的值都是引用类型：
    
    #### 1) Object（对象）
    基础的引用类型，其他所有引用类型都基于 Object。
    \`\`\`javascript
    let person = {
      name: "Alice",
      age: 30,
      greet: function() { return "Hello"; }
    };
    \`\`\`
    
    #### 2) Array（数组）
    有序集合，是特殊的对象类型。
    \`\`\`javascript
    let fruits = ["apple", "banana", "orange"];
    let mixed = [1, "two", { three: 3 }];
    \`\`\`
    
    #### 3) Function（函数）
    可执行代码的对象。
    \`\`\`javascript
    function add(a, b) { return a + b; }
    let multiply = function(a, b) { return a * b; };
    let divide = (a, b) => a / b; // 箭头函数 (ES6)
    \`\`\`
    
    #### 4) Date（日期）
    日期和时间的对象表示。
    \`\`\`javascript
    let now = new Date();
    let specificDate = new Date("2023-01-01");
    \`\`\`
    
    #### 5) RegExp（正则表达式）
    文本模式匹配的对象。
    \`\`\`javascript
    let pattern = /\\d+/g;
    let emailPattern = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
    \`\`\`
    
    #### 6) Map 和 WeakMap（ES6引入）
    键值对集合，允许任何类型的键。
    \`\`\`javascript
    let map = new Map();
    map.set("key", "value");
    map.set(42, "number key");
    map.set({}, "object key");
    
    let weakMap = new WeakMap(); // 弱引用的Map
    \`\`\`
    
    #### 7) Set 和 WeakSet（ES6引入）
    唯一值的集合。
    \`\`\`javascript
    let set = new Set();
    set.add(1);
    set.add("two");
    set.add({ three: 3 });
    
    let weakSet = new WeakSet(); // 弱引用的Set
    \`\`\`
    
    #### 8) 类型化数组（ES6标准化）
    处理二进制数据的数组。
    \`\`\`javascript
    let int8Array = new Int8Array(4);
    let uint8Array = new Uint8Array(4);
    let float32Array = new Float32Array(4);
    \`\`\`
    
    #### 9) Promise（ES6引入）
    异步操作的最终完成或失败的表示。
    \`\`\`javascript
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("完成"), 1000);
    });
    \`\`\`
    
    ### 3. 类型检测
    
    JavaScript 提供了几种检测数据类型的方法：
    
    #### 1) typeof 操作符
    \`\`\`javascript
    typeof "hello"      // "string"
    typeof 42           // "number"
    typeof true         // "boolean"
    typeof undefined    // "undefined"
    typeof Symbol()     // "symbol"
    typeof 42n          // "bigint"
    typeof {}           // "object"
    typeof []           // "object" (数组被视为对象)
    typeof null         // "object" (历史遗留问题)
    typeof function(){} // "function"
    \`\`\`
    
    #### 2) instanceof 操作符
    检测对象是否为特定构造函数的实例。
    \`\`\`javascript
    [] instanceof Array           // true
    new Date() instanceof Date    // true
    /regex/ instanceof RegExp     // true
    \`\`\`
    
    #### 3) Object.prototype.toString.call()
    最准确的类型检测方法。
    \`\`\`javascript
    Object.prototype.toString.call("")      // "[object String]"
    Object.prototype.toString.call(42)      // "[object Number]"
    Object.prototype.toString.call([])      // "[object Array]"
    Object.prototype.toString.call({})      // "[object Object]"
    Object.prototype.toString.call(null)    // "[object Null]"
    \`\`\`
    
    ### 4. 数据类型的特点
    
    1. **原始类型**：
       - 不可变（immutable）
       - 按值传递
       - 直接存储在栈内存中
    
    2. **引用类型**：
       - 可变（mutable）
       - 按引用传递
       - 存储在堆内存中，栈内存存储引用
    
    ### 5. 类型转换
    
    JavaScript 允许类型之间的转换，可以是显式的也可以是隐式的：
    
    \`\`\`javascript
    // 显式转换
    String(42)          // "42"
    Number("42")        // 42
    Boolean(1)          // true
    
    // 隐式转换
    "42" + 1            // "421" (字符串连接)
    "42" - 1            // 41 (数字减法)
    if ("hello") {}     // 条件表达式中的字符串转为布尔值 true
    \`\`\`
    
    ### 总结
    
    1. JavaScript 有 7 种原始数据类型：String、Number、BigInt、Boolean、Undefined、Null 和 Symbol
    2. 所有非原始类型都是引用类型，包括 Object、Array、Function 等
    3. 原始类型按值存储和传递，引用类型按引用存储和传递
    4. JavaScript 提供了多种类型检测方法，每种方法有其适用场景
    5. 理解数据类型对于编写健壮的 JavaScript 代码至关重要`,
      },
      {
        id: 45,
        title: "javascript 变量在内存中的具体存储形式",
        tags: ["内存", "变量"],
        difficulty: "中等",
        code: `// 原始类型 - 存储在栈内存中
    let num = 42;         // 栈内存: { num: 42 }
    let str = "hello";    // 栈内存: { str: "hello" }
    let bool = true;      // 栈内存: { bool: true }
    
    // 引用类型 - 引用存储在栈内存，值存储在堆内存
    let obj = { name: "Alice", age: 30 };
    // 栈内存: { obj: <地址0x1234> }
    // 堆内存 0x1234: { name: "Alice", age: 30 }
    
    let arr = [1, 2, 3];
    // 栈内存: { arr: <地址0x5678> }
    // 堆内存 0x5678: [1, 2, 3]
    
    // 变量赋值 - 原始类型复制值，引用类型复制引用
    let num2 = num;     // 栈内存: { num: 42, num2: 42 }
    let obj2 = obj;     // 栈内存: { obj: <0x1234>, obj2: <0x1234> }
    
    // 修改值
    num2 = 100;         // 栈内存: { num: 42, num2: 100 }
    obj2.name = "Bob";  // 堆内存 0x1234: { name: "Bob", age: 30 }
    // obj 和 obj2 都指向同一个堆内存的对象
    
    // 函数参数传递
    function updateValues(primitive, reference) {
      primitive = 200;           // 修改形参不影响实参
      reference.value = "new";   // 修改引用对象的属性会影响原对象
    }
    
    let x = 50;
    let y = { value: "old" };
    
    updateValues(x, y);
    // x 仍为 50
    // y.value 变为 "new"`,
        answer: `## JavaScript 变量在内存中的存储形式
    
    JavaScript 中的变量在内存中的存储方式取决于数据类型。JavaScript 的内存模型主要分为**栈内存（Stack）**和**堆内存（Heap）**两部分。
    
    ### 1. 内存模型概述
    
    #### 栈内存（Stack）
    - 存储原始数据类型（Primitive types）的值
    - 静态分配，大小固定
    - 按值访问，操作速度快
    - 遵循后进先出（LIFO）原则
    - 变量作用域结束会自动释放
    
    #### 堆内存（Heap）
    - 存储引用数据类型（Reference types）的值
    - 动态分配，大小不固定
    - 按引用访问，需要额外的查找步骤
    - 不会随作用域结束而自动释放，需要垃圾回收
    
    ### 2. 原始类型的存储
    
    JavaScript 的原始类型（String、Number、Boolean、undefined、null、Symbol 和 BigInt）直接存储在栈内存中。
    
    \`\`\`javascript
    let age = 30;
    let name = "Alice";
    let isActive = true;
    \`\`\`
    
    在内存中的表示：
    \`\`\`
    栈内存:
    +------------+-------+
    | 变量       | 值    |
    +------------+-------+
    | age        | 30    |
    | name       | "Alice"|
    | isActive   | true  |
    +------------+-------+
    \`\`\`
    
    当对原始类型变量进行赋值操作时，会创建一个新的值副本：
    
    \`\`\`javascript
    let x = 10;
    let y = x;  // y 获得 x 值的副本
    x = 20;     // 修改 x 不会影响 y
    console.log(y);  // 仍然是 10
    \`\`\`
    
    ### 3. 引用类型的存储
    
    JavaScript 的引用类型（Object、Array、Function 等）的实际数据存储在堆内存中，而变量本身只存储了一个指向堆内存中实际数据的引用（内存地址）。
    
    \`\`\`javascript
    let person = {
      name: "Bob",
      age: 25
    };
    
    let numbers = [1, 2, 3];
    \`\`\`
    
    在内存中的表示：
    \`\`\`
    栈内存:                        堆内存:
    +------------+---------+      地址0x001:
    | 变量       | 引用    |      +--------+--------+
    | person     | 0x001   |----> | name   | "Bob"  |
    | numbers    | 0x002   |      +--------+--------+
    +------------+---------+      
                                  地址0x002:
                                  +--------+--------+
                                  | 0      | 1      |
                                  | 1      | 2      |
                                  | 2      | 3      |
                                  +--------+--------+
    \`\`\`
    
    当对引用类型变量进行赋值操作时，只会复制引用（内存地址），而不是复制实际数据：
    
    \`\`\`javascript
    let obj1 = { value: 10 };
    let obj2 = obj1;  // obj2 引用与 obj1 相同的对象
    obj1.value = 20;  // 修改 obj1 也会影响 obj2
    console.log(obj2.value);  // 20
    \`\`\`
    
    ### 4. 比较不同类型的存储差异
    
    | 特性               | 原始类型                   | 引用类型                   |
    |--------------------|----------------------------|----------------------------|
    | 存储位置           | 栈内存                     | 堆内存 (栈中存储引用)      |
    | 大小               | 固定大小                   | 可变大小                   |
    | 访问速度           | 快                         | 相对较慢                   |
    | 复制行为           | 创建新的独立副本           | 复制引用，指向相同数据     |
    | 比较行为           | 比较值                     | 比较引用地址               |
    | 内存管理           | 作用域结束自动释放         | 需要垃圾回收              |
    
    ### 5. 函数参数传递机制
    
    JavaScript 中函数参数的传递都是**按值传递**的，但对于引用类型，传递的值是引用：
    
    \`\`\`javascript
    function changeValue(num, obj) {
      num = 1000;           // 只影响局部变量
      obj.value = 1000;     // 修改了引用指向的对象
    }
    
    let number = 1;
    let object = { value: 1 };
    changeValue(number, object);
    console.log(number);     // 1 (不变)
    console.log(object.value); // 1000 (被改变)
    \`\`\`
    
    ### 6. 垃圾回收
    
    JavaScript 引擎会自动进行垃圾回收，释放不再被引用的对象所占用的内存。主要有两种垃圾回收策略：
    
    1. **标记-清除（Mark-and-Sweep）**：标记所有可访问的对象，然后清除未标记的对象
    2. **引用计数（Reference Counting）**：跟踪每个对象的引用数，当引用数为0时释放内存
    
    \`\`\`javascript
    let obj = { data: "some data" };
    obj = null;  // 原对象不再被引用，可被垃圾回收
    \`\`\`
    
    ### 7. 内存优化技巧
    
    1. **避免内存泄漏**：
       - 注意闭包导致的意外引用
       - 及时解除不再需要的引用（设为 null）
       - 避免循环引用
    
    2. **减少对象创建**：
       - 对象池化
       - 对象缓存
    
    3. **使用适当的数据结构**：
       - 大型数据集可考虑 TypedArray
       - 使用 WeakMap/WeakSet 允许键被垃圾回收
    
    ### 总结
    
    1. **栈内存**：存储原始数据类型的值和引用类型的引用地址
    2. **堆内存**：存储引用类型的实际数据
    3. **原始类型**：直接存储在栈内存中
    4. **引用类型**：存储在堆内存中，变量存储的是对内存位置的引用
    5. **函数参数传递**：原始类型按值传递，引用类型按引用传递
    6. **垃圾回收**：JavaScript 引擎会自动回收不再使用的内存
    
    理解 JavaScript 变量在内存中的存储形式有助于编写更高效、更可靠的代码，特别是在处理复杂数据结构和大型应用时。`,
      },
      {
        id: 46,
        title: "JS 单线程设计的目的",
        tags: ["基础", "单线程"],
        difficulty: "中等",
        code: `// 单线程 JavaScript 的执行示例
    console.log("1. 开始执行");
    
    // 定时器示例 - 异步任务
    setTimeout(() => {
      console.log("4. 定时器回调执行"); 
    }, 0);
    
    // Promise 示例 - 微任务
    Promise.resolve().then(() => {
      console.log("3. Promise 回调执行");
    });
    
    // 模拟阻塞操作
    function blockFor1Second() {
      const start = Date.now();
      while(Date.now() - start < 1000) {
        // 阻塞主线程约1秒
      }
    }
    
    console.log("2. 同步代码继续执行");
    blockFor1Second();
    console.log("5. 阻塞操作结束");
    
    // 输出顺序:
    // 1. 开始执行
    // 2. 同步代码继续执行 
    // 3. Promise 回调执行 (微任务)
    // 5. 阻塞操作结束
    // 4. 定时器回调执行 (宏任务)
    
    // Web Worker 示例 - 在单独线程中执行代码
    if (typeof Worker !== "undefined") {
      // 创建 Worker
      const worker = new Worker("worker.js");
      
      // 接收 Worker 消息
      worker.onmessage = function(e) {
        console.log("从 Worker 接收的消息:", e.data);
      };
      
      // 发送消息给 Worker
      worker.postMessage("开始计算");
    }`,
        answer: `## JavaScript 单线程设计的目的
    
    JavaScript 最初被设计为单线程语言，这是一个有意为之的设计决策，而非技术限制。了解这一设计背后的原因有助于我们更好地理解 JavaScript 的执行模型。
    
    ### 1. 为什么 JavaScript 是单线程的？
    
    JavaScript 最初被设计为浏览器脚本语言，主要用于处理网页交互。设计为单线程的主要原因包括：
    
    #### 1.1 简化 DOM 操作
    
    最主要的原因是**避免 DOM 操作的复杂性**。如果 JavaScript 是多线程的，那么多个线程同时操作 DOM 可能导致：
    - 竞态条件（race conditions）
    - 死锁（deadlocks）
    - 资源争用（resource contention）
    - UI 渲染不一致
    
    想象两个线程同时试图修改同一 DOM 元素：一个添加子元素，另一个删除该元素。这会导致难以预测的结果和复杂的同步问题。
    
    #### 1.2 降低复杂度
    
    单线程模型显著降低了语言的复杂度：
    - 不需要线程锁、互斥量或其他同步原语
    - 开发者不必考虑线程安全问题
    - 简化了内存模型和垃圾回收
    - 使 JavaScript 更易于学习和使用
    
    #### 1.3 适合网页交互模型
    
    早期网页交互相对简单，单线程模型完全能够满足需求：
    - 网页交互本质上是事件驱动的
    - 大多数操作都是短暂的响应用户操作
    - 网页不需要像桌面应用那样处理复杂的并行任务
    
    ### 2. JavaScript 的执行模型
    
    尽管 JavaScript 是单线程的，但它采用了事件循环（Event Loop）机制来处理异步操作，使其能够非阻塞地执行代码。
    
    #### 2.1 事件循环
    
    JavaScript 运行时（如浏览器或 Node.js）实现了事件循环机制，主要包括：
    
    1. **调用栈（Call Stack）**：执行同步代码
    2. **任务队列（Task Queue）**：存储待执行的回调函数
       - **宏任务（Macrotasks）**：setTimeout, setInterval, I/O, UI 渲染等
       - **微任务（Microtasks）**：Promise, MutationObserver, process.nextTick（Node.js）等
    3. **事件循环（Event Loop）**：不断检查调用栈是否为空，如果为空则执行任务队列中的任务
    
    执行顺序：
    1. 执行当前调用栈中的同步代码
    2. 调用栈清空后，执行所有微任务
    3. 执行一个宏任务，然后重复步骤1
    
    \`\`\`javascript
    console.log("1"); // 同步代码
    
    setTimeout(() => {
      console.log("4"); // 宏任务
    }, 0);
    
    Promise.resolve().then(() => {
      console.log("3"); // 微任务
    });
    
    console.log("2"); // 同步代码
    
    // 输出顺序: 1, 2, 3, 4
    \`\`\`
    
    #### 2.2 非阻塞 I/O
    
    JavaScript 通过回调函数实现非阻塞 I/O：
    - 发起 I/O 操作（如网络请求）时不会阻塞主线程
    - 操作完成后，回调函数被添加到任务队列
    - 当调用栈为空时，事件循环将回调函数移到调用栈执行
    
    ### 3. 单线程设计的优势
    
    #### 3.1 简化的编程模型
    - 不需要处理线程同步和互斥
    - 没有死锁和竞态条件
    - 代码执行顺序更可预测
    - 更容易调试和推理
    
    #### 3.2 DOM 操作的安全性
    - 确保 DOM 操作的一致性
    - 避免 UI 渲染冲突
    - 简化了浏览器引擎的实现
    
    #### 3.3 内存效率
    - 没有线程切换开销
    - 不需要为每个线程分配栈空间
    - 简化了垃圾回收过程
    
    ### 4. 单线程设计的挑战
    
    #### 4.1 CPU 密集型任务
    单线程意味着 CPU 密集型计算会阻塞主线程，导致：
    - UI 冻结（在浏览器中）
    - 响应延迟
    - 用户体验下降
    
    \`\`\`javascript
    // 这样的计算会阻塞主线程
    function computeHeavyTask() {
      for (let i = 0; i < 10000000000; i++) {
        // 大量计算...
      }
    }
    \`\`\`
    
    #### 4.2 回调地狱
    异步操作依赖回调函数，可能导致"回调地狱"（Callback Hell）：
    
    \`\`\`javascript
    getData(function(a) {
      getMoreData(a, function(b) {
        getEvenMoreData(b, function(c) {
          getTheFinalData(c, function(d) {
            // 回调嵌套过深，代码难以维护
          });
        });
      });
    });
    \`\`\`
    
    ### 5. 现代解决方案
    
    为了克服单线程的限制，JavaScript 生态系统引入了多种解决方案：
    
    #### 5.1 Promise 和 Async/Await
    提供更优雅的异步编程模式：
    
    \`\`\`javascript
    // 使用 Promise 链
    getData()
      .then(a => getMoreData(a))
      .then(b => getEvenMoreData(b))
      .then(c => getTheFinalData(c))
      .then(d => console.log(d))
      .catch(error => console.error(error));
    
    // 使用 async/await
    async function processData() {
      try {
        const a = await getData();
        const b = await getMoreData(a);
        const c = await getEvenMoreData(b);
        const d = await getTheFinalData(c);
        console.log(d);
      } catch (error) {
        console.error(error);
      }
    }
    \`\`\`
    
    #### 5.2 Web Workers
    允许在后台线程执行 JavaScript 代码，不阻塞主线程：
    
    \`\`\`javascript
    // main.js
    const worker = new Worker('worker.js');
    worker.onmessage = function(e) {
      console.log('Worker result:', e.data);
    };
    worker.postMessage({data: 'Start computation'});
    
    // worker.js
    self.onmessage = function(e) {
      // 执行耗时计算
      const result = heavyComputation(e.data);
      self.postMessage(result);
    };
    \`\`\`
    
    Web Workers 的特点：
    - 在独立线程中运行
    - 不能直接访问 DOM
    - 通过消息传递与主线程通信
    - 适合 CPU 密集型任务
    
    #### 5.3 服务工作线程 (Service Workers)
    提供高级功能，如离线缓存、后台同步和推送通知：
    
    \`\`\`javascript
    // 注册 Service Worker
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registered');
      })
      .catch(error => {
        console.log('ServiceWorker registration failed:', error);
      });
    \`\`\`
    
    #### 5.4 SharedArrayBuffer 和 Atomics
    ES2017 引入的共享内存模型，允许 Worker 线程共享内存：
    
    \`\`\`javascript
    // 在主线程中创建共享内存
    const sharedBuffer = new SharedArrayBuffer(1024);
    const sharedArray = new Int32Array(sharedBuffer);
    \`\`\`
    
    ### 6. 单线程设计的最佳实践
    
    #### 6.1 避免长时间运行的任务
    - 将大型计算任务分解为较小的部分
    - 使用 setTimeout 或 requestAnimationFrame 将任务分散到多个事件循环中
    - 对于 CPU 密集型任务，使用 Web Workers
    
    \`\`\`javascript
    // 不良实践
    function processLargeArray(array) {
      for (let i = 0; i < array.length; i++) {
        // 大量处理...
      }
    }
    
    // 良好实践
    function processLargeArray(array, chunkSize = 1000) {
      let index = 0;
      
      function processChunk() {
        const chunk = array.slice(index, index + chunkSize);
        // 处理当前块...
        
        index += chunkSize;
        if (index < array.length) {
          setTimeout(processChunk, 0); // 让出主线程
        }
      }
      
      processChunk();
    }
    \`\`\`
    
    #### 6.2 合理使用异步 API
    - 使用 Promise 和 async/await 管理异步操作
    - 避免不必要的同步操作
    - 利用微任务优化关键路径
    
    #### 6.3 性能优化
    - 使用 requestAnimationFrame 进行动画和视觉更新
    - 批量处理 DOM 操作（如使用 DocumentFragment）
    - 使用防抖（debounce）和节流（throttle）控制频繁触发的事件
    
    ### 7. 总结
    
    JavaScript 的单线程设计是一个经过深思熟虑的选择，主要目的是：
    1. **简化 DOM 操作**：确保对网页内容的一致性修改
    2. **降低复杂度**：提供易于理解和使用的编程模型
    3. **适应事件驱动特性**：符合网页交互的本质需求
    
    尽管单线程模型有其局限性，但通过事件循环机制、异步编程模式和现代 API（如 Web Workers），JavaScript 已经能够有效处理复杂的应用需求，同时保持其简单性和易用性。
    
    随着 JavaScript 应用领域的扩展，理解其单线程特性及相关优化策略变得越来越重要，这有助于开发者构建高性能、响应迅速的现代 Web 应用。`,
      },
      {
        id: 47,
        title: "如何判断 javascript 的数据类型？",
        tags: ["类型判断"],
        difficulty: "简单",
        code: `// 1. typeof 操作符
    console.log(typeof 42);           // "number"
    console.log(typeof "hello");      // "string"
    console.log(typeof true);         // "boolean"
    console.log(typeof undefined);    // "undefined"
    console.log(typeof Symbol());     // "symbol"
    console.log(typeof 10n);          // "bigint"
    console.log(typeof function() {}); // "function"
    
    // typeof 的局限性
    console.log(typeof null);         // "object" - 这是一个已知的 bug!
    console.log(typeof []);           // "object" - 无法区分数组和普通对象
    console.log(typeof {});           // "object"
    console.log(typeof new Date());   // "object"
    
    // 2. instanceof 操作符
    console.log([] instanceof Array);           // true
    console.log({} instanceof Object);          // true
    console.log(new Date() instanceof Date);    // true
    console.log(/regex/ instanceof RegExp);     // true
    
    // instanceof 的局限性
    console.log(new String("hello") instanceof String);  // true
    console.log("hello" instanceof String);              // false - 原始类型不是实例
    
    // 3. Object.prototype.toString.call()
    console.log(Object.prototype.toString.call(42));          // "[object Number]"
    console.log(Object.prototype.toString.call("hello"));     // "[object String]"
    console.log(Object.prototype.toString.call(true));        // "[object Boolean]"
    console.log(Object.prototype.toString.call(undefined));   // "[object Undefined]"
    console.log(Object.prototype.toString.call(null));        // "[object Null]"
    console.log(Object.prototype.toString.call([]));          // "[object Array]"
    console.log(Object.prototype.toString.call({}));          // "[object Object]"
    console.log(Object.prototype.toString.call(new Date()));  // "[object Date]"
    console.log(Object.prototype.toString.call(/regex/));     // "[object RegExp]"
    console.log(Object.prototype.toString.call(function(){}));// "[object Function]"
    console.log(Object.prototype.toString.call(Symbol()));    // "[object Symbol]"
    
    // 4. Array.isArray() - 专门用于检测数组
    console.log(Array.isArray([]));    // true
    console.log(Array.isArray({}));    // false
    
    // 5. 自定义类型检测函数
    function getType(value) {
      return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
    }
    
    console.log(getType(42));           // "number"
    console.log(getType("hello"));      // "string"
    console.log(getType(true));         // "boolean"
    console.log(getType(undefined));    // "undefined"
    console.log(getType(null));         // "null"
    console.log(getType([]));           // "array"
    console.log(getType({}));           // "object"
    console.log(getType(new Date()));   // "date"
    console.log(getType(/regex/));      // "regexp"
    console.log(getType(function(){});  // "function"
    console.log(getType(Symbol()));     // "symbol"
    console.log(getType(10n));          // "bigint"`,
        answer: `## 判断 JavaScript 数据类型的方法
    
    JavaScript 作为一种动态类型语言，提供了多种方法来检测变量的数据类型。每种方法都有其优缺点和适用场景。
    
    ### 1. typeof 操作符
    
    \`typeof\` 是最简单的类型检测操作符，返回一个表示数据类型的字符串。
    
    \`\`\`javascript
    typeof 42;                // "number"
    typeof "hello";           // "string"
    typeof true;              // "boolean"
    typeof undefined;         // "undefined"
    typeof Symbol();          // "symbol"
    typeof 10n;               // "bigint"
    typeof function() {};     // "function"
    \`\`\`
    
    **优点**：
    - 语法简单
    - 对原始类型的检测较为准确
    - 性能好，因为是操作符而非方法
    
    **局限性**：
    - 无法区分数组、普通对象、null等引用类型，都返回 "object"
    - 存在历史遗留问题：\`typeof null\` 返回 "object"，而不是 "null"
    
    \`\`\`javascript
    typeof null;         // "object" - JavaScript设计缺陷
    typeof [];           // "object" - 无法识别是数组
    typeof new Date();   // "object" - 无法识别是日期对象
    \`\`\`
    
    ### 2. instanceof 操作符
    
    \`instanceof\` 用于检测对象是否为某个构造函数的实例，基于原型链检查。
    
    \`\`\`javascript
    [] instanceof Array;           // true
    new Date() instanceof Date;    // true
    /regex/ instanceof RegExp;     // true
    \`\`\`
    
    **优点**：
    - 可以检测对象的类型
    - 可以检查自定义类的实例
    
    **局限性**：
    - 不适用于原始类型（如 string、number等）
    - 受原型链影响，可能导致意外结果
    - 跨窗口或跨iframe时可能失效
    
    \`\`\`javascript
    "hello" instanceof String;               // false - 原始类型不是实例
    new String("hello") instanceof String;   // true - 但这是String对象
    \`\`\`
    
    ### 3. Object.prototype.toString.call()
    
    这是最可靠的类型检测方法，返回代表对象类型的字符串，格式为 "[object Type]"。
    
    \`\`\`javascript
    Object.prototype.toString.call(42);          // "[object Number]"
    Object.prototype.toString.call("hello");     // "[object String]"
    Object.prototype.toString.call(true);        // "[object Boolean]"
    Object.prototype.toString.call(undefined);   // "[object Undefined]"
    Object.prototype.toString.call(null);        // "[object Null]"
    Object.prototype.toString.call([]);          // "[object Array]"
    Object.prototype.toString.call({});          // "[object Object]"
    Object.prototype.toString.call(new Date());  // "[object Date]"
    \`\`\`
    
    **优点**：
    - 可以检测所有的数据类型，包括原始类型和引用类型
    - 能正确识别内置类型，如Array、Date、RegExp等
    - 检测结果可靠，不受原型链影响
    
    **缺点**：
    - 语法冗长
    - 返回的字符串需要进一步处理（如提取类型名称）
    
    ### 4. 专用方法
    
    针对特定类型，JavaScript提供了专门的检测方法：
    
    \`\`\`javascript
    // 检测数组
    Array.isArray([]);         // true
    Array.isArray({});         // false
    
    // 检测NaN - 唯一一个不等于自身的值
    Number.isNaN(NaN);         // true
    Number.isNaN("string");    // false
    
    // 检测有限数值
    Number.isFinite(42);       // true
    Number.isFinite(Infinity); // false
    \`\`\`
    
    ### 5. 自定义类型检测函数
    
    通常实际开发中，我们会封装一个通用的类型检测函数：
    
    \`\`\`javascript
    function getType(value) {
      return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
    }
    
    getType(42);           // "number"
    getType("hello");      // "string"
    getType(true);         // "boolean"
    getType(undefined);    // "undefined"
    getType(null);         // "null"
    getType([]);           // "array"
    getType({});           // "object"
    getType(new Date());   // "date"
    getType(/regex/);      // "regexp"
    getType(function(){}); // "function"
    getType(Symbol());     // "symbol"
    getType(10n);          // "bigint"
    \`\`\`
    
    ### 6. 判断空值
    
    在JavaScript中，我们经常需要检测"空值"，可能包括：undefined、null、空字符串、0、NaN等，根据具体业务场景判断：
    
    \`\`\`javascript
    // 检测undefined和null
    function isNil(value) {
      return value === undefined || value === null;
    }
    
    // 检测各种"空"值
    function isEmpty(value) {
      if (value === undefined || value === null) return true;
      if (typeof value === 'string' && value.trim() === '') return true;
      if (Array.isArray(value) && value.length === 0) return true;
      if (typeof value === 'object' && Object.keys(value).length === 0) return true;
      return false;
    }
    \`\`\`
    
    ### 7. TypeScript 中的类型检查
    
    在TypeScript中，可以使用类型断言和类型守卫进行更强大的类型检查：
    
    \`\`\`typescript
    // 类型守卫
    function isString(value: any): value is string {
      return typeof value === 'string';
    }
    
    // 使用示例
    function process(value: any) {
      if (isString(value)) {
        // 这里 value 被确定为 string 类型
        return value.toUpperCase();
      }
      return String(value);
    }
    \`\`\`
    
    ### 8. 类型检测的最佳实践
    
    1. **对于原始类型**，使用 \`typeof\` 操作符
    2. **对于数组**，优先使用 \`Array.isArray()\`
    3. **对于null**，使用严格等于 \`value === null\`
    4. **对于undefined**，使用严格等于 \`value === undefined\`
    5. **对于复杂对象类型**，使用 \`Object.prototype.toString.call()\`
    6. **对于NaN**，使用 \`Number.isNaN()\`
    7. **跨框架/窗口对象**，考虑使用 \`Object.prototype.toString.call()\`
    
    ### 总结
    
    JavaScript提供了多种检测数据类型的方法，每种方法都有其优缺点。在实际开发中，应根据具体需求选择合适的方法，或者封装一个通用的类型检测函数。理解这些方法的原理和局限性，有助于编写更健壮的代码。`,
      },
      {
        id: 48,
        title: "ES 每个版本引入了什么新特性？",
        tags: ["ES6+", "新特性"],
        difficulty: "中等",
        code: `// ES6/ES2015
    // 1. 箭头函数
    const add = (a, b) => a + b;
    
    // 2. 类
    class Person {
      constructor(name) {
        this.name = name;
      }
      sayHello() {
        console.log(\`Hello, \${this.name}\`);  // 3. 模板字符串
      }
    }
    
    // 4. let/const
    let variable = "可以重新赋值";
    const constant = "不可重新赋值";
    
    // 5. 解构赋值
    const [a, b] = [1, 2];
    const {name, age} = {name: "张三", age: 20};
    
    // 6. 默认参数
    function greet(name = "访客") {
      return \`你好，\${name}\`;
    }
    
    // 7. 扩展运算符
    const arr1 = [1, 2, 3];
    const arr2 = [...arr1, 4, 5];  // [1, 2, 3, 4, 5]
    
    // 8. Promise
    new Promise((resolve, reject) => {
      setTimeout(() => resolve("完成"), 1000);
    })
    .then(result => console.log(result));
    
    // ES2016
    // 1. Array.prototype.includes
    const fruits = ["苹果", "香蕉", "橙子"];
    console.log(fruits.includes("苹果"));  // true
    
    // 2. 指数运算符
    console.log(2 ** 10);  // 1024
    
    // ES2017
    // 1. async/await
    async function fetchData() {
      const response = await fetch("https://api.example.com/data");
      const data = await response.json();
      return data;
    }
    
    // 2. Object.values/Object.entries
    const person = { name: "李四", age: 25 };
    console.log(Object.values(person));  // ["李四", 25]
    console.log(Object.entries(person)); // [["name", "李四"], ["age", 25]]
    
    // ES2018
    // 1. Rest/Spread 属性
    const {x, y, ...z} = {x: 1, y: 2, a: 3, b: 4};
    const obj1 = {x: 1, y: 2};
    const obj2 = {...obj1, z: 3};  // {x: 1, y: 2, z: 3}
    
    // 2. 异步迭代
    async function* asyncGenerator() {
      yield await Promise.resolve(1);
      yield await Promise.resolve(2);
    }
    
    // ES2019
    // 1. Object.fromEntries
    const entries = [["name", "王五"], ["age", 30]];
    const newObj = Object.fromEntries(entries);  // {name: "王五", age: 30}
    
    // 2. String.prototype.trimStart/trimEnd
    const str = "  Hello  ";
    console.log(str.trimStart());  // "Hello  "
    console.log(str.trimEnd());    // "  Hello"
    
    // ES2020
    // 1. 可选链操作符
    const user = {
      address: {
        street: "123号街道"
      }
    };
    console.log(user?.address?.street);  // "123号街道"
    console.log(user?.contact?.phone);   // undefined
    
    // 2. 空值合并操作符
    const value = null;
    console.log(value ?? "默认值");  // "默认值"
    
    // ES2021
    // 1. String.prototype.replaceAll
    const string = "2020-05-15";
    console.log(string.replaceAll("-", "/"));  // "2020/05/15"
    
    // 2. Promise.any
    Promise.any([
      Promise.reject("错误1"),
      Promise.resolve("成功"),
      Promise.reject("错误2")
    ]).then(result => console.log(result));  // "成功"
    
    // ES2022
    // 1. 顶层 await
    // 在模块顶层使用 await，无需 async 函数包装
    // await fetch("https://api.example.com/data");
    
    // 2. 类中的私有字段和方法
    class Counter {
      #count = 0;  // 私有字段
      
      #increment() {  // 私有方法
        this.#count++;
      }
      
      get value() {
        return this.#count;
      }
      
      increment() {
        this.#increment();
      }
    }`,
        answer: `## ECMAScript 版本及其新特性
    
    ECMAScript（简称ES）是JavaScript语言的标准规范。从1997年发布第一版以来，它经历了多次重大更新，每个版本都为JavaScript增添了新的特性和功能。以下是各个主要版本引入的关键特性：
    
    ### ES1 - ES5 (1997-2009)：早期基础
    
    早期版本奠定了JavaScript的基础：
    
    - **ES1 (1997)**：首个版本，定义了基本语法
    - **ES2 (1998)**：细微更新，调整为ISO标准
    - **ES3 (1999)**：增加正则表达式、try/catch、switch语句等
    - **ES4**：被放弃的版本
    - **ES5 (2009)**：引入严格模式、JSON支持、Function.prototype.bind、数组方法（map、filter等）
    
    ### ES6/ES2015：现代JavaScript的基础
    
    ES6是一次革命性的更新，引入大量新特性，使JavaScript更加强大和易用：
    
    #### 1. 块级作用域与声明
    
    **let 和 const**
    \`\`\`javascript
    let variable = "可以重新赋值";
    const constant = "不可重新赋值";
    
    // 块级作用域
    {
      let blockScoped = "只在块内可见";
      var functionScoped = "在函数内可见";
    }
    console.log(functionScoped); // 有效
    console.log(blockScoped);    // ReferenceError
    \`\`\`
    
    #### 2. 箭头函数
    
    \`\`\`javascript
    // 传统函数
    function add(a, b) {
      return a + b;
    }
    
    // 箭头函数
    const add = (a, b) => a + b;
    
    // 箭头函数不绑定自己的this
    function Person() {
      this.age = 0;
      
      setInterval(() => {
        this.age++; // 这里的this指向Person实例
      }, 1000);
    }
    \`\`\`
    
    #### 3. 类
    
    \`\`\`javascript
    class Person {
      constructor(name) {
        this.name = name;
      }
      
      sayHello() {
        console.log(\`Hello, \${this.name}\`);
      }
      
      static create(name) {
        return new Person(name);
      }
    }
    
    // 继承
    class Employee extends Person {
      constructor(name, position) {
        super(name);
        this.position = position;
      }
    }
    \`\`\`
    
    #### 4. 模板字符串
    
    \`\`\`javascript
    const name = "世界";
    const greeting = \`你好，\${name}！
    这是第二行。\`;
    \`\`\`
    
    #### 5. 解构赋值
    
    \`\`\`javascript
    // 数组解构
    const [a, b, ...rest] = [1, 2, 3, 4, 5];
    console.log(a, b, rest); // 1, 2, [3, 4, 5]
    
    // 对象解构
    const {name, age, job = "开发者"} = {name: "张三", age: 30};
    console.log(name, age, job); // "张三", 30, "开发者"
    
    // 函数参数解构
    function printPerson({name, age}) {
      console.log(\`\${name}, \${age}岁\`);
    }
    printPerson({name: "李四", age: 25}); // "李四, 25岁"
    \`\`\`
    
    #### 6. 默认参数
    
    \`\`\`javascript
    function greet(name = "访客", greeting = "你好") {
      return \`\${greeting}, ${name}!\`;
    }
    \`\`\`
    
    #### 7. 扩展运算符
    
    \`\`\`javascript
    // 数组
    const arr1 = [1, 2, 3];
    const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]
    
    // 函数调用
    function sum(a, b, c) {
      return a + b + c;
    }
    const numbers = [1, 2, 3];
    console.log(sum(...numbers)); // 6
    \`\`\`
    
    #### 8. Promise
    
    \`\`\`javascript
    function fetchData() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("数据已加载");
        }, 1000);
      });
    }
    
    fetchData()
      .then(data => console.log(data))
      .catch(error => console.error(error));
    \`\`\`
    
    #### 9. 模块化
    
    \`\`\`javascript
    // 导出
    export const PI = 3.14159;
    export function square(x) {
      return x * x;
    }
    
    // 导入
    import {PI, square} from './math.js';
    import * as math from './math.js';
    \`\`\`
    
    #### 10. 其他重要特性
    
    - Map和Set集合
    - Symbol原始类型
    - 迭代器和for...of循环
    - 生成器函数
    - Proxy和Reflect API
    - 二进制数组（如TypedArray）
    
    ### ES2016 (ES7)
    
    相对于ES6的大规模更新，ES2016是一个小型更新：
    
    #### 1. Array.prototype.includes()
    
    \`\`\`javascript
    const array = [1, 2, 3, NaN];
    console.log(array.includes(2));    // true
    console.log(array.includes(4));    // false
    console.log(array.includes(NaN));  // true (而indexOf方法无法找到NaN)
    \`\`\`
    
    #### 2. 指数运算符
    
    \`\`\`javascript
    // 旧方法
    console.log(Math.pow(2, 10)); // 1024
    
    // 新方法
    console.log(2 ** 10);         // 1024
    \`\`\`
    
    ### ES2017 (ES8)
    
    ES2017引入了几个重要的新特性：
    
    #### 1. async/await
    
    \`\`\`javascript
    // 基于Promise的异步代码
    function fetchData() {
      return fetch('https://api.example.com/data')
        .then(response => response.json());
    }
    
    // 使用async/await
    async function fetchData() {
      const response = await fetch('https://api.example.com/data');
      const data = await response.json();
      return data;
    }
    
    // 错误处理
    async function fetchDataSafely() {
      try {
        const data = await fetchData();
        console.log(data);
      } catch (error) {
        console.error('获取数据出错:', error);
      }
    }
    \`\`\`
    
    #### 2. Object.values()/Object.entries()
    
    \`\`\`javascript
    const person = { name: '张三', age: 30, job: '开发者' };
    
    // 获取所有值
    console.log(Object.values(person)); // ["张三", 30, "开发者"]
    
    // 获取所有键值对
    console.log(Object.entries(person)); // [["name", "张三"], ["age", 30], ["job", "开发者"]]
    
    // 结合for...of使用
    for (const [key, value] of Object.entries(person)) {
      console.log(\`\${key}: \${value}\`);
    }
    \`\`\`
    
    #### 3. String padding
    
    \`\`\`javascript
    // 在字符串开头填充
    console.log('42'.padStart(5, '0'));    // "00042"
    console.log('JavaScript'.padStart(15)); // "    JavaScript"
    
    // 在字符串结尾填充
    console.log('42'.padEnd(5, '0'));      // "42000"
    \`\`\`
    
    #### 4. Object.getOwnPropertyDescriptors()
    
    获取对象所有属性的完整描述符。
    
    #### 5. 函数参数列表和调用中的尾后逗号
    
    \`\`\`javascript
    function example(
      param1,
      param2,
      param3, // 允许尾后逗号
    ) {
      // ...
    }
    \`\`\`
    
    ### ES2018 (ES9)
    
    #### 1. 异步迭代
    
    \`\`\`javascript
    async function* asyncGenerator() {
      yield await Promise.resolve(1);
      yield await Promise.resolve(2);
      yield await Promise.resolve(3);
    }
    
    (async function() {
      for await (const value of asyncGenerator()) {
        console.log(value); // 1, 2, 3
      }
    })();
    \`\`\`
    
    #### 2. Rest/Spread属性
    
    对象解构和创建中的扩展运算符。
    
    \`\`\`javascript
    // Rest属性（解构中）
    const {a, b, ...rest} = {a: 1, b: 2, c: 3, d: 4};
    console.log(rest); // {c: 3, d: 4}
    
    // Spread属性（创建中）
    const obj1 = {a: 1, b: 2};
    const obj2 = {c: 3, ...obj1};
    console.log(obj2); // {c: 3, a: 1, b: 2}
    \`\`\`
    
    #### 3. Promise.finally()
    
    \`\`\`javascript
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error))
      .finally(() => {
        // 无论成功或失败都会执行
        console.log('请求完成');
      });
    \`\`\`
    
    #### 4. 正则表达式增强
    
    - 命名捕获组
    - 后行断言
    - Unicode属性转义
    - s (dotAll) 标志
    
    \`\`\`javascript
    // 命名捕获组
    const re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
    const match = re.exec('2023-05-15');
    console.log(match.groups); // {year: "2023", month: "05", day: "15"}
    \`\`\`
    
    ### ES2019 (ES10)
    
    #### 1. Object.fromEntries()
    
    将键值对列表转换为对象（Object.entries()的逆操作）。
    
    \`\`\`javascript
    const entries = [['name', '张三'], ['age', 30]];
    const obj = Object.fromEntries(entries);
    console.log(obj); // {name: "张三", age: 30}
    
    // 实用场景：转换Map为对象
    const map = new Map([['name', '李四'], ['age', 25]]);
    const objFromMap = Object.fromEntries(map);
    \`\`\`
    
    #### 2. String.prototype.trimStart()/trimEnd()
    
    \`\`\`javascript
    const str = '  Hello World  ';
    console.log(str.trimStart()); // "Hello World  "
    console.log(str.trimEnd());   // "  Hello World"
    \`\`\`
    
    #### 3. Array.prototype.flat()/flatMap()
    
    \`\`\`javascript
    // 扁平化嵌套数组
    const nestedArray = [1, 2, [3, 4, [5, 6]]];
    console.log(nestedArray.flat());    // [1, 2, 3, 4, [5, 6]]
    console.log(nestedArray.flat(2));   // [1, 2, 3, 4, 5, 6]
    
    // flatMap - 映射然后扁平化
    const arr = [1, 2, 3];
    console.log(arr.flatMap(x => [x, x * 2])); // [1, 2, 2, 4, 3, 6]
    \`\`\`
    
    #### 4. 可选的catch绑定
    
    \`\`\`javascript
    try {
      // 可能抛出错误的代码
    } catch {
      // 不需要错误对象时可以省略
      console.log('发生错误');
    }
    \`\`\`
    
    ### ES2020 (ES11)
    
    #### 1. 可选链操作符 (?.)
    
    \`\`\`javascript
    const user = {
      name: '王五',
      address: {
        city: '北京'
      }
    };
    
    // 以前的方式
    const city = user && user.address && user.address.city;
    
    // 使用可选链
    const city = user?.address?.city; // "北京"
    const zipCode = user?.address?.zipCode; // undefined（不会报错）
    
    // 函数调用
    const result = someObject?.someMethod?.(); // 如果方法不存在也不会报错
    \`\`\`
    
    #### 2. 空值合并操作符 (??)
    
    \`\`\`javascript
    // || 会将 0, '', false 等值视为假值
    const count = data.count || 10; // 如果count为0，结果为10
    
    // ?? 只有当左侧为null或undefined时才使用右侧值
    const count = data.count ?? 10; // 如果count为0，结果为0
    \`\`\`
    
    #### 3. BigInt
    
    处理超过Number.MAX_SAFE_INTEGER的整数。
    
    \`\`\`javascript
    const bigNumber = 9007199254740991n; // 添加n后缀
    const result = bigNumber + 1n;
    console.log(result); // 9007199254740992n
    
    // 转换
    const num = Number(bigNumber); // 可能丢失精度
    \`\`\`
    
    #### 4. Promise.allSettled()
    
    等待所有Promise完成（无论成功或失败）。
    
    \`\`\`javascript
    const promises = [
      fetch('/api/data1'),
      fetch('/api/data2'),
      Promise.reject('某个请求失败')
    ];
    
    Promise.allSettled(promises)
      .then(results => {
        // results是一个数组，包含所有Promise的结果
        results.forEach(result => {
          if (result.status === 'fulfilled') {
            console.log('成功:', result.value);
          } else {
            console.log('失败:', result.reason);
          }
        });
      });
    \`\`\`
    
    #### 5. globalThis
    
    提供统一的方式访问全局对象。
    
    \`\`\`javascript
    // 之前根据环境使用不同的全局对象引用
    const global = 
      (typeof window !== 'undefined') ? window :
      (typeof self !== 'undefined') ? self :
      (typeof global !== 'undefined') ? global :
      {};
    
    // 现在可以使用统一的引用
    console.log(globalThis);
    \`\`\`
    
    #### 6. 动态导入
    
    \`\`\`javascript
    // 静态导入
    import { add } from './math.js';
    
    // 动态导入
    if (needMath) {
      import('./math.js')
        .then(math => {
          console.log(math.add(5, 10));
        });
    }
    
    // 与async/await一起使用
    async function loadModule() {
      const math = await import('./math.js');
      return math.add(5, 10);
    }
    \`\`\`
    
    ### ES2021 (ES12)
    
    #### 1. String.prototype.replaceAll()
    
    \`\`\`javascript
    // 替换所有出现的字符串
    const string = '2020-05-15';
    // 旧方法需要使用正则表达式
    console.log(string.replace(/-/g, '/')); // "2020/05/15"
    // 新方法
    console.log(string.replaceAll('-', '/')); // "2020/05/15"
    \`\`\`
    
    #### 2. Promise.any()
    
    返回第一个成功的Promise结果。
    
    \`\`\`javascript
    const promises = [
      fetch('/endpoint-1').then(() => 'endpoint-1'),
      fetch('/endpoint-2').then(() => 'endpoint-2'),
      fetch('/endpoint-3').then(() => 'endpoint-3'),
    ];
    
    // 返回第一个成功的结果
    Promise.any(promises)
      .then(first => console.log(\`最快的是: \${first}\`))
      .catch(error => console.log(\`所有请求都失败: \${error}\`));
    \`\`\`
    
    #### 3. 逻辑赋值运算符
    
    \`\`\`javascript
    // 逻辑与赋值
    x &&= y;  // 等同于: x = x && y
    
    // 逻辑或赋值
    x ||= y;  // 等同于: x = x || y
    
    // 空值合并赋值
    x ??= y;  // 等同于: x = x ?? y
    
    // 实例
    let user = {name: "张三"};
    // 只在user存在时添加role属性
    user &&= {...user, role: "admin"};
    
    // 设置默认值
    let config = {};
    config.timeout ??= 5000; // 如果timeout为undefined或null，设置为5000
    \`\`\`
    
    #### 4. 数字分隔符
    
    \`\`\`javascript
    // 使用下划线分隔数字，提高可读性
    const billion = 1_000_000_000;
    const bytes = 0xFF_EC_DE_5E;
    const binary = 0b1010_0001_1000_0101;
    \`\`\`
    
    ### ES2022 (ES13)
    
    #### 1. 类中的私有字段和方法
    
    \`\`\`javascript
    class Counter {
      #count = 0;  // 私有字段，外部无法访问
      
      #increment() {  // 私有方法
        this.#count++;
      }
      
      get value() {
        return this.#count;
      }
      
      increment() {
        this.#increment();
      }
    }
    
    const counter = new Counter();
    counter.increment();
    console.log(counter.value); // 1
    console.log(counter.#count); // 语法错误
    \`\`\`
    
    #### 2. 顶层await
    
    在模块的顶层使用await，不需要包含在async函数内。
    
    \`\`\`javascript
    // 以前
    async function initialize() {
      const response = await fetch('/api/data');
      const data = await response.json();
      return data;
    }
    const data = await initialize();
    
    // 现在（在模块中）
    const response = await fetch('/api/data');
    const data = await response.json();
    export { data };
    \`\`\`
    
    #### 3. Error Cause
    
    允许在抛出错误时指定原因。
    
    \`\`\`javascript
    try {
      doSomething();
    } catch (err) {
      throw new Error('操作失败', { cause: err });
    }
    \`\`\`
    
    #### 4. Object.hasOwn()
    
    安全地检查对象自身是否有特定属性。
    
    \`\`\`javascript
    // 替代
    Object.prototype.hasOwnProperty.call(obj, 'prop');
    
    // 新方法
    Object.hasOwn(obj, 'prop');
    \`\`\`
    
    ### ES2023 (ES14)
    
    #### 1. Array 查找元素的 findLast 和 findLastIndex 方法
    
    \`\`\`javascript
    const array = [1, 2, 3, 4, 5];
    
    // 从后向前找到第一个满足条件的元素
    console.log(array.findLast(x => x % 2 === 1)); // 5
    
    // 从后向前找到第一个满足条件的元素的索引
    console.log(array.findLastIndex(x => x % 2 === 1)); // 4
    \`\`\`
    
    #### 2. Hashbang语法
    
    允许在JavaScript文件开头使用#!/usr/bin/env node语法，方便创建可执行脚本。
    
    #### 3. WeakMap 支持 Symbol 键
    
    \`\`\`javascript
    const weak = new WeakMap();
    const key = Symbol("key");
    const obj = {};
    
    weak.set(key, "value"); // 现在可以使用Symbol作为键
    \`\`\`
    
    ### 未来展望
    
    JavaScript标准仍在不断发展，未来可能包含的特性：
    
    1. **装饰器**：为类和类成员添加元编程能力
    2. **Record 和 Tuple**：不可变数据结构
    3. **管道操作符**：简化函数链式调用
    4. **Pattern Matching**：增强的模式匹配
    5. **可观察对象**：内置的响应式编程支持
    
    ### 浏览器兼容性
    
    值得注意的是，不同的浏览器对这些特性的支持程度不同：
    
    - 现代浏览器（Chrome, Firefox, Safari, Edge）对ES2015-ES2023的大部分特性有良好支持
    - 对于旧版浏览器，通常需要使用Babel等转译工具
    - 某些特性可能需要polyfill
    
    ### 总结
    
    ECMAScript的演进使JavaScript从一个简单的脚本语言发展成为一个功能强大的编程语言。ES6/ES2015是一个分水岭，引入了大量现代JavaScript的基础特性。此后的每年更新虽然规模较小，但继续为语言增添有价值的功能，使开发者能够编写更简洁、更强大的代码。
    
    理解各个ES版本的特性对于JavaScript开发者至关重要，这不仅有助于使用现代语法编写更高效的代码，也有助于理解库和框架的源码，以及在处理兼容性问题时做出明智的决策。`,
      },
      {
        id: 49,
        title: "let 声明变量的特性",
        tags: ["ES6", "变量声明"],
        difficulty: "简单",
        code: `// 1. 块级作用域
    {
      var varVariable = "我在块外也可见";
      let letVariable = "我只在块内可见";
    }
    console.log(varVariable);  // "我在块外也可见"
    console.log(letVariable);  // ReferenceError: letVariable is not defined
    
    // 2. 暂时性死区 (TDZ)
    {
      console.log(varVariable2);  // undefined (已提升)
      console.log(letVariable2);  // ReferenceError: letVariable2 is not defined
    
      var varVariable2 = "var 变量";
      let letVariable2 = "let 变量";
    }
    
    // 3. 禁止重复声明
    {
      var varVariable3 = "第一次声明";
      var varVariable3 = "第二次声明";  // 允许
    
      let letVariable3 = "第一次声明";
      let letVariable3 = "第二次声明";  // SyntaxError: Identifier 'letVariable3' has already been declared
    }
    
    // 4. 循环中的绑定
    for (var i = 0; i < 3; i++) {
      setTimeout(() => console.log("var in loop: " + i), 100);
    }
    // 输出: "var in loop: 3" (三次)
    
    for (let j = 0; j < 3; j++) {
      setTimeout(() => console.log("let in loop: " + j), 100);
    }
    // 输出: "let in loop: 0", "let in loop: 1", "let in loop: 2"
    
    // 5. 全局对象属性
    var varGlobal = "var 全局变量";
    let letGlobal = "let 全局变量";
    
    console.log(window.varGlobal);  // "var 全局变量"
    console.log(window.letGlobal);  // undefined
    
    // 6. let 与 const 对比
    let mutable = "可以改变";
    mutable = "已改变";  // 可以
    
    const immutable = "不可改变";
    immutable = "试图改变";  // TypeError: Assignment to constant variable`,
        answer: `## let 声明变量的特性
    
    \`let\` 是ES6（ECMAScript 2015）引入的变量声明关键字，它提供了比传统 \`var\` 更为严格和可预测的作用域规则。了解 \`let\` 的特性对于编写现代 JavaScript 代码至关重要。
    
    ### 1. 块级作用域
    
    \`let\` 声明的变量具有块级作用域，仅在声明它的块（由 \`{}\` 包围的区域）内可见，而 \`var\` 声明的变量则具有函数作用域。
    
    \`\`\`javascript
    {
      var varVariable = "我在块外也可见";
      let letVariable = "我只在块内可见";
    }
    console.log(varVariable);  // "我在块外也可见"
    console.log(letVariable);  // ReferenceError: letVariable is not defined
    \`\`\`
    
    块级作用域使代码结构更加清晰，减少了意外变量泄露的风险。这在复杂函数或嵌套代码块中尤为重要。
    
    ### 2. 暂时性死区 (Temporal Dead Zone, TDZ)
    
    \`let\` 声明的变量存在"暂时性死区"：从块的开始到变量声明语句之前，变量都"存在"但不能被访问。在此期间访问变量会抛出 ReferenceError。
    
    \`\`\`javascript
    {
      // 从这里开始，letVariable 处于 "暂时性死区"
      console.log(letVariable);  // ReferenceError: letVariable is not defined
      let letVariable = "现在可以使用了";
      // TDZ 结束
    }
    \`\`\`
    
    相比之下，\`var\` 声明的变量会被提升，并初始化为 \`undefined\`：
    
    \`\`\`javascript
    {
      console.log(varVariable);  // undefined (已提升)
      var varVariable = "var 变量";
    }
    \`\`\`
    
    TDZ 有助于发现代码中的潜在错误，防止在变量初始化前使用它们。
    
    ### 3. 禁止重复声明
    
    在同一作用域内，不能重复声明同一个 \`let\` 变量，而 \`var\` 允许这么做：
    
    \`\`\`javascript
    {
      var varVariable = "第一次声明";
      var varVariable = "第二次声明";  // 允许，第二次声明覆盖第一次
    
      let letVariable = "第一次声明";
      let letVariable = "第二次声明";  // SyntaxError: Identifier 'letVariable' has already been declared
    }
    \`\`\`
    
    这种限制有助于防止意外重新声明变量，减少潜在的逻辑错误。
    
    ### 4. 循环中的特殊绑定行为
    
    \`let\` 在循环中表现出特殊的绑定行为，每次迭代都会创建一个新的绑定：
    
    \`\`\`javascript
    for (var i = 0; i < 3; i++) {
      setTimeout(() => console.log("var: " + i), 100);
    }
    // 输出三次: "var: 3"
    
    for (let j = 0; j < 3; j++) {
      setTimeout(() => console.log("let: " + j), 100);
    }
    // 输出: "let: 0", "let: 1", "let: 2"
    \`\`\`
    
    在使用 \`var\` 的循环中，所有的回调函数共享同一个变量，而使用 \`let\` 时，每次迭代都会创建一个新的变量绑定，每个回调函数都能捕获到各自迭代的值。
    
    ### 5. 不会成为全局对象的属性
    
    在全局作用域中，\`var\` 声明的变量会成为全局对象（浏览器中的 \`window\` 或 Node.js 中的 \`global\`）的属性，而 \`let\` 声明的变量则不会：
    
    \`\`\`javascript
    var varGlobal = "var 全局变量";
    let letGlobal = "let 全局变量";
    
    console.log(window.varGlobal);  // "var 全局变量"
    console.log(window.letGlobal);  // undefined
    \`\`\`
    
    这有助于减少全局命名空间的污染，降低命名冲突的风险。
    
    ### 6. 与 var 的提升行为差异
    
    \`var\` 声明会被提升到函数或全局作用域的顶部并初始化为 \`undefined\`，而 \`let\` 声明虽然也会被提升，但不会被初始化，进入 TDZ：
    
    \`\`\`javascript
    console.log(varVariable);  // undefined
    var varVariable = "var 变量";
    
    console.log(letVariable);  // ReferenceError: letVariable is not defined
    let letVariable = "let 变量";
    \`\`\`
    
    ### 7. 与 const 的比较
    
    \`let\` 和 \`const\` 都提供块级作用域，主要区别在于：
    - \`let\` 声明的变量可以重新赋值
    - \`const\` 声明的变量必须在声明时初始化，且不能重新赋值
    
    \`\`\`javascript
    let mutable = "可以改变";
    mutable = "已改变";  // 可以
    
    const immutable = "不可改变";
    immutable = "试图改变";  // TypeError: Assignment to constant variable
    \`\`\`
    
    注意：\`const\` 声明的对象内部属性仍然可以修改，因为 \`const\` 只保证引用不变，不保证内容不变：
    
    \`\`\`javascript
    const obj = { prop: "原始值" };
    obj.prop = "新值";  // 可以修改属性
    console.log(obj.prop);  // "新值"
    
    obj = {};  // TypeError: Assignment to constant variable
    \`\`\`
    
    ### 8. 最佳实践
    
    - **默认使用 \`const\`**：如果变量不需要重新赋值，使用 \`const\` 可以防止意外修改
    - **需要重新赋值时使用 \`let\`**：当变量需要在后续代码中变更时
    - **避免使用 \`var\`**：在现代JavaScript中，很少有理由使用 \`var\`
    - **声明靠近使用位置**：利用块级作用域，在最小的必要作用域内声明变量
    
    ### 9. 浏览器兼容性
    
    \`let\` 在所有现代浏览器中都得到支持，但在IE11及更早版本中可能需要使用Babel等工具进行转译。
    
    ### 总结
    
    \`let\` 的引入是JavaScript语言发展中的重要进步，它解决了 \`var\` 声明的许多问题和陷阱：
    - 块级作用域增强了代码的可预测性
    - 暂时性死区帮助发现变量使用错误
    - 禁止重复声明减少了意外覆盖的风险
    - 循环中的特殊绑定解决了常见的闭包问题
    - 不污染全局对象使代码更加模块化
    
    理解和合理使用 \`let\` 有助于编写更加健壮、可维护的JavaScript代码。`,
      },
      {
        id: 50,
        title: "变量提升 & 函数提升 (var, let, const, function)",
        tags: ["提升", "作用域"],
        difficulty: "中等",
        code: `// 1. var 变量提升
    console.log(varVariable); // undefined (已提升声明但未赋值)
    var varVariable = "var 变量";
    
    // 2. let/const 声明不会被初始化提升（存在暂时性死区）
    console.log(letVariable); // ReferenceError: Cannot access 'letVariable' before initialization
    let letVariable = "let 变量";
    
    console.log(constVariable); // ReferenceError: Cannot access 'constVariable' before initialization
    const constVariable = "const 变量";
    
    // 3. 函数声明提升
    sayHello(); // "你好！"（完整提升）
    function sayHello() {
      console.log("你好！");
    }
    
    // 4. 函数表达式不完全提升
    sayHi(); // TypeError: sayHi is not a function
    var sayHi = function() {
      console.log("Hi!");
    };
    // 等价于:
    // var sayHi;
    // sayHi(); // sayHi 是 undefined，不是函数
    // sayHi = function() {...};
    
    // 5. 函数声明vs变量声明优先级
    console.log(demo); // [Function: demo]
    var demo = "变量 demo";
    function demo() {
      return "函数 demo";
    }
    console.log(demo); // "变量 demo"
    
    // 6. 块级作用域中的函数声明（不同浏览器行为可能不同）
    console.log(blockFunc); // undefined 在严格模式下
    if (true) {
      console.log(blockFunc); // [Function: blockFunc] 在某些浏览器中
      function blockFunc() {
        return "块级函数";
      }
    }
    console.log(blockFunc); // [Function: blockFunc] 或 undefined 取决于浏览器
    
    // 7. 提升与作用域
    function outer() {
      console.log(innerVar); // undefined
      
      if (true) {
        var innerVar = "内部变量";
      }
      
      console.log(innerVar); // "内部变量"
    }
    outer();`,
        answer: `## JavaScript 中的变量提升与函数提升
    
    变量提升(hoisting)是 JavaScript 中独特而重要的特性，了解它对于避免常见陷阱和理解代码执行顺序至关重要。
    
    ### 什么是提升？
    
    **提升**是 JavaScript 引擎在执行代码之前的预处理阶段，将变量和函数声明移动到其所在作用域顶部的行为。这意味着无论变量和函数实际声明在哪里，它们都被视为在其作用域的开始处声明。
    
    重要概念：JavaScript 只提升**声明**，不提升**初始化**。
    
    ### 1. var 变量提升
    
    使用 \`var\` 声明的变量会被提升到当前作用域的顶部，但只有声明被提升，赋值不会：
    
    \`\`\`javascript
    console.log(name); // undefined (不是 ReferenceError)
    var name = "张三";
    
    // 上面的代码等价于：
    var name;  // 声明被提升
    console.log(name); // undefined
    name = "张三"; // 赋值停留在原位置
    \`\`\`
    
    **特点**：
    - 变量声明被提升
    - 变量初始化为 \`undefined\`
    - 作用域为函数作用域或全局作用域
    
    ### 2. 函数声明提升
    
    函数声明会被**完整提升**，包括函数体：
    
    \`\`\`javascript
    sayHello(); // "你好！" (能正常工作)
    function sayHello() {
      console.log("你好！");
    }
    
    // 等价于：
    function sayHello() {
      console.log("你好！");
    }
    sayHello(); // "你好！"
    \`\`\`
    
    **特点**：
    - 整个函数定义被提升
    - 可以在声明前调用函数
    
    ### 3. 函数表达式的提升
    
    函数表达式的提升行为取决于使用的声明关键字：
    
    \`\`\`javascript
    sayHi(); // TypeError: sayHi is not a function
    var sayHi = function() {
      console.log("Hi!");
    };
    
    // 等价于：
    var sayHi; // 只有变量声明被提升，初始化为 undefined
    sayHi();   // 尝试调用 undefined 作为函数，导致 TypeError
    sayHi = function() { // 函数赋值留在原地
      console.log("Hi!");
    };
    \`\`\`
    
    ### 4. let 和 const 的提升
    
    \`let\` 和 \`const\` 声明的变量也会被提升，但有一个重要区别：它们不会被初始化，在声明之前存在**暂时性死区**（Temporal Dead Zone, TDZ）。
    
    \`\`\`javascript
    console.log(age); // ReferenceError: Cannot access 'age' before initialization
    let age = 25;
    
    // 与之不同，var 的行为是：
    console.log(score); // undefined
    var score = 100;
    \`\`\`
    
    **特点**：
    - 变量声明提升，但不初始化
    - 在声明前访问变量会抛出 ReferenceError
    - 提供块级作用域
    
    ### 5. 函数声明与变量声明的优先级
    
    当同名的函数声明和变量声明共存时，函数声明优先级更高：
    
    \`\`\`javascript
    console.log(demo); // [Function: demo]
    var demo = "变量 demo";
    function demo() {
      return "函数 demo";
    }
    console.log(demo); // "变量 demo"
    
    // 等价于：
    function demo() { // 函数声明优先
      return "函数 demo";
    }
    var demo; // 重复声明被忽略
    console.log(demo); // [Function: demo]
    demo = "变量 demo"; // 赋值覆盖函数
    console.log(demo); // "变量 demo"
    \`\`\`
    
    ### 6. 块级作用域中的函数声明
    
    在严格模式下，块级作用域中的函数声明行为在不同浏览器中可能不同：
    
    \`\`\`javascript
    console.log(blockFunc); // undefined
    
    if (true) {
      function blockFunc() { // 块级函数声明
        return "块级函数";
      }
    }
    
    console.log(blockFunc); // 在一些浏览器中是函数，在其他浏览器中可能是 undefined
    \`\`\`
    
    **最佳实践**：避免在块中使用函数声明，改用函数表达式。
    
    \`\`\`javascript
    // 推荐写法
    let blockFunc; // 明确声明
    
    if (true) {
      blockFunc = function() {
        return "块级函数";
      };
    }
    \`\`\`
    
    ### 7. 提升和作用域的关系
    
    提升发生在**每个作用域**内部：
    
    \`\`\`javascript
    function outer() {
      console.log(innerVar); // undefined (已提升)
      
      if (true) {
        var innerVar = "内部变量"; // var 在函数作用域内提升
      }
      
      console.log(innerVar); // "内部变量"
    }
    outer();
    \`\`\`
    
    使用 \`let\` 时情况不同：
    
    \`\`\`javascript
    function outer() {
      // innerVar 在这里不存在
      
      if (true) {
        let innerVar = "内部变量"; // let 具有块级作用域
      }
      
      console.log(innerVar); // ReferenceError: innerVar is not defined
    }
    \`\`\`
    
    ### 8. 提升的内部机制
    
    从概念上讲，提升是通过 JavaScript 引擎的两个阶段工作实现的：
    1. **创建阶段**：扫描代码获取所有声明，并设置内存空间
    2. **执行阶段**：按顺序执行代码，变量赋值和函数调用发生
    
    ### 9. 提升的最佳实践
    
    1. **避免依赖提升**：总是在作用域顶部声明变量和函数，使代码更可预测
    2. **使用 let/const 代替 var**：利用暂时性死区捕获潜在错误
    3. **使用函数表达式**：特别是在条件块中
    4. **保持一致的声明风格**：提高代码可读性
    
    ### 10. 提升相关的常见问题
    
    #### 循环中的闭包问题
    
    \`\`\`javascript
    // 预期打印 0,1,2，但实际都打印 3
    for (var i = 0; i < 3; i++) {
      setTimeout(function() {
        console.log(i);
      }, 100);
    }
    
    // 解决方法1：使用 let
    for (let j = 0; j < 3; j++) {
      setTimeout(function() {
        console.log(j); // 正确打印 0,1,2
      }, 100);
    }
    
    // 解决方法2：使用闭包
    for (var k = 0; k < 3; k++) {
      (function(capturedK) {
        setTimeout(function() {
          console.log(capturedK); // 正确打印 0,1,2
        }, 100);
      })(k);
    }
    \`\`\`
    
    ### 总结
    
    JavaScript 的提升机制是语言的基本特性，深入理解它有助于：
    
    1. **避免常见错误**：尤其是变量使用前未声明的问题
    2. **编写更可预测的代码**：通过良好的声明习惯
    3. **理解常见模式**：如即时调用函数表达式 (IIFE)
    4. **调试复杂行为**：当代码执行顺序看起来不直观时
    
    掌握提升机制是成为熟练 JavaScript 开发者的重要一步，它影响着变量声明、初始化和使用的方方面面。`,
      },
    ]

export default questions50;