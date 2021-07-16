import { DirectoryTreeRepositoryMock } from '../DirectoryTreeRepositoryMock';
import { generateMockDirectory, generateMockDirectoryTree } from '../../../mock/domains';

describe('DirectoryTreeRepositoryMock test', () => {
  const mockDirectory = generateMockDirectory();
  const mockDirectoryTree = generateMockDirectoryTree();

  const directoryTreeRepositoryMock = new DirectoryTreeRepositoryMock();

  test('createSelfReference', async () => {
    try {
      await directoryTreeRepositoryMock.createSelfReference({ directoryId: mockDirectory._id });
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('createPathAsDescendant', async () => {
    try {
      await directoryTreeRepositoryMock.createPathAsDescendant({ ancestorId: mockDirectoryTree.ancestor, descendantId: mockDirectoryTree.descendant });
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('findChildrenDirectories', async () => {
    try {
      await directoryTreeRepositoryMock.findChildrenDirectories({ parentDirectoryId: mockDirectory._id });
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('findChildrenMultipleDirectories', async () => {
    try {
      await directoryTreeRepositoryMock.findChildrenMultipleDirectories({ parentDirectoryIds: [mockDirectory._id] });
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('findAncestorDirectories', async () => {
    try {
      await directoryTreeRepositoryMock.findAncestorDirectories({ directoryId: mockDirectory._id });
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('deleteDirectoryTree', async () => {
    try {
      await directoryTreeRepositoryMock.deleteDirectoryTree({ directoryId: mockDirectory._id });
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });
});
