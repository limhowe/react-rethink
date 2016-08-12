import BaseService from './BaseService';
import request from 'superagent';

export default class MessageService extends BaseService {
  create(data) {
    return request.post('/api/messages')
      .send(data);
  }

  get(id) {
    return request.get(`/api/messages/${id}`);
  }

  list() {
    return request.get('/api/messages');
  }
}
