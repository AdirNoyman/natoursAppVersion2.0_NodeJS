const express = require('express');
const tourController = require('../controllers/tourControllers');

const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  checKId,
  checKBody,
} = tourController;

// Router is middleware
const router = express.Router();

router.param('id', checKId);

router.route('/').get(getAllTours).post(checKBody, createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
