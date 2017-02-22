angular.
  module('carDetail').
  component('carDetail', {
    templateUrl: 'car-detail/car-detail.template.html',
    controller: ['$http', '$routeParams',
      function CarDetailController($http, $routeParams) {
        var self = this;
        this.carId = $routeParams.carId;

        $http.get('./cars/cars.json').then(function(response){
            let id = 0;
            const stripKey = (key) => {
                return _.trim(key, '@');
            };
            const removeAtSymbols = (obj) => {
                return _.reduce(obj, (result, val, key) => {
                    if(_.isObject(val)) {
                        result[stripKey(key)] = removeAtSymbols(val);
                    } else {
                        result[stripKey(key)] = val;
                    }
                    return result;
                }, {});
            };            
            let normalizedCarData = _.map(response.data[0].VehAvailRSCore.VehVendorAvails, (item) => {
                const normalizedJSON = _.map(item.VehAvails, (key) => {
                    key.Vehicle.id = id++;
                    const Status = key['@Status'];
                    const Vehicle = key.Vehicle;
                    const Vendor = item.Vendor;
                    const TotalCharge = key.TotalCharge;
                    return { Vehicle, TotalCharge, Vendor, Status };
                });
                // console.log('NORMALIZED JSON' + JSON.stringify(normalizedJSON));
                return normalizedJSON;
            });
            return self.car = [removeAtSymbols(_.flatten(normalizedCarData))]
        }, (err) => {
            return { err: "An error occurred"}
        });
      }
    ]
  });