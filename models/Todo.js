var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  todoSchema = new Schema( {
    text: String,
    location: String
  })

Todo = mongoose.model('todo', todoSchema);

module.exports = Todo;
