// Vue 题目列表数据
interface Topic {
    id: number;
    title: string;
    tags: string[];
    difficulty: string;
}

export const topicList: Topic[] = [
    {
        id: 1,
        title: 'Vue 生命周期钩子函数及其应用',
        tags: ['生命周期', '基础', 'Vue 2/3'],
        difficulty: '中等'
    },
    {
        id: 2,
        title: 'Vue 中的计算属性与方法的区别',
        tags: ['计算属性', '方法', '性能'],
        difficulty: '简单'
    },
    // ... 其他 Vue 题目
]; 