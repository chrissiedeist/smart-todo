angular.module('Todos', [])
.controller('TodosCtrl', function($scope, $http, $location) {
    $scope.newTodo = {};
    $scope.when = 'today';


    $http.get('/api/todos')
        .success(function(data) {
            $scope.allTodos = data;
            $scope.filteredTodos = _getFilteredTodos(data, _currentPath());;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.filterTodos = function(location) {
      $scope.filteredTodos = _getFilteredTodos($scope.allTodos, location);
    };

    $scope.selectedTab = function(tab) {
      return (_currentPath() == tab);
    };

    $scope.getWhen = function() {
      return $scope.when;
    };

    $scope.setWhen = function(when) {
      $scope.when = when;
    };

    $scope.selectedWhen = function(when) {
      return $scope.when == when;
    };

    $scope.createTodo = function() {
        $scope.newTodo.location = _currentPath();
        $scope.newTodo.when = $scope.when;
        $http.post('/api/todos', $scope.newTodo)
            .success(function(data) {
                $scope.newTodo = {};
                $scope.allTodos = data;
                $scope.filteredTodos = _getFilteredTodos(data, _currentPath());
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.markDone = function(id) {
        $http.put('/api/todos/' + id)
            .success(function(data) {
                console.log("data after marking done: " + data);
                $scope.allTodos = data;
                $scope.filteredTodos = _getFilteredTodos(data, _currentPath());
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

    };

    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                console.log("data after delete: " + data);
                $scope.allTodos = data;
                $scope.filteredTodos = _getFilteredTodos(data, _currentPath());
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    var _currentPath = function() {
      return $location.path().toString().slice(1);
    }

    var _getFilteredTodos = function(allTodos, location) {
      var filteredTodos = [];
      if (!location) {
        return allTodos;
      }
      angular.forEach(allTodos, function(todo) {
        if(todo.location == location) {
          filteredTodos.push(todo);
        }
      });
      return filteredTodos;
    };
});
