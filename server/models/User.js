import thinky from '../thinky';
const type = thinky.type;

const User = thinky.createModel('user',
  type.object().schema({
    id: type.string(),
    name: type.string().min(2).max(50).required(),
    email: type.string().email()
  }).removeExtra()
);

export default User;
