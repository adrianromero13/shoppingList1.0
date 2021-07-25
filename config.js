require('dotenv').config();

module.exports = {
  SECRET: process.env.SECRET,
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT,
};
