import ConversationUserLinkController from '../controllers/convuserlink.server.controller';
const conversationUserLinkController = new ConversationUserLinkController();

export default (app) => {
  app.route('/api/conv-user-links').post(conversationUserLinkController.create);
  app.route('/api/conv-user-links/:convUserLinkId').delete(conversationUserLinkController.delete);
};
