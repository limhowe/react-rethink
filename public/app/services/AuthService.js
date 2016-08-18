// @flow
import type { AuthType } from 'server/models/User';
import BaseService from './BaseService';
import request from 'superagent';

export default class AuthService extends BaseService {
  signin(data: AuthType): Promise<any> {
    return request.post('/api/auth/signin')
      .send(data);
  }

  signout(): Promise<any> {
    return request.get(`/api/auth/signout`);
  }
}
