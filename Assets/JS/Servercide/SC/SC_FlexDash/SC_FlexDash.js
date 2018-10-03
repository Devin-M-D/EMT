//SC_FlexDash
////////////////////////////
loadCSS("Assets/JS/Servercide/SC/SC_FlexDash/SC_FlexDash.css");
var SC_FlexDash = function(element) {
  var defaultParams = {
    "dashboard": {
      "4{{panels}}": {
        "1{{0{{panelTemplate}}}}": `\
          <span class="dirCats">{{pnlName}}</span>\
          <span id="{{pnlID}}" sc_appobj="true" sc_apptype="SC_FlexGrid" class="flexControlCat">\
            <SC_FlexGrid_nodes htmlParam="true">\
                {{nodes}}\
            </SC_FlexGrid_nodes>\
          </span>`,
        "<0[[pnlName]]": ["Orient Main Axis", "Order Main Axis", "Justify Cardinal Axis", "Justify Orthogonal Axis", "Align Items"],
        "^1[[pnlID]]": ["flexOrientation", "flexOrder", "flexJusitfy_card", "flexJusitfy_orth", "flexAlignItems"],
      },
      "^4[[nodes]]": {
        "3{{nodeTemplate}}": `<span class="flexControl gridItems" onclick="$('#flexDemoGrid').attr('{{pnlBtns:0}}', '{{pnlBtns:1}}'); console.log($('#flexDemoGrid')); SC_discover($('#flexDemoGrid'));">{{pnlBtns:1}}</span>`,
        "^3[[2{{pnlBtns}}]]": [
          [["{{pnlAttr:0}}", "Rows"], ["{{pnlAttr:0}}", "Cols"]],
          [["{{pnlAttr:1}}", "Forward"], ["{{pnlAttr:1}}", "Reverse"]],
          [["{{pnlAttr:2}}", "start"], ["{{pnlAttr:2}}", "center"], ["{{pnlAttr:2}}", "end"], ["{{pnlAttr:2}}", "around"], ["{{pnlAttr:2}}", "between"]],
          [["{{pnlAttr:3}}", "start"], ["{{pnlAttr:3}}", "center"], ["{{pnlAttr:3}}", "end"], ["{{pnlAttr:3}}", "around"], ["{{pnlAttr:3}}", "between"]],
          [["{{pnlAttr:4}}", "start"], ["{{pnlAttr:4}}", "center"], ["{{pnlAttr:4}}", "end"]]
        ],
        "<2[[pnlAttr]]": ["sc_flexgrid_settings_orientation", "sc_flexgrid_settings_placementOrder", "sc_flexgrid_settings_cardAxisJustify",
          "sc_flexgrid_settings_orthAxisJustify", "sc_flexgrid_settings_midlineAxisJustify"]
      }
    }
  };
  var app = this;
  var promise = ServercideApp.call(this, app, element, "SC_FlexDash", defaultParams).then(function(){ app.postStrap(app); });
  return promise;
}
SC_FlexDash.prototype = Object.create(ServercideApp.prototype);

SC_FlexDash.prototype.onStrap = function(app){
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", [2, 3, 6, 7]);
  return new Promise(function(fulfill, reject){
    app.element.append($('<span style="text-align:center;">FlexGrid Control Panel</span>'));
    let controlPanel = $('<span id="flexDash" sc_appobj="true" sc_apptype="SC_FlexGrid"></span>').appendTo(app.element);

    var content = app.getParam("dashboard");
    btnPanel = $('<SC_FlexGrid_nodes htmlParam="true"></SC_FlexGrid_nodes>').appendTo(controlPanel);
    for (var y = 0; y < content.length; y++){
      btnPanel.append(content[y]);
    }
    app.element.css("margin", "10px")
    fulfill();
  });
}

SC_FlexDash.prototype.postStrap = function(app){
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", [2, 3, 6, 7]);
  return new Promise(function(fulfill, reject){
    fulfill();
  });
}

SC_FlexDash.prototype.discoveryComplete = function(app){
  app.debugMsg("Recursive Servercide discovery complete, running discoveryComplete function of " + app.element.attr("id") + " app " + app.getMetaParam("type") + ".", [2, 3, 6, 7]);
  return new Promise(function(fulfill, reject){
    fulfill();
  });
}
////////////////////////////
