import { Article, UpdatableProperty } from '../../domains/Article';
import { IArticleRepository } from '../../repositories/IArticleRepository';

export class UpdateArticleUseCase {
  constructor(private readonly articleRepository: IArticleRepository) {}

  execute({ articleId, property, userId }: { articleId: string; property: UpdatableProperty; userId: string }): Promise<Article> {
    return this.articleRepository.updateArticle({ articleId, property, userId });
  }
}
