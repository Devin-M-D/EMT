//SC_StickyHead
////////////////////////////
var SC_StickyHead = function(element) {
  var defaultParams = {
    "scrollRoot": "html",
    "height": "20%",
  };
  var app = this;
  var promise = ServercideApp.call(this, app, element, "SC_StickyHead", defaultParams).then(function(){ app.postStrap(app); });
  return promise;
}
SC_StickyHead.prototype = Object.create(ServercideApp.prototype);

SC_StickyHead.prototype.onStrap = function(app){
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", [2, 3, 6, 7]);
  return new Promise(function(fulfill, reject){
    loadInlineAppCSS("SC_StickyHead", ".SC_StickyHead", {
        "position": "fixed", "top": "0px", "width": "100%", "z-index": "1",
        "display": "flex", "justify-content": "space-around", "flex-flow": "row wrap",
        "height": app.getParam("height"), "max-height": app.getParam("height"), "min-height": app.getParam("height")
    });
    app.element.addClass("SC_StickyHead");
    $(app.getParam("scrollRoot")).on("scroll", function() {
      app.positionFrame();
    });

    app.positionFrame(app);
    fulfill();
  });
}

SC_StickyHead.prototype.postStrap = function(app){
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", [2, 3, 6, 7]);
  return new Promise(function(fulfill, reject){
    fulfill();
  });
}

SC_StickyHead.prototype.discoveryComplete = function(app){
  app.debugMsg("Recursive Servercide discovery complete, running discoveryComplete function of " + app.element.attr("id") + " app " + app.getMetaParam("type") + ".", [2, 3, 6, 7]);
  return new Promise(function(fulfill, reject){
    fulfill();
  });
}

SC_StickyHead.prototype.positionFrame = function(app) {
  var header = app.element;
  var scrollRoot = $(app.getParam("scrollRoot"));

  if (scrollRoot.scrollTop() > header.outerHeight(true) + 'px') {
    header.css({
      "box-shadow": "5px 5px 35px 5px gray"
    });
  } else {
    header.css("box-shadow", "");
  }
  scrollRoot.css("margin-top", header.outerHeight(true) + "px");
}
////////////////////////////
