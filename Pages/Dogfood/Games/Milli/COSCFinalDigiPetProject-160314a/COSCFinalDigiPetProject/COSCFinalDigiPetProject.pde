startScreen splashscreen;

secondMenu mainmenu;
  StartSimIcon startsimicon;
  PetCustomIcon petcustomicon;
  EnvCustomIcon envcustomicon;
  
PetCustomMenu customizepet;
  RedMillipede pinkmillipede;
  GreenMillipede greenmillipede;
  BlueMillipede bluemillipede;
  
EnvCustomMenu envcustommenu;
  RedSand redsand;
  WhiteSand whitesand;
  SkyBlueSand skybluesand;
  
Rock rock;
Rock pebble;
Pond pond;
Environment envdefault;
Environment envcustom;
Foodbit foodbits;

BallIcon ballicon;
Ball ball; //ball for milli to play with
//timer on ball to disapear after used
int savedTime;
int totalTime = 30000;

//timer on milli's physical needs
int HungerClock=1200;
String MilliStatus="satiated";
int ThirstClock=600;

//icons examples
WaterButton water; 
FoodButton food;

//millipede movement
int current_frame=0;
float focusX,focusY;
float speed=30;

SegmentSpring[] segments=new SegmentSpring[20];

String gameState="splash";

Rock[] rocks = new Rock[20]; //create an array of rocks (setup)
Rock[] pebbles=new Rock[40]; //create an array of pebbles (setup)


void setup(){
  size(1200,900);
  smooth(0);
  colorMode(HSB, 360);
  background(100,180,300);
  
  splashscreen = new startScreen(width-width*(0.93),height-height*(0.60),width-width*(0.30),height-height*(0.03),width-width*(0.73),height-height*(0.20),color(300,320,300));
    
   //milli segments become millipede!
   //millipede code with help of Spring Systems lecture code
   // Construct springs at center horizontally, equally spaced vertically
  for (int i=0; i<segments.length; i++)
    segments[i] = new SegmentSpring(width/2, i*height/segments.length,30,i,color(0,250,130));
    
    //drawing environment
  envdefault= new Environment(color(25,200,360));
    //create array of rocks
    for (int i=0; i<rocks.length; i++){ 
    rocks[i] = new Rock(random(width), random(height), random(10,30), random(8,20),color(random(210)));
    }
    //create array of pebbles
    for (int i=0; i<pebbles.length; i++){ 
    pebbles[i] = new Rock(random(width), random(height), random(8,15), random(5,10),color(random(230)));
    }
    pond= new Pond(width,0,width*0.6,color(200,360,360));
    
    //example water icon
    water=new WaterButton(width-width*(0.70),height-height*(0.05),70,40,width-width*(0.70),height-height*(0.058),color(210,300,360));  
    
    //example food icon
    food = new FoodButton(width-width*(0.80),height-height*(0.05),70,40,width-width*(0.797),height-height*(0.058),color(90,300,250));
    
    //example toy ball icon
    ballicon= new BallIcon(width-width*(0.92),height-height*(0.05),70,40,width-width*(0.93),height-height*(0.058),color(280,360,360));
    //timer for ball 
    savedTime = millis();
    
    //create array of pebbles
    pond= new Pond(width,0,width*0.8,color(200,360,360));
  
}
  


