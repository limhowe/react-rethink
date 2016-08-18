// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Layout, AppBar, Panel } from 'react-toolbox';

import IndexPage from './pages/IndexPage';
import TopBar from './components/TopBar';
import { listConversations } from './redux/actions';
import store from './redux/store';

export default class App extends Component {
  componentDidMount() {
    store.dispatch(listConversations());
  }

  render(): React$Element<any> {
    return (
      <Provider store={store}>
          <Layout>
            <Panel>
              <TopBar />
              <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
                <IndexPage />
              </div>
            </Panel>
          </Layout>
      </Provider>
    );
  }
}
