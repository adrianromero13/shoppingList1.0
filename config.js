require('dotenv').config();

module.exports = {
  SECRET: process.env.SECRET,
  MONGODB: process.env.MONGODB_URI,
  PORT: process.env.PORT,
};
