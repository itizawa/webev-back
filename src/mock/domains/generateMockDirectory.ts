import { Directory } from '../../domains/Directory';

export const generateMockDirectory = (mock: Partial<Directory> = {}): Directory => {
  const { _id, name, order, createdUser, isRoot, description, createdAt, updatedAt, emojiId } = mock;
  return new Directory({
    _id: _id || 'mockUserId',
    name: name || 'mockUserName',
    order: order || 1,
    createdUser: createdUser || 'mockUserId',
    isRoot: isRoot || false,
    description: description || 'mockDescription',
    emojiId: emojiId,
    createdAt: createdAt || new Date('2020-01-01'),
    updatedAt: updatedAt || new Date('2020-01-01'),
  });
};
