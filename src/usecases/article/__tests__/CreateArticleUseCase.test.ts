import { generateMockArticle } from '../../../mock/domains';
import { ArticleRepositoryMock } from '../../../mock/repositories/ArticleRepositoryMock';
import { CreateArticleUseCase } from '../CreateArticleUseCase';

describe('CreateArticleUseCase', () => {
  const mock = new ArticleRepositoryMock();

  const mockArticle = generateMockArticle();

  const useCase = new CreateArticleUseCase(mock);

  const spy = jest.spyOn(mock, 'createArticle').mockImplementation(async () => mockArticle);
  test('execute', async () => {
    const response = await useCase.execute({ article: mockArticle });

    expect(spy).toHaveBeenCalled();
    expect(response).toEqual(mockArticle);
  });
});
