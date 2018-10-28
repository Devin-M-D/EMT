//DF_ToDo app definition template
//V1.0
////////////////////////////
var DF_ToDo = function(element) {
  var defaultParams = {};
  var app = this;
  var promise = ServercideApp.call(this, app, element, "DF_ToDo", defaultParams).then(function(){ app.postStrap(app); });
  return promise;
}
DF_ToDo.prototype = Object.create(ServercideApp.prototype);

DF_ToDo.prototype.onStrap = function(app){
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
  return new Promise(function(fulfill, reject){
    app.element.append(`\
      <span id="todo_addModal" style="display:none">\
        What is your new task?<br><input type="text" />\
      </span>\
      <span id="todo_btnAdd" SC_appObj="true" SC_appType="SC_Modal" SC_Modal_node="#todo_addModal">Add</span>\
    `);

    fulfill();
  });
}

DF_ToDo.prototype.postStrap = function(app){
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
  return new Promise(function(fulfill, reject){
    fulfill();
  });
}

DF_ToDo.prototype.discoveryComplete = function(app){
  app.debugMsg("Recursive Servercide discovery complete, running discoveryComplete function of " + app.element.attr("id") + " app " + app.getMetaParam("type") + ".", 2);
  return new Promise(function(fulfill, reject){
    fulfill();
  });
}
////////////////////////////
