//SC_Accordion
////////////////////////////
loadCSS("Assets/JS/Servercide/SC/SC_Accordion/SC_Accordion.css");

var SC_Accordion = function (element) {
  var defaultParams = {
    "content": element.html()
  };
  var promise = ServercideApp.call(this, element, "SC_Accordion", defaultParams, SC_Accordion.prototype.onStrap, SC_Accordion.prototype.postStrap, SC_Accordion.prototype.discoveryComplete);
  return promise;
}
SC_Accordion.prototype = Object.create(ServercideApp.prototype);

SC_Accordion.prototype.discoveryComplete = function (app) {
  app.debugMsg("Recursive Servercide discovery complete, running discoveryComplete function of " + app.element.attr("id") + " app " + app.getMetaParam("type") + ".", 2);
  return new Promise(function (fulfill, reject) {
    // app.element.find('span.accord-header').click(function() {
    //     $(this).next().toggle('slow');
    //     return false;
    // }).next().hide();
    app.element.css("height", "unset");
    app.element.find("span.accord-header").css("height", "40px");
    app.element.find("span.accord-node").css("height", "unset");
    app.element.accordion({
      collapsible: true,
      active: false,
      activate: function (event, ui) { SC_triggerResize(); },
      header: "> span.accord-header",
      heightStyle: "content"
    });

    fulfill();
  });
}
////////////////////////////