void draw(){
  //millipede movement
    current_frame+=1;
  if (current_frame==5){ //change direction of millipede each frame
    current_frame=0;
  }
  
  //menu and game state changes
  if (gameState=="splash"){
  splashscreen.draw();
  } else if(gameState=="main menu"){
    mainmenu.draw();
    
  } else if(gameState=="digipet sim") {
    fill(0);
    stroke(0);
     //text(MilliStatus,width*(.9),height*(.9));
          text("jello world!",0,0);
    HungerClock-=1; //ticks from 600 to zero for ten seconds
    ThirstClock-=1;
     if (ThirstClock<300 && pond.r>50){
      focusX=pond.x;
      focusY=pond.y;
      MilliStatus="thirsty";
     
   } else if(ThirstClock<90 && ThirstClock>0){
     speed=ThirstClock/3;
     focusX=segments[19].x;
     focusY=segments[19].y;
     focusX=constrain(focusX,0,width);
     focusY=constrain(focusY,0,height);
     MilliStatus="dying";
   } else if (ThirstClock<=0){
      for (int i=1; i<segments.length; i++){
          segments[i].c=color(200-10*i);
          segments[0].c=color(255);
          speed=0;
          }
    }
    
      if (HungerClock<600 && MilliStatus!="thirsty"){
      MilliStatus="hungry";
        if (foodbits!=null){
        focusX=foodbits.x;
        focusY=foodbits.y;
        }else{   
        focusX=random(focusX-500,focusX+500);
        focusY=random(focusY-500,focusY+500);
        focusX=constrain(focusX,0,width);
        focusY=constrain(focusY,0,height);
      }
     
   } else if(HungerClock<90 && HungerClock>0){
     speed=HungerClock/3;
     focusX=segments[19].x;
     focusY=segments[19].y;
     MilliStatus="dying";
   } else if (HungerClock<=0){
      for (int i=1; i<segments.length; i++){
          segments[i].c=color(200-10*i);
          segments[0].c=color(255);
          speed=0;
          }
    }
   envdefault.draw(); //draw default environment
       if(foodbits!=null){ //check if the foodbit exists
         foodbits.draw();
       }
        fill(0);
        stroke(0);
        textSize(20);
        textSize(30);
        text(MilliStatus, width-width*(0.29),height-height*(0.04));
    
      if(ball!=null){ //check if the ball exists
        //draw and update each ball 
        ball.draw();
        ball.update(); 
        focusX=ball.x; //milli can play with ball, and user can grab the ball to play fetch with her
        focusY=ball.y;
        
        //calculate how much time has passed so ball can disapear
        int passedTime=millis()-savedTime;
          if (passedTime>totalTime){
            println("30 seconds have passed!"); //ball disappears after 30 seconds of milli
            ball=null;
            savedTime=millis(); //save the current time and restart the ball timer
          }
      }

   //drawing millipede
   for (int i=segments.length-1; i>=0; i--) segments[i].draw();


  // Recenter first segment @ the mouse
      // Rather than targeting mouse position, target a constant-sized (speed)
      // step toward the mouse position
  float dx,dy;
   
  if (current_frame==0 && MilliStatus=="satiated"){
    focusX=random(focusX-500,focusX+500);
    focusY=random(focusY-500,focusY+500);
    focusX=constrain(focusX,0,width);
    focusY=constrain(focusY,0,height);
  } 
  
  dx = focusX+20-segments[0].x;
  dy = focusY+20-segments[0].y; //finding x distance and y distance betw. segment head
  float d = sqrt(dx*dx+dy*dy);
  // dx/d and dy/d give the fractions of the diagonal step that lie in the two directions
  
  if (d>0) segments[0].update(segments[0].x+speed*dx/d, segments[0].y+speed*dy/d);
  // Recenter each following spring at preceding spring
  for (int i=1; i<segments.length; i++){
    segments[i].update(segments[i-1].x, segments[i-1].y);
        }    
  } else if(gameState=="customize pet") {
      //initializing menu3 icons
   
    customizepet.draw();
 } else if(gameState=="envcustommenu") {
   envcustommenu.draw();
 }
}

  void mouseClicked(){
    if (gameState=="main menu"){
    //for pressing start sim icon
      if (mouseX>startsimicon.x && mouseX<(startsimicon.x+startsimicon.w) && mouseY>startsimicon.y && mouseY<(startsimicon.y+startsimicon.h)){
        //start digipetsim
        gameState="digipet sim";
        DestroyMainMenu();
        }else if (mouseX>petcustomicon.x && mouseX<(petcustomicon.x+petcustomicon.w) && mouseY>petcustomicon.y && mouseY<(petcustomicon.y+petcustomicon.h)){
        //go to pet customization menu
        CreateCustomizePetMenu();
      
        //delete prior menu
        DestroyMainMenu();
      }else if(mouseX>envcustomicon.x && mouseX<(envcustomicon.x+envcustomicon.w) && mouseY>envcustomicon.y && mouseY<(envcustomicon.y+envcustomicon.h)){
        CreateCustomEnvMenu();
        
        //delete prior menu;
        DestroyMainMenu();
      }
    } else if (gameState=="customize pet"){
          //for pressing each digipet subicon for color
          if (mouseX>pinkmillipede.x && mouseX<(pinkmillipede.x+pinkmillipede.w) && mouseY>pinkmillipede.y && mouseY<(pinkmillipede.y+pinkmillipede.h)){
          //start digipetsim
          for (int i=1; i<segments.length; i++){
          segments[i].c=color(315,300,360);
          segments[0].c=color(315,300,360);
          }
          println("your millipede is now pink!");
          }
          
          if (mouseX>greenmillipede.x && mouseX<(greenmillipede.x+greenmillipede.w) && mouseY>greenmillipede.y && mouseY<(greenmillipede.y+greenmillipede.h)){
          for (int i=1; i<segments.length; i++){
          segments[i].c=color(135,300,360);
          segments[0].c=color(135,300,360);
          }
          println("your millipede is now green!");
          }
          
          if (mouseX>bluemillipede.x && mouseX<(bluemillipede.x+bluemillipede.w) && mouseY>bluemillipede.y && mouseY<(bluemillipede.y+bluemillipede.h)){
          for (int i=1; i<segments.length; i++){
          segments[i].c=color(225,300,360);
          segments[0].c=color(225,300,360);
          }
          println("your millipede is now blue!");
          }
          CreateMainMenu();
          DestroyCustomizePetMenu();
    } else if (gameState=="envcustommenu"){
      //for pressing each digipet subicon for color
          if (mouseX>redsand.x && mouseX<(redsand.x+redsand.w) && mouseY>redsand.y && mouseY<(redsand.y+redsand.h)){
          envdefault.c=color(0,360,260);
          println("your sand is now red!");
          }
          
          if (mouseX>whitesand.x && mouseX<(whitesand.x+whitesand.w) && mouseY>whitesand.y && mouseY<(whitesand.y+whitesand.h)){
          envdefault.c=(color(255));
          println("your sand is now white!");
          }
          
          if (mouseX>skybluesand.x && mouseX<(skybluesand.x+skybluesand.w) && mouseY>skybluesand.y && mouseY<(skybluesand.y+skybluesand.h)){
          envdefault.c=color(215,360,360);
          println("your sand is now sky blue!");
          }
          CreateMainMenu();
          DestroyCustomEnvMenu();
    }
          
          
    
    //for pressing food icon
    if (mouseX>food.x && mouseX<(food.x+food.w) && mouseY>food.y && mouseY<(food.y+food.h)){
      //create foodbits
    foodbits=new Foodbit(random(width/3),random(height/2),color(90,300,250));  
    }
    
    //for pressing ball icon
    if (mouseX>ballicon.x && mouseX<(ballicon.x+ballicon.w) && mouseY>ballicon.y && mouseY<(ballicon.y+ballicon.h)){
      // ball starts at center
     ball = new Ball(random(20,width-20), random(20,height-20), // random position
     random(-5,5), random(-5,5), // random velocity
     40,// radius
     color(280,300,360));
    }
  }

 
