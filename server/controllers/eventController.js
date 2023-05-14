const Event = require('../models/eventModel');

const eventController = {};

eventController.createEvent = async (req, res, next) => {
  const { name, dates, times } = req.body;
  function checkRequest() {
    // check name
    if (typeof name !== 'string') return false;
    
    // check dates
    if (!Array.isArray(dates)) return false;
    for (date of dates) {
      if (typeof date !== 'string') return false;
    }
  
    // check times
    if (typeof times.start !== 'string' || typeof times.end !== 'string') return false; 
    return true;
  }

  if (!checkRequest()) {
    return next({
      log: `Error occurred in eventController.createEvent: Invalid request body`,
      status: 400,
      message: 'Request body wack'
    });
  }

  try {
    res.locals.newEvent = await Event.create({
      name: name,
      dates: dates,
      times: times,
    });
    return next();
  }
  catch (err) {
    return next({
      log: `Error occurred in eventController.createEvent: ${err.message}`
    });
  }
};


eventController.getEvent = async (req, res, next) => {
  const {_id} = req.body;
  console.log('id', _id);
  if (typeof _id !== 'string') {
    return next({
      log: `Error occurred in eventController.getEvent: Invalid request body`,
      status: 400,
      message: 'Request body wack'
    });
  }
  try {
    res.locals.event = await Event.findOne({
      _id: _id
    });
    return next();
  } catch (err) {
    return next({
      log: `Error occurred in eventController.getEvent: ${err.message}`
    })
  }
}

module.exports = eventController;