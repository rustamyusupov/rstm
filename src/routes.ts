import express, { Router, Request, Response } from 'express';

const routes: Router = express.Router();

routes.use('/', (_: Request, res: Response) => {
  res.render('index', {
    title: 'Rustam Yusupov',
    description: 'A little bit about me',
  });
});

routes.use('*', (_: Request, res: Response) => res.redirect('/'));

export default routes;
