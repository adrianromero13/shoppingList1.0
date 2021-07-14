const { List } = require('../models');

module.exports = {
  // fetches list items for List
  getLists: async (req, res) => {
    console.log('in controller');
    try {
      const lists = await List.find();
      if (!lists) {
        return res.status(200).json({ error: 'No lists found' });
      }
      return res.json(lists);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },
};
