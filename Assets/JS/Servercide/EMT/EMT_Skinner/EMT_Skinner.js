//EMT_Skinner
////////////////////////////
var EMT_Skinner = function(element) {
  var skin = SC_getGlobal("skin");
  if (skin == undefined) { skin = "Classic"; }
  var defaultParams = {
    "g:skin": skin
  };
  localStorage.EMT_Skin = skin;
  loadCSS("Assets/CSS/Skin_" + skin + ".css");

  var app = this;
  var promise = ServercideApp.call(this, app, element, "EMT_Skinner", defaultParams).then(function(){ app.postStrap(app); });
  return promise;
}
EMT_Skinner.prototype = Object.create(ServercideApp.prototype);

EMT_Skinner.prototype.onStrap = function(app){
  return new Promise(function(fulfill, reject){
    app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);

    app.element.html('<span class="changeSkin" skin="Classic" title="desktop layout with sticky, pinnable header-footer" style="height:unset;">Classic</span>\
                  <span class="changeSkin" skin="ControlPanel" title="mobile thumb-based layout" style="height:unset;">ControlPanel</span>');
    app.element.find(".changeSkin").each(function() {
      var skinlink = this;
      $(skinlink).on("click", function() {
        app.changeSkin($(skinlink).attr("skin"));
      });
    });

    fulfill();
  });
}

EMT_Skinner.prototype.postStrap = function(app){
  return new Promise(function(fulfill, reject){
    app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
    fulfill();
  });
}

EMT_Skinner.prototype.discoveryComplete = function(app){
  return new Promise(function(fulfill, reject){
    fulfill();
  });
}

EMT_Skinner.prototype.changeSkin = function(skin) {
  var skin = SC_getGlobal("skin");
  try {
    if (window.location.href.indexOf("/skin:") != -1) {
      window.location = window.location.href.replace(/\/skin:.*?\//, "/skin:" + skin + "/");
    } else if (window.location.href.indexOf("/?/") != -1) {
      window.location = window.location.href.replace(/\/\?\//, "/?/skin:" + skin + "/");
    } else {
      window.location = window.location.href + "/?/skin:" + skin;
    }
  } catch (err) {
    console.log("Error changing skin: " + err.message);
  }
}
////////////////////////////
