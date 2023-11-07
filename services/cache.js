const mongoose = require('mongoose');
const redis = require('redis');
const client = redis.createClient();
const exec = mongoose.Query.prototype.exec;

// IIAFE => used to connect to redis client once
(async () => {
  await client.connect();
})();

mongoose.Query.prototype.cache = function (options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || '');
  return this;
};

mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }
  console.log('I am about to run a query');
  // console.log(this.getQuery());
  // console.log(this.mongooseCollection.name);

  const key = Object.assign({}, this.getQuery(), {
    collection: this.mongooseCollection.name,
  });
  const stringKey = JSON.stringify(key);
  console.log(stringKey);

  const cachedValue = await client.hGet(this.hashKey, stringKey);

  if (cachedValue) {
    console.log(cachedValue);
    const doc = JSON.parse(cachedValue);

    return Array.isArray(doc)
      ? doc.map(d => new this.model(d))
      : new this.model(doc);
  }

  const result = await exec.apply(this, arguments);
  // console.log(result); // mongoose model, not an object

  client.hSet(this.hashKey, stringKey, JSON.stringify(result));

  return result;
};

module.exports = {
  clearHash(hashKey) {
    client.del(JSON.stringify(hashKey));
  },
};
