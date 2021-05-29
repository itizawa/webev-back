import axios from 'axios';
import { CheerioService } from '../CheerioService';

describe('CheerioService test', () => {
  const url = 'testUrl';
  test('Catch error', async () => {
    const cheerioService = new CheerioService();
    const axiosSpy = jest.spyOn(axios, 'get').mockImplementation(async (url) => {
      {
        url;
      }
    });

    const response = await cheerioService.retrieveDataByUrl(url);
    expect(axiosSpy).toHaveBeenCalled();
    expect(response).toEqual({ description: '取得できませんでした', title: url, url });
  });
});
