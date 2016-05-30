module.exports = function( mongoose ) {
  var Schema = mongoose.Schema;

  var TodoSchema = new Schema({
    text: String,
  });
  mongoose.model('Todo', TodoSchema);
}
