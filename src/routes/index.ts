import * as express from 'express';
import { WebevApp } from '../services/WebevApp';
import { pages } from './pages';

export const setupExpressRoutes = (webevApp: WebevApp, express: express.Express): void => {
  express.use('/api/v1/pages', pages(webevApp));
};
