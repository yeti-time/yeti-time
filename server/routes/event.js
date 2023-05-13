const express = require('express');

const router = express.Router();

router.get('/event', (req, res) => {
  return next();
});

router.post('/event', conrollers.createEvent, (req, res) => {
  return next();
});

module.exports = router;