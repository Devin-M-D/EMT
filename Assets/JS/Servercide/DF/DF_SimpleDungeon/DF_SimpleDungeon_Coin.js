//DF_SimpleDungeon_Coin
////////////////////////////
var DF_SimpleDungeon_Coin = function (element) {
  var defaultParams = {};
  var promise = ServercideApp.call(
    this, element, "DF_SimpleDungeon_Coin", defaultParams,
    DF_SimpleDungeon_Coin.prototype.onStrap
  );
  return promise;
}
DF_SimpleDungeon_Coin.prototype = Object.create(ServercideApp.prototype);

DF_SimpleDungeon_Coin.prototype.onStrap = function (app) {
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
  return new Promise(function (fulfill, reject) {
    var parent = app.getParentElement()
    parent.css("background-color", "goldenrod");
    fulfill();
  });
}
////////////////////////////
