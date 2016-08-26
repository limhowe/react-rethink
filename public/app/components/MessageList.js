// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'react-toolbox';
import moment from 'moment';

import type { State } from 'public/app/redux';

export class MessageList extends Component {
  render(): React$Element<any> {
    console.log(this.props.convId, this.props.messages);
    const messages = this.props.messages[this.props.convId] || [];
    return (
      <div style={{'maxHeight': '300px', 'overflowY': 'auto'}}>
        <List ripple>
          {
            messages.map((message) => (
              <ListItem key={message.id} caption={`${message.user.name}: ${message.text}`} legend={moment(message.createdAt, 'x').format('LLL')} />
            ))
          }
        </List>
      </div>
    );
  }
}

const mapStateToprops = (state: State) => ({
  messages: state.app.messages
});

export default connect(mapStateToprops)(MessageList);
