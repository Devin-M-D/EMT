//DF_SimpleDungeon_Player
////////////////////////////
var DF_SimpleDungeon_Player = function(element) {
  var defaultParams = {
  };
  var app = this;
  var promise = ServercideApp.call(this, app, element, "DF_SimpleDungeon_Player", defaultParams).then(function(){ app.postStrap(app); });
  return promise;
}
DF_SimpleDungeon_Player.prototype = Object.create(ServercideApp.prototype);

DF_SimpleDungeon_Player.prototype.onStrap = function(app){
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
  return new Promise(function(fulfill, reject){
    app.getParentElement().css("background-color", "darkgreen");
    fulfill();
  });
}

DF_SimpleDungeon_Player.prototype.postStrap = function(app){
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
  return new Promise(function(fulfill, reject){
    fulfill();
  });
}

DF_SimpleDungeon_Player.prototype.discoveryComplete = function(app){
  app.debugMsg("Recursive Servercide discovery complete, running discoveryComplete function of " + app.element.attr("id") + " app " + app.getMetaParam("type") + ".", 2);
  return new Promise(function(fulfill, reject){
    fulfill();
  });
}
////////////////////////////
