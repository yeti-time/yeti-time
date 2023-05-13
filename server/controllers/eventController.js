const Event = require('../models/eventModel');

const eventController = {};

eventController.createEvent = async (req, res, next) => {
  console.log(' At createEvent controller');
  const { name, dates, times } = req.body;

  // TODO: check if request body is valid
  console.log('Body deconstruct', name, dates, times);

  try {
    res.locals.newEvent = await Event.create({
      name: name,
      dates: dates,
      times: times,
    });
    return next();
  }
  catch (err) {
    const errObj = {
      log: `Error occurred in eventController.createEvent: ${err.message}`
    };
    return next(errObj);
  }
}

module.exports = eventController;