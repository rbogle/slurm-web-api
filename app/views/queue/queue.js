
angular.module('app.queue', ['ngRoute']);
angular.module('app.queue').config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/queue', {
    templateUrl: 'views/queue/queue.html',
    controller: 'QueueCtrl'
  });
}]);

angular.module('app.queue').controller('QueueCtrl', function ($scope){
  $scope.title = "Queue"
});

angular.module('app.queue').controller('ListCtrl', function ($http){
  var self = this;
  // nebula allows CORS see enable-cors.org
  var url = "http://nebula.wr.usgs.gov/slurmapi/queue";
  $http.get(url).then(function(response){
      console.log(response.status);
      self.jobs = response.data;
  });

});
