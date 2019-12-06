//SC_Modal
////////////////////////////
var SC_Modal = function (element) {
  var defaultParams = {
    "wrap": '<span id="SC_modalWrap"></span>',
    "node": "Modal sample text",
    "pos": "center"
  };
  var promise = ServercideApp.call(
    this, element, "SC_Modal", defaultParams,
    SC_Modal.prototype.onStrap
  );
  return promise;
}
SC_Modal.prototype = Object.create(ServercideApp.prototype);

SC_Modal.prototype.onStrap = function (app) {
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
  return new Promise(function (fulfill, reject) {
    loadInlineAppCSS("SC_Modal_wrap", "#SC_modalWrap",
      {
        "display": "none", "position": "absolute", "background-color": "rgba(100,100,100,0.5)",
        "top": "0px", "left": "0px", "bottom": "0px", "right": "0px", "width": "100%", "height": "100%", "z-index": "3"
      }
    );
    loadInlineAppCSS("SC_Modal_box", ".SC_modalNode",
      { "display": "block", "width": "50%", "height": "50%", "position": "relative", "background-color": "white", "z-index": "5" }
    );
    app.wrap = $(app.getParam("wrap")).prependTo($("html"));

    app.element.on("click", function (event) {
      event.stopPropagation();
      app.wrap.css("display", "flex").on("click", function () {
        $(this).remove();
      });
      var content = app.getParam("node");
      var modalNode;
      if (isValidSelector(content) != false && $(content).length > 0) {
        modalNode = $('<span class="SC_modalNode"></span>').append($(content).clone().attr("id", "modal_tempID").css("display", "inline-flex"));
      } else {
        modalNode = $('<span id="modal_tempID" class="SC_modalNode">' + content + '</span>');
      }

      app.wrap.append(modalNode);
      if (modalNode.css("background-color") == "rgba(0, 0, 0, 0)") {
        modalNode.css("background-color", "white");
      }
      modalNode.on("click", function (event) {
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
      SC_discover("#modal_tempID");
    });
    fulfill();
  });
}
////////////////////////////
