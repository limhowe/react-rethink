// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardTitle, CardText, CardActions, IconButton } from 'react-toolbox';
import MessageList from './MessageList';
import { autobind } from 'core-decorators';
import MessageCreateForm from './forms/MessageCreateForm';
import { deleteConvUserLink } from 'public/app/redux/actions';
import _ from 'lodash';

import type { State } from 'public/app/redux';
import type { Dispatch } from 'redux';

export class MessageCard extends Component {
  render(): React$Element<any> {
    const {
      conversation
    } = this.props;
    const deleteConvUserLink = () => {
      this.props.deleteConvUserLink(this.props.convUserLinkId);
    };
    return (
      <Card style={{width: '350px', float: 'left', margin: '10px'}}>
        <CardTitle>
          <h2>{conversation.title} <IconButton icon='close' onClick={deleteConvUserLink} /></h2>
        </CardTitle>
        <CardText>
          <MessageList convId={conversation.id} />
        </CardText>
        <CardActions>
          <MessageCreateForm form={conversation.id} convId={conversation.id} />
        </CardActions>
      </Card>
    );
  }
}


const mapStateToprops = (state: State) => ({
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  deleteConvUserLink: (convUserLinkId: string) => dispatch(deleteConvUserLink(convUserLinkId))
});

export default connect(mapStateToprops, mapDispatchToProps)(MessageCard);
