//ContextMenu//////
///////////////////
var SC_ContextMenu = function(root) {
  var promise = ServercideApp.call(this, root, "SC_ContextMenu");
  $(root).html('<span id="SC_contextMenu" onclick="event.stopPropagation();"></span>');
  this.finishStrapping();
  return promise;
}
SC_ContextMenu.prototype = Object.create(ServercideApp.prototype);
///////////////////
