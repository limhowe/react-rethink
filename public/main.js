const socket = io();

socket.on('UserConversations', (data) => {
  console.log(data);
});

socket.emit('subscribe', {
  subscriberName: 'UserConversations',
  options: {
    id: '4be42c28-a062-4b68-b164-ebe596b53e5e' // userId
  }
});

socket.emit('unsubscribe', {
  subscriberName: 'UserConversations',
  options: {
    id: '4be42c28-a062-4b68-b164-ebe596b53e5e' // userId
  }
});
