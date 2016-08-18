// @flow
import User, { authenticate } from '../models/User';
import passport from 'passport';
import chalk from 'chalk';

import type { $Response, $Request } from 'express';
import type { UserType } from '../models/User';

export type AuthReq = $Request & $PassportRequest;

export default class AuthController {
  signin(req: AuthReq, res: $Response, next: Function) {
    // $FlowFixMe
    passport.authenticate('local', (err, user, info) => {
      if (err || !user) {
        console.log(chalk.red(err, JSON.stringify(info)));
        res.status(400).json(err || info);
      } else {
        delete user.password;
        req.login(user, (err) => {
          if (err) {
            console.log(chalk.red(err));
            res.status(400).send(err);
          } else {
            res.json(user);
          }
        });
      }
    })(req, res, next);
  }

  signout(req: AuthReq, res: $Response) {
    req.logout();
    res.json({status: 'Success'});
  }

  // middleware for logged in users
  requiresLogin(req: AuthReq, res: $Response, next: Function) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(401).send({
        error: 'User is not logged in'
      });
    }
  }
}
