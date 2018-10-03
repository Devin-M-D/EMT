class startScreen {
  float x,y,a,b,d,e; //postion of text
  color c;
  
  startScreen(float x0, float y0,float a0,float b0,float d0, float e0,color c0) {
    x=x0;y=y0;a=a0;b=b0;c=c0;d=d0;e=e0;
  }
 
  void draw(){
  fill(c);
  textSize(65);
  text("DigiPET! : A digital pet simulator",x,y);
  
  fill(0);
  textSize(40);
  text("press any key to continue", d,e);

  fill(c);
  textSize(25);
  text("by Beverly Alomepe 2017",a,b);
  }
}