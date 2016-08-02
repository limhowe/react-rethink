import horizon from '../horizon';
import r from 'rethinkdb';

export default (rawRequest, context, ruleset, metadata, send, done) => {

  // const query = r.table('convuserlink_17a8b8d9d017')
  //   .eqJoin('convId', r.table('conversation_c6e4d32f4bb5'))
  //   .zip()
    // .eqJoin('userId', r.table('user_1a8ec6446e31'))
    // .zip();
  r.table('convuserlink_17a8b8d9d017').indexCreate('convId');

  const query = r.table('convuserlink_17a8b8d9d017').map({left: r.row}).union(r.table('conversation_c6e4d32f4bb5').map({right: r.row}));

  query.run(metadata.connection(), (err, cursor) => {
    if (err) throw err;
    cursor.toArray((err, results) => {
      if (err) throw err;
      send({ data: [results] });
    });
  });

  // query.changes().run(metadata.connection(), (err, cursor) => {
  //   console.log(cursor);
  //   if (err) throw err;
  //   cursor.each((err, item) => {
  //     if (err) throw err;
  //     send({ data: [[item.new_val]] });
  //   });
  // });
};
