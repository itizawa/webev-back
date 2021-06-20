import { DirectoryRepositoryMock } from '../../../mock/repositories';
import { generateMockDirectory, generateMockUser } from '../../../mock/domains';

import { UpdateIsPublicOfDirectoryUseCase } from '../UpdateIsPublicOfDirectoryUseCase';

describe('UpdateIsPublicOfDirectoryUseCase', () => {
  const mockDirectory = generateMockDirectory();
  const mockUser = generateMockUser();

  const directoryRepositoryMock = new DirectoryRepositoryMock();
  const updateEmojiSpy = jest.spyOn(directoryRepositoryMock, 'updateIsPublic').mockImplementation(async (mockDirectory, isPublic) => generateMockDirectory({ isPublic }));

  const useCase = new UpdateIsPublicOfDirectoryUseCase(directoryRepositoryMock);

  test('isPublic is true', async () => {
    const response = await useCase.execute(mockDirectory._id, true, mockUser);

    expect(updateEmojiSpy).toHaveBeenCalled();
    expect(response.isPublic).toBe(true);
  });

  test('isPublic is false', async () => {
    const response = await useCase.execute(mockDirectory._id, false, mockUser);

    expect(updateEmojiSpy).toHaveBeenCalled();
    expect(response.isPublic).toBe(false);
  });
});
