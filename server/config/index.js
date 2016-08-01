// @TODO: load config for each environment
export default {
  port: 3000,
  horizon: {
    // project_name: 'horizon-chat',
    auth: {
      token_secret: 'secret!@#$%^&'
    }
  },
  rethinkDB: {
    dbName: process.env.RDB_DB || 'hzchat',
    dbHost: process.env.RDB_HOST || 'localhost',
    dbPort: process.env.RDB_PORT || 28015
  }
}
