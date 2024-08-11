export interface IArticle {
  author: string;
  title: string;
  content: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: ISource;
}

export interface ISource {
  id: string;
  name: string;
}
