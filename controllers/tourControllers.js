const fs = require('fs');

// Read the tours data ///////////////////////////////////
// converting the json file to array of JS objects
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// Check ID middleware function ///////////////////////////////////
exports.checKId = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);
  let tour = tours.find((tour) => tour.id === parseInt(req.params.id));
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID. Tour not found',
    });
  }
  next();
};

// Check Request Body middleware function ///////////////////////////////////
exports.checKBody = (req, res, next) => {
  if (!(req.body.name && req.body.price)) {
    return res.status(400).json({
      status: 'fail',
      message: "Invalid request. price or name, can't be empty",
    });
  }
  next();
};

// GET all function (handler) ////////////////////////////////////////
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};

// GET specific tour function (handler) ////////////////////////////////////////
exports.getTour = (req, res) => {
  let tour = tours.find((tour) => tour.id === parseInt(req.params.id));
  res.status(200).json({
    status: 'success',
    data: { tour },
  });
};

// CREATE tour function (handler) ////////////////////////////////////////
exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = { id: newId, ...req.body };
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

// UPDATE tour function (handler) ////////////////////////////////////////
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Update complete',
  });
};

// DELETE tour function (handler) ////////////////////////////////////////
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
