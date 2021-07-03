import { Article } from '../../domains/Article';
import { IArticleRepository } from '../../repositories/IArticleRepository';

export class CreateArticleUseCase {
  constructor(private readonly articleRepository: IArticleRepository) {}

  execute({ article }: { article: Partial<Article> }): Promise<Article> {
    return this.articleRepository.createArticle({ article });
  }
}
