const express = require('express');
const router = express.Router();

router.get(
  '/hey',
  (req, res, next) => {
    res.json({
      message: 'You made it to the secure route',
      user: req.user,
    })
  }
);

module.exports = router;