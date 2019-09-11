var API_ROOT = CONFIG.BACKEND_HOST

angular.module('oneboard')

.service('Auth', ['$http', '$location', function($http, $location) {

        this.loginRequired = function($state) {
            console.log("login required")
            $http.get('auth/verify').then(function(res) {
                localStorage.setItem('user_id', res.data.data.username);
            }, function() {
                console.log("go to login");
                localStorage.removeItem('satellizer_token');
                $location.path('/login');
            })
        }
        this.logoutRequired = function($state) {
            $http.get('auth/verify').then(function() {
                console.log("go to explorer");
                $location.path('/explorer');
            }, function() {})
        }
        this.isLoggedIn = function($state) {
            if (localStorage.getItem('satellizer_token'))
                return true;
            return false;
        }
    }])
    .service('Util', ['$http', '$location', function($http, $location) {
        this.getBySerial = function(list, serial) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].serial == serial)
                    return list[i];
            }
            return null;
        };
    }])
    .factory('prompt', function() {

        /* Uncomment the following to test that the prompt service is working as expected.
        return function () {
          return "Test!";
        }
        */

        // Return the browsers prompt function.
        return prompt;
    })
    .factory('Point', function($resource) {
        return $resource(API_ROOT + 'point/:id', { id: '@id' });
    })
    .factory('Sensor', function($resource) {
        return $resource(API_ROOT + 'sensor/:id', { id: '@id' });
    })
    .factory('Location', function($resource) {
        return $resource(API_ROOT + 'location/:id', { id: '@id' });
    })
    .factory('Acl', function($resource) {
        return $resource(API_ROOT + 'acl/:id', { id: '@id' }, {
            has_access: { method: 'GET', params: { location: '@location' }, url: API_ROOT + 'acl/has_access/:location' }
        });
    })
    .factory('Equipment', function($resource) {
        return $resource(API_ROOT + 'equipment/:id', { id: '@id' }, {
            //actions
            actuate: { method: 'POST', params: { id: '@id' }, url: API_ROOT + 'equipment/actuate/:id' }
        });
    })
    .factory('Alert', function($resource) {
        return $resource(API_ROOT + 'alert/:id ASC', { id: '@id' });
    })
    // .factory('channel', function($resource) {
    //   return $resource('/todo/:todoId', { todoId:'@_id' });
    // });