//DF_RewardBoard
////////////////////////////
var DF_RewardBoard = function (element) {
  var defaultParams = {
    "boardSize": "100"
  };
  var promise = ServercideApp.call(
    this, element, "DF_RewardBoard", defaultParams,
    DF_RewardBoard.prototype.onStrap
  );
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
////////////////////////////
