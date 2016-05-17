module.exports = function( mongoose ) {
  var Schema = mongoose.Schema;

  var TodoSchema = new Schema({
    title: String,
  });
  mongoose.model('Todo', TodoSchema);
}
