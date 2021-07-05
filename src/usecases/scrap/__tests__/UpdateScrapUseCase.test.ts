import { generateMockScrap, generateMockUser } from '../../../mock/domains';
import { ScrapRepositoryMock } from '../../../mock/repositories/ScrapRepositoryMock';
import { UpdateScrapUseCase } from '../UpdateScrapUseCase';

describe('UpdateScrapUseCase', () => {
  const mock = new ScrapRepositoryMock();

  const mockScrap = generateMockScrap();
  const mockUser = generateMockUser();

  const useCase = new UpdateScrapUseCase(mock);

  const spy = jest.spyOn(mock, 'updateScrap').mockImplementation(async () => mockScrap);
  test('execute', async () => {
    const response = await useCase.execute({ scrapId: mockScrap._id, property: mockScrap, userId: mockUser._id });

    expect(spy).toHaveBeenCalled();
    expect(response).toEqual(mockScrap);
  });
});
