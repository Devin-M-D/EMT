//DF_Budget app definition template
//V1.0
////////////////////////////
class DF_Budget {
  constructor(element) {
    var defaultParams = {
      "finances": {
        "accounts": [
          {
            "name": "bank1",
            "balance": "750.00"
          }
        ],
        "ledger": [{
          "name": "test tx",
          "date": "2019-11-08",
          "amount": "11.37"
        }]
      }
    };
    var promise = new ServercideApp(this, element, "DF_Budget", defaultParams);
    return promise;
  }
  onStrap = function (app) {
    app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
    return new Promise(function (fulfill, reject) {
      app.element.html('budget');
      app.element.append('<span id="budgetCal" SC_appObj="true" SC_appType="SC_Calendar">');
      fulfill();
    });
  }
}////////////////////////////
