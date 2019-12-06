//DF_SimpleDungeon_Board
////////////////////////////
var DF_SimpleDungeon_Board = function (element) {
  var defaultParams = {
    "inputTimer": 0,
    "keysDown": []
  };
  var promise = ServercideApp.call(
    this, element, "DF_SimpleDungeon_Board", defaultParams,
    DF_SimpleDungeon_Board.prototype.onStrap, null, DF_SimpleDungeon_Board.prototype.discoveryComplete
  );
  return promise;
}
DF_SimpleDungeon_Board.prototype = Object.create(ServercideApp.prototype);

DF_SimpleDungeon_Board.prototype.onStrap = function (app) {
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
  return new Promise(function (fulfill, reject) {
    var initBoard = '' +
      '<span id="df_sd_unit1" sc_appobj="true" sc_apptype="DF_SimpleDungeon_Unit"></span>' +
      '<span id="df_sd_unit2" sc_appobj="true" sc_apptype="DF_SimpleDungeon_Unit" df_simpledungeon_unit_unittype="2" df_simpledungeon_unit_posx="450" df_simpledungeon_unit_posy="30"></span>' +
      '<span id="df_sd_unit3" sc_appobj="true" sc_apptype="DF_SimpleDungeon_Unit" df_simpledungeon_unit_unittype="2" df_simpledungeon_unit_posx="300" df_simpledungeon_unit_posy="250"></span>' +
      '<span id="df_sd_unit4" sc_appobj="true" sc_apptype="DF_SimpleDungeon_Unit" df_simpledungeon_unit_unittype="2" df_simpledungeon_unit_posx="355" df_simpledungeon_unit_posy="300"></span>' +
      '<span id="df_sd_unit5" sc_appobj="true" sc_apptype="DF_SimpleDungeon_Unit" df_simpledungeon_unit_unittype="3" df_simpledungeon_unit_posx="400" df_simpledungeon_unit_posy="400"></span>' +
      '<span id="df_sd_tiles" style="width:500px;"' +
      'sc_appobj="true" sc_apptype="SC_FlexGrid" sc_flexgrid_settings_rowMax="20" sc_flexgrid_settings_colMax="20"' +
      'style="background-color:black;">' +
      '<sc_flexgrid_nodes htmlParam="true">';
    var layout = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 3, 2, 1],
      [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 2, 3, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 2, 1, 0, 0, 0, 0],
      [1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 0, 0, 0, 0],
      [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 2, 3, 2, 2, 3, 2, 1, 3, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 2, 3, 2, 2, 3, 2, 2, 3, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 3, 2, 2, 2, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 3, 2, 3, 2, 2, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 2, 3, 2, 3, 2, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    for (var x = 0; x < layout.length; x++) {
      var row = layout[x];
      var letter = df_sd_alphabet[x];
      for (var y = 0; y < row.length; y++) {
        if (row[y] == 0) {
          initBoard += '<span id="df_sd_tile' + df_sd_alphabet[x] + y + '" style="height:25px;width:25px;background-color:black;"></span>';
        } else if (row[y] == 1) {
          initBoard += '<span id="df_sd_tile' + df_sd_alphabet[x] + y + '" sc_appobj="true" sc_apptype="DF_SimpleDungeon_Tile" df_simpledungeon_tile_tileType="1" debug="4"></span>';
        } else if (row[y] == 2) {
          initBoard += '<span id="df_sd_tile' + df_sd_alphabet[x] + y + '" sc_appobj="true" sc_apptype="DF_SimpleDungeon_Tile" df_simpledungeon_tile_tileType="2" debug="4"></span>';
        } else if (row[y] == 3) {
          initBoard += '<span id="df_sd_tile' + df_sd_alphabet[x] + y + '" sc_appobj="true" sc_apptype="DF_SimpleDungeon_Tile" df_simpledungeon_tile_tileType="3" debug="4"></span>';
        }
      }
    }
    initBoard += `\
        </sc_flexgrid_nodes>\
      </span>`;
    app.element.html(initBoard);
    fulfill();
  });
}

DF_SimpleDungeon_Board.prototype.discoveryComplete = function (app) {
  app.debugMsg("Recursive Servercide discovery complete, running discoveryComplete function of " + app.element.attr("id") + " app " + app.getMetaParam("type") + ".", 2);
  return new Promise(function (fulfill, reject) {
    $(document).keydown(function (e) {
      var key = e.which;
      var keysDown = app.getParam("keysDown");
      var keyToAdd = app.determineInput(key);
      if (keysDown.indexOf(keyToAdd) == -1) {
        keysDown.push(keyToAdd);
      }
      app.setParam("keysDown", keysDown)
    });
    $(document).keyup(function (e) {
      var key = e.which;
      var keysDown = app.getParam("keysDown");
      var keyToRmv = app.determineInput(key);
      if (keysDown.indexOf(keyToRmv) != -1) {
        keysDown.splice(keysDown.indexOf(keyToRmv), 1);
      }
      app.setParam("keysDown", keysDown)
    });
    app.giveControl(app);
    fulfill();
  });
}

DF_SimpleDungeon_Board.prototype.addInput = function (app, key) {

}

DF_SimpleDungeon_Board.prototype.determineInput = function (key) {
  if (key == 119 || key == 87) { return "w"; }
  else if (key == 97 || key == 65) { return "a"; }
  else if (key == 100 || key == 68) { return "d"; }
  else if (key == 115 || key == 83) { return "s"; }
  return [];
}

DF_SimpleDungeon_Board.prototype.giveControl = function (app) {
  var playerUnit = app.getChild("DF_SimpleDungeon_Player").getParent("DF_SimpleDungeon_Unit");
  var keys = app.getParam("keysDown");
  console.log(keys)
  if (keys.length > 0) {
    playerUnit.tryMove(playerUnit, 30, keys);
  }
  else {
    $(document).one("keypress", function (e) {
      playerUnit.tryMove(playerUnit, 30, keys);
    });
  }
}

DF_SimpleDungeon_Board.prototype.testSight = function (app, enemy) {

  // var player = app.getChild("DF_SimpleDungeon_Unit");
  // var pposY = df_sd_alphabet[Math.floor(player.getParam("posY") / 25)];
  // var pposX = Math.floor(player.getParam("posX") / 25);
  // var eposY = df_sd_alphabet[Math.floor(enemy.getParam("posY") / 25)];
  // var eposX = Math.floor(enemy.getParam("posX") / 25);
  // console.log(pposY + pposX, eposY + eposX)
  //
  // $(document).one("keypress", function (e) {
  //   var key = e.which;
  //   if(key == 119 || key ==  87) { player.tryMove(player, 30, "up"); }
  //   else if(key == 97 || key ==  65) { player.tryMove(player, 30, "left"); }
  //   else if(key == 100 || key ==  68) { player.tryMove(player, 30, "right"); }
  //   else if(key == 115 || key == 83) { player.tryMove(player, 30, "down"); }
  // });
}
////////////////////////////
