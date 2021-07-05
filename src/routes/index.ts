import * as express from 'express';
import { WebevApp } from '../services/WebevApp';
import { directories } from './directories';
import { inquiries } from './inquiries';
import { pages } from './pages';
import { users } from './users';
import { admin } from './admin';
import { scraps } from './scraps';

export const setupExpressRoutes = (webevApp: WebevApp, express: express.Express): void => {
  express.use('/api/v1/directories', directories());
  express.use('/api/v1/inquiries', inquiries());
  express.use('/api/v1/pages', pages(webevApp));
  express.use('/api/v1/users', users());
  express.use('/api/v1/admin', admin());
  express.use('/api/v1/scraps', scraps());
};
