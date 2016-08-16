// @flow
import Subscriber from './Subscriber';
import ConversationUserLink from '../models/ConversationUserLink';

import type { ConversationUserLinkType, ConversationUserLinkDocType } from '../models/ConversationUserLink';
import type { ChangeFeedsType } from '../thinky';

export default class UserConversations extends Subscriber {
  constructor(...args: Array<any>) {
    super(...args);
  }

  getData(id: string = '', action: string = 'get') {
    if (id) {
      // in case of detecting change feed, we return specific resource rather than return all
      ConversationUserLink.get(id)
      .getJoin({
        conversation: true,
        user: true
      })
      .run()
      .then((data: ConversationUserLinkType) => {
        this.logger('Get Data Success');
        this.emit([data], action);
      });
    } else {
      ConversationUserLink.filter({ userId: this.options.id })
      .getJoin({
        conversation: true,
        user: true
      })
      .run()
      .then((data: Array<ConversationUserLinkType>) => {
        this.logger('Get Data Success');
        this.emit(data, 'get');
      });
    }
  }

  watch() {
    ConversationUserLink.filter({ userId: this.options.id })
    .changes()
    .then((feeds: ChangeFeedsType) => {
      this.feeds = feeds;
      feeds.each((error: any, doc: ConversationUserLinkDocType) => {
        // @TODO handle multiple doc change at the same time
        if (error) {
          this.logger('Error occured watching feed %s', JSON.stringify(error));
          return;
        }

        this.logger('Observed data change');

        if (doc.isSaved() === false) {
          this.logger('Following document was deleted: %s', JSON.stringify(doc));
          // we don't need to join query in case of deletion
          this.emit([doc], 'delete');
        } else {
          if (doc.getOldValue() == null) {
            this.logger('A new document was inserted: %s', JSON.stringify(doc));
            this.getData(doc.id, 'insert');
          } else {
            this.logger('A document was updated');
            this.logger('Old Value: %s', JSON.stringify(doc.getOldValue()));
            this.logger('New Value: %s', JSON.stringify(doc));
            this.getData(doc.id, 'update');
          }
        }
      });
    })
    .catch((err: any) => {
      this.logger('error occured %s', JSON.stringify(err));
    });
  }

  getEventName(): string {
    return 'UserConversations';
  }
}
