import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserCreateForm from '../components/forms/UserCreateForm';
import ConversationCreateForm from '../components/forms/ConversationCreateForm';
import ConvUserLinkCreateForm from '../components/forms/ConvUserLinkCreateForm';

export default class IndexPage extends Component {
  render() {
    const {
      app,
      currentUser,
      myConversations
    } = this.props;
    const convList = myConversations.map((conv) => (
      <div key={conv.id}>{conv.conversation.title}</div>
    ));
    return (
        <div>
          <h1>Current User: <span>{currentUser.email}</span></h1>
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

const mapStateToprops = (state) => ({
  app: state.app,
  currentUser: state.app.currentUser,
  myConversations: state.app.myConversations
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToprops, mapDispatchToProps)(IndexPage);
