// @flow
import type { Dispatch } from 'redux';
import type { ConversationType } from 'server/models/Conversation';

import { setConversations } from 'public/app/redux/actions';
import ConversationService from 'public/app/services/ConversationService';

const conversationService = new ConversationService();

export default function() {
  return (dispatch: Dispatch, getState: Function) => {
    return conversationService.list()
    .then((resp) => {
      // @TODO handle success, error
      dispatch(setConversations(resp.body));
    })
  }
}
