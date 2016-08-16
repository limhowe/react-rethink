// @flow
import thinky from '../thinky';

export type UserType = {
  id: string,
  name: string,
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

export default User;
