var ServercideApps = [];
var onCompleteFuncs = [];
SC_loadedApps = [];
var SC_state = Immutable.fromJS({
  "globals": {},
  "ADOM": {}
});

$(function () {
  SC_retrieveGlobals();
  loadScript("Assets/JS/Servercide/ServercideApp.js").then(() => {
    SC_discover($("html")).then(function () {
      SC_triggerResize();
      SC_storeGlobals();
      runInSequence(onCompleteFuncs).then(function () {
        SC_triggerResize();
        if ($("html").attr("debug") == "2" || $("html").attr("debug") == "3") {
          console.log("Servercide has finished recursing");
          logImmutable(SC_state);
        }
      });
    });
  });
});

//Severcide core functions
//////////////////////////
function SC_retrieveGlobals() {
  if (localStorage.SC_globals != null && localStorage.SC_globals != undefined) {
    SC_state.set("globals", Immutable.fromJS(localStorage.SC_globals));
  }
}
function SC_storeGlobals() {
  localStorage.SC_globals = SC_state.get("globals").toJS();
}
function SC_getGlobal(name) {
  return SC_state.getIn(["globals", name]);
}

function SC_discover(searchRoot) {
  if ($("html").attr("debug") == "1" || $("html").attr("debug") == "3") { console.log("Discovering " + ($(searchRoot).is($("html")) ? "<html>" : $(searchRoot).attr("id"))); }
  function scrapeTopSCApps(root) {
    var skimmedApps = [];
    root.find("> *").filter("[sc_appobj='true']").each(function () {
      skimmedApps.push(this);
    }).end().filter("[sc_appobj!='true']").each(function () {
      skimmedApps = skimmedApps.concat(scrapeTopSCApps($(this)));
    });
    return skimmedApps;
  }

  return new Promise(function (fulfill, reject) {
    new Promise(function (_fulfill, _reject) {
      if (searchRoot.attr("sc_appobj") == "true") {
        SC_strap(searchRoot).then(function () { _fulfill(); });
      }
      else { _fulfill(); }
    }).then(function () {
      var nextLayer = scrapeTopSCApps(searchRoot);
      var nextLayerFuncs = [];
      nextLayer.forEach(function (obj) {
        nextLayerFuncs.push(function () { return SC_discover($(obj)); });
      });
      runInSequence(nextLayerFuncs).then(function () { fulfill(); });
    });
  });
}

function SC_strap(root) {
  function locateSCElement(keypath, element) {
    var statePart = SC_state.getIn(keypath);
    if (statePart !== Immutable.fromJS({}) && statePart !== Immutable.fromJS([])) {
      if (statePart.get("elem") == element) {
        return keypath;
      } else {
        for (var x = 0; x < statePart.getIn(["children"]).size; x++) {
          var deeperState = keypath.slice(0);
          deeperState.push("children", x);
          var plumb = locateSCElement(deeperState, element);
          if (plumb != false) {
            return plumb;
          }
        }
      }
    }
    return false;
  }

  function upsertElemToState(keypath, appObj) {
    var appState = SC_state.getIn(keypath, null);
    if (appState instanceof Immutable.List) {
      SC_state = SC_state.updateIn(keypath, children => children.push(Immutable.fromJS({})));
      keypath.push(SC_state.getIn(keypath).size - 1);
    }

    appState = SC_state.getIn(keypath, null);
    if (appState === Immutable.fromJS({})) {
      var elemState = Immutable.fromJS({
        "elem": $(appObj).attr("id"),
        "apps": [],
        "children": []
      });
      SC_state = SC_state.mergeIn(keypath, elemState);
    }
    return keypath;
  }

  function upsertElementApps(keypath, appObj) {
    return new Promise(function (fulfill, reject) {
      var appTypes = [];
      if (appObj.attr("sc_apptype") != undefined) {
        appTypes = appObj.attr("sc_apptype").split(' ');
      }
      var sequence = Promise.resolve();
      appTypes.forEach(function (appType) {
        if (appType.toLowerCase().indexOf("placeholder") == -1) {
          sequence = sequence.then(function () {
            return new Promise(function (seqFulfill, seqReject) {
              var appIndex = SC_state.getIn(keypath).findIndex(app => app.get("type") === appType);
              if (appIndex == -1) {
                var appState = Immutable.fromJS({
                  "meta": {
                    "type": appType,
                    "strapped": 0,
                    "debug": false
                  },
                  "state": {}
                });
                SC_state = SC_state.updateIn(keypath, appList => appList.push(appState));
              } else {
                var strapPath = keypath.slice(0);
                strapPath.push(appIndex, "meta", "strapped");
                if (SC_state.getIn(strapPath) === 1) {
                  fulfill();
                }
              }
              var scriptPromise = new Promise(function (loadDefFulfill, loadDefReject) {
                attemptLoadSCApp(appType).then(function () { loadDefFulfill(); });
              }).then(function () {
                var strapPromise = new Promise(function (appStrapFulfill, appStrapReject) {
                  $(appObj).data("SC_keypath", keypath.slice(0, -1));
                  var promise = eval("new " + appType.replace('"', '').replace(";", "") + "($(appObj));");
                  promise.then(function () {
                    appStrapFulfill();
                  });
                }).then(function () {
                  seqFulfill();
                });
              });
            });
          });
        }
      });
      sequence.then(function () {
        fulfill();
      });
    });
  }

  return new Promise(function (fulfill, reject) {
    var keypath = locateSCElement(["ADOM"], $(root).attr("id"));
    if (keypath == false) {
      keypath = locateSCElement(["ADOM"], $(root).parents("[sc_appobj='true']").attr("id"));
      if (keypath == false) {
        keypath = ["ADOM"];
      } else {
        keypath.push("children");
      }
      keypath = upsertElemToState(keypath, $(root));
    }
    else { $(root).empty(); }
    if (keypath[-1] != "apps") { keypath.push("apps"); }
    upsertElementApps(keypath, $(root)).then(function () {
      fulfill();
    });
  });
}
//////////////////////////


