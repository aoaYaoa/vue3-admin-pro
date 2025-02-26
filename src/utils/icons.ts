/**
 * 菜单图标配置
 * 集中管理所有菜单图标的样式和显示
 */

import { markRaw } from 'vue'
// 图标配置定义
export interface IconConfig {
  html: string;      // 图标的HTML内容
  class?: string;    // 附加的CSS类名
}

// 全局菜单图标配置
export const menuIcons: Record<string, IconConfig> = {
  // 系统相关
  'system': {
    html: '⚙️',
    class: 'system-icon'
  },
  
  // DevOps
  'devops': {
    html: '🔄',
    class: 'devops-icon'
  },
  
  // 前端基础
  'html-css': {
    html: '&lt;/&gt;',
    class: 'html-icon'
  },
  'javascript': {
    html: 'JS',
    class: 'js-icon'
  },
  'typescript': {
    html: 'TS',
    class: 'ts-icon'
  },
  
  // 框架
  'vue': {
    html: 'v',
    class: 'vue-icon'
  },
  'react': {
    html: '⚛️',
    class: 'react-icon'
  },
  
  // 工程化和性能
  'engineering': {
    html: '🛠️',
    class: 'engineering-icon'
  },
  'performance': {
    html: '⚡',
    class: 'performance-icon'
  },
  'flutter': {
    html: 'f',
    class: 'flutter-icon'
  },
  // 浏览器和网络
  'browser': {
    html: '🌐',
    class: 'browser-icon'
  },
  'network': {
    html: '🔌',
    class: 'network-icon'
  },
  
  // 编程和设计
  'coding': {
    html: '💻',
    class: 'coding-icon'
  },
  'design-pattern': {
    html: '📐',
    class: 'design-icon'
  },
  
  // 系统和服务
  'os': {
    html: '💿',
    class: 'os-icon'
  },
  'server': {
    html: '🖥️',
    class: 'server-icon'
  },
  'database': {
    html: '🗄️',
    class: 'database-icon'
  },
  
  // 业务相关
  'business': {
    html: '💼',
    class: 'business-icon'
  },
  
  // 默认图标
  'default': {
    html: '📄',
    class: 'default-icon'
  }
};

/**
 * 获取菜单图标配置
 * @param title 菜单标题
 * @returns 图标配置对象
 */
function getIconConfig(title: string): IconConfig {

  
  if (!title) {
  
    return menuIcons['default']
  }
  
  // 精确匹配映射 - 确保所有可能的标题都在这里列出
  const exactMatchMap: Record<string, string> = {
    'HTML/CSS': 'html-css',
    'JavaScript': 'javascript',
    'TypeScript': 'typescript',
    'Vue': 'vue',
    'React': 'react',
    'devops': 'devops',
    'devops 题目': 'devops',
    '编程题': 'coding',
    '工程化': 'engineering',
    'flutter': 'flutter',
    '浏览器': 'browser',
    '性能优化': 'performance',
    '设计模式': 'design-pattern',
    '操作系统': 'os',
    '计算机网络': 'network',
    '服务端': 'server',
    '数据库': 'database',
    '业务场景': 'business',
    '系统管理': 'system',
    // 添加子菜单的标题映射
    'HTML/CSS 题目': 'html-css',
    'JavaScript 题目': 'javascript',
    'TypeScript 题目': 'typescript',
    'Vue 题目': 'vue',
    'React 题目': 'react',
    '编程题 题目': 'coding',
    '工程化 题目': 'engineering',
    'flutter 题目': 'flutter',
    '浏览器 题目': 'browser',
    '性能优化 题目': 'performance',
    '设计模式 题目': 'design-pattern',
    '操作系统 题目': 'os',
    '网络 题目': 'network',
    '服务端 题目': 'server',
    '数据库 题目': 'database',
    '业务场景 题目': 'business'
  }
  
  // 尝试精确匹配
  const key = exactMatchMap[title]
  if (key && menuIcons[key]) {
  
    return menuIcons[key]
  }
  
  
  return menuIcons['default']
}

export default getIconConfig