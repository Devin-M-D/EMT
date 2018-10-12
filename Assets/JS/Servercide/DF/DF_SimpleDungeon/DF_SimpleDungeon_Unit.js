//DF_SimpleDungeon_Player
////////////////////////////
var DF_SimpleDungeon_Unit = function(element) {
 //unitType: 1 = player, 2 = mob, 3 = boss
  var defaultParams = {
    "unitType": "1",
    "posX": "75px",
    "posY": "150px"
  };
  var app = this;
  var promise = ServercideApp.call(this, app, element, "DF_SimpleDungeon_Unit", defaultParams).then(function(){ app.postStrap(app); });
  return promise;
}
DF_SimpleDungeon_Unit.prototype = Object.create(ServercideApp.prototype);

DF_SimpleDungeon_Unit.prototype.onStrap = function(app){
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
  return new Promise(function(fulfill, reject){
    app.element.css("height", "15px");
    app.element.css("width", "15px");
    app.element.css("z-index", "1");
    if (app.getParam("unitType") == "1"){ app.element.html('<span id="' + app.element.attr("id") + '_player" sc_appobj="true" sc_apptype="DF_SimpleDungeon_Player" debug="7"></span>'); }
    if (app.getParam("unitType") == "2"){ app.element.html('<span id="' + app.element.attr("id") + '_mob" sc_appobj="true" sc_apptype="DF_SimpleDungeon_Mob"  debug="7"></span>'); }
    if (app.getParam("unitType") == "3"){ app.element.html('<span id="' + app.element.attr("id") + '_boss" sc_appobj="true" sc_apptype="DF_SimpleDungeon_Boss"  debug="7"></span>'); }
    app.element.css("left", app.getParam("posX"));
    app.element.css("top", app.getParam("posY"));
    app.element.css("position", "absolute");
    fulfill();
  });
}

DF_SimpleDungeon_Unit.prototype.postStrap = function(app){
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
  return new Promise(function(fulfill, reject){
    fulfill();
  });
}

DF_SimpleDungeon_Unit.prototype.discoveryComplete = function(app){
  app.debugMsg("Recursive Servercide discovery complete, running discoveryComplete function of " + app.element.attr("id") + " app " + app.getMetaParam("type") + ".", 2);
  return new Promise(function(fulfill, reject){
    fulfill();
  });
}

DF_SimpleDungeon_Unit.prototype.tryMove = function(app, initCost, dir){
  var posY = (app.getParam("posY").replace("px", "") * 1.0);
  var posX = (app.getParam("posX").replace("px", "") * 1.0);
  var isPlayer = (app.getParam("unitType") == "1");

  if (isPlayer){
    for (var x = dir.length - 1; x >= 0; x--){
      if (dir[x] == "w"){ posY = posY - 5; }
      if (dir[x] == "s"){ posY = posY + 5; }
      if (dir[x] == "a"){ posX = posX - 5; }
      if (dir[x] == "d"){ posX = posX + 5; }
    }
  } else {
    if (dir == "up") { posY = posY - 5; }
    if (dir == "left") { posX = posX - 5; }
    if (dir == "right") { posX = posX + 5; }
    if (dir == "down") { posY = posY + 5; }
  }

  var topEdge = Math.floor(posY / 25);
  var leftEdge = Math.floor(posX / 25);
  var rightEdge = Math.floor((posX + 15 - 1) / 25);
  var bottomEdge = Math.floor((posY + 15 - 1) / 25)

  var c1 = $("#df_sd_tile" + df_sd_alphabet[topEdge] + leftEdge);
  var c2 = $("#df_sd_tile" + df_sd_alphabet[topEdge] + rightEdge);
  var c3 = $("#df_sd_tile" + df_sd_alphabet[bottomEdge] + leftEdge);
  var c4 = $("#df_sd_tile" + df_sd_alphabet[bottomEdge] + rightEdge);
  //console.log(c1, c2, c3, c4)
  var valid1 = ((["2", "3"].indexOf(c1.attr("df_simpledungeon_tile_tiletype"))) != -1 ? true : false);
  var valid2 = ((["2", "3"].indexOf(c2.attr("df_simpledungeon_tile_tiletype"))) != -1 ? true : false);
  var valid3 = ((["2", "3"].indexOf(c3.attr("df_simpledungeon_tile_tiletype"))) != -1 ? true : false);
  var valid4 = ((["2", "3"].indexOf(c4.attr("df_simpledungeon_tile_tiletype"))) != -1 ? true : false);

  var moveResult = new Promise(function(fulfillMove, rejectMove){
    if (valid1 && valid2 && valid3 && valid4){
      var p = new Promise(function(fulfill, reject){
        app.element.animate({top:posY + "px", left: posX + "px"}, initCost, function() { fulfill(); })
      }).then(function() {
        if (isPlayer){
          app.element.css("background-color", "darkgreen");
          valid1 = c1.attr("sc_apptype") == "3";
          valid2 = c2.attr("sc_apptype") == "3";
          valid3 = c3.attr("sc_apptype") == "3";
          valid4 = c4.attr("sc_apptype") == "3";
          if (valid1 || valid2 || valid3 || valid4){
            app.getChild("DF_SimpleDungeon_Player").getCoin(app.getChild("DF_SimpleDungeon_Player"));
          }
        }
        app.setParam("posY", (posY).toString() + "px");
        app.setParam("posX", (posX).toString() + "px");
        fulfillMove();
      });
    } else {
      if (isPlayer){ app.element.css("background-color", "pink"); }
      fulfillMove();
    }
  }).then(function() {
      if (isPlayer){
        //app.getParent("DF_SimpleDungeon_Board").recurseControls(app.getParent("DF_SimpleDungeon_Board"));
         app.getParent("DF_SimpleDungeon_Board").giveControl(app.getParent("DF_SimpleDungeon_Board"));
        //app.tryMove(app, initCost, app.getParent("DF_SimpleDungeon_Board").getParam("keysDown"));
      }
  });
}
////////////////////////////
