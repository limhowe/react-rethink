// @flow
import type { Dispatch } from 'redux';
import type { UserType } from 'server/models/User';

import { createUserSuccess } from 'public/app/redux/actions';
import UserService from 'public/app/services/UserService';

const userService = new UserService();

export default function(userData: UserType) {
  return (dispatch: Dispatch, getState: Function) => {
    userService.create(userData)
    .then((resp) => {
      dispatch(createUserSuccess(resp.body));
    });
  }
}
