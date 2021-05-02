import { generateMockPaginationQuery } from '../../../mock/interfaces/generateMockPaginationQuery';
import { generateMockPaginationOptions } from '../../../mock/interfaces/generateMockPaginationOptions';
import { generateMockPage, PageRepositoryMock } from '../../../mock';
import { FindPageListUseCase } from '../FindPageListUseCase';

describe('FindPageListUseCase', () => {
  const mockPage = generateMockPage();
  const mock = new PageRepositoryMock();

  mock.findPageList = async () => generateMockPage();

  const useCase = new FindPageListUseCase(mock);

  const spy = jest.spyOn(mock, 'findPageList');
  test('excute', async () => {
    const response = await useCase.execute(generateMockPaginationQuery(), generateMockPaginationOptions());

    expect(spy).toHaveBeenCalled();
    expect(response._id).toBe(mockPage._id);
  });
});
