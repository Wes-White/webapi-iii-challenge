const express = require('express');
const router = express.Router();
const db = require('./postDb');

router.get('/', async (req, res) => {
  const posts = await db.get();
  res.status(200).json(posts);
});

router.get('/:id', validatePostId, (req, res) => {
  res.status(200).json(req.validId);
});

router.delete('/:id', validatePostId, async (req, res) => {
  try {
    const { id } = req.params;
    const deletePost = await db.remove(id);
    res.status(200).json(deletePost);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'We were unable to remove your post.' });
  }
});

router.put('/:id', validatePostId, async (req, res) => {
  try {
    const { id } = req.params;
    const edit = await db.update(id, req.body);
    res.status(200).json(edit);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'We were unable to update your post.' });
  }
});

// custom middleware

async function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ success: false, message: 'Missing post data' });
    next();
  } else if (!req.body.text) {
    res
      .status(400)
      .json({ success: false, message: 'Missing required text field' });
    next();
  }
}

async function validatePostId(req, res, next) {
  const { id } = req.params;
  const validId = await posts.getById(id);
  if (validId) {
    req.validId = validId;
    next();
  } else {
    res.status(404).json({ success: false, message: 'Invalid user id' });
  }
}

module.exports = router;
