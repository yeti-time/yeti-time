const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser');

// conect to mongo database
const mongoURI =
  'mongodb+srv://yetitime:yetitime@yetitime.jtwt5zb.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoURI);

// require routers
const apiRouter = require('./routes/api');

// parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route handlers
// Parse all incoming cookies and store on req.cookies object
app.use('/api', cookieParser(),  apiRouter);

// unknown route handler
app.use('*', (req, res) => {
  return res.status(404).send('404 Not Found');
});

// global error handler
app.use((err, req, res, next) => {
  const defaultError = {
    log: `Express caught an unknown middleware error: ${err}`,
    status: 500,
    message: 'Internal Server Error',
  };

  const { log, status, message } = Object.assign({}, defaultError, err);

  console.log(log);
  return res.status(status).send(message);
});

// start server
app.listen((PORT = 3000), () => {
  console.log(`Server listening on port ${PORT}!`);
});

module.exports = app;
