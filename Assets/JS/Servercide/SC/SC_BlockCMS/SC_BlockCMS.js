//SC_BlockCMS
////////////////////////////
var SC_BlockCMS = function(element) {
  var defaultParams = {};
  var app = this;
  var promise = ServercideApp.call(this, app, element, "SC_BlockCMS", defaultParams).then(function(){ app.postStrap(app); });
  return promise;
}
SC_BlockCMS.prototype = Object.create(ServercideApp.prototype);

SC_BlockCMS.prototype.onStrap = function(app){
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
  return new Promise(function(fulfill, reject){
    fulfill();
  });
}

SC_BlockCMS.prototype.postStrap = function(app){
  app.debugMsg(app.element.attr("id") + " app " + app.getMetaParam("type") + " is strapping, running onStrap before recursion.", 2);
  return new Promise(function(fulfill, reject){
    fulfill();
  });
}

SC_BlockCMS.prototype.discoveryComplete = function(app){
  app.debugMsg("Recursive Servercide discovery complete, running discoveryComplete function of " + app.element.attr("id") + " app " + app.getMetaParam("type") + ".", 2);
  return new Promise(function(fulfill, reject){
    fulfill();
  });
}
////////////////////////////


// //BlockCMS//
// ////////////
// var SC_BlockCMSFirstLoad = 0;
//
// var SC_BlockCMSVars = {
//   editMode: false,
//   editActive: false,
//   editingBlock: null,
//   editingContent: false
// };
//
// var SC_BlockCMS = function (root, name) {
//   ServercideApp.call(this, root, name);
//   var app = this;
//   var root = $(this.root)
//
//   if (SC_BlockCMSFirstLoad == 0) {
//     SC_BlockCMSFirstLoad = 1;
//     loadCSS("Assets/JS/Servercide/SC_BlockCMS/SC_BlockCMS.css");
//
//     root.load("Assets/JS/Servercide/SC_BlockCMS/SC_BlockCMS.html .SC_editBtn", function () {
//       $(".SC_editBtn").on("click", function(event) { event.stopPropagation(); app.toggleEdit(); });
//
//       root.append('<span class="SC_floater" id="CMS_Tools"></span>');
//       $("#CMS_Tools").load("Assets/JS/Servercide/SC_BlockCMS/SC_BlockCMS.html #SC_CMSToolbelt");
//     });
//   }
//
//   $("[sc_apptype*='PlaceholderCMS']").each(function () {
//     $(this).attr("sc_apptype", $(this).attr("sc_apptype").replace("PlaceholderCMS", "BlockCMS"));
//   });
//
//   root.on("SC_BlockCMS", function () { app.editBlock(); }).on("click", function(event) { event.stopPropagation(); $(this).trigger("SC_BlockCMS"); });
//   SC_markProcessed("BlockCMS", this.name);
// }
// SC_BlockCMS.prototype = Object.create(ServercideApp.prototype);
//
// //Toggle edit on/off (global, only 1 CMS allowed)
// //***********************************************
// SC_BlockCMS.prototype.toggleEdit = function () {
//   var app = this;
//   var root = $(this.root);
//
//   if (SC_BlockCMSVars.editMode == false) {
//     SC_BlockCMSVars.editMode = true;
//     root.find(".SC_editBtn").html("Live Mode");
//   }
//   else {
//     if (SC_BlockCMSVars.editActive == true) { app.wrapUpBlockEdit(); }
//     SC_BlockCMSVars.editMode = false;
//     root.find(".SC_editBtn").html("Edit Mode");
//   }
// }
// //***********************************************
//
// //Functions for engaging an edit
// //******************************
// SC_BlockCMS.prototype.editBlock = function () {
//   var app = this;
//
//   if (SC_BlockCMSVars.editMode == true && SC_BlockCMSVars.editActive == false) {
//     SC_BlockCMSVars.editingBlock = $(app.root);
//     var block = $(SC_BlockCMSVars.editingBlock);
//
//     var prev_outline = block.css("outline") || "";
//     block.data({
//       og_left: block.css("left"),
//       og_top: block.css("top"),
//       og_pos: block.css("position"),
//       og_parent: block.parent().attr("id"),
//       og_outline: prev_outline
//     });
//
//     block.css("outline", "dashed thin black");
//     app.stageEdit();
//   }
// }
//
// SC_BlockCMS.prototype.stageEdit = function () {
//   SC_BlockCMSVars.editActive = true;
//   var app = this;
//   var block = $(this.root);
//
//   if (block.attr("sc_apptype").indexOf("VelcroTooltip") == -1){
//     block.attr("sc_apptype", block.attr("sc_apptype") + " VelcroTooltip").attr("sc_tooltipsrc", "#SC_CMSToolbelt");
//   }
//   SC_discover(block).then(function() {
//     block.trigger("SC_VelcroTooltip");
//
//     if (block.data("new") != "new") { app.configTools("default"); }
//     else { app.configTools("new").then(function () { $("#SC_tbltData").trigger("click"); }) }
//
//     block.off("click").on("click", function(event) { event.stopPropagation(); }).off("SC_BlockCMS").on("SC_BlockCMS", function () { app.wrapUpBlockEdit(); });
//   });
// }
// //******************************
//
// //Functions for terminating edits
// //*******************************
// SC_BlockCMS.prototype.wrapUpBlockEdit = function () {
//   var app = this;
//   var block = $(this.root);
//
//   return new Promise(function (fulfill, reject) {
//     if (block.find(".ui-draggable") != undefined) {
//       $(".ui-draggable").draggable("destroy");
//       $(".ui-resizable").resizable("destroy");
//     }
//     if (block.attr("sc_blockType") == "menu") {
//       $("ul[editrole='addMenu']").remove();
//       $("li[editrole='addMenuItem']").remove();
//     }
//
//     block.css("outline", block.data("og_outline"));
//     block.off("SC_BlockCMS").on("SC_BlockCMS", function () { app.editBlock(); });
//
//     app.configTools("closed");
//     SC_BlockCMSVars.editActive = false;
//     SC_BlockCMSVars.editingBlock = null;
//     fulfill();
//   });
// }
// //*******************************
//
// //Functions for editing block content
// //***********************************
// SC_BlockCMS.prototype.editBlockContent = function () {
//   var app = this;
//   var block = $(this.root);
//
//   if (SC_BlockCMSVars.editingContent == false) {
//     SC_BlockCMSVars.editingContent == true;
//
//     this.configTools("content");
//
//     if (block.attr("SC_blockType").toString().toLowerCase() == "container") {
//       block.children().draggable({
//         containment: "parent",
//         drag: function () {
//           //if ($(this).css("top") == "0px") { $(editingBlock).css("border-top", "solid thin red"); }
//           //if ($(this).css("left") == "0px") { $(editingBlock).css("border-left", "solid thin red"); }
//           //if ($(this).css("right") == "0px") { $(editingBlock).css("border-right", "solid thin red"); }
//           //if ($(this).css("bottom") == "0px") { $(editingBlock).css("border-bottom", "solid thin red"); }
//         },
//         stop: function (event, ui) { $(event.originalEvent.target).one('click', function (e) { e.stopImmediatePropagation(); }); }
//       });
//       block.children().resizable({
//         containment: "parent",
//         stop: function (event, ui) { $(event.originalEvent.target).one('click', function (e) { e.stopImmediatePropagation(); }); }
//       });
//
//       block.one("click", $.proxy(function (event) { event.stopPropagation(); this.dropNewBlock(event); }, this));
//     }
//     else if (block.attr("SC_blockType").toString().toLowerCase() == "html" || block.attr("SC_blockType").toString().toLowerCase() == "prop") {
//       $("#SC_CMSPane").css("display", "block").html('<textarea editrole="blockcontent" rows="5" style="display:block;height:100%;width:100%;">' + block.html() + '</textarea>');
//     }
//     else if (block.attr("sc_blockType").toString().toLowerCase() == "menu") {
//       app.manageMenuItems(block);
//     }
//   }
// }
//
// SC_BlockCMS.prototype.dropNewBlock = function (event) {
//   var app = this;
//   var block = $(this.root);
//   var offset = block.offset();
//   var top = Math.floor(event.pageY) - Math.floor(offset.top);
//   var left = Math.floor(event.pageX) - Math.floor(offset.left);
//
//   var parent_name = block.attr("id");
//   var highest = -1;
//   $("span[id^='" + parent_name + "_newblock']").each(function () {
//     if ($(this).attr("id").slice(-1) != "k") { highest = $(this).attr("id").slice(-1); }
// //    if ($(this).attr("id").slice(-1) == "k") { $(this).attr("id", parent_name + "_newblock0"); }
// //    else { $(this).attr("id", parent_name + "_newblock" + (parseInt($(this).attr("id").slice(-1)) + 1)) }
//   });
//
//   var newblock = "" +
//     "<span id='" + parent_name + "_newblock" + (parseInt(highest) + 1) + "' SC_appObj='true' SC_appType='BlockCMS' SC_blockType='html' style='top:" + top + "px;left:" + left + "px;position:absolute;display:inline-block;outline:dashed thin red;height:25%;width:25%;'>" +
//     "Your new block: <b>" + parent_name + "_newblock" + "</b>" +
//     "</span>";
//   block.append(newblock)
//   newblock = block.find("[id^='" + parent_name + "_newblock']")[0];
//   $(newblock).data("new", "new");
//
//   SC_discover(block).then(function () {
//     console.log("new block strapped");
//     app.wrapUpBlockEdit().then(function () {
//       $(newblock).trigger("click");
//     });
//   });
// }
//
// SC_BlockCMS.prototype.deleteBlock = function () {
//   var app = this;
//   var block = $(this.root);
//
//   var delRid = block.attr("SC_blockrid");
//   block.css("display", "none");
//   $(btnUndo).css("font-size", "18pt");
//
//   countdown(5, RemoteCall("Assets/JS/Servercide/SC_BlockCMS/SC_BlockCMS.html/", "DeleteBlock", { 'rid': delRid }))
//     .catch(function (data) { block.css("display", "block"); console.log("delete failed"); });
//   app.wrapUpBlockEdit();
// }
//
// SC_BlockCMS.prototype.saveBlockContent = function () {
//   var app = this;
//   var block = $(this.root);
//   var blockType = block.attr("SC_blockType").toString().toLowerCase();
//
//   if (blockType == "html" || blockType == "prop") {
//     var updateParams = {};
//     if (blockType == "html") { updateParams['content'] = $("textarea[editrole='blockcontent']").val(); }
//     else if (blockType == "prop") { updateParams[block.attr("SC_propName")] = $("textarea[editrole='blockcontent']").val(); }
//
//     RemoteCall("Assets/JS/Servercide/SC_BlockCMS/SC_BlockCMS.html/", "UpdateObject", { 'rid': block.attr("SC_blockrid"), 'props': updateParams }).then(function (data) {
//       block.html($("textarea[editrole='blockcontent']").val());
//       app.configTools("default");
//     });
//   }
//   //  else if (block.attr("SC_blockType").toString().toLowerCase() == "container") {
//   //    block.children().each(function () {
//   //      if ($(this).attr("SC_blockType") != undefined) {
//   //        alert($(this).attr("id") + ":" + $(this).css("height") + ":" + $(this).css("width") + ":" + $(this).css("left") + ":" + $(this).css("top"));
//   //      }
//   //    });
//   //  }
// }
// //***********************************
//
// //Functions for editing block data
// //********************************
// SC_BlockCMS.prototype.editBlockData = function () {
//   var app = this;
//   var block = $(this.root);
//
//   var styles = block.attr("style").split(";");
//   var styleRows = "";
//   for (i = 0; i < styles.length; i++) {
//     var styleName = "";
//     var styleVal = "";
//     if (styles[i] != "" && styles[i].indexOf("outline") == -1) {
//       styleName = styles[i].split(":")[0].trim();
//       styleVal = styles[i].split(":")[1].trim();
//     }
//     else if (styles[i] != "" && styles[i].indexOf("outline") != -1) {
//       styleName = "outline";
//       styleVal = block.data("og_outline");
//     }
//     new_row = "<tr>" +
//       "<td editrole='csskey'>" + styleName + "</td>" +
//       "<td><input type='text' editrole='cssval' value='" + styleVal + "' /></td>" +
//       "</tr>";
//     if (styles[i] != "") { styleRows = styleRows + new_row; }
//   }
//
//   var content = "";
//   if (block.attr("SC_blockType").toLowerCase() == "container") { content = block.attr("SC_appUrl"); }
//   else { content = block.html(); }
//
//   var title = "";
//   if (block.attr("id").indexOf("newblock") == -1) { title = "' value='" + block.attr("id") + "'"; }
//   else { title = "border-color:lightcoral;' value='" + block.attr("id") + "'"; }
//
//   $("#SC_CMSPane").css("display", "block").html(
//     "<table id='SC_CMSBlockData' style='padding:10px;width:100%;text-align:center;border:solid thin black;background-color:white;'>" +
//       "<th colspan='2' style='text-align:center;'>Block Title: </th>" +
//       "<tr><td colspan='2' style='text-align:center;'>" +
//       "<input type='text' editrole='blocktitle' style='width:80%;" + title + " onBlur='if ($(this).val().indexOf(\"newblock\") == -1){$(this).css(\"border-color\",\"gray\")}'/><br /><br />" +
//       "</td></tr>" +
//
//       "<th colspan='2' style='text-align:center;'>Block Type: </th>" +
//       "<tr><td colspan='2' style='text-align:center;'><select editrole='blockType' style='width:80%;'>" +
//       "<option value='html' " + ((block.attr("SC_blockType").toLowerCase() == "html") ? "selected='selected'" : "") + ">HTML</option>" +
//       "<option value='container' " + ((block.attr("SC_blockType").toLowerCase() == "container") ? "selected='selected'" : "") + ">Container</option>" +
//       "<option value='menu' " + ((block.attr("SC_blockType").toLowerCase() == "menu") ? "selected='selected'" : "") + ">Menu</option>" +
//       "<option value='prop' " + ((block.attr("SC_blockType").toLowerCase() == "prop") ? "selected='selected'" : "") + ">Data Object Property</option>" +
//       "</select><br /><br /></td></tr>" +
//
//       "<th class='editContent' colspan='2' style='text-align:center;'>Content: </th>" +
//       "<tr><td class='editContent' colspan='2' style='text-align:center;'>" +
//       "<input editrole='blockcontent' style='width:80%;' type='text' value='" + content + "' /><br /><br /></td></tr>" +
//
//       "<th colspan='2' style='text-align:center;'>Inline Styles: </th>" +
//       styleRows +
//     "</table>"
//   );
//   app.addStyle();
//   $("#SC_CMSPane").find("select[editrole='blockType']").on("change", $.proxy(function () { this.changeBlockType(); }, app));
//   this.configTools("data");
// }
//
// SC_BlockCMS.prototype.addStyle = function () {
//   var app = this;
//   if ($("#SC_CMSPane").find("#SC_CMSaddStyle").length > 0) {
//     var new_key = $("#SC_CMSPane").find("#SC_CMSaddStyle").val();
//     $("#SC_CMSPane").find("#SC_newCSSkey").attr("editrole", "csskey").html(new_key).attr("id", "");
//   }
//
//   $("#SC_CMSBlockData").find("tbody").append(
//     "<tr><td id='SC_newCSSkey'><input id='SC_CMSaddStyle' type='text' placeholder='new style name'></td>" +
//     "<td><input type='text' placeholder='new style value' editrole='cssval'></td></tr>"
//   );
//   $("#SC_CMSPane").find("#SC_CMSaddStyle").on("change", $.proxy(function () { this.addStyle(); }, app));
// }
//
// SC_BlockCMS.prototype.changeBlockType = function () {
//   if ($("select[editRole='blockType']").val() == "html") { $(".editContent").css("display", "none"); }
//   else { $(".editContent").css("display", "table-cell"); }
// }
//
// SC_BlockCMS.prototype.saveBlockData = function () {
//   var app = this;
//   var block = $(this.root);
//   var name = $("#SC_CMSPane").find("input[editrole='blocktitle']").val() || "";
//   var block_type = $("#SC_CMSPane").find("select[editrole='blockType']").val();
//   var CSSkeys = $("#SC_CMSPane").find("td[editrole='csskey']");
//   var CSSvals = $("#SC_CMSPane").find("input[editrole='cssval']");
//
//   $("#SC_CMSPane").find("input[editrole='blocktitle']").css("border-color", "");
//   $("#SC_CMSPane").find("input[editrole='blockcontent']").css("border-color", "");
//
//   var alertStr = "";
//   if (name == "") {
//     $("input[editrole='blocktitle']").css("border-color", "lightcoral");
//     alertStr += "Blocks need unique names!"
//   }
//
//   if (alertStr != "") { console.log(alertStr); }
//   else {
//     $(block).attr("id", name);
//
//     new Promise(function (fulfill, reject) {
//       if (block.data("new") != undefined) {
//         block.css("background-color", "");
//         RemoteCall("Assets/JS/Servercide/SC_BlockCMS/SC_BlockCMS.html/", "CreateBlock", {
//           'title': name,
//           'parentBlockRid': $("#" + block.data("og_parent")).attr("sc_blockrid")
//         }, 1).then(function (data) {
//           $(block).attr("SC_blockRID", data.split("||")[0]);
//           $(block).attr("SC_edgeRID", data.split("||")[1]);
//           block.removeData("new");
//           fulfill()
//         });
//       }
//       else { fulfill(); }
//     }).then(function () {
//       var styles = {};
//       for (var i = 0; i < CSSkeys.length; i++) {
//         if (CSSkeys.eq(i).html().trim() == "outline") { block.data("og_outline", CSSvals.eq(i).val().trim()); }
//         block.css(CSSkeys.eq(i).html().trim(), CSSvals.eq(i).val().trim());
//         styles[CSSkeys.eq(i).html().trim()] = CSSvals.eq(i).val().trim();
//       }
//       var updateParams = {};
//       updateParams['title'] = name;
//       updateParams['type'] = block_type;
//       updateParams['styles'] = styles;
//       if (block_type == "container") { updateParams['content'] = $("input[editrole='blockcontent']").val(); }
//       else if (block_type == "html") { updateParams['content'] = block.html(); }
//
//       RemoteCall("Assets/JS/Servercide/SC_BlockCMS/SC_BlockCMS.html/", "UpdateObject", { 'rid': block.attr("SC_blockrid"), 'props': updateParams }).then(function (data) {
//       });
//     });
//     app.configTools("default");
//   }
// }
// //********************************
//
// //Functions for managing nav menus
// //********************************
// SC_BlockCMS.prototype.manageMenuItems = function (menu) {
//   var app = this;
//   var block = $(this.root);
//
//   $(menu).children().each(function () {
//     if ($(this).is("ul") && $(this).attr("editrole") != "addMenu") {
//       var UL = $(this);
//       var addMenuItem = $("<li class='menu_item' editrole='addMenuItem'>+</li>");
//       addMenuItem.appendTo(UL).on("click", function(event){ event.stopPropagation(); app.editMenuItem("new", UL.parent().attr("rid"), UL.children("li").length); });
//     }
//     else if ($(this).is("li")) {
//       if ($(this).attr("editrole") != "addMenuItem") {
//         var LI = $(this);
//         $(this).on("click", function(event){ event.stopPropagation(); editMenuItem("edit", LI.attr("rid"), 0); });
//         if ($(this).children("ul").length == 0) {
//           if ($(this).parent().is(".nav")) { var submenuclass = "dripout"; }
//           else { var submenuclass = "flyout"; }
//           $("<ul class='" + submenuclass + "' editrole='addMenu'><li class='menu_item' editrole='addMenuItem'>+</li></ul>").appendTo($(this))
//             .on("click", function(event) { event.stopPropagation(); editMenuItem("new", $(this).parent().parent().attr("rid"), 0); });
//         }
//       }
//     }
//     app.manageMenuItems($(this));
//   });
// }
//
// SC_BlockCMS.prototype.editMenuItem = function (isNew, rid, ordinal) {
//   var app = this;
//   var saveAction = null, nameVal = "", hrefVal = "";
//
//   if (isNew.toString() == "new") {
//     saveAction = function() { app.saveNewMenuItem(rid, ordinal); };
//     nameVal = "new_link";
//     hrefVal = "#";
//   }
//   else if (isNew == "edit") {
//     saveAction = function() { app.saveMenuItemData(rid, ordinal); };
//     nameVal = $("li[rid='" + rid + "']").data("title");
//     hrefVal = $("li[rid='" + rid + "']").data("href");
//   }
//   app.configTools("menu");
//
//   $("#SC_CMSPane").css("display", "block")
//     .html("<table style='width:100%;' class='absolute_center'>" +
//             "<th colspan='2' style='text-align:center;'>Menu Item Text: </th>" +
//             "<tr><td colspan='2' style='text-align:center;'>" +
//               "<input type='text' editrole='menuitemtitle' style='width:80%;' value='" + nameVal + "' /><br /><br />" +
//             "</td></tr>" +
//             "<th colspan='2' style='text-align:center;'>Link Destination: </th>" +
//             "<tr><td colspan='2' style='text-align:center;'>" +
//               "<input type='text' editrole='menuitemhref' style='width:80%;' value='" + hrefVal + "' /><br /><br />" +
//             "</td></tr>" +
//           "</table>");
// }
//
// SC_BlockCMS.prototype.saveMenuItemData = function (rid, ordinal) {
//   var props = {
//     'title': $("input[editrole='menuitemtitle']").val(),
//     'href': $("input[editrole='menuitemhref']").val()
//   };
//   RemoteCall("Assets/JS/Servercide/SC_BlockCMS/SC_BlockCMS.html/", "SaveMenuItemData", { 'rid': rid, 'props': props }).then(function (data) {
//     closeModalEdit();
//   });
// }
//
// SC_BlockCMS.prototype.saveNewMenuItem = function (parentNodeRid, ordinal) {
//   var app = this;
//
//   RemoteCall("Assets/JS/Servercide/SC_BlockCMS/SC_BlockCMS.html/", "SaveNewMenuItem", {
//     'title': $("input[editrole='menuitemtitle']").val(),
//     'href': $("input[editrole='menuitemhref']").val(),
//     'parent_rid': parentNodeRid,
//     'ordinal': ordinal
//   }).then(function (data) { app.wrapUpBlockEdit() });
// }
// //********************************
//
// //Tools Functions
// //***************
// SC_BlockCMS.prototype.configTools = function (state) {
//   var app = this;
//   var block = $(this.root);
//   $("#SC_CMSToolbelt").on("click", function(event) { event.stopPropagation(); });
//
//   return new Promise(function (fulfill, reject) {
//     if (state == "default" || state == "new") {
//       $("#SC_tbltCancel").html("Delete").off().on("click", function (event) { event.stopPropagation(); app.deleteBlock(); });
//       $("#SC_tbltSave").html("Finish").off().on("click", function (event) { event.stopPropagation(); block.trigger("SC_BlockCMS");  });
//       $("#SC_tbltContent").off().on("click", function (event) { event.stopPropagation(); app.editBlockContent(); }).css({ "background-color": "", color: "black" });
//       $("#SC_tbltData").off().on("click", function (event) { event.stopPropagation(); app.editBlockData(); }).css({ "background-color": "", color: "black" });
//
//       $("#SC_CMSPane").css("display", "none").html("");
//       block.find(".ui-draggable").draggable("destroy");
//       block.find(".ui-resizable").resizable("destroy");
//     }
//     else if (state == "content" || state == "data") {
//       $("#SC_tbltCancel").html("Cancel").off().on("click", function () { app.configTools("default"); });
//       $("#SC_tbltSave").html("Save").off("click");
//
//       if (state == "content") $("#SC_tbltContent").css({ "background-color": "gray", color: "lightgray" }).off("click");
//       else $("#SC_tbltContent").css({ "background-color": "gray", color: "darkgray" }).off("click");
//
//       if (state == "data") $("#SC_tbltData").css({ "background-color": "gray", color: "lightgray" }).off("click");
//       else $("#SC_tbltData").css({ "background-color": "gray", color: "darkgray" }).off("click");
//
//       if (state == "content") { $("#SC_tbltSave").one("click", function () { app.saveBlockContent(); }); }
//       if (state == "data") { $("#SC_tbltSave").one("click", function () { app.saveBlockData(); }); }
//     }
//     else if (state == "menu"){
//       $("#SC_tbltCancel").html("Cancel").on("click", function() { $("#SC_CMSPane").html().css("display", "none"); });
//       $("#SC_tbltSave").html("Save").on("click", function() { saveAction(); });
//     }
//     else if (state == "closed") { $("#SC_CMSToolbelt").parent().trigger("click"); }//.css("display", "none"); }
//     fulfill();
//   });
// }
// //***************
// //////////////////
