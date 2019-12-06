//SC_UICascade
////////////////////////////
var SC_UICascade = function (element) {
  var defaultParams = {
    "src": [],
    "cascadeData":
      [
        {
          "class": "Block",
          "gdb_id": "10:0",
          "title": "spnRoot",
          "type": "container",
          "styles": {
            "display": "flex",
            "justify-content": "center",
            "align-content": "center"
          }
        }
      ]
  }
  var promise = ServercideApp.call(this, element, "SC_UICascade", defaultParams, SC_UICascade.prototype.onStrap);
  return promise;
}
SC_UICascade.prototype = Object.create(ServercideApp.prototype);

SC_UICascade.prototype.onStrap = function (app) {
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
  return new Promise(function (fulfill, reject) {
    function attemptFinish(total, cmp, cascadeData) {
      if (cmp == total) {
        app.setParam("cascadeData", cascadeData);
        if (cascadeData.length > 0) {
          var rootBlock = jQuery.map(cascadeData, function (g) {
            if (g.title == app.element.attr("id")) { return g; }
          })[0];
          app.element.html(app.renderBlock(app, cascadeData, rootBlock));
        }
        else { console.log("Sorry, no UI cascades were found.") }
        fulfill();
      }
    }
    var cascadeData = [];
    if (app.getParam("src") == []) {
      cascadeData = app.getParam("cascadeData")
      attemptFinish(1, 1, cascadeData);
    }
    else {
      var sources = [];
      if (SC_typeOf(app.getParam("src")) != "array") {
        sources = [app.getParam("src")];
      } else {
        sources = app.getParam("src")
      }

      var completed = 0;
      for (var x = 0; x < sources.length; x++) {
        RemoteCall(sources[x], null, (app.getMetaParam("debug") * 1.0 > 0)).then(function (res) {
          cascadeData = cascadeData.concat(res.cascadeData);
          completed += 1;
          attemptFinish(sources.length, completed, cascadeData)
        });
      }
    }
  });
}

SC_UICascade.prototype.renderBlock = function (app, cascade, block) {
  app.debugMsg(block.title);
  var html = "";
  var isRootIteration = (block.title == app.element.attr("id"));

  if (block.class == "Block") {
    if (!isRootIteration) {
      html = '<span id="' + block.title + '"';
      $.each(block.attrs, function (key, value) {
        html += ' ' + key + '="' + value + '"';
      });

      //add classes
      html += ' class="';
      $.each(block.classes, function (index, className) {
        html += className + ' ';
      });
      html += html.substring(0, -1) + '"';

      //add styles
      html += ' style="';
      $.each(block.styles, function (style, value) {
        html += style + ':' + value + ';';
      });
      html += '"';

      if (block.type == "container") {
        if (block.content != "" && block.content != undefined) {
          html += ' SC_appURL="' + block.content + '"';
        }
        html += '>';
      } else {
        html += '>' + block.content;
      }
    }

    //recurse for children (expects SC_GDB json [jk, not yet, just regular json approximating graphs for now])
    var childEdges = jQuery.map(cascade, function (g) {
      if (g.class == "Edge" && g.inID == block.gdb_id) { return g; }
    });
    var childBlocks = [];
    if (childEdges.length > 0) {
      childBlocks = jQuery.map(cascade, function (g) {
        if (g.class == "Block") {
          var matchedChildEdges = jQuery.map(childEdges, function (e) {
            if (e.outID == g.gdb_id && (e.page == undefined || e.page == SC_getGlobal("page")) && (e.skin == undefined || e.skin == SC_getGlobal("skin"))) {
              return e;
            }
          });
          if (matchedChildEdges.length > 0) { return g; }
        }
      });
    }

    for (var x = 0; x < childBlocks.length; x++) {
      html += app.renderBlock(app, cascade, childBlocks[x]);
    }
  }

  if (!isRootIteration) { html += '</span>'; }
  return html;
}
////////////////////////////
