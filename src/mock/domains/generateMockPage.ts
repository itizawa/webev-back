import { Page, PageStatus } from '../../domains/Page';

export const generateMockPage = (mock: Partial<Page> = {}): Page => {
  const { _id, url, image, description, title, siteName, directoryId, createdUser, createdAt, updatedAt, status, isFavorite } = mock;
  return new Page({
    _id: _id || 'mockUserId',
    url: url || 'https://github.com/itizawa/webev-front',
    image: image || 'mockUserImage',
    description: description || 'mockUserDescription',
    title: title || 'mockUserDescription',
    siteName: siteName || 'mockUserDescription',
    directoryId: directoryId || 'mockDirectoryId',
    createdUser: createdUser || 'mockUserId',
    createdAt: createdAt || new Date('2020-01-01'),
    updatedAt: updatedAt || new Date('2020-01-01'),
    status: status || PageStatus.PAGE_STATUS_STOCK,
    isFavorite: isFavorite || false,
  });
};
