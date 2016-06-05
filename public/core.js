var Todos = angular.module('Todos', []);

function mainController($scope, $http) {
    $scope.newTodo = {};

    $http.get('/api/todos')
        .success(function(data) {
            $scope.allTodos = data;
            $scope.filterTodos($scope.location);;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.filterTodos = function(location) {
      var filteredTodos = [];
      $scope.location = location;

      if (location == null) {
        $scope.filteredTodos = $scope.allTodos;
      } else {
        angular.forEach($scope.allTodos, function(todo) {
          if(todo.location == location) {
            filteredTodos.push(todo);
          } 
        });
        $scope.filteredTodos = filteredTodos;
      }
    }

    $scope.selectedTab = function(location) {
      return $scope.location == location;
    };

    $scope.createTodo = function() {
        $scope.newTodo.location = $scope.location;
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
