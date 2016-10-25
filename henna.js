window.onload = function() {

  document.ontouchmove = function(e){ e.preventDefault(); }

  var canvas  = document.getElementById('main');
  var canvastop = canvas.offsetTop;
  var canvasleft = canvas.offsetLeft;	

  var context = canvas.getContext("2d");
  var image = document.getElementById('source');

  var lastx;
  var lasty;

  context.strokeStyle = "#000000";
  context.lineCap = 'round';
  context.lineJoin = 'round';
  context.lineWidth = 3;

  background();
  text();

function text() {   // Text on top of canvas
  context.font="20px Times";
  var gradient=context.createLinearGradient(0,0,canvas.width,0);
  gradient.addColorStop("0","green");
  gradient.addColorStop("0.5","red");
  gradient.addColorStop("1.0","green");
  context.fillStyle=gradient;
  context.fillText("~*~Henna Touch~*~",60,20);

}

 function background() { // Draws canvas and loads image on it
    context.fillStyle = "black";
    context.rect(0, 0, 300, 300);
    context.fill();
 
context.drawImage(image,0, 0, 300, 300, 70, 30, 300, 300);
  }

var pattern = new Image();
pattern.src ='pattern.png';

function drawPattern(lastx,lasty)
  {
  context.drawImage(pattern,lastx,lasty);
  }

//function associated with button
  function clear() { 
  context.fillStyle = "#ffffff";
  context.rect(0, 0, 300, 300);
  context.fill();
  background();
    
  }
//function associated with button
  function shape() {
    canvas.addEventListener("touchstart", pattern2TouchStart);
    context.lineWidth = 0.5;
  }
//function associated with button
  function rotate() {
    rotateR();
    setInterval(rotateR, 100);
  }
//function associated with button
  function floralpattern() {
    canvas.addEventListener("touchstart", patternTouchStart);
  }

  function dot(x,y) {
    context.beginPath();
    context.fillStyle = "#000000";
    context.arc(x,y,1,0,Math.PI*2,true);
    context.fill();
    context.stroke();
    context.closePath();
  }

  function line(fromx,fromy, tox,toy) {
    context.beginPath();
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.stroke();
    context.closePath();
  }

var doOnTouchStart = function(event){   // touch event 1 (additional)            
event.preventDefault();  
    
     lastx = event.touches[0].clientX - canvasleft;  
     lasty = event.touches[0].clientY - canvastop;   

     dot(lastx,lasty);
 
  }
 canvas.addEventListener("touchstart", doOnTouchStart);

var pattern2TouchStart = function(event){  // touch event 2          

   context.fillRect(event.touches.clientX - canvasleft, 
                    event.touches.clientY - canvastop, 5, 5);  
//drawing geometric pattern
context.beginPath();
context.lineWidth="2";
context.strokeStyle="black";
context.rect(lastx,lasty,10,10);
context.stroke();
context.beginPath();
context.arc(lastx,lasty,10,0,2*Math.PI);
context.stroke();
context.beginPath();
context.arc(lastx,lasty,5,0,2*Math.PI);
context.stroke();
  }

var patternTouchStart = function(event){   //touch event 3                
    event.preventDefault();  
    lastx = event.touches[0].clientX - canvasleft;  
    lasty = event.touches[0].clientY - canvastop;  
    drawPattern(lastx, lasty);
  }

//function that makes image and text keep on rotating
function rotateR() {
  clear();
  context.translate(canvas.width/2, canvas.width/2); 
  context.rotate(Math.PI / 180);
  context.translate(-canvas.width/2, -canvas.width/2);
  context.font="15px Times";
  // Heading
  context.fillStyle= "red" ;
  context.fillText("That was beautiful!",60,25);
  
}

var doOnTouchMove = function(event){                   
    event.preventDefault();                 

    var newx = event.touches[0].clientX;
    var newy = event.touches[0].clientY - canvastop;

    line(lastx,lasty, newx,newy);
    
    lastx = newx;
    lasty = newy;
  }

canvas.addEventListener("touchmove", doOnTouchMove);

  var clearButton = document.getElementById('clear');
  clearButton.onclick = clear;

  var shapeButton = document.getElementById('shape');
  shapeButton.onclick = shape;

  var floralpatternButton = document.getElementById('floralpattern');
  floralpatternButton.onclick = floralpattern;

  var rotateButton = document.getElementById('rotate');
  rotateButton.onclick = rotate;
}


