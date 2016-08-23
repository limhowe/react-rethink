// @flow
import passport from 'passport';
import glob from 'glob';
import path from 'path';
import chalk from 'chalk';
import User from './models/User';

import type { UserDocType } from './models/User';

export default function() {
  // serialize sessions
  passport.serializeUser((user: UserDocType, done: Function) => {
    done(null, user.id);
  });

  // deserialize sessions
  passport.deserializeUser((id: string, done: Function) => {
    User.get(id)
    .run()
    .then((user: UserDocType) => {
      done(null, user)
    })
    .catch((err: any) => {
      done(err, null);
    });
  });

  // initialize strategies
  glob('./strategies/*.js', { cwd: path.resolve('./server') }, (err, strategies) => {
    if (err) {
      console.log(chalk.red(`Error occured including strategies`));
      return;
    }

    strategies.forEach((strategyPath) => {
      // $FlowFixMe
      require(strategyPath).default();
    });
    console.log(chalk.green(`included ${strategies.length} strategy files`));
  });
};
