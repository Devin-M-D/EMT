//DF_SimpleDungeon_Wall
////////////////////////////
var DF_SimpleDungeon_Wall = function (element) {
  var defaultParams = {};
  var promise = ServercideApp.call(
    this, element, "DF_SimpleDungeon_Wall", defaultParams,
    DF_SimpleDungeon_Wall.prototype.onStrap
  );
  return promise;
}
DF_SimpleDungeon_Wall.prototype = Object.create(ServercideApp.prototype);

DF_SimpleDungeon_Wall.prototype.onStrap = function (app) {
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
  return new Promise(function (fulfill, reject) {
    var parent = app.getParentElement()
    parent.css("background-color", "darkblue");
    parent.css("color", "white");
    fulfill();
  });
}
////////////////////////////
