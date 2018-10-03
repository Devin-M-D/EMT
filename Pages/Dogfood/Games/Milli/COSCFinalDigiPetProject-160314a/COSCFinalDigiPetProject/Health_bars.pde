
/*class FoodBar {
  float x,y,textX,textY;
  float health=100;
  float MaxHealth=100;
  float rectWidth=200;
  color c;
  
  FoodBar(float x0, float y0,float textX0, float textY0, color c0){
    x=x0;y=y0;textX=textX0;textY=textY0;c=c0;
  }
   
  void draw(){
  // Change color
  if (health < 25)
  {
   
  fill(c);
  textSize(20);
  if (MilliStatus=="hungry"){
  text("Hunger",x,y);
  }
  // Draw bar
  noStroke();
  // Get fraction 0->1 and multiply it by width of bar
  float drawWidth = (health / MaxHealth) * rectWidth;
  rect(x, y, drawWidth, 50);
   
  // Outline
  stroke(0);
  noFill();
  rect(x, y, rectWidth, 50);
  
  colorMode(HSB,360);
}
}
*/
  