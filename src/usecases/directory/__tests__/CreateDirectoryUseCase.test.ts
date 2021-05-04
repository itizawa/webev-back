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

  directoryRepositoryMock.countDirectoryByUserId = async () => 1;
  directoryRepositoryMock.createDirectory = async ({ name, createdUser, order, isRoot }) => generateMockDirectory({ name, createdUser, order, isRoot });
  const countDirectoryByUserIdSpy = jest.spyOn(directoryRepositoryMock, 'countDirectoryByUserId');
  const createDirectorySpy = jest.spyOn(directoryRepositoryMock, 'createDirectory');

  directoryTreeRepositoryMock.createSelfReference = async (_id) => generateMockDirectoryTree({ _id });
  directoryTreeRepositoryMock.createPathAsDescendant = async (ancestorId, descendantId) => {
    console.log(ancestorId, descendantId);
  };
  const createSelfReferenceSpy = jest.spyOn(directoryTreeRepositoryMock, 'createSelfReference');
  const createPathAsDescendantSpy = jest.spyOn(directoryTreeRepositoryMock, 'createPathAsDescendant');

  const useCase = new CreateDirectoryUseCase(directoryRepositoryMock, directoryTreeRepositoryMock);

  test('CreateDirectoryUseCase with directoryId', async () => {
    const response = await useCase.execute('directory name', mockUser, mockDirectory._id);

    expect(createDirectorySpy).toHaveBeenCalled();
    expect(createSelfReferenceSpy).toHaveBeenCalled();
    expect(createPathAsDescendantSpy).toHaveBeenCalled();

    expect(response.name).toBe('directory name');
    expect(response.isRoot).toBe(false);
  });

  test('CreateDirectoryUseCase without directoryId', async () => {
    const response = await useCase.execute('directory name', mockUser);

    expect(countDirectoryByUserIdSpy).toHaveBeenCalled();
    expect(createDirectorySpy).toHaveBeenCalled();
    expect(createSelfReferenceSpy).toHaveBeenCalled();

    expect(response.order).toBe(2);
    expect(response.name).toBe('directory name');
    expect(response.isRoot).toBe(true);
  });
});
