import { IArticle } from './Article';

export interface IResponse {
  articles: IArticle[];
  status: string;
  totalResults: number;
}
