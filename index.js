const express = require('express');
const monggose = require('mongoose');
const routes = require('./routes');

const PORT = process.env.PORT || 4001;

const app = express();

// Setup middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use(routes);
// require('./services/passport');
// Connect database
monggose.connect(process.env.MONGODB_URI || 'mongodb://localhost/shoppinglis-react',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

app.listen(PORT);
