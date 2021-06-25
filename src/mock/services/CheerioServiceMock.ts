/* eslint-disable @typescript-eslint/no-unused-vars */
import { Page } from '../../domains/Page';

export class CheerioServiceMock {
  async retrieveDataByUrl({ url }: { url: string }): Promise<Partial<Page>> {
    throw new Error('Method not implemented.');
  }
}
