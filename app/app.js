angular.module('app', [
  'ngAnimate',
  'ui.bootstrap',
  'ngRoute',
  'app.queue',
  'app.overview',
  'app.nodes',
  'app.partitions'
]);

angular.module('app').config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/overview'});
}]);


angular.module('app').controller('AppCtrl', function($scope, $location){

  $scope.isNavCollapsed = true;

  $scope.isActive = function (viewLocation) {
       var active = (viewLocation === $location.path());
       return active;
  };
});
