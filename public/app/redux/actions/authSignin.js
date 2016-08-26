// @flow
import type { Dispatch } from 'redux';
import type { AuthType } from 'server/models/User';
import { push } from 'react-router-redux';

import { authSigninSuccess, authSigninFailure } from 'public/app/redux/actions';
import AuthService from 'public/app/services/AuthService';

const authService = new AuthService();

export default function(authData: AuthType) {
  return (dispatch: Dispatch, getState: Function) => {
    authService.signin(authData)
    .then((resp) => {
      dispatch(authSigninSuccess(resp.body));
      dispatch(push('/conversations/all'));
    })
    .catch((err) => {
      let message = 'Unknown Error';
      if (err && err.response && err.response.body.message) {
        message = err.response.body.message;
      }
      dispatch(authSigninFailure(message))
    });
  }
}
