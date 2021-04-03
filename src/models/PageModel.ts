import { Property, Enum, Url, Default, Required } from '@tsed/schema';
import { Model, ObjectID } from '@tsed/mongoose';

enum PageStatus {
  PAGE_STATUS_STOCK = 'stocked',
  PAGE_STATUS_ARCHIVE = 'archived',
  PAGE_STATUS_DELETED = 'deleted',
}

@Model({ schemaOptions: { timestamps: true } })
export class PageModel {
  @ObjectID('_id')
  _id: string;

  @Url()
  url: string;

  @Property()
  image: string;

  @Property()
  description: string;

  @Property()
  title: string;

  @Property()
  siteName: string;

  @Default(PageStatus.PAGE_STATUS_STOCK)
  @Enum(PageStatus)
  status: PageStatus;

  @Default(false)
  isFavorite: boolean;
}
