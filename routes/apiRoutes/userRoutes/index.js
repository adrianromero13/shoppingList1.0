const router = require('express').Router();
const { requireAuth } = require('../../../middlewares/authMiddlewares');
const {
  getCurrentUser,
  getLists,
  addList,
  addTodo,
  deleteItemById,
  updateItemById,
  deleteListById,
} = require('../../../controllers/userController');

router.route('/')
  .get(requireAuth, getCurrentUser);

router.route('/list')
  .get(requireAuth, getLists)
  .post(requireAuth, addList);

router.route('/list/:listId')
  .delete(requireAuth, deleteListById);

router.route('/list/todo/:listId')
  .post(requireAuth, addTodo);

router.route('/todo/:itemId')
  .put(requireAuth, updateItemById)
  .delete(requireAuth, deleteItemById);

module.exports = router;
