// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppBar, Navigation, Link, IconButton } from 'react-toolbox';
import { LinkContainer } from 'react-router-bootstrap';

import { toggleDrawerActive, authSignout } from 'public/app/redux/actions';

import type { State } from 'public/app/redux';
import type { Dispatch } from 'redux';

export class TopBar extends Component {
  _isLoggedIn(): bool {
    return !!this.props.currentUser.email;
  }

  render(): React$Element<any> {
    const {
      currentUser,
      toggleDrawerActive,
      authSignout
    } = this.props;
    return (
      <AppBar>
        <IconButton icon="menu" inverse onClick={ toggleDrawerActive }/>
          <span>{this._isLoggedIn() ? `${currentUser.email}` : null}</span>
          {
            this._isLoggedIn() ?
              (
                <Navigation type="horizontal">
                  <Link label="Log out" onClick={authSignout} />
                </Navigation>
              ) :
              (
                <Navigation type="horizontal">
                  <LinkContainer to="/login">
                    <Link label="Login" />
                  </LinkContainer>
                  <LinkContainer to="/signup">
                    <Link label="Sign Up" />
                  </LinkContainer>
                </Navigation>
              )
          }
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

export default connect(mapStateToprops, mapDispatchToProps)(TopBar);
