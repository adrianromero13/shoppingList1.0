const router = require('express').Router();
const { requireAuth } = require('../../../middlewares/authMiddlewares');
const { getCurrentUser } = require('../../../controllers/userController');

router.route('/')
  .get(requireAuth, getCurrentUser);

module.exports = router;
