
angular.module('app.queue', ['ngRoute']);
angular.module('app.queue').config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/queue', {
    templateUrl: "views/queue/queue.html",
    controller: "QueueCtrl",
    controllerAs: "queue"
  });
}]);
// 
// angular.module('app.queue').factory('queue', function($http){
//     var url = "http://nebula.wr.usgs.gov/slurmapi/queue";
//     var queue ={};
//     queue.jobs = {};
//     queue.update = function(){
//       $http.get(url).then(function(response){
//           //console.log(response.status);
//           queue.jobs.running = {};
//           queue.jobs.pending = {};
//           queue.jobs.finished = {};
//           for (var key in response.data ){
//               job = response.data[key]
//               if (job.job_state == 'RUNNING') {
//                 queue.jobs.running[key]=job;
//               }
//               else if (job.job_state == 'PENDING'){
//                 queue.jobs.pending[key] = job;
//               }
//               else{
//                 queue.jobs.finished[key] = job;
//               }
//           }
//           //queue.jobs.running=response.data;
//       });
//       return queue.jobs;
//     };
//     return queue;
// });

angular.module('app.queue').controller('QueueCtrl', function ($scope, $http, $interval){
  var self = this;
  var url = "http://nebula.wr.usgs.gov/slurmapi/queue";
  self.jobs={};
  self.update = function (){
    $http.get(url).then(function(response){
        //console.log(response.status);
        self.jobs.running = {};
        self.jobs.pending = {};
        self.jobs.finished = {};
        for (var key in response.data ){
            job = response.data[key]
            if (job.job_state == 'RUNNING') {
              self.jobs.running[key]=job;
            }
            else if (job.job_state == 'PENDING'){
              self.jobs.pending[key] = job;
            }
            else{
              self.jobs.finished[key] = job;
            }
        }
    });

  };

  self.update();
  // do updates every 5s on queue info
  self.stop = $interval(function(){
    self.update();
  }, 5000);
  //kill updates when we nav away
  $scope.$on('$destroy', function(){
    if (self.stop)
      $interval.cancel(self.stop);
  });

});
