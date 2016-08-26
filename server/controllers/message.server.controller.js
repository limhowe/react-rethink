// @flow
import Message from '../models/Message';
import moment from 'moment';
import type { $Response, $Request } from 'express';
import type { MessageType } from '../models/Message';

export default class MessageController {
  create(req: $Request, res: $Response) {
    Message.save({
      ...req.body,
      createdAt: moment().format('x')
    })
    .then((result: MessageType) => {
      res.json(result);
    })
    .catch((err: any) => {
      console.log(err);
      res.status(400).json(err);
    })
  }
}
