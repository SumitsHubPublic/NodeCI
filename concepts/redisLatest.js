// Using latest redis version 4.6.10
// this version uses promise based implementation, no need to use callbacks

const redis = require('redis');
// const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient();

(async function () {
  await client.connect();

  // Store and retrieve a simple string.
  await client.set('name', 'Steve');
  const name = await client.get('name');
  console.log(name); // Steve

  // Store and retrieve a map
  await client.hSet('user-session:123', {
    name: 'John',
    surname: 'Smith',
    company: 'Redis',
    age: 29,
  });

  let userSession = await client.hGetAll('user-session:123');
  console.log(JSON.stringify(userSession, null, 2));
})();
