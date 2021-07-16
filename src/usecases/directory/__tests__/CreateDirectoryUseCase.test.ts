import { generateMockUser } from '../../../mock/domains';
import { DirectoryRepositoryMock } from '../../../mock/repositories/DirectoryRepositoryMock';
import { DirectoryTreeRepositoryMock } from '../../../mock/repositories/DirectoryTreeRepositoryMock';
import { generateMockDirectory } from '../../../mock/domains/generateMockDirectory';
import { generateMockDirectoryTree } from '../../../mock/domains/generateMockDirectoryTree';

import { CreateDirectoryUseCase } from '../CreateDirectoryUseCase';

describe('CreateDirectoryUseCase', () => {
  const mockUser = generateMockUser();
  const mockDirectory = generateMockDirectory();
  const directoryRepositoryMock = new DirectoryRepositoryMock();
  const directoryTreeRepositoryMock = new DirectoryTreeRepositoryMock();

  directoryRepositoryMock.createDirectory = async ({ directory: { name, createdUser, order, isRoot } }) => generateMockDirectory({ name, createdUser, order, isRoot });
  const createDirectorySpy = jest.spyOn(directoryRepositoryMock, 'createDirectory');

  directoryTreeRepositoryMock.createSelfReference = async ({ directoryId }) => generateMockDirectoryTree({ _id: directoryId });
  directoryTreeRepositoryMock.createPathAsDescendant = async ({ ancestorId, descendantId }) => {
    console.log(ancestorId, descendantId);
  };
  const createSelfReferenceSpy = jest.spyOn(directoryTreeRepositoryMock, 'createSelfReference');
  const createPathAsDescendantSpy = jest.spyOn(directoryTreeRepositoryMock, 'createPathAsDescendant');

  const useCase = new CreateDirectoryUseCase(directoryRepositoryMock, directoryTreeRepositoryMock);

  test('CreateDirectoryUseCase with directoryId', async () => {
    const response = await useCase.execute({ name: 'directory name', userId: mockUser._id, parentDirectoryId: mockDirectory._id });

    expect(createDirectorySpy).toHaveBeenCalled();
    expect(createSelfReferenceSpy).toHaveBeenCalled();
    expect(createPathAsDescendantSpy).toHaveBeenCalled();

    expect(response.name).toBe('directory name');
    expect(response.isRoot).toBe(false);
  });

  test('CreateDirectoryUseCase without directoryId', async () => {
    directoryRepositoryMock.countDirectoryByUserId = async () => 1;
    const countDirectoryByUserIdSpy = jest.spyOn(directoryRepositoryMock, 'countDirectoryByUserId');

    const response = await useCase.execute({ name: 'directory name', userId: mockUser._id });

    expect(countDirectoryByUserIdSpy).toHaveBeenCalled();
    expect(createDirectorySpy).toHaveBeenCalled();
    expect(createSelfReferenceSpy).toHaveBeenCalled();

    expect(response.order).toBe(2);
    expect(response.name).toBe('directory name');
    expect(response.isRoot).toBe(true);
  });

  test('CreateDirectoryUseCase with directoryId more than 10 directory', async () => {
    directoryRepositoryMock.countDirectoryByUserId = async () => 10;

    try {
      await useCase.execute({ name: 'directory name', userId: mockUser._id });
    } catch (e) {
      expect(e).toEqual(new Error('can not make more than 10'));
    }
  });
});
