// @flow
import User, { authenticate } from '../models/User';

import type { $Response, $Request } from 'express';
import type { UserType } from '../models/User';

export default class UserController {
  create(req: $Request, res: $Response) {
    const params = Object.assign({}, req.body);
    params.password = authenticate(params.password);

    User.save(params)
    .then((result: UserType) => {
      res.json(result);
    })
    .catch((err: any) => {
      res.status(400).json(err);
    });
  }
}
