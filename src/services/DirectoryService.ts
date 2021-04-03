import { Document } from 'mongoose';
import { DirectoryModel, IDirectory } from '../models/directory';
import { WebevApp } from './WebevApp';

export class DirectoryService {
  webevApp: WebevApp;

  constructor(WebevApp: WebevApp) {
    this.webevApp = WebevApp;
  }

  async validInDuplicate(name: string, userId: string): Promise<boolean> {
    const directoryCount = await DirectoryModel.count({ name, createdUser: userId });
    // Cannot use the name have already created
    return directoryCount > 0;
  }

  async saveDirectory(newDirectory: Partial<IDirectory>, userId: string): Promise<Document<IDirectory>> {
    // Cannot use the name have already created
    const isInDuplicate = await this.validInDuplicate(newDirectory.name, userId);
    if (isInDuplicate) {
      throw new Error('This name directory already exists');
    }
    // set creator id
    newDirectory.createdUser = userId;
    return DirectoryModel.create(newDirectory);
  }

  async renameDirectory(directoryId: string, name: string, userId: string): Promise<Document<IDirectory>> {
    // Cannot use the name have already created
    const isInDuplicate = await this.validInDuplicate(name, userId);
    if (isInDuplicate) {
      throw new Error('This name directory already exists');
    }

    const page = await DirectoryModel.findOneAndUpdate({ _id: directoryId, createdUser: userId }, { name }, { new: true });

    return page;
  }

  async deleteDirectory(directoryId: string, userId: string): Promise<Document<IDirectory>> {
    const page = await DirectoryModel.findOneAndDelete({ _id: directoryId, createdUser: userId });

    return page;
  }
}
