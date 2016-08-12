import ConversationController from '../controllers/conversation.server.controller';
const conversationController = new ConversationController();

export default (app) => {
  app.route('/api/conversations').post(conversationController.create);
  app.route('/api/conversations').get(conversationController.list);
};
