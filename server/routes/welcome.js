export default app => {
  app.get('/', { name: 'root' }, (req, reply) => {
    // reply.render('welcome');
    reply.send({ hello: 'world' });
  });
};
