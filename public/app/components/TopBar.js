// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { AppBar, Navigation, Link, IconButton } from 'react-toolbox';
import { LinkContainer } from 'react-router-bootstrap';
import Cookie from 'js-cookie';
import _ from 'lodash';

import { toggleDrawerActive, authSignout } from 'public/app/redux/actions';
import { getI18nInstance } from 'public/app/helpers/i18n';

import type { State } from 'public/app/redux';
import type { Dispatch } from 'redux';

export class TopBar extends Component {
  _isLoggedIn(): bool {
    return !!this.props.currentUser.email;
  }

  setLanguage(lng) {
    const i18n = getI18nInstance();
    Cookie.set('i18next', lng);
    i18n.changeLanguage(lng);
  }

  render(): React$Element<any> {
    const {
      currentUser,
      toggleDrawerActive,
      authSignout,
      t
    } = this.props;
    return (
      <AppBar>
        <IconButton icon="menu" inverse onClick={ toggleDrawerActive }/>
          <span>{this._isLoggedIn() ? `${currentUser.email}` : null}</span>
          {
            this._isLoggedIn() ?
              (
                <Navigation type="horizontal">
                  <Link label={t('topBar.logOut')} onClick={authSignout} />
                </Navigation>
              ) :
              (
                <Navigation type="horizontal">
                  <LinkContainer to="/login">
                    <Link label={t('topBar.logIn')} />
                  </LinkContainer>
                  <LinkContainer to="/signup">
                    <Link label={t('topBar.signUp')} />
                  </LinkContainer>
                </Navigation>
              )
          }
        <Navigation type="horizontal">
          <Link label="en" onClick={_.partial(this.setLanguage, 'en')} />
        </Navigation>
        <Navigation type="horizontal">
          <Link label="fr" onClick={_.partial(this.setLanguage, 'fr')} />
        </Navigation>
      </AppBar>
    );
  }
}

const mapStateToprops = (state: State) => ({
  currentUser: state.app.currentUser
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleDrawerActive: () => dispatch(toggleDrawerActive()),
  authSignout: () => dispatch(authSignout())
});

export default translate()(connect(mapStateToprops, mapDispatchToProps)(TopBar));
