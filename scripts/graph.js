/* ***** Import statements ***** */
import { Vertex } from './vertex.js';
import { distance, randomIntFromRange } from './utilities.js';

/* ***** Global variables ***** */
var canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
export var c = canvas.getContext("2d");
export var vertexArray = [];
var arraySize;

/* ***** Event listeners ***** */

// Adds new vertex on canvas
document.getElementById("home").addEventListener("click", function (event) {
  vertexArray.push(
    new Vertex(
      event.clientX,
      event.clientY,
      Math.random() - 0.5,
      Math.random() - 0.5,
      5
    )
  );
});

// Resizes canvas based on window's current width and height.
// scroll was added to fix a bug in mobile web browsers.
window.addEventListener('resize', resizeCanvas, false);
window.addEventListener('orientationchange', resizeCanvas, false);

function resizeCanvas() {
  // Copy canvas as image data
  var imgData = c.getImageData(0, 0, canvas.width, canvas.height);

  // Resize original canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Copy back to resized canvas
  c.putImageData(imgData, 0, 0);
}

// animate canvas
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  vertexArray.forEach(vertex => {
    vertex.move();
  });
}

/* ***** Initialize the vertices on the canvas ***** */
function init() {

  if (window.innerWidth <= 360) { arraySize = 10; }
  else if (window.innerWidth <= 415) { arraySize = 15; }
  else if (window.innerWidth <= 800) { arraySize = 25; }
  else { arraySize = 50; }

  for (let i = 0; i < arraySize; i++) {
    let radius = 5;
    let x = randomIntFromRange(radius, window.innerWidth - radius);
    let y = randomIntFromRange(radius, window.innerHeight - radius);
    let dx = Math.random() - 0.5;
    let dy = Math.random() - 0.5;

    if (i !== 0) {
      for (let j = 0; j < vertexArray.length; j++) {
        if (distance(x, y, vertexArray[j].x, vertexArray[j].y) - radius * 2 < 0) {
          x = randomIntFromRange(radius, window.innerWidth - radius);
          y = randomIntFromRange(radius, window.innerHeight - radius);
        }
      }
    }

    vertexArray.push(new Vertex(x, y, dx, dy, radius));
  }
  animate();
}

init();