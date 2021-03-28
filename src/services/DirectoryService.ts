import { Document } from 'mongoose';
import { DirectoryModel, IDirectory } from '../models/directory';
import { IUser } from '../models/user';
import { WebevApp } from './WebevApp';

export class DirectoryService {
  webevApp: WebevApp;

  constructor(WebevApp: WebevApp) {
    this.webevApp = WebevApp;
  }

  async saveDirectory(newDirectory: Partial<IDirectory>, user: Document<IUser>): Promise<Document<IDirectory>> {
    const directoryCount = await DirectoryModel.count({ name: newDirectory.name, createdUser: user });
    // Cannot use the name have already created
    if (directoryCount > 0) {
      throw new Error('This name directory already exists');
    }
    // set creator id
    newDirectory.createdUser = user;
    return DirectoryModel.create(newDirectory);
  }
}
