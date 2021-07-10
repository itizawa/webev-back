import { Directory } from '../../domains/Directory';

export const generateMockDirectory = (mock: Partial<Directory> = {}): Directory => {
  const { _id, name, order, createdUser, isRoot, isPublic, description, emojiId, scrapId, createdAt, updatedAt } = mock;
  return new Directory({
    _id: _id || 'mockUserId',
    name: name || 'mockUserName',
    order: order || 1,
    createdUser: createdUser || 'mockUserId',
    isRoot: isRoot || false,
    isPublic: isPublic || false,
    description: description || 'mockDescription',
    emojiId: emojiId || 'open_file_folder',
    scrapId: scrapId || 'mockScrapId',
    createdAt: createdAt || new Date('2020-01-01'),
    updatedAt: updatedAt || new Date('2020-01-01'),
  });
};
