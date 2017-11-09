
angular.module('app.nodes', ['ngRoute']);
angular.module('app.nodes').config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/nodes', {
    templateUrl: "views/nodes/nodes.html",
    controller: "NodesCtrl",
    controllerAs: "nodes"
  });
}]);

// angular.module('app.nodes').factory('nodes', function($http){
//     var url = apiUrl.nodes;
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
  var url = apiUrl.nodes;
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

  self.set_color = function(node){
    cpuload = Math.round((node.alloc_cpus / node.cpus)*1000)/10;
    memload = Math.round((node.alloc_mem / node.real_memory)*1000)/10;
    value = Math.max(cpuload,memload);
    //console.log("Node color is: "+value);
    if (value < 25 ){
      return {};
    }
    else {
      hue = 100-Math.min(Math.max(value,1),100);
      hue_str = 'hsl('+hue+',61%,61%)';
      return { backgroundColor: hue_str};
    }
  };

});
