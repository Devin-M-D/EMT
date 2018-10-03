class PetCustomMenu{
      color c;
      float textX, textY;
  
  PetCustomMenu(color c0, float textX0, float textY0){
  c=c0;textX=textX0;textY=textY0;
  }
  
  void draw(){
  background(c);
  fill(0);
  textSize(30);
  text("Choose your pet millipede's color:",textX,textY);
  
  pinkmillipede.draw();
  greenmillipede.draw();
  bluemillipede.draw();
 
  }
}
  
 class RedMillipede{ //class for pink millipede color change
  float x,y,w,h; //size of icon
  float textX,textY; //position of "text" in box icon
  color c;
  boolean pressed=false;
  
  RedMillipede(float x0, float y0, float w0,float h0, float textX0, float textY0, color c0){
    x=x0;y=y0;w=w0;h=h0;textX=textX0;textY=textY0;c=c0;
  }
  
  void draw(){
    fill(c);
    rect(x,y,w,h); //create rectangle "text" icon
    
    fill(0);
    textSize(30);
    text("Pink", textX,textY);
    
    //conditions for pressing button and Sim to start   
    if (mousePressed==true && mouseX>x && mouseX<(x+w) && mouseY>y && mouseY<(y+h)){
    pressed=true;
    } else {
    pressed=false;
    }
  } 
} 

 class GreenMillipede{
  float x,y,w,h; //size of icon
  float textX,textY; //position of "text" in box icon
  color c;
  boolean pressed=false;
  
  GreenMillipede(float x0, float y0, float w0,float h0, float textX0, float textY0, color c0){
    x=x0;y=y0;w=w0;h=h0;textX=textX0;textY=textY0;c=c0;
  }
  
  void draw(){
    fill(c);
    rect(x,y,w,h); //create rectangle "text" icon
    
    fill(0);
    textSize(30);
    text("Green", textX,textY);
    
    //conditions for pressing button and Sim to start   
    if (mousePressed==true && mouseX>x && mouseX<(x+w) && mouseY>y && mouseY<(y+h)){
    pressed=true;
    } else {
    pressed=false;
    }
  } 
}

 class BlueMillipede{
  float x,y,w,h; //size of icon
  float textX,textY; //position of "text" in box icon
  color c;
  boolean pressed=false;
  
  BlueMillipede(float x0, float y0, float w0,float h0, float textX0, float textY0, color c0){
    x=x0;y=y0;w=w0;h=h0;textX=textX0;textY=textY0;c=c0;
  }
  
  void draw(){
    fill(c);
    rect(x,y,w,h); //create rectangle "text" icon
    
    fill(0);
    textSize(30);
    text("Blue", textX,textY);
    
    //conditions for pressing button and Sim to start   
    if (mousePressed==true && mouseX>x && mouseX<(x+w) && mouseY>y && mouseY<(y+h)){
    pressed=true;
    } else {
    pressed=false;
    }
  } 
} 