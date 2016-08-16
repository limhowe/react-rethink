// @flow
import config from './config';
import thinky from 'thinky';

export type ChangeFeedsType = {
  close: () => void,
  each: (handler: Function) => void
};

export type DocType = {
  isSaved: () => bool,
  getOldValue: () => any
};

export default thinky({
  db: config.rethinkDB.dbName,
  host: config.rethinkDB.dbHost,
  port: config.rethinkDB.dbPort
});
