const questions330 = [
  {
    id: 321,
    title: "Git忽略规则深度解析",
    tags: ["Git", ".gitignore", "配置管理"],
    difficulty: "简单",
    code: `# 通用开发环境忽略规则
node_modules/    # 依赖目录
dist/            # 构建输出
*.log            # 日志文件
.DS_Store       # macOS系统文件

# IDE配置文件
.vscode/         # VS Code配置
.idea/           # IntelliJ配置

# 环境敏感文件
.env             # 环境变量
*.key            # 密钥文件
*.cert           # 证书文件

# 测试相关
coverage/        # 测试覆盖率报告
test-results/    # 测试结果

# 特殊用例
!important.log   # 排除特定文件`,
    answer: `## .gitignore 配置最佳实践

### 1. 核心配置原则
- **排除生成文件**：构建产物、依赖目录
- **保护敏感信息**：密钥、证书、环境变量
- **忽略系统文件**：操作系统生成的临时文件
- **过滤IDE配置**：编辑器/IDE特定文件

### 2. 高级匹配规则
| 模式         | 示例                | 说明                          |
|--------------|---------------------|-------------------------------|
| 目录匹配     | build/             | 忽略所有build目录             |
| 通配符       | *.tmp              | 忽略所有.tmp后缀文件          |
| 排除         | !important.config  | 不忽略指定文件                |
| 注释         | # 数据库文件       | 添加配置说明                  |
| 递归匹配     | logs/**/*.log      | 匹配所有子目录中的.log文件     |

### 3. 多环境配置方案
1. 项目级配置（.gitignore）
2. 全局配置（~/.gitignore_global）
   \`git config --global core.excludesfile ~/.gitignore_global\`
3. 仓库级排除（.git/info/exclude）

### 4. 常见问题处理
1. **已提交文件的忽略**：
   \`\`\`bash
   git rm --cached <file>  # 从版本控制移除
   git commit -m "stop tracking <file>"
   \`\`\`
2. **规则调试**：
   \`git check-ignore -v <file>\`  # 验证忽略规则
3. **模式冲突**：
   - 使用转义字符：\\#file.txt
   - 明确指定路径：/project.log

### 5. 最佳实践建议
- 定期审计忽略规则
- 团队统一配置模板
- 使用gitignore生成工具
- 文档说明特殊规则原因`
  },
  {
    id: 322,
    title: "Git Fetch与Pull区别解析",
    tags: ["Git", "fetch", "pull"],
    difficulty: "中等",
    code: `# 获取远程更新但不合并
git fetch origin main

# 查看远程分支状态
git log origin/main

# 合并远程分支
git merge origin/main

# 拉取并自动合并
git pull origin main`,
    answer: `## Fetch与Pull对比分析

### 1. 核心区别
| 命令    | 作用                     | 安全性 |
|---------|--------------------------|--------|
| fetch   | 仅获取远程更新           | 高     |
| pull    | 获取并自动合并           | 低     |

### 2. 工作流程
- **Fetch**：
  1. 下载远程对象和引用
  2. 更新远程跟踪分支（origin/main）
  3. 不修改本地工作目录

- **Pull**：
  1. 执行git fetch
  2. 执行git merge（默认）

### 3. 推荐实践
- 先fetch后手动合并
- 使用git diff检查变更
- 推荐配置：
  \`git config --global pull.rebase true\`
  
### 4. 问题排查
- 冲突时使用git stash暂存修改
- 使用git reset --hard放弃合并
- 查看.git/FETCH_HEAD文件`
  },
  {
    id: 323,
    title: "Rebase与Merge工作流对比",
    tags: ["Git", "rebase", "merge"],
    difficulty: "中等",
    code: `# Merge工作流
git checkout feature
git merge main

# Rebase工作流
git checkout feature
git rebase main

# 交互式Rebase
git rebase -i HEAD~3`,
    answer: `## Rebase vs Merge

### 1. 主要区别
| 特性        | Rebase                  | Merge               |
|-------------|-------------------------|---------------------|
| 提交历史    | 线性整洁                | 保留合并提交        |
| 冲突处理    | 需多次解决              | 一次性解决          |
| 适用场景    | 本地分支整理            | 合并特性分支        |
| 安全性      | 不要rebase已推送历史    | 安全                |

### 2. 使用场景
- **使用Rebase**：
  - 保持提交历史线性
  - 整理本地提交
  - 更新特性分支基址

- **使用Merge**：
  - 保留完整合并历史
  - 合并长期分支
  - 团队协作分支

### 3. 最佳实践
- 个人分支使用rebase
- 公共分支使用merge
- 发布前清理提交历史
- 使用pull --rebase更新`

  },
  {
    id: 324,
    title: "Git Reset与Revert区别",
    tags: ["Git", "reset", "revert"],
    difficulty: "中等",
    code: `# 重置到指定提交（危险）
git reset --hard HEAD~1

# 创建反向提交（安全）
git revert HEAD

# 重置暂存区
git reset HEAD <file>

# 交互式回退
git revert -n HEAD~3..HEAD`,
    answer: `## Reset与Revert对比

### 1. 核心区别
| 命令    | 作用                     | 影响历史 | 安全性 |
|---------|--------------------------|----------|--------|
| reset   | 移动HEAD引用             | 修改     | 危险   |
| revert  | 创建新提交抵消更改       | 保留     | 安全   |

### 2. 使用场景
- **reset**：
  - 丢弃本地未提交修改
  - 修复私有分支历史
  - 撤销最近的提交

- **revert**：
  - 撤销已推送的提交
  - 记录撤销操作
  - 维护公共历史

### 3. 注意事项
- 不要reset已推送历史
- revert可能产生冲突
- 使用reflog恢复误操作
- 团队协作优先使用revert`
  },
  {
    id: 325,
    title: "Git与SVN对比分析",
    tags: ["Git", "SVN", "版本控制"],
    difficulty: "中等",
    code: `# SVN典型操作
svn checkout http://repo/trunk
svn update
svn commit

# Git典型操作
git clone https://repo.git
git pull
git push`,
    answer: `## Git vs SVN

### 1. 架构差异
| 特性        | Git（分布式）            | SVN（集中式）         |
|-------------|--------------------------|-----------------------|
| 仓库位置    | 每个开发者有完整仓库      | 中央服务器唯一仓库     |
| 网络需求    | 可离线工作                | 需要连接服务器         |
| 分支操作    | 轻量快速                  | 目录复制较慢           |
| 历史追溯    | 完整本地历史              | 依赖服务器             |

### 2. 工作流对比
- **Git**：
  - 本地提交
  - 灵活分支
  - 合并策略丰富

- **SVN**：
  - 直接提交到中央仓库
  - 目录式分支
  - 锁定机制

### 3. 迁移建议
- 需要离线工作时选择Git
- 二进制文件较多可考虑SVN
- 大型项目推荐Git
- 遗留系统可维持SVN`
  },
  {
    id: 326,
    title: "前后端联调解决方案",
    tags: ["前后端联调", "依赖管理", "团队协作"],
    difficulty: "中等",
    code: `// Mock服务配置示例
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

// 自定义路由
server.post('/login', (req, res) => {
  if (req.body.username === 'admin') {
    res.json({ token: 'mock-token' })
  } else {
    res.status(401).json({ error: 'Invalid credentials' })
  }
})

server.listen(3000, () => {
  console.log('Mock Server is running')
})`,
    answer: `## 联调问题解决方案

### 1. 常见问题
- 环境不一致
- 接口文档过时
- 数据格式不匹配
- 依赖服务不可用

### 2. 解决方案
- **接口契约**：使用OpenAPI规范
- **Mock服务**：实现离线开发
- **接口测试**：Postman自动化
- **容器化**：Docker统一环境

### 3. 工作流程
1. 定义接口规范
2. 并行开发（前端使用Mock）
3. 集成测试
4. 自动化验证

### 4. 工具推荐
- Swagger/OpenAPI
- JSON Server
- Postman
- Docker Compose`
  },
  {
    id: 327,
    title: "DevOps实践指南",
    tags: ["DevOps", "开发运维", "持续集成"],
    difficulty: "中等",
    code: `# CI/CD流水线示例
stages:
  - build
  - test
  - deploy

build:
  stage: build
  script:
    - npm install
    - npm run build

test:
  stage: test
  script:
    - npm test

deploy:
  stage: deploy
  script:
    - scp -r dist/ user@server:/var/www/app
  only:
    - main`,
    answer: `## DevOps核心实践

### 1. 关键要素
- **持续集成**：频繁合并代码
- **持续交付**：自动化发布流程
- **基础设施即代码**：Terraform/Ansible
- **监控告警**：Prometheus/Grafana

### 2. 工具链
| 类别            | 工具                          |
|-----------------|-------------------------------|
| 版本控制        | Git                           |
| CI/CD           | Jenkins, GitHub Actions       |
| 容器化          | Docker, Kubernetes            |
| 配置管理        | Ansible, Chef                 |
| 监控            | Prometheus, ELK Stack         |

### 3. 实施步骤
1. 自动化构建和测试
2. 统一开发与生产环境
3. 建立监控体系
4. 持续优化流程

### 4. 文化转变
- 打破部门墙
- 共享责任
- 持续改进
- 度量驱动`
  },
  {
    id: 328,
    title: "Docker核心概念解析",
    tags: ["Docker", "容器化", "部署"],
    difficulty: "中等",
    code: `# Dockerfile示例
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

# 构建镜像
docker build -t my-app .

# 运行容器
docker run -d -p 3000:3000 my-app`,
    answer: `## Docker核心概念

### 1. 基础组件
- **镜像**：只读模板
- **容器**：镜像的运行实例
- **仓库**：镜像存储服务
- **Dockerfile**：构建指令文件

### 2. 优势特点
- 环境一致性
- 资源隔离
- 快速部署
- 弹性伸缩

### 3. 使用场景
- 微服务架构
- CI/CD流水线
- 开发环境标准化
- 快速水平扩展

### 4. 最佳实践
- 使用多阶段构建
- 最小化基础镜像
- 单进程容器
- 合理设置资源限制
- 使用volume持久化数据`
  }
];

