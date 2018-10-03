//DF_SimpleDungeon
////////////////////////////
var df_sd_alphabet = "ABCDEFGHIJKLMNOPQRST".split("");

var DF_SimpleDungeon = function(element) {
  var defaultParams = {};
  var app = this;
  var promise = ServercideApp.call(this, app, element, "DF_SimpleDungeon", defaultParams).then(function(){ app.postStrap(app); });
  return promise;
}
DF_SimpleDungeon.prototype = Object.create(ServercideApp.prototype);

DF_SimpleDungeon.prototype.onStrap = function(app){
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", [2, 3, 6, 7]);
  return new Promise(function(fulfill, reject){
    app.element.html(`
      <span style="font-weight:bold;text-align:center;height:25px;">Simple Dungeon</span>
      <span id="df_sd_container"  style="background-color:black;">
        <span id="df_sd_hud" style="height:40px;" sc_appobj="true" sc_apptype="DF_SimpleDungeon_HUD"></span>
        <span id="df_sd_board" class="absCenter" style="height:500px;width:500px;margin:auto;" sc_appobj="true" sc_apptype="DF_SimpleDungeon_Board"></span>
      </span>
    `)
    fulfill();
  });
}

DF_SimpleDungeon.prototype.postStrap = function(app){
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", [2, 3, 6, 7]);
  return new Promise(function(fulfill, reject){
    fulfill();
  });
}

DF_SimpleDungeon.prototype.discoveryComplete = function(app){
  app.debugMsg("Recursive Servercide discovery complete, running discoveryComplete function of " + app.element.attr("id") + " app " + app.getMetaParam("type") + ".", [2, 3, 6, 7]);
  return new Promise(function(fulfill, reject){
    fulfill();
  });
}
////////////////////////////
