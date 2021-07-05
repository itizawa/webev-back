import { Scrap } from '../../domains/Scrap';

export const generateMockScrap = (mock: Partial<Scrap> = {}): Scrap => {
  const { _id, title, body, createdUser, isPublic, emojiId, pages, createdAt, updatedAt } = mock;
  return new Scrap({
    _id: _id || 'mockUserId',
    title: title || 'mockTitle',
    body: body || 'mockBody',
    createdUser: createdUser || 'mockUserId',
    isPublic: isPublic || false,
    emojiId: emojiId || 'open_file_folder',
    pages: pages || [],
    createdAt: createdAt || new Date('2020-01-01'),
    updatedAt: updatedAt || new Date('2020-01-01'),
  });
};
