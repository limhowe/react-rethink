import BaseService from './BaseService';
import request from 'superagent';

export default class ConversationService extends BaseService {
  create(data) {
    return request.post('/api/conversations')
      .send(data);
  }

  get(id) {
    return request.get(`/api/conversations/${id}`);
  }

  list() {
    return request.get('/api/conversations');
  }
}
