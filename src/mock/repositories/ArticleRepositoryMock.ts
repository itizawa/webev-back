/* eslint-disable @typescript-eslint/no-unused-vars */
import { Article } from '../../domains/Article';
import { IArticleRepository } from '../../repositories/IArticleRepository';

export class ArticleRepositoryMock implements IArticleRepository {
  createArticle({ article }: { article: Article }): Promise<Article> {
    throw new Error('Method not implemented.');
  }
}
