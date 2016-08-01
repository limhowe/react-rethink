import horizon from '@horizon/server';
import app from './express';
import config from './config';
import { setupDB } from './rethinkdb';

const hzConfig = Object.assign({}, config.horizon, {
  project_name: config.rethinkDB.dbName,
  auto_create_collection: true,
  rdb_host: config.rethinkDB.dbHost,
  rdb_port: config.rethinkDB.dbPort,
  path: '/horizon'
});

let hzObject;

setupDB().then(() => {
  hzObject = horizon(app.server, hzConfig);
});

export default hzObject;
