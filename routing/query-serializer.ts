import { parse, stringify } from 'qs';

type Window = {
  location: Location;
};

export class QuerySerializer {
  parseQueryParams(_window: Window = window) {
    return parse(_window.location.search, { ignoreQueryPrefix: true });
  }

  stringifyParams(params: object) {
    return stringify(params);
  }
}
