import AuthController from '../controllers/auth.server.controller';
const authController = new AuthController();

export default (app) => {
  app.route('/api/auth/signin').post(authController.signin);
  app.route('/api/auth/signout').get(authController.signout);
};
