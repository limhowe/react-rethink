// @flow
import watch from 'redux-watch';

import ConversationMessages from 'public/app/subscribers/ConversationMessages';
import UserConversations from 'public/app/subscribers/UserConversations';
import { receiveUserConversations, receiveConversationMessages } from './redux/actions';

import type { ResultType as SubscriberResultType } from 'public/app/subscribers/Subscriber';
import type { State } from 'public/app/redux';

const watcherArray = {};

const createWatchers = (store: State) => {
  const watchConversations = (response: SubscriberResultType) => {
    const {
      action,
      data
    } = response;
    switch (action) {
      case 'get':
      case 'insert':
        // create subscriber in this case
        data.forEach((item) => {
          watcherArray[item.conversation.id] = new ConversationMessages({ id: item.conversation.id}, (messageConversations: Array<any>) => {
            store.dispatch(receiveConversationMessages({
              convId: item.conversation.id,
              messages: messageConversations
            }));
          });
        });
        break;
      case 'delete':
        // unsubscribe
        data.forEach((item) => {
          watcherArray[item.convId].unsubscribe();
          delete watcherArray[item.convId];
        });
        break;
      case 'update':
      default:
        break;
    }
  };

  // subscribe/unsubscribe UserConversations
  const w = watch(store.getState, 'app.currentUser.id');
  store.subscribe(w((newVal, oldVal, objectPath) => {
    if (newVal) {
      watcherArray[newVal] = new UserConversations({ id: newVal }, (userConversations: Array<any>) => {
        store.dispatch(receiveUserConversations(userConversations));
      }, watchConversations);
    } else {
      watcherArray[oldVal].unsubscribe();
      delete watcherArray[oldVal];
    }
  }));

};

export default createWatchers;
