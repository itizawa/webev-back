import { generateMockScrap } from '../../../mock/domains';
import { ScrapRepositoryMock } from '../../../mock/repositories/ScrapRepositoryMock';
import { CreateScrapUseCase } from '../CreateScrapUseCase';

describe('CreateScrapUseCase', () => {
  const mock = new ScrapRepositoryMock();

  const mockScrap = generateMockScrap();

  const useCase = new CreateScrapUseCase(mock);

  const spy = jest.spyOn(mock, 'createScrap').mockImplementation(async () => mockScrap);
  test('execute', async () => {
    const response = await useCase.execute({ scrap: mockScrap });

    expect(spy).toHaveBeenCalled();
    expect(response).toEqual(mockScrap);
  });
});
