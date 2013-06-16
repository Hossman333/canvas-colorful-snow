//Paul Irish shim(just maps the diff variation of requestAnimFrame)
window.requestAnimFrame = (function(){ 
  return  window.requestAnimationFrame       ||  
          window.webkitRequestAnimationFrame ||  
          window.mozRequestAnimationFrame    ||  
          window.oRequestAnimationFrame      ||  
          window.msRequestAnimationFrame     ||  
          function( callback ){ 
            window.setTimeout(callback, 1000 / 60); 
          }; 
})(); 
//shim ends



var canvas = document.getElementById('canvas');

window.addEventListener('resize', _.debounce(resizeCanvas, 200), false);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawStuff();
}
resizeCanvas();

function drawStuff() {
  var particles = []; 
  var tick = 0; 
  function loop() { 
    window.requestAnimFrame(loop); 
    createParticles(); 
    updateParticles();
    killParticles(); 
    drawParticles();
  } 
  window.requestAnimFrame(loop); 
  function createParticles() { 
    //check on every 10th tick check 
    if(tick % 10 == 0) { 
      //add particle if fewer than 300 
      if(particles.length < 300) { 
        particles.push({ 
          x: Math.random()*canvas.width, //between 0 and canvas width 
          y: 0, 
          speed: 2+Math.random()*3, //between 2 and 5 
          radius: 1+Math.random()*10, //between 1 and 10 
          color: '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6), 
        }); 
      } 
    } 
  } 
  function updateParticles() {
    for(var i in particles) {
      var part = particles[i];
      part.y += part.speed;
    }
  }
  function killParticles() {
    for(var i in particles) {
      var part = particles[i];
      if(part.y > canvas.height) {
        part.y = 0;
      }
    }
  }
  function drawParticles() {
    var c = canvas.getContext('2d');
    c.fillStyle = "white";
    c.fillRect(0,0,canvas.width,canvas.height);
    for(var i in particles) {
      var part = particles[i];
      c.beginPath();
      c.arc(part.x,part.y,part.radius,0,Math.PI*2);
      c.closePath();
      c.fillStyle = part.color;
      c.fill();
    }
  }
}


//THIS DOWN HERE is just a test of canvas. Its a little animation!


// var x = 0; 
// function drawIt() { 
//     window.requestAnimFrame(drawIt); 
//     var canvas = document.getElementById('canvas'); 
//     var c = canvas.getContext('2d'); 
//     c.clearRect(0,0,canvas.width,canvas.height); 
//     c.fillStyle = "red"; 
//     c.fillRect(x,100,200,100); 
//     x+=5; 
// } 
 
// window.requestAnimFrame(drawIt); 