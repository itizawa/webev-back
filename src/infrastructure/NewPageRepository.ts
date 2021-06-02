import { Default, Enum, Required } from '@tsed/schema';
import { Indexed, ObjectID } from '@tsed/mongoose';
import { PageStatus } from '../domains/Page';

export class PageModel {
  @ObjectID('id')
  _id: string;

  url: string;

  image: string;

  @Indexed()
  description: string;

  @Indexed()
  title: string;

  @Indexed()
  siteName: string;

  @Enum(PageStatus)
  @Required()
  status: PageStatus;

  // @ObjectID('directoryId')
  // @Default(null)
  // directoryId?: string;

  // @ObjectID('createdUser')
  // @Required(null)
  // createdUser?: string;

  @Default(null)
  archivedAt: Date;
}
