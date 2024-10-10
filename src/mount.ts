import express, { NextFunction, Router, Request, Response } from 'express';
import { Composer } from './composer';
import { Parser } from './parser';
import { ParsedRoute } from './@types/parser';

const defaultMiddleware = (req: Request, res: Response, next: NextFunction) => {
  next();
};

function mount(
  routes: ParsedRoute[],
  router: Router = express.Router()
): Router {
  routes.forEach((candidate) => {
    const methods = Array.isArray(candidate.route?.method)
      ? candidate.route.method
      : [candidate.route?.method];

    const pathList = candidate.prefixPath?.concat(
      candidate.route?.path ? [candidate.route.path] : []
    );
    const path = (pathList?.length ? `/${pathList.join('/')}` : '').replace(
      /\/+(?=)/g,
      '/'
    );

    methods.forEach((method) => {
      if (candidate.route?.controller && method) {
        router[method](
          path,
          candidate.middlewareList ?? defaultMiddleware,
          candidate.route?.controller
        );
      }
    });
  });
  return router;
}

export default (composed: Composer, router?: Router) => {
  const routes = new Parser(composed).routes;
  return mount(routes, router);
};
