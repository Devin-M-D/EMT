//P5//////
//////////
var SC_P5 = function (root, name) {
  ServercideApp.call(this, root, name);
  var gameport = $(this.root);
  this.game_name = gameport.attr("SC_game");
  alert("foo");
  $("<script>", { "type": "text/javascript", "src": "Assets/JS/Servercide/SC_P5/libraries/p5.js" }).appendTo("head").then(function () {
    $("<script>", { "type": "text/javascript", "src": "Pages/Home/UsingEMT/Demos/Milli/Milli.js" }).appendTo(gameport).then(function () {

    });
  });

}
SC_P5.prototype = Object.create(ServercideApp.prototype);

//////////