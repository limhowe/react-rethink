import socketio from 'socket.io';
import glob from 'glob';
import path from 'path';
import chalk from 'chalk';
import passport from 'passport';
import cookieParser from 'cookie-parser';

import UserConversations from './subscribers/UserConversations';
import ConversationMessages from './subscribers/ConversationMessages';

const subscriberClasses = {
  UserConversations,
  ConversationMessages
};

export type SocketType = {
  emit: (event: string, data: any) => void,
  on: (event: string, handler: Function) => void
};

export default (app, sessionMiddleware) => {
  // creates a new socket.io server
  const io = socketio.listen(app.server);

  // handles socket authentication
  io.use((socket, next) => {
    cookieParser()(socket.request, {}, () => {
      sessionMiddleware(socket.request, {}, () => {
        passport.initialize()(socket.request, {}, () => {
          passport.session()(socket.request, {}, () => {
            if (socket.request.user) {
              next(null, true);
            } else {
              next(new Error('User is not authenticated'), false);
            }
          });
        });
      });
    });
  });

  io.on('connection', (socket) => {
    const subscribers = {};
    socket.on('subscribe', (data) => {
      const {
        subscriberName,
        options
      } = data;

      subscribers[subscriberName] = subscribers[subscriberName] || {};
      subscribers[subscriberName][options.id] = new subscriberClasses[subscriberName](options, io.sockets.sockets[socket.id]);
      console.log(chalk.green(`Successfully subscribed to ${subscriberName} - ${options.id}`));
    });

    socket.on('unsubscribe', (data) => {
      const {
        subscriberName,
        options
      } = data;

      if (subscribers[subscriberName] && subscribers[subscriberName][options.id]) {
        subscribers[subscriberName][options.id].close();
        delete subscribers[subscriberName][options.id];
        console.log(chalk.green(`Successfully unsubscribed ${subscriberName} - ${options.id}`));
      } else {
        console.log(chalk.red('Subscriber not found!'));
      }
    });

    // @TODO handle disconnect for reconnection
    // socket.on('disconnect', () => {
    //
    // });
  });
}
