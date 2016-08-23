// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import type { State } from 'public/app/redux';
import type { Dispatch } from 'redux';

export class ConversationIndexPage extends Component {
  props: {
    children?: any
  };
  render(): React$Element<any> {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
}

const mapStateToprops = (state: State) => ({
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
});

export default connect(mapStateToprops, mapDispatchToProps)(ConversationIndexPage);
