import { DirectoryRepositoryMock } from '../../../mock/repositories';
import { generateMockDirectory, generateMockUser } from '../../../mock/domains';

import { UpdateIsPublicOfDirectoryUseCase } from '../UpdateIsPublicOfDirectoryUseCase';

describe('UpdateIsPublicOfDirectoryUseCase', () => {
  const mockDirectory = generateMockDirectory();
  const mockUser = generateMockUser();

  const directoryRepositoryMock = new DirectoryRepositoryMock();
  const updateEmojiSpy = jest
    .spyOn(directoryRepositoryMock, 'updateIsPublic')
    .mockImplementation(async ({ directoryId, isPublic }) => generateMockDirectory({ _id: directoryId, isPublic }));

  const useCase = new UpdateIsPublicOfDirectoryUseCase(directoryRepositoryMock);

  test('isPublic is true', async () => {
    const response = await useCase.execute({ directoryId: mockDirectory._id, isPublic: true, userId: mockUser._id });

    expect(updateEmojiSpy).toHaveBeenCalled();
    expect(response.isPublic).toBe(true);
  });

  test('isPublic is false', async () => {
    const response = await useCase.execute({ directoryId: mockDirectory._id, isPublic: false, userId: mockUser._id });

    expect(updateEmojiSpy).toHaveBeenCalled();
    expect(response.isPublic).toBe(false);
  });
});
