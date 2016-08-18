// @flow
import type { ConversationType } from 'server/models/Conversation';
import BaseService from './BaseService';
import request from 'superagent';

export default class ConversationService extends BaseService {
  create(data: ConversationType): Promise<any> {
    return request.post('/api/conversations')
      .send(data);
  }

  get(id: string): Promise<any> {
    return request.get(`/api/conversations/${id}`);
  }

  list(): Promise<any> {
    return request.get('/api/conversations');
  }
}
