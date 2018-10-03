//millipede code with help of Spring Systems lecture code

class SegmentSpring 
{
  float cx, cy;        // rest position
  float x, y;          // current position
  float vx=0, vy=0;    // velocity in the two directions   
  float r = 80;        // radius
  float k = 0.05;      // spring constant
  float d = 0.75;      // damping
  float g = 0.01;         // gravity
  int segindex;
  color c;
  
  // Initialize a SegmentSpring at rest position (x0,y0)
  SegmentSpring(float x0, float y0, float r0, int segindex0, color c0)
  {
    x = x0; y = y0;
    cx = x0; cy = y0;
    c=c0;
    r = r0; segindex=segindex0;
  }

  void draw()
  {
    colorMode(HSB,360);
    strokeWeight(6);
    stroke(0,250,130);
    fill(c); 
    strokeWeight(4);
    stroke(0);
    //Millipede's legs on each segment, only draw antenna on head segment
    if (segindex!=0){
    line(x,y,x-80,y+40);
    line(x,y,x+80,y+40);
    } else {
      strokeWeight(2);
      line(x,y,x-70,y-50);
      line(x,y,x+70,y-50);
    }
    ellipse(x,y,2*r,2*r); 
  }

  // Update the spring, with a new center
  void update(float ncx, float ncy)
  {
    // set the new center
    cx = ncx; cy = ncy;
    
    // usual spring stuff
    if (segindex!=0 && dist(segments[segindex].x,segments[segindex].y,segments[segindex-1].x,segments[segindex-1].y)>this.r)
    {
      moveSegment();
    } 
    else if (segindex==0){
    vx -= k * (x-cx); vy -= k * (y-cy); vy += g;
    vx *= d; vy *= d;
    x += vx; y += vy; 
    }
  }
  void moveSegment()
  {
    vx -= k * (x-cx); vy -= k * (y-cy); vy += g;
    vx *= d; vy *= d;
    x += vx; y += vy;
  }
}