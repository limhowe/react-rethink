// @flow
import ConversationUserLink from '../models/ConversationUserLink';

import type { $Response, $Request } from 'express';
import type { ConversationUserLinkType } from '../models/ConversationUserLink';

export default class ConversationUserLinkController {
  create(req: $Request, res: $Response) {
    ConversationUserLink.save(req.body)
    .then((result: ConversationUserLinkType) => {
      res.json(result);
    })
    .catch((err: any) => {
      res.status(400).json(err);
    });
  }

  delete(req: $Request, res: $Response) {
    ConversationUserLink.get(req.params.convUserLinkId)
    .delete()
    .then(() => {
      res.json({ success: true });
    })
    .catch((err: any) => {
      res.status(400).json(err);
    });
  }
}
