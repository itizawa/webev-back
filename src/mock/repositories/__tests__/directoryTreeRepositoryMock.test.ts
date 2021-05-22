import { DirectoryTreeRepositoryMock } from '../DirectoryTreeRepositoryMock';
import { generateMockDirectory, generateMockDirectoryTree } from '../../../mock/domains';

describe('DirectoryTreeRepositoryMock test', () => {
  const mockDirectory = generateMockDirectory();
  const mockDirectoryTree = generateMockDirectoryTree();

  const directoryTreeRepositoryMock = new DirectoryTreeRepositoryMock();

  test('createSelfReference', async () => {
    try {
      await directoryTreeRepositoryMock.createSelfReference(mockDirectory._id);
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('createPathAsDescendant', async () => {
    try {
      await directoryTreeRepositoryMock.createPathAsDescendant(mockDirectoryTree.ancestor, mockDirectoryTree.descendant);
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('findChildrenDirectories', async () => {
    try {
      await directoryTreeRepositoryMock.findChildrenDirectories(mockDirectory._id);
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('findAncestorDirectories', async () => {
    try {
      await directoryTreeRepositoryMock.findAncestorDirectories(mockDirectory._id);
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('deleteDirectoryTree', async () => {
    try {
      await directoryTreeRepositoryMock.deleteDirectoryTree(mockDirectory._id);
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });
});
