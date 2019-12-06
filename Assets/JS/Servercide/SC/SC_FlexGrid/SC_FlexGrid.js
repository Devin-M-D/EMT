//SC_FlexGrid
////////////////////////////
loadCSS("Assets/JS/Servercide/SC/SC_FlexGrid/SC_FlexGrid.css");
var SC_FlexGrid = function (element) {
  var defaultParams = {
    "settings": {
      "orientation": "rows", //rows or cols
      "placementOrder": "forward", //forward or reverse
      "cardAxisJustify": "center", //start, center, end, around, between
      "orthAxisJustify": "center", //start, center, end, around, between
      "midlineAxisJustify": "center", //start, center, end
      "rowMax": "5",
      "colMax": "5",
      "minNodeWidth": "100px",
      "minNodeHeight": "100px",
      "responsive": true,
      "shoreSpacing": false
    },
    "nodes": {
      "2{{template}}": "<span style='height:{{contentObjects:2}}px;width:{{contentObjects:3}}px;background:{{contentObjects:1}};'>{{contentObjects:0}}</span>",
      "^2[[1{{0{{contentObjects}}}}]]": [
        ["foo", "{{nodeBgs:0}}", "100", "100"], ["bar", "{{nodeBgs:1}}", "100", "100"], ["baz", "{{nodeBgs:0}}", "100", "100"],
        ["lorem", "{{nodeBgs:1}}", "100", "100"], ["ipsum", "{{nodeBgs:0}}", "100", "100"], ["dolor", "{{nodeBgs:1}}", "100", "100"],
        ["cat", "{{nodeBgs:0}}", "{{nodeSizes:0}}", "{{nodeSizes:0}}"], ["dog", "{{nodeBgs:1}}", "{{nodeSizes:1}}", "{{nodeSizes:1}}"], ["monkey", "{{nodeBgs:0}}", "{{nodeSizes:2}}", "{{nodeSizes:2}}"],
        ["cake", "{{nodeBgs:1}}", "{{nodeSizes:1}}", "{{nodeSizes:1}}"], ["chips", "{{nodeBgs:0}}", "{{nodeSizes:2}}", "{{nodeSizes:2}}"]
      ],
      "<0[[nodeBgs]]": ["lightblue", "bisque"],
      "<1[[nodeSizes]]": ["200", "150", "125"],
    }
  };
  var promise = ServercideApp.call(
    this, element, "SC_FlexGrid", defaultParams,
    SC_FlexGrid.prototype.onStrap
  );
  return promise;
}
SC_FlexGrid.prototype = Object.create(ServercideApp.prototype);

SC_FlexGrid.prototype.onStrap = function (app) {
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
  return new Promise(function (fulfill, reject) {
    app.stylize(app);
    app.renderNodes(app);
    app.debugMsg(app.element);
    if (app.getParam("shoreSpacing") == true) { app.element.append('<span style="height:0px;visibility:hidden;"></span>') }
    if (app.getParam("responsive") == true) { SC_addResizeFunc(function () { app.responsiveAdjust(app); }); }
    fulfill();
  });
}

SC_FlexGrid.prototype.stylize = function (app) {
  var orientation = app.getParam(["settings", "orientation"]).toLowerCase();
  var order = app.getParam(["settings", "placementOrder"]).toLowerCase();
  var cardAxis = "cardAxis_" + app.getParam(["settings", "cardAxisJustify"]).toLowerCase();
  var orthAxis = "orthAxis_" + app.getParam(["settings", "orthAxisJustify"]).toLowerCase();
  var midAxis = "midlineAxis_" + app.getParam(["settings", "midlineAxisJustify"]).toLowerCase();
  app.element.removeClass("rows cols forward reverse" +
    " cardAxis_start cardAxis_center cardAxis_end cardAxis_around cardAxis_between" +
    " orthAxis_start orthAxis_center orthAxis_end orthAxis_around orthAxis_between" +
    " midlineAxis_start midlineAxis_center midlineAxis_end");
  app.element.addClass("SC_grid " + orientation + " " + order + " " + cardAxis + " " + orthAxis + " " + midAxis);
}

SC_FlexGrid.prototype.renderNodes = function (app) {
  app.element.empty();
  var content = app.getParam(["nodes"]) || [];
  app.element.append(content);
}

SC_FlexGrid.prototype.responsiveAdjust = function (app) {
  var rowMax = app.getParam("rowMax");
  var colMax = app.getParam("colMax");

  if (app.element.children().length > 0) {
    $(this).removeClass(function (index, className) {
      return (className.match(/(Rows|Cols)Of\d/g) || []).join(' ');
    });

    var rowSize = Math.floor(parseFloat(app.element.css("width").replace("px", "")) / parseFloat(app.getParam("minNodeWidth").toString().replace("px", "")));
    if (rowSize >= rowMax) { app.element.addClass("RowsOf" + rowMax); }
    else { app.element.addClass("RowsOf" + rowSize); }

    var colSize = Math.floor(parseFloat(app.element.css("height").replace("px", "")) / parseFloat(app.getParam("minNodeHeight").toString().replace("px", "")));
    if (colSize >= colMax) { app.element.addClass("ColsOf" + colMax); }
    else { app.element.addClass("ColsOf" + colSize); }
  }
}

SC_FlexGrid.prototype.getLastInRow = function (app, grid_item) {
  var currTop = $(grid_item).offset().top;
  var curr = null;
  $(grid_item).nextAll().each(function () {
    if ($(this).offset().top != currTop) {
      return false;
    } else {
      curr = $(this);
    }
  });
  return curr;
}
////////////////
