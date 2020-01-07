//SC_StickyFrame
////////////////////////////
class SC_StickyFrame {
  constructor(element) {
    var defaultParams = {
      "frameType": "header",
      "scrollRoot": "html",
      "height": "10%"
    };
    var promise = new ServercideApp(this, element, "SC_StickyFrame", defaultParams);
    return promise;
  }
  onStrap = function (app) {
    app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
    return new Promise(function (fulfill, reject) {
      if (app.getParam("frameType") == "header") {
        app.element.css({ "position": "fixed", "top": "0px", "left": "0px", "width": "100%", "z-index": "1" });
        app.element.parent().prepend(`<span id="header_spacer" style="height:` + app.element.css("height") + `">`)
      }
      else {
        app.element.css({ "position": "fixed", "bottom": "0px", "left": "0px", "width": "100%", "z-index": "1" });
        app.element.css({ "box-shadow": "5px 5px 35px 15px gray" });
        app.element.parent().append(`<span id="footer_spacer" style="height:` + app.element.css("height") + `">`)
      }

      if (app.getParam("frameType") == "header") {
        $(app.getParam("scrollRoot")).scroll(function () {
          var scrollRoot = $(app.getParam("scrollRoot"));
          console.log(scrollRoot);
          if (scrollRoot.scrollTop() > 0) {
            app.element.css({ "box-shadow": "5px 5px 35px 5px gray" });
          }
          else {
            app.element.css({ "box-shadow": "none" });
          }
        });
      } else {
        $(app.getParam("scrollRoot")).scroll(function () {
          var scrollRoot = $(app.getParam("scrollRoot"));
          if (scrollRoot.scrollTop() + scrollRoot.outerHeight(true) >= scrollRoot[0].scrollHeight) {
            app.element.css({ "box-shadow": "none" });
          }
          else {
            app.element.css({ "box-shadow": "5px 5px 35px 15px gray" });
          }
        });
      }

      fulfill();
    });
  }
}
// var SC_StickyFrame = function (element) {
//   var defaultParams = {
//     "frameType": "header",
//     "scrollRoot": "html",
//     "height": "10%"
//   };
//   var promise = ServercideApp.call(this, element, "SC_StickyFrame", defaultParams, SC_StickyFrame.prototype.onStrap);
//   return promise;
// }
// SC_StickyFrame.prototype = Object.create(ServercideApp.prototype);

// SC_StickyFrame.prototype.onStrap = function (app) {
//   app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
//   return new Promise(function (fulfill, reject) {
//     if (app.getParam("frameType") == "header") {
//       app.element.css({ "position": "fixed", "top": "0px", "left": "0px", "width": "100%", "z-index": "1" });
//       app.element.parent().prepend(`<span id="header_spacer" style="height:` + app.element.css("height") + `">`)
//     }
//     else {
//       app.element.css({ "position": "fixed", "bottom": "0px", "left": "0px", "width": "100%", "z-index": "1" });
//       app.element.css({ "box-shadow": "5px 5px 35px 15px gray" });
//       app.element.parent().append(`<span id="footer_spacer" style="height:` + app.element.css("height") + `">`)
//     }

//     if (app.getParam("frameType") == "header") {
//       $(app.getParam("scrollRoot")).scroll(function () {
//         var scrollRoot = $(app.getParam("scrollRoot"));
//         console.log(scrollRoot);
//         if (scrollRoot.scrollTop() > 0) {
//           app.element.css({ "box-shadow": "5px 5px 35px 5px gray" });
//         }
//         else {
//           app.element.css({ "box-shadow": "none" });
//         }
//       });
//     } else {
//       $(app.getParam("scrollRoot")).scroll(function () {
//         var scrollRoot = $(app.getParam("scrollRoot"));
//         if (scrollRoot.scrollTop() + scrollRoot.outerHeight(true) >= scrollRoot[0].scrollHeight) {
//           app.element.css({ "box-shadow": "none" });
//         }
//         else {
//           app.element.css({ "box-shadow": "5px 5px 35px 15px gray" });
//         }
//       });
//     }

//     fulfill();
//   });
// }
////////////////////////////
