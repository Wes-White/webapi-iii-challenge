const express = require('express');
const router = express.Router();
const db = require('./userDb');

router.post('/', validateUser, async (req, res) => {
  try {
    const newUser = await db.insert(req.body);
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: 'We were unable to add the new User' });
  }
});

router.post('/:id/posts', async (req, res) => {
  const userInfo = { ...req.body, user_id: req.params.id };
  try {
    const posts = await post.insert(userInfo);
    res.status(201).json(posts);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const user = await db.get(req.query);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ sucess });
  }
});

router.get('/:id', validateUserId, async (req, res) => {
  res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, async (req, res) => {
  try {
    const posts = await users.getUserPosts(req.params.id);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: 'We were unable to retrieve the posts for this user.'
    });
  }
});

router.delete('/:id', validateUserId, async (req, res) => {
  try {
    const count = await db.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: 'The requested user has been deleted.' });
    } else {
      res.status(404).json({ message: 'We were unable to locate this user.' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error removing the user.'
    });
  }
});

router.put('/:id', validateUserId, async (req, res) => {
  try {
    const updatedUser = await db.update(req.params.id, req.body);
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: 'error updating user' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'could not update user'
    });
  }
});

//custom middleware

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ success: false, message: 'Missing user data' });
  } else if (!req.body.name) {
    res
      .status(400)
      .json({ success: false, message: 'Missing required name field' });
  }
  next();
}
async function validateUserId(req, res, next) {
  try {
    const { id } = req.params;
    const userId = await users.getById(id);
    if (userId) {
      req.user = userId;
      next();
    } else {
      res.status(400).json({ success: false, message: 'Invalid user id' });
      next();
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'We were unable to validate this user.'
    });
  }
}
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

module.exports = router;
