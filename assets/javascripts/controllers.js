/* eslint-disable prefer-arrow-callback */
/*global angular, CONFIG*/
// var API_ROOT = CONFIG.BACKEND_HOST;
angular.module('oneboard')

.controller('HomeCtrl', function() {
// pass
})
.controller('ToolbarCtrl', function($scope, Auth, $window, $state) {
  $scope.isLoggedIn = Auth.isLoggedIn();
  $scope.logout = function() {
    $window.localStorage.removeItem('satellizer_token');
    $window.localStorage.removeItem('user');
    $state.go('login');
  };
})

.controller('MasterCtrl', function($scope, $mdToast) {
  // ALERT
  $scope.showActionToast = function(message) {
    var pinTo = "top right";
    var toast = $mdToast.simple()
            .textContent(message)
            .action('close')
            .highlightAction(true)
            .highlightClass('md-accent') // Accent is used by default, this just demonstrates the usage.
            .position(pinTo);
    $mdToast.show(toast).then(function(response) {
      if (response === 'ok') {
        // alert('You clicked the \'UNDO\' action.');
      }
    });
  };

  $scope.showSimpleToast = function(message) {
    $mdToast.show(
      $mdToast.simple()
      .textContent(message)
      .position('bottom right')
      .hideDelay(3000))
  };

})

.controller('ExplorerCtrl', function($scope, $stateParams, $state, $sce, Acl, Auth, Equipment, Location, Util) {
  Auth.loginRequired($scope);

  $scope.location = {};
  if (!$stateParams.location) {
    Location.query(function(res) {
      // console.log(res);
      $scope.location.children = res;
    });
  }
  else {
    Acl.has_access({ userId: Auth.user.username(), location: $stateParams.location || null }, function (res) {
      $scope.is_admin = $scope.is_admin || res.access_level == 1;
      console.log(res);
    });
    Location.get({ id: $stateParams.location }, function(res) {
      $scope.location = res;

      $scope.embeds = $sce.trustAsHtml($scope.location.properties.embeds);

      $scope.table = Array.matrix($scope.location.properties.rows, $scope.location.properties.cols, 0);

      Equipment.query({ isLocatedIn: $stateParams.location }, function(res) {
        $scope.equipments = res;
        for (var i = 0; i < $scope.equipments.length; i++) {
          var equipment = $scope.equipments[i];
          $scope.table[equipment.properties.row - 1][equipment.properties.col - 1] = { "equipment": $scope.equipments[i] };
        };

      });

    });


  }
  $scope.navigate = function(location) {
    $state.go('explorer', { location: location });
  };
  $scope.navigateTrail = function(t) {
    var location = "/";
    for (var i in $scope.trail) {
      location += $scope.trail[i] + "/";
      if ($scope.trail[i] == t) {
        break;
      }
    }
    $state.go('explorer', { location: location });
  };

})
.controller('LoginCtrl', ['$scope', '$window', '$http', '$location', '$auth', 'Auth', function($scope, $window, $http, $location, $auth, Auth) {
  Auth.logoutRequired();
  $scope.login = function() {
    $http.post('/auth/authenticate', $scope.user).then(function(response) {
      $window.localStorage.setItem('satellizer_token', response.data.token);

      $http.get('auth/verify').then(function (res) {
        localStorage.setItem('user', JSON.stringify(res.data.data));
        $location.path('/explorer');
      });
    }, function(response) {
      alert(response.data.message);
    });
  };
  $scope.authenticate = function(provider) {
    $auth.authenticate(provider).then(function(response) {
      // Signed in with IITBSSO.
      $location.path('/explorer');
    })
            .catch(function(response) {
              // Something went wrong.
              alert(response.data.message);
            });
  };
}])

.controller('RegisterCtrl', ['$scope', '$state', '$http', '$location', '$auth', 'Auth', function($scope, $state, $http, $location, $auth, Auth) {
  Auth.logoutRequired();
  $scope.register = function() {
    if($scope.user.password!==$scope.user.confirm_password){
      $scope.showSimpleToast('Passwords do not match');
      return;
    }

    $http.post('/auth/register', $scope.user).then(function(response) {
      $scope.showSimpleToast('Successfully registered');
      $state.go('login');
    }, function(response) {
      $scope.showSimpleToast(response.data);
    });
  };
}])

