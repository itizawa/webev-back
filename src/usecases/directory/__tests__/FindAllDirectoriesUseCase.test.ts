import { DirectoryRepositoryMock } from '../../../mock/repositories';
import { generateMockDirectory, generateMockUser } from '../../../mock/domains';

import { FindAllDirectoriesUseCase } from '../FindAllDirectoriesUseCase';

describe('FindAllDirectoriesUseCase', () => {
  const mockUser = generateMockUser();
  const directoryRepositoryMock = new DirectoryRepositoryMock();

  const findAllDirectoriesSpy = jest.spyOn(directoryRepositoryMock, 'findAllDirectories').mockImplementation(async () => [generateMockDirectory()]);

  const useCase = new FindAllDirectoriesUseCase(directoryRepositoryMock);

  test('execute', async () => {
    const response = await useCase.execute(mockUser);

    expect(findAllDirectoriesSpy).toHaveBeenCalled();
    expect(response).toEqual([generateMockDirectory()]);
  });
});
