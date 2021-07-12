const { Schema, model } = require('mongoose');

const ListSchema = new Schema({
  title: {
    type: String,
    required: [true, 'You must give this list a Title'],
    unique: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  todos: [{
    type: Schema.Types.ObjectId,
    ref: 'Todo',
  }],
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = model('List', ListSchema);
