// @flow
import thinky from '../thinky';
import type { DocType } from '../thinky';

export type ConversationType = {
  id: string,
  title: string,
  status: string
};

export type ConversationDocType = DocType & ConversationType;

const type = thinky.type;
const Conversation = thinky.createModel('conversation',
  type.object().schema({
    id: type.string(),
    title: type.string().min(2).max(100).required(),
    status: type.string()
  }).removeExtra()
);

export default Conversation;
