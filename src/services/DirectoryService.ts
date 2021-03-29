import { Document } from 'mongoose';
import { DirectoryModel, IDirectory } from '../models/directory';
import { IUser } from '../models/user';
import { WebevApp } from './WebevApp';

export class DirectoryService {
  webevApp: WebevApp;

  constructor(WebevApp: WebevApp) {
    this.webevApp = WebevApp;
  }

  async validInDuplicate(name: string, user: Document<IUser>): Promise<boolean> {
    const directoryCount = await DirectoryModel.count({ name, createdUser: user });
    // Cannot use the name have already created
    return directoryCount > 0;
  }

  async saveDirectory(newDirectory: Partial<IDirectory>, user: Document<IUser>): Promise<Document<IDirectory>> {
    // Cannot use the name have already created
    const isInDuplicate = await this.validInDuplicate(newDirectory.name, user);
    if (isInDuplicate) {
      throw new Error('This name directory already exists');
    }
    // set creator id
    newDirectory.createdUser = user;
    return DirectoryModel.create(newDirectory);
  }

  async renameDirectory(directoryId: string, name: string, user: Document<IUser>): Promise<Document<IDirectory>> {
    // Cannot use the name have already created
    const isInDuplicate = await this.validInDuplicate(name, user);
    if (isInDuplicate) {
      throw new Error('This name directory already exists');
    }

    const page = await DirectoryModel.findOneAndUpdate({ _id: directoryId, createdUser: user._id }, { name }, { new: true });

    return page;
  }

  async deleteDirectory(directoryId: string, user: Document<IUser>): Promise<Document<IDirectory>> {
    const page = await DirectoryModel.findOneAndDelete({ _id: directoryId, createdUser: user._id });

    return page;
  }
}
