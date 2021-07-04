/* eslint-disable @typescript-eslint/no-unused-vars */
import { Article, UpdatableProperty } from '../../domains/Article';
import { IArticleRepository } from '../../repositories/IArticleRepository';

export class ArticleRepositoryMock implements IArticleRepository {
  createArticle({ article }: { article: Article }): Promise<Article> {
    throw new Error('Method not implemented.');
  }
  deleteArticle({ articleId, userId }: { articleId: string; userId: string }): Promise<Article> {
    throw new Error('Method not implemented.');
  }
  updateArticle({ articleId, property, userId }: { articleId: string; property: UpdatableProperty; userId: string }): Promise<Article> {
    throw new Error('Method not implemented.');
  }
}
