import express, { Express, Request, Response } from 'express';
import path from 'path';

const app: Express = express();
const port: string = process.env.PORT || '3000';
const publicPath: string = path.join(__dirname, '..', '/public');

app.use(express.json());
app.use(express.static(publicPath));

app.use('/', (_: Request, res: Response): void =>
  res.sendFile(path.join(publicPath, 'index.html'))
);
app.use('*', (_: Request, res: Response): void => res.redirect('/'));

app.listen(port, (): void => console.log(`App is running at http://localhost:${port}`));
