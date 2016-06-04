var Todos = angular.module('Todos', []);

function mainController($scope, $http) {
    $scope.newTodo = {};
    $scope.location = 'home';

    $http.get('/api/todos')
        .success(function(data) {
            $scope.allTodos = data;
            $scope.filterTodos;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.filterTodos = function(location) {
      var filteredTodos = [];
      $scope.location = location;

      angular.forEach($scope.allTodos, function(todo) {
        if(todo.location == location) {
          filteredTodos.push(todo);
        } 
      });
      $scope.filteredTodos = filteredTodos;
    }

    $scope.createTodo = function() {
        $http.post('/api/todos', $scope.newTodo)
            .success(function(data) {
                $scope.newTodo = {};
                $scope.allTodos = data;
                $scope.filterTodos($scope.location);
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
                console.log("location after delete: " + $scope.location);
                $scope.allTodos = data;
                $scope.filterTodos($scope.location);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}
