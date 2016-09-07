// @TODO: load config for each environment
export default {
  port: process.env.PORT || 3000,
  rethinkDB: {
    dbName: process.env.RDB_DB || 'hzchat',
    dbHost: process.env.RDB_HOST || 'localhost',
    dbPort: process.env.RDB_PORT || 28015
  },
  jwt: {
    secret: 'RETHINK_CHAT'
  }
}
