var app = angular.module('ccApp', ['DataServices', 'Data', 'ngRoute', 'ngAnimate']);

//inject a $routeProvide and use it to set URL routing rules
app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: './partials/home.html'
        })
        .when('/countries', {
            templateUrl: './partials/countries.html',
            controller: 'countriesController'
        })
        .when('/countries/:countryCode', {
            templateUrl: './partials/details.html',
            controller: 'detailsController'
        })
        .otherwise({
            redirectTo: '/home'
        });

}]);
