import { createAction } from 'redux-actions';

import UserService from '../services/UserService';
import ConversationService from '../services/ConversationService';
import MessageService from '../services/MessageService';
import ConvUserLinkService from '../services/ConvUserLinkService';

const userService = new UserService();
const conversationService = new ConversationService();
const messageService = new MessageService();
const convUserLinkService = new ConvUserLinkService();

// @TODO: manage converstationStatus, onlineStatus as constants

// define actions
export const CREATE_CONVERSATION = 'conversation/create';
export const LIST_CONVERSATIONS = 'conversation/list';
export const SET_CONVERSATIONS = 'conversation/list/set';

export const CREATE_MESSAGE = 'message/create';
export const CREATE_CONV_USER_LINK = 'conv-user-link/create';
export const CREATE_USER = 'user/create';
export const CREATE_USER_SUCCESS = 'user/create/success';

export const RECEIVE_USER_CONVERSATIONS = 'user-conversations/receive';
export const RECEIVE_CONVERSATION_MESSAGES = 'conversation-messages/receive';
export const SET_CURRENT_USER = 'current-user/set';

export const createUserSuccess = createAction(CREATE_USER_SUCCESS, (userData) => (dispatch, getState) => {
  dispatch(setCurrentUser(userData));
});

// create actions
export const createUser = createAction(CREATE_USER,
  (userData) => { // email, name
    return (dispatch, getState) => {
      userService.create(userData)
      .then((resp) => {
        dispatch(createUserSuccess(resp.body));
      });
    }
  }
);

export const createConversation = createAction(CREATE_CONVERSATION,
  (conversationData) => (dispatch, getState) => {
    conversationData = Object.assign({}, conversationData, {status: 'STARTED'});
    console.log(conversationData);
    return conversationService.create(conversationData)
      .then((resp) => {
        console.log(resp.body);
      });
  }
);

export const setConversations = createAction(SET_CONVERSATIONS,
  (conversations) => conversations
);

export const listConversations = createAction(LIST_CONVERSATIONS,
  () => (dispatch, getState) => {
    conversationService.list()
    .then((resp) => {
      // @TODO handle success, error
      dispatch(setConversations(resp.body));
    })
  }
);

export const createMessage = createAction(CREATE_MESSAGE,
  (userId, convId, text) => ({ userId, convId, text })
);

export const createConvUserLink = createAction(CREATE_CONV_USER_LINK,
  (convUserLinkData) => (dispatch, getState) => {
    return convUserLinkService.create(convUserLinkData)
      .then((resp) => {
        // @TODO handle success, error
      });
  }
);

export const receiveUserConversations = createAction(RECEIVE_USER_CONVERSATIONS,
  (userConversations) => (userConversations)
);

export const receiveConversationMessages = createAction(RECEIVE_CONVERSATION_MESSAGES,
  (conversationMessages) => (conversationMessages)
);

export const setCurrentUser = createAction(SET_CURRENT_USER,
  (user) => user
);
