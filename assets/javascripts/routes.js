angular.module('seil-bms-angularjs')
// .config(function($routeProvider) {
//     $routeProvider
//     .when("/", {
//         templateUrl : "templates/home.html",
//         controller : "HomeCtrl"
//     })
//     .when("/205", {
//         templateUrl : "templates/205.html",
//         controller : "205Ctrl"
//     })
//     .when("/explorer", {
//         templateUrl : "templates/explorer.html",
//         controller : "ExplorerCtrl"
//     })
//     .when("/login", {
//         templateUrl : "templates/login.html",
//         controller: "LoginCtrl"
//     })
//     .otherwise({
//         redirectTo: '/'
//     });
// });


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
$stateProvider.state(homeState);
$stateProvider.state(explorerState);
$stateProvider.state(loginState);
$urlRouterProvider.otherwise('/explorer');

});