import { Composer } from './composer';
import { ParsedRoute } from './typings/parser';
import { Route } from './typings/composer';

export class Parser {
  candidates: ParsedRoute[] = [];
  current: {
    composer?: Composer;
    route?: Route;
    parent?: Composer;
    parentState?: ParsedRoute;
  } = {};

  constructor(private composer: Composer) {
    this.parse();
    return this;
  }

  get routes() {
    return this.candidates;
  }

  protected parse() {
    this.current.composer = this.composer;
    this.processNext();
  }

  processNext() {
    if (this.current.composer && this.current.composer.state.routes?.length) {
      this.current.composer.state.routes?.forEach((route) => {
        if (this.current.composer) {
          const candidate: ParsedRoute = {
            groupPath: (this.current.parentState?.groupPath
              ? this.current.parentState.groupPath
              : []
            ).concat([this.current.composer.state.id]),
            prefixPath: (this.current.parentState?.prefixPath
              ? this.current.parentState.prefixPath
              : []
            ).concat(
              this.current.composer.state.prefix
                ? [this.current.composer.state.prefix]
                : []
            ),
            middlewareList: (this.current.parent?.state.middleware?.length
              ? this.current.parent.state.middleware
              : []
            ).concat(
              this.current.composer.state.middleware?.length
                ? this.current.composer.state.middleware
                : []
            )
          };
          if (route instanceof Composer) {
            this.current = {
              parent: this.current.composer,
              composer: route,
              parentState: candidate
            };
            this.processNext();
          } else {
            candidate.route = route;
            this.candidates.push(candidate);
          }
        }
      });
    }
  }
}
