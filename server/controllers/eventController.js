const mongoose = require('mongoose');
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
    if (typeof times !== 'object') return false;
    if (typeof times.start !== 'string' || typeof times.end !== 'string') return false;

    return true;
  }

  // check if request body contains valid event fields
  if (!checkRequest()) {
    return next({
      log: `Error occurred in eventController.createEvent: Invalid request body`,
      status: 400,
      message: 'Event could not be created'
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
      log: `Error occurred in eventController.createEvent: ${err}`
    });
  }
};


eventController.getEvent = async (req, res, next) => {
  const { id } = req.params;

  // check if request parameter is a valid event id
  if (!mongoose.isValidObjectId(id)) {
    return next({
      log: `Error occurred in eventController.getEvent: Request parameter is not a valid ObjectId`,
      status: 400,
      message: `${id} is not a valid event id`
    });
  }

  try {
    res.locals.event = await Event.findById(id);

    // check if event was not found in database
    if (res.locals.event === null) {
      return next({
        log: `Error occurred in eventController.getEvent: Event id was not found in database`,
        status: 404,
        message: 'Event was not found'
      });
    }

    return next();
  }
  catch (err) {
    return next({
      log: `Error occurred in eventController.getEvent: ${err}`,
    });
  }
}

eventController.updateEvent = async (req, res, next) => {
  const { id } = req.params;
  const user = req.body; // response body should contain an object for a single user

  // user should be an object with name and availability properties
  function checkUser() {
    const { name, availability } = user;

    // check name
    if (typeof name !== 'string') return false;
    
    // check availability
    if (!Array.isArray(availability)) return false;

    return true;
  }

  if (!checkUser()) {
    return next({
      log: `Error occurred in eventController.updateEvent: Invalid request body`,
      status: 400,
      message: 'Request body should be an object with the name and availability of a single user'
    });
  }

  // check if request parameter is a valid event id
  if (!mongoose.isValidObjectId(id)) {
    return next({
      log: `Error occurred in eventController.updateEvent: Request parameter is not a valid ObjectId`,
      status: 400,
      message: `${id} is not a valid event id`
    });
  }

  try {
    const event = await Event.findById(id);

    // check if event id was not found in database
    if (event === null) {
      return next({
        log: `Error occurred in eventController.getEvent: Event id was not found in database`,
        status: 400,
        message: 'Event was not found'
      });
    }

    // update event with user
    let foundUser = false;
    // if user already exists, update it
    for (let i = 0; i < event.users.length; i++) {
      if (event.users[i].name === user.name) {
        event.users[i] = user;
        foundUser = true;
        break;
      }
    }
    // if user does not exist, add it
    if (!foundUser) event.users.push(user);

    res.locals.updatedEvent = await event.save();
    
    return next();
  } 
  catch (err) {
    return next({
      log: `Error occurred in eventController.updateEvent: ${err}`
    })
  }
}


module.exports = eventController;