//DF_SimpleDungeon_Player
////////////////////////////
var DF_SimpleDungeon_Player = function (element) {
  var defaultParams = {
  };
  var promise = ServercideApp.call(
    this, element, "DF_SimpleDungeon_Player", defaultParams,
    DF_SimpleDungeon_Player.prototype.onStrap
  );
  return promise;
}
DF_SimpleDungeon_Player.prototype = Object.create(ServercideApp.prototype);

DF_SimpleDungeon_Player.prototype.onStrap = function (app) {
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
  return new Promise(function (fulfill, reject) {
    app.getParentElement().css("background-color", "darkgreen");
    fulfill();
  });
}
////////////////////////////
