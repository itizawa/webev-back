import { DirectoryTreeRepositoryMock } from '../../../mock/repositories';
import { generateMockDirectory } from '../../../mock/domains/generateMockDirectory';
import { generateMockDirectoryTree } from '../../../mock/domains/generateMockDirectoryTree';

import { FindChildrenDirectoriesUseCase } from '../FindChildrenDirectoriesUseCase';

describe('FindChildrenDirectoriesUseCase', () => {
  const mockDirectory = generateMockDirectory();
  const directoryTreeRepositoryMock = new DirectoryTreeRepositoryMock();

  const findChildrenDirectoriesSpy = jest.spyOn(directoryTreeRepositoryMock, 'findChildrenDirectories').mockImplementation(async () => {
    return [generateMockDirectoryTree()];
  });

  const useCase = new FindChildrenDirectoriesUseCase(directoryTreeRepositoryMock);

  test('execute', async () => {
    const response = await useCase.execute({ parentDirectoryId: mockDirectory._id });

    expect(findChildrenDirectoriesSpy).toHaveBeenCalled();
    expect(response).toEqual([generateMockDirectoryTree()]);
  });
});
