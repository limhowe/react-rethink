import BaseService from './BaseService';
import request from 'superagent';

export default class UserService extends BaseService {
  create(data) {
    return request.post('/api/users')
      .send(data);
  }

  get(id) {
    return request.get(`/api/users/${id}`);
  }

  list() {
    return request.get('/api/users');
  }
}
