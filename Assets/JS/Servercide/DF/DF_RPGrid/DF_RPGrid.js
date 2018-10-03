//RPGrid//////
///////////////
var SC_RPGrid = function (root, name) {
  ServercideApp.call(this, root, name);
  var app = this;
  var gameport = $(this.root);
  this.game_name = gameport.attr("SC_game");

  this.nextScreen("/Menus.html", "#start_screen");
  //this.nextScreen("/maps/deepdarkwood.html", "#a1");

  //$(this.root).attr("SC_activeTile")
}
SC_RPGrid.prototype = Object.create(ServercideApp.prototype);

SC_RPGrid.prototype.nextScreen = function(section, tile){
  var app = this;
  var gameport = $(this.root);
  //alert('/Assets/JS/Servercide/SC_RPGrid/' + this.game_name + section + ' ' + tile);

  gameport.load('/Assets/JS/Servercide/SC_RPGrid/' + this.game_name + section + ' ' + tile, function(){
    $(gameport.children()[0]).css("height", "100%").css("width", "100%").css("border", "");
    gameport.find("#next_tile").one("click", $.proxy(function() { 
      this.nextScreen(gameport.find("#next_tile").attr("next_screen_asset"), gameport.find("#next_tile").attr("next_screen_tile"));
    }, app));
  });
}
///////////////
