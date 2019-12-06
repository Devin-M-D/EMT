//SC_Include
////////////////////////////
var SC_Include = function (element) {
  var defaultParams = {
    "src": ""
  };
  var promise = ServercideApp.call(this, element, "SC_Include", defaultParams, SC_Include.prototype.onStrap);
  return promise;
}
SC_Include.prototype = Object.create(ServercideApp.prototype);

SC_Include.prototype.onStrap = function (app) {
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
  return new Promise(function (fulfill, reject) {
    if (app.getParam("src") != "") {
      app.element.load(app.getParam("src"), function () { fulfill(); });
    } else {
      fulfill();
    }
  });
}
////////////////////////////
