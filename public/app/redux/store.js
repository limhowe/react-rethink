import { createStore, combineReducers, applyMiddleware } from 'redux';
import {reducer as formReducer} from 'redux-form';
import watch from 'redux-watch';

// middlewares
import fsaThunkMiddleware from 'redux-fsa-thunk';
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger';

import reducers from '../redux';
import { receiveUserConversations } from './actions';
import UserConversations from '../subscribers/UserConversations';

const reducer = combineReducers({
  app: reducers,
  form: formReducer
});

const loggerMiddleware = createLogger();

const store = createStore(reducer,
  applyMiddleware(fsaThunkMiddleware, promiseMiddleware, loggerMiddleware)
);

// watchers
const w = watch(store.getState, 'app.currentUser.id');
store.subscribe(w((newVal, oldVal, objectPath) => {
  new UserConversations({ id: newVal }, (userConversations) => {
    store.dispatch(receiveUserConversations(userConversations));
  })
}));

export default store;
