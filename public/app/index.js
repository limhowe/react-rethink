// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { listConversations } from './redux/actions';
import store from './redux/store';
import routes from './routes';

export default class App extends Component {
  componentDidMount() {
    store.dispatch(listConversations());
  }

  render(): React$Element<any> {
    return (
      <Provider store={store}>
        {routes}
      </Provider>
    );
  }
}
