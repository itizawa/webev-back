import { generateMockPage, generateMockUser, PageRepositoryMock } from '../../../mock';
import { FavoritePageUseCase } from '../FavoritePageUseCase';

describe('FavoritePageUseCase', () => {
  const mockPage = generateMockPage();
  const mockUser = generateMockUser();
  const mock = new PageRepositoryMock();

  mock.updateIsFavorite = async (_id, userId, isFavorite) => generateMockPage({ _id, createdUser: userId, isFavorite });

  const useCase = new FavoritePageUseCase(mock);

  const spy = jest.spyOn(mock, 'updateIsFavorite');
  test('excute with isFavorite is true', async () => {
    const response = await useCase.execute(mockPage._id, mockUser, true);

    expect(spy).toHaveBeenCalled();
    expect(response.isFavorite).toBe(true);
  });

  test('excute with isFavorite is false', async () => {
    const response = await useCase.execute(mockPage._id, mockUser, false);

    expect(spy).toHaveBeenCalled();
    expect(response.isFavorite).toBe(false);
  });
});
