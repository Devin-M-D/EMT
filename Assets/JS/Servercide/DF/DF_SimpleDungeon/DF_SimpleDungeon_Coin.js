//DF_SimpleDungeon_Coin
////////////////////////////
var DF_SimpleDungeon_Coin = function(element) {
  var defaultParams = {};
  var app = this;
  var promise = ServercideApp.call(this, app, element, "DF_SimpleDungeon_Coin", defaultParams).then(function(){ app.postStrap(app); });
  return promise;
}
DF_SimpleDungeon_Coin.prototype = Object.create(ServercideApp.prototype);

DF_SimpleDungeon_Coin.prototype.onStrap = function(app){
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", [2, 3, 6, 7]);
  return new Promise(function(fulfill, reject){
    var parent = app.getParentElement()
    parent.css("background-color", "goldenrod");
    fulfill();
  });
}

DF_SimpleDungeon_Coin.prototype.postStrap = function(app){
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", [2, 3, 6, 7]);
  return new Promise(function(fulfill, reject){
    fulfill();
  });
}

DF_SimpleDungeon_Coin.prototype.discoveryComplete = function(app){
  app.debugMsg("Recursive Servercide discovery complete, running discoveryComplete function of " + app.element.attr("id") + " app " + app.getMetaParam("type") + ".", [2, 3, 6, 7]);
  return new Promise(function(fulfill, reject){
    fulfill();
  });
}
////////////////////////////
