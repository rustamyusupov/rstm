import Express from 'express';
import path from 'path';

import routes from './routes';

const views = app => {
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');
};

export default () => {
  const app = new Express();

  views(app);
  routes(app);

  return app;
};
