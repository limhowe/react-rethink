// @flow
import type MessageType from 'server/models/Message';

type ConvMessages = {
  convId: string,
  messages: Array<MessageType>
};

export default function reduceUserConversations(state: Object, payload: ConvMessages) {
  return {
    ...state,
    messages: {
      ...state.messages,
      [payload.convId]: payload.messages
    }
  };
};
