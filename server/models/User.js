// @flow
import md5 from 'md5';
import thinky from '../thinky';

import type { DocType } from '../thinky';

export type UserType = {
  id: string,
  name: string,
  email: string,
  password: string,
  authenticate: Function
};

export type UserDocType = DocType & UserType;

export type AuthType = {
  email: string,
  password: string
};

const type = thinky.type;

const User = thinky.createModel('user',
  type.object().schema({
    id: type.string(),
    name: type.string().min(2).max(50).required(),
    email: type.string().email(),
    password: type.string().required()
  }).removeExtra()
);

export function authenticate(password: string): string {
  return md5(password);
};

export default User;
