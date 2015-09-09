angular.module('nodeTodo' [])

.controller('mainController', function($scope, $http) {

  $scope.formData = {};
  $scope.todoData = {};

  //GEt all items
  $http.get('/items')
    .success(function(data) {
      $scope.todoData = data;
      console.log(data);
    });
    .error(function(error) {
      console.log('Error: ' + error);
    });

});

  //Create a new todo
  $scope.createTodo = function(todoID) {
  $http.post('/item', $scope.formData)
    .success(function(data) {
      $scope.formData = {};
      $scope.todoData = data;
      console.log(data);
    });
  .error(function(error) {
    console.log('Error: ' + error);
  });
  });

  //Delete a todo
  $scope.deleteTodo = function(todoID) {
  $http.delete('/item/' + todoID)
    .success(function(data) {
      $scope.todoData = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data;);
    });
  });

  
