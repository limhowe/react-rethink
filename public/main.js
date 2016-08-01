import Horizon from '@horizon/client';

const horizon = Horizon({
  host: 'localhost:3000',
  path: 'horizon'
});

horizon.onReady(() => {
  document.querySelector('h1').innerHTML = 'rethink_chat works!'
});

horizon.connect();
