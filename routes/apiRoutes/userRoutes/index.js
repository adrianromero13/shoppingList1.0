const router = require('express').Router();
const { requireAuth } = require('../../../middlewares/authMiddlewares');
const {
  getCurrentUser,
  getLists,
  addList,
  addTodo,
} = require('../../../controllers/userController');

router.route('/')
  .get(requireAuth, getCurrentUser);

router.route('/list')
  .get(requireAuth, getLists)
  .post(requireAuth, addList);

router.route('/todo')
  .post(requireAuth, addTodo);
module.exports = router;
