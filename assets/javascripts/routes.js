/* global angular*/
angular.module('oneboard')

.config(($stateProvider, $urlRouterProvider) => {
  var homeState = {
    name: 'home',
    url: '/',
    templateUrl: 'templates/home.html',
    controller: 'HomeCtrl'
  };

  var explorerState = {
    name: 'explorer',
    url: '/explorer?location',
    templateUrl: 'templates/explorer.html',
    controller: 'ExplorerCtrl'
  };

  var loginState = {
    name: 'login',
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  };

  var registerState = {
    name: 'register',
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'RegisterCtrl'
  };

  var flowchartState = {
    name: 'flowchart',
    url: '/flowchart',
    templateUrl: 'templates/flowchart.html',
    controller: 'FlowchartCtrl'
  };

  var personalizeState = {
    name: 'personalize',
    url: '/personalize?location',
    templateUrl: 'templates/personalize.html',
    controller: 'PersonalizeCtrl'
  };

  var alertState = {
    name: 'alert',
    url: '/alert',
    templateUrl: 'templates/alert.html',
    controller: 'AlertCtrl'
  };

  $stateProvider.state(homeState);
  $stateProvider.state(explorerState);
  $stateProvider.state(loginState);
  $stateProvider.state(registerState);
  $stateProvider.state(flowchartState);
  $stateProvider.state(personalizeState);
  $stateProvider.state(alertState);
  $urlRouterProvider.otherwise('/');

});
