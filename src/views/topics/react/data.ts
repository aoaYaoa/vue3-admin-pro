// React 题目列表数据
interface Topic {
    id: number;
    title: string;
    tags: string[];
    difficulty: string;
}

export const topicList: Topic[] = [
    {
        id: 1,
        title: 'React 中的组件生命周期',
        tags: ['生命周期', '基础', 'Class组件'],
        difficulty: '中等'
    },
    {
        id: 2,
        title: 'Hooks 的优势及常用钩子函数',
        tags: ['Hooks', '函数组件'],
        difficulty: '中等'
    },
    // ... 其他 React 题目
]; 