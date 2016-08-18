// @flow
import Subscriber from './Subscriber';

export default class UserConversations extends Subscriber {
  getSubscriberName(): string {
    return 'UserConversations';
  }
}
