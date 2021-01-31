import * as express from 'express';
import { pages } from './pages';

export const setupExpressRoutes = (webevApp: unknown, express: express.Express): void => {
  express.use('/api/v1/pages', pages(webevApp));
};
