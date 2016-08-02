import horizon from '@horizon/server';
import path from 'path';
import glob from 'glob';
import chalk from 'chalk';

import app from './express';
import config from './config';
import { setupDB } from './rethinkdb';

// @TODO: allow authentication
const hzConfig = Object.assign({}, config.horizon, {
  project_name: config.rethinkDB.dbName,
  auto_create_collection: true,
  auto_create_index: true,
  rdb_host: config.rethinkDB.dbHost,
  rdb_port: config.rethinkDB.dbPort,
  path: '/horizon',
  permissions: false,
  auth: {
    allow_unauthenticated: true,
    token_secret: 'secret!@#$%^&'
  }
});

const hz =  horizon(app.server, hzConfig);

// importing custom subscribers
glob('./subscribers/*.js', { cwd: path.resolve('./server') }, (err, subscribers) => {
  if (err) {
    console.log(chalk.red(`Error occured including custom subscribers`));
    return;
  }

  subscribers.forEach((subscriberPath) => {
    const subscriber = path.relative('./subscribers', subscriberPath)
      .replace(/\.js$/, '');
    hz.add_request_handler(subscriber, require(subscriberPath).default);
    console.log(chalk.green(`included ${subscriber} to horizon`));
  });

  console.log(chalk.green(`included ${subscribers.length} subscribers`));
});

export default hz;
