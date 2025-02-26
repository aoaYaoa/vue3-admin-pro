// 业务场景题目列表数据
export interface Topic {
    id: number;
    title: string;
    tags: string[];
    difficulty: string;
    answer?: string;
    code?: string;
}
const topicList =<Topic[]>([
   
        {
          id: 351,
          title: "多按钮异步请求管理方案",
          tags: ["业务场景", "异步", "前端实现"],
          difficulty: "中等",
          code: `// 使用AbortController取消请求
      const controllers = new Map();
      
      async function fetchData(buttonId, url) {
        // 取消之前的请求
        if (controllers.has(buttonId)) {
          controllers.get(buttonId).abort();
        }
      
        const controller = new AbortController();
        controllers.set(buttonId, controller);
      
        try {
          const response = await fetch(url, {
            signal: controller.signal
          });
          const data = await response.json();
          console.log(\`按钮\${buttonId}请求成功:\`, data);
        } catch (error) {
          if (error.name !== 'AbortError') {
            console.error(\`按钮\${buttonId}请求失败:\`, error);
          }
        }
      }
      
      // 按钮点击处理
      document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const buttonId = btn.dataset.id;
          fetchData(buttonId, \`/api/data/\${buttonId}\`);
        });
      });`,
          answer: `## 多按钮异步请求管理方案
      
      ### 1. 核心挑战
      - 请求竞态问题
      - 重复请求处理
      - 错误处理统一
      - 性能优化
      
      ### 2. 解决方案
      - **请求取消**：使用AbortController
      - **状态管理**：跟踪每个按钮的请求状态
      - **节流控制**：限制请求频率
      - **缓存策略**：相同请求缓存结果
      
      ### 3. 优化建议
      - 添加加载状态指示
      - 实现自动重试机制
      - 使用请求队列管理
      - 监控请求性能
      
      ### 4. 扩展方案
      - 使用React Query管理请求
      - 实现请求优先级
      - 添加请求超时处理
      - 集成错误上报系统`
        },
        {
          id: 352,
          title: "无感刷新Token实现方案",
          tags: ["业务场景", "登录", "用户体验"],
          difficulty: "中等",
          code: `// 请求拦截器
      axios.interceptors.request.use(config => {
        const token = getAccessToken();
        if (token) {
          config.headers.Authorization = \`Bearer \${token}\`;
        }
        return config;
      });
      
      // 响应拦截器
      axios.interceptors.response.use(
        response => response,
        async error => {
          const originalRequest = error.config;
          
          if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
              const newToken = await refreshToken();
              setAccessToken(newToken);
              return axios(originalRequest);
            } catch (refreshError) {
              // 刷新失败跳转登录
              window.location.href = '/login';
              return Promise.reject(refreshError);
            }
          }
          
          return Promise.reject(error);
        }
      );`,
          answer: `## 无感刷新Token方案详解
      
      ### 1. 实现原理
      - 双Token机制（Access Token + Refresh Token）
      - 响应拦截器捕获401错误
      - 同步刷新避免并发请求
      - 失败后跳转登录页
      
      ### 2. 安全考虑
      - Refresh Token设置HttpOnly
      - 限制Refresh Token使用次数
      - 设置合理的Token有效期
      - 监控异常刷新行为
      
      ### 3. 优化方向
      - 添加刷新队列避免并发
      - 实现滑动过期时间
      - 前端静默续期提示
      - 多标签页同步状态
      
      ### 4. 注意事项
      - 避免内存泄漏
      - 处理网络波动
      - 兼容服务端Session
      - 记录审计日志`
        },
        {
          id: 353,
          title: "分页性能优化方案",
          tags: ["业务场景", "性能优化", "分页"],
          difficulty: "中等",
          code: `// 虚拟滚动分页
      const VirtualScroll = {
        mounted() {
          this.$el.addEventListener('scroll', () => {
            const { scrollTop, clientHeight, scrollHeight } = this.$el;
            if (scrollHeight - (scrollTop + clientHeight) < 50) {
              this.loadMore();
            }
          });
        },
        methods: {
          async loadMore() {
            if (this.loading || !this.hasNext) return;
            
            this.loading = true;
            try {
              const { data } = await fetchData(this.page + 1);
              this.items = [...this.items, ...data.items];
              this.page++;
              this.hasNext = data.hasNext;
            } finally {
              this.loading = false;
            }
          }
        }
      };
      
      // 分页参数优化
      async function fetchData(page) {
        const lastId = this.items[this.items.length - 1]?.id;
        return axios.get(\`/api/items?lastId=\${lastId}&limit=20\`);
      }`,
          answer: `## 分页性能优化方案
      
      ### 1. 常见问题
      - 深度分页性能差
      - DOM节点过多卡顿
      - 频繁请求导致抖动
      - 数据重复或丢失
      
      ### 2. 优化方案
      - **游标分页**：使用最后ID代替offset
      - **虚拟滚动**：只渲染可见区域
      - **请求防抖**：合并快速操作
      - **数据缓存**：缓存已加载数据
      
      ### 3. 数据库优化
      - 使用覆盖索引
      - 避免SELECT *
      - 优化ORDER BY
      - 分区表处理大数据
      
      ### 4. 前端优化
      - 添加加载状态
      - 实现快速返回顶部
      - 预加载下一页数据
      - 错误重试机制`
        }
     
  ])
  export default topicList