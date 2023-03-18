import express, { Express } from 'express';
import path from 'path';

import routes from './routes';

const port: string = process.env.PORT || '3000';
const app: Express = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', '/public')));
app.use(routes);

app.listen(port, (): void => {
  console.log(`App is running at http://localhost:${port}`);
});
