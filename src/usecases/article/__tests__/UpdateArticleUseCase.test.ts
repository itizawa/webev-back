import { generateMockArticle } from '../../../mock/domains';
import { ArticleRepositoryMock } from '../../../mock/repositories/ArticleRepositoryMock';
import { UpdateArticleUseCase } from '../UpdateArticleUseCase';

describe('UpdateArticleUseCase', () => {
  const mock = new ArticleRepositoryMock();

  const mockArticle = generateMockArticle();

  const useCase = new UpdateArticleUseCase(mock);

  const spy = jest.spyOn(mock, 'updateArticle').mockImplementation(async () => mockArticle);
  test('execute', async () => {
    const response = await useCase.execute({ articleId: mockArticle._id, properity: mockArticle });

    expect(spy).toHaveBeenCalled();
    expect(response).toEqual(mockArticle);
  });
});
