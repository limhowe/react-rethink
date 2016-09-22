// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import { listConversations } from './redux/actions';
import store from './redux/store';
import createWatchers from './watchers';
import routes from './routes';
import { getI18nInstance, initI18next } from './helpers/i18n';

export default class App extends Component {
  componentDidMount() {
    store.dispatch(listConversations());

    createWatchers(store);
  }

  render(): React$Element<any> {
    return (
      <Provider store={store}>
        <I18nextProvider i18n={getI18nInstance()}>
          {routes}
        </I18nextProvider>
      </Provider>
    );
  }
}
