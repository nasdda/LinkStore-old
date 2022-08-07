const express = require('express');
const router = express.Router();

router.get(
  '/hey', (req, res) => {
    res.json({
      message: 'You made it to the secure route',
      user: req.user,
    })
  }
);

router.get('/logout', (req, res) => {
  res.cookie('jwt', 'none', {
    httpOnly: true,
    expires: new Date(Date.now() + 5 * 1000),
  })
  res.status(200).json({ message: "User logged out" })
})

module.exports = router;