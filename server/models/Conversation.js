import thinky from '../thinky';
const type = thinky.type;

const Conversation = thinky.createModel('conversation',
  type.object().schema({
    id: type.string(),
    title: type.string().min(2).max(100).required(),
    status: type.string()
  }).removeExtra()
);

export default Conversation;
