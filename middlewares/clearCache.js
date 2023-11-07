const { clearHash } = require('../services/cache');

module.exports = async (req, res, next) => {
  // calling controller first
  await next();

  clearHash(req.user.id);
};
