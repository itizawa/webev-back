import { Article } from '../../domains/Article';
import { IArticleRepository } from '../../repositories/IArticleRepository';

export class DeleteArticleUseCase {
  constructor(private readonly articleRepository: IArticleRepository) {}

  execute({ articleId, userId }: { articleId: string; userId: string }): Promise<Article> {
    return this.articleRepository.deleteArticle({ articleId, userId });
  }
}
