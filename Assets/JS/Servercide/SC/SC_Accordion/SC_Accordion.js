//SC_Accordion
////////////////////////////
loadCSS("Assets/JS/Servercide/SC/SC_Accordion/SC_Accordion.css");

var SC_Accordion = function(element) {
  var defaultParams = {};
  var app = this;
  var promise = ServercideApp.call(this, app, element, "SC_Accordion", defaultParams).then(function(){ app.postStrap(app); });
  return promise;
}
SC_Accordion.prototype = Object.create(ServercideApp.prototype);

SC_Accordion.prototype.onStrap = function(app){
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", [2, 3, 6, 7]);
  return new Promise(function(fulfill, reject){
    fulfill();
  });
}

SC_Accordion.prototype.postStrap = function(app){
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", [2, 3, 6, 7]);
  return new Promise(function(fulfill, reject){
    fulfill();
  });
}

SC_Accordion.prototype.discoveryComplete = function(app){
  app.debugMsg("Recursive Servercide discovery complete, running discoveryComplete function of " + app.element.attr("id") + " app " + app.getMetaParam("type") + ".", [2, 3, 6, 7]);
  return new Promise(function(fulfill, reject){
    app.element.accordion({
      collapsible: true,
      active: false,
      activate: function(event, ui) { SC_triggerResize(); },
      header: "span.accord-header" + app.element.attr("id"),
      heightStyle: "content"
    });
    app.element.find("span.accord-header" + app.element.attr("id")).css("height", "unset");
    app.element.find("span.accord-node").css("height", "unset");

    fulfill();
  });
}
////////////////////////////
