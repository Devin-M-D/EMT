//SC_StickyFoot
////////////////////////////
var SC_StickyFoot = function(element) {
  var defaultParams = {
    "scrollRoot": "html"
  };
  var app = this;
  var promise = ServercideApp.call(this, app, element, "SC_StickyFoot", defaultParams).then(function(){ app.postStrap(app); });
  return promise;
}
SC_StickyFoot.prototype = Object.create(ServercideApp.prototype);

SC_StickyFoot.prototype.onStrap = function(app){
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", [2, 3, 6, 7]);
  return new Promise(function(fulfill, reject){
    fulfill();
  });
}

SC_StickyFoot.prototype.postStrap = function(app){
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", [2, 3, 6, 7]);
  return new Promise(function(fulfill, reject){
    $(app.getParam("scrollRoot")).on("scroll", function() {
      app.positionFrame();
    });
    app.positionFrame();
    fulfill();
  });
}

SC_StickyFoot.prototype.discoveryComplete = function(app){
  app.debugMsg("Recursive Servercide discovery complete, running discoveryComplete function of " + app.element.attr("id") + " app " + app.getMetaParam("type") + ".", [2, 3, 6, 7]);
  return new Promise(function(fulfill, reject){
    fulfill();
  });
}

SC_StickyFoot.prototype.positionFrame = function(app) {
  var footer = app.element;
  var scrollRoot = $(app.getParam("scrollRoot"));

  if (footer.data("pinned") != true) {
    var scrollBottom = scrollRoot.scrollTop() + parseInt(scrollRoot.outerHeight());
    var footerZone = scrollRoot[0].scrollHeight - (2 * footer.css("height").replace("px", ""));

    if (scrollBottom > footerZone) {
      footer.css("height", (1 * (scrollBottom - footerZone)) + "px");
      scrollRoot.css("margin-bottom", footer.css("height"));
    } else {
      footer.css("height", "20px");
    }
  }
}
////////////////////////////
