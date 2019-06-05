//SC_Calendar app definition template
//V1.0
////////////////////////////
var SC_Calendar = function(element) {
  var defaultParams = {};
  var app = this;
  var promise = ServercideApp.call(this, app, element, "SC_Calendar", defaultParams).then(function(){ app.postStrap(app); });
  return promise;
}
SC_Calendar.prototype = Object.create(ServercideApp.prototype);

SC_Calendar.prototype.onStrap = function(app){
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
  return new Promise(function(fulfill, reject){
    app.element.datepicker();
    // app.element.find('.ui-datepicker-month').each(function(month){
    //   month.css("height", "unset");
    // });
    // app.element.find('.ui-datepicker-year').each(function(year){
    //   year.css("height", "unset");
    // });
    console.log(app.element.find('.ui-datepicker-month'));
    app.element.find('.ui-datepicker-month').css("height", "unset");
    app.element.find('.ui-datepicker-year').css("height", "unset");
    fulfill();
  });
}

SC_Calendar.prototype.postStrap = function(app){
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
  return new Promise(function(fulfill, reject){
    fulfill();
  });
}

SC_Calendar.prototype.discoveryComplete = function(app){
  app.debugMsg("Recursive Servercide discovery complete, running discoveryComplete function of " + app.element.attr("id") + " app " + app.getMetaParam("type") + ".", 2);
  return new Promise(function(fulfill, reject){
    fulfill();
  });
}
////////////////////////////
