import thinky from '../thinky';
const type = thinky.type;

const ConversationUserLink = thinky.createModel('convuserlink',
  type.object().schema({
    userId: type.string(),
    convId: type.string(),
    onlineStatus: type.string()
  }).removeExtra()
);

export default ConversationUserLink;

import Conversation from './Conversation';
import User from './User';

ConversationUserLink.belongsTo(User, 'user', 'userId', 'id');
ConversationUserLink.belongsTo(Conversation, 'conversation', 'convId', 'id');
