var API_ROOT = CONFIG.BACKEND_HOST

angular.module('seil-bms-angularjs')

.service('Auth',['$http','$location',function($http, $location){

  this.loginRequired = function($state){
    $http.get('/auth/verify').then(function(){},function(){
      console.log("go to login");
      localStorage.removeItem('id_token');
      $location.path('/login');
    })
  }
}])
.service('Util',['$http', '$location', function($http, $location){
  this.getBySerial = function(list, serial){
    for(var i=0; i<list.length; i++){
      if(list[i].serial == serial)
        return list[i];
    }
    return null;
  };
}])
.factory('Sensor', function($resource) {
  return $resource(API_ROOT+'sensor/:sensorId', { sensorId:'@id' });
})
.factory('Equipment', function($resource) {
  return $resource(API_ROOT+'equipment/:equipmentId', { equipmentId:'@id' },{
    //actions
    actuate: {method: 'POST', params: {equipmentId: '@id'}, url: API_ROOT+'equipment/actuate/:equipmentId'}
  });
})
.factory('EquipmentGroup', function($resource) {
  return $resource(API_ROOT+'equipmentGroup/:equipmentId', { equipmentId:'@id' },{
    //actions
    actuate: {method: 'POST', params: {equipmentId: '@id'}, url: API_ROOT+'equipmentGroup/actuate/:equipmentId'}
  });
})
.factory('Alert', function($resource) {
  return $resource(API_ROOT+'alert/:alertId ASC', { alertId:'@id' });
})
// .factory('channel', function($resource) {
//   return $resource('/todo/:todoId', { todoId:'@_id' });
// });