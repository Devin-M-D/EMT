//SC_Include
////////////////////////////
class SC_Include {
  constructor(element) {
    var defaultParams = {
      "src": ""
    };
    var promise = new ServercideApp(this, element, "SC_Include", defaultParams);
    return promise;
  }

  onStrap = function (app) {
    app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
    return new Promise(function (fulfill, reject) {
      if (app.getParam("src") != "") {
        app.element.load(app.getParam("src"), function () { fulfill(); });
      } else {
        fulfill();
      }
    });
  }
}
////////////////////////////
