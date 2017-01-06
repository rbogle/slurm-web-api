
angular.module('app.queue', ['ngRoute']);
angular.module('app.queue').config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/queue', {
    templateUrl: 'views/queue/queue.html'
  });
}]);

angular.module('app.queue').factory('queue', function($http){
    var url = "http://nebula.wr.usgs.gov/slurmapi/queue";
    var queue ={};
    queue.jobs = {};
    queue.update = function(){
      $http.get(url).then(function(response){
          //console.log(response.status);
          queue.jobs.running=response.data;
      });
      return queue.jobs;
    };
    return queue;
});

angular.module('app.queue').controller('QueueCtrl', function (queue, $interval){
  var self = this;
  self.jobs = queue.update();
  $interval(function(){
    self.jobs = queue.update();
  }, 5000);

});
