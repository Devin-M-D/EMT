//SC_VelcroTooltip
////////////////////////////
var SC_VelcroTooltip = function (element) {
  var defaultParams = {
    "content": "Default Tooltip Text",
  };
  var promise = ServercideApp.call(
    this, element, "SC_VelcroTooltip", defaultParams,
    SC_VelcroTooltip.prototype.onStrap
  );
  return promise;
}
SC_VelcroTooltip.prototype = Object.create(ServercideApp.prototype);

SC_VelcroTooltip.prototype.onStrap = function (app) {
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
  return new Promise(function (fulfill, reject) {
    if (isValidSelector(app.getParam("content")) != false && $(app.getParam("content")).length > 0) {
      app.tooltip = $('<span class="SC_VelcroTooltip"></span>').append($(app.getParam("content")));
    } else {
      app.tooltip = $('<span class="SC_VelcroTooltip">' + app.getParam("content") + '</span>');
    }
    app.enableTooltip(app);
    fulfill();
  });
}

SC_VelcroTooltip.prototype.enableTooltip = function (app) {
  app.element.one("click", function (event) {
    event.stopPropagation();
    app.popTooltip(app);
  });
}

SC_VelcroTooltip.prototype.popTooltip = function (app) {
  var block = app.element;
  $("html").prepend(
    $(app.tooltip.clone())
      .offset({
        "top": block.offset().top - 150,
        "left": block.offset().left
      })
      .css({
        "display": "block",
        "z-index": "10"
      })
      .draggable().css("position", "absolute")
      .on("click", function () { app.closeTooltip(app); })
  );
}

SC_VelcroTooltip.prototype.closeTooltip = function (app) {
  $("html").find(".SC_VelcroTooltip").remove();
  app.enableTooltip(app);
}
////////////////////////////
