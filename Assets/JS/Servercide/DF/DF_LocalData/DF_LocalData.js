//SC_LocalData app definition template
//V1.0
////////////////////////////
var SC_LocalData = function (element) {
  var defaultParams = {};
  var promise = ServercideApp.call(
    this, element, "SC_LocalData", defaultParams,
    SC_LocalData.prototype.onStrap
  );
  return promise;
}
SC_LocalData.prototype = Object.create(ServercideApp.prototype);

SC_LocalData.prototype.onStrap = function (app) {
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
  return new Promise(function (fulfill, reject) {
    app.element.append("<input type='file' />")
    fulfill();
  });
}
////////////////////////////
