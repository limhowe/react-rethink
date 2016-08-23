// @flow
import React, { Component } from 'react';
import { Router, Redirect, Route, IndexRedirect } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createHashHistory from 'history/lib/createHashHistory';

import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ConversationIndexPage from './pages/conversations/ConversationIndexPage';
import AllConversationsPage from './pages/conversations/AllConversationsPage';
import CreateConversationPage from './pages/conversations/CreateConversationPage';
import MyConversationsPage from './pages/conversations/MyConversationsPage';

import store from './redux/store';

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(createHashHistory(), store);

const routes = (
  <Router history={history}>
    <Route path="/" component={IndexPage}>
      <IndexRedirect to="/login" />
      <Route path="login" component={LoginPage} />
      <Route path="signup" component={SignUpPage} />
      <Route path="conversations" component={ConversationIndexPage}>
        <IndexRedirect to="/all" />
        <Route path="all" component={AllConversationsPage} />
        <Route path="create" component={CreateConversationPage} />
        <Route path="mine" component={MyConversationsPage} />
      </Route>
    </Route>
  </Router>
);

export default routes;
