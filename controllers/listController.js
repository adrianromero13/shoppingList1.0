const { List } = require('../models');

module.exports = {
  // fetches Array of lists
  getLists: async (req, res) => {
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
