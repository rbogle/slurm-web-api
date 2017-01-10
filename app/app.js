angular.module('app', [
  'ngAnimate',
  'ui.bootstrap',
  'ngRoute',
  'app.queue',
  'app.overview',
  'app.nodes',
  'app.partitions',
  'app.history'
]);

angular.module('app').config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true);

  //$routeProvider.otherwise({redirectTo: '/overview'});
}]);


angular.module('app').controller('AppCtrl', function($scope, $location){
  // set the state for the responsive nav
  $scope.isNavCollapsed = true;
  // this hightlights the active sidebar item
  $scope.isActive = function (viewLocation) {
       var active = (viewLocation === $location.path());
       return active;
  };
});
