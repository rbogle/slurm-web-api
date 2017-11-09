angular.module('app.partitions', ['ngRoute']);
angular.module('app.partitions').config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/partitions', {
    templateUrl: "views/partitions/partitions.html",
    controller: "PartCtrl",
    controllerAs: "parts"
  });
}]);

//
// angular.module('app.partitions').factory('parts', function($http){
//     var url = apiUrl.partitions;
//     var parts ={};
//     parts.list = {};
//     parts.update = function(){
//       $http.get(url).then(function(response){
//           parts.list= response.data
//       });
//       return parts.list;
//     };
//     return parts;
// });

angular.module('app.nodes').controller('PartCtrl', function ($scope, $http, $interval){
  var self = this;
  var url = apiUrl.partitions;
  $http.get(url).then(function(response){
      self.list= response.data
  });
  // do updates every 5s on queue info
  self.stop = $interval(function(){
    $http.get(url).then(function(response){
        self.list= response.data
    });
  }, 5000);
  //kill updates when we nav away
  $scope.$on('$destroy', function(){
    if (self.stop)
      $interval.cancel(self.stop);
  });


});
