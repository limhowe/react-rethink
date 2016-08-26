// @flow
import type { Dispatch } from 'redux';
import type { MessageType } from 'server/models/Message';

import MessageService from 'public/app/services/MessageService';

const messageService = new MessageService();

export default function(messageData: MessageType) {
  return (dispatch: Dispatch, getState: Function) => {
    messageData = Object.assign({}, messageData);

    return messageService.create(messageData)
      .then((resp) => {
        // treat resp.body
        console.log('Message created!', resp.body);
      });
  }
}
