import { RequestHandler } from 'express';
import { RouteConfig } from './composer';

export type ParsedRoute = {
  groupPath?: string[];
  prefixPath?: string[];
  middlewareList?: RequestHandler[];
  route?: RouteConfig;
};
