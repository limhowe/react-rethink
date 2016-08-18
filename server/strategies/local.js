// @flow
import passport from 'passport';
import PassportLocal from 'passport-local';
import User, { authenticate } from '../models/User';
import type UserDocType from '../models/User';

const LocalStrategy = PassportLocal.Strategy;

export default function() {
  // use local strategy
  // $FlowFixMe
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email: string, password: string, done: Function) => {
    User.filter({
      email: email
    })
    .run()
    .then((users: Array<UserDocType>) => {
      if (!users.length) {
        done(null, false, {
          message: 'Unknown User'
        });
      } else {
        const user = users[0];
        if (authenticate(password) !== user.password) {
          done(null, false, {
            message: 'Password is wrong'
          });
        } else {
          done(null, user);
        }
      }
    })
    .catch((err) => {
      done(err);
    });
  }));
};
