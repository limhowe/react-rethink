// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { domOnlyProps } from '../../helpers/domOnlyProps';
import { Input, Button } from 'react-toolbox';

import { createConversation } from 'public/app/redux/actions';

import type { State } from 'public/app/redux';
import type { Dispatch } from 'redux';

export const fields = [ 'title' ];

export class ConversationCreateForm extends Component {
  render(): React$Element<any> {
    const {fields: {title}, handleSubmit, submitting, createConversation} = this.props;
    return (
      <section>
        <form onSubmit={handleSubmit(createConversation)}>
          <h1>Create Conversation</h1>
          <Input type="text" label="Title" {...domOnlyProps(title)} />
          <Button label="Submit" primary raised />
        </form>
      </section>
    );
  }
}

const mapStateToprops = (state: State) => ({

});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createConversation: (conversationData) => dispatch(createConversation(conversationData))
});

export default reduxForm({
  form: 'conversation-create',
  fields
})(
  connect(mapStateToprops, mapDispatchToProps)(ConversationCreateForm)
);
