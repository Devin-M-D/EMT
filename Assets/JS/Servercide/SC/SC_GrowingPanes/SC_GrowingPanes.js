var SC_GP_hijackTouch = 0;
var SC_GP_mouseDown = 0;
var SC_GP_mousePosY = 0;
document.onmouseup = function () { SC_GP_mouseDown = 0; }
document.onmousemove = function (e) { SC_GP_mousePosY = e.pageY; }

document.ontouchstart = function (e) { SC_GP_mousePosY = e.touches[0].pageY }
document.ontouchend = function () { SC_GP_hijackTouch = 0; SC_GP_mouseDown = 0; }
document.ontouchmove = function (e) { if (SC_GP_hijackTouch == 1) { e.preventDefault(); } SC_GP_mousePosY = e.touches[0].pageY }

var SC_GrowingPanes = function (root, name) {
  ServercideApp.call(this, root, name);
  alert("foo");
}
SC_GrowingPanes.prototype = Object.create(ServercideApp.prototype);


SC_GrowingPanes.prototype.grabHandle = function() {
/*
  var app = this;
  var pane = $(this.root);

    function grabHeader() {
      return promise = new Promise(function (fulfill, reject) {
        var resize = setInterval(function () {
          if (SC_GP_mouseDown == 1) {
            $("#header").css("height", SC_GP_mousePosY);
            if ($("#header").css("height").replace("px", "") < 180) { $("#main_nav").fadeOut(); fulfill(); }
            else { $("#main_nav").fadeIn(); }
          }
          else { clearInterval(resize); }
        }, 50);
      });
    }

    function grabFooter() {
      var resize = setInterval(function () {
        if (SC_GP_mouseDown == 1) {
          $("#footer").css("height", ($("html").css("height").replace("px", "") - SC_GP_mousePosY) + "px");
          $("#content_body").css("margin-bottom", $("#footer").css("height"));
        }
        else { clearInterval(resize); }
      }, 50);
      $("#footer").data("pinned", true);
    }
    /////////////////////////////////
*/
}
