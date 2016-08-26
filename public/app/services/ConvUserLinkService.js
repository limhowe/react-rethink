import BaseService from './BaseService';
import request from 'superagent';

export default class ConvUserLinkService extends BaseService {
  create(data) {
    return request.post('/api/conv-user-links')
      .send(data);
  }

  get(id) {
    return request.get(`/api/conv-user-links/${id}`);
  }

  delete(id) {
    return request.delete(`/api/conv-user-links/${id}`);
  }

  list() {
    return request.get('/api/conv-user-links');
  }
}
