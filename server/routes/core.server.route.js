import coreController from '../controllers/core.server.controller';
const core = new coreController();

export default (app) => {
  app.route('/').get(core.index);
};