.controller('AlertCtrl', function($scope, $http, Auth, $window, $location) {
  $scope.isLoggedIn = Auth.isLoggedIn();
  // $scope.logout = function() {
  //     $window.localStorage.removeItem('satellizer_token');
  //     $location.path('/login');
  // }
})

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

    nodes: [{
      name: "Example Node 1",
      id: 0,
      x: 0,
      y: 0,
      width: 350,
      inputConnectors: [{
        name: "A",
      },
      {
        name: "B",
      },
      {
        name: "C",
      },
      ],
      outputConnectors: [{
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
      inputConnectors: [{
        name: "A",
      },
      {
        name: "B",
      },
      {
        name: "C",
      },
      ],
      outputConnectors: [{
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

    connections: [{
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
  $scope.keyDown = function(evt) {

    if (evt.keyCode === ctrlKeyCode) {

      ctrlDown = true;
      evt.stopPropagation();
      evt.preventDefault();
    }
  };

  //
  // Event handler for key-up on the flowchart.
  //
  $scope.keyUp = function(evt) {

    if (evt.keyCode === deleteKeyCode) {
      //
      // Delete key.
      //
      $scope.chartViewModel.deleteSelected();
    }

    if (evt.keyCode === aKeyCode && ctrlDown) {
      //
      // Ctrl + A
      //
      $scope.chartViewModel.selectAll();
    }

    if (evt.keyCode === escKeyCode) {
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
  $scope.addNewNode = function() {

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
      inputConnectors: [{
        name: "X"
      },
      {
        name: "Y"
      },
      {
        name: "Z"
      }
      ],
      outputConnectors: [{
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
  $scope.addNewInputConnector = function() {
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
  $scope.addNewOutputConnector = function() {
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
  $scope.deleteSelected = function() {

    $scope.chartViewModel.deleteSelected();
  };

  //
  // Create the view-model for the chart and attach to the scope.
  //
  var callback = function(start, end) {
    console.log(start, end);
  };
  $scope.chartViewModel = new flowchart.ChartViewModel(chartDataModel, callback);
}])


.controller('PersonalizeCtrl', function($auth, $scope, $http, $location, $window, $stateParams, $state, $sce, Acl, Auth, Equipment, Location, Point, Sensor, Util) {
  Auth.loginRequired($scope);
  $scope.is_admin = Auth.user.is_admin();

  if (!$stateParams.location) {
    $state.go('explorer');
  }
  else {
    Acl.has_access({ user_id: Auth.user.username(), location: $stateParams.location || null }, function (res) {
      $scope.is_admin = $scope.is_admin || res.access_level == 1;
      if (!$scope.is_admin) {
        $state.go('explorer');
      }
    });
    Location.get({ id: $stateParams.location }, function(res) {
      $scope.location = res;
      $scope.table = Array.matrix($scope.location.properties.rows, $scope.location.properties.cols, 0);

      Equipment.query({ isLocatedIn: $stateParams.location }, function(res) {
        $scope.equipments = res;
        for (var i = 0; i < $scope.equipments.length; i++) {
          var equipment = $scope.equipments[i];
          equipment.properties.state.on = false;
          $scope.table[equipment.properties.row - 1][equipment.properties.col - 1] = { "equipment": $scope.equipments[i] };
        };
        // console.log($scope.table)
      });
    });

  }
  $scope.save = function(){
    console.log($scope.equipments);
    var user = {
      username:Auth.user.username(),
      name:Auth.user.name()
    };
    var equipments = [];
    for(var i=0; i<$scope.equipments.length; i++){
      if($scope.equipments[i].properties.state.on){
        equipments.push($scope.equipments[i]);
      }
    }
    console.log(equipments);
    $http.post(CONFIG.muRon.host+":"+CONFIG.muRon.port+"/api/personalize",{user:user, location:{id:$stateParams.location},preferences:equipments}).then(function(res){
      alert("Preferences saved");
    },function(res){
      alert("Oops! Something went wrong");
    });
  };
  $scope.callbacks = {
    switch: function(equipment){
      console.log(equipment);
    },
    change_temp:function(equipment, temp){
      if (temp<16 || temp>30){
        return ;
      }
      equipment.properties.state.temperature = temp;
    }
  };
});

Array.matrix = function(numrows, numcols, initial) {
  var arr = [];
  for (var i = 0; i < numrows; ++i) {
    var columns = [];
    for (var j = 0; j < numcols; ++j) {
      columns[j] = initial;
    }
    arr[i] = columns;
  }
  return arr;
};

$(".custom-close").click(function() {

  $(".custom-notification").slideToggle('slow');
});

