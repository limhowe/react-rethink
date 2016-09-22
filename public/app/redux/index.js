import { handleActions } from 'redux-actions';
import reduceUserConversations from './reducers/reduceUserConversations';
import reduceConversationMessages from './reducers/reduceConversationMessages';
import { REHYDRATE } from 'redux-persist/constants';
import {
  TOGGLE_DRAWER_ACTIVE,
  TOGGLE_DRAWER_PINNED,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_CONVERSATION,
  LIST_CONVERSATIONS,
  SET_CONVERSATIONS,
  CREATE_MESSAGE,
  CREATE_CONV_USER_LINK,
  DELETE_CONV_USER_LINK,
  RECEIVE_USER_CONVERSATIONS,
  RECEIVE_CONVERSATION_MESSAGES,
  SET_CURRENT_USER,
  AUTH_SIGNIN,
  AUTH_SIGNIN_SUCCESS,
  AUTH_SIGNIN_FAILURE,
  AUTH_SIGNOUT,
  AUTH_SIGNOUT_SUCCESS
} from './actions';

import type ConversationType from 'server/models/Conversation';
import type MessageType from 'server/models/Message';
import type UserType from 'server/models/User';

export type LoginFormState = {
  error: string
};

export type AppState = {
  myConversations: Array<ConversationType>,
  conversations: Array<ConversationType>,
  messages: Array<Object>,
  currentUser: UserType,
  loginForm: Object,
  layout: {
    drawerPinned: bool,
    drawerActive: bool
  }
};

export type State = {
  form: ?Object, // redux-form states
  app: AppState
};

export const initialState = {
  myConversations: [],
  conversations: [],
  messages: {},
  currentUser: {},
  loginForm: {
    error: ''
  },
  layout: {
    drawerActive: false,
    drawerPinned: false
  }
};

export default handleActions({
  [REHYDRATE]: (state, action) => ({
    ...state,
    currentUser: action.payload && action.payload.app && action.payload.app.currentUser || {}
  }),
  [TOGGLE_DRAWER_ACTIVE]: (state) => ({
    ...state,
    layout: {
      ...state.layout,
      drawerActive: !state.layout.drawerActive
    }
  }),
  [TOGGLE_DRAWER_PINNED]: (state) => ({
    ...state,
    layout: {
      ...state.layout,
      drawerPinned: !state.layout.drawerPinned
    }
  }),
  [CREATE_USER]: (state) => state,
  [CREATE_USER_SUCCESS]: (state) => state,
  [CREATE_CONVERSATION]: (state) => state,
  [LIST_CONVERSATIONS]: (state) => state,
  [SET_CONVERSATIONS]: (state, action) => ({
    ...state,
    conversations: action.payload
  }),
  [CREATE_MESSAGE]: (state) => state,
  [CREATE_CONV_USER_LINK]: (state) => state,
  [DELETE_CONV_USER_LINK]: (state) => state,
  [RECEIVE_USER_CONVERSATIONS]: (state, action) => (reduceUserConversations(state, action.payload)),
  [RECEIVE_CONVERSATION_MESSAGES]: (state, action) => (reduceConversationMessages(state, action.payload)),
  [SET_CURRENT_USER]: (state, action) => ({
    ...state,
    currentUser: Object.assign({}, action.payload)
  }),
  [AUTH_SIGNIN]: (state) => ({
    ...state,
    loginForm: {
      ...state.loginForm,
      error: ''
    }
  }),
  [AUTH_SIGNIN_SUCCESS]: (state) => state,
  [AUTH_SIGNIN_FAILURE]: (state, action) => ({
    ...state,
    loginForm: {
      ...state.loginForm,
      error: action.payload
    }
  }),
  [AUTH_SIGNOUT]: (state) => state,
  [AUTH_SIGNOUT_SUCCESS]: (state) => ({
    ...state,
    currentUser: {},
    myConversations: []
  })
}, initialState);
