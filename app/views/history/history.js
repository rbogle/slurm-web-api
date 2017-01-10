angular.module('app.history', ['ngRoute']);
angular.module('app.history').config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/history', {
    templateUrl: "views/history/history.html",
    controller: "HistoryCtrl",
    controllerAs: "history"
  });
}]);

angular.module('app.history').controller('HistoryCtrl', function ($scope, $http, $interval){
  
});
