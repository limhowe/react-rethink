import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import glob from 'glob';
import chalk from 'chalk';
import consolidate from 'consolidate';

import initSocket from './socket';
import config from './config';

const initRoutes = (app) => {
  // including all routes
  glob('./routes/*.js', { cwd: path.resolve('./server') }, (err, routes) => {
    if (err) {
      console.log(chalk.red(`Error occured including routes`));
      return;
    }
    routes.forEach((routePath) => {
      require(routePath).default(app);
    });
    console.log(chalk.green(`included ${routes.length} route files`));
  });
};

const initMiddlewares = (app) => {
  // 3rd party middleware
  app.use(cors({
    exposedHeaders: ['Link']
  }));
  app.use(bodyParser.json({
    limit : '100kb'
  }));
};

const initTemplateEngine = (app) => {
  app.engine('html', consolidate.swig);
  app.set('views', path.resolve('./server/views'));
  app.set('view engine', 'html');
};

const app = express();
const port = process.env.PORT || config.port;

app.server = http.createServer(app);

initMiddlewares(app);
initTemplateEngine(app);
initRoutes(app);

// start listening
app.server.listen(port);
console.log(chalk.green(`Express started on port ${app.server.address().port}`));

initSocket(app);
console.log(chalk.green(`Socket initialized`));

// public
// app.use(express.static('public'));

export default app;
