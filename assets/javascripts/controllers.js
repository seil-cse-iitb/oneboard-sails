var API_ROOT = CONFIG.BACKEND_HOST;
angular.module('oneboard')

    .controller('HomeCtrl', function ($scope, $http, Auth, $window, $location) {

    })
    .controller('ToolbarCtrl', function ($scope, $http, Auth, $window, $location) {
        $scope.isLoggedIn = Auth.isLoggedIn();
        $scope.logout = function () {
            $window.localStorage.removeItem('satellizer_token');
            $location.path('/login');
        }
    })

    .controller('MasterCtrl', function ($auth, $scope, $http, Auth, $window, $location, $stateParams, Alert) {
        // Auth.loginRequired();
        $scope.logout = function () {
            $window.localStorage.removeItem('satellizer_token');
            $location.path('/login');
        }
        $scope.hell_raised = false;
        io.socket.get('/alert?resolved=false&sort=createdAt DESC&limit=10', function (resData) {
            console.log(resData);
            $scope.alerts = resData;
            $scope.$apply();
            io.socket.on('alert', function (alert) {
                // console.log(alert)
                switch (alert.verb) {
                    case "created": $scope.alerts.unshift(alert.data);
                        console.log(alert)
                        if (alert.data.level === "danger") {
                            $scope.raise_hell();
                        }
                }

                $scope.$apply();
            });
        });
        $scope.generateColorFromLevel = function (level) {
            switch (level) {
                case 'danger': return 'red'; break;
                case 'warn': return 'warn'; break;
                case 'info': return ''; break;
                case 'success': return 'primary'; break;
            }
        }
        $scope.raise_hell = function () {
            console.log("RAISE HELL!!")
            $scope.hell_raised = true;
            $scope.$apply();
        }

    })

    .controller('ExplorerCtrl', function ($auth, $scope, $http, $window, $stateParams, $state, $sce, Acl, Auth, Equipment, EquipmentGroup, Location, Sensor, Util) {
        Auth.loginRequired($scope);

        $scope.logout = function () {
            $window.localStorage.removeItem('satellizer_token');
            $location.path('/');
        }
        $scope.location = {};
        if (!$stateParams.location) {
            Location.query(function (res) {
                // console.log(res);
                $scope.location.children = res;
            })
        }
        else {
            Acl.query({ user_id: localStorage.getItem("user_id").toUpperCase(), location: $stateParams.location || null }, function (res) {
                $scope.is_admin = res[0].access_level == 1;
                console.log($scope.is_admin);
            })
            Location.get({ id: $stateParams.location }, function (res) {
                $scope.location = res;
                $scope.embeds = "";
                // for(var i = 0; i < $scope.location.properties.embeds.length; i++){
                // $scope.embeds.push($sce.trustAsHtml($scope.location.properties.embeds[i]))
                // $scope.embeds +=$scope.location.properties.embeds[i];
                // }
                $scope.embeds = $sce.trustAsHtml($scope.location.properties.embeds);
                $scope.table = Array.matrix($scope.location.properties.rows, $scope.location.properties.cols, 0);
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
                            if ($scope.table[sensor.properties.row - 1][sensor.properties.col - 1])
                                $scope.table[sensor.properties.row - 1][sensor.properties.col - 1].sensor = $scope.sensors[i];
                            else
                                $scope.table[sensor.properties.row - 1][sensor.properties.col - 1] = { "sensor": $scope.sensors[i] }

                        };
                        // console.log($scope.table)
                    })
                });

                // Group
                EquipmentGroup.query({ location: $stateParams.location }, function (res) {
                    $scope.equipment_groups = res;
                })
            });


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
        }
        $scope.navigate = function (location) {
            $state.go('explorer', { location: location });
        }
        $scope.navigateTrail = function (t) {
            var location = "/";
            for (var i in $scope.trail) {
                location += $scope.trail[i] + "/";
                if ($scope.trail[i] == t) {
                    break;
                }
            }
            $state.go('explorer', { location: location });
        }

        $scope.create_location = function (new_location) {
            Location.save({ name: new_location.name, parents: [$stateParams.location] }, function (res) {
                console.log(res)
                $scope.location.children.push(res)
            })
        }
        $scope.remove_location = function (location_id) {
            Location.remove({ id: location_id }, function (res) {
                var i = 0;
                for (i in $scope.location.children) {
                    if ($scope.location.children[i].id == location_id) {
                        break;
                    }
                }
                $scope.location.children.splice(i, 1)
            })
        }
        // $scope.trail = $stateParams.location.split("/")
        // $scope.trail.pop();
        // $scope.trail.shift();
        // console.log($scope.trail)


    })
    .controller('LoginCtrl', ['$scope', '$window', '$http', '$location', '$auth', 'Auth', function ($scope, $window, $http, $location, $auth, Auth) {
        Auth.logoutRequired();
        $scope.login = function () {
            $http.post('/auth/authenticate', $scope.user).then(function (response) {
                $window.localStorage.setItem('satellizer_token', response.data.token);
                $location.path('/explorer');
            }, function (response) {
                alert(response.data.message);
            });
        }
        $scope.authenticate = function (provider) {
            $auth.authenticate(provider).then(function (response) {
                // Signed in with IITBSSO.
                $location.path('/explorer');
            })
                .catch(function (response) {
                    // Something went wrong.
                    alert(response.data.message);
                });
        };
    }])

    //
    // Application controller.
    //
    .controller('FlowchartCtrl', ['$scope', 'prompt', function AppCtrl($scope, prompt) {

        //
        // Code for the delete key.
        //
        var deleteKeyCode = 46;

        //
        // Code for control key.
        //
        var ctrlKeyCode = 17;

        //
        // Set to true when the ctrl key is down.
        //
        var ctrlDown = false;

        //
        // Code for A key.
        //
        var aKeyCode = 65;

        //
        // Code for esc key.
        //
        var escKeyCode = 27;

        //
        // Selects the next node id.
        //
        var nextNodeID = 10;

        //
        // Setup the data-model for the chart.
        //
        var chartDataModel = {

            nodes: [
                {
                    name: "Example Node 1",
                    id: 0,
                    x: 0,
                    y: 0,
                    width: 350,
                    inputConnectors: [
                        {
                            name: "A",
                        },
                        {
                            name: "B",
                        },
                        {
                            name: "C",
                        },
                    ],
                    outputConnectors: [
                        {
                            name: "A",
                        },
                        {
                            name: "B",
                        },
                        {
                            name: "C",
                        },
                    ],
                },

                {
                    name: "Example Node 2",
                    id: 1,
                    x: 400,
                    y: 200,
                    inputConnectors: [
                        {
                            name: "A",
                        },
                        {
                            name: "B",
                        },
                        {
                            name: "C",
                        },
                    ],
                    outputConnectors: [
                        {
                            name: "A",
                        },
                        {
                            name: "B",
                        },
                        {
                            name: "C",
                        },
                    ],
                },

            ],

            connections: [
                {
                    name: 'Connection 1',
                    source: {
                        nodeID: 0,
                        connectorIndex: 1,
                    },

                    dest: {
                        nodeID: 1,
                        connectorIndex: 2,
                    },
                },
                {
                    name: 'Connection 2',
                    source: {
                        nodeID: 0,
                        connectorIndex: 0,
                    },

                    dest: {
                        nodeID: 1,
                        connectorIndex: 0,
                    },
                },

            ]
        };

        //
        // Event handler for key-down on the flowchart.
        //
        $scope.keyDown = function (evt) {

            if (evt.keyCode === ctrlKeyCode) {

                ctrlDown = true;
                evt.stopPropagation();
                evt.preventDefault();
            }
        };

        //
        // Event handler for key-up on the flowchart.
        //
        $scope.keyUp = function (evt) {

            if (evt.keyCode === deleteKeyCode) {
                //
                // Delete key.
                //
                $scope.chartViewModel.deleteSelected();
            }

            if (evt.keyCode == aKeyCode && ctrlDown) {
                // 
                // Ctrl + A
                //
                $scope.chartViewModel.selectAll();
            }

            if (evt.keyCode == escKeyCode) {
                // Escape.
                $scope.chartViewModel.deselectAll();
            }

            if (evt.keyCode === ctrlKeyCode) {
                ctrlDown = false;

                evt.stopPropagation();
                evt.preventDefault();
            }
        };

        //
        // Add a new node to the chart.
        //
        $scope.addNewNode = function () {

            var nodeName = prompt("Enter a node name:", "New node");
            if (!nodeName) {
                return;
            }

            //
            // Template for a new node.
            //
            var newNodeDataModel = {
                name: nodeName,
                id: nextNodeID++,
                x: 0,
                y: 0,
                inputConnectors: [
                    {
                        name: "X"
                    },
                    {
                        name: "Y"
                    },
                    {
                        name: "Z"
                    }
                ],
                outputConnectors: [
                    {
                        name: "1"
                    },
                    {
                        name: "2"
                    },
                    {
                        name: "3"
                    }
                ],
            };

            $scope.chartViewModel.addNode(newNodeDataModel);
        };

        //
        // Add an input connector to selected nodes.
        //
        $scope.addNewInputConnector = function () {
            var connectorName = prompt("Enter a connector name:", "New connector");
            if (!connectorName) {
                return;
            }

            var selectedNodes = $scope.chartViewModel.getSelectedNodes();
            for (var i = 0; i < selectedNodes.length; ++i) {
                var node = selectedNodes[i];
                node.addInputConnector({
                    name: connectorName,
                });
            }
        };

        //
        // Add an output connector to selected nodes.
        //
        $scope.addNewOutputConnector = function () {
            var connectorName = prompt("Enter a connector name:", "New connector");
            if (!connectorName) {
                return;
            }

            var selectedNodes = $scope.chartViewModel.getSelectedNodes();
            for (var i = 0; i < selectedNodes.length; ++i) {
                var node = selectedNodes[i];
                node.addOutputConnector({
                    name: connectorName,
                });
            }
        };

        //
        // Delete selected nodes and connections.
        //
        $scope.deleteSelected = function () {

            $scope.chartViewModel.deleteSelected();
        };

        //
        // Create the view-model for the chart and attach to the scope.
        //
        var callback = function (start, end) {
            console.log(start, end);
        }
        $scope.chartViewModel = new flowchart.ChartViewModel(chartDataModel, callback);
    }])
    ;

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
