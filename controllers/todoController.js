const { Todo } = require('../models');

module.exports = {
  // fetches todos (items for grocery list)
  getTodos: async (req, res) => {
    try {
      const todos = await Todo.find();
      if (!todos) {
        return res.status(200).json({ error: 'No todos found' });
      }
      return res.json(todos);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },
};
