// Using old redis version 2.8.0

const redis = require('redis');
const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);

client.set('name', 'Stephen');

client.get('name', (err, value) => {
  console.log(value); // Stephen
});

client.get('name2', console.log); // {null, null}

// Redis Hashes -> can be used to store objects

client.hset('german', 'red', 'rot');

client.hget('german', 'red', console.log); // {null, rot}

// Storing object
client.set('myObj', JSON.stringify({ name: 'John' }));

client.get('myObj', console.log); // null {"name": "John"}

client.get('myObj', (err, value) => {
  console.log(JSON.parse(value)); // { name: 'John' }
});
