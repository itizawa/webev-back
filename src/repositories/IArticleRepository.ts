import { Article, UpdatableProperty } from '../domains/Article';

export interface IArticleRepository {
  createArticle({ article }: { article: Partial<Article> }): Promise<Article>;
  deleteArticle({ articleId, userId }: { articleId: string; userId: string }): Promise<Article>;
  updateArticle({ articleId, property }: { articleId: string; property: UpdatableProperty }): Promise<Article>;
}
