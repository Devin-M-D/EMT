//DF_ToDo app definition template
//V1.0
////////////////////////////
var DF_ToDo = function(element) {
  var defaultParams = {
    "src": "/Assets/JS/Servercide/DF/DF_ToDo/DF_ToDo_sampledata.json"
  };
  var app = this;
  var promise = ServercideApp.call(this, app, element, "DF_ToDo", defaultParams).then(function(){ app.postStrap(app); });
  return promise;
}
DF_ToDo.prototype = Object.create(ServercideApp.prototype);

DF_ToDo.prototype.onStrap = function(app){
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
  return new Promise(function(fulfill, reject){
    var tasks;
    var list = '<ul style="width:90%; text-align:left;" id="todo_list">';
    RemoteCall(app.getParam("src")).then(function(res) {
      function recurseList(taskList, listElem) {
        taskList.forEach(function(task) {
          listElem += '<li>' + task["name"] + '</li>';
          if (task["subtasks"] != undefined){
            listElem += "<ul>";
            listElem = recurseList(task["subtasks"], listElem);
            listElem += "</ul>";
          }
        });
        return listElem;
      }
      tasks = res.todo;
      list = recurseList(tasks, list)
      list += '</ul>';
      app.element.append(list);
      app.element.css({"border": "solid thin black", "text-align": "center"});

      //add task modal
      app.element.append(`\
        <span id="todo_addModal" class="absCenter" style="display:none;width:400px;height:200px;">\
          What is your new task?<br><input id="todo_NewTask" type="text" /><br>\
          <input id="todo_addTask" type="button" value="Done" />
        </span>\
        <span id="todo_btnAdd" class="absCenter" SC_appObj="true" SC_appType="SC_Modal" SC_Modal_node="#todo_addModal"\
          style="width:200px;height:30px;border:solid thin black; border-radius:8px;margin:10px">Add</span>\
      `);
      console.log($("#modal_tempID").find("#todo_addTask"));
      $("#modal_tempID").find("#todo_addTask").click(function() { app.addTask(app, $("#modal_tempID").find("#todo_NewTask").val()) });
      fulfill();
    });
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

DF_ToDo.prototype.addTask = function(app, newTask){
  console.log("foo");
  console.log(newTask);
}
////////////////////////////
