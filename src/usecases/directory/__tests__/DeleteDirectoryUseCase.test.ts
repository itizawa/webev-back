import { generateMockUser } from '../../../mock/domains';

import { DirectoryRepositoryMock, DirectoryTreeRepositoryMock, PageRepositoryMock } from '../../../mock/repositories';
import { generateMockDirectory } from '../../../mock/domains/generateMockDirectory';

import { DeleteDirectoryUseCase } from '../DeleteDirectoryUseCase';

describe('DeleteDirectoryUseCase', () => {
  const mockUser = generateMockUser();
  const mockDirectory = generateMockDirectory();
  const directoryRepositoryMock = new DirectoryRepositoryMock();
  const directoryTreeRepositoryMock = new DirectoryTreeRepositoryMock();
  const pageRepositoryMock = new PageRepositoryMock();

  const decreaseDirectorySpy = jest.spyOn(directoryRepositoryMock, 'decreaseDirectory').mockImplementation();
  const deleteDirectoryTreeSpy = jest.spyOn(directoryTreeRepositoryMock, 'deleteDirectoryTree').mockImplementation();
  const findByDirectoryIdAndDeleteDirectoryIdSpy = jest.spyOn(pageRepositoryMock, 'findByDirectoryIdAndDeleteDirectoryId').mockImplementation();

  const useCase = new DeleteDirectoryUseCase(directoryRepositoryMock, directoryTreeRepositoryMock, pageRepositoryMock);

  test('DeleteDirectoryUseCase: isRoot is false', async () => {
    const deleteDirectorySpy = jest
      .spyOn(directoryRepositoryMock, 'deleteDirectory')
      .mockImplementation(async (directoryId, userId) => generateMockDirectory({ _id: directoryId, createdUser: userId, isRoot: true }));
    const response = await useCase.execute(mockDirectory._id, mockUser);

    expect(findByDirectoryIdAndDeleteDirectoryIdSpy).toHaveBeenCalled();
    expect(deleteDirectorySpy).toHaveBeenCalled();
    expect(decreaseDirectorySpy).toHaveBeenCalled();
    expect(deleteDirectoryTreeSpy).toHaveBeenCalled();

    expect(response.isRoot).toBe(true);
    decreaseDirectorySpy.mockClear();
  });

  test('DeleteDirectoryUseCase: isRoot is true', async () => {
    const deleteDirectorySpy = jest
      .spyOn(directoryRepositoryMock, 'deleteDirectory')
      .mockImplementation(async (directoryId, userId) => generateMockDirectory({ _id: directoryId, createdUser: userId, isRoot: false }));
    const response = await useCase.execute(mockDirectory._id, mockUser);

    expect(findByDirectoryIdAndDeleteDirectoryIdSpy).toHaveBeenCalled();
    expect(deleteDirectorySpy).toHaveBeenCalled();
    expect(decreaseDirectorySpy).not.toHaveBeenCalled();
    expect(deleteDirectoryTreeSpy).toHaveBeenCalled();

    expect(response.isRoot).toBe(false);
  });
});
