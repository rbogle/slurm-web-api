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
  self.data={};
  self.data_labels=['Id', "Name", 'User', 'Account', 'Status', 'Partition', 'Nodes', 'CPUs', 'Memory', 'WallTime', 'Submit Time', 'Start Time', 'End Time'];

  self.default_set=[
    {'key': 'limit', 'val': '25', 'op': '='}
  ];
  self.filters_set = self.default_set.slice(0);
  self.filter={
    'key': '',
    'val': '',
    'op': '='
  };
  self.sortType='';
  self.sortReverse=true;
  self.filters={
    'limit':{
        ops: ['='],
        valids: [],
        type: 'int',
        unique: true,
        input: 'text'
    },
    'offset':{
        ops: ['='],
        valids: [],
        type: 'int',
        unique: true,
        input: 'text'
    },
    'user':{
        ops: ['=' ],
        valids: [],
        type: 'string',
        unique: true,
        input: 'text'
    },
    'job id':{
        ops: ['=','>','<','>=','<=' ],
        valids: [],
        type: 'int',
        unique: false,
        input: 'text'
    },
    'job name':{
        ops: ['='],
        valids: [],
        type: 'string',
        unique: true,
        input: 'text'
    },
    'state':{
        ops: ['='],
        valids: ['JOB_PENDING','JOB_RUNNING','JOB_SUSPENDED','JOB_COMPLETE','JOB_CANCELLED','JOB_FAILED',
        'JOB_TIMEOUT', 'JOB_NODE_FAIL', 'JOB_PREEMPTED', 'JOB_BOOT_FAIL', 'JOB_DEADLINE'],
        type: 'int',
        unique: true,
        input: 'select'
    },
    'submit time':{
        ops: ['=', '>', '<', '>=', '<=' ],
        valids: [],
        unique: false,
        type: 'datetime',
        input: 'datetime'
    },
    'start time':{
        ops: ['=', '>', '<', '>=', '<=' ],
        valids: [],
        unique: false,
        type: 'datetime',
        input: 'datetime'
    },
    'end time':{
        ops: ['=', '>', '<', '>=', '<=' ],
        valids: [],
        unique: false,
        type: 'datetime',
        input: 'datetime'
    }
  };

  self.reset_filters = function(){
    self.filters_set={};
    self.filters_set=self.default_set.slice(0);
    self.update();
  };

  self.add_filter= function (key,val,op){
      if (self.filters[key].unique){
        for( i =0; i < self.filters_set.length; i++){
            if(self.filters_set[i].key == key){
              self.filters_set[i].op = op;
              self.filters_set[i].val = val;
              self.update();
              return;
            }
        }
      }
      var filter= { 'key': key, 'val': val, 'op':op};
      self.filters_set.push(filter);
      self.update();
  };

  self.del_filter = function (key,value) {

     for (i=0; i< self.filters_set.length; i++){
       var f = self.filters_set[i];
       if(key == f.key){
         self.filters_set.splice(i,1);
         break;
       }
    }
    self.update()
  };

  self.update = function (){
    url = url_base;
    if (self.filters_set.length>0){
      url+="?"
    }
  //  console.log(self.filters_set)
    for (filter of self.filters_set) {
      //console.log(filter.key+filter.op+filter.val)
      url += filter.key+filter.op+filter.val+"&";
    }
    $http.get(url).then(function(response){
        //console.log(response.status);
        self.data = response.data
    });
  };

  self.show_input = function(type,filter){
      //console.log('show_input', type, filter)
      var tree = {
        'text' : [ 'limit','offset','user','job id','job name'],
        'select' : ['state'],
        'datetime' : ['start time','end time','submit time']
      };
      if (tree[type].indexOf(filter) !== -1){
        return true;
      }
      return false;
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
