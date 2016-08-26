// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import type { State } from 'public/app/redux';
import type { Dispatch } from 'redux';

import ConversationCreateForm from 'public/app/components/forms/ConversationCreateForm';

export class CreateConversationPage extends Component {
  render(): React$Element<any> {
    return (
      <div>
        <ConversationCreateForm />
      </div>
    );
  }
}

const mapStateToprops = (state: State) => ({
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
});

export default connect(mapStateToprops, mapDispatchToProps)(CreateConversationPage);
