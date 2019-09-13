//DF_RewardBoard
////////////////////////////
var DF_RewardBoard = function (element) {
  var defaultParams = {
    "boardSize": "100"
  };
  var app = this;
  var promise = ServercideApp.call(this, app, element, "DF_RewardBoard", defaultParams).then(function () { app.postStrap(app); });
  return promise;
}
DF_RewardBoard.prototype = Object.create(ServercideApp.prototype);

DF_RewardBoard.prototype.onStrap = function (app) {
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
  return new Promise(function (fulfill, reject) {
    app.element.append(`\
      <span id="rwrdbrd_ToDo" SC_appObj="true" SC_appType="DF_ToDo" style="width:50%;" debug="7"></span>\
    `);
    fulfill();
  });
}

DF_RewardBoard.prototype.postStrap = function (app) {
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
  return new Promise(function (fulfill, reject) {
    fulfill();
  });
}

DF_RewardBoard.prototype.discoveryComplete = function (app) {
  app.debugMsg("Recursive Servercide discovery complete, running discoveryComplete function of " + app.element.attr("id") + " app " + app.getMetaParam("type") + ".", 2);
  return new Promise(function (fulfill, reject) {
    fulfill();
  });
}
////////////////////////////
