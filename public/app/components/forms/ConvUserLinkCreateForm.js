// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { autobind } from 'core-decorators';
import _ from 'lodash';

import { domOnlyProps } from '../../helpers/domOnlyProps';
import { createConvUserLink } from '../../redux/actions';
import { Dropdown, Button } from 'react-toolbox';

import type { State } from 'public/app/redux';
import type { Dispatch } from 'redux';

export const fields = [ 'convId' ];

export type ConvUserLinkValueType = {
  convId: string
};

export class ConvUserLinkCreateForm extends Component {
  componentDidMount() {
    _.bindAll(this, 'handleSubmit'); // autobind does not work properly with react-hot-loader
  }

  handleSubmit(values: ConvUserLinkValueType) {
    this.props.createConvUserLink({
      ...values,
      userId: this.props.currentUser.id
    });
  }

  render(): React$Element<any> {
    const {fields: {convId}, handleSubmit, submitting, createConvUserLink, conversations, currentUser, t} = this.props;
    const options = conversations.map((conv) => ({value: conv.id, label: conv.title}));
    return (
      <section>
        <form onSubmit={handleSubmit(this.handleSubmit)}>
          <h1>{t('pageTitles.joinConversation')}</h1>
          <Dropdown source={options} {...domOnlyProps(convId)} />
          <Button label={t('fieldLabels.join')} primary raised />
        </form>
      </section>
    );
  }
}

const mapStateToprops = (state) => ({
  conversations: state.app.conversations,
  currentUser: state.app.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  createConvUserLink: (convUserLinkData) => dispatch(createConvUserLink(convUserLinkData))
});

export default reduxForm({
  form: 'conv-user-link-create',
  fields
})(
  translate()(connect(mapStateToprops, mapDispatchToProps)(ConvUserLinkCreateForm))
);
