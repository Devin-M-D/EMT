//EMTBase//////
///////////////
loadCSS("Assets/JS/Servercide/EMT/EMT_Base/EMT_Base.css");
loadCSS("Assets/CSS/main.css");

class EMT_Base {
  constructor(element) {
    var defaultParams = {
      "baseApps": [
        '<span id="spnRouter" SC_appObj="true" SC_appType="SC_Router" class="SC_floater"></span>',
        '<span id="spnSkinner" SC_appObj="true" SC_appType="EMT_Skinner" class="SC_floater"></span>',
        '<span id="spnLeftMenu" SC_appObj="true" SC_appType="SC_DrawerPane" SC_DrawerPane_edge="left"></span>',
        // '<span id="spnContextMenu" class="SC_floater" SC_appObj="true" SC_appType="SC_ContextMenu" ></span>',
        `<span id="spnRoot" SC_appObj="true" SC_appType="SC_UICascade" style="overflow:auto;padding:0px 5px;height:100%;width:100%">
        <sc_uicascade_src>
          <item>Assets/JS/Servercide/SC/SC_Demo/SC_Demo_Content.json</item>
          <item>Assets/JS/Servercide/SC/SC_Demo/SC_Demo_Skin-Classic.json</item>
        </sc_uicascade_src>
      </span>`
      ]
    };
    var promise = new ServercideApp(this, element, "EMT_Base", defaultParams);
    return promise;
  }
  onStrap(app) {
    return new Promise(function (fulfill, reject) {
      app.getParam("baseApps").forEach(function (baseApp) {
        app.element.append($(baseApp));
      });
      fulfill();
    });
  }
}
//EMT_Base.prototype = ServercideApp.prototype;
///////////////
