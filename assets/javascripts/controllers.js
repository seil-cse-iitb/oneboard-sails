var API_ROOT = CONFIG.BACKEND_HOST
angular.module('seil-bms-angularjs')

    .controller('HomeCtrl', function ($scope, $http, Auth, $window, $location) {
        Auth.loginRequired();
        $scope.logout = function () {
            $window.localStorage.removeItem('satellizer_token');
            $location.path('/login');
        }
    })
    .controller('MasterCtrl', function ($scope, $http, Auth, $window, $location, $stateParams, Alert) {
        // Auth.loginRequired();
        $scope.logout = function () {
            $window.localStorage.removeItem('satellizer_token');
            $location.path('/login');
        }
        io.socket.get('/alert?resolved=false&sort=createdAt DESC&limit=10', function (resData) {
            console.log(resData);
            $scope.alerts = resData;
            $scope.$apply();
            io.socket.on('alert', function (alert) {
                // console.log(alert)
                switch(alert.verb){
                    case "created":$scope.alerts.unshift(alert.data);
                }
                
                $scope.$apply();
            });
        });
        $scope.generateColorFromLevel = function (level) {
            switch (level) {
                case 'danger': return 'red';break;
                case 'warn': return 'warn';break;
                case 'info': return '';break;
                case 'success': return 'primary';break;
            }
        }

    })
    .controller('205Ctrl', function ($scope, $http, Auth, $window, $location) {
        // Auth.loginRequired();
        $scope.changeState = function (appliance, state) {
            var state_string = state ? "on" : "off";
            $http.get(API_ROOT + "control/205/" + appliance + "/" + state_string);
        }
        $scope.logout = function () {
            $window.localStorage.removeItem('satellizer_token');
            $location.path('/');
        }
    })
    .controller('ExplorerCtrl', function ($scope, $http, $window, $stateParams, $state, $sce, Auth, Equipment, EquipmentGroup, Sensor, Util) {
        // Auth.loginRequired();

        $scope.logout = function () {
            $window.localStorage.removeItem('satellizer_token');
            $location.path('/');
        }
        if (!$stateParams.location) {
            $state.go('explorer', { location: '/' });
        }
        $http.get(API_ROOT + 'location?location=' + $stateParams.location).then(function (res) {
            $scope.properties = res.data;
            for (const key in $scope.properties.embeds) {
                $scope.properties.embeds[key] = $sce.trustAsHtml($scope.properties.embeds[key]);

            }
            $scope.table = Array.matrix($scope.properties.rows, $scope.properties.cols, 0);
            Equipment.query({ location: $stateParams.location }, function (res) {
                $scope.equipments = res;
                for (var i = 0; i < $scope.equipments.length; i++) {
                    var equipment = $scope.equipments[i];
                    $scope.table[equipment.properties.row - 1][equipment.properties.col - 1] = { "equipment": $scope.equipments[i] }
                };
                // test
                Sensor.query({ location: $stateParams.location }, function (res) {
                    $scope.sensors = res;
                    for (var i = 0; i < $scope.sensors.length; i++) {
                        var sensor = $scope.sensors[i];
                        if($scope.table[sensor.properties.row - 1][sensor.properties.col - 1])
                            $scope.table[sensor.properties.row - 1][sensor.properties.col - 1].sensor = $scope.sensors[i];
                        else
                            $scope.table[sensor.properties.row - 1][sensor.properties.col - 1] = { "sensor": $scope.sensors[i] }

                    };
                    console.log($scope.table)
                })
            });

            // Group
            EquipmentGroup.query({ location: $stateParams.location }, function(res){
                $scope.equipment_groups = res;
            })

        })
        $scope.navigate = function (location) {
            $state.go('explorer', { location: $stateParams.location + location });
        }
        $scope.navigateTrail = function(t){
            var location ="/";
            for(var i in $scope.trail){
                location+=$scope.trail[i]+"/";
                if($scope.trail[i] == t){
                    break;
                }
            }
            $state.go('explorer', { location: location });
        }
        $scope.trail = $stateParams.location.split("/")
        $scope.trail.pop();
        $scope.trail.shift();
        // console.log($scope.trail)
        io.socket.get('/sensor/subscribe?location=' + $stateParams.location, function (data, jwr) {

            io.socket.on('sensor_data', function (reading) {
                // console.log(reading)
                var sensor = Util.getBySerial($scope.sensors, reading.serial)
                if (sensor != null) {
                    sensor.value = reading.temperature;
                    var hue = 250 - (reading.temperature - 16) * (250 / 16)
                    sensor.properties.style['background-color'] = "hsl(" + hue + ",100%,50%)"
                    $scope.$apply();
                }
            });
            
        });

        io.socket.get('/equipment/subscribe?location=' + $stateParams.location, function (data, jwr) {
            io.socket.on('equipment_actuation', function (reading) {
                // console.log(reading)
                var equipment = Util.getBySerial($scope.equipments, reading.serial)
                if (equipment != null) {
                    equipment.properties.state = reading.state;
                    $scope.$apply();
                }
            });
        });

        io.socket.get('/equipmentGroup/subscribe?location=' + $stateParams.location, function (data, jwr) {
            io.socket.on('equipment_group_actuation', function (reading) {
                // console.log(reading)
                var equipment_group = Util.getBySerial($scope.equipment_groups, reading.serial)
                if (equipment_group != null) {
                    equipment_group.properties.state = reading.state;
                    $scope.$apply();
                }
            });
        });

    })
    .controller('LoginCtrl', ['$scope', '$window', '$http', '$location', '$auth', function ($scope, $window, $http, $location, $auth) {
        $scope.login = function () {
            $http.post('/auth/authenticate', $scope.user).then(function (response) {
                $window.localStorage.setItem('satellizer_token', response.data.token);
                $location.path('/');
            }, function (response) {
                alert(response.data.message);
            });
        }
        $scope.authenticate = function (provider) {
            $auth.authenticate(provider).then(function (response) {
                // Signed in with IITBSSO.
                $location.path('/');
            })
                .catch(function (response) {
                    // Something went wrong.
                    alert(response.data.message);
                });
        };
    }]);

Array.matrix = function (numrows, numcols, initial) {
    var arr = [];
    for (var i = 0; i < numrows; ++i) {
        var columns = [];
        for (var j = 0; j < numcols; ++j) {
            columns[j] = initial;
        }
        arr[i] = columns;
    }
    return arr;
}
