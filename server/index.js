import fastify from 'fastify';

import routes from './routes';

const mode = process.env.NODE_ENV || 'development';
const isDevelopment = mode === 'development';

export default () => {
  const app = fastify({
    logger: {
      prettyPrint: isDevelopment,
    },
  });

  routes(app);

  return app;
};
