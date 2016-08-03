import ConversationUserLink from '../models/ConversationUserLink';

export default class ConversationUserLinkController {
  create(req, res) {
    ConversationUserLink.save(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    })
  }
}
