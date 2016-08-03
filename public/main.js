const socket = io();

socket.on('UserConversations', (data) => {
  console.log(data);
});

socket.emit('subscribe', {
  subscriber: 'UserConversations',
  options: {
    userId: '4be42c28-a062-4b68-b164-ebe596b53e5e'
  }
});
