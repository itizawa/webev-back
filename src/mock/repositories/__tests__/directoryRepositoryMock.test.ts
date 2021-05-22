import { DirectoryRepositoryMock } from '../../../mock/repositories/DirectoryRepositoryMock';

describe('DirectoryRepositoryMock test', () => {
  test('DirectoryRepositoryMock', async () => {
    const directoryRepositoryMock = new DirectoryRepositoryMock();

    expect(directoryRepositoryMock).toEqual({});
  });
});
