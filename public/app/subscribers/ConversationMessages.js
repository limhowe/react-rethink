// @flow
import Subscriber from './Subscriber';

export default class ConversationMessages extends Subscriber {
  getSubscriberName(): string {
    return 'ConversationMessages';
  }
}
