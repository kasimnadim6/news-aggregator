import { IArticle } from '../interface/Article';

export const filterArticles = (articles: IArticle[]) => {
  if (articles.length === 0) return articles;
  // filter the records that doesn't have data
  return articles.filter(
    (article: IArticle) =>
      !JSON.stringify(Object.values(article)).includes('[Removed]')
  );
};
