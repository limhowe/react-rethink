// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppBar } from 'react-toolbox';

import type { State } from 'public/app/redux';
import type { Dispatch } from 'redux';

export class TopBar extends Component {
  render(): React$Element<any> {
    const {
      currentUser,
    } = this.props;
    return (
      <AppBar>
        <span>{currentUser.email ? `${currentUser.email}` : 'Not logged in'}</span>
      </AppBar>
    );
  }
}

const mapStateToprops = (state: State) => ({
  currentUser: state.app.currentUser
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
});

export default connect(mapStateToprops, mapDispatchToProps)(TopBar);
