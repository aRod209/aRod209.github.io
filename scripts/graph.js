var canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// const MAXRADIUS = 40;
// const MINRADIUS = 5;

// c stands for Context
var c = canvas.getContext("2d");

// var mouse = {
//   x: undefined,
//   y: undefined
// };

// document.getElementById("home").addEventListener("mousemove", function(event) {
//   mouse.x = event.x;
//   mouse.y = event.y;
// });

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

window.addEventListener("resize", function (event) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function distance(x1, y1, x2, y2) {
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class Vertex {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = "#00FF00";
  }

  createVertex() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    c.strokeStyle = "#000000";
    c.stroke();
    c.fillStyle = this.color;
    c.fill();
    c.shadowBlur = 10;
    c.shadowColor = this.color;
  }

  move() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    for (let i = 0; i < vertexArray.length; i++) {
      if (this === vertexArray[i]) continue;

      if (
        distance(this.x, this.y, vertexArray[i].x, vertexArray[i].y) <=
        this.radius + vertexArray[i].radius + 140
      ) {
        c.beginPath();
        c.moveTo(this.x, this.y);
        c.lineTo(vertexArray[i].x, vertexArray[i].y);
        c.strokeStyle = "blue";
        c.stroke();
        c.shadowBlur = 10;
        c.shadowColor = "blue";
      }
    }

    // // interactivity

    // if (
    //   mouse.x - this.x < 50 &&
    //   mouse.x - this.x > -50 &&
    //   mouse.y - this.y < 50 &&
    //   mouse.y - this.y > -50
    // ) {
    //   if (this.radius < MAXRADIUS) {
    //     this.radius += 1;
    //   }
    // } else if (this.radius > MINRADIUS) {
    //   this.radius -= 1;
    // }

    this.createVertex();
  }
}

let vertexArray = [];

for (let i = 0; i < 50; i++) {
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

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  vertexArray.forEach(vertex => {
    vertex.move();
  });
}

animate();
