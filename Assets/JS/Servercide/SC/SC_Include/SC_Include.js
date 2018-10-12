//SC_Include
////////////////////////////
var SC_Include = function(element) {
  var defaultParams = {
    "src": ""
  };
  var app = this;
  var promise = ServercideApp.call(this, app, element, "SC_Include", defaultParams).then(function(){ app.postStrap(app); });
  return promise;
}
SC_Include.prototype = Object.create(ServercideApp.prototype);

SC_Include.prototype.onStrap = function(app){
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
  return new Promise(function(fulfill, reject){
    if (app.getParam("src") != "") {
      app.element.load(app.getParam("src"), function() { fulfill(); });
    } else {
      fulfill();
    }
  });
}

SC_Include.prototype.postStrap = function(app){
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
  return new Promise(function(fulfill, reject){
    fulfill();
  });
}

SC_Include.prototype.discoveryComplete = function(app){
  app.debugMsg("Recursive Servercide discovery complete, running discoveryComplete function of " + app.element.attr("id") + " app " + app.getMetaParam("type") + ".", 2);
  return new Promise(function(fulfill, reject){
    fulfill();
  });
}
////////////////////////////
