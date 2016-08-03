import Subscriber from './Subscriber';
import ConversationUserLink from '../models/ConversationUserLink';
import { conn } from '../../rethinkdb';

export default class UserConversations extends Subscriber {
  // id = userId here
  constructor(...args) {
    super(...args);
  }

  getData() {
    ConversationUserLink.filter({ userId: this.options.userId })
    .getJoin({
      conversation: true,
      user: true
    })
    .run(conn)
    .then((data) => {
      this.emit(data);
    });
  }

  watch() {
    ConversationUserLink.filter({ userId: this.options.userId })
    .changes()
    .run(conn)
    .then(() => {
      this.getData();
    })
    .catch((err) => {
      this._log('error occured %s', JSON.stringify(err));
    });
  }

  getEventName() {
    return 'UserConversations';
  }
}
