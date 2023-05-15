const express = require('express');
const eventController = require('../controllers/eventController')
// const cookieParser = require('cookie-parser');

const router = express.Router();

router.get('/:id', eventController.getEvent, (req, res) => {
  return res.status(200).json(res.locals.event);
})

router.post('/', eventController.createEvent, (req, res) => {
  return res.status(200).json(res.locals.newEvent);
});

router.put('/:id', eventController.updateEvent, (req, res) => {
  return res.status(200).json(res.locals.updatedEvent);
})
module.exports = router;