const Express = require('express');
const bodyParser = require('body-parser');

const wishes = require('../public/wishes.json');

const port = process.env.PORT || 8000;

const server = () => {
  const app = new Express();

  app.use(bodyParser.json());

  app.get('/wishes', (req, res) => {
    res.send(wishes);
  });

  return app;
};

server().listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
