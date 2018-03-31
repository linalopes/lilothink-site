/* Thanks to "Self Bot" by B L Λ C Khttp://www.openprocessing.org/sketch/113262 Licensed under Creative Commons Attribution ShareAlike https://creativecommons.org/licenses/by-sa/3.0https://creativecommons.org/licenses/GPL/2.0/
and "Constellation" by Koï Koïhttp://www.openprocessing.org/sketch/434620 Licensed under Creative Commons Attribution ShareAlike https://creativecommons.org/licenses/by-sa/3.0https://creativecommons.org/licenses/GPL/2.0/
*/

//Lilo.Think

var constellation = [];
var n;
var d;

var pgCode;
var lines = [];
var a=0, b=0;
var x=10, y=15;
var message = [];

function setup() {
  createCanvas(screen.width, screen.height);
  pgCode = createGraphics(screen.width, screen.height);
  
  pixelDensity(1); // Set 1 because it's too slow on firefox
  //pixelDensity(displayDensity());
  n = 200;

  for (var i = 0; i <= n; i++) {
    constellation.push(new star());
  }
  strokeWeight(1);
  stroke('#000000');
  
  var str = ""+"js/sketch.js";
  lines = loadStrings(str);
}

function draw() {

  background('#e66767');

  for (var i = 0; i < constellation.length; i++) {
    constellation[i].update();
    for (var j = 0; j < constellation.length; j++) {
      if (i > j) { // "if (i > j)" => to check one time distance between two stars
        d = constellation[i].loc.dist(constellation[j].loc); // Distance between two stars
        if (d <= width / 10) { // if d is less than width/10 px, we draw a line between the two stars
          line(constellation[i].loc.x, constellation[i].loc.y, constellation[j].loc.x, constellation[j].loc.y)
        }
      }
    }
  }
  
  pgCode.background(0,0,0,0);
  pgCode.fill('#FFFFFF');
  
  if (a < lines.length) {
    message = lines[a];
  }

  if (b < message.length) {
    pgCode.text(message.charAt(b), x*b+10, y*a);
    b++;
  }
  else { 
    b=0;
    a++;
  }
  
  image(pgCode,0,0);
}

function star() {

  this.a = random(5 * TAU); // "5*TAU" => render will be more homogeneous
  this.r = random(width * .2, width * .25); // first position will looks like a donut
  this.loc = createVector(width / 2 + sin(this.a) * this.r, height / 2 + cos(this.a) * this.r);
  this.speed = createVector();
  this.speed = p5.Vector.random2D();
  //this.speed.random2D();
  this.bam = createVector();
  this.m;


  this.update = function() {
      this.bam = p5.Vector.random2D(); // movement of star will be a bit erractic
      //this.bam.random2D();
      this.bam.mult(0.45);
      this.speed.add(this.bam);
      // speed is done according distance between loc and the mouse :
      this.m = constrain(map(dist(this.loc.x, this.loc.y, mouseX, mouseY), 0, width, 8, .05), .05, 8); // constrain => avoid returning "not a number"
      this.speed.normalize().mult(this.m);

      // No colision detection, instead loc is out of bound
      // it reappears on the opposite side :
      if (dist(this.loc.x, this.loc.y, width / 2, height / 2) > (width / 2) * 0.98) {
        if (this.loc.x < width / 2) {
          this.loc.x = width - this.loc.x - 4; // "-4" => avoid blinking stuff
        } else if (this.loc.x > width / 2) {
          this.loc.x = width - this.loc.x + 4; // "+4"  => avoid blinking stuff
        }
        if (this.loc.y < height / 2) {
          this.loc.y = width - this.loc.y - 4;
        } else if (this.loc.x > height / 2) {
          this.loc.y = width - this.loc.y + 4;
        }
      }
      this.loc = this.loc.add(this.speed);
    } // End of update()
} // End of class