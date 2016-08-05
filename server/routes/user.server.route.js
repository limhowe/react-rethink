import UserController from '../controllers/user.server.controller';
const userController = new UserController();

export default (app) => {
  app.route('/api/users').post(userController.create);
};
