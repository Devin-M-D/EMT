//DF_SimpleDungeon_Coinpurse
////////////////////////////
var DF_SimpleDungeon_Coinpurse = function (element) {
  var defaultParams = {};
  var promise = ServercideApp.call(
    this, element, "DF_SimpleDungeon_Coinpurse", defaultParams,
    DF_SimpleDungeon_Coinpurse.prototype.onStrap
  );
  return promise;
}
DF_SimpleDungeon_Coinpurse.prototype = Object.create(ServercideApp.prototype);

DF_SimpleDungeon_Coinpurse.prototype.onStrap = function (app) {
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
  return new Promise(function (fulfill, reject) {
    app.element.html("Coins");
    fulfill();
  });
}
////////////////////////////
