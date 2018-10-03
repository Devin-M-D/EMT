//example

class FoodButton {
  float x,y,w,h; //size of box water icon
  float textX,textY; //position of "water" in box icon
  color c;
  boolean pressed=false;
  
  FoodButton(float x0, float y0, float w0,float h0, float textX0, float textY0, color c0){
    x=x0;y=y0;w=w0;h=h0;textX=textX0;textY=textY0;c=c0;
  }
  
  void draw(){
    fill(c);
    stroke(0);
    rect(x,y,w,h); //create rectangle food button icon
    
    stroke(200,320,360);
    textSize(20);
    text("FOOD", textX,textY);
    
    //conditions for pressing button and causing foodbits to appear     
    if (mousePressed==true && mouseX>x && mouseX<(x+w) && mouseY>y && mouseY<(y+h)){
    pressed=true;
    } else {
    pressed=false;
    }
  } 
}

  
class Foodbit {
  float x,y;
  float r1=10,r2=30;
  color c;
  
  Foodbit(float x0, float y0, color c0){
    x=x0;y=y0;c=c0;
  }
  void draw(){
  fill(c);
  noStroke();
  star(x,y,r1,r2,3);
  x=constrain(x,0,width/3);
  y=constrain(y,0,height/2);
  
  //if milli's head touches food bit, it's gone, she's not hungry
  if (dist(segments[0].x, segments[0].y, foodbits.x,foodbits.y)< segments[0].r+(foodbits.r1)){
        foodbits=null;
        HungerClock=600;
        MilliStatus="satiated";
  }
  }
}

//star code courtesy of processing.org star tutorial
void star(float x, float y, float radius1, float radius2, int npoints) {
  float angle = TWO_PI / npoints;
  float halfAngle = angle/2.0;
  beginShape();
  for (float a = 0; a < TWO_PI; a += angle) {
    float sx = x + cos(a) * radius2;
    float sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}