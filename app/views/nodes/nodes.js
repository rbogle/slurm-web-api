
angular.module('app.nodes', ['ngRoute']);
angular.module('app.nodes').config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/nodes', {
    templateUrl: "views/nodes/nodes.html",
    controller: "NodesCtrl",
    controllerAs: "nodes"
  });
}]);

// angular.module('app.nodes').factory('nodes', function($http){
//     var url = "http://nebula.wr.usgs.gov/slurmapi/nodes";
//     var nodes ={};
//     nodes.list = {};
//     nodes.update = function(){
//       $http.get(url).then(function(response){
//           nodes.list= response.data
//       });
//       //console.log(nodes.list)
//       return nodes.list;
//     };
//     return nodes;
// });

angular.module('app.nodes').controller('NodesCtrl', function ($scope, $http, $interval){
  var self = this;
  var url = "http://nebula.wr.usgs.gov/slurmapi/nodes";
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

  self.rowClass = function(node){
      var state= "";
      var cpuload = node.alloc_cpus / node.cpus;
      var memload = node.alloc_mem / node.real_memory;
      if ((cpuload >= .25 ) || (memload >= .25) ){
        state='info';
      }
      if ((cpuload >= .5 ) || (memload >= .5 ) ){
        state='warning';
      }
      if ((cpuload >= .75 ) || (memload >= .75 ) ){
        state='danger';
      }
      //console.log( node.name+": "+cpuload+" | "+memload+" = "+state);
      return state;
  };

});
