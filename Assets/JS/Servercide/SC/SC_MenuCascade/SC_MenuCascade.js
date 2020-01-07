//SC_MenuCascade
////////////////////////////
loadCSS("Assets/JS/Servercide/SC/SC_MenuCascade/mainnav.css");

class SC_MenuCascade {
  constructor(element) {
    var defaultParams = {
      "src": "",
      "cascadeData":
        [
          {
            "class": "MenuItem",
            "gdb_id": "0:0",
            "title": "Home",
            "href": "/?/page:Home"
          },
        ],
      "orientation": "horizontal"
    };
    var promise = new ServercideApp(this, element, "SC_MenuCascade", defaultParams);
    return promise;
  }

  onStrap = function (app) {
    app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
    return new Promise(function (fulfill, reject) {
      app.element.addClass("nav");
      RemoteCall(app.getParam("src"), null, app.getMetaParam("debug")).then(function (res) {
        app.setParam("cascadeData", res.cascadeData);
        if (res.cascadeData.length > 0) {
          var menuRoot = jQuery.map(res.cascadeData, function (g) {
            if (g.title == app.element.attr("id")) { return g; }
          })[0];
          app.element.html(app.renderMenu(app, res.cascadeData, menuRoot, 0));

          if (app.getParam("orientation") == "horizontal") {
            app.element.find(".navroot").addClass("horiz_nav");
          }
          else if (app.getParam("orientation") == "vertical") {
            app.element.find(".navroot").addClass("vert_nav");
            app.element.find(".dripout").removeClass("dripout").addClass("flyout");
            app.element.find(".navroot").css("flex-direction", "column")
          }

          app.element.find(".dripout").addClass("vert_nav");
          app.element.find(".flyout").addClass("vert_nav");
          $(".navroot li").each(function () {
            app.element.on("click", function (event) {
              event.stopPropagation();
              var URL = window.location.href;
              if (URL.indexOf("/?/") != -1) {
                var env = URL.substring(0, URL.indexOf("/?/"));
                window.location.href = env + $(event.target).attr("location");
              } else {
                window.location.href = $(event.target).attr("location");
              }
              $(event.target).attr("onmousedown", "event.stopPropagation(); $(this).addClass('activeMenuItem');");
              $(event.target).attr("onmousemove", "event.stopPropagation(); $(this).removeClass('activeMenuItem');");
            });
          });
        }
        fulfill();
      });
    });
  }

  renderMenu = function (app, cascadeData, item, depth) {
    var html = "";
    var level_style = ""
    if (depth == 0) { level_style = "navroot" }
    if (depth == 1) { level_style = "dripout" }
    if (depth > 1) { level_style = "flyout" }
    var isRootIteration = (item.title == app.element.attr("id"));


    if (!isRootIteration) {
      html += '<li location="' + item["href"] + '">' + item["title"];
    }
    //recurse for children (expects SC_GDB json [jk, not yet, just regular json approximating graphs for now])
    var childEdges = jQuery.map(cascadeData, function (g) {
      if (g.class == "MenuCascade" && g.inID == item.gdb_id) { return g; }
    });
    if (childEdges.length > 0) {
      var childMenuItems = jQuery.map(cascadeData, function (g) {
        if (g.class == "MenuItem") {
          var matchedChildEdges = jQuery.map(childEdges, function (e) {
            if (e.outID == g.gdb_id) { return e; }
          });
          if (matchedChildEdges.length > 0) { return g; }
        }
      });
      if (childMenuItems.length > 0) {
        html += '<ul class="' + level_style + '">';
        for (var x = 0; x < childMenuItems.length; x++) {
          html += app.renderMenu(app, cascadeData, childMenuItems[x], depth + 1);
        }
        html += '</ul>';
      }
    }

    if (!isRootIteration) { html += '</li>'; }
    return html;
  }
}
////////////////////////////
