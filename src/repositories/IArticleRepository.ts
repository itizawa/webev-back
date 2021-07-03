import { Article, UpdatableProperity } from '../domains/Article';

export interface IArticleRepository {
  createArticle({ article }: { article: Partial<Article> }): Promise<Article>;
  updateArticle({ articleId, properity }: { articleId: string; properity: UpdatableProperity }): Promise<Article>;
}
