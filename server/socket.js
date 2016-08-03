import socketio from 'socket.io';
import http from 'http';
import glob from 'glob';

// @TODO handle session and authentication
export default (app) => {
  // creates a new http server
  const server = http.createServer(app);

  // creates a new socket.io server
  const io = socketio.listen(server);

  const subscribers = [];

  io.on('connection', (socket) => {
    socket.on('subscribe', (data) => {
      const {
        subscriber,
        id,
        options
      } = data;
      const subscriberClass = require(path.resolve(`./server/subscribers/${subscriber}`)).default;

      if (!subscriberClass) {
        // @TODO handle when subscriber does not exist
        return;
      }

      new subscriberClass(options, io.sockets.socket(socket.id));
    });

    // socket.on('disconnect', () => {
    //
    // });
  });
}
