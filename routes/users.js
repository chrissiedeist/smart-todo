module.exports = function(app) {
  app.post('/signin', function(req, res) {
    res.json({message: "Signin post request"})
  });

  app.get('/user/:id', function(req, res) {
    var id = req.params.id;
    res.json({userid: id});
  });

  app.get('/users', function(req, res) {
    res.json({message: "No users yet"});
  });

  app.post('/user/create', function(req, res) {
    var id = req.body.id;
    res.json({user: id});
  });
}
