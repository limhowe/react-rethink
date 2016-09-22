// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';

import MessageCard from 'public/app/components/MessageCard';

import type { State } from 'public/app/redux';
import type { Dispatch } from 'redux';

export class MyConversationsPage extends Component {
  render(): React$Element<any> {
    const {
      app: { myConversations },
      t
    } = this.props;
    const convList = myConversations.map((conv) => (
      <MessageCard conversation={conv.conversation} key={conv.id} convUserLinkId={conv.id} />
    ));
    return (
      <div >
        <h2>{t('pageTitles.myConversations')}</h2>
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

export default translate()(connect(mapStateToprops, mapDispatchToProps)(MyConversationsPage));
