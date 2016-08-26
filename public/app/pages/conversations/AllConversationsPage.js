// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import type { State } from 'public/app/redux';
import type { Dispatch } from 'redux';

import ConvUserLinkCreateForm from 'public/app/components/forms/ConvUserLinkCreateForm';

export class AllConversationsPage extends Component {
  render(): React$Element<any> {
    return (
      <div>
        <ConvUserLinkCreateForm />
      </div>
    );
  }
}

const mapStateToprops = (state: State) => ({
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
});

export default connect(mapStateToprops, mapDispatchToProps)(AllConversationsPage);
