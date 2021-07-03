import { Article, UpdatableProperity } from '../../domains/Article';
import { IArticleRepository } from '../../repositories/IArticleRepository';

export class UpdateArticleUseCase {
  constructor(private readonly articleRepository: IArticleRepository) {}

  execute({ articleId, properity }: { articleId: string; properity: UpdatableProperity }): Promise<Article> {
    return this.articleRepository.updateArticle({ articleId, properity });
  }
}
