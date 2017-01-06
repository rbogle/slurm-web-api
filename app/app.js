angular.module('app', [
  'ngAnimate',
  'ui.bootstrap',
  'ngRoute',
  'app.queue',
  'app.overview',
  'app.nodes'
]);

angular.module('app').config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/overview'});
}]);


angular.module('app').controller('AppCtrl', function($scope){

  $scope.isNavCollapsed = true;

});
