const Tour = require('../models/tourModal');
const APIFeatures = require('../utils/apiFeatures');

// Middleware
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage, price';
  req.query.fields = 'name, price,ratingsAverage,summary,difficulty';
  // Got to call next() in the end of a middleware
  next();
};

// GET all function (handler) ////////////////////////////////////////
exports.getAllTours = async (req, res) => {
  try {
    // And only afterwards we EXECUTE QUERY
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;

    // Send response with the query result
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: tours.length,
      data: { tours },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Error getting all tours 😫: ' + err.message,
    });
  }
};

// GET specific tour function (handler) ////////////////////////////////////////
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Error getting the tour 😫: ' + err.message,
    });
  }
};

// CREATE tour function (handler) ////////////////////////////////////////
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    console.log('Request Body: ', req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err.message,
    });
  }
};

// UPDATE tour function (handler) ////////////////////////////////////////
exports.updateTour = async (req, res) => {
  try {
    // The third argumant here is option object with property 'new' set to true because we want mongoose to return the updated document
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      tour,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Error finding the tour 😫: ' + err.message,
    });
  }
};

// DELETE tour function (handler) ////////////////////////////////////////
exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Error finding the tour 😫: ' + err.message,
    });
  }
};
