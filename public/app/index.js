import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import {reducer as formReducer} from 'redux-form';
import fsaThunkMiddleware from 'redux-fsa-thunk';
import promiseMiddleware from 'redux-promise';
import watch from 'redux-watch';

import IndexPage from './pages/IndexPage';
import reducers from './redux';
import { listConversations, receiveUserConversations } from './redux/actions';
import UserConversations from './subscribers/UserConversations';

const reducer = combineReducers({
  app: reducers,
  form: formReducer
});

const store = createStore(reducer,
  applyMiddleware(fsaThunkMiddleware, promiseMiddleware)
);

const w = watch(store.getState, 'app.currentUser.id');
store.subscribe(w((newVal, oldVal, objectPath) => {
  new UserConversations({ id: newVal }, (userConversations) => {
    store.dispatch(receiveUserConversations(userConversations));
  })
}));

export default class App extends Component {
  componentDidMount() {
    store.dispatch(listConversations());
  }

  render() {
    return (
      <Provider store={store}>
        <IndexPage />
      </Provider>
    );
  }
}
