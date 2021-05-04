import { DirectoryTree } from '../../domains/DirectoryTree';

export const generateMockDirectoryTree = (mock: Partial<DirectoryTree> = {}): DirectoryTree => {
  const { _id, ancestor, descendant, depth } = mock;
  return new DirectoryTree({
    _id: _id || 'mockUserId',
    ancestor: ancestor || 'mockAncestor',
    descendant: descendant || 'mockdescendant',
    depth: depth || 1,
  });
};
