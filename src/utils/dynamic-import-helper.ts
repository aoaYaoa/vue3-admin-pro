/**
 * 动态导入助手 - 错误处理加强版
 */

import { h, defineComponent } from 'vue';
import ErrorComponent from '../components/ErrorComponent.vue';

// 创建一个空白占位组件，用于替代找不到的组件
const PlaceholderComponent = defineComponent({
  name: 'PlaceholderComponent',
  setup() {
    return () => h('div', { class: 'error-placeholder' }, [
      h('h3', '模块加载错误'),
      h('p', '请检查路径和组件是否存在')
    ]);
  }
});

/**
 * 安全加载模块 - 不抛出错误，用错误组件替代
 */
export function loadMappedModule(moduleName: string) {
  try {
    // 使用更直接的导入方式
    return () => import(`@/views/${moduleName}.vue`)
  } catch (error) {
    console.error(`Failed to load module: ${moduleName}`, error)
    return () => import('@/components/ErrorComponent.vue')
  }
}

/**
 * 创建路由组件
 * 用于处理可能不存在的组件
 */
export const createRouteComponent = (path: string) => {
  // 直接返回组件或错误占位符
  return defineComponent({
    name: `DynamicRouteComponent-${path.replace(/\//g, '-')}`,
    setup() {
      return () => h(loadMappedModule(path)());
    }
  });
};

/**
 * 动态导入助手 - 增强版
 * 专门解决Vite环境下的动态导入问题
 */

// Vite需要静态导入路径
// 这里我们预先导入所有可能的视图组件
const modules = import.meta.glob([
  '../views/**/*.vue',
  '../views/**/*.tsx',
  '../views/**/*.jsx'
]);

/**
 * 安全加载视图组件
 * @param viewPath 视图组件路径 (相对于views目录)
 */
export function loadViewComponent(viewPath: string) {
  // 规范化路径
  const normalizedPath = viewPath.startsWith('/') ? viewPath.slice(1) : viewPath;
  const fullPath = `../views/${normalizedPath}.vue`;
  
  // 检查是否有匹配的模块
  if (modules[fullPath]) {
    return modules[fullPath];
  }
  
  // 如果没有找到，返回错误组件
  console.error(`视图组件未找到: ${fullPath}`);
  return () => import('../components/ErrorComponent.vue');
}

/**
 * 懒加载视图组件 - 用于路由配置
 * @param viewPath 组件路径 (相对于views目录)
 */
export function lazyLoadView(viewPath: string) {
  return loadViewComponent(viewPath);
}

/**
 * 动态导入助手
 * 解决Vite中动态导入路径问题
 */

// 为JavaScript/TypeScript模块创建导入路径
export function createImportPath(path: string): string {
  // 确保路径有正确的扩展名
  if (!path.endsWith('.js') && !path.endsWith('.ts') && !path.endsWith('.vue')) {
    // 检查是否有已知的文件扩展名
    const hasExtension = /\.[a-zA-Z0-9]+$/.test(path);
    if (!hasExtension) {
      // 在Vite中，对于JS/TS文件，我们需要显式添加扩展名
      return `${path}.js`;
    }
  }
  return path;
}

/**
 * 安全地动态导入模块
 * @param path 要导入的模块路径
 * @returns Promise<模块>
 */
export async function safeImport(path: string) {
  try {
    const importPath = createImportPath(path);
    return await import(/* @vite-ignore */ importPath);
  } catch (error) {
    console.error(`Failed to import module: ${path}`, error);
    throw error;
  }
}

/**
 * 加载视图组件
 * @param viewPath 视图路径
 */
export function loadView(viewPath: string) {
  return () => import(/* @vite-ignore */ `../views/${viewPath}.vue`);
} 