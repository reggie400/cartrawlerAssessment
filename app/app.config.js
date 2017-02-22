angular.
    module('cartrawlerApp').
    config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');

            $routeProvider.
                when('/cars', {
                    template: '<car-list></car-list>'
                }).
                when('/cars/booked', {
                    //ToDo: Booked Page
                    template: '<a href="#"><h1>BOOKED!</h1></a>'
                }).
                when('/cars/:carId', {
                    template: '<car-detail></car-detail>'
                }).
                otherwise('/cars');
        }
    ]);
