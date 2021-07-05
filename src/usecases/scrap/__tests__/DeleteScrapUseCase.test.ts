import { generateMockScrap, generateMockUser } from '../../../mock/domains';
import { ScrapRepositoryMock } from '../../../mock/repositories/ScrapRepositoryMock';
import { DeleteScrapUseCase } from '../DeleteScrapUseCase';

describe('DeleteScrapUseCase', () => {
  const mock = new ScrapRepositoryMock();

  const mockScrap = generateMockScrap();
  const mockUser = generateMockUser();

  const useCase = new DeleteScrapUseCase(mock);

  const spy = jest.spyOn(mock, 'deleteScrap').mockImplementation(async () => mockScrap);
  test('execute', async () => {
    const response = await useCase.execute({ scrapId: mockScrap._id, userId: mockUser._id });

    expect(spy).toHaveBeenCalled();
    expect(response).toEqual(mockScrap);
  });
});
