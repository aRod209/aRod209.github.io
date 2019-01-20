/* ***** Import statements ***** */
import { c, vertexArray } from './graph.js';
import { distance } from './utilities.js';

export class Vertex {
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
    this.createVertex();
  }
}