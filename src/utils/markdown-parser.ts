import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

// 设置 marked 选项
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-',
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});

/**
 * 渲染Markdown内容为HTML
 * @param content Markdown格式的内容
 * @returns 解析后的HTML
 */
export function renderMarkdown(content: string): string {
  if (!content) return '';
  return marked(content);
}

// 添加复制代码功能到全局
if (typeof window !== 'undefined') {
  window.copyCodeToClipboard = function(button: HTMLButtonElement) {
    const codeBlock = button.parentElement?.nextElementSibling?.querySelector('code');
    const text = codeBlock?.textContent || '';
    
    navigator.clipboard.writeText(text)
      .then(() => {
        // 显示复制成功提示
        const original = button.innerHTML;
        button.innerHTML = '<i class="el-icon-check"></i>';
        setTimeout(() => {
          button.innerHTML = original;
        }, 2000);
      })
      .catch(err => {
        console.error('复制失败:', err);
      });
  };
} 