type ArticleContent =
  | { type: 'draft' }
  | { type: 'published'; description: string; isNew: boolean };

export type ArticleType = ArticleContent['type'];

export type Article = {
  id: string;
  title: string;
  content: ArticleContent;
};

export type CreateArticle = {
  title: string;
  content: ArticleContent;
};
