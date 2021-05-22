import { generateMockDirectory, generateMockPage, generateMockUser } from '../../../mock/domains';
import { generateMockPaginationQuery } from '../../interfaces/generateMockPaginationQuery';
import { generateMockPaginationOptions } from '../../interfaces/generateMockPaginationOptions';
import { PageRepositoryMock } from '../PageRepositoryMock';
import { PageStatus } from '../../../domains/Page';
describe('PageRepositoryMock test', () => {
  const mockPage = generateMockPage();
  const mockDirectory = generateMockDirectory();
  const mockUser = generateMockUser();
  const mockPaginationQuery = generateMockPaginationQuery();
  const mockPaginationOptions = generateMockPaginationOptions();

  const pageRepositoryMock = new PageRepositoryMock();

  test('createPage', async () => {
    try {
      await pageRepositoryMock.createPage(mockPage);
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('findPageById', async () => {
    try {
      await pageRepositoryMock.findPageById(mockPage._id, mockUser._id);
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('findPageList', async () => {
    try {
      await pageRepositoryMock.findPageList(mockPaginationQuery, mockPaginationOptions);
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('findPageListByDirectoryId', async () => {
    try {
      await pageRepositoryMock.findPageListByDirectoryId(mockPage._id, mockUser._id);
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('findByDirectoryIdAndDeleteDirectoryId', async () => {
    try {
      await pageRepositoryMock.findByDirectoryIdAndDeleteDirectoryId([mockPage._id], mockUser._id);
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('updatePageById', async () => {
    try {
      await pageRepositoryMock.updatePageById(mockPage._id, mockPage);
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('updateDirectory', async () => {
    try {
      await pageRepositoryMock.updateDirectory(mockPage._id, mockDirectory._id, mockUser._id);
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('updatePageStatus', async () => {
    try {
      await pageRepositoryMock.updatePageStatus(mockPage._id, mockUser._id, PageStatus.PAGE_STATUS_STOCK);
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });

  test('countAllPages', async () => {
    try {
      await pageRepositoryMock.countAllPages();
    } catch (e) {
      expect(e).toEqual(new Error('Method not implemented.'));
    }
  });
});
