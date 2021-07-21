const { User, List, Todo } = require('../models');

module.exports = {
  getCurrentUser: async (req, res) => {
    try {
      const getUserData = await User.findById(req.user._id)
        .select('-password')
        .populate('lists');
      return res.status(200).json(getUserData);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },

  addList: async (req, res) => {
    const { title } = req.body;
    console.log('addlist controller body', req.body);
    if (!title) {
      return res.status(400).json({ error: 'You must provide info to list' });
    }
    try {
      const newList = await new List({ title, user: req.user._id }).save();
      req.user.lists.push(newList);
      await req.user.save();
      return res.status(200).json(newList);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },

  getLists: async (req, res) => {
    try {
      const lists = await List.find({ user: req.user._id }).populate('todos');
      return res.status(200).json(lists);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },

  addTodo: async (req, res) => {
    const { text } = req.body;
    const { listId } = req.params;
    // find list
    const userList = await List.findById(listId);
    if (!text) {
      return res.status(400).json({ error: 'You must provide text to list item ' });
    }
    if (!userList) {
      return res.status(400).json({ error: 'Please assign list item to list' });
    }
    try {
      // create the list item
      const newTodo = await new Todo({ text, user: req.user._id }).save();
      await userList.todos.push(newTodo);
      // save changes
      await req.user.save();
      await userList.save();
      // return data
      return res.status(200).json(newTodo);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },

  updateItemById: async (req, res) => {
    const { itemId } = req.params;
    const { text, completed } = req.body;
    try {
      const itemToUpdate = await Todo.findById(itemId);
      if (!itemToUpdate) {
        return res.status(401).json({ error: 'No List Item with that Id' });
      }
      if (req.user._id.toString() !== itemToUpdate.user.toString()) {
        return res.status(401).json({ error: 'You cannot update a list item that is not yours' });
      }
      const updatedItem = await Todo.findByIdAndUpdate(itemId,
        { completed, text },
        { new: true });
      return res.json(updatedItem);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },

  deleteItemById: async (req, res) => {
    const { itemId } = req.params;
    try {
      const itemToDelete = await Todo.findById(itemId);
      if (!itemToDelete) {
        return res.status(401).json({ error: 'No Item with that Id' });
      }
      if (req.user._id.toString() !== itemToDelete.user.toString()) {
        return res.status(401).json({ error: 'You cannot delete a list item that is not yours' });
      }
      const deletedItem = await Todo.findByIdAndDelete(itemId);
      return res.json(deletedItem);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },
};
