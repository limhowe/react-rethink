import Subscriber from './Subscriber';
import ConversationUserLink from '../models/ConversationUserLink';

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
    .run()
    .then((data) => {
      this.logger('Get Data Success');
      this.emit(data);
    });
  }

  watch() {
    ConversationUserLink.filter({ userId: this.options.userId })
    .changes()
    .then((feed) => {
      feed.each((error, doc) => {
        // @TODO handle multiple doc change at the same time
        if (error) {
          this.logger('Error occured watching feed %s', JSON.stringify(error));
          return;
        }

        this.logger('Observed data change');

        if (doc.isSaved() === false) {
          this.logger('Following document was deleted: %s', JSON.stringify(doc));
        } else if (doc.getOldValue() == null) {
          this.logger('A new document was inserted: %s', JSON.stringify(doc));
        } else {
          this.logger('A document was updated');
          this.logger('Old Value: %s', JSON.stringify(doc.getOldValue()));
          this.logger('New Value: %s', JSON.stringify(doc));
        }
        this.getData();
      });
    })
    .catch((err) => {
      this.logger('error occured %s', JSON.stringify(err));
    });
  }

  getEventName() {
    return 'UserConversations';
  }
}
