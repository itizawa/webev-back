import { DirectoryRepositoryMock } from '../../../mock/repositories';
import { generateMockDirectory, generateMockUser } from '../../../mock/domains';

import { UpdateEmojiOfDirectoryUsecase } from '../UpdateEmojiOfDirectoryUseCase';

describe('UpdateEmojiOfDirectoryUsecase', () => {
  const mockDirectory = generateMockDirectory();
  const mockUser = generateMockUser();
  const directoryRepositoryMock = new DirectoryRepositoryMock();
  const updateEmojiSpy = jest.spyOn(directoryRepositoryMock, 'updateEmoji').mockImplementation(async () => generateMockDirectory({ emojiId: 'hoge' }));

  const useCase = new UpdateEmojiOfDirectoryUsecase(directoryRepositoryMock);

  test('execute', async () => {
    const response = await useCase.execute(mockDirectory._id, 'hoge', mockUser._id);

    expect(updateEmojiSpy).toHaveBeenCalled();
    expect(response.emojiId).toBe('hoge');
  });
});
