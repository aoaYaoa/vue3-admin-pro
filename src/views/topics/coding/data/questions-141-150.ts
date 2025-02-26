const questions150 = [
  {
    id: 141,
    title: '手动实现一个 instanceof 方法',
    description: '手动实现一个 instanceof 方法',
    answer: '手动实现一个 instanceof 方法',
    tags: ['原型链', '运算符实现'],
    difficulty: '中等',
    code: `function myInstanceof(instance, constructor) {
      if (typeof constructor !== 'function') {
        throw new TypeError('Right-hand side of 'instanceof' is not callable');
      }
      
      let proto = Object.getPrototypeOf(instance);
      const prototype = constructor.prototype;
      
      while (proto !== null) {
        if (proto === prototype) return true;
        proto = Object.getPrototypeOf(proto);
      }
      
      return false;
    }

    // 测试用例
    console.log(myInstanceof([], Array)); // true
    console.log(myInstanceof({}, Object)); // true
    console.log(myInstanceof(123, Number)); // false`
  },
  {
    id: 142,
    title: '还原一棵树',
    description: '还原一棵树',
    answer: '还原一棵树',
    tags: ['树', '数据结构', '递归'],
    difficulty: '中等',
    code: `// 根据前序和中序遍历重建二叉树
    function buildTree(preorder, inorder) {
      if (preorder.length === 0) return null;
      
      const rootVal = preorder[0];
      const rootIndex = inorder.indexOf(rootVal);
      
      const root = new TreeNode(rootVal);
      root.left = buildTree(
        preorder.slice(1, rootIndex + 1),
        inorder.slice(0, rootIndex)
      );
      root.right = buildTree(
        preorder.slice(rootIndex + 1),
        inorder.slice(rootIndex + 1)
      );
      
      return root;
    }

    // 根据后序和中序遍历重建二叉树
    function buildTreePost(inorder, postorder) {
      if (postorder.length === 0) return null;
      
      const rootVal = postorder.pop();
      const rootIndex = inorder.indexOf(rootVal);
      
      const root = new TreeNode(rootVal);
      root.right = buildTreePost(
        inorder.slice(rootIndex + 1),
        postorder.slice(rootIndex)
      );
      root.left = buildTreePost(
        inorder.slice(0, rootIndex),
        postorder.slice(0, rootIndex)
      );
      
      return root;
    }

    class TreeNode {
      constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
      }
    }`
  },
  {
    id: 143,
    title: '实现 b 函数，使得 b.this === window',
    description: '实现 b 函数，使得 b.this === window',
    answer: '实现 b 函数，使得 b.this === window',
    tags: ['this', '上下文', '函数'],
    difficulty: '中等',
    code: `// 方法1: 箭头函数
    const b = () => {
      console.log(this === window); // true
    };

    // 方法2: bind
    const b = function() {
      console.log(this === window);
    }.bind(window);

    // 方法3: 调用时绑定
    function b() {
      console.log(this === window);
    }

    // 调用方式
    b.call(window);

    // 方法4: 严格模式下
    'use strict';
    function b() {
      console.log(this === undefined); // true
    }
    b();`
  },
  {
    id: 144,
    title: '实现一个 set 方法，支持 a.b.c = value',
    description: '实现一个 set 方法，支持 a.b.c = value',
    answer: '实现一个 set 方法，支持 a.b.c = value',
    tags: ['对象', '属性访问', '链式操作'],
    difficulty: '中等',
    code: `function set(object, path, value) {
      const keys = Array.isArray(path) ? path : path.split('.');
      let current = object;
      
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!current[key] || typeof current[key] !== 'object') {
          current[key] = {};
        }
        current = current[key];
      }
      
      current[keys[keys.length - 1]] = value;
      return object;
    }

    // 使用示例
    const obj = {};
    set(obj, 'a.b.c', 42);
    console.log(obj.a.b.c); // 42

    // 支持数组路径
    set(obj, ['x', 'y', 'z'], 'test');
    console.log(obj.x.y.z); // 'test'`
  },
  {
    id: 145,
    title: '并发请求控制，实现同时最多10个请求',
    description: '并发请求控制，实现同时最多10个请求',
    answer: '并发请求控制，实现同时最多10个请求',
    tags: ['请求控制', '异步', '队列'],
    difficulty: '困难',
    code: `class RequestPool {
      constructor(maxConcurrent = 10) {
        this.max = maxConcurrent;
        this.queue = [];
        this.activeCount = 0;
      }

      add(requestFn) {
        return new Promise((resolve, reject) => {
          this.queue.push({ requestFn, resolve, reject });
          this.run();
        });
      }

      run() {
        while (this.activeCount < this.max && this.queue.length) {
          const { requestFn, resolve, reject } = this.queue.shift();
          this.activeCount++;
          
          requestFn()
            .then(resolve)
            .catch(reject)
            .finally(() => {
              this.activeCount--;
              this.run();
            });
        }
      }
    }

    // 使用示例
    const pool = new RequestPool(10);

    for (let i = 0; i < 100; i++) {
      pool.add(() => fetch(\`/api/data/\${i}\`))
        .then(data => console.log(data))
        .catch(err => console.error(err));
    }`
  },
  {
    id: 146,
    title: '一只青蛙一次可以跳上1级台阶，也可以跳上2级，求跳上 n 级有多少种跳法',
    description: '一只青蛙一次可以跳上1级台阶，也可以跳上2级，求跳上 n 级有多少种跳法',
    answer: '一只青蛙一次可以跳上1级台阶，也可以跳上2级，求跳上 n 级有多少种跳法',
    tags: ['算法', '动态规划', '斐波那契'],
    difficulty: '中等',
    category: '算法题',
    code: `// 递归+记忆化
    function climbStairs(n, memo = new Map()) {
      if (n <= 2) return n;
      if (memo.has(n)) return memo.get(n);
      
      const result = climbStairs(n-1, memo) + climbStairs(n-2, memo);
      memo.set(n, result);
      return result;
    }

    // 动态规划
    function climbStairsDP(n) {
      if (n <= 2) return n;
      let a = 1, b = 2;
      
      for (let i = 3; i <= n; i++) {
        [a, b] = [b, a + b];
      }
      return b;
    }

    // 矩阵快速幂
    function climbStairsFast(n) {
      function multiply(a, b) {
        return [
          [a[0][0]*b[0][0] + a[0][1]*b[1][0], a[0][0]*b[0][1] + a[0][1]*b[1][1]],
          [a[1][0]*b[0][0] + a[1][1]*b[1][0], a[1][0]*b[0][1] + a[1][1]*b[1][1]]
        ];
      }

      let result = [[1, 0], [0, 1]];
      let base = [[1, 1], [1, 0]];
      let exp = n - 1;

      while (exp > 0) {
        if (exp % 2 === 1) {
          result = multiply(result, base);
        }
        base = multiply(base, base);
        exp = Math.floor(exp / 2);
      }

      return result[0][0];
    }`
  },
  {
    id: 147,
    title: '找出字符串中不含有重复字符的最长子串长度',
    description: '找出字符串中不含有重复字符的最长子串长度',
    answer: '找出字符串中不含有重复字符的最长子串长度',
    tags: ['算法', '字符串', '滑动窗口'],
    difficulty: '中等',
    category: '算法题',
    code: `function lengthOfLongestSubstring(s) {
      const map = new Map();
      let max = 0;
      let left = 0;

      for (let right = 0; right < s.length; right++) {
        const char = s[right];
        
        if (map.has(char) && map.get(char) >= left) {
          left = map.get(char) + 1;
        }
        
        map.set(char, right);
        max = Math.max(max, right - left + 1);
      }

      return max;
    }

    // 优化版（数组代替Map）
    function lengthOfLongestSubstringOpt(s) {
      const lastIndex = new Array(128).fill(-1);
      let max = 0;
      let left = 0;

      for (let right = 0; right < s.length; right++) {
        const code = s.charCodeAt(right);
        
        if (lastIndex[code] >= left) {
          left = lastIndex[code] + 1;
        }
        
        lastIndex[code] = right;
        max = Math.max(max, right - left + 1);
      }

      return max;
    }`
  },
  {
    id: 148,
    title: '给定一个字符串，判断是否是回文',
    description: '给定一个字符串，判断是否是回文',
    answer: '给定一个字符串，判断是否是回文',
    tags: ['算法', '字符串', '双指针'],
    difficulty: '简单',
    category: '算法题',
    code: `// 双指针法
    function isPalindrome(s) {
      s = s.replace(/[^a-z0-9]/gi, '').toLowerCase();
      let left = 0, right = s.length - 1;
      
      while (left < right) {
        if (s[left] !== s[right]) return false;
        left++;
        right--;
      }
      return true;
    }

    // 递归法
    function isPalindromeRecursive(s, left = 0, right = s.length - 1) {
      if (left >= right) return true;
      if (s[left] !== s[right]) return false;
      return isPalindromeRecursive(s, left + 1, right - 1);
    }

    // 允许删除一个字符
    function validPalindrome(s) {
      let left = 0, right = s.length - 1;
      
      while (left < right) {
        if (s[left] !== s[right]) {
          return isPalindrome(s, left + 1, right) || 
                 isPalindrome(s, left, right - 1);
        }
        left++;
        right--;
      }
      return true;
    }`
  },
  {
    id: 149,
    title: '反转一个链表',
    description: '反转一个链表',
    answer: '反转一个链表',
    tags: ['算法', '链表', '指针操作'],
    difficulty: '中等',
    category: '算法题',
    code: `// 迭代法
    function reverseList(head) {
      let prev = null;
      let curr = head;
      
      while (curr) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
      }
      
      return prev;
    }

    // 递归法
    function reverseListRecursive(head) {
      if (!head || !head.next) return head;
      
      const newHead = reverseListRecursive(head.next);
      head.next.next = head;
      head.next = null;
      
      return newHead;
    }

    // 反转部分链表
    function reverseBetween(head, m, n) {
      const dummy = new ListNode(0);
      dummy.next = head;
      let pre = dummy;
      
      for (let i = 0; i < m - 1; i++) {
        pre = pre.next;
      }
      
      let curr = pre.next;
      for (let i = m; i < n; i++) {
        const next = curr.next;
        curr.next = next.next;
        next.next = pre.next;
        pre.next = next;
      }
      
      return dummy.next;
    }`
  },
  {
    id: 150,
    title: '二叉树的遍历',
    description: '二叉树的遍历',
    answer: '二叉树的遍历',
    tags: ['算法', '二叉树', '遍历'],
    difficulty: '中等',
    category: '算法题',
    code: `// 前序遍历
    function preorder(root) {
      const result = [];
      
      function traverse(node) {
        if (!node) return;
        result.push(node.val);
        traverse(node.left);
        traverse(node.right);
      }
      
      traverse(root);
      return result;
    }

    // 中序遍历（迭代）
    function inorder(root) {
      const stack = [];
      const result = [];
      let curr = root;
      
      while (curr || stack.length) {
        while (curr) {
          stack.push(curr);
          curr = curr.left;
        }
        curr = stack.pop();
        result.push(curr.val);
        curr = curr.right;
      }
      
      return result;
    }

    // 层序遍历
    function levelOrder(root) {
      const result = [];
      const queue = root ? [root] : [];
      
      while (queue.length) {
        const levelSize = queue.length;
        const level = [];
        
        for (let i = 0; i < levelSize; i++) {
          const node = queue.shift();
          level.push(node.val);
          if (node.left) queue.push(node.left);
          if (node.right) queue.push(node.right);
        }
        
        result.push(level);
      }
      
      return result;
    }`
  },
  {
    id: 151,
    title: '实现一个全排列',
    description: '实现一个全排列',
    answer: '实现一个全排列',
    tags: ['算法', '排列', '递归'],
    difficulty: '中等',
    category: '算法题',
    code: `// 回溯法
    function permute(nums) {
      const result = [];
      
      function backtrack(path, used) {
        if (path.length === nums.length) {
          result.push([...path]);
          return;
        }
        
        for (let i = 0; i < nums.length; i++) {
          if (used[i]) continue;
          
          used[i] = true;
          path.push(nums[i]);
          backtrack(path, used);
          path.pop();
          used[i] = false;
        }
      }
      
      backtrack([], new Array(nums.length).fill(false));
      return result;
    }

    // 交换法
    function permuteSwap(nums) {
      const result = [];
      
      function dfs(start) {
        if (start === nums.length) {
          result.push([...nums]);
          return;
        }
        
        for (let i = start; i < nums.length; i++) {
          [nums[start], nums[i]] = [nums[i], nums[start]];
          dfs(start + 1);
          [nums[start], nums[i]] = [nums[i], nums[start]];
        }
      }
      
      dfs(0);
      return result;
    }`
  },
  {
    id: 152,
    title: '快速找到链表的中间节点',
    description: '快速找到链表的中间节点',
    answer: '快速找到链表的中间节点',
    tags: ['算法', '链表', '双指针'],
    difficulty: '中等',
    category: '算法题',
    code: `// 快慢指针法
    function middleNode(head) {
      let slow = head;
      let fast = head;
      
      while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
      }
      
      return slow;
    }

    // 两次遍历法
    function middleNodeTwoPass(head) {
      let length = 0;
      let curr = head;
      
      while (curr) {
        length++;
        curr = curr.next;
      }
      
      curr = head;
      for (let i = 0; i < Math.floor(length / 2); i++) {
        curr = curr.next;
      }
      
      return curr;
    }`
  }
]
export default questions150; 