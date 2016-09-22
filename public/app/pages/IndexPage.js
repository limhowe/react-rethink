// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { Layout, AppBar, Panel, NavDrawer, Navigation, Link } from 'react-toolbox';
import { LinkContainer } from 'react-router-bootstrap';

import TopBar from 'public/app/components/TopBar';
import { toggleDrawerActive } from 'public/app/redux/actions';

import type { State } from 'public/app/redux';
import type { Dispatch } from 'redux';

export class IndexPage extends Component {
  render(): React$Element<any> {
    const {
      drawerActive,
      drawerPinned,
      toggleDrawerActive,
      t
    } = this.props;
    return (
      <Layout>
        <NavDrawer active={drawerActive}
            pinned={drawerPinned}
            permanentAt='xl'
            onOverlayClick={ toggleDrawerActive }>
          <Navigation type="vertical">
            <LinkContainer to="/conversations/create">
              <Link label={t('pageTitles.createConversation')} />
            </LinkContainer>
            <LinkContainer to="/conversations/all">
              <Link label={t('pageTitles.joinConversation')} />
            </LinkContainer>
            <LinkContainer to="/conversations/mine">
              <Link label={t('pageTitles.myConversations')} />
            </LinkContainer>
          </Navigation>
        </NavDrawer>
        <Panel>
          <TopBar />
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
            {this.props.children}
          </div>
        </Panel>
      </Layout>
    );
  }
}

const mapStateToprops = (state: State) => ({
  drawerPinned: state.app.layout.drawerPinned,
  drawerActive: state.app.layout.drawerActive
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleDrawerActive: () => dispatch(toggleDrawerActive())
});

export default translate()(connect(mapStateToprops, mapDispatchToProps)(IndexPage));
