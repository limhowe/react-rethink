import Conversation from '../models/Conversation';

export default class ConversationController {
  create(req, res) {
    Conversation.save(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    })
  }

  list(req, res) {
    Conversation.run()
    .then((result) => {
      res.json(result);
    })
  }
}
