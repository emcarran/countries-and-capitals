describe('countriesController', function () {

    beforeEach(function () {
        module('ccApp');
    });

    beforeEach(inject(function ($rootScope, $getCountries) {
        $scope = $rootScope.$new();
        controller = $controller('countriesController', {
            $scope: $scope
        });
    }));

    it('should query the API and return a list of countries',
        inject(function (getCountries, $rootScope, $httpBackend) {
            $httpBackend.expect('GET', '/api.geonames.org/countryInfo?type=json&username=toc5012').respond(200);
            getCountries().then(function (response) {})
            $rootScope.$digest();
            $httpBackend.flush();
            expect($rootScope.data.length).toBeGreaterThan(0);
        }));
});
