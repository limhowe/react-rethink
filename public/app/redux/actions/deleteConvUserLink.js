// @flow
import type { Dispatch } from 'redux';
import { push } from 'react-router-redux';

import ConvUserLinkService from 'public/app/services/ConvUserLinkService';
const convUserLinkService = new ConvUserLinkService();

export default function(convUserLinkId: string) {
  return (dispatch: Dispatch, getState: Function) => {
    return convUserLinkService.delete(convUserLinkId)
      .then((resp) => {
        // @TODO handle success, error
      });
  }
}
