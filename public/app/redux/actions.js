import { createAction } from 'redux-actions';

import createUserAction from './actions/createUser';
import createConversationAction from './actions/createConversation';
import createMessageAction from './actions/createMessage';
import listConversationsAction from './actions/listConversations';
import createConvUserLinkAction from './actions/createConvUserLink';
import authSigninAction from './actions/authSignin';
import authSignoutAction from './actions/authSignout';
import deleteConvUserLinkAction from './actions/deleteConvUserLink';

// ====================================
// layout actions
// ====================================
export const TOGGLE_DRAWER_ACTIVE = 'layout/toggle-drawer-active';
export const TOGGLE_DRAWER_PINNED = 'layout/toggle-drawer-pinned';
export const toggleDrawerActive = createAction(TOGGLE_DRAWER_ACTIVE);
export const toggleDrawerPinned = createAction(TOGGLE_DRAWER_PINNED);

// ====================================
// conversation actions
// ====================================
export const CREATE_CONVERSATION = 'conversation/create';
export const LIST_CONVERSATIONS = 'conversation/list';
export const SET_CONVERSATIONS = 'conversation/list/set';
export const RECEIVE_CONVERSATION_MESSAGES = 'conversation-messages/receive';

export const createConversation = createAction(CREATE_CONVERSATION, createConversationAction);
export const setConversations = createAction(SET_CONVERSATIONS, conversations => conversations);
export const listConversations = createAction(LIST_CONVERSATIONS, listConversationsAction);
export const receiveConversationMessages = createAction(RECEIVE_CONVERSATION_MESSAGES,
  (conversationMessages) => (conversationMessages)
);

// ====================================
// message actions
// ====================================
export const CREATE_MESSAGE = 'message/create';
export const createMessage = createAction(CREATE_MESSAGE, createMessageAction);

// ====================================
// conv user link actions
// ====================================
export const CREATE_CONV_USER_LINK = 'conv-user-link/create';
export const DELETE_CONV_USER_LINK = 'conv-user-link/delete';
export const createConvUserLink = createAction(CREATE_CONV_USER_LINK, createConvUserLinkAction);
export const deleteConvUserLink = createAction(DELETE_CONV_USER_LINK, deleteConvUserLinkAction);

// ====================================
// user actions
// ====================================
export const CREATE_USER = 'user/create';
export const CREATE_USER_SUCCESS = 'user/create/success';
export const SET_CURRENT_USER = 'current-user/set';
export const RECEIVE_USER_CONVERSATIONS = 'user-conversations/receive';

export const createUser = createAction(CREATE_USER, createUserAction);
export const createUserSuccess = createAction(CREATE_USER_SUCCESS, (userData) =>
  (dispatch, getState) => {
    dispatch(setCurrentUser(userData));
  }
);
export const setCurrentUser = createAction(SET_CURRENT_USER, user => user);
export const receiveUserConversations = createAction(RECEIVE_USER_CONVERSATIONS,
  (userConversations) => (userConversations)
);

// ====================================
// auth actions
// ====================================
export const AUTH_SIGNIN = 'auth/signin';
export const AUTH_SIGNOUT = 'auth/signout';
export const AUTH_SIGNIN_SUCCESS = 'auth/signin/success';
export const AUTH_SIGNIN_FAILURE = 'auth/signin/failure';
export const AUTH_SIGNOUT_SUCCESS = 'auth/signout/success';

export const authSignin = createAction(AUTH_SIGNIN, authSigninAction);
export const authSigninSuccess = createAction(AUTH_SIGNIN_SUCCESS, (userData) =>
  (dispatch, getState) => {
    dispatch(setCurrentUser(userData));
  }
);
export const authSigninFailure = createAction(AUTH_SIGNIN_FAILURE, resp => resp);
export const authSignout = createAction(AUTH_SIGNOUT, authSignoutAction);
export const authSignoutSuccess = createAction(AUTH_SIGNOUT_SUCCESS, () => {
  (dispatch, getState) => {
    dispatch(setCurrentUser({}));
  }
});
