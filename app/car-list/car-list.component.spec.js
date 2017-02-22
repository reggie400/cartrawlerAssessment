describe('carList', function() {

    beforeEach(module('carList'));

    describe('CarListController', function() {
        var ctrl;


        beforeEach(inject(function($componentController, _$httpBackend_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('cars/cars.json')
            .respond([{name: 'Toyota Rav4'}, {name: 'Audi A3'}]);


            ctrl = $componentController('carList');
        }))

        it('should create a `cars` model with 3 cars', function(){
            expect(ctrl.cars.length).toBe(3);
        });

        it('should set a default value for the `orderProp` model', function() {
            expect(ctrl.orderProp).toBe('price');
        })
    });
});