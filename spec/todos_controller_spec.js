describe('TodosCtrl', function() {
  var scope, $location, createController;
  beforeEach(module('Todos'));

  beforeEach(inject(function ($rootScope, $controller, _$location_) {
    $location = _$location_;
    scope = $rootScope.$new();

    createController = function() {
      return $controller('TodosCtrl', {
         $scope: scope
      });
    };
  }));

  it('should have an empty newTodo model', function() {
    var controller = createController();
    expect(scope.newTodo).toEqual({})
  })
});
