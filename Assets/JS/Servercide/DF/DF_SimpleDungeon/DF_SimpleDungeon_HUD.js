//DF_SimpleDungeon_HUD
////////////////////////////
var DF_SimpleDungeon_HUD = function(element) {
  var defaultParams = {};
  var app = this;
  var promise = ServercideApp.call(this, app, element, "DF_SimpleDungeon_HUD", defaultParams).then(function(){ app.postStrap(app); });
  return promise;
}
DF_SimpleDungeon_HUD.prototype = Object.create(ServercideApp.prototype);

DF_SimpleDungeon_HUD.prototype.onStrap = function(app){
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
  return new Promise(function(fulfill, reject){
    app.element.css("dislay", "flex");
    app.element.append($('' +
         '<span id="df_sd_hp" sc_appobj="true" sc_apptype="DF_SimpleDungeon_Health" style="width:10%;color:white;"></span>' +
         '<span style="width:80%"></span>' +
         '<span id="df_sd_cp" sc_appobj="true" sc_apptype="DF_SimpleDungeon_Coinpurse" style="width:10%;color:white;"></span>'));
    fulfill();
  });
}

DF_SimpleDungeon_HUD.prototype.postStrap = function(app){
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
  return new Promise(function(fulfill, reject){
    fulfill();
  });
}

DF_SimpleDungeon_HUD.prototype.discoveryComplete = function(app){
  app.debugMsg("Recursive Servercide discovery complete, running discoveryComplete function of " + app.element.attr("id") + " app " + app.getMetaParam("type") + ".", 2);
  return new Promise(function(fulfill, reject){
    fulfill();
  });
}
////////////////////////////
