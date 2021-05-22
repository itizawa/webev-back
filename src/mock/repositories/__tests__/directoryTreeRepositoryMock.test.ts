import { DirectoryTreeRepositoryMock } from '../DirectoryTreeRepositoryMock';

describe('DirectoryTreeRepositoryMock test', () => {
  test('DirectoryTreeRepositoryMock', async () => {
    const directoryTreeRepositoryMock = new DirectoryTreeRepositoryMock();

    expect(directoryTreeRepositoryMock).toEqual({});
  });
});
