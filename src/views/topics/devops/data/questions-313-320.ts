const questions320 = [
  {
    id: 313,
    title: "设计文档规范指南",
    tags: ["文档", "规范", "项目管理"],
    difficulty: "中等",
    code: `# 设计文档模板

## 1. 背景
- 项目背景
- 需求来源
- 相关方说明

## 2. 目标
- 业务目标
- 技术目标
- 成功标准

## 3. 系统设计
\`\`\`mermaid
graph TD
  A[客户端] --> B[API网关]
  B --> C[服务A]
  B --> D[服务B]
\`\`\`

## 4. 接口定义
| 方法 | 路径       | 描述       |
|------|------------|------------|
| GET  | /api/users | 获取用户列表|

## 5. 测试方案
- 单元测试覆盖率目标
- 集成测试场景
- 性能测试指标

## 6. 部署计划
- 环境要求
- 发布策略
- 回滚方案`,
    answer: `## 设计文档编写规范

### 1. 核心要素
- **背景说明**：明确问题域
- **架构设计**：包含系统架构图
- **接口规范**：使用OpenAPI标准
- **非功能需求**：性能、安全、监控
- **风险评估**：列出潜在风险

### 2. 图表规范
- 使用统一绘图工具（如PlantUML）
- 版本控制设计图
- 保持图表与代码同步
- 添加必要图例说明

### 3. 版本管理
- 使用语义化版本控制
- 维护变更日志
- 文档与代码同仓库
- 定期审查更新

### 4. 协作流程
- 文档评审机制
- 使用PR/MR提交修改
- 关联需求管理系统
- 自动化生成文档`
  },
  {
    id: 314,
    title: "ESLint配置与实践",
    tags: ["ESLint", "代码质量", "静态分析"],
    difficulty: "简单",
    code: `// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb-base'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'no-console': 'warn',
    'semi': ['error', 'always'],
    'indent': ['error', 2],
    'quotes': ['error', 'single']
  },
  overrides: [
    {
      files: ['**/*.test.js'],
      env: { jest: true }
    }
  ]
};`,
    answer: `## ESLint核心功能解析

### 1. 主要作用
- 统一代码风格
- 发现潜在错误
- 执行最佳实践
- 集成IDE实时反馈

### 2. 配置要点
- **环境配置**：node/browser
- **扩展规则集**：airbnb/standard
- **自定义规则**：覆盖默认配置
- **覆盖特定文件**：测试文件特殊处理

### 3. 集成方案
- 预提交钩子检查
- CI/CD流水线集成
- IDE插件实时提示
- 自动修复简单问题

### 4. 最佳实践
- 渐进式引入规则
- 定期更新规则集
- 团队统一配置
- 文档化规则决策`
  },
  {
    id: 315,
    title: "Git基础操作指南",
    tags: ["Git", "版本控制", "基础"],
    difficulty: "简单",
    code: `# 初始化仓库
git init

# 克隆远程仓库
git clone https://github.com/user/repo.git

# 添加文件到暂存区
git add .

# 提交更改
git commit -m "Initial commit"

# 查看状态
git status

# 查看提交历史
git log --oneline

# 推送代码
git push origin main

# 拉取更新
git pull origin main`,
    answer: `## Git基础命令解析

### 1. 工作流程
1. 工作目录修改文件
2. git add 添加到暂存区
3. git commit 提交到本地仓库
4. git push 推送到远程仓库

### 2. 常用命令
| 命令                | 作用                     |
|---------------------|--------------------------|
| git diff            | 查看未暂存修改           |
| git checkout -b     | 创建并切换分支           |
| git merge           | 合并分支                 |
| git stash           | 暂存当前修改             |
| git reset           | 回退提交                 |

### 3. 配置建议
- 设置用户信息：
  \`git config --global user.name "Your Name"\`
- 设置默认编辑器：
  \`git config --global core.editor "code --wait"\`
- 启用颜色输出：
  \`git config --global color.ui true\`

### 4. 问题排查
- 使用 \`git reflog\` 找回丢失提交
- \`git bisect\` 二分法定位问题
- \`git blame\` 查看文件修改历史`
  },
  {
    id: 316,
    title: "Commit Message规范",
    tags: ["Git", "提交规范", "团队协作"],
    difficulty: "简单",
    code: `# 示例Commit Message
feat: add user login functionality

- Add login form component
- Implement JWT authentication
- Add login API integration

Resolves: #123`,
    answer: `## Commit Message规范指南

### 1. 格式要求
\`\`\`
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
\`\`\`

### 2. 类型说明
| 类型     | 说明                     |
|----------|--------------------------|
| feat     | 新功能                   |
| fix      | 错误修复                 |
| docs     | 文档更新                 |
| style    | 代码格式调整             |
| refactor | 代码重构                 |
| test     | 测试相关                 |
| chore    | 构建或工具链变更         |

### 3. 最佳实践
- 标题不超过50字符
- 使用祈使语气（"Add" 而非 "Added"）
- 正文说明修改原因
- 关联问题跟踪编号

### 4. 工具支持
- Commitizen：交互式提交
- commitlint：校验格式
- Conventional Changelog：生成日志`
  },
  {
    id: 317,
    title: "Git Flow工作流实践",
    tags: ["Git", "Git Flow", "分支管理"],
    difficulty: "中等",
    code: `# 初始化Git Flow
git flow init

# 开始新功能开发
git flow feature start login

# 完成功能开发
git flow feature finish login

# 发布版本
git flow release start 1.0.0

# 热修复
git flow hotfix start fix-login-bug`,
    answer: `## Git Flow工作流详解

### 1. 分支结构
- **master**：生产代码
- **develop**：开发主线
- **feature/**：功能开发
- **release/**：版本准备
- **hotfix/**：紧急修复

### 2. 工作流程
1. 从develop切出feature分支
2. 完成开发合并回develop
3. 准备release分支进行测试
4. 发布后合并到master和develop
5. 紧急修复使用hotfix分支

### 3. 适用场景
- 定期发布版本
- 多版本维护
- 需要严格流程控制
- 团队协作开发

### 4. 替代方案
- GitHub Flow：简化流程
- GitLab Flow：带环境分支
- Trunk Based Development：主干开发`
  },
  {
    id: 318,
    title: "Git冲突解决指南",
    tags: ["Git", "冲突解决", "版本控制"],
    difficulty: "中等",
    code: `# 合并冲突解决流程
git checkout feature/login
git merge main

# 冲突文件示例
<<<<<<< HEAD
const apiUrl = 'https://new.api';
=======
const apiUrl = 'https://old.api';
>>>>>>> main

# 解决后提交
git add .
git commit -m "Resolve merge conflict"`,
    answer: `## Git冲突解决方案

### 1. 冲突原因
- 同一文件同一行被不同分支修改
- 删除被其他分支修改的文件
- 二进制文件修改

### 2. 解决步骤
1. 使用 \`git status\` 查看冲突文件
2. 打开文件手动解决冲突标记
3. 使用 \`git add\` 标记已解决
4. 完成合并提交

### 3. 工具推荐
- VS Code冲突解决工具
- Beyond Compare
- IntelliJ Merge Tool
- GitHub冲突解决界面

### 4. 预防措施
- 频繁合并主干分支
- 小颗粒度提交
- 代码审查机制
- 良好的模块化设计`
  },
  {
    id: 319,
    title: "Git操作撤销指南",
    tags: ["Git", "撤销操作", "版本回退"],
    difficulty: "中等",
    code: `# 撤销工作区修改
git checkout -- <file>

# 撤销暂存区文件
git reset HEAD <file>

# 修改上次提交
git commit --amend

# 回退到指定提交
git reset --hard HEAD~3

# 恢复误删分支
git reflog
git checkout -b <branch> <hash>`,
    answer: `## Git撤销操作大全

### 1. 不同场景撤销
| 场景                | 命令                          |
|---------------------|-------------------------------|
| 撤销工作区修改      | \`git restore <file>\`        |
| 撤销暂存区文件      | \`git restore --staged <file>\`|
| 修改最后提交信息    | \`git commit --amend\`         |
| 回退到历史提交      | \`git reset --hard <commit>\` |
| 恢复误删分支        | \`git reflog\` + 创建新分支     |

### 2. 注意事项
- 慎用 \`--hard\` 选项
- 推送前可强制覆盖
- 已推送提交需使用 revert
- 备份重要更改

### 3. 高级技巧
- 使用 \`git stash\` 暂存当前工作
- \`git cherry-pick\` 选择提交
- \`git revert\` 创建反向提交
- \`git rebase -i\` 交互式变基`
  },
  {
    id: 320,
    title: "Git历史追溯技巧",
    tags: ["Git", "历史记录", "文件跟踪"],
    difficulty: "简单",
    code: `# 查看文件修改历史
git log -p <file>

# 显示文件每一行最后修改
git blame <file>

# 搜索提交信息
git log --grep="login"

# 图形化显示分支
git log --graph --oneline --all

# 按内容搜索提交
git log -S"functionName"`,
    answer: `## Git历史追溯指南

### 1. 常用命令
| 命令                    | 作用                     |
|-------------------------|--------------------------|
| \`git log -p\`          | 显示详细修改内容         |
| \`git show <commit>\`    | 查看特定提交详情         |
| \`git diff <commit1> <commit2>\` | 比较两次提交差异 |
| \`git bisect\`           | 二分法定位问题提交       |

### 2. 高级查询
- 按时间过滤：
  \`git log --since="2023-01-01"\`
- 按作者过滤：
  \`git log --author="name"\`
- 按文件类型：
  \`git log -- '*.js'\`
- 统计代码变化：
  \`git log --stat\`

### 3. 可视化工具
- gitk：内置GUI工具
- VS Code GitLens插件
- SourceTree图形客户端
- GitHub提交历史界面`
  }
];

export default questions320;