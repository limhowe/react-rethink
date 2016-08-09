import { createAction } from 'redux-actions';

// @TODO: manage converstationStatus, onlineStatus as constants

// define actions
export const CREATE_CONVERSATION = 'conversation/create';
export const CREATE_MESSAGE = 'message/create';
export const CREATE_CONV_USER_LINK = 'conv-user-link/create';
export const RECEIVE_USER_CONVERSATIONS = 'user-conversations/receive';
export const RECEIVE_CONVERSATION_MESSAGES = 'conversation-messages/receive';

// create actions
export const createConversation = createAction(CREATE_CONVERSATION,
  (title) => ({title, status: 'STARTED'})
);

export const createMessage = createAction(CREATE_MESSAGE,
  (userId, convId, text) => ({ userId, convId, text })
);

export const createConvUserLink = createAction(CREATE_CONV_USER_LINK,
  (userId, convId) => ({userId, convId})
);

export const receiveUserConversations = createAction(RECEIVE_USER_CONVERSATIONS,
  (userConversations) => (userConversations)
);

export const receiveConversationMessages = createAction(RECEIVE_CONVERSATION_MESSAGES,
  (conversationMessages) => (conversationMessages)
);
