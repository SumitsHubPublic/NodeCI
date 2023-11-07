const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const clearCache = require('../middlewares/clearCache');

const Blog = mongoose.model('Blog');

module.exports = app => {
  app.get('/api/blogs/:id', requireLogin, async (req, res) => {
    const blog = await Blog.findOne({
      _user: req.user.id,
      _id: req.params.id,
    });

    res.send(blog);
  });

  app.get('/api/blogs', requireLogin, async (req, res) => {
    // const redis = require('redis');
    // const client = redis.createClient();
    // await client.connect();

    // // check for cached data related to this query
    // const cachedBlogs = await client.get(req.user.id);

    // // if yes, respond to the request right away and return
    // if (cachedBlogs) {
    //   return res.send(JSON.parse(cachedBlogs));
    // }

    // if no, respond to request and update the cache
    const blogs = await Blog.find({ _user: req.user.id }).cache({
      key: req.user.id,
    });
    return res.send(blogs);

    // client.set(req.user.id, JSON.stringify(blogs));
  });

  app.post('/api/blogs', requireLogin, clearCache, async (req, res) => {
    const { title, content } = req.body;

    const blog = new Blog({
      title,
      content,
      _user: req.user.id,
    });

    try {
      await blog.save();
      res.send(blog);
    } catch (err) {
      res.send(400, err);
    }
  });
};
