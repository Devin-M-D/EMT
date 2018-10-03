//SC_DrawerPane
////////////////////////////
var SC_DrawerPane = function(element) {
  var defaultParams = {
    "fromEdge": "left",
    "open": "false",
    "tabs": [
      {
        "name": "Tab 1",
        "src": "",
        "content": "foo"
      },
      {
        "name": "Tab 2",
        "src": "",
        "content": "bar"
      }
    ]
  };
  var app = this;
  var promise = ServercideApp.call(this, app, element, "SC_DrawerPane", defaultParams).then(function(){ app.postStrap(app); });
  return promise;
}
SC_DrawerPane.prototype = Object.create(ServercideApp.prototype);

SC_DrawerPane.prototype.onStrap = function(app){
  return new Promise(function(fulfill, reject){
    app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", [2, 3, 6, 7]);

    loadInlineAppCSS("SC_DrawerPane", ".SC_DrawerPane", {"color":"#f00", "font-weight":"bold"});
    loadInlineAppCSS("SC_DrawerPane2", ".SC_DrawerPane_left", {
      "display":"block", "position":"fixed", "width":"250px", "height": "100%", "top": "0px", "left": "-275px",
      "background-color": "#fff", "border": "solid 2px #ab9481", "padding":"10px", "z-index":"4"
    });
    loadInlineAppCSS("SC_DrawerPane3", ".SC_DrawerPane_left > .drawerMenu_tab", {
      "display":"inline-block", "position":"relative", "width":"32%", "height": "30px", "top": "0px", "left": "0px"
    });
    loadInlineAppCSS("SC_DrawerPane4", ".SC_DrawerPane_handle_left", {
      "display":"block", "position":"absolute", "width":"35px", "height": "35px", "top": "0px", "left": "100%",
      "background": "url('/Assets/IMG/menu_icon.png') 5px 5px/25px no-repeat;"
    });

    app.element.addClass("SC_DrawerPane_" + app.getParam("fromEdge")).on("click", function(event) {
      event.stopPropagation();
    });

    app.element.html('<span class="SC_DrawerPane_handle_' + app.getParam("fromEdge") + '"></span>\
                  <span class="drawerMenu_tab" tabContent="side_nav"><span class="absCenter">Side Nav</span></span>\
                  <span class="drawerMenu_tab" tabContent="skins"><span class="absCenter">Skins</span></span>\
                  <span class="drawerMenu_tab" tabContent="VCS"><span class="absCenter">VCS</span></span>\
                  <span id="drawerMenu_content" style="position:absolute;display:block;top:35px;bottom:2%;width:calc(100% - 20px);overflow:auto;outline:solid thin #ab9481;"></span>'
                );
    app.enableClick(app);
    app.element.find(".drawerMenu_tab").each(function() {
      $(this).on("click", function() {
        app.changeContent(app, $(this).attr("tabContent"));
      })
    });
    fulfill();
  });
}

SC_DrawerPane.prototype.postStrap = function(app){
  return new Promise(function(fulfill, reject){
    app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", [2, 3, 6, 7]);
    fulfill();
  });
}

SC_DrawerPane.prototype.discoveryComplete = function(app){
  return new Promise(function(fulfill, reject){
    fulfill();
  });
}

SC_DrawerPane.prototype.enableClick = function(app) {
  app.element.find(".SC_DrawerPane_handle_" + app.getParam("fromEdge")).on("click", function() {
      app.toggleDrawer(app);
  });
}

SC_DrawerPane.prototype.toggleDrawer = function(app) {
  app.element.find(".SC_DrawerPane_handle_" + app.getParam("fromEdge")).off("click");
  if (app.getParam("open") == "false") {
    app.element.animate({ left: "0px" }, 1000, function() {
      app.setParam("open", "true");
      app.enableClick(app);
    });
  } else {
    app.element.animate({ left: "-275px" }, 1000, function() {
      app.setParam("open", "false");
      app.enableClick(app);
    });
  }
}

SC_DrawerPane.prototype.changeContent = function(app, tabName) {
  if (tabName == "side_nav") {
    $("#drawerMenu_content").html(`<span id="main_nav" SC_appObj="true" SC_appType="SC_MenuCascade" SC_MenuCascade_src="Assets/JS/Servercide/SC/SC_Demo/SC_Demo_Menus.json" SC_MenuCascade_orientation="vertical"></span>`);
    $("#drawerMenu_content").css("overflow", "visible");
    SC_discover($("#drawerMenu_content"));
  } else if (tabName == "skins") {
    $("#drawerMenu_content").html("");
    $("#spnSkinner").children().each(function() {
      $(this).clone(true).appendTo($("#drawerMenu_content"));
    });
  } else if (tabName == "VCS") {
    $("#drawerMenu_content").load("Assets/JS/Servercide/SC_VCS/SC_VCS.html/");
  }
}
//////////////////
