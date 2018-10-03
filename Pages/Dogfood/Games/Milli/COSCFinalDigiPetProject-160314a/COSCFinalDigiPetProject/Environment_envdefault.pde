class Environment {
  color c;
  
  Environment(color c0){
  c=c0;
  }
  
  void draw(){
    fill(c);
    rect(0,0,width,height);
    for (int i=0; i<rocks.length;i++){ //draw rocks
    rocks[i].draw();
    }
    for (int i=0; i<pebbles.length;i++){ //draw pebbles
    pebbles[i].draw();
    }
    
    pond.draw();

    //drawing icons for millipede
    water.draw();
    food.draw();
    ballicon.draw();
  }
}
  
class Rock {
  float x1,y1,w1,h1;
  color c1;
  
  Rock(float x10,float y10,float w10,float h10,color c10) {
    x1=x10;y1=y10;w1=w10;h1=h10;c1=c10;  
  }
   void draw(){
     noStroke();
     fill(c1);
     ellipse(x1,y1,w1,h1);  //rock and pebble objects   
   }
}

class Pond {
  float x,y;
  float r;
  color c;
  
  Pond(float x0,float y0, float r0, color c0){
    x=x0;y=y0;r=r0;c=c0;
  }
  void draw(){
    fill(c);
    ellipse(x,y,r,r);
  }
  void update(){ //update pond size based on whether water button icon is pressed
  r+=4;
  r=constrain(r,50,width*0.30);
  }
  void noUpdate(){ //return pond size when button isn't pressed
  r-=15;
  r=constrain(r,50,width*0.30);
  }
}   