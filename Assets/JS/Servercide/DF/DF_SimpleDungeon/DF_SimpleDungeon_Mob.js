//DF_SimpleDungeon_Mob
////////////////////////////
var DF_SimpleDungeon_Mob = function (element) {
  var defaultParams = {
  };
  var promise = ServercideApp.call(
    this, element, "DF_SimpleDungeon_Mob", defaultParams,
    DF_SimpleDungeon_Mob.prototype.onStrap, null, DF_SimpleDungeon_Mob.prototype.discoveryComplete
  );
  return promise;
}
DF_SimpleDungeon_Mob.prototype = Object.create(ServercideApp.prototype);

DF_SimpleDungeon_Mob.prototype.onStrap = function (app) {
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
  return new Promise(function (fulfill, reject) {
    app.getParentElement().css("background-color", "orange");
    fulfill();
  });
}

DF_SimpleDungeon_Mob.prototype.discoveryComplete = function (app) {
  app.debugMsg("Recursive Servercide discovery complete, running discoveryComplete function of " + app.element.attr("id") + " app " + app.getMetaParam("type") + ".", 2);
  return new Promise(function (fulfill, reject) {
    app.wander(app);
    fulfill();
  });
}

DF_SimpleDungeon_Mob.prototype.wander = function (app) {
  var unit = app.getParent("DF_SimpleDungeon_Unit");
  var board = unit.getParent("DF_SimpleDungeon_Board")
  var rnd = Math.floor(Math.random() * 4);
  if (rnd == 0) { unit.tryMove(unit, 500, "up"); }
  if (rnd == 1) { unit.tryMove(unit, 500, "left"); }
  if (rnd == 2) { unit.tryMove(unit, 500, "right"); }
  if (rnd == 3) { unit.tryMove(unit, 500, "down"); }
  if (board.testSight(board, unit)) {

  } else {
    setTimeout(function () {
      app.wander(app)
    }, ((Math.random() * 5) * 2000));
  }
}

DF_SimpleDungeon_Mob.prototype.chase = function (app) {
  var unit = app.getParent("DF_SimpleDungeon_Unit");
  var rnd = Math.floor(Math.random() * 4);
  if (rnd == 0) { unit.tryMove(unit, 20, "up"); }
  if (rnd == 1) { unit.tryMove(unit, 20, "left"); }
  if (rnd == 2) { unit.tryMove(unit, 20, "right"); }
  if (rnd == 3) { unit.tryMove(unit, 20, "down"); }
}

////////////////////////////
