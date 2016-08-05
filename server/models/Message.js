import thinky from '../thinky';
const type = thinky.type;

const Message = thinky.createModel('message',
  type.object().schema({
    id: type.string(),
    text: type.string().required(),
    userId: type.string(),
    convId: type.string(),
    createdAt: type.date()
  }).removeExtra()
);

export default Message;

import Conversation from './Conversation';
import User from './User';

Message.belongsTo(User, 'user', 'userId', 'id');
Message.belongsTo(Conversation, 'conversation', 'convId', 'id');
