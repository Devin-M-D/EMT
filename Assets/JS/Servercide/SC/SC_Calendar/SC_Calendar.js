//SC_Calendar app definition template
//V1.0
////////////////////////////
class SC_Calendar {
  constructor(element) {
    var defaultParams = {
      src: "",
      data: {
        accounts: [
          {
            name: "Bank1",
            balance: 100,
            asOfDate: "2019-12-11"
          }
        ],
        recurringExpenses: [
          {
            amount: 10,
            recurrencePattern: "every 1st of month"
          }
        ]
      }
    };
    var promise = ServercideApp.call(
      this, element, "SC_Calendar", defaultParams,
      SC_Calendar.prototype.onStrap
    );
    return promise;

  }
}
// }= function (element) {
//   var defaultParams = {
//     src: "",
//     data: {
//       accounts: [
//         {
//           name: "Bank1",
//           balance: 100,
//           asOfDate: "2019-12-11"
//         }
//       ],
//       recurringExpenses: [
//         {
//           amount: 10,
//           recurrencePattern: "every 1st of month"
//         }
//       ]
//     }
//   };
//   var promise = ServercideApp.call(
//     this, element, "SC_Calendar", defaultParams,
//     SC_Calendar.prototype.onStrap
//   );
//   return promise;
// }
// SC_Calendar.prototype = Object.create(ServercideApp.prototype);

SC_Calendar.prototype.onStrap = function (app) {
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
  return new Promise(function (fulfill, reject) {
    var activeMonth = new Date().getMonth() + 1;
    var activeYear = new Date().getFullYear();

    app.element.datepicker({
      showOtherMonths: true,
      selectOtherMonths: true,
      onChangeMonthYear: function (year, month, inst) {
        // activeMonth = month;
        // activeYear = year;
        // setTimeout(() => { app.element.find('.ui-datepicker-month').css("height", "unset") }, 0);
        // setTimeout(() => { app.element.find('.ui-datepicker-year').css("height", "unset") }, 0);
        // app.calcCurrMonthBoMBalance(app);
      },
      beforeShowDay: function (date) {
        console.log(date)
        var activeDay = date.getDay();
        return [true, `date${activeYear}-${activeMonth}-${activeDay}`, ""];
      }
    });

    app.element.find('.ui-datepicker-month').css("height", "unset");
    app.element.find('.ui-datepicker-year').css("height", "unset");

    // app.element.find("[data-month='11'] [data-year='2019']")
    fulfill();
  });
}

SC_Calendar.prototype.calcCurrMonthBoMBalance = function (app) {
  // var accounts = app.getParam(["data", "accounts"]);
  // console.log(accounts);
}
////////////////////////////
