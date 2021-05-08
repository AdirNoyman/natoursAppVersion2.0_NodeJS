const express = require('express');
const app = express();
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
// Middleware - processing the incoming data. it stands between the request and the response. It adds the data coming from the request to the request object/body (it also parse it to JS object) //////////////////////////////////////
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  console.log('Hello from the middleware 😁');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Tour Routes ////////////////////////////////////////
// Mounting a new Router on a route
app.use('/api/v1/users', userRouter);
// Users Routes ////////////////////////////////////////
// Mounting a new Router on a route
app.use('/api/v1/tours', tourRouter);

module.exports = app;
