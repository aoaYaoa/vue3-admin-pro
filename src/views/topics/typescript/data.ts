// TypeScript 题目列表数据
interface Topic {
    id: number;
    title: string;
    tags: string[];
    difficulty: string;
}

export const topicList: Topic[] = [
    {
        id: 1,
        title: 'TypeScript 中的接口与类型别名区别',
        tags: ['接口', '类型', '基础'],
        difficulty: '中等'
    },
    {
        id: 2,
        title: '泛型的使用场景及优势',
        tags: ['泛型', '高级类型'],
        difficulty: '中等'
    },
    // ... 其他 TypeScript 题目
]; 