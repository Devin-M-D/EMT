//SC_LocalData app definition template
//V1.0
////////////////////////////
var SC_LocalData = function(element) {
  var defaultParams = {};
  var app = this;
  var promise = ServercideApp.call(this, app, element, "SC_LocalData", defaultParams).then(function(){ app.postStrap(app); });
  return promise;
}
SC_LocalData.prototype = Object.create(ServercideApp.prototype);

SC_LocalData.prototype.onStrap = function(app){
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
  return new Promise(function(fulfill, reject){
    app.element.append("<input type='file' />")
    fulfill();
  });
}

SC_LocalData.prototype.postStrap = function(app){
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
  return new Promise(function(fulfill, reject){
    fulfill();
  });
}

SC_LocalData.prototype.discoveryComplete = function(app){
  app.debugMsg("Recursive Servercide discovery complete, running discoveryComplete function of " + app.element.attr("id") + " app " + app.getMetaParam("type") + ".", 2);
  return new Promise(function(fulfill, reject){
    fulfill();
  });
}
////////////////////////////
