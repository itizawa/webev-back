import { generateMockPage } from '../../../mock/domains';
import { CheerioServiceMock } from '../CheerioServiceMock';

describe('CheerioServiceMock test', () => {
  const mockPage = generateMockPage();

  const cheerioServiceMock = new CheerioServiceMock();

  test('retrieveDataByUrl', async () => {
    try {
      await cheerioServiceMock.retrieveDataByUrl({ url: mockPage.url });
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });
});
