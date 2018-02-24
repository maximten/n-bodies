import * as d3 from "d3";

const G = 1;
const dt = 1;

const bodies = [
  {
    m: 100,
    x: 100,
    y: 250,
    vx: 0,
    vy: 0,
  },
  {
    m: 100,
    x: 200,
    y: 350,
    vx: 0,
    vy: 0,
  },
  {
    m: 100,
    x: 300,
    y: 250,
    vx: 0,
    vy: 0,
  },
  {
    m: 100,
    x: 400,
    y: 350,
    vx: 0,
    vy: 0,
  },
];

const calc = (bodies) => {
  bodies.forEach((bodyA, i) => {
    bodies.forEach((bodyB, j) => {
      if (i != j) {
        const dx = bodyB.x - bodyA.x;
        const dy = bodyB.y - bodyA.y;
        const squareR = Math.max(dx * dx + dy * dy, 1000);
        const a = G * bodyB.m / squareR;
        const R = Math.sqrt(squareR);
        const cos = dx / R; 
        const sin = dy / R;
        const ax = a * cos; 
        const ay = a * sin;
        bodyA.vx += ax * dt; 
        bodyA.vy += ay * dt; 
      }
    });
  });
  bodies.forEach((body) => {
    body.x += body.vx * dt;
    body.y += body.vy * dt;
  });
}

const svg = d3.select("body")
.append("svg")
.style("width", window.innerWidth)
.style("height", window.innerHeight);

const draw = (bodies) => {
  const circles = svg.selectAll("circle")
  .data(bodies)


  circles.enter()
  .append("circle")
  .attr("r", 10)
  .attr("cx", body => body.x)
  .attr("cy", body => body.y)

  circles
  .exit()
  .remove()

  circles
  .attr("cx", body => body.x)
  .attr("cy", body => body.y)
}

window.setInterval(() => {
  calc(bodies);
  draw(bodies)
}, 10)