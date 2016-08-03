import r from 'rethinkdb';
import chalk from 'chalk';

import config from './config';

export let conn;

export const setupDB = () => {
  return new Promise((resolve, reject) => {
    r.connect({ host: config.rethinkDB.dbHost, port: config.rethinkDB.dbPort }, (err, connection) => {
      if (err) {
        console.log(chalk.red(`There was an error connecting to rethink DB`));
        reject(err);
      } else {
        r.dbCreate(config.rethinkDB.dbName)
          .run(connection, (err, result) => {
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
