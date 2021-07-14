const router = require('express').Router();
const { getLists } = require('../../../controllers/todoController');

router.route('/')
  .get(getLists);

module.exports = router;
