const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const wishes = require('../public/wishes.json');

const port = process.env.PORT || 8000;

const server = () => {
  const app = new express();

  app.use(express.static(path.join(__dirname, '../dist')));
  app.use(bodyParser.json());

  app.get('/api/wishes', (req, res) => {
    res.send(wishes);
  });

  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
  });

  app.get('/wishes', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist', 'wishes.html'));
  });

  return app;
};

server().listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
