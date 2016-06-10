'use-strict'

angular.
  module('Todos').
  component('todo-list', {
    templateUrl: 'todos/todo-list.template.html',
    controller: function($http)
      var self = this;

      this.newTodo = {};

      $http.get('/api/todos')
          .success(function(data) {
              this.allTodos = data;
              this.filterTodos(this.location);;
              console.log(data);
          })
          .error(function(data) {
              console.log('Error: ' + data);
          });

      this.filterTodos = function(location) {
        var filteredTodos = [];
        this.location = location;

        if (location == null) {
          this.filteredTodos = this.allTodos;
        } else {
          angular.forEach(this.allTodos, function(todo) {
            if(todo.location == location) {
              filteredTodos.push(todo);
            } 
          });
          this.filteredTodos = filteredTodos;
        }
      }

      this.selectedTab = function(location) {
        return this.location == location;
      };

      this.createTodo = function(when) {
          this.newTodo.location = this.location;
          this.newTodo.when = when;
          $http.post('/api/todos', this.newTodo)
              .success(function(data) {
                  this.newTodo = {};
                  this.allTodos = data;
                  this.filterTodos(this.location);
              })
              .error(function(data) {
                  console.log('Error: ' + data);
              });
      };

      this.deleteTodo = function(id) {
          console.log("delete it: " + id);
          $http.delete('/api/todos/' + id)
              .success(function(data) {
                  console.log("data after delete: " + data);
                  console.log("location after delete: " + this.location);
                  this.allTodos = data;
                  this.filterTodos(this.location);
              })
              .error(function(data) {
                  console.log('Error: ' + data);
              });
      };
    });
