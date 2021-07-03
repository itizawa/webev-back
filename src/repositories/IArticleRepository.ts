import { Article } from '../domains/Article';

export interface IArticleRepository {
  createArticle({ article }: { article: Partial<Article> }): Promise<Article>;
  updateArticle({ article }: { article: Partial<Article> }): Promise<Article>;
}
