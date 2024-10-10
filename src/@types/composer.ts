import { RequestHandler } from 'express';
import { Composer } from '../composer';

export type State = {
  id: string;
  middleware?: RequestHandler[];
  prefix?: string;
  routes?: Route[];
};

export type RouteConfig = {
  method: RouteMethod | RouteMethod[];
  path: string;
  controller: RequestHandler;
};

export type Route = RouteConfig | Composer;

export type RouteMethod =
  | 'all'
  | 'get'
  | 'post'
  | 'put'
  | 'delete'
  | 'patch'
  | 'options'
  | 'head';
