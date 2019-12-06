//SC_Calendar app definition template
//V1.0
////////////////////////////
var SC_Calendar = function (element) {
  var defaultParams = {};
  var promise = ServercideApp.call(
    this, element, "SC_Calendar", defaultParams,
    SC_Calendar.prototype.onStrap
  );
  return promise;
}
SC_Calendar.prototype = Object.create(ServercideApp.prototype);

SC_Calendar.prototype.onStrap = function (app) {
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
  return new Promise(function (fulfill, reject) {
    app.element.datepicker({
      showOtherMonths: true,
      selectOtherMonths: true
    });
    // app.element.find('.ui-datepicker-month').each(function(month){
    //   month.css("height", "unset");
    // });
    // app.element.find('.ui-datepicker-year').each(function(year){
    //   year.css("height", "unset");
    // });
    //console.log(app.element.find('.ui-datepicker-month'));
    app.element.find('.ui-datepicker-month').css("height", "unset");
    app.element.find('.ui-datepicker-year').css("height", "unset");
    fulfill();
  });
}
////////////////////////////
