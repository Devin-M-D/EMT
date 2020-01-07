class ServercideApp {
    constructor(appProto, element, appType, defaultParams = {}) {
        this.is = "ServercideApp";
        var SC_ = this;
        this.element = $(element);
        this.maps = {
            "templates": [],
            "inputs": []
        };
        appProto.element = element;
        appProto.is = appType;

        var appState = Immutable.Map();
        var appPath = $(this.element).data("SC_keypath").slice(0)
        appPath = appPath.concat(["apps"]);
        var appIdx = SC_state.getIn(appPath).findIndex(function (appToFind) { return appToFind.get("meta").get("type") === appType; });
        appProto.siblingIndex = 0;
        if ($(this.element).data(appType) != undefined) { appProto.siblingIndex = $(element).data(appType).length }
        appPath.push(appIdx);
        appProto.appPath = appPath;

        var metaPath = appPath.slice(0);
        metaPath = metaPath.concat(["meta"]);
        appProto.metaPath = metaPath;

        var statePath = appPath.slice(0);
        statePath.push("state");
        SC_state = SC_state.setIn(statePath, appState);
        appProto.statePath = statePath;

        appProto.getMetaState = function () { return SC_state.getIn(appProto.metaPath); }
        appProto.getMetaParam = function (param) { return SC_state.getIn(appProto.metaPath.concat([param])); }
        appProto.setMetaParam = function (param, value) { SC_state = SC_state.setIn(appProto.metaPath.concat([param]), value); appProto.setInHTML(); }

        appProto.getState = function () { return SC_state.getIn(this.statePath); }
        appProto.getParam = function (paramPath) {
            var stateChunk = SC_state.getIn(statePath);
            if (!SC_isArray(paramPath)) { stateChunk = stateChunk.get(paramPath); }
            else {
                for (var x = 0; x < paramPath.length; x++) {
                    if (Immutable.isImmutable(stateChunk)) { stateChunk = stateChunk.get(paramPath[x]); }
                    else { stateChunk = stateChunk[paramPath[x]]; }
                }
            }
            if (stateChunk != undefined && Immutable.isImmutable(stateChunk)) { return stateChunk.toJS(); }
            else { return stateChunk; }
        }
        appProto.setParam = function (paramPath, value) { SC_state = SC_state.setIn(statePath.concat(paramPath), value); this.setInHTML(); }

        appProto.getParent = function (appType, index = 0) {
            var parentPath = this.statePath.slice(0, -5);
            var parentState = SC_state.getIn(parentPath).toJS();
            return $("#" + parentState.elem).data(appType)[index];
        }
        appProto.getParentElement = function () {
            var parentPath = this.statePath.slice(0, -5);
            var parentState = SC_state.getIn(parentPath).toJS();
            return $("#" + parentState.elem);
        }
        appProto.getChild = function (appType, index = 0) { return this.element.find("[sc_apptype='" + appType + "']").data(appType)[index]; }
        appProto.getChildElement = function (appType, index = 0) { return this.element.find("[sc_apptype='" + appType + "']")[index]; }
        appProto.getChildren = function (appType) { return this.element.find("[sc_apptype='" + appType + "']").data(appType); }
        appProto.printApps = function () {
            var objPath = this.statePath.slice(0, -3);
            var objState = SC_state.getIn(objPath).toJS();
            return objState;
        }

        appProto.setDebugging = function (setting) { this.setMetaParam("debug", setting); }
        appProto.debugMsg = function (message, debugType = 4, trace = false) {
            function runMsg() {
                if (trace) console.error('sc_debugger: ' + message);
                else { console.log(message); }
            }
            var debugLvl = appProto.getMetaParam("debug");
            if (debugLvl >= 4) {
                if (debugType == 4) { runMsg(); }
                debugLvl -= 4;
            }
            if (debugLvl >= 2) {
                if (debugType == 2) { runMsg(); }
                debugLvl -= 2;
            }
            if (debugLvl >= 1 && debugType == 1) { runMsg(); }
        }
        appProto.debugFunc = function (func, debugType = 4) {
            console.log(debugType);
            var debugLvl = appProto.getMetaParam("debug");
            if (debugLvl >= 4) {
                if (debugType == 4) { func(); }
                debugLvl -= 4;
            }
            if (debugLvl >= 2) {
                if (debugType == 2) { func(); }
                debugLvl -= 2;
            }
            if (debugLvl >= 1 && debugType == 1) { func(); }
        }
        appProto.setInHTML = function () {
            if ($(this.element).data(appType) == undefined) { $(this.element).data(appType, [this]); }
            else {
                var siblings = $(this.element).data(appType);
                if (siblings.length == appProto.siblingIndex) {
                    $(this.element).data(appType, siblings.concat(this));
                }
                else {
                    siblings[appProto.siblingIndex] = this;
                }
            }
        }
        appProto.onStrapMessage = () => {
            appProto.debugMsg(element.attr("id") + " app " + appType + " is strapping, running onStrap before recursion.", 2);
        }
        appProto.onStrapF = () => {
            appProto.onStrapMessage();
            return new Promise(function (fulfill, reject) {
                if (appProto.onStrap != null) {
                    appProto.onStrap(appProto).then(function () {
                        fulfill();
                    });
                }
                else {
                    fulfill();
                }
            });
        }
        appProto.postStrapMessage = () => {
            appProto.debugMsg(element.attr("id") + " app " + appType + " is strapping, adding to the postStrap queue.", 2);
        }
        appProto.postStrapF = () => {
            appProto.postStrapMessage();
            return new Promise(function (fulfill, reject) {
                if (appProto.postStrap != null) {
                    appProto.postStrap(appProto).then(function () {
                        fulfill();
                    });
                }
                else {
                    fulfill();
                }
            });
        }
        appProto.discoveryCompleteMessage = () => {
            appProto.debugMsg("Recursive Servercide discovery complete, running discoveryComplete function of " + element.attr("id") + " app " + appType + ".", 2);
        }
        appProto.discoveryCompleteF = () => {
            appProto.discoveryCompleteMessage();
            return new Promise(function (fulfill, reject) {
                if (appProto.discComplete != null) {
                    appProto.discComplete(appProto).then(function () {
                        fulfill();
                    });
                }
                else {
                    fulfill();
                }
            });
        }

        appProto.setDebugging(this.element.attr("debug"));
        appProto.setMetaParam("strapped", 1);

        return new Promise(function (fulfill, reject) {
            function loadParams(defaultParam, element, tracer, allowDefault = true) {
                function searchParam(formalName, element) {
                    if (appProto.element.attr(formalName) != undefined) { return appProto.element.attr(formalName); }
                    else if (appProto.element.data(formalName) != undefined) { return appProto.element.data(formalName); }
                    else if (appProto.element.find(formalName).length > 0) { return $($(appProto.element.find(formalName))[0]); }
                    else { return null; }
                }

                function globalCheck(paramKey, val) {
                    if (paramKey.indexOf("g:") == 0) {
                        paramKey = paramKey.substring(2, paramKey.length);
                        SC_state = SC_state.setIn(["globals", paramKey], Immutable.fromJS(val));
                        return true;
                    }
                    return false;
                }

                function handlebarsCheck(paramKey) {
                    if (paramKey.indexOf("{{") != -1 || paramKey.indexOf("[[") != -1) {
                        var resultDir = [];
                        if (paramKey[0] == "<" || paramKey[0] == ">" || paramKey[0] == "^") {
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

                        if (mapPart == "{") {
                            if (!SC_isArray(SC_.maps.templates[mapIndex])) { SC_.maps.templates[mapIndex] = []; }
                            SC_.maps.templates[mapIndex].push(paramPath);
                        }
                        else if (mapPart == "[") {
                            if (!SC_isArray(this.maps.inputs[mapIndex])) { SC_.maps.inputs[mapIndex] = []; }
                            SC_.maps.inputs[mapIndex].push(paramPath);
                        }
                    }
                    return paramKey;
                }

                var vanillaParam = {};

                for (var paramKey in defaultParam) {
                    var defaultVal = defaultParam[paramKey];
                    if (globalCheck(paramKey, defaultVal)) { continue; }

                    var isMap = false;
                    var ogParamKey = paramKey
                    paramKey = handlebarsCheck(paramKey);
                    if (ogParamKey != paramKey) { isMap = true; }
                    var formalName = (appType + "_" + tracer.join("_") + ((tracer.length > 0) ? "_" : "") + paramKey).toLowerCase();
                    var paramInput = searchParam(formalName, this);

                    if (paramInput == null) {
                        if (!allowDefault) { continue; }

                        if (SC_typeOf(defaultVal) == "object") {
                            var deeperTracer = deepCopyArray(tracer);
                            deeperTracer.push(paramKey);
                            paramInput = loadParams(defaultVal, $(this), deeperTracer, allowDefault);
                        }
                        else {
                            paramInput = defaultVal;
                        }
                    }
                    else if (SC_typeOf(paramInput) == "element") {
                        if (paramInput.attr("value") != undefined) { var tmp = paramInput.attr("value"); paramInput.remove(); paramInput = tmp; }
                        else if (paramInput.attr("htmlParam") == "true") { var tmp = $.trim(paramInput.html()); paramInput.remove(); paramInput = tmp; }
                        else if (SC_isObject(defaultVal)) {
                            var deeperTracer = deepCopyArray(tracer);
                            deeperTracer.push(paramKey);
                            var elem = paramInput;
                            paramInput = loadParams(defaultVal, paramInput, deeperTracer, false);
                            elem.remove();
                        }
                        else if (SC_isArray(defaultVal)) {
                            var paramItems = [];
                            paramInput.children("item").each(function (idx, item) {
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
                    if (SC_typeOf(paramInput) == SC_typeOf(defaultVal)) { vanillaParam[paramKey] = paramInput; }
                    else if (SC_isJQElement(defaultVal)) {
                        if (typeof paramInput == "string") { vanillaParam[paramKey] = $(paramInput) }
                        else {
                            console.log("Error: Expected an element for #" + this.element.attr("id") + " parameter " + formalName + " but did not recieve jquery object or string. Using default parameter value.");
                            vanillaParam[paramKey] = defaultVal;
                        }
                    }
                    else if (SC_isArray(defaultVal)) {
                        try {
                            paramInput = JSON.parse(paramInput);
                            if (SC_isArray(paramInput)) { vanillaParam[paramKey] = paramInput; }
                            else {
                                console.log("Error: Able to parse JSON input for #" + this.element.attr("id") + " parameter " + formalName + " but did not produce an array. Using default parameter value.");
                                vanillaParam[paramKey] = defaultVal;
                            }
                        }
                        catch (e) {
                            console.log("Error: Unable to parse JSON input for #" + this.element.attr("id") + " parameter " + formalName + ". Using default parameter value.");
                            appProto.debugFunc(function () { console.log("attempted to use: ", paramInput); }, 1);
                            appProto.debugFunc(function () { console.log("default param value: ", defaultVal); }, 1);
                            vanillaParam[paramKey] = defaultVal;
                        }
                    }
                    else if (SC_isObject(defaultVal)) {
                        if (SC_isArray(paramInput)) {
                            console.log("Error: Expected an object for #" + this.element.attr("id") + " param " + formalName + " but found an array! Using default parameter value.");
                            vanillaParam[paramKey] = defaultVal;
                        }
                        else if (paramInput != null) {
                            try {
                                paramInput = JSON.parse(paramInput);
                                vanillaParam[paramKey] = paramInput;
                            }
                            catch (e) {
                                if (SC_typeOf(paramInput) == "string") {
                                    vanillaParam[paramKey] = paramInput;
                                }
                                else {
                                    console.log("Error: Unable to parse JSON input for #" + this.element.attr("id") + " parameter " + formalName + ". Using default parameter value.");
                                    appProto.debugFunc(function () { console.log("attempted to use: ", paramInput); }, 1);
                                    appProto.debugFunc(function () { console.log("default param value: ", defaultVal); }, 1);
                                    vanillaParam[paramKey] = defaultVal;
                                }
                            }
                        }
                    }
                }
                return vanillaParam;
            }

            function processMaps() {
                function unbalancedMapCheck(checkParamPath, type) {
                    if (this.getParam(checkParamPath) == undefined) {
                        if (type == "template") { this.debugMsg("Found empty handlebar map template. Skipping this map.", 1); }
                        if (type == "input") { this.debugMsg("Found empty handlebar map input " + inputParamPath[inputParamPath.length - 1] + ". Skipping this input.", 1); }
                        return true;
                    }
                }

                function replaceHandlebars(template, input, inputIdx, inputParamPath) {
                    var result = template;
                    if (SC_typeOf(input) == "array") {
                        if (SC_typeOf(template) == "array") {
                            result = [];
                            if (input.length == template.length) {
                                if (SC_typeOf(input[0]) == "array") {
                                    for (var x = 0; x < input.length; x++) {
                                        result.push(replaceHandlebars(template[x], input[x].join(""), x, inputParamPath));
                                    }
                                }
                                else {
                                    for (var x = 0; x < input.length; x++) {
                                        result.push(replaceHandlebars(template[x], input[x], x, inputParamPath));
                                    }
                                }
                            }
                            else {
                                for (var x = 0; x < template.length; x++) {
                                    var templateItem = template[x];
                                    for (var y = 0; y < input.length; y++) {
                                        templateItem = (replaceHandlebars(templateItem, input[y], y, inputParamPath));
                                    }
                                    result.push(templateItem);
                                }
                            }
                        }
                        else {
                            if (template.search(new RegExp("\\{\\{" + inputParamPath[inputParamPath.length - 1] + ":\\d+\\}\\}", "gi")) != -1 && SC_typeOf(input[0]) != 'array') {
                                for (var x = 0; x < input.length; x++) {
                                    result = replaceHandlebars(result, input[x], x, inputParamPath);
                                }
                            }
                            else {
                                result = [];
                                for (var x = 0; x < input.length; x++) {
                                    result.push(replaceHandlebars(template, input[x], x, inputParamPath));
                                }
                            }
                        }
                    }
                    else if (SC_typeOf(input) == "string") {
                        if (SC_typeOf(template) == "string") {
                            var mapResult = template.replace(new RegExp("\\{\\{" + inputParamPath[inputParamPath.length - 1] + ":" + inputIdx + "\\}\\}", "gi"), input);
                            result = mapResult.replace(new RegExp("\\{\\{" + inputParamPath[inputParamPath.length - 1] + "\\}\\}", "gi"), input);
                        }
                        else if (SC_typeOf(template) == "array") {
                            result = [];
                            for (var y = 0; y < template.length; y++) {
                                result.push(replaceHandlebars(template[y], input, inputIdx, inputParamPath));
                            }
                        }
                    }
                    return result;
                }
                for (var mapIndex = 0; mapIndex < SC_.maps.templates.length; mapIndex++) {
                    appProto.debugFunc(function () {
                        console.log("mapping index #" + mapIndex + ": ", SC_.maps.inputs[mapIndex], " into ", SC_.maps.templates[mapIndex]);
                    }, 1);
                    var mapTemplates = SC_.maps.templates[mapIndex];
                    var mapInputs = SC_.maps.inputs[mapIndex];

                    for (var templateIndex = 0; templateIndex < mapTemplates.length; templateIndex++) {

                        var templatePath = mapTemplates[templateIndex];
                        if (unbalancedMapCheck(templatePath, "template")) { continue; }

                        template = this.getParam(mapTemplates[templateIndex]);
                        for (var inputIndex = 0; inputIndex < mapInputs.length; inputIndex++) {

                            var inputParamPath = deepCopyArray(mapInputs[inputIndex]);
                            var dir = ">";
                            if (inputParamPath[0] == "<") { dir = "<"; }
                            else if (inputParamPath[0] == "^") { dir = "^"; }
                            if (inputParamPath[0] == "<" || inputParamPath[0] == "^" || inputParamPath[0] == ">") { inputParamPath.shift(); }
                            if (unbalancedMapCheck(inputParamPath, "input")) { continue; }

                            var input = this.getParam(inputParamPath);
                            appProto.debugFunc(function () {
                                console.log("    mapping ", input);
                                console.log("    into ", template);
                            }, 1);
                            var mergedVal = replaceHandlebars(template, input, 0, inputParamPath);
                            appProto.debugFunc(function () {
                                console.log("result of mapping index #", mapIndex);
                                console.log(mergedVal)
                            }, 1);
                            if (dir == ">") { SC_state = SC_state.setIn(statePath.concat(inputParamPath), mergedVal); }
                            else if (dir == "<") { SC_state = SC_state.setIn(statePath.concat(templatePath), mergedVal); }
                            else if (dir == "^") { SC_state = SC_state.setIn(statePath.concat(templatePath.slice(0, -1)), mergedVal); }
                        }
                    }
                }
            }

            var vanillaState = loadParams(defaultParams, element, []);
            SC_state = SC_state.setIn(statePath, Immutable.fromJS(vanillaState));
            processMaps();

            appProto.debugFunc(function () {
                console.log(SC_.element.attr("id") + " app " + appType + " initial params have been set, state is: ");
                logImmutable(appProto.getState());
                console.log("------------------");
            }, 2);

            if (SC_ != false && SC_ != undefined) {
                appProto.setInHTML();
                appProto.onStrapF(appProto).then(function () {
                    SC_state = SC_state.setIn(metaPath.concat(["strapped"]), 1);
                    appProto.postStrapF(SC_).then(function () {
                        onCompleteFuncs.push(function () { return appProto.discoveryCompleteF(SC_); });
                        fulfill();
                    })
                });
            }
            else {
                reject();
            }
        });
    }
}