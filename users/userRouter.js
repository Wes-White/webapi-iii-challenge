const express = 'express';

const router = express.Router();

const db = require('./userDb');

router.post('/', (req, res) => {
    try {
        const newUser = await db.insert(req.body); 
        res.status(200).json(newUser); 
    } catch (error) {
        console.log(error); 
        res.status(500).json({success: false, message: "We were unable to add the new User"});
    }
});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {});

router.get('/:id', (req, res) => {});

router.get('/:id/posts', (req, res) => {});

router.delete('/:id', (req, res) => {});

router.put('/:id', (req, res) => {});

//custom middleware

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({success: false, message: 'Missing user data' });
  } else if (!req.body.name) {
    res.status(400).json({success: false, message: 'Missing required name field' });
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
      res.status(400).json({success: false, message: 'Invalid user id' });
      next();
    }
  } catch (err) {
    res.status(500).json({success: false, message: 'We were unable to validate this user.' });
  }
}
async function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({success: false, message: 'Missing post data' });
    next();
  } else if (!req.body.text) {
    res
      .status(400)
      .json({success: false, message: 'Missing required text field' });
    next();
  }
}

module.exports = router;
