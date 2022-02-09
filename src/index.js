const express = require('express');

const port = process.env.PORT || 3000;

const server = () => {
  const app = new express();

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  return app;
};

server().listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
