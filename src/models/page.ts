import * as mongoose from 'mongoose';

interface IPage {
  _id: string;
  image: string;
  description: string;
  title: string;
  body: string;
}

const PageSchema = new mongoose.Schema({
  image: String,
  description: String,
  title: String,
  body: String,
});

const PageModel = mongoose.model('Page', PageSchema);

export { PageModel, IPage };
