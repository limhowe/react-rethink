// @flow
import User from '../models/User';

import type { $Response, $Request } from 'express';
import type { UserType } from '../models/User';

export default class UserController {
  create(req: $Request, res: $Response) {
    User.save(req.body)
    .then((result: UserType) => {
      res.json(result);
    })
    .catch((err: any) => {
      res.status(400).json(err);
    })
  }
}
