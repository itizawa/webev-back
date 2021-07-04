import { generateMockArticle, generateMockUser } from '../../../mock/domains';
import { ArticleRepositoryMock } from '../../../mock/repositories/ArticleRepositoryMock';
import { DeleteArticleUseCase } from '../DeleteArticleUseCase';

describe('DeleteArticleUseCase', () => {
  const mock = new ArticleRepositoryMock();

  const mockArticle = generateMockArticle();
  const mockUser = generateMockUser();

  const useCase = new DeleteArticleUseCase(mock);

  const spy = jest.spyOn(mock, 'deleteArticle').mockImplementation(async () => mockArticle);
  test('execute', async () => {
    const response = await useCase.execute({ articleId: mockArticle._id, userId: mockUser._id });

    expect(spy).toHaveBeenCalled();
    expect(response).toEqual(mockArticle);
  });
});
