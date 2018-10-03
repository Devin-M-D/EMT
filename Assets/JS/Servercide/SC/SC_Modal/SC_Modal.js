//SC_Modal
////////////////////////////
var SC_Modal = function(element) {
  var defaultParams = {
    "wrap": '<span id="SC_modalWrap"></span>',
    "node": "Modal sample text",
    "pos": "center"
  };
  var app = this;
  var promise = ServercideApp.call(this, app, element, "SC_Modal", defaultParams).then(function(){ app.postStrap(app); });
  return promise;
}
SC_Modal.prototype = Object.create(ServercideApp.prototype);

SC_Modal.prototype.onStrap = function(app){
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", [2, 3, 6, 7]);
  return new Promise(function(fulfill, reject){
    app.wrap = $(app.getParam("wrap")).prependTo($("html"));

    app.element.on("click", function(event) {
      event.stopPropagation();
      app.wrap.css("display", "flex").on("click", function() {
        $(this).remove();
      });
      var content = app.getParam("node");
      if (isValidSelector(content) != false && $(content).length > 0) {
        var modalNode = $('<span class="SC_modalNode"></span>').append($(content).clone().attr("id", "modal_tempID"));
      } else {
        var modalNode = $('<span id="modal_tempID" class="SC_modalNode">' + content + '</span>');
      }

      app.wrap.append(modalNode);
      if (modalNode.css("background-color") == "rgba(0, 0, 0, 0)") {
        modalNode.css("background-color", "white");
      }
      modalNode.on("click", function(event) {
        event.stopPropagation();
      });

      if (app.getParam("pos") == "center") {
        app.wrap.css({
          "justify-content": "center",
          "align-items": "center"
        });
      } else if (app.getParam("pos") == "in-place") {
        modalNode.offset($(root).offset()).css({
          height: $(root).css("height"),
          width: $(root).css("width")
        });
      }
      SC_discover(modalNode);
    });
    fulfill();
  });
}

SC_Modal.prototype.postStrap = function(app){
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", [2, 3, 6, 7]);
  return new Promise(function(fulfill, reject){
    fulfill();
  });
}

SC_Modal.prototype.discoveryComplete = function(app){
  app.debugMsg("Recursive Servercide discovery complete, running discoveryComplete function of " + app.element.attr("id") + " app " + app.getMetaParam("type") + ".", [2, 3, 6, 7]);
  return new Promise(function(fulfill, reject){
    fulfill();
  });
}
////////////////////////////
