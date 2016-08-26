import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {reducer as formReducer} from 'redux-form';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import localForage from 'localforage';
import { hashHistory } from 'react-router';

// middlewares
import fsaThunkMiddleware from 'redux-fsa-thunk';
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger';

import reducers from '../redux';

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
const middlewares = [fsaThunkMiddleware, promiseMiddleware, routerMiddleware(hashHistory), loggerMiddleware];

const store = createStore(reducer,
  applyMiddleware(...middlewares),
  autoRehydrate()
);

persistStore(store, {
  storage: localForage,
  whitelist: ['app']
});

export default store;
