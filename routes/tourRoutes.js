const express = require('express');
const tourController = require('../controllers/tourControllers');

const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  checKBody,
  aliasTopTours,
} = tourController;

// Router is middleware
const router = express.Router();

// alias route for cheap tours
router.route('/top-5-cheap').get(aliasTopTours, getAllTours);

// router.param('id', checKId);

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
