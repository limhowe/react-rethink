// @flow
import type { Dispatch } from 'redux';
import type { ConversationType } from 'server/models/Conversation';

import ConversationService from 'public/app/services/ConversationService';

const conversationService = new ConversationService();

export default function(conversationData: ConversationType) {
  return (dispatch: Dispatch, getState: Function) => {
    conversationData = Object.assign({}, conversationData, {status: 'STARTED'});

    return conversationService.create(conversationData)
      .then((resp) => {
        // treat resp.body
        console.log('Conversation created!', resp.body);
      });
  }
}
