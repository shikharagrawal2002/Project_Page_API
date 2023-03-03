const express = require('express');
const Post = require('../models/Post'); // new
const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
    // console.log(posts);
  } catch (err) {
    res.send('Error' + err);
  }
});

router.post('/', async (req, res) => {
  const newPost = new Post(req.body);

  try {
    const post = await newPost.save();
    if (!post) throw Error('Something went wrong while saving the post!');

    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id);
  Post.findByIdAndRemove(id)
    .then((data) => {
      if (!data) res.status(404).send({ message: 'Not found Tutorial with id ' + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: 'Error retrieving Tutorial with id=' + id });
    });
});

module.exports = router;
