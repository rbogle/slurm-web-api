angular.module('app.overview', ['ngRoute']);

angular.module('app.overview').config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/overview', {
    templateUrl: 'views/overview/overview.html',
    controller: 'OverviewCtrl'
  });
}]);

angular.module('app.overview').controller('OverviewCtrl', function ($scope){

  $scope.message = 'hola';

  $scope.updateMessage = function(message){
    $scope.message = message;
  };

});
