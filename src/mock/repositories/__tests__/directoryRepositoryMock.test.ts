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
      await directoryRepositoryMock.createDirectory(mockDirectory);
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('countDirectoryByUserId', async () => {
    try {
      await directoryRepositoryMock.countDirectoryByUserId(mockUser._id);
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('isExistDirectoryByName', async () => {
    try {
      await directoryRepositoryMock.isExistDirectoryByName(mockDirectory.name, mockUser._id);
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('deleteDirectory', async () => {
    try {
      await directoryRepositoryMock.deleteDirectory(mockDirectory._id, mockUser._id);
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('deleteDirectories', async () => {
    try {
      await directoryRepositoryMock.deleteDirectories([mockDirectory._id], mockUser._id);
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('findDirectory', async () => {
    try {
      await directoryRepositoryMock.findDirectory(mockDirectory._id, mockUser._id);
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('findAllDirectories', async () => {
    try {
      await directoryRepositoryMock.findAllDirectories(mockUser._id);
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('findDirectoryList', async () => {
    try {
      await directoryRepositoryMock.findDirectoryList(mockPaginationQuery, mockPaginationOptions);
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('renameDirectory', async () => {
    try {
      await directoryRepositoryMock.renameDirectory(mockDirectory._id, mockDirectory.name, mockUser._id);
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('updateOrder', async () => {
    try {
      await directoryRepositoryMock.updateOrder(mockDirectory._id, mockDirectory.order, mockUser._id);
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('updateDescription', async () => {
    try {
      await directoryRepositoryMock.updateDescription(mockDirectory._id, mockDirectory.description, mockUser._id);
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
});
