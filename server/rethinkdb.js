// @flow
import r from 'rethinkdb';
import chalk from 'chalk';

import config from './config';

export let conn;

export const setupDB = (): Promise<any> => {
  return new Promise((resolve: Function, reject: Function) => {
    r.connect({ host: config.rethinkDB.dbHost, port: config.rethinkDB.dbPort }, (err: Object, connection: any) => {
      if (err) {
        console.log(chalk.red(`There was an error connecting to rethink DB`));
        reject(err);
      } else {
        r.dbCreate(config.rethinkDB.dbName)
          .run(connection, (err: Object) => {
            conn = connection;
            if (err) {
              console.log(chalk.green(`DB - ${config.rethinkDB.dbName} already exists`));
              resolve(connection);
            } else {
              console.log(chalk.green(`Hurray! The database - ${config.rethinkDB.dbName} was created!`))
              resolve(connection);
            }
          });
      }
    });
  });
};

// @TODO: add migration for create table structure
export const setupTables = () => {

};

setupDB();

export default r.db(config.rethinkDB.dbName);
