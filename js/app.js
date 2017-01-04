angular.module('app', ['ngAnimate','ui.bootstrap']);

angular.module('app').controller('MainCtrl', function ($scope){

  $scope.message = 'hola';

  $scope.updateMessage = function(message){
    $scope.message = message;
  };

});

angular.module('app').factory('messages', function(){
  var messages = {};

  messages.list = [];

  messages.add = function(message){
    messages.list.push({id: messages.list.length, text: message});
  };

  return messages;
});

angular.module('app').controller('ListCtrl', function (messages){
  var self = this;

  self.messages = messages.list;
});

angular.module('app').controller('PostCtrl', function (messages){
  var self = this;
  self.newMessage = 'Hello World!';
  self.addMessage = function(message){
    messages.add(message);
    self.newMessage = '';
  };

});

angular.module('app').controller('NavCtrl', function($scope){

  $scope.isNavCollapsed = true;

});
