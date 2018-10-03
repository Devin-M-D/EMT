var ServercideApps = [];
var onCompleteFuncs = [];
SC_loadedApps = [];
var SC_state = Immutable.fromJS({
  "globals": {},
  "ADOM": {}
});

$(function() {
  SC_retrieveGlobals();
  SC_discover($("html")).then(function() {
    SC_triggerResize();
    SC_storeGlobals();
    runInSequence(onCompleteFuncs).then(function() {
      SC_triggerResize();
      if ($("html").attr("debug") == "2" || $("html").attr("debug") == "3") {
        console.log("Servercide has finished recursing");
        logImmutable(SC_state);
      }
    });
  });
});
// HTML debug attr:
//  0 - no root level debug
//  1 - print initiation of each app
//  2 - print "finished recursing" and log full state
//  3 - print both 1 & 2
//
// SC debug attr:
//  0 - no debug
//  1 - print mapping attempts to parse app param vals from html
//  2 - print "app strapped" and the final initialized state, as well as onStrap(), postStrap(), and discoveryComplete() alerts
//  3 - print 1 + 2
//  4 - run user-defined debug logging and functions and
//  5 - print 1 & run 4
//  6 - print 2 & run 4
//  7 - print 1 + 2 & run 4

//Severcide core functions
//////////////////////////
function SC_retrieveGlobals(){
  if (localStorage.SC_globals != null && localStorage.SC_globals != undefined){
    SC_state.set("globals", Immutable.fromJS(localStorage.SC_globals));
  }
}
function SC_storeGlobals(){
  localStorage.SC_globals = SC_state.get("globals").toJS();
}
function SC_getGlobal(name){
  return SC_state.getIn(["globals", name]);
}

