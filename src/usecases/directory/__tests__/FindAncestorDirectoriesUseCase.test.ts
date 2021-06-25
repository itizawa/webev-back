import { DirectoryTreeRepositoryMock } from '../../../mock/repositories';
import { generateMockDirectory } from '../../../mock/domains/generateMockDirectory';
import { generateMockDirectoryTree } from '../../../mock/domains/generateMockDirectoryTree';

import { FindAncestorDirectoriesUseCase } from '../FindAncestorDirectoriesUseCase';

describe('FindAncestorDirectoriesUseCase', () => {
  const mockDirectory = generateMockDirectory();
  const directoryTreeRepositoryMock = new DirectoryTreeRepositoryMock();

  const findAncestorDirectoriesSpy = jest.spyOn(directoryTreeRepositoryMock, 'findAncestorDirectories').mockImplementation(async () => {
    return [generateMockDirectoryTree()];
  });

  const useCase = new FindAncestorDirectoriesUseCase(directoryTreeRepositoryMock);

  test('execute', async () => {
    const response = await useCase.execute({ directoryId: mockDirectory._id });

    expect(findAncestorDirectoriesSpy).toHaveBeenCalled();
    expect(response).toEqual([generateMockDirectoryTree()]);
  });
});
