import User from '../models/User';

export default class UserController {
  create(req, res) {
    User.save(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    })
  }
}
