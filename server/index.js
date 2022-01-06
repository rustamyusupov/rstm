import fastify from 'fastify';

import routes from './routes';

export default () => {
  const app = fastify({});

  routes(app);

  return app;
};
