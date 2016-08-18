// @flow
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import {domOnlyProps} from '../../helpers/domOnlyProps';
export const fields = [ 'text', 'userId', 'convId' ];

export class MessageCreateForm extends Component {
  render(): React$Element<any> {
    const {fields: {userId, text, convId}, handleSubmit, submitting} = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <input type="hidden" {...domOnlyProps(userId)}/>
        <input type="hidden" {...domOnlyProps(convId)}/>
        <fieldset>
          <div>
            <label>Text</label>
            <input type="text" placeholder="Text" {...domOnlyProps(text)}/>
          </div>
          <button type="submit" disabled={submitting}>Submit</button>
        </fieldset>
      </form>
    );
  }
}

export default reduxForm({
  form: 'message-create',
  fields
})(MessageCreateForm);
