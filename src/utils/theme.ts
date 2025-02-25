export type ThemeType = 'light' | 'dark' | 'system';

// 主题设置
export const setTheme = (theme: ThemeType): void => {
  const html = document.documentElement;
  
  if (theme === 'system') {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    html.setAttribute('data-theme', isDark ? 'dark' : 'light');
  } else {
    html.setAttribute('data-theme', theme);
  }
  
  localStorage.setItem('theme', theme);
};

// 获取当前主题
export const getTheme = (): ThemeType => {
  return (localStorage.getItem('theme') as ThemeType) || 'system';
};

// 初始化主题
export const initTheme = (): void => {
  const savedTheme = getTheme();
  setTheme(savedTheme);
  
  // 监听系统主题变化
  if (savedTheme === 'system') {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      setTheme('system');
    });
  }
}; 