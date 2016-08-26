import MessageController from '../controllers/message.server.controller';
const messageController = new MessageController();

export default (app) => {
  app.route('/api/messages').post(messageController.create);
};
