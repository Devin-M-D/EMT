//SC_GraphDB
////////////////////////////
var SC_GraphDB = function (root) {
  var defaultParams = {
    "db": {
      "schema": loadScript("Assets/JS/Servercide/SC/SC_GraphDB/SC_GraphDB_schema.json"),
      "data": loadScript("Assets/JS/Servercide/SC/SC_GraphDB/SC_GraphDB_demoData.json")
    };
  };
  var promise = ServercideApp.call(this, root, "SC_GraphDB", defaultParams, app).then(function () { app.postStrap(app); });
  return promise;
}
SC_GraphDB.prototype = Object.create(ServercideApp.prototype);

SC_GraphDB.prototype.onStrap = function (app) {
  return new Promise(function (fulfill, reject) {
    app.debugMsg($(app.root).attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.");
    fulfill();
  });
}

SC_GraphDB.prototype.postStrap = function (app) {
  return new Promise(function (fulfill, reject) {
    app.debugMsg($(app.root).attr("id") + " is loaded, postStrap runs out of synchronous flow.");
    fulfill();
  });
}
////////////////////////////
