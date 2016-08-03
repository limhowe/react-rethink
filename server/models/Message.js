import thinky from '../thinky';
const type = thinky.type;

const Message = thinky.createModel('message',
  type.object().schema({
    text: type.string().required(),
    userId: type.string(),
    convId: type.string(),
    createdAt: type.date()
  }).removeExtra()
);

export default Message;
