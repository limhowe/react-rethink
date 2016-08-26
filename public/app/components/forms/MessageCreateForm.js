// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Input, Button } from 'react-toolbox';
import _ from 'lodash';

import { domOnlyProps } from '../../helpers/domOnlyProps';
import { createMessage } from 'public/app/redux/actions';

import type { State } from 'public/app/redux';
import type { Dispatch } from 'redux';

export const fields = [ 'text' ];

export class MessageCreateForm extends Component {
  componentDidMount() {
    _.bindAll(this, 'handleSubmit'); // autobind does not work properly with react-hot-loader
  }

  handleSubmit(values: { text: string }) {
    this.props.createMessage({
      ...values,
      convId: this.props.convId,
      userId: this.props.currentUser.id
    });
    this.props.resetForm();
  }

  render(): React$Element<any> {
    const {fields: {text}, handleSubmit} = this.props;
    return (
      <section>
        <form onSubmit={handleSubmit(this.handleSubmit)}>
          <Input type="text" label="Message" {...domOnlyProps(text)} />
          <Button label="Submit" primary raised />
        </form>
      </section>
    );
  }
}

const mapStateToprops = (state: State) => ({
  currentUser: state.app.currentUser
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createMessage: (messageData) => dispatch(createMessage(messageData))
});

export default reduxForm({
  fields
})(
  connect(mapStateToprops, mapDispatchToProps)(MessageCreateForm)
);
