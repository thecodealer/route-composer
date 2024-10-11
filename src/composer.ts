import { RequestHandler } from 'express';
import { Route, State } from './typings/composer';

export class Composer {
  state: State = {
    id: '',
    middleware: [],
    prefix: '',
    routes: []
  };

  constructor() {
    this.state.id = (Math.random() + 1).toString(36).substring(5);
  }

  static group() {
    return new this();
  }

  middleware(middleware: RequestHandler) {
    this.state.middleware?.push(middleware);
    return this;
  }

  prefix(prefix: string) {
    this.state.prefix = prefix;
    return this;
  }

  routes(routes: Route[]) {
    this.state.routes = this.state.routes?.concat(routes);
    return this;
  }
}