function SC_discover(searchRoot) {
  if ($("html").attr("debug") == "1" || $("html").attr("debug") == "3") { console.log("Discovering " + ($(searchRoot).is($("html")) ? "<html>" : $(searchRoot).attr("id"))); }
  function scrapeTopSCApps(root) {
    var skimmedApps = [];
    root.find("> *").filter("[sc_appobj='true']").each(function() {
      skimmedApps.push(this);
    }).end().filter("[sc_appobj!='true']").each(function() {
      skimmedApps = skimmedApps.concat(scrapeTopSCApps($(this)));
    });
    return skimmedApps;
  }

  return new Promise(function(fulfill, reject){
    new Promise(function(_fulfill, _reject){
      if (searchRoot.attr("sc_appobj") == "true") {
        SC_strap(searchRoot).then(function(){ _fulfill(); });
      }
      else{ _fulfill(); }
    }).then(function() {
        var nextLayer = scrapeTopSCApps(searchRoot);
        var nextLayerFuncs = [];
        nextLayer.forEach(function(obj) {
          nextLayerFuncs.push(function() { return SC_discover($(obj)); });
        });
        runInSequence(nextLayerFuncs).then(function() { fulfill(); });
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
    return new Promise(function(fulfill, reject) {
      var appTypes = [];
      if (appObj.attr("sc_apptype") != undefined) {
        appTypes = appObj.attr("sc_apptype").split(' ');
      }
      var sequence = Promise.resolve();
      appTypes.forEach(function(appType) {
        if (appType.toLowerCase().indexOf("placeholder") == -1) {
          sequence = sequence.then(function() {
            return new Promise(function(seqFulfill, reject) {
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
              var scriptPromise = new Promise(function(fulfill, reject) {
                attemptLoadSCApp(appType).then(function() { fulfill(); });
              }).then(function() {
                var strapPromise = new Promise(function(appStrapped, reject) {
                  $(appObj).data("SC_keypath", keypath.slice(0, -1));
                  var promise = eval("new " + appType.replace('"', '').replace(";", "") + "($(appObj));");
                  promise.then(function() {
                    appStrapped();
                  });
                }).then(function() {
                  seqFulfill();
                });
              });
            });
          });
        }
      });
      sequence.then(function() {
        fulfill();
      });
    });
  }

  return new Promise(function(fulfill, reject) {
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
    keypath.push("apps");
    upsertElementApps(keypath, $(root)).then(function() {
      fulfill();
    });
  });
}

var ServercideApp = function(appObj, element, appType, defaultParams = {}) {
  var SC_ = this;
  SC_.appObj = appObj;
  SC_.element = $(element);
  SC_.maps = {
    "templates": [],
    "inputs": []
  };
  var appState = Immutable.Map();
  var appPath = $(SC_.element).data("SC_keypath").slice(0)
  appPath = appPath.concat(["apps"]);
  var appIdx = SC_state.getIn(appPath).findIndex(function(appToFind) { return appToFind.get("meta").get("type") === appType; });
  SC_.siblingIndex = 0;
  if ($(SC_.element).data(appType) != undefined) { SC_.siblingIndex = $(SC_.element).data(appType).length }
  appPath.push(appIdx);
  SC_.appPath = appPath;

  var metaPath = appPath.slice(0);
  metaPath = metaPath.concat(["meta"]);
  SC_.metaPath = metaPath;

  var statePath = appPath.slice(0);
  statePath.push("state");
  SC_state = SC_state.setIn(statePath, appState);
  SC_.statePath = statePath;

  SC_.getMetaState = function() { return SC_state.getIn(SC_.metaPath); }
  SC_.getMetaParam = function(param) { return SC_state.getIn(SC_.metaPath.concat([param])); }
  SC_.setMetaParam = function(param, value) { SC_state = SC_state.setIn(SC_.metaPath.concat([param]), value); SC_.setInHTML(); }

  SC_.getState = function() { return SC_state.getIn(SC_.statePath); }
  SC_.getParam = function(paramPath) {
    var stateChunk = SC_state.getIn(statePath);
    if (!SC_isArray(paramPath)){ stateChunk = stateChunk.get(paramPath); }
    else {
      for (var x = 0; x < paramPath.length; x++){
        if (Immutable.isImmutable(stateChunk)){ stateChunk = stateChunk.get(paramPath[x]); }
        else { stateChunk = stateChunk[paramPath[x]]; }
      }
    }
    if (stateChunk != undefined && Immutable.isImmutable(stateChunk)) { return stateChunk.toJS(); }
    else { return stateChunk; }
  }
  SC_.setParam = function(paramPath, value) { SC_state = SC_state.setIn(statePath.concat(paramPath), value); SC_.setInHTML(); }

  SC_.getParent = function(appType, index = 0) {
    var parentPath = SC_.statePath.slice(0,-5);
    var parentState = SC_state.getIn(parentPath).toJS();
    return $("#" + parentState.elem).data(appType)[index];
  }
  SC_.getParentElement = function() {
    var parentPath = SC_.statePath.slice(0,-5);
    var parentState = SC_state.getIn(parentPath).toJS();
    return $("#" + parentState.elem);
  }
  SC_.getParents = function(appType) {
    var parentPath = SC_.statePath.slice(0,-5);
    var parentState = SC_state.getIn(parentPath).toJS();
    return $("#" + parentState.elem).data(appType);
  }
  SC_.getChild = function(appType, index = 0) { return SC_.element.find("[sc_apptype='" + appType + "']").data(appType)[index]; }
  SC_.getChildElement = function(appType, index = 0) { return SC_.element.find("[sc_apptype='" + appType + "']"); }
  SC_.getChildren = function(appType) { return SC_.element.find("[sc_apptype='" + appType + "']").data(appType); }
  SC_.getSibling = function(appType, index = 0) { return SC_.statePath; }
  SC_.printApps = function() {
    var objPath = SC_.statePath.slice(0,-3);
    var objState = SC_state.getIn(objPath).toJS();
    return objState;
  }

  SC_.setDebugging = function(setting){ SC_.setMetaParam("debug", setting); }
  SC_.debugMsg = function(message, debugTypes = [0], trace = false){
    if (debugTypes.indexOf(SC_.getMetaParam("debug")) != -1 || (debugTypes == [0] && SC_.getMetaParam("debug") != 0)){
        if (trace) console.error('sc_debugger: ' + message);
        else{ console.log(message); }
    }
  }
  SC_.debugFunc = function(func, debugTypes = [0]) {
    if (debugTypes.indexOf(SC_.getMetaParam("debug")) != -1 || (debugTypes == [0] && SC_.getMetaParam("debug") != 0)){
        func();
    }
  }
  SC_.setInHTML = function() {
    if ($(SC_.element).data(appType) == undefined){ $(SC_.element).data(appType, [SC_.appObj]); }
    else {
      var siblings = $(SC_.element).data(appType);
      if (siblings.length == SC_.siblingIndex){
        $(SC_.element).data(appType, siblings.push(SC_.appObj));
      }
      else {
        siblings[SC_.siblingIndex] = SC_.appObj;
      }
    }
  }
  SC_.setDebugging(SC_.element.attr("debug"));
  SC_.setMetaParam("strapped", 1);

  return new Promise(function(fulfill, reject) {
    function loadParams(defaultParam, element, tracer, allowDefault = true){
      function searchParam(formalName, element){
        if (SC_.element.attr(formalName) != undefined) { return SC_.element.attr(formalName); }
        else if (SC_.element.data(formalName) != undefined) { return SC_.element.data(formalName); }
        else if (SC_.element.find(formalName).length > 0)  { return $($(SC_.element.find(formalName))[0]); }
        else { return null; }
      }

      function globalCheck(paramKey, val){
        if (paramKey.indexOf("g:") == 0){
          paramKey = paramKey.substring(2, paramKey.length);
          SC_state = SC_state.setIn(["globals", paramKey], Immutable.fromJS(val));
          return true;
        }
        return false;
      }

      function handlebarsCheck(paramKey){
        if (paramKey.indexOf("{{") != -1 || paramKey.indexOf("[[") != -1) {
          var resultDir = [];
          if (paramKey[0] == "<" || paramKey[0] == ">" || paramKey[0] == "^"){
            resultDir.push(paramKey[0]);
            paramKey = paramKey.substring(1, paramKey.length);
          }
          var mapIndex = paramKey[0];
          var mapPart = "";
          if (paramKey.indexOf("{{") == 1) { mapPart = "{"; }
          else { mapPart = "["; }

          paramKey = paramKey.substring(3, paramKey.length - 2);
          paramKey = handlebarsCheck(paramKey);
          var paramPath = resultDir.concat(deepCopyArray(tracer));
          paramPath.push(paramKey);

          if (mapPart == "{"){
            if (!SC_isArray(SC_.maps.templates[mapIndex])){ SC_.maps.templates[mapIndex] = []; }
            SC_.maps.templates[mapIndex].push(paramPath);
          }
          else if (mapPart == "["){
            if (!SC_isArray(SC_.maps.inputs[mapIndex])) { SC_.maps.inputs[mapIndex] = []; }
            SC_.maps.inputs[mapIndex].push(paramPath);
          }
        }
          return paramKey;
      }

      var vanillaParam = {};

      for (var paramKey in defaultParam){
        var defaultVal = defaultParam[paramKey];
        if (globalCheck(paramKey, defaultVal)){ continue; }

        var isMap = false;
        var ogParamKey = paramKey
        paramKey = handlebarsCheck(paramKey);
        if (ogParamKey != paramKey){ isMap = true; }
        var formalName = (appType + "_" + tracer.join("_") + ((tracer.length > 0) ? "_" : "") + paramKey).toLowerCase();
        var paramInput = searchParam(formalName, SC_.appObj);

        if (paramInput == null){
          if (!allowDefault) {continue;}

          if (SC_typeOf(defaultVal) == "object"){
            var deeperTracer = deepCopyArray(tracer);
            deeperTracer.push(paramKey);
            paramInput = loadParams(defaultVal, $(SC_.appObj), deeperTracer, allowDefault);
          }
          else {
            paramInput = defaultVal;
          }
        }
        else if (SC_typeOf(paramInput) == "element"){
          if (paramInput.attr("value") != undefined) { var tmp = paramInput.attr("value"); paramInput.remove(); paramInput = tmp; }
          else if (paramInput.attr("htmlParam") == "true") { var tmp = $.trim(paramInput.html()); paramInput.remove(); paramInput = tmp; }
          else if (SC_isObject(defaultVal)) {
            var deeperTracer = deepCopyArray(tracer);
            deeperTracer.push(paramKey);
            var elem = paramInput;
            paramInput = loadParams(defaultVal, paramInput, deeperTracer, false);
            elem.remove();
          }
          else if (SC_isArray(defaultVal)){
            var paramItems = [];
            paramInput.children("item").each(function(idx, item) {
              var itemVal = "";
              if ($(item).attr("value") != undefined) { itemVal = $(item).attr("value"); }
              else if ($(item).attr("htmlParam") == "true") { itemVal = $(item).html(); }
              else { itemVal = $(item).html(); }

              if (isMap) { itemVal = itemVal.split($(item).attr("delimiter")); }
              paramItems.push(itemVal);
            });
            paramInput.remove();
            paramInput = paramItems;
          }
        }

        // once a paramInput value is settled on, coerce type if necesssary
        if (SC_typeOf(paramInput) == SC_typeOf(defaultVal)){ vanillaParam[paramKey] = paramInput; }
        else if (SC_isJQElement(defaultVal)){
          if (typeof paramInput == "string") { vanillaParam[paramKey] = $(paramInput) }
          else {
            console.log("Error: Expected an element for #" + SC_.element.attr("id") + " parameter " + formalName + " but did not recieve jquery object or string. Using default parameter value.");
            vanillaParam[paramKey] = defaultVal;
          }
        }
        else if (SC_isArray(defaultVal)){
          try {
            paramInput = JSON.parse(paramInput);
            if (SC_isArray(paramInput)){ vanillaParam[paramKey] = paramInput; }
            else {
              console.log("Error: Able to parse JSON input for #" + SC_.element.attr("id") + " parameter " + formalName + " but did not produce an array. Using default parameter value.");
              vanillaParam[paramKey] = defaultVal;
            }
          }
          catch(e) {
            console.log("Error: Unable to parse JSON input for #" + SC_.element.attr("id") + " parameter " + formalName + ". Using default parameter value.");
            SC_.debugFunc(function() { console.log("attempted to use: ", paramInput); }, [1, 3, 5, 7]);
            SC_.debugFunc(function() { console.log("default param value: ", defaultVal); }, 1, 3);
            vanillaParam[paramKey] = defaultVal;
          }
        }
        else if (SC_isObject(defaultVal)){
          if(SC_isArray(paramInput) ){
            console.log("Error: Expected an object for #" + SC_.element.attr("id") + " param " + formalName + " but found an array! Using default parameter value.");
            vanillaParam[paramKey] = defaultVal;
          }
          else if (paramInput != null){
            try {
              paramInput = JSON.parse(paramInput);
              vanillaParam[paramKey] = paramInput;
            }
            catch(e) {
              if (SC_typeOf(paramInput) == "string"){
                vanillaParam[paramKey] = paramInput;
              }
              else {
                console.log("Error: Unable to parse JSON input for #" + SC_.element.attr("id") + " parameter " + formalName + ". Using default parameter value.");
                SC_.debugFunc(function() { console.log("attempted to use: ", paramInput); }, [1, 3, 5, 7]);
                SC_.debugFunc(function() { console.log("default param value: ", defaultVal); }, [1, 3, 5, 7]);
                vanillaParam[paramKey] = defaultVal;
              }
            }
          }
        }
      }
      return vanillaParam;
    }

    function processMaps(){
      function unbalancedMapCheck(checkParamPath, type){
        if (SC_.getParam(checkParamPath) == undefined){
          if (type == "template"){ SC_.debugMsg("Found empty handlebar map template. Skipping this map.", [1, 3, 5, 7]); }
          if (type == "input"){ SC_.debugMsg("Found empty handlebar map input " + inputParamPath[inputParamPath.length-1] + ". Skipping this input.", [1, 3, 5, 7]); }
          return true;
        }
      }

      function replaceHandlebars(template, input, inputIdx, inputParamPath){
        var result = template;
        if (SC_typeOf(input) == "array"){
          if (SC_typeOf(template) == "array"){
            result = [];
            if (input.length == template.length){
              if (SC_typeOf(input[0]) == "array"){
                for (var x = 0; x < input.length; x++)
                {
                  result.push(replaceHandlebars(template[x], input[x].join(""), x, inputParamPath));
                }
              }
              else {
                for (var x = 0; x < input.length; x++)
                {
                  result.push(replaceHandlebars(template[x], input[x], x, inputParamPath));
                }
              }
            }
            else {
              for (var x = 0; x < template.length; x++)
              {
                var templateItem = template[x];
                for (var y = 0; y < input.length; y++)
                {
                  templateItem = (replaceHandlebars(templateItem, input[y], y, inputParamPath));
                }
                result.push(templateItem);
              }
            }
          }
          else {
            if (template.search(new RegExp("\\{\\{" + inputParamPath[inputParamPath.length-1] + ":\\d+\\}\\}", "gi")) != -1 && SC_typeOf(input[0]) != 'array') {
              for (var x = 0; x < input.length; x++){
                result = replaceHandlebars(result, input[x], x, inputParamPath);
              }
            }
            else {
              result = [];
              for (var x = 0; x < input.length; x++){
                result.push(replaceHandlebars(template, input[x], x, inputParamPath));
              }
            }
          }
        }
        else if (SC_typeOf(input) == "string"){
          if (SC_typeOf(template) == "string") {
            var mapResult = template.replace(new RegExp("\\{\\{" + inputParamPath[inputParamPath.length-1] + ":" + inputIdx + "\\}\\}", "gi"), input);
            result = mapResult.replace(new RegExp("\\{\\{" + inputParamPath[inputParamPath.length-1] + "\\}\\}", "gi"), input);
          }
          else if (SC_typeOf(template) == "array"){
            result = [];
            for (var y = 0; y < template.length; y++){
              result.push(replaceHandlebars(template[y], input, inputIdx, inputParamPath));
            }
          }
        }
        return result;
      }
      for (var mapIndex = 0; mapIndex < SC_.maps.templates.length; mapIndex++){
        SC_.debugFunc(function(){
          console.log("mapping index #" + mapIndex + ": ", SC_.maps.inputs[mapIndex], " into ", SC_.maps.templates[mapIndex]);
        }, [1, 3, 5, 7]);
        var mapTemplates = SC_.maps.templates[mapIndex];
        var mapInputs = SC_.maps.inputs[mapIndex];

        for (var templateIndex = 0; templateIndex < mapTemplates.length; templateIndex++){

          var templatePath = mapTemplates[templateIndex];
          if (unbalancedMapCheck(templatePath, "template")) { continue; }

          template = SC_.getParam(mapTemplates[templateIndex]);
          for (var inputIndex = 0; inputIndex < mapInputs.length; inputIndex++){

            var inputParamPath = deepCopyArray(mapInputs[inputIndex]);
            var dir = ">";
            if (inputParamPath[0] == "<"){ dir = "<"; }
            else if (inputParamPath[0] == "^"){ dir = "^"; }
            if (inputParamPath[0] == "<" || inputParamPath[0] == "^" || inputParamPath[0] == ">"){ inputParamPath.shift(); }
            if (unbalancedMapCheck(inputParamPath, "input")) { continue; }

            var input = SC_.getParam(inputParamPath);
            SC_.debugFunc(function() {
              console.log("    mapping ", input);
              console.log("    into ", template);
            }, [1, 3, 5, 7]);
            var mergedVal = replaceHandlebars(template, input, 0, inputParamPath);
            SC_.debugFunc(function(){
              console.log("result of mapping index #", mapIndex);
              console.log(mergedVal)
            }, [1, 3, 5, 7]);
            if (dir == ">"){ SC_state = SC_state.setIn(statePath.concat(inputParamPath), mergedVal); }
            else if (dir == "<"){ SC_state = SC_state.setIn(statePath.concat(templatePath), mergedVal); }
            else if (dir == "^"){ SC_state = SC_state.setIn(statePath.concat(templatePath.slice(0, -1)), mergedVal); }
          }
        }
      }
    }

    var vanillaState = loadParams(defaultParams, SC_.element, []);
    SC_state = SC_state.setIn(statePath, Immutable.fromJS(vanillaState));
    processMaps();
    SC_.debugFunc(function(){
      console.log(SC_.element.attr("id") + " app " + appType + " initial params have been set, state is: ");
      logImmutable(SC_.getState());
      console.log("------------------");
    }, [2, 3, 6, 7]);
    if (SC_.appObj != false && SC_.appObj != undefined){
      SC_.setInHTML();
      SC_.appObj.onStrap(SC_.appObj).then(function(){
        SC_state = SC_state.setIn(metaPath.concat(["strapped"]), 1);
        if (SC_.appObj.discoveryComplete != false && SC_.appObj.discoveryComplete != undefined && SC_.appObj.discoveryComplete != null){
          onCompleteFuncs.push(function() { return SC_.appObj.discoveryComplete(SC_.appObj); });
        }
        fulfill();
      });
    }
    else {
      reject();
    }
  });
}
//////////////////////////


//Helper Functions
//////////////////
function SC_tryParse(JSONstring, srcApp){
  try{ return jQuery.parseJSON(JSONstring).result; }
  catch (e) { console.log("Sorry, " + srcApp + " data '" + JSONstring + "' could not be parsed as JSON."); }
}
function deepCopyArray(arr) { return JSON.parse(JSON.stringify(arr)); }
function logImmutable(state) { if (Immutable.isImmutable(state)) { console.dir(JSON.stringify(state.toJS(), null, 2)); } else { console.log("Attempted to log non-immutable: " + state); } }

function loadInlineAppCSS(appClassName, selector, styles){
  if (!$("style[sc_app='" + appClassName + "']").length){
    var styleTag = "<style type='text/css' SC_App='" + appClassName + "'> " + selector + "{ ";
    for (var style in styles) {
      if(!styles.hasOwnProperty(style)) continue;
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
  return promise = new Promise(function(fulfill, reject) {
    script = document.createElement("script");
    script.type = "text/javascript";
    script.src = hrefURL;
    script.addEventListener("error", function(e) { fulfill("failed"); }, true);
    script.addEventListener("load", function(e) { fulfill("loaded"); }, false);
    document.head.appendChild(script);
  });
}

function attemptLoadSCApp(appType) {
  return new Promise(function(fulfill, reject){
    if (SC_loadedApps.indexOf(appType) == -1) {
      var typePath = appType.split("_");
      loadScript("Assets/JS/Servercide/" + typePath[0] + "/" + typePath[0] + "_" + typePath[1] + "/" + appType + ".js").then(function(result) {
        if (result != "loaded"){ throw "Could not load app definiton for " + appObj.attr("id"); }
        else { SC_loadedApps.push(appType); fulfill(); }
      });
    } else {
      fulfill();
    }
  });
}

function isValidSelector(selector) {
  if (typeof(selector) !== 'string') {
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

function SC_isArray(toTest){ return toTest instanceof Array; }
function SC_isObject(toTest){ return (typeof toTest == 'object' && !(toTest instanceof Array || toTest instanceof jQuery || toTest == null)); }
function SC_isJQElement(toTest){ return toTest instanceof jQuery; }
function SC_typeOf(toTest){
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
  if (remoteURL.indexOf(".json") != -1){
    callType = "GET";
  }

  return promise = new Promise(function(fulfill, reject) {
    $.ajax({
      type: callType,
      url: remoteURL,
      data: postData,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(msg) {
        if (enable_logging == 1) { console.log("Call to:  " + remoteURL + " - Succeeded: "); }

        // static files contained in msg, c# method results contained in msg.d
        if (remoteURL.indexOf("json") != -1){ fulfill(msg); }
        else { fulfill(msg.d); }
      },
      error: function(msg) {
        if (enable_logging == 1) { console.log("Call to: " + remoteURL + " - Failed: ", msg);  }
        reject(console.error(msg.d))
      },
    })
  });
}

function fileUpload() {
  var formData = new FormData();
  formData.append('file', $('#fileElem')[0].files[0]);
  //formData.append('filenmae', 'user-entered_filename_string');
  $.ajax({
    type: 'post',
    url: "/Assets/EventHandlers/Uploader.ashx",
    data: formData,
    success: function(status) {
      alert(status);
      if (status != 'error') {
        var my_path = "/Assets/Uploads/" + status;
        $("#myUploadedImg").attr("src", my_path);
      }
    },
    processData: false,
    contentType: false,
    error: function() {
      alert("Whoops something went wrong!");
    },
    complete: function(data) {}
  });
}
//////////////
