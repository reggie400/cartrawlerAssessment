//ToDo: Update these tests

describe('Cartrawler App', function() {
  describe('carList', function() {
    beforeEach(function() {
      browser.get('index.html');
    });

    it('should filter the car list as a user inputs into the search box', function() {
      var carList = element.all(by.repeater('car in $ctrl.cars'));
      var query = element(by.model('$ctrl.query'));

      expect(phoneList.count()).toBe(3);

      query.sendKeys('Passat');
      expect(carList.count()).toBe(1);

      query.clear();
      query.sendKeys('Audi');
      expect(carList.count()).toBe(1);
    });

  });
});
