var app = angular.module('taskBuild', ['ui.router']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    });

    .state('tasks', {
      url: '/tasks/{id},
      templateUrl: '/tasks.html',
      controller: 'TasksCtrl'
    });

  $urlRouterProvider.otherwise('home');
}]);

app.factory('tasks', [function(){
  var o = {
    tasks: []
  };
  return o;

}[);

app.controller('MainCtrl', [
  '$scope', 'tasks', function($scope, tasks){
    $scope.test = 'test the tasks';

    $scope.tasks = tasks.tasks;

    
    $scope.addTask = function(){
      if(!$scope.title || $scope.title === '') { return; }      
      $scope.tasks.push({
        title: $scope.title, 
        upvotes: 0, 
        comments: [
          {author: 'Joe', body: 'Cool post!', upvotes: 0},
          {author: 'Bob', body: 'hi', upvotes: 0}
        ]
      });
      $scope.title = '';
    };

    $scope.incrementUpvotes = function(task) {
      task.upvotes += 1;
    };

}]);


app.controller('TasksCtrl', [
  '$scope',
  '$stateParams',
  'tasks',
function($scope, $stateParams, tasks){
  $scope.task = tasks.tasks[$stateParams.id];

});


