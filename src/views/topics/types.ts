export interface Topic {
    id: number;
    title: string;
    tags: string[];
    difficulty: string;
    // 可以根据需要添加更多字段
    content?: string;
    answer?: string;
} 