import socketio from 'socket.io';
import glob from 'glob';
import path from 'path';
import UserConversations from './subscribers/UserConversations';

// @TODO handle session and authentication
export default (app) => {
  // creates a new socket.io server
  const io = socketio.listen(app.server);

  const subscribers = [];

  io.on('connection', (socket) => {
    socket.on('subscribe', (data) => {
      const {
        subscriber,
        options
      } = data;
      // @TODO load subscriber dynamically or all subscriber classes initially
      // const subscriberClass = require(path.resolve(`./server/subscribers/${subscriber}`)).default;
      new UserConversations(options, io.sockets.sockets[socket.id]);
    });

    // @TODO handle disconnect for reconnection
    // socket.on('disconnect', () => {
    //
    // });
  });
}
