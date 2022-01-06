#! /usr/bin/env node

import app from '../index.js';

const port = process.env.PORT || 3000;
const host = '0.0.0.0';

app().listen(port, host, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log(`Server listening on ${address}`);
});
