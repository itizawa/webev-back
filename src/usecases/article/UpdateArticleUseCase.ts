import { Article, UpdatableProperty } from '../../domains/Article';
import { IArticleRepository } from '../../repositories/IArticleRepository';

export class UpdateArticleUseCase {
  constructor(private readonly articleRepository: IArticleRepository) {}

  execute({ articleId, property }: { articleId: string; property: UpdatableProperty }): Promise<Article> {
    return this.articleRepository.updateArticle({ articleId, property });
  }
}
