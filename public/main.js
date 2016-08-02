import Horizon from '@horizon/client';

Horizon.clearAuthTokens();

const horizon = Horizon({
  host: 'localhost:3000',
  path: 'horizon'
});

horizon.onReady(() => {
  document.querySelector('h1').innerHTML = 'rethink_chat works!'

  // adding some sample data to test
  const user = horizon('user');
  user.limit(8)
        .watch()
        .subscribe(users => {
            console.log(users);
        });

  const conversation = horizon('conversation');
  conversation.limit(8)
        .watch()
        .subscribe(users => {
            console.log(users);
        });

  const convuserlink = horizon('convuserlink').watch()
  .subscribe(data => {
      console.log(data);
  });
  //
  // horizon('userConvLink')
  // .watch()
  // .subscribe(data => {
  //     console.log(data);
  // });
  horizon.utensils.sendRequest('userConvLink', {}).subscribe(data => {
    console.log(data)
  })

  // convuserlink.store({
  //   userId: '02ed8bb1-1e4f-4913-a582-a23beb217826',
  //   convId: '082c44e4-e11e-4080-b1cd-6e4ee341df00',
  //   unreadMessageCount: 3
  // });
  // conversation.store({
  //   name: 'music',
  //   status: 'started'
  // });
});

horizon.connect();
