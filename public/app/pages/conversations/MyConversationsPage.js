// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import MessageCard from 'public/app/components/MessageCard';

import type { State } from 'public/app/redux';
import type { Dispatch } from 'redux';

export class MyConversationsPage extends Component {
  render(): React$Element<any> {
    const {
      myConversations
    } = this.props.app;
    const convList = myConversations.map((conv) => (
      <MessageCard conversation={conv.conversation} key={conv.id} convUserLinkId={conv.id} />
    ));
    return (
      <div >
        <h2>My Conversations</h2>
        {convList}
      </div>
    );
  }
}

const mapStateToprops = (state: State) => ({
  app: state.app
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
});

export default connect(mapStateToprops, mapDispatchToProps)(MyConversationsPage);
