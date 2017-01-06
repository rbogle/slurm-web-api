
angular.module('app.nodes', ['ngRoute']);
angular.module('app.nodes').config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/nodes', {
    templateUrl: "views/nodes/nodes.html",
    controller: "NodesCtrl",
    controllerAs: "nodes"
  });
}]);

angular.module('app.nodes').factory('nodes', function($http){
    var url = "http://nebula.wr.usgs.gov/slurmapi/nodes";
    var nodes ={};
    nodes.list = {};
    nodes.update = function(){
      $http.get(url).then(function(response){
          nodes.list= response.data
      });
      //console.log(nodes.list)
      return nodes.list;
    };
    return nodes;
});

angular.module('app.nodes').controller('NodesCtrl', function ($scope, nodes, $interval){
  var self = this;
  $scope.$on('$viewContentLoaded', function(){
      self.list = nodes.update();
  });
  // do updates every 5s on queue info
  self.stop = $interval(function(){
    self.list = nodes.update();
  }, 5000);
  //kill updates when we nav away
  $scope.$on('$destroy', function(){
    if (self.stop)
      $interval.cancel(self.stop);
  });

});
