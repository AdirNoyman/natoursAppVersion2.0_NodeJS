const express = require('express');
const userController = require('../controllers/userControllers');

const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = userController;

// Router is middleware
const router = express.Router();
// Mounting a new Router on a route

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
