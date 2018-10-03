

class secondMenu {
    color c;
  
  secondMenu(color c0){
  c=c0;
  }
  
  void draw(){
  background(c);
  startsimicon.draw();
  petcustomicon.draw();
  envcustomicon.draw();
  }  
}

class StartSimIcon{
  float x,y,w,h; //size of icon
  float textX,textY; //position of "text" in box icon
  color c;
  boolean pressed=false;
  
  StartSimIcon(float x0, float y0, float w0,float h0, float textX0, float textY0, color c0){
    x=x0;y=y0;w=w0;h=h0;textX=textX0;textY=textY0;c=c0;
  }
  
  void draw(){
    fill(c);
    stroke(0);
    rect(x,y,w,h); //create rectangle "text" icon
    
    fill(0);
    stroke(0);
    textSize(30);
    text("Start DigiPet Sim", textX,textY);
    
    //conditions for pressing button and Sim to start   
    if (mousePressed==true && mouseX>x && mouseX<(x+w) && mouseY>y && mouseY<(y+h)){
    pressed=true;
    } else {
    pressed=false;
    }
  } 
}

class PetCustomIcon{
  float x,y,w,h; //size of icon
  float textX,textY; //position of "text" in box icon
  color c;
  boolean pressed=false;
  
  PetCustomIcon(float x0, float y0, float w0,float h0, float textX0, float textY0, color c0){
    x=x0;y=y0;w=w0;h=h0;textX=textX0;textY=textY0;c=c0;
  }
  
  void draw(){
    fill(c);
    stroke(0);
    rect(x,y,w,h); //create rectangle "text" icon
    
    fill(0);
    stroke(0);
    textSize(30);
    text("Customize DigiPet", textX,textY);
    
    //conditions for pressing button and Sim to start   
    if (mousePressed==true && mouseX>x && mouseX<(x+w) && mouseY>y && mouseY<(y+h)){
    pressed=true;
    } else {
    pressed=false;
    }
  }
}
  
  class EnvCustomIcon{
  float x,y,w,h; //size of icon
  float textX,textY; //position of "text" in box icon
  color c;
  boolean pressed=false;
  
  EnvCustomIcon(float x0, float y0, float w0,float h0, float textX0, float textY0, color c0){
    x=x0;y=y0;w=w0;h=h0;textX=textX0;textY=textY0;c=c0;
  }
  
  void draw(){
    fill(c);
    stroke(0);
    rect(x,y,w,h); //create rectangle "text" icon
    
    fill(0);
    stroke(0);
    textSize(30);
    text("Customize Terrarium", textX,textY);
    
    //conditions for pressing button and Sim to start   
    if (mousePressed==true && mouseX>x && mouseX<(x+w) && mouseY>y && mouseY<(y+h)){
    pressed=true;
    } else {
    pressed=false;
    }
  }
}