void keyPressed(){
  if (gameState=="splash"){
    CreateMainMenu();
    splashscreen=null; //delete startscreen
  }
}

//helper functions for menus as not to burn in copy & paste hell

void CreateCustomizePetMenu (){
   gameState="customize pet";
       customizepet= new PetCustomMenu(color(250,180,300),width-width*(0.93),height-height*(0.850));
        pinkmillipede = new RedMillipede(width-width*(0.65),height-height*(0.79),330,100,width-width*(0.62),height-height*(0.72),color(315,300,360));
        greenmillipede = new GreenMillipede(width-width*(0.65),height-height*(0.59),330,100,width-width*(0.62),height-height*(0.52),color(135,360,360));
        bluemillipede = new BlueMillipede(width-width*(0.65),height-height*(0.39),330,100,width-width*(0.62),height-height*(0.32),color(225,360,360));
}

void DestroyCustomizePetMenu (){
   customizepet= null;
        pinkmillipede = null;
        greenmillipede = null;
        bluemillipede = null;
}

void CreateCustomEnvMenu (){
  gameState="envcustommenu";
    envcustommenu= new EnvCustomMenu(color(250,180,300),width-width*(0.93),height-height*(0.850));
    redsand=new RedSand(width-width*(0.65),height-height*(0.79),330,100,width-width*(0.62),height-height*(0.72),color(0,360,360));
    whitesand = new WhiteSand(width-width*(0.65),height-height*(0.59),330,100,width-width*(0.62),height-height*(0.52),color(255));
    skybluesand = new SkyBlueSand(width-width*(0.65),height-height*(0.39),330,100,width-width*(0.62),height-height*(0.32),color(180,360,360));
}

void DestroyCustomEnvMenu (){
  envcustommenu= null;
    redsand=null;
    whitesand = null;
    skybluesand = null;
}
  

void CreateMainMenu(){
  gameState="main menu";
   //initializing menu icons
  mainmenu =new secondMenu(color(250,180,300));
    startsimicon = new StartSimIcon(width-width*(0.65),height-height*(0.79),330,100,width-width*(0.62),height-height*(0.72),color(300,320,360));
    petcustomicon = new PetCustomIcon(width-width*(0.65),height-height*(0.59),330,100,width-width*(0.62),height-height*(0.52),color(300,320,360));
    envcustomicon = new EnvCustomIcon(width-width*(0.65),height-height*(0.39),330,100,width-width*(0.64),height-height*(0.32),color(300,320,360));
}

void DestroyMainMenu(){
    mainmenu =null;
      startsimicon = null;
      petcustomicon = null;
      envcustomicon = null;
}