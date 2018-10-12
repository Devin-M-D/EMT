//SC_Accordion
////////////////////////////
loadCSS("Assets/JS/Servercide/SC/SC_Accordion/SC_Accordion.css");

var SC_Accordion = function(element) {
  var defaultParams = {
    "content": element.html()
  };
  var app = this;
  var promise = ServercideApp.call(this, app, element, "SC_Accordion", defaultParams).then(function(){ app.postStrap(app); });
  return promise;
}
SC_Accordion.prototype = Object.create(ServercideApp.prototype);

SC_Accordion.prototype.onStrap = function(app){
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
  return new Promise(function(fulfill, reject){
    app.element.html(app.getParam("content"));
    fulfill();
  });
}

SC_Accordion.prototype.postStrap = function(app){
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
  return new Promise(function(fulfill, reject){
    fulfill();
  });
}

SC_Accordion.prototype.discoveryComplete = function(app){
  app.debugMsg("Recursive Servercide discovery complete, running discoveryComplete function of " + app.element.attr("id") + " app " + app.getMetaParam("type") + ".", 2);
  return new Promise(function(fulfill, reject){
    app.element.accordion({
      collapsible: true,
      active: false,
      activate: function(event, ui) { SC_triggerResize(); },
      header: "> span.accord-header",
      heightStyle: "content"
    });
    app.element.find("span.accord-header").css("height", "unset");
    app.element.find("span.accord-node").css("height", "unset");

    fulfill();
  });
}
////////////////////////////
