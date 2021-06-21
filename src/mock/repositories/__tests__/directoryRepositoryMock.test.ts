import { generateMockDirectory, generateMockPage, generateMockUser } from '../../../mock/domains';
import { DirectoryRepositoryMock } from '../../../mock/repositories/DirectoryRepositoryMock';
import { generateMockPaginationQuery } from '../../interfaces/generateMockPaginationQuery';
import { generateMockPaginationOptions } from '../../interfaces/generateMockPaginationOptions';

describe('DirectoryRepositoryMock test', () => {
  const mockPage = generateMockPage();
  const mockDirectory = generateMockDirectory();
  const mockUser = generateMockUser();
  const mockPaginationQuery = generateMockPaginationQuery();
  const mockPaginationOptions = generateMockPaginationOptions();

  const directoryRepositoryMock = new DirectoryRepositoryMock();

  test('createPage', async () => {
    try {
      await directoryRepositoryMock.createPage(mockPage);
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('createDirectory', async () => {
    try {
      await directoryRepositoryMock.createDirectory({ directory: mockDirectory });
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('countDirectoryByUserId', async () => {
    try {
      await directoryRepositoryMock.countDirectoryByUserId({ userId: mockUser._id });
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('isExistDirectoryByName', async () => {
    try {
      await directoryRepositoryMock.isExistDirectoryByName({ name: mockDirectory.name, userId: mockUser._id });
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('deleteDirectory', async () => {
    try {
      await directoryRepositoryMock.deleteDirectory({ directoryId: mockDirectory._id, userId: mockUser._id });
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('deleteDirectories', async () => {
    try {
      await directoryRepositoryMock.deleteDirectories({ directoryIds: [mockDirectory._id], userId: mockUser._id });
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('findDirectory', async () => {
    try {
      await directoryRepositoryMock.findDirectory({ directoryId: mockDirectory._id, userId: mockUser._id });
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('findAllDirectories', async () => {
    try {
      await directoryRepositoryMock.findAllDirectories({ userId: mockUser._id });
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('findDirectoryList', async () => {
    try {
      await directoryRepositoryMock.findDirectoryList({ query: mockPaginationQuery, options: mockPaginationOptions });
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('renameDirectory', async () => {
    try {
      await directoryRepositoryMock.renameDirectory({ directoryId: mockDirectory._id, name: mockDirectory.name, userId: mockUser._id });
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('updateOrder', async () => {
    try {
      await directoryRepositoryMock.updateOrder({ directoryId: mockDirectory._id, order: mockDirectory.order, userId: mockUser._id });
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('updateDescription', async () => {
    try {
      await directoryRepositoryMock.updateDescription({ directoryId: mockDirectory._id, description: mockDirectory.description, userId: mockUser._id });
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('updateIsPublic', async () => {
    try {
      await directoryRepositoryMock.updateIsPublic(mockDirectory._id, true, mockUser._id);
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('increaseDirectory', async () => {
    try {
      await directoryRepositoryMock.increaseDirectory(1, 10, mockUser._id);
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('decreaseDirectory', async () => {
    try {
      await directoryRepositoryMock.decreaseDirectory(1, 10, mockUser._id);
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });
  test('updateEmoji', async () => {
    try {
      await directoryRepositoryMock.updateEmoji(mockDirectory._id, mockDirectory.emojiId);
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });
});
