//DF_Budget app definition template
//V1.0
////////////////////////////
var DF_Budget = function (element) {
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
  var app = this;
  var promise = ServercideApp.call(this, app, element, "DF_Budget", defaultParams).then(function () { app.postStrap(app); });
  return promise;
}
DF_Budget.prototype = Object.create(ServercideApp.prototype);

DF_Budget.prototype.onStrap = function (app) {
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
  return new Promise(function (fulfill, reject) {
    app.element.html('budget');
    app.element.append('<span id="budgetCal" SC_appObj="true" SC_appType="SC_Calendar">');
    fulfill();
  });
}

DF_Budget.prototype.postStrap = function (app) {
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
  return new Promise(function (fulfill, reject) {
    fulfill();
  });
}

DF_Budget.prototype.discoveryComplete = function (app) {
  app.debugMsg("Recursive Servercide discovery complete, running discoveryComplete function of " + app.element.attr("id") + " app " + app.getMetaParam("type") + ".", 2);
  return new Promise(function (fulfill, reject) {
    fulfill();
  });
}
////////////////////////////
