/* ***** Import statements ***** */
import { c, vertexArray } from './graph.js';
import { withinDistance } from './utilities.js';

export class Vertex {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color; //original: #00FF00
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
      // If withinDistance, then connect with an edge
      if (withinDistance(this, vertexArray[i])) {
        c.beginPath();
        c.moveTo(this.x, this.y);
        c.lineTo(vertexArray[i].x, vertexArray[i].y);
        c.strokeStyle = "white";
        c.stroke();
        c.shadowBlur = 5;
        c.shadowColor = this.color;
        vertexArray[i].color = this.color;
      }
    }
    this.createVertex();
  }
}