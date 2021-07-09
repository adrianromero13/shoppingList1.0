const { User } = require('../models');

module.exports = {
  getCurrentUser: async (req, res) => {
    try {
      const getUserData = await User.findById(req.user._id).select('-password');
      return res.status(200).json(getUserData);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },
};
