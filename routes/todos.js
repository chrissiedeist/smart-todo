var Todo = require('../models/Todo')

module.exports = function(app) {
  app.get('/api/todos', function(req, res) {
    Todo.find(function(err, todos) {

      if (err)
        res.send(err)

      res.json(todos); // return all todos in JSON format
    });
  });

  app.post('/api/todos', function(req, res) {
    Todo.create({
        text : req.body.text,
        location : req.body.location,
        when: req.body.when,
        done : false
    }, function(err, todo) {
        Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });
  });

  app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
      _id : req.params.todo_id
    }, function(err, todo) {
      if (err)
        res.send(err);

      Todo.find(function(err, todos) {
        if (err)
          res.send(err)
        res.json(todos);
      });
    });
  });

  app.put('/api/todos/:todo_id', function(req, res) {
    // console.log("updating todo..." + todo_id);
    var id = req.param('todo_id');
    Todo.update(
      { _id: id },
      { done : true },
      { multi: false },
      function(err, todo) {
        Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });
  });
}
