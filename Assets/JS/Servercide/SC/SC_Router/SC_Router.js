//SC_Router
////////
var SC_Router = function(element) {
  var defaultParams = {};
  var URLParams = window.location.search.substring(window.location.search.indexOf("/?/") + 3).split("/");
  URLParams.forEach(function(URLParam, idx){
    URLParam = decodeURIComponent(URLParam);
    defaultParams["g:" + URLParam.split(":")[0]] = URLParam.split(":")[1];
  });
  var app = this;
  var promise = ServercideApp.call(this, app, element, "SC_Router", defaultParams).then(function(){ app.postStrap(app); });
  return promise;
}
SC_Router.prototype = Object.create(ServercideApp.prototype);

SC_Router.prototype.onStrap = function(app){
  return new Promise(function(fulfill, reject){
    fulfill();
  });
}

SC_Router.prototype.postStrap = function(app){
  return new Promise(function(fulfill, reject){
    fulfill();
  });
}

SC_Router.prototype.discoveryComplete = function(app){
  return new Promise(function(fulfill, reject){
    fulfill();
  });
}
////////
