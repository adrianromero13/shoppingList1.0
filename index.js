const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const PORT = process.env.PORT || 4001;

const app = express();

// Setup middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// ommited script
// "scripts": {
//   "start": "if-env NODE_ENV=production && npm run start:prod || npm run start:dev",
//   "start:prod": "node index.js",
//   "start:dev": "concurrently \"nodemon --ignore 'client/*'\" \"npm run client\"",
//   "client": "cd client && npm run start",
//   "install": "cd client && npm install",
//   "build": "cd client && npm run build",
//   "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
// },

app.use(routes);
require('./services/passport');
// Connect database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/shoppinglis-react',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

mongoose.connected.on('connected', () => {
  console.log('Mongoose is connected =]');
});

app.listen(PORT);
