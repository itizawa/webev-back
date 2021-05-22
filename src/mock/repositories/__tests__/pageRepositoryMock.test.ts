import { PageRepositoryMock } from '../PageRepositoryMock';

describe('PageRepositoryMock test', () => {
  test('PageRepositoryMock', async () => {
    const pageRepositoryMock = new PageRepositoryMock();

    expect(pageRepositoryMock).toEqual({});
  });
});
