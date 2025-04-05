import { Article, CreateArticle, UpdateArticle } from './types';

const generateId = () => Date.now().toString(36) + Math.random().toString(36);

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const STORAGE_KEY = 'articles_db';
const DELAY_TIME = 1000;

export const articleAPI = {
  createArticle: async (article: CreateArticle): Promise<Article> => {
    await delay(DELAY_TIME);

    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      const articleId = generateId();
      const newArticle = {
        ...article,
        id: articleId,
      };
      stored[articleId] = newArticle;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));

      return newArticle;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to save article');
    }
  },

  updateArticle: async ({
    id,
    articleUpdate,
  }: {
    id: string;
    articleUpdate: UpdateArticle;
  }): Promise<Article> => {
    await delay(DELAY_TIME);

    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      const article = {
        ...articleUpdate,
        id,
      };
      stored[id] = article;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));

      return article;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to save article');
    }
  },

  getArticle: async (id: string): Promise<Article | null> => {
    await delay(DELAY_TIME);

    const rawData = localStorage.getItem(STORAGE_KEY);

    if (!rawData) {
      return null;
    }

    const normalizedData = JSON.parse(rawData);

    return normalizedData[id];
  },

  getArticles: async (): Promise<Article[]> => {
    await delay(DELAY_TIME);

    const rawData = localStorage.getItem(STORAGE_KEY);

    if (!rawData) {
      return [];
    }

    const normalizedData = JSON.parse(rawData);
    const articles = Object.values(normalizedData) as Article[];

    return articles;
  },

  deleteArticle: async (id: string): Promise<boolean> => {
    await delay(DELAY_TIME);

    try {
      const data = localStorage.getItem(STORAGE_KEY);

      if (!data) {
        return false;
      }

      const stored = JSON.parse(data);
      delete stored[id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
};
