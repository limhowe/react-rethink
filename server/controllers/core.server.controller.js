// @flow
import type { $Response, $Request } from 'express';

export default class {
  index(req: $Request, res: $Response) {
    res.render('index');
  }
}
