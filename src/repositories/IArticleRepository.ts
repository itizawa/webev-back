import { Article, UpdatableProperty } from '../domains/Article';

export interface IArticleRepository {
  createArticle({ article }: { article: Partial<Article> }): Promise<Article>;
  updateArticle({ articleId, property }: { articleId: string; property: UpdatableProperty }): Promise<Article>;
}
