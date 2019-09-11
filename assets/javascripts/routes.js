angular.module('oneboard')

.config(function($stateProvider, $urlRouterProvider) {
var homeState = {
    name: 'home',
    url: '/',
    templateUrl: 'templates/home.html',
    controller: 'HomeCtrl'
}

var explorerState = {
    name: 'explorer',
    url: '/explorer?location',
    templateUrl: 'templates/explorer.html',
    controller: 'ExplorerCtrl'
}

var loginState = {
    name: 'login',
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
}

var flowchartState = {
    name: 'flowchart',
    url: '/flowchart',
    templateUrl: 'templates/flowchart.html',
    controller: 'FlowchartCtrl'
}

var personalizeState = {
    name: 'personalize',
    url: '/personalize?location',
    templateUrl: 'templates/personalize.html',
    controller: 'PersonalizeCtrl'
}

$stateProvider.state(homeState);
$stateProvider.state(explorerState);
$stateProvider.state(loginState);
$stateProvider.state(flowchartState);
$stateProvider.state(personalizeState);
$urlRouterProvider.otherwise('/');

});