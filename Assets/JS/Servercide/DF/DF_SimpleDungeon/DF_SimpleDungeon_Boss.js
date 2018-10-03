//DF_SimpleDungeon_Boss
////////////////////////////
var DF_SimpleDungeon_Boss = function(element) {
  var defaultParams = {
    "action": null
  };
  var app = this;
  var promise = ServercideApp.call(this, app, element, "DF_SimpleDungeon_Boss", defaultParams).then(function(){ app.postStrap(app); });
  return promise;
}
DF_SimpleDungeon_Boss.prototype = Object.create(ServercideApp.prototype);

DF_SimpleDungeon_Boss.prototype.onStrap = function(app){
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", [2, 3, 6, 7]);
  return new Promise(function(fulfill, reject){
    app.getParentElement().css("background-color", "red");
    fulfill();
  });
}

DF_SimpleDungeon_Boss.prototype.postStrap = function(app){
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", [2, 3, 6, 7]);
  return new Promise(function(fulfill, reject){
    fulfill();
  });
}

DF_SimpleDungeon_Boss.prototype.discoveryComplete = function(app){
  app.debugMsg("Recursive Servercide discovery complete, running discoveryComplete function of " + app.element.attr("id") + " app " + app.getMetaParam("type") + ".", [2, 3, 6, 7]);
  return new Promise(function(fulfill, reject){
    app.wander(app);
    fulfill();
  });
}

DF_SimpleDungeon_Boss.prototype.wander = function(app){
  var unit = app.getParent("DF_SimpleDungeon_Unit");
  var board = unit.getParent("DF_SimpleDungeon_Board")
  var rnd = Math.floor(Math.random() * 4);
  if (rnd == 0) { unit.tryMove(unit, 400, "up"); }
  if (rnd == 1) { unit.tryMove(unit, 400, "left"); }
  if (rnd == 2) { unit.tryMove(unit, 400, "right"); }
  if (rnd == 3) { unit.tryMove(unit, 400, "down"); }
  if (board.testSight(board, unit)){

  } else {
    setTimeout(function() {
      app.wander(app)
    }, ((Math.random() * 5) * 2000));
  }
}

DF_SimpleDungeon_Boss.prototype.chase = function(app){
  var unit = app.getParent("DF_SimpleDungeon_Unit");
  var rnd = Math.floor(Math.random() * 4);
  if (rnd == 0) { unit.tryMove(unit, 10, "up"); }
  if (rnd == 1) { unit.tryMove(unit, 10, "left"); }
  if (rnd == 2) { unit.tryMove(unit, 10, "right"); }
  if (rnd == 3) { unit.tryMove(unit, 10, "down"); }
}
////////////////////////////
