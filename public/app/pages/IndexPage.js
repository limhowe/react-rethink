// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserSignInForm from '../components/forms/UserSignInForm';
import UserCreateForm from '../components/forms/UserCreateForm';
import ConversationCreateForm from '../components/forms/ConversationCreateForm';
import ConvUserLinkCreateForm from '../components/forms/ConvUserLinkCreateForm';

import type { State } from 'public/app/redux';
import type { Dispatch } from 'redux';

export class IndexPage extends Component {
  render(): React$Element<any> {
    const {
      app,
      myConversations
    } = this.props;
    const convList = myConversations.map((conv) => (
      <div key={conv.id}>{conv.conversation.title}</div>
    ));
    return (
        <div>
          <UserSignInForm />
          <UserCreateForm />
          <ConversationCreateForm />
          <ConvUserLinkCreateForm />
          <div>
            <h2>My Conversations</h2>
            {convList}
          </div>
        </div>
    );
  }
}

const mapStateToprops = (state: State) => ({
  app: state.app,
  myConversations: state.app.myConversations
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
});

export default connect(mapStateToprops, mapDispatchToProps)(IndexPage);
