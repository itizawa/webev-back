import axios from 'axios';
import { CheerioService } from '../CheerioService';

describe('CheerioService test', () => {
  const mockUrl = 'https://www.webev.cloud';
  const mockTitle = 'Webev';
  const mockSiteName = 'Webev';
  const mockDescription = 'mockDescription';
  const mockImage = 'mockImage.png';

  const mockMetaData = `
    <meta property="og:url" content=${mockUrl}>
    <meta property="og:title" content=${mockTitle}>
    <meta property="og:site_name" content=${mockSiteName}>
    <meta property="og:description" content=${mockDescription}>
    <meta property="og:image" content=${mockImage}>
  `;
  const cheerioService = new CheerioService();
  test('Get data by url', async () => {
    const axiosSpy = jest.spyOn(axios, 'get').mockImplementation(async () => {
      return {
        data: mockMetaData,
      };
    });

    const response = await cheerioService.retrieveDataByUrl(mockUrl);
    expect(axiosSpy).toHaveBeenCalled();
    expect(response).toEqual({ title: mockTitle, siteName: mockSiteName, url: mockUrl, description: mockDescription, image: mockImage });
  });

  test('Catch error', async () => {
    const axiosSpy = jest.spyOn(axios, 'get').mockImplementation(async () => {
      throw new Error();
    });

    const response = await cheerioService.retrieveDataByUrl(mockUrl);
    expect(axiosSpy).toHaveBeenCalled();
    expect(response).toEqual({ description: '取得できませんでした', title: mockUrl, url: mockUrl });
  });
});
