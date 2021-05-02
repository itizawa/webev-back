import { PageRepositoryMock } from '../../../mock';
import { CountAllPagesUseCase } from '../CountAllPagesUseCase';

describe('CountAllPagesUseCase', () => {
  const mock = new PageRepositoryMock();
  mock.countAllPages = async () => 100;

  const useCase = new CountAllPagesUseCase(mock);

  const spy = jest.spyOn(mock, 'countAllPages');
  test('excute', async () => {
    const response = await useCase.execute();
    console.log(response);

    expect(spy).toHaveBeenCalled();
    expect(response).toBe(100);
  });
});
