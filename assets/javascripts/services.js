var API_ROOT = CONFIG.BACKEND_HOST

angular.module('oneboard')

  .service('Auth', ['$http', '$location', function ($http, $location) {

    this.loginRequired = function ($state) {
      $http.get('auth/verify').then(function (res) {
        localStorage.setItem('user_id', res.data.data.username);
       }, function () {
        console.log("go to login");
        localStorage.removeItem('satellizer_token');
        $location.path('/login');
      })
    }
    this.logoutRequired = function ($state) {
      $http.get('auth/verify').then(function () {
        console.log("go to explorer");
        $location.path('/explorer');
      },function () { })
    }
    this.isLoggedIn = function ($state) {
      if (localStorage.getItem('satellizer_token'))
        return true;
      return false;
    }
  }])
  .service('Util', ['$http', '$location', function ($http, $location) {
    this.getBySerial = function (list, serial) {
      for (var i = 0; i < list.length; i++) {
        if (list[i].serial == serial)
          return list[i];
      }
      return null;
    };
  }])
  .factory('Sensor', function ($resource) {
    return $resource(API_ROOT + 'sensor/:sensorId', { sensorId: '@id' });
  })
  .factory('Location', function ($resource) {
    return $resource(API_ROOT + 'location/:locationId', { sensorId: '@id' });
  })
  .factory('Acl', function ($resource) {
    return $resource(API_ROOT + 'acl/:aclId', { sensorId: '@id' });
  })
  .factory('Equipment', function ($resource) {
    return $resource(API_ROOT + 'equipment/:equipmentId', { equipmentId: '@id' }, {
      //actions
      actuate: { method: 'POST', params: { equipmentId: '@id' }, url: API_ROOT + 'equipment/actuate/:equipmentId' }
    });
  })
  .factory('EquipmentGroup', function ($resource) {
    return $resource(API_ROOT + 'equipmentGroup/:equipmentId', { equipmentId: '@id' }, {
      //actions
      actuate: { method: 'POST', params: { equipmentId: '@id' }, url: API_ROOT + 'equipmentGroup/actuate/:equipmentId' }
    });
  })
  .factory('Alert', function ($resource) {
    return $resource(API_ROOT + 'alert/:alertId ASC', { alertId: '@id' });
  })
// .factory('channel', function($resource) {
//   return $resource('/todo/:todoId', { todoId:'@_id' });
// });