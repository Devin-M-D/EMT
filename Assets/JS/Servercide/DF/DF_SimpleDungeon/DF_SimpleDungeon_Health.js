//DF_SimpleDungeon_Health
////////////////////////////
var DF_SimpleDungeon_Health = function (element) {
  var defaultParams = {};
  var promise = ServercideApp.call(
    this, element, "DF_SimpleDungeon_Health", defaultParams,
    DF_SimpleDungeon_Health.prototype.onStrap
  );
  return promise;
}
DF_SimpleDungeon_Health.prototype = Object.create(ServercideApp.prototype);

DF_SimpleDungeon_Health.prototype.onStrap = function (app) {
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
  return new Promise(function (fulfill, reject) {
    app.element.html("Health");
    fulfill();
  });
}
////////////////////////////
