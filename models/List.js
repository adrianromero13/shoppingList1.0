const { Schema, model } = require('mongoose');

const ListSchema = new Schema({
  title: {
    Type: String,
    required: [true, 'You must give this list a Title'],
    unique: [true, 'This list already exists'],
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  todos: [{
    type: Schema.Types.ObjectId,
    ref: 'Todo',
  }],
});

module.exports = model('List', ListSchema);
