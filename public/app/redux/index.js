// @TODO handle states for each page
import { handleActions } from 'redux-actions';
import reduceUserConversations from './reducers/reduceUserConversations';

import {
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_CONVERSATION,
  LIST_CONVERSATIONS,
  SET_CONVERSATIONS,
  CREATE_MESSAGE,
  CREATE_CONV_USER_LINK,
  RECEIVE_USER_CONVERSATIONS,
  RECEIVE_CONVERSATION_MESSAGES,
  SET_CURRENT_USER
} from './actions';

export const initialState = {
  myConversations: [],
  conversations: [],
  messages: [],
  currentUser: {}
};

export default handleActions({
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
  [RECEIVE_USER_CONVERSATIONS]: (state, action) => (reduceUserConversations(state, action.payload)),
  [RECEIVE_CONVERSATION_MESSAGES]: (state) => state,
  [SET_CURRENT_USER]: (state, action) => ({
    ...state,
    currentUser: Object.assign({}, action.payload)
  })
}, initialState);
