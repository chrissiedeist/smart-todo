'use-strict'


function TodoListController($http, $location) {
  var self = this;

  self.filterByLocation = function(todos) {
    var filteredTodos = [];
    todos.forEach(function(todo) {
      if(todo.location && todo.location == $location.path.toString().slice(1)){
        console.log("match!");
      } else {
        if (todo.location) {console.log("locaiton is: " + todo.location) }
        console.log("no match");
      }
    })
  };

  self.newTodo = {};

    console.log("location is: " + $location.path());
  $http.get('/api/todos')
      .success(function(data) {
          self.allTodos = self.filterByLocation(data);
          console.log(data);
          console.log('Success');
      })
      .error(function(data) {
          console.log('Error: ' + data);
      });

  self.createTodo = function() {
      self.newTodo.when = self.when;
      $http.post('/api/todos', self.newTodo)
          .success(function(data) {
              self.newTodo = {};
              self.allTodos = data;
              console.log(data);
              console.log('Success');
          })
          .error(function(data) {
              console.log('Error: ' + data);
          });
  };

  self.deleteTodo = function(id) {
      console.log("delete it: " + id);
      $http.delete('/api/todos/' + id)
          .success(function(data) {
              console.log("data after delete: " + data);
              console.log("location after delete: " + self.location);
              self.allTodos = data;
          })
          .error(function(data) {
              console.log('Error: ' + data);
          });
  };
}

angular.
  module('todoList').
  component('todoList', {
    templateUrl: 'todo-list/todo-list.template.html',
    controller: TodoListController,
    bindings: {
      when: '@'
    },
  });
