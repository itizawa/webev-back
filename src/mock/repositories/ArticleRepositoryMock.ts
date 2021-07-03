/* eslint-disable @typescript-eslint/no-unused-vars */
import { Article, UpdatableProperity } from '../../domains/Article';
import { IArticleRepository } from '../../repositories/IArticleRepository';

export class ArticleRepositoryMock implements IArticleRepository {
  createArticle({ article }: { article: Article }): Promise<Article> {
    throw new Error('Method not implemented.');
  }
  updateArticle({ articleId, properity }: { articleId: string; properity: UpdatableProperity }): Promise<Article> {
    throw new Error('Method not implemented.');
  }
}
