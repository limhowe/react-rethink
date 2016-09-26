# Horizon-chat
Chat application using rethinkdb, socket.io, express, reactjs

This app uses full features of rethinkdb to get notified about database change.
[Horizon.io](https://github.com/rethinkdb/horizon) was on the original roadmap, but it had problem with watching joined queries, and we are using [socket.io](https://github.com/socketio/socket.io) for clinet-server communication.

[Gulp](https://github.com/gulpjs/gulp) is used as task runner, and [webpack](https://github.com/webpack/webpack) is used for building the application.

## Major gulp tasks
- **default** - build the application in .build Folder
- **dev** - run the application in dev mode with nodemon, and watching resources
- **download-localisations** download i18n translations from onesky

## Main Dependency
- [React.js](https://github.com/facebook/react)
- [Redux](https://github.com/reactjs/redux)
- [react-i18next](https://github.com/i18next/react-i18next)
- [passport.js](https://github.com/jaredhanson/passport)
- [rethinkdb](https://github.com/rethinkdb/rethinkdb) - rethinkdb driver
- [thinky](https://github.com/neumino/thinky) - node.js ORM for rethinkdb
- [socket.io](https://github.com/socketio/socket.io)

## Contribution
The library is written in ES6.
We require [flow types](https://flowtype.org/) to be used to clarify better about each variable.
