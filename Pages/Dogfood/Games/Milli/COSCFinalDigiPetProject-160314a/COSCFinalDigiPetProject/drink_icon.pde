//example

class WaterButton {
  float x,y,w,h; //size of box water icon
  float textX,textY; //position of "water" in box icon
  color c;
  boolean pressed=false;
  
  WaterButton(float x0, float y0, float w0,float h0, float textX0, float textY0, color c0){
    x=x0;y=y0;w=w0;h=h0;textX=textX0;textY=textY0;c=c0;
  }
  
  void draw(){
    fill(c);
    stroke(0);
    rect(x,y,w,h); //create rectangle water button icon
    
    stroke(300,320,360);
    textSize(20);
    text("WATER", textX,textY);
   //conditions for pressing button and filling/unfilling pond
    if (pressed==true){
      pond.update();
    } else {
      if (dist(segments[0].x, segments[0].y, pond.x,pond.y)< segments[0].r+(pond.r)){
        pond.noUpdate();
        ThirstClock+=150;
        if (ThirstClock>=450){
          MilliStatus="satiated";
        }   
    }
  }
    if (mousePressed==true && mouseX>x && mouseX<(x+w) && mouseY>y && mouseY<(y+h)){
    pressed=true;
    } else {
    pressed=false;
    }
  }   
}
   