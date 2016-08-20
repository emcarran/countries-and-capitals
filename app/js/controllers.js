var app = angular.module('ccApp');

app.controller('mainController', ['$scope', 'countryData', function ($scope, countryData) {}])

app.controller('countriesController', ['$scope', '$location', '$filter', 'countryData', '$q', function ($scope, $location, $filter, countryData, $q) {
    'use strict';

    var toString = Object.prototype.toString;

    //checking to see if API call returned any data
    $q.when(countryData.countries).then(function (result) {
        //checking to see if promise returns an object result
        if (toString.call(countryData.countries) == '[object Object]') {
            countryData.countries = result.geonames;
        }
        $scope.countries = countryData.countries;
    });

    $scope.showDetail = function (country) {
        $location.path('/countries/' + country.countryCode);
    };


    angular.forEach($scope.countries, function (country) {
        country.areaInSqKm = parseFloat(country.areaInSqKm);
        country.population = parseFloat(country.population);
    });

  }])

app.controller('detailsController', ['$scope', '$route', 'countryData', function ($scope, $route, countryData) {

    countryData.getCountry($route.current.params.countryCode).then(function (result) {
        $scope.country = result[0];
        //console.log($scope.country);
    });

    countryData.getCapitals($route.current.params.countryCode).then(function (result) {
        $scope.capital = result;
        $scope.capitalPopulation = $scope.capital.population;
    });

    countryData.getNeighbors($route.current.params.countryCode).then(function (result) {
        $scope.neighbors = result.geonames;
    });

    //toLowerCase will make flag visible even with lower case country code
    $scope.flag = $route.current.params.countryCode.toLowerCase();

    //toUpperCase will make map visible even with lower case country code
    $scope.map = $route.current.params.countryCode.toUpperCase();
}]);
