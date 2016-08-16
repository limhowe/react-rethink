import React, { Component } from 'react';
import { Provider } from 'react-redux';

import IndexPage from './pages/IndexPage';
import { listConversations } from './redux/actions';
import store from './redux/store';

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
