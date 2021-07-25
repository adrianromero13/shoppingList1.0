const express = require('express');
// const { connect } = require('mongoose');
const mongoose = require('mongoose');
// const { success, error } = require('consola');
const routes = require('./routes');
const { MONGODB_URI, PORT } = require('./config');

// const PORT = process.env.PORT || 4001;

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
//   "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install
// --prefix client && npm run build --prefix client"
// },

app.use(routes);
require('./services/passport');
// Connect database
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/shoppinglis-react',
mongoose.connect(MONGODB_URI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

app.listen(PORT, () => console.log(`connected on port: ${PORT}`));

// const startApp = async () => {
//   // create db connection
//   try {
//     await connect(MONGODB, {
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//       useFindAndModify: false,
//       useCreateIndex: true,
//     });
//     success({
//       message: `Successfully connected with the Database \n${MONGODB}`,
//       badge: true,
//     });
//     // start listening for server on port
//     app.listen(PORT, () => success({
//       message: `Server started on PORT ${PORT}`,
//       badge: true,
//     }));
//   } catch (e) {
//     error({
//       message: `Unable to connect with the Database \n${e}`,
//       badge: true,
//     });
//   }
// };
// startApp();
