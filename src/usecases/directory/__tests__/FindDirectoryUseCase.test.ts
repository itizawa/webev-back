import { DirectoryRepositoryMock } from '../../../mock/repositories';
import { generateMockDirectory, generateMockUser } from '../../../mock/domains';

import { FindDirectoryUseCase } from '../FindDirectoryUseCase';

describe('FindDirectoryUseCase', () => {
  const mockDirectory = generateMockDirectory();
  const mockUser = generateMockUser();
  const directoryRepositoryMock = new DirectoryRepositoryMock();

  const findDirectorySpy = jest.spyOn(directoryRepositoryMock, 'findDirectory').mockImplementation(async () => generateMockDirectory());

  const useCase = new FindDirectoryUseCase(directoryRepositoryMock);

  test('execute', async () => {
    const response = await useCase.execute({ directoryId: mockDirectory._id, userId: mockUser._id });

    expect(findDirectorySpy).toHaveBeenCalled();
    expect(response).toEqual(generateMockDirectory());
  });
});
