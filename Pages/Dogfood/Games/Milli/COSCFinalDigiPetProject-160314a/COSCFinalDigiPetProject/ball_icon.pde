//example

class BallIcon {
  float x,y,w,h; //size of box water icon
  float textX,textY; //position of "water" in box icon
  color c;
  boolean pressed=false;
  
  BallIcon(float x0, float y0, float w0,float h0, float textX0, float textY0, color c0){
    x=x0;y=y0;w=w0;h=h0;textX=textX0;textY=textY0;c=c0;
  }
  
  void draw(){
    fill(c);
    stroke(0);
    rect(x,y,w,h); //create rectangle ball button icon
    
    stroke(0);
    textSize(20);
    text("TOY BALL", textX,textY);
    
    //conditions for pressing button and causing ball button to appear   
    if (mousePressed==true && mouseX>x && mouseX<(x+w) && mouseY>y && mouseY<(y+h)){
    pressed=true;
    } else {
    pressed=false;
    }
  } 
}

//code for ball created with help of processing multiple objects (twinklers) e
class Ball {
  float x, y;          // position
  float vx=0, vy=0;    // velocity in the two directions   
  float r=10;          // radius
  color c=color(280,360,360);  // color
  float gravity=0.01;   // the amount of acceleration
  float drag=0.99;     // multiplicative factor for velocity
  float frict=0.75;   // multiplicative factor, only when bounce
  
  boolean grabbed=false; // whether ball has been grabbed by the mouse
  
  // Initialize a Ball at position (x0,y0) abd velocity (vx0, vy0)
  Ball(float x0, float y0, float vx0, float vy0, float r0, color c0)
  {
    x = x0; 
    y = y0;
    vx = vx0;
    vy = vy0;
    r = r0;
    c = c0;
  }

  void draw()
  {
    fill(c);
    stroke(0);
    ellipse(x,y,r*2,r*2);
    if(grabbed) {
      fill(red(c)/2,green(c)/2,blue(c)/2);
      ellipse(x,y,r,r);
    }
  }

  void updateVelocity() {
    // Accelerate according to gravity
    vy += gravity;
    // Now damp according to drag
    vx *= drag;
    vy *= drag;
  }
  
  void bounce() {
    if (x > width-r || x < r) { 
      x = constrain(x,r,width-r); 
      vx = -vx; 
      vy *= frict;   // damp
    }
    if (y > height-r || y < r) { 
      y = constrain(y,r,height-r); 
      vy = -vy; 
      vy *= frict;   // damp
    }
    
    //ball bounces off milli's head
    if (dist(segments[0].x, segments[0].y, ball.x,ball.y)< segments[0].r+(ball.r)){
      x = constrain(x,r,width-r); y = constrain(y,r,height-r); 
      vx = -vx+15; //adding velocity to ball so that milli can bounce it
      vy = -vy+15;
      vy *= frict;   // damp
    }
  }
  
  void updateGrabbed() {
    // if I am not grabbed yet, grab me if the mouse is clicked on me 
    if(!grabbed) grabbed = mousePressed && dist(mouseX,mouseY,x,y) < r;
    // otherwise stop grabbing me when I release the mouse
    else grabbed = mousePressed;
  }

  void update()
  {
    // check if grabbed
    updateGrabbed();
    
    // follow the mouse if grabbed
    if(grabbed) {
      x = mouseX;
      y = mouseY;
      vx = mouseX - pmouseX;
      vy = mouseY-pmouseY;
    } else { // obey physics otherwise
      // update the velocity
      updateVelocity();
    
      // Move in the appropriate direction by the step size
      x += vx;
      y += vy;
    
      // bounce
      bounce();
    }
  }
}