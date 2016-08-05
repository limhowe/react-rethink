import Subscriber from './Subscriber';
import Message from '../models/ConversationUserLink';

export default class UserConversations extends Subscriber {
  // id = userId here
  constructor(...args) {
    super(...args);
  }

  getData(id, action) {
    let query;
    if (id) {
      // in case of detecting change feed, we return specific resource rather than return all
      Message.get(id)
      .getJoin({
        conversation: true,
        user: true
      })
      .run()
      .then((data) => {
        this.logger('Get Data Success');
        this.emit(data, action);
      });
    } else {
      Message.filter({ convId: this.options.id })
      .getJoin({
        conversation: true,
        user: true
      })
      .run()
      .then((data) => {
        this.logger('Get Data Success');
        this.emit(data, 'get');
      });
    }
  }

  watch() {
    Message.filter({ convId: this.options.id })
    .changes()
    .then((feeds) => {
      this.feeds = feeds;

      feeds.each((error, doc) => {
        // @TODO handle multiple doc change at the same time
        if (error) {
          this.logger('Error occured watching feed %s', JSON.stringify(error));
          return;
        }

        this.logger('Observed data change');

        if (doc.isSaved() === false) {
          this.logger('Following document was deleted: %s', JSON.stringify(doc));
          // we don't need to join query in case of deletion
          this.emit(doc, 'delete');
        } else {
          if (doc.getOldValue() == null) {
            this.logger('A new document was inserted: %s', JSON.stringify(doc));
            this.getData(doc.id, 'insert');
          } else {
            this.logger('A document was updated');
            this.logger('Old Value: %s', JSON.stringify(doc.getOldValue()));
            this.logger('New Value: %s', JSON.stringify(doc));
            this.getData(doc.id, 'updat');
          }
        }
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
