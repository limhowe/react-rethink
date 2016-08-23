import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {reducer as formReducer} from 'redux-form';
import watch from 'redux-watch';
import { routerReducer } from 'react-router-redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import localForage from 'localforage';

// middlewares
import fsaThunkMiddleware from 'redux-fsa-thunk';
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger';

import reducers from '../redux';
import { receiveUserConversations } from './actions';
import UserConversations from '../subscribers/UserConversations';

const reducer = combineReducers({
  app: reducers,
  form: formReducer,
  routing: routerReducer
});

// too many logging for redux-form. getting rid of them
const loggerMiddleware = createLogger({
  predicate: (getState, action) => action.type.indexOf('redux-form') === -1
});

// @TODO remove logger on production
const middlewares = [fsaThunkMiddleware, promiseMiddleware, loggerMiddleware];

const store = createStore(reducer,
  applyMiddleware(...middlewares),
  autoRehydrate()
);

persistStore(store, {
  storage: localForage,
  whitelist: ['app']
});

// watchers
const w = watch(store.getState, 'app.currentUser.id');
store.subscribe(w((newVal, oldVal, objectPath) => {
  new UserConversations({ id: newVal }, (userConversations) => {
    store.dispatch(receiveUserConversations(userConversations));
  })
}));

export default store;
