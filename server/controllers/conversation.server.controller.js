// @flow
import Conversation from '../models/Conversation';

import type { $Response, $Request } from 'express';
import type { ConversationType } from '../models/Conversation';

export default class ConversationController {
  create(req: $Request, res: $Response) {
    Conversation.save(req.body)
    .then((result: ConversationType) => {
      res.json(result);
    })
    .catch((err: any) => {
      res.status(400).json(err);
    })
  }

  list(req: $Request, res: $Response) {
    Conversation.run()
    .then((result: Array<ConversationType>) => {
      res.json(result);
    })
  }
}
