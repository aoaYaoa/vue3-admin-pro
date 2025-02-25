<template>
  <div class="javascript-basics-container">
    <el-page-header @back="goBack" title="返回" content="JavaScript 基础知识" />
    
    <div class="content-container">
      <h1>JavaScript 基础知识</h1>
      
      <el-divider content-position="left">数据类型</el-divider>
      
      <section class="section">
        <h2>1. 基本数据类型</h2>
        <ul>
          <li><strong>String</strong>: 文本数据</li>
          <li><strong>Number</strong>: 整数或浮点数</li>
          <li><strong>Boolean</strong>: true 或 false</li>
          <li><strong>Null</strong>: 特殊关键字，表示空值</li>
          <li><strong>Undefined</strong>: 未赋值的变量的默认值</li>
          <li><strong>Symbol</strong>: ES6 引入的唯一且不可变的数据类型</li>
          <li><strong>BigInt</strong>: 任意精度的整数</li>
        </ul>
        
        <div class="code-box">
          <pre><code>// 基本数据类型示例
const name = "JavaScript"; // String
const version = 2022;      // Number
const isAwesome = true;    // Boolean
const nothing = null;      // Null
let notDefined;            // Undefined
const uniqueId = Symbol('id'); // Symbol
const bigNumber = 9007199254740991n; // BigInt</code></pre>
        </div>
      </section>
      
      <section class="section">
        <h2>2. 引用数据类型</h2>
        <ul>
          <li><strong>Object</strong>: 键值对的集合</li>
          <li><strong>Array</strong>: 有序的元素集合</li>
          <li><strong>Function</strong>: 可执行的代码块</li>
          <li><strong>Date</strong>: 日期和时间</li>
          <li><strong>RegExp</strong>: 正则表达式</li>
          <li><strong>Map</strong>/<strong>Set</strong>: ES6 引入的集合类型</li>
        </ul>
        
        <div class="code-box">
          <pre><code>// 引用数据类型示例
const person = { name: "John", age: 30 }; // Object
const fruits = ["Apple", "Banana", "Orange"]; // Array
function greet() { return "Hello!"; } // Function</code></pre>
        </div>
      </section>
      
      <el-divider content-position="left">变量声明</el-divider>
      
      <section class="section">
        <h2>3. 变量声明方式</h2>
        <ul>
          <li><strong>var</strong>: 函数作用域，可重复声明，存在变量提升</li>
          <li><strong>let</strong>: 块级作用域，不可重复声明，没有变量提升</li>
          <li><strong>const</strong>: 块级作用域，不可重新赋值，没有变量提升</li>
        </ul>
        
        <div class="code-box">
          <pre><code>// var 示例
var x = 10;
if (true) {
  var x = 20; // 同一个变量
}
console.log(x); // 20

// let 示例
let y = 10;
if (true) {
  let y = 20; // 不同的变量
}
console.log(y); // 10

// const 示例
const z = 10;
// z = 20; // 错误: 不能重新赋值</code></pre>
        </div>
      </section>
      
      <el-divider content-position="left">函数</el-divider>
      
      <section class="section">
        <h2>4. 函数定义与调用</h2>
        
        <h3>函数声明</h3>
        <div class="code-box">
          <pre><code>function add(a, b) {
  return a + b;
}
console.log(add(5, 3)); // 8</code></pre>
        </div>
        
        <h3>函数表达式</h3>
        <div class="code-box">
          <pre><code>const multiply = function(a, b) {
  return a * b;
};
console.log(multiply(4, 2)); // 8</code></pre>
        </div>
        
        <h3>箭头函数 (ES6)</h3>
        <div class="code-box">
          <pre><code>const divide = (a, b) => a / b;
console.log(divide(10, 2)); // 5</code></pre>
        </div>
      </section>
      
      <section class="section">
        <h2>5. 作用域与闭包</h2>
        
        <h3>闭包示例</h3>
        <div class="code-box">
          <pre><code>function createCounter() {
  let count = 0;
  return function() {
    return ++count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3</code></pre>
        </div>
        
        <div class="tip-box">
          <p><strong>提示:</strong> 闭包是一个函数能够访问和操作其外部作用域中变量的特性。</p>
        </div>
      </section>
      
      <el-divider content-position="left">异步编程</el-divider>
      
      <section class="section">
        <h2>6. Promise 和 async/await</h2>
        
        <h3>Promise</h3>
        <div class="code-box">
          <pre><code>const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Data received');
    }, 1000);
  });
};

fetchData()
  .then(data => console.log(data))
  .catch(error => console.error(error));</code></pre>
        </div>
        
        <h3>Async/Await</h3>
        <div class="code-box">
          <pre><code>async function getData() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

getData();</code></pre>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.go(-1);
};
</script>

<style scoped>
.javascript-basics-container {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.content-container {
  margin-top: 20px;
}

h1 {
  font-size: 28px;
  margin-bottom: 20px;
  color: #303133;
}

.section {
  margin-bottom: 30px;
}

h2 {
  font-size: 22px;
  color: #303133;
  margin-bottom: 12px;
}

h3 {
  font-size: 18px;
  color: #303133;
  margin: 16px 0 8px;
}

p {
  font-size: 16px;
  line-height: 1.6;
  color: #606266;
  margin-bottom: 12px;
}

ul {
  padding-left: 20px;
  margin-bottom: 15px;
}

li {
  margin-bottom: 8px;
  color: #606266;
  line-height: 1.5;
}

.code-box {
  background-color: #f5f7fa;
  border-radius: 4px;
  padding: 12px;
  margin: 12px 0;
  overflow-x: auto;
}

pre {
  margin: 0;
  font-family: 'Courier New', monospace;
}

code {
  font-family: 'Courier New', monospace;
}

.tip-box {
  background-color: #ecf8ff;
  border-left: 5px solid #50bfff;
  padding: 10px 15px;
  margin: 16px 0;
  border-radius: 0 4px 4px 0;
}

.tip-box p {
  margin: 0;
}
</style> 