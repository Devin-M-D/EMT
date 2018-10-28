//SC_StickyFrame
////////////////////////////
var SC_StickyFrame = function(element) {
  var defaultParams = {
    "frameType": "header",
    "scrollRoot": "html",
    "height": "10%"
  };
  var app = this;
  var promise = ServercideApp.call(this, app, element, "SC_StickyFrame", defaultParams).then(function(){ app.postStrap(app); });
  return promise;
}
SC_StickyFrame.prototype = Object.create(ServercideApp.prototype);

SC_StickyFrame.prototype.onStrap = function(app){
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
  return new Promise(function(fulfill, reject){
    if (app.getParam("frameType") == "header"){
      app.element.css({"position": "fixed", "top": "0px", "left": "0px", "width": "100%", "z-index": "1"});
    }
    else{
      app.element.css({"position": "fixed", "bottom": "0px", "left": "0px", "width": "100%", "z-index": "1"});
      app.element.css({"box-shadow": "5px 5px 35px 15px gray"});
    }

    if (app.getParam("frameType") == "header"){
      $(app.getParam("scrollRoot")).scroll(function() {
        var scrollRoot = $(app.getParam("scrollRoot"));
        if (scrollRoot.scrollTop() > 0) {
          app.element.css({"box-shadow": "5px 5px 35px 5px gray"});
        }
        else {
          app.element.css({"box-shadow": "none"});
        }
      });
    } else {
      $(app.getParam("scrollRoot")).scroll(function() {
        var scrollRoot = $(app.getParam("scrollRoot"));
        if(scrollRoot.scrollTop() + scrollRoot.outerHeight(true) >= scrollRoot[0].scrollHeight) {
          app.element.css({"box-shadow": "none"});
        }
        else {
          app.element.css({"box-shadow": "5px 5px 35px 15px gray"});
        }
      });
    }

    fulfill();
  });
}

SC_StickyFrame.prototype.postStrap = function(app){
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
  return new Promise(function(fulfill, reject){
    fulfill();
  });
}

SC_StickyFrame.prototype.discoveryComplete = function(app){
  app.debugMsg("Recursive Servercide discovery complete, running discoveryComplete function of " + app.element.attr("id") + " app " + app.getMetaParam("type") + ".", 2);
  return new Promise(function(fulfill, reject){
    if (app.getParam("frameType") == "header"){
      $(app.getParam("scrollRoot")).css("padding-top", app.element.css("height"));
    } else {
      $(app.getParam("scrollRoot")).css("padding-bottom", app.element.css("height"));
    }
    fulfill();
  });
}
////////////////////////////
