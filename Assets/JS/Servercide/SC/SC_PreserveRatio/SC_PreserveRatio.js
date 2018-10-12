//SC_PreserveRatio
////////////////////////////
var SC_PreserveRatio = function(element) {
  var defaultParams = {
    "axis": "h",
    "ratio": 1
  };
  var app = this;
  var promise = ServercideApp.call(this, app, element, "SC_PreserveRatio", defaultParams).then(function(){ app.postStrap(app); });
  return promise;
}
SC_PreserveRatio.prototype = Object.create(ServercideApp.prototype);

SC_PreserveRatio.prototype.onStrap = function(app){
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
  return new Promise(function(fulfill, reject){
    SC_addResizeFunc(function() { app.sizeProportions(app); });
    fulfill();
  });
}

SC_PreserveRatio.prototype.postStrap = function(app){
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
  return new Promise(function(fulfill, reject){
    fulfill();
  });
}

SC_PreserveRatio.prototype.discoveryComplete = function(app){
  app.debugMsg("Recursive Servercide discovery complete, running discoveryComplete function of " + app.element.attr("id") + " app " + app.getMetaParam("type") + ".", 2);
  return new Promise(function(fulfill, reject){
    fulfill();
  });
}

SC_PreserveRatio.prototype.sizeProportions = function(app){
  var block = app.element;
  var axis = app.getParam("axis");
  var ratio = app.getParam("ratio");
  if (axis == "h"){ $(block).css("height", (parseInt(block.css("width").replace("px", "")) * ratio).toString() + "px"); }
  else if (axis == "w"){ block.css("width", (parseInt(block.css("height").replace("px", "")) * ratio).toString() + "px"); }
}

////////////////////////////
