angular.module('app.overview', ['ngRoute','chart.js']);

angular.module('app.overview').config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/overview', {
    templateUrl: 'views/overview/overview.html',
    controller: 'OverviewCtrl',
    controllerAs: 'overview'
  });
}]);

angular.module('app.overview').controller('OverviewCtrl', function ($scope, $http, $interval){
  var self = this;
  var nodes_url = "http://nebula.wr.usgs.gov/slurmapi/nodes";

  self.graph_url = "http://astromon.wr.usgs.gov/dashboard/solo/db/hpc-queues?panelId=1&fullscreen&from=now-48h&to=now&theme=light";

  self.get_data = function(){
    $http.get(nodes_url).then(function(response){
        var nodes = []
        for (var key in response.data){
            node ={}
            anode = response.data[key];
            node.name = anode.name;
            node.cpu_load = Math.round((anode.alloc_cpus / anode.cpus)*1000)/10;
            node.mem_load = Math.round((anode.alloc_mem / anode.real_memory)*1000)/10;
            node.cpus = anode.cpus;
            node.mem = anode.real_memory;
            node.cpus_avail = anode.cpus-anode.alloc_cpus;
            node.mem_avail = anode.real_memory-anode.alloc_mem;
            node.state = anode.state;
            nodes.push(node);
        }
        self.nodes= nodes;
    });
  };

  self.get_data();

  // do updates every 5s on queue info
  self.stop = $interval(function(){
    self.get_data();
  }, 15000);

  //kill updates when we nav away
  $scope.$on('$destroy', function(){
    if (self.stop)
      $interval.cancel(self.stop);
  });

  // used with ng-style to set color of node status divs.
  self.set_color = function(value){
     hue = 100-Math.min(Math.max(value,1),100);
     hue_str = 'hsl('+hue+',61%,61%)';
     //index = Math.floor(value/10);
     //colors = ['Lime','LawnGreen', 'GreenYellow','YellowGreen','Yellow','Gold','Orange','OrangeRed','Red'];
     //colors = ['#00fa00','#3efa00', '#7cfc00','#bbfa00','#fafa00','#fabb00','#fa7d00','#fa3e00','#fa0000'];

     return { backgroundColor: hue_str};
  }


});
