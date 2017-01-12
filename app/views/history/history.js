angular.module('app.history', ['ngRoute']);
angular.module('app.history').config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/history', {
    templateUrl: "views/history/history.html",
    controller: "HistoryCtrl",
    controllerAs: "history"
  });
}]);

// angular.module('app.history').factory('filterService', function(){
//   var filterobj = {}
//
//   return filterobj
// });
//
// angular.module('ap.history').factory('dataService', function ($http){
//   var ds ={}
//   var
//   ds.get_data = function
// });

angular.module('app.history').controller('HistoryCtrl', function ($scope, $http, $interval){

  var self = this;
  var url_base = "http://nebula.wr.usgs.gov/slurmapi/history";
  self.list={};
  self.filter_names=['limit','offset','user','job id','job name','start time','end time','submit time'];
  self.filter_ops=['=','>','<','>=','<=', '!='];
  self.filters_set={ limit: '25'};
  self.filter_key=""
  self.filter_val=""

  self.reset_filters = function(){
    self.filters_set={ limit: '25'};
    self.update();
  };

  self.add_filter= function (key,value){
    if (self.filter_names.indexOf(key) !== -1){
      //console.log("adding "+key+" & "+value)
      self.filters_set[key]=value;
      self.update()
    }
  };

  self.del_filter = function (key,value) {
    //console.log("removing "+key+" & "+value)
    if(key in self.filters_set){
       delete self.filters_set[key];
       self.update()
    }
  };

  self.update = function (){
    url = url_base;
    if (Object.keys(self.filters_set).length >= 0){
      url+="?"
    }
    for (key in self.filters_set) {
      url += key+"="+self.filters_set[key]+"&";
    }
    //console.log(url)
    $http.get(url).then(function(response){
        //console.log(response.status);
        self.list = response.data
    });
  };

  // do updates every 5s on queue info
  self.stop = $interval(function(){
    self.update();
  }, 15000);

  //kill updates when we nav away
  $scope.$on('$destroy', function(){
    if (self.stop)
      $interval.cancel(self.stop);
  });

  self.update();
});
