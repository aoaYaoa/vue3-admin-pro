// JavaScript 题目列表数据
import allQuestions from './data/index.js';
// 使用类型断言
const typedQuestions = allQuestions as any[];

export interface Topic {
  id: number;
  title: string;
  tags: string[];
  difficulty: string;
  answer?: string;
  code?: string;
}

export const topicList: Topic[] = [
  ...typedQuestions
];


