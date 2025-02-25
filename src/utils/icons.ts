/**
 * 菜单图标配置
 * 集中管理所有菜单图标的样式和显示
 */

// 图标配置定义
export interface IconConfig {
  html: string;      // 图标的HTML内容
  class?: string;    // 附加的CSS类名
}

// 全局菜单图标配置
export const menuIcons: Record<string, IconConfig> = {
  // 前端相关
  'html-css': {
    html: '<span class="html-icon">&lt;/&gt;</span>',
    class: 'html-icon-wrapper'
  },
  'javascript': {
    html: '<span class="js-icon">JS</span>',
    class: 'js-icon-wrapper'
  },
  'typescript': {
    html: '<span class="ts-icon">TS</span>',
    class: 'ts-icon-wrapper'
  },
  'vue': {
    html: '<span class="vue-text">V</span>',
    class: 'vue-icon'
  },
  'react': {
    html: '<span class="react-text">⚛</span>',
    class: 'react-icon'
  },
  
  // 新增更丰富的图标
  'algorithm': {
    html: '📊',
    class: 'algorithm-icon'
  },
  'security': {
    html: '🔒',
    class: 'security-icon'
  },
  'mobile': {
    html: '📱',
    class: 'mobile-icon'
  },
  'ai': {
    html: '🧠',
    class: 'ai-icon'
  },
  
  // 保留其他现有图标...
  'coding': {
    html: '💻'
  },
  'engineering': {
    html: '🔧'
  },
  'browser': {
    html: '🌎'
  },
  'performance': {
    html: '⚡'
  },
  'design-pattern': {
    html: '📐'
  },
  
  // 后端与系统
  'os': {
    html: '💾'
  },
  'network': {
    html: '🌐'
  },
  'devops': {
    html: '🔄'
  },
  'server': {
    html: '🖥️'
  },
  'database': {
    html: '🗃️'
  },
  
  // 系统菜单
  'dashboard': {
    html: '🏠'
  },
  'system': {
    html: '⚙️'
  },
  
  // 默认图标
  'default': {
    html: '📑'
  }
};

/**
 * 获取菜单图标配置
 * @param title 菜单标题
 * @returns 图标配置对象
 */
export function getIconConfig(title: string): IconConfig {
  if (!title) return menuIcons['default'];
  
  // 精确匹配标题
  const exactMatchMap: Record<string, string> = {
    'HTML + CSS 题目': 'html-css',
    'Javascript 题目': 'javascript',
    'Typescript 题目': 'typescript',
    '代码编程 题目': 'coding',
    'Vue 生态 题目': 'vue',
    'React 生态 题目': 'react',
    '前端构建 & 工程化 题目': 'engineering',
    '浏览器 题目': 'browser',
    '前端性能 题目': 'performance',
    '设计模式 题目': 'design-pattern',
    '操作系统 题目': 'os',
    '计算机网络 题目': 'network',
    'DevOps 题目': 'devops',
    '服务端 题目': 'server',
    '数据库 题目': 'database',
    '首页': 'dashboard',
    '系统管理': 'system'
  };
  
  // 尝试精确匹配
  const exactKey = exactMatchMap[title];
  if (exactKey && menuIcons[exactKey]) {
    return menuIcons[exactKey];
  }
  
  // 模糊匹配
  const titleLower = title.toLowerCase();
  
  if (titleLower.includes('html') || titleLower.includes('css')) return menuIcons['html-css'];
  if (titleLower.includes('javascript')) return menuIcons['javascript'];
  if (titleLower.includes('typescript')) return menuIcons['typescript'];
  if (titleLower.includes('vue')) return menuIcons['vue'];
  if (titleLower.includes('react')) return menuIcons['react'];
  if (titleLower.includes('编程')) return menuIcons['coding'];
  if (titleLower.includes('工程化') || titleLower.includes('构建')) return menuIcons['engineering'];
  if (titleLower.includes('浏览器')) return menuIcons['browser'];
  if (titleLower.includes('性能')) return menuIcons['performance'];
  if (titleLower.includes('设计模式')) return menuIcons['design-pattern'];
  if (titleLower.includes('操作系统')) return menuIcons['os'];
  if (titleLower.includes('网络')) return menuIcons['network'];
  if (titleLower.includes('devops')) return menuIcons['devops'];
  if (titleLower.includes('服务端')) return menuIcons['server'];
  if (titleLower.includes('数据库')) return menuIcons['database'];
  if (titleLower.includes('系统')) return menuIcons['system'];
  
  // 返回默认图标
  return menuIcons['default'];
}

// 图标映射表 - 使用SVG图标名称
export const iconMap = {
  // 系统图标
  dashboard: 'dashboard',
  system: 'system',
  user: 'user',
  role: 'role',
  
  // 技术主题图标
  html: 'html',
  javascript: 'javascript',
  typescript: 'typescript',
  vue: 'vue',
  react: 'react',
  database: 'database',
  network: 'network',
  engineering: 'engineering',
  server: 'server',
  coding: 'coding',
  business: 'business',
  browser: 'browser',
  performance: 'performance',
  design: 'design',
  os: 'os',
  devops: 'devops'
}

/**
 * 获取图标
 * @param name 图标名称
 * @returns 图标名称
 */
export function getIcon(name: string): string {
  if (!name) return ''
  
  // 返回映射中的图标名称
  return iconMap[name] || 'document' // 默认图标
}

/**
 * 根据路径获取图标名称
 * @param path 路径
 * @returns 图标名称
 */
export function getIconByPath(path: string): string {
  if (!path) return 'document'
  
  // 提取路径的最后一段
  const segment = path.split('/').pop() || ''
  
  // 返回映射的图标名称或默认图标
  return iconMap[segment] || 'document'
} 