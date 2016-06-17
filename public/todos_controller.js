angular.module('Todos', [])
.controller('TodosCtrl', function($scope, $http, $location) {
    $scope.newTodo = {};

    $http.get('/api/todos')
        .success(function(data) {
            $scope.allTodos = data;
            $scope.filteredTodos = _getFilteredTodos(data, _current_path());;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.filterTodos = function(location) {
      $scope.filteredTodos = _getFilteredTodos($scope.allTodos, location);
    };

    $scope.selectedTab = function(tab) {
      return (_current_path() == tab);
    };

    $scope.createTodo = function() {
        $scope.newTodo.location = _current_path();
        $http.post('/api/todos', $scope.newTodo)
            .success(function(data) {
                $scope.newTodo = {};
                $scope.allTodos = data;
                $scope.filteredTodos = _getFilteredTodos(data, _current_path());
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.deleteTodo = function(id) {
        console.log("delete it: " + id);
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                console.log("data after delete: " + data);
                $scope.allTodos = data;
                $scope.filteredTodos = _getFilteredTodos(data, _current_path());
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    var _current_path = function() {
      return $location.path().toString().slice(1);
    }

    var _getFilteredTodos = function(allTodos, location) {
      var filteredTodos = [];

      if (location == null) {
        return allTodos;
      } else {
        angular.forEach(allTodos, function(todo) {
          if(todo.location == location) {
            filteredTodos.push(todo);
          }
        });
        return filteredTodos;
      }
    }
});
