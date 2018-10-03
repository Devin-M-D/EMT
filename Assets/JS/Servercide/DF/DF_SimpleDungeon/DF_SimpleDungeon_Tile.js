//DF_SimpleDungeon_Tile
////////////////////////////
var DF_SimpleDungeon_Tile = function(element) {
  // tileType: 1 = wall, 2 = floor, 3 = coin
  var defaultParams = {
    "tileType": "1",
    "row": "A",
    "col": "1"
  };
  var app = this;
  var promise = ServercideApp.call(this, app, element, "DF_SimpleDungeon_Tile", defaultParams).then(function(){ app.postStrap(app); });
  return promise;
}
DF_SimpleDungeon_Tile.prototype = Object.create(ServercideApp.prototype);

DF_SimpleDungeon_Tile.prototype.onStrap = function(app){
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", [2, 3, 6, 7]);
  return new Promise(function(fulfill, reject){
    app.debugFunc(function(){
      app.element.html(app.element.attr("id").replace("df_sd_tile", ""));
      app.element.css("font-size", "12px");
      app.element.addClass("absCenter");
    });
    app.element.css("height", "5%");
    app.element.css("width", "5%");
    app.element.css("border", "solid thin black");
    if (app.getParam("tileType") * 1 == 1){ app.element.append('<span id="' + app.element.attr("id") + "_wall" + '" sc_appobj="true" sc_apptype="DF_SimpleDungeon_Wall"></span>'); }
    else if (app.getParam("tileType") * 1 == 2){ app.element.append('<span id="' + app.element.attr("id") + "_floor" + '" sc_appobj="true" sc_apptype="DF_SimpleDungeon_Floor"></span>'); }
    else if (app.getParam("tileType") * 1 == 3){ app.element.append('<span id="' + app.element.attr("id") + "_coin" + '" sc_appobj="true" sc_apptype="DF_SimpleDungeon_Coin"></span>'); }
    fulfill();
  });
}

DF_SimpleDungeon_Tile.prototype.postStrap = function(app){
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", [2, 3, 6, 7]);
  return new Promise(function(fulfill, reject){
    fulfill();
  });
}

DF_SimpleDungeon_Tile.prototype.discoveryComplete = function(app){
  app.debugMsg("Recursive Servercide discovery complete, running discoveryComplete function of " + app.element.attr("id") + " app " + app.getMetaParam("type") + ".", [2, 3, 6, 7]);
  return new Promise(function(fulfill, reject){
    fulfill();
  });
}
////////////////////////////
