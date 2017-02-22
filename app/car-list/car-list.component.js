angular.
    module('carList').
    component('carList', {
        templateUrl: 'car-list/car-list.template.html',
        controller: ['$http',
            function CarListController($http) {
                var self = this;
                self.orderProp = "TotalCharge.RateTotalAmount";

                $http.get('./cars/cars.json').then(function (response) {
                    let id = 0;
                    let leg = response.data[0].VehAvailRSCore.VehRentalCore;
                    const stripKey = (key) => {
                        return _.trim(key, '@');
                    };
                    const removeAtSymbolsFromObj = (obj) => {
                        return _.reduce(obj, (result, val, key) => {
                            if (_.isObject(val)) {
                                result[stripKey(key)] = removeAtSymbolsFromObj(val);
                            } else {
                                if(key === '@RateTotalAmount'){
                                    val = parseFloat(val);
                                }
                                result[stripKey(key)] = val;
                            }
                            return result;
                        }, {});
                    };
                    const removeAtSymbols = (carArray) => {
                        return _.map(carArray, (carObj, val, key) => {
                           return removeAtSymbolsFromObj(carObj);
                        });
                    };
                    let normalizedCars = _.map(response.data[0].VehAvailRSCore.VehVendorAvails, (item) => {
                        const normalizedJSON = _.map(item.VehAvails, (key) => {
                            key.Vehicle.id = id++;
                            const Status = key['@Status'];
                            const Vehicle = key.Vehicle;
                            const Vendor = item.Vendor;
                            const TotalCharge = key.TotalCharge;
                            return { Vehicle, TotalCharge, Vendor, Status };
                        });
                        return normalizedJSON;
                    });
                    console.log('LEGEND' + JSON.stringify(removeAtSymbolsFromObj(leg), null, 4));
                    return self.cars = removeAtSymbols(_.flatten(normalizedCars)), self.legend = removeAtSymbolsFromObj(leg);
                }, (err) => {
                    return { err: "Problem recieving cars" }
                });
            }
        ]
    });
