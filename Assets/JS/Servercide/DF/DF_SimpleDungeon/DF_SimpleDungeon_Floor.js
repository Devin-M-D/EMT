//DF_SimpleDungeon_Floor
////////////////////////////
var DF_SimpleDungeon_Floor = function (element) {
  var defaultParams = {};
  var promise = ServercideApp.call(
    this, element, "DF_SimpleDungeon_Floor", defaultParams,
    DF_SimpleDungeon_Floor.prototype.onStrap
  );
  return promise;
}
DF_SimpleDungeon_Floor.prototype = Object.create(ServercideApp.prototype);

DF_SimpleDungeon_Floor.prototype.onStrap = function (app) {
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
  return new Promise(function (fulfill, reject) {
    var parent = app.getParentElement()
    parent.css("background-color", "lightblue");
    parent.css("color", "white");
    fulfill();
  });
}
////////////////////////////
