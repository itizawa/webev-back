import { Article } from "src/domains/Article";

export interface IArticleRepository {
  createArticle({ article }: { article: Partial<Article> }): Promise<Article>;
}
