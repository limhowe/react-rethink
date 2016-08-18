// @TODO: load config for each environment
export default {
  port: 3000,
  rethinkDB: {
    dbName: process.env.RDB_DB || 'hzchat',
    dbHost: process.env.RDB_HOST || 'localhost',
    dbPort: process.env.RDB_PORT || 28015
  },
  sessionSecret: 'RETHINK_CHAT',
  sessionCollection: 'sessions',
  sessionCookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: null
  },
  sessionName: 'connect.sid'
}
