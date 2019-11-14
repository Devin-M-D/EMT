//EMTBase//////
///////////////
loadCSS("Assets/JS/Servercide/EMT/EMT_Base/EMT_Base.css");
loadCSS("Assets/CSS/main.css");

var EMT_Base = function (element) {
  var defaultParams = {
    "baseApps": [
      // '<span id="spnRouter" SC_appObj="true" SC_appType="SC_Router" class="SC_floater"></span>',
      // '<span id="spnSkinner" SC_appObj="true" SC_appType="EMT_Skinner" class="SC_floater"></span>',
      // '<span id="spnLeftMenu" SC_appObj="true" SC_appType="SC_DrawerPane" SC_DrawerPane_edge="left"></span>',
      // // '<span id="spnContextMenu" class="SC_floater" SC_appObj="true" SC_appType="SC_ContextMenu" ></span>',
      // `<span id="spnRoot" SC_appObj="true" SC_appType="SC_UICascade" style="overflow:auto;padding:0px 5px;height:100%;width:100%">
      //   <sc_uicascade_src>
      //     <item>Assets/JS/Servercide/SC/SC_Demo/SC_Demo_Content.json</item>
      //     <item>Assets/JS/Servercide/SC/SC_Demo/SC_Demo_Skin-Classic.json</item>
      //   </sc_uicascade_src>
      // </span>`
    ]
  };
  var app = this;
  var promise = ServercideApp.call(this, app, element, "EMT_Base", defaultParams);
  // this.prototype.postStrap = this.prototype.postStrap(() => { console.log("postStrap EMTBase!!"); fulfillOnStrap(); })
  return promise;
}
EMT_Base.prototype = Object.create(ServercideApp.prototype);

EMT_Base.prototype.postStrap = () => { console.log("postStrap EMTBase!!"); fulfillOnStrap(); }
console.log(EMT_Base);
// EMT_Base.prototype.onStrap = function (app) {
//   app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
//   return new Promise(function (fulfill, reject) {
//     app.getParam("baseApps").forEach(function (baseApp) {
//       app.element.append($(baseApp));
//     });
//     fulfill();
//   });
// }

// EMT_Base.prototype.postStrap = function (app) {
//   app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
//   return new Promise(function (fulfill, reject) {
//     fulfill();
//   });
// }

// EMT_Base.prototype.discoveryComplete = function (app) {
//   app.debugMsg("Recursive Servercide discovery complete, running discoveryComplete function of " + app.element.attr("id") + " app " + app.getMetaParam("type") + ".", 2);
//   return new Promise(function (fulfill, reject) {
//     fulfill();
//   });
// }
///////////////
