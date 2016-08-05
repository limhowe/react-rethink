import config from './config';
import thinky from 'thinky';

export default thinky({
  db: config.rethinkDB.dbName,
  host: config.rethinkDB.dbHost,
  port: config.rethinkDB.dbPort
});
