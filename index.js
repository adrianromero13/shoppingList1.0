const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const { MONGODB_URI, PORT } = require('./config');

const app = express();

// Setup middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use(routes);
require('./services/passport');
// Connect database
mongoose.connect(MONGODB_URI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

app.listen(PORT, () => console.log(`connected on port: ${PORT}`));