//Helper Functions
//////////////////
function SC_tryParse(JSONstring, srcApp) {
  try { return jQuery.parseJSON(JSONstring).result; }
  catch (e) { console.log("Sorry, " + srcApp + " data '" + JSONstring + "' could not be parsed as JSON."); }
}
function deepCopyArray(arr) { return JSON.parse(JSON.stringify(arr)); }
function logImmutable(state) { if (Immutable.isImmutable(state)) { console.dir(JSON.stringify(state.toJS(), null, 2)); } else { console.log("Attempted to log non-immutable: " + state); } }

function loadInlineAppCSS(appClassName, selector, styles) {
  if (!$("style[sc_app='" + appClassName + "']").length) {
    var styleTag = "<style type='text/css' SC_App='" + appClassName + "'> " + selector + "{ ";
    for (var style in styles) {
      if (!styles.hasOwnProperty(style)) continue;
      styleTag += style + ":" + styles[style] + ";";
    }
    styleTag += "}</style>";
    $(styleTag).appendTo("head");
  }
}

function loadCSS(hrefURL) {
  $("<link/>").appendTo("head").attr({
    rel: "stylesheet",
    type: "text/css"
  }).attr("href", hrefURL);
}

function loadScript(hrefURL) {
  return promise = new Promise(function (fulfill, reject) {
    script = document.createElement("script");
    script.type = "text/javascript";
    script.src = hrefURL;
    script.addEventListener("error", function (e) { fulfill("failed"); }, true);
    script.addEventListener("load", function (e) { fulfill("loaded"); }, false);
    document.head.appendChild(script);
  });
}

function attemptLoadSCApp(appType) {
  return new Promise(function (fulfill, reject) {
    if (SC_loadedApps.indexOf(appType) == -1) {
      var typePath = appType.split("_");
      loadScript("Assets/JS/Servercide/" + typePath[0] + "/" + typePath[0] + "_" + typePath[1] + "/" + appType + ".js").then(function (result) {
        if (result != "loaded") { throw "Could not load app definiton for " + appObj.attr("id"); }
        else { SC_loadedApps.push(appType); fulfill(); }
      });
    } else {
      fulfill();
    }
  });
}

function isValidSelector(selector) {
  if (typeof (selector) !== 'string') {
    return false;
  }
  try {
    var element = $(selector);
  } catch (error) {
    return false;
  }
  return element;
}

function runInSequence(funcs) {
  return new Promise(function (fulfillSeq, rejectSeq) {
    var sequence = Promise.resolve();
    funcs.forEach(function (func) {
      sequence = sequence.then(function () { return func() });
    });
    sequence = sequence.then(function () { fulfillSeq(); });
  });
}

function SC_isArray(toTest) { return toTest instanceof Array; }
function SC_isObject(toTest) { return (typeof toTest == 'object' && !(toTest instanceof Array || toTest instanceof jQuery || toTest == null)); }
function SC_isJQElement(toTest) { return toTest instanceof jQuery; }
function SC_typeOf(toTest) {
  if (SC_isJQElement(toTest)) return "element";
  if (SC_isObject(toTest)) return "object";
  if (SC_isArray(toTest)) return "array";
  if (toTest == null) return null;
  return "string";
}

var SC_resizeFuncs = [];
function SC_addResizeFunc(newFunc) { SC_resizeFuncs.push(newFunc); }
function SC_triggerResize() { for (var x = 0; x < SC_resizeFuncs.length; x++) { SC_resizeFuncs[x](); } }
$(window).resize(function () { SC_triggerResize(); });

var SC_postLoadFuncs = [];
function SC_addPostLoadFunc(newFunc) { SC_postLoadFuncs.push(newFunc); }
function SC_triggerPostLoad() { for (var x = 0; x < SC_postLoadFuncs.length; x++) { SC_postLoadFuncs[x](); } }
//////////////////


//Ajax Methods
//////////////
function RemoteCall(remoteURL, postData = {}, enable_logging = false) {
  postData = JSON.stringify(postData) || {};
  var callType = "POST";
  if (remoteURL.indexOf(".json") != -1) {
    callType = "GET";
  }

  return promise = new Promise(function (fulfill, reject) {
    $.ajax({
      type: callType,
      url: remoteURL,
      data: postData,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (msg) {
        if (enable_logging == 1) { console.log("Call to:  " + remoteURL + " - Succeeded: "); }

        // static files contained in msg, c# method results contained in msg.d
        if (remoteURL.indexOf("json") != -1) { fulfill(msg); }
        else { fulfill(msg.d); }
      },
      error: function (msg) {
        if (enable_logging == 1) { console.log("Call to: " + remoteURL + " - Failed: ", msg); }
        reject(console.error("Call to: " + remoteURL + " - Failed:", msg))
      },
    })
  });
}
//////////////
