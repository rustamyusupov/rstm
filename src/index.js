import Express from 'express';
import path from 'path';

import routes from './routes';

const staticAssets = app =>
  app.use('/static', Express.static(path.join(__dirname, '..', 'public')));

const views = app => {
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');
};

export default () => {
  const app = new Express();

  staticAssets(app);
  views(app);
  routes(app);

  return app;
};
