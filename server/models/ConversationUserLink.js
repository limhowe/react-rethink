// @flow
import thinky from '../thinky';

import type { DocType } from '../thinky';

export type ConversationUserLinkType = {
  id: string,
  userId: string,
  convId: string,
  onlineStatus: string
};

export type ConversationUserLinkDocType = DocType & ConversationUserLinkType;

const type = thinky.type;

const ConversationUserLink = thinky.createModel('convuserlink',
  type.object().schema({
    id: type.string(),
    userId: type.string(),
    convId: type.string(),
    onlineStatus: type.string().default('ONLINE')
  }).removeExtra()
);

export default ConversationUserLink;

import Conversation from './Conversation';
import User from './User';

ConversationUserLink.belongsTo(User, 'user', 'userId', 'id');
ConversationUserLink.belongsTo(Conversation, 'conversation', 'convId', 'id');
