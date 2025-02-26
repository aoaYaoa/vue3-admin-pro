// JavaScript 题目列表数据
import allQuestions from './data/index.ts';
// 使用类型断言
const typedQuestions = allQuestions as any[];

interface Topic {
  id: number;
  title: string;
  tags: string[];
  difficulty: string;
  code?: string;
  answer?: string;
}

export const topicList: Topic[] = [
  ...typedQuestions
];